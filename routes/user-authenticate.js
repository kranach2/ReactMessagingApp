const router = require("express").Router();
const User = require("../modals/users.modal");

//Post user authentication
//Authenticate  user
router.route("/" ).post((req, res) => {
const {username} = req.body;
//validation
if(!username){
 
  return res.status(400).json({msg:"please enter your username"});
  
}

  //Check for existing user
  User.findOne({ username })
  .then(user =>{
    if(!user) return res.status(400).json({msg:"user does not exists"});
    

  })
    .then(() => res.json(`${username}`))
});

// GET request authentication/user
// GET user data
// Access Private
router.get("/user",(req, res) =>{
  User.findById(req.user.id)
  .then(user => res.json(user));
});

module.exports = router;

