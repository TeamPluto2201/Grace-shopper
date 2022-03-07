const router = require('express').Router()
const { models: { User }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [ userToUpdate ] = await User.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'username', 'isAdmin']
    })
    // userToUpdate.dataValues.isAdmin = true;
    // await userToUpdate.save();
    // console.log("USER TO UPDATE >>>>", userToUpdate)
    // const finalUser = await User.findByPk(req.params.id)
    // console.log("FINAL USER >>>>", finalUser)
    // res.send(finalUser);
    res.send(await userToUpdate.update({ isAdmin: true }));
  } catch(err) {
    next(err);
  };
});

module.exports = router;
