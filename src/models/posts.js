const mongoose = require("mongoose")

//Esquema 
const postSchema = new mongoose.Schema({
    date: {
        required: true,  
        type: String
    },
    dateMiliseconds: {
        required: true,  
        type: Number
    },
    reactions: { 
        type: Number
    },
    description: {
        required: true,  
        type: String
    },
    title: {
        required: true,  
        type: String
    },
    url: {
        required: true,  
        type: String
    },
    tags: {  
        type: String
    }, 
});

const Posts =  mongoose.model("Posts", postSchema) // Modelo 
module.exports = Posts