import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, sparse: true },
    age: Number,
    password: String,
    githubId: { type: String, unique: true },
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection