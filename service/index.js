const path = require("path");
const express = require('express');
const app = express();
const uuid = require('uuid');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

let users = {};
let galleries = [];

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;
    galleries[user.email] = [];

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// GetGalleries get all galleries for a user
apiRouter.get('/galleries', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (user) {
    res.send(galleries[user.email] || []);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// PostGallery create a new gallery for a user
apiRouter.post('/galleries', (req, res) => {
  const user = Object.values(users).find(
		(u) => u.token === req.headers.authorization
	);
	if (user) {
		if (!galleries[user.email]) {
			galleries[user.email] = [];
		}
		const newGallery = { name: req.body.name, id: uuid.v4() };
		galleries[user.email].push(newGallery);
		res.status(201).send(newGallery);
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// CheckName check if a gallery name is available
apiRouter.get("/galleries/check-name", (req, res) => {
	const user = Object.values(users).find(
		(u) => u.token === req.headers.authorization
	);
	if (!user) {
		return res.status(401).send({ msg: "Unauthorized" });
	}

	const galleryName = req.query.name;
	if (galleries[user.email]) {
		const exists = galleries[user.email].some(
			(gallery) => gallery.name === galleryName
		);
		if (exists) {
			return res.status(409).send({ msg: "Gallery name already exists" });
		}
	}
	res.status(200).send({ msg: "Gallery name is available" });
});

// GetGallery get a specific gallery for a user
apiRouter.get('/galleries/:id', (req, res) => {
  const user = Object.values(users).find(
    (u) => u.token === req.headers.authorization
  );
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  const galleryId = req.params.id;
  if (galleries[user.email]) {
    const gallery = galleries[user.email].find(
      (g) => g.id === galleryId
    );
    if (gallery) {
      return res.status(200).send(gallery);
    } else {
      return res.status(404).send({ msg: 'Gallery not found' });
    }
  } else {
    return res.status(404).send({ msg: 'No galleries found for the user' });
  }
});