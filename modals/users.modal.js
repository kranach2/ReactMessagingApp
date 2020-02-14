const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
fullname:{type:String, required:true},
username:{type:String, required:true, unique:true},
registerDate:{type:Date, default:Date.now}
});

const User= mongoose.model("User", userSchema);
 

module.exports = User;