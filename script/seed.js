'use strict'

const { db, models: { User, Product, Order, OrderEntry } } = require('../server/db')

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
    Product.create({ designName: 'DIVA', price: 10, imgPath: "/Shirt-1.png " }),
    Product.create({ designName: 'BLANCHEDALMOND', price: 11, imgPath: "/Shirt-2.png " }),
    Product.create({ designName: 'MOTH', price: 12, imgPath: "/Shirt-3.png " }),
    Product.create({ designName: 'GRACEHOPPER', price: 13, imgPath: "/Shirt-4.png " }),
    Product.create({ designName: 'BROGLE', price: 14, imgPath: "/Shirt-5.png " }),
    Product.create({ designName: 'HACK', price: 15, imgPath: "/Shirt-6.png " }),
  ])

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ purchased: false }),
  ])

   // Creating Order Entries
   const orderEntries = await Promise.all([
    OrderEntry.create({ size: 'M', color: 'black', QTY: 2 }),
    OrderEntry.create({ size: 'S', color: 'white', QTY: 1 }),
    OrderEntry.create({ size: 'L', color: 'black', QTY: 4 }),
  ])

  // Setting up associations
  await users[0].addOrder(orders[0]);
  await orderEntries[0].setProduct(products[0]);
  await orderEntries[0].setOrder(orders[0]);
  await orderEntries[1].setProduct(products[1]);
  await orderEntries[1].setOrder(orders[0]);
  await orderEntries[2].setProduct(products[2]);
  await orderEntries[2].setOrder(orders[0]);


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
