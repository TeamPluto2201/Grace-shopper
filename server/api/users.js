const router = require("express").Router();
const {
  models: { User },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    //if we have a token
    if (req.headers.authorization) {
      //use that token to find information about the user from the database
      const currentUser = await User.findByToken(req.headers.authorization);
      //if that user is an Administrator
      if (currentUser.isAdmin) {
        //give them access to information about all users
        const users = await User.findAll({
          // explicitly select only the id and username fields - even though
          // users' passwords are encrypted, it won't help if we just
          // send everything to anyone who asks!
          attributes: ["id", "username", "isAdmin"],
        });
        res.json(users);
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [userToUpdate] = await User.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username", "isAdmin"],
    });
    res.send(await userToUpdate.update({ isAdmin: true }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
