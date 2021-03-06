const router = require("express").Router();

const {
  models: { User },
} = require("../db");

// if we have a token, use that token to find information about the user from the database
// if that user is an Administrator, give them access to information about all users
router.get("/", async (req, res, next) => {
    if (req.headers.authorization) {
      try {
        const currentUser = await User.findByToken(req.headers.authorization);
        if (currentUser.isAdmin) {
          const users = await User.findAll({
            attributes: ["id", "username", "isAdmin"],
          });} 
          res.json(users);
        } catch(err) {
            next(err)
            console.log(err)
          }
      } else {
        res.status(401).send("Not authenticated");
      }
    })
  

router.put("/:id", async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    res.send(await userToUpdate.update({ isAdmin: !userToUpdate.isAdmin }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
