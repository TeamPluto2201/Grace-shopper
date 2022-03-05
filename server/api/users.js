const router = require('express').Router()
const { models: { User }} = require('../db')
const { requireAuth } = require('../Middleware/authMiddleware')

router.get('/', async (req, res, next) => {
  try {
      if (req.headers.authorization) {

        const currentUser = await User.findByToken(req.headers.authorization)
        console.log('THIS USER ', currentUser.isAdmin)
        if (currentUser.isAdmin) {
        const users = await User.findAll({
            // explicitly select only the id and username fields - even though
            // users' passwords are encrypted, it won't help if we just
            // send everything to anyone who asks!
            attributes: ['id', 'username', 'isAdmin']
          })
          res.json(users)
        } else {
          res.redirect('/')
        }
      } else {
        res.redirect('/')
      }
  } catch (err) {
    next(err)
    console.log(err)
  }
})

module.exports = router;
