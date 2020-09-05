const router = require("express").Router();
//User Model
const User = require("../modals/users.modal");

//Get users
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error:" + err));
});

//Register new user
router.route("/").post((req, res) => {
const {fullname, username} = req.body;
//validation
if(!fullname || !username ){
  return res.status(400).json({msg:"please enter all fields"});
}
  //Check for existing user
  User.findOne({ username })
  .then(user =>{
    if(user) return res.status(400).json({msg:"user already exists"});
    });
    
    const newUser = new User({
      fullname,
      username
});
newUser
    .save()
    .then(() => res.json({msg:"User Added!"}))
    .catch(err => res.json("error: " + err));
  });
    




module.exports = router;
