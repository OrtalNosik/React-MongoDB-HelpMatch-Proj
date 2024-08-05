const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://admin:1qgQ4KVNpE1cCCWt@users.13o48lx.mongodb.net/Users?retryWrites=true&w=majority";

let user = {};
let name = "";
let img = "";
let signedIn = false;
let isAdmin = false;
const EMAIL = "";

// Function to sign the user in
function signIn(User) {
  name = User.fname + " " + User.lname;
  img = User.img;
  signedIn = true;
  user = { name: name, img: img, signedIn: signedIn }
}

// Function to sign the user out
function signOut() {
  signedIn = false;
  isAdmin = false;
  isVall = false;
  user = {};

}
function getState() {
  return signedIn;
}
function getUser() {
  return user;
}

function getIsAdmin() {
  return isAdmin;
}

function getIsVall() {
  return isVall;
}


module.exports = {
  getState
};



async function run() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    app.use(express.json());

    // The database to use
    const dbName = "Users";
    const db = client.db(dbName);
    const users = db.collection("users");
    const Vallenteers = db.collection("Vallenteers");
    const Post = db.collection("Post");
    const usersCollection = db.collection('users');
    const PostCollection = db.collection('Post');
    const VallenteersCollection = db.collection('Vallenteers');





    // Register endpoint
    app.post("/sign-up", async (req, res) => {
      const { fname, lname, email, password, img } = req.body;
      // check if password is correct
      if (email === '') {
        return res.status(400).json({ message: "have to fill all the detailes" });
      }
      // Check if there is already a user with the same email
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      //else -> register the user
      const result = await users.insertOne({ fname, lname, email, password, img });
      res.json({ message: "User registered successfully" });
    });

    // Register endpoint
    app.post("/sign-up-vall", async (req, res) => {
      const { fname, lname, email, password, img ,isVall} = req.body;
      // check if password is correct
      if (email === '') {
        return res.status(400).json({ message: "have to fill all the detailes" });
      }
      // Check if there is already a user with the same email
      const existingUser = await Vallenteers.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      //else -> register the user
      const result = await Vallenteers.insertOne({ fname, lname, email, password, img ,isVall});
      res.json({ message: "User registered successfully" });
    });

    app.post("", async (req, res) => {
      try {
        const {
          author,
          date,
          content,
          authorImg,
          theme,
          address,
          contentInfo,
          likes,
          comments
        } = req.body;
    
        // Insert data into the database
        const result = await Post.insertOne({
          author,
          date,
          content,
          authorImg,
          theme,
          address,
          contentInfo,
          likes,
          comments
        });
    
        // Send success response
        res.json({ message: "Post created successfully", data: result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });


    app.get("/test", (req, res) => { return res.status(200).json({ message: "Invalid email or password" }); });

    // Login endpoint
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in the Users collection
    const user = await users.findOne({ email });
    if (user) {
      // Check if password matches
      if (user.password === password) {
        if (user.isAdmin) {
          isAdmin = true;
        }
        signIn(user); // Log in the user
        return res.json({ message: "Login successful" });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    }

    // If not found in Users collection, check the Volunteers collection
    const volunteer = await Vallenteers.findOne({ email });
    if (volunteer) {
      isVall=true;
      if (volunteer.password === password) {

        signIn(volunteer); // Log in the volunteer
        return res.json({ message: "Login successful" });
      } else {

        return res.status(400).json({ message: "Invalid email or password" });
      }
    } else {
      console.log("No volunteer found with email:", email);
    }
    

    // If no user or volunteer found, return an error
    return res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


    //sign out by changing the state

    app.post("/sign-out", async (req, res) => {
      signOut();
      res.json({ message: "Logout successful" });
    });


    app.post("/update-like", async (req, res) => {
      const { email, postId } = req.body;
      // Find the user
      const user = await users.findOne({ email });


      const mongoose = require('mongoose');
      const postIdObject = new mongoose.Types.ObjectId(postId);
      const post = await Post.findOne({ _id: postIdObject });

      const like = [user._id.toString(), user.fname + " " + user.lname , user.img];

      const hasLiked = post.likes.some((like) => like[0] === user._id.toString());

      // If the user has already liked the post, remove their like
      if (hasLiked) {
        await Post.updateOne({ _id: postIdObject }, { $pull: { likes: like } });
      } else {
        // Otherwise, add the user's like
        await Post.updateOne({ _id: postIdObject }, { $addToSet: { likes: like } });
      }

      res.json({ message: "Like updated successfully" });
    });

    app.post("/update-comments", async (req, res) => {
      const { email, postId ,content } = req.body;
      const user = await users.findOne({ email });
      const mongoose = require('mongoose');
      const postIdObject = new mongoose.Types.ObjectId(postId);
      const comment = [user._id.toString(), user.fname + " " + user.lname , user.img , content];
      await Post.updateOne({ _id: postIdObject }, { $addToSet: { comments: comment } });
    });


    //getting usersatate logged in
    app.get("/getState", (req, res) => { return res.status(200).json({ message: getState() }); });

    app.get("/getUser", (req, res) => { return res.status(200).json({ message: getUser() }); });


    //getting adminstate logged in
    app.get("/getAdmin", (req, res) => { return res.status(200).json({ message: getIsAdmin() }); });

    app.get('/users', async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.send(users);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get("/getVall", (req, res) => { return res.status(200).json({ message: getIsVall() }); });


    app.get('/post', async (req, res) => {
      try {
        const posts = await PostCollection.find().toArray();
        res.send(posts);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/post/count', async (req, res) => {
      try {
        const count = await PostCollection.countDocuments();
        res.json({ count });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/post/counts-by-theme', async (req, res) => {
      try {
        const themeCounts = await PostCollection.aggregate([
          { $group: { _id: '$theme', count: { $sum: 1 } } },
          { $project: { _id: 0, theme: '$_id', count: 1 } }
        ]).toArray();

        const countsByTheme = {};
        themeCounts.forEach(({ theme, count }) => {
          countsByTheme[theme] = count;
        });

        res.json(countsByTheme);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });


    app.get('/user/count', async (req, res) => {
      try {
        const count = await usersCollection.countDocuments();
        res.json({ count });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });

    //running the server
    app.listen(3200, () => {
      console.log("Server started on port 3200");
    });
  } catch (err) {
    console.log(err.stack);
  }

}

run().catch(console.dir);