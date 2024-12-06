const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
//const uuid = require("uuid");
const DB = require("./database.js");
const multer = require("multer");
const { peerProxy } = require("./peerProxy.js");

const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 3000;

const httpService = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

const upload = multer({
	storage: multer.diskStorage({
		destination: "uploads/",
		filename: (req, file, cb) => {
			const filetype = file.originalname.split(".").pop();
			const id = Math.round(Math.random() * 1e9);
			const filename = `${id}.${filetype}`;
			cb(null, filename);
		},
	}),
	limits: { fileSize: 20 * 1024 * 1024 },
});

app.post("/upload", upload.single("file"), (req, res) => {
	if (req.file) {
		res.send({
			message: "Uploaded succeeded",
			file: req.file.filename,
		});
	} else {
		res.status(400).send({ message: "Upload failed" });
	}
});

app.get("/file/:filename", (req, res) => {
	res.sendFile(__dirname + `/uploads/${req.params.filename}`);
});

app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		res.status(413).send({ message: err.message });
	} else {
		res.status(500).send({ message: err.message });
	}
});

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", true);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

const isProduction = process.env.NODE_ENV === "production";

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
	res.cookie(authCookieName, authToken, {
		secure: isProduction,
		httpOnly: true,
		sameSite: isProduction ? "strict" : "lax",
	});
}

// CreateAuth - Register a new user
apiRouter.post("/auth/create", async (req, res) => {
	if (await DB.getUser(req.body.email)) {
		res.status(409).send({ msg: "Existing user" });
	} else {
		const user = await DB.createUser(req.body.email, req.body.password);

		// Set the cookie
		setAuthCookie(res, user.token);

		res.send({
			id: user._id,
		});
	}
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
	const user = await DB.getUser(req.body.email);
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			setAuthCookie(res, user.token);
			res.send({ id: user._id });
			return;
		}
	}
	res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth token if stored in cookie
apiRouter.delete("/auth/logout", (_req, res) => {
	res.clearCookie(authCookieName);
	res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
	const authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	if (user) {
		next();
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
	res.sendFile("index.html", { root: "public" });
});

// GetGalleries get all galleries for a user
secureApiRouter.get("/galleries", async (req, res) => {
	const authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);

	if (user) {
		const galleries = await DB.getUserGalleries(user.email);
		res.send(galleries);
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

secureApiRouter.post("/galleries", async (req, res) => {
	const authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);

	if (user) {
		const galleryName = req.body.name;
		if (!galleryName) {
			res.status(400).send({ msg: "Gallery name is required" });
			return;
		}

		// Check if gallery name exists for the user
		const exists = await DB.checkGalleryName(user.email, galleryName);
		if (exists) {
			res.status(409).send({ msg: "Gallery name already exists" });
			return;
		}

		// Create new gallery
		const newGallery = await DB.addGallery(user.email, {
			name: galleryName,
			photos: [],
		});
		res.status(201).send(newGallery);
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// CheckName check if a gallery name is available
secureApiRouter.get("/galleries/check-name", async (req, res) => {
	const authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);

	if (user) {
		const galleryName = req.query.name;
		if (!galleryName) {
			res.status(400).send({ msg: "Gallery name is required" });
			return;
		}

		const exists = await DB.checkGalleryName(user.email, galleryName);
		if (exists) {
			res.status(409).send({ msg: "Gallery name already exists" });
		} else {
			res.status(200).send({ msg: "Gallery name is available" });
		}
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// GetGallery get a specific gallery for a user
secureApiRouter.get("/galleries/:id", async (req, res) => {
	const authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);

	if (user) {
		const galleryId = req.params.id;
		try {
			const gallery = await DB.getGalleryById(user.email, galleryId);
			if (gallery) {
				res.status(200).send(gallery);
			} else {
				res.status(404).send({ msg: "Gallery not found" });
			}
		} catch (err) {
			res.status(500).send({ msg: "Internal Server Error" });
		}
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});
