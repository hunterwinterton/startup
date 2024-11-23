const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("photogalleries");
const userCollection = db.collection("user");
const galleriesCollection = db.collection("galleries");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
	await client.connect();
	await db.command({ ping: 1 });
})().catch((ex) => {
	console.log(
		`Unable to connect to database with ${url} because ${ex.message}`
	);
	process.exit(1);
});

function getUser(email) {
	return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
	return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
	// Hash the password before we insert it into the database
	const passwordHash = await bcrypt.hash(password, 10);

	const user = {
		email: email,
		password: passwordHash,
		token: uuid.v4(),
	};
	await userCollection.insertOne(user);

	return user;
}

// Get all galleries for a user
async function getUserGalleries(email) {
	return galleriesCollection.find({ email }).toArray();
}

// Add a new gallery for a user
async function addGallery(email, gallery) {
	gallery.email = email;
	const result = await galleriesCollection.insertOne(gallery);
	return { ...gallery, _id: result.insertedId };
}

// Get a specific gallery by ID for a user
async function getGalleryById(email, galleryId) {
	return await galleriesCollection.findOne({
		email,
		_id: new ObjectId(galleryId),
	});
}

// Check if a gallery name exists for a user
async function checkGalleryName(email, galleryName) {
	const gallery = await galleriesCollection.findOne({
		email,
		name: galleryName,
	});
	return gallery !== null;
}

module.exports = {
	getUser,
	getUserByToken,
	createUser,
	getUserGalleries,
	addGallery,
	getGalleryById,
	checkGalleryName,
};
