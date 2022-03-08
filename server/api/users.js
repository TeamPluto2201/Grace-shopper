
const router = require('express').Router()


const { models: { User } } = require('../db')


// if we have a token, use that token to find information about the user from the database
// if that user is an Administrator, give them access to information about all users
router.get('/', async (req, res, next) => {
  try {
      if (req.headers.authorization) {
        const currentUser = await User.findByToken(req.headers.authorization)
        if (currentUser.isAdmin) {
        const users = await User.findAll({
            attributes: ['id', 'username', 'isAdmin']
          })
          res.json(users)
        } else {
          res.status(401).send('Not authenticated')
        }

      } else {
        res.status(401).send('Not authenticated')
      }
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
});

router.put("/:id", async (req, res, next) => {
  try {

    const userToUpdate = await User.findByPk(req.params.id);
    res.send(await userToUpdate.update({ isAdmin: !userToUpdate.isAdmin }));
  } catch(err) {

    next(err);
  }
});

module.exports = router;
