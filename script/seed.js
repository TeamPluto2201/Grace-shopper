'use strict'

const { db, models: { User, Product } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  // Creating Products
  const products = await Promise.all([
    Product.create({ designName: 'DIVA', price: 10, imgPath: "../public/Shirt-1.png " }),
    Product.create({ designName: 'BLANCHEDALMOND', price: 11, imgPath: "../public/Shirt-2.png " }),
    Product.create({ designName: 'MOTH', price: 12, imgPath: "../public/Shirt-3.png " }),
    Product.create({ designName: 'GRACEHOPPER', price: 13, imgPath: "../public/Shirt-4.png " }),
    Product.create({ designName: 'BROGLE', price: 14, imgPath: "../public/Shirt-5.png " }),
    Product.create({ designName: 'HACK', price: 15, imgPath: "../public/Shirt-6.png " }),
  ])


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    products: {
      diva: products[0],
      blanchedalmond: products[1],
      moth: products[2],
      gracehopper: products[3],
      brogle: products[4],
      hack: products[5],
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
