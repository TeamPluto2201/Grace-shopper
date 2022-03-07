const router = require('express').Router()
const { models: { User }} = require('../db')
const { requireAuth } = require('../Middleware/authMiddleware')

router.get('/', async (req, res, next) => {
  // JOE CR: Formatting makes this route a bit hard to read.
  try {
    //if we have a token
      if (req.headers.authorization) {
        //use that token to find information about the user from the database
        const currentUser = await User.findByToken(req.headers.authorization)
        //if that user is an Administrator
        if (currentUser.isAdmin) {
        //give them access to information about all users
        const users = await User.findAll({
            // explicitly select only the id and username fields - even though
            // users' passwords are encrypted, it won't help if we just
            // send everything to anyone who asks!
            attributes: ['id', 'username', 'isAdmin']
          })
          res.json(users)
        } else {
          // JOE CR: Redirection isn't useful for routes that return JSON instead of HTML.
          // a.k.a routes that would be hit with AJAX/axios on the front-end.
          // Much better to do here is throw an error or respond with a "Not Authenticated" status code like 401.
          res.redirect('/')
        }
      } else {
        res.redirect('/')
      }
  } catch (err) {
    next(err)
    console.log(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    // JOE CR: findByPk() would be perfect to use here.
    const [ userToUpdate ] = await User.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'username', 'isAdmin']
    })
    // JOE CR: What if you want to revoke admin status with this route?
    // I think it'd be ideal if the req.body had a shouldBeAdmin key or something
    // that would determine that instead of hardcoding `true` here.
    res.send(await userToUpdate.update({ isAdmin: true }));
  } catch(err) {
    next(err);
  };
});

module.exports = router;
