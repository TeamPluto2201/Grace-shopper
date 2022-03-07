'use strict'

const { db, models: { User, Product, Order, OrderEntry, Color } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', isAdmin: true }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'kendra', password: '123' }),
    User.create({ username: 'alexandra', password: '123' }),
    User.create({ username: 'codey', password: '123' }),
    User.create({ username: 'aden', password: '123' }),
    User.create({ username: 'essa', password: '123' }),
    User.create({ username: 'tobi', password: '123' }),
    User.create({ username: 'reiss', password: '123' }),
    User.create({ username: 'wiktor', password: '123' }),
    User.create({ username: 'tabitha', password: '123' }),
    User.create({ username: 'montel', password: '123' }),
    User.create({ username: 'mia', password: '123' }),
    User.create({ username: 'roxanne', password: '123' }),
    User.create({ username: 'laurynn', password: '123' }),
    User.create({ username: 'safa', password: '123' }),
    User.create({ username: 'kloe', password: '123' }),
    User.create({ username: 'lottie', password: '123' }),
    User.create({ username: 'arandeep', password: '123' }),
    User.create({ username: 'hallam', password: '123' }),
    User.create({ username: 'aysha', password: '123' }),
    User.create({ username: 'sara', password: '123' }),
    User.create({ username: 'jamal', password: '123' }),
    User.create({ username: 'moshin', password: '123' }),
    User.create({ username: 'alena', password: '123' }),
    User.create({ username: 'shanon', password: '123' }),
    User.create({ username: 'catherine', password: '123' }),
    User.create({ username: 'lilly', password: '123' }),
    User.create({ username: 'griff', password: '123' }),
    User.create({ username: 'ezekiel', password: '123' }),
    User.create({ username: 'aedan', password: '123' }),
    User.create({ username: 'alba', password: '123' }),
    User.create({ username: 'ayoub', password: '123' }),
    User.create({ username: 'cheryl', password: '123' }),
    User.create({ username: 'valerie', password: '123' }),
    User.create({ username: 'jevan', password: '123' }),
    User.create({ username: 'eadie', password: '123' }),
  ])

  //Color
  const colors = await Promise.all([
    Color.create({name: 'white'}),
    Color.create({name: 'black'})
  ])

  // Creating Products
  const products = await Promise.all([
    Product.create({ designName: 'DIVA', price: 1000, imgPath: "/Shirt-1.png " }),
    Product.create({ designName: 'BLANCHE D\'ALMOND', price: 1100, imgPath: "/Shirt-2.png " }),
    Product.create({ designName: 'BROGLE', price: 1200, imgPath: "/Shirt-3.png " }),
    Product.create({ designName: 'GRACE HOPPER', price: 1300, imgPath: "/Shirt-4.png " }),
    Product.create({ designName: 'MOTH', price: 1400, imgPath: "/Shirt-5.png " }),
    Product.create({ designName: 'HACK', price: 1500, imgPath: "/Shirt-6.png " }),
  ])


  // Creating Orders
  const orders = await Promise.all([
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: false }),
    Order.create({ purchased: false }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: true }),
    Order.create({ purchased: false }),
    Order.create({ purchased: false }),
  ])

   // Creating Order Entries
   const orderEntries = await Promise.all([
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 10 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 3 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 3 }),
    OrderEntry.create({ size: 'L', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 3 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 5 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 7000 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 10 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 3 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 3 }),
    OrderEntry.create({ size: 'L', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 3 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 5 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 7000 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 10 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 3 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 3 }),
    OrderEntry.create({ size: 'L', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 1 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
    OrderEntry.create({ size: 'S', QTY: 1 }),
    OrderEntry.create({ size: 'L', QTY: 4 }),
    OrderEntry.create({ size: 'M', QTY: 3 }),
    OrderEntry.create({ size: 'M', QTY: 2 }),
  ])

  // Setting up associations

  /*
  Permutations:
          USERS
    - a user with multiple orders
    - a user with no orders
    - a user with multiple orders, one of which has not been purchased yet
    - a user with multiple orders, all purchased

        PRODUCTS
    - a product multiple people have bought
    - a product multiple people have in open orders

        ORDERS
    - an order that has been purchased
    - an order than has not been purchased
  */

  //User 0 orders
  await users[0].addOrder(orders[0]);
  await users[0].addOrder(orders[1]);
  await orderEntries[0].setOrder(orders[0]);
  await orderEntries[0].setProduct(products[0]);
  await orderEntries[0].setColor(colors[0])
  await orderEntries[1].setOrder(orders[0]);
  await orderEntries[1].setProduct(products[1]);
  await orderEntries[1].setColor(colors[0])
  await orderEntries[2].setOrder(orders[0]);
  await orderEntries[2].setProduct(products[2]);
  await orderEntries[2].setColor(colors[1])
  await orderEntries[3].setOrder(orders[1]);
  await orderEntries[3].setProduct(products[2]);
  await orderEntries[3].setColor(colors[1])

  //User 1 orders
  await users[1].addOrder(orders[2]);
  await users[1].addOrder(orders[3]);
  await orderEntries[4].setOrder(orders[2]);
  await orderEntries[4].setProduct(products[0]);
  await orderEntries[4].setColor(colors[1])
  await orderEntries[5].setOrder(orders[3]);
  await orderEntries[5].setProduct(products[5]);
  await orderEntries[5].setColor(colors[0])
  await orderEntries[6].setOrder(orders[3]);
  await orderEntries[6].setProduct(products[4]);
  await orderEntries[6].setColor(colors[1])
  await orderEntries[7].setOrder(orders[3]);
  await orderEntries[7].setProduct(products[2]);
  await orderEntries[7].setColor(colors[0])

  //User 2 orders
  await users[2].addOrder(orders[4]);
  await users[2].addOrder(orders[5]);
  await users[2].addOrder(orders[6]);
  await users[2].addOrder(orders[7]);
  await users[2].addOrder(orders[8]);
  await orderEntries[8].setOrder(orders[4]);
  await orderEntries[8].setProduct(products[0]);
  await orderEntries[8].setColor(colors[1])
  await orderEntries[9].setOrder(orders[4]);
  await orderEntries[9].setProduct(products[1]);
  await orderEntries[9].setColor(colors[0])
  await orderEntries[10].setOrder(orders[5]);
  await orderEntries[10].setProduct(products[2]);
  await orderEntries[10].setColor(colors[0])
  await orderEntries[11].setOrder(orders[5]);
  await orderEntries[11].setProduct(products[3]);
  await orderEntries[11].setColor(colors[0])
  await orderEntries[12].setOrder(orders[6]);
  await orderEntries[12].setProduct(products[3]);
  await orderEntries[12].setColor(colors[0])
  await orderEntries[13].setOrder(orders[6]);
  await orderEntries[13].setProduct(products[2]);
  await orderEntries[13].setColor(colors[0])
  await orderEntries[14].setOrder(orders[7]);
  await orderEntries[14].setProduct(products[4]);
  await orderEntries[14].setColor(colors[0])
  await orderEntries[15].setProduct(products[5]);
  await orderEntries[15].setOrder(orders[7]);
  await orderEntries[15].setColor(colors[0])
  await orderEntries[16].setProduct(products[0]);
  await orderEntries[16].setOrder(orders[8]);
  await orderEntries[16].setColor(colors[0])
  await orderEntries[17].setOrder(orders[8]);
  await orderEntries[17].setProduct(products[0]);
  await orderEntries[17].setColor(colors[0])

  //User 3 orders
  await users[3].addOrder(orders[9]);
  await orderEntries[18].setOrder(orders[9]);
  await orderEntries[18].setProduct(products[0]);
  await orderEntries[18].setColor(colors[1])
  await orderEntries[19].setOrder(orders[9]);
  await orderEntries[19].setProduct(products[1]);
  await orderEntries[19].setColor(colors[1])
  await orderEntries[20].setOrder(orders[9]);
  await orderEntries[20].setProduct(products[1]);
  await orderEntries[20].setColor(colors[0])
  await orderEntries[21].setOrder(orders[9]);
  await orderEntries[21].setProduct(products[2]);
  await orderEntries[21].setColor(colors[1])

  //User 4 orders
  await users[4].addOrder(orders[10]);
  await users[4].addOrder(orders[11]);
  await orderEntries[22].setOrder(orders[10]);
  await orderEntries[22].setProduct(products[1]);
  await orderEntries[22].setColor(colors[1])
  await orderEntries[23].setOrder(orders[10]);
  await orderEntries[23].setProduct(products[3]);
  await orderEntries[23].setColor(colors[0])
  await orderEntries[24].setOrder(orders[10]);
  await orderEntries[24].setProduct(products[2]);
  await orderEntries[24].setColor(colors[1])
  await orderEntries[25].setOrder(orders[11]);
  await orderEntries[25].setProduct(products[3]);
  await orderEntries[25].setColor(colors[0])
  await orderEntries[26].setOrder(orders[11]);
  await orderEntries[26].setProduct(products[4]);
  await orderEntries[26].setColor(colors[1])
  await orderEntries[27].setOrder(orders[11]);
  await orderEntries[27].setProduct(products[5]);
  await orderEntries[27].setColor(colors[1])

  //User 5 orders
  await users[5].addOrder(orders[12]);
  await users[5].addOrder(orders[13]);
  await orderEntries[28].setOrder(orders[12]);
  await orderEntries[28].setProduct(products[5]);
  await orderEntries[28].setColor(colors[0])
  await orderEntries[29].setOrder(orders[12]);
  await orderEntries[29].setProduct(products[0]);
  await orderEntries[29].setColor(colors[1])
  await orderEntries[30].setOrder(orders[12]);
  await orderEntries[30].setProduct(products[3]);
  await orderEntries[30].setColor(colors[0])
  await orderEntries[31].setOrder(orders[12]);
  await orderEntries[31].setProduct(products[1]);
  await orderEntries[31].setColor(colors[1])
  await orderEntries[32].setOrder(orders[13]);
  await orderEntries[32].setProduct(products[0]);
  await orderEntries[32].setColor(colors[0])

  //User 6 orders
  await users[6].addOrder(orders[14]);
  await orderEntries[33].setOrder(orders[14]);
  await orderEntries[33].setProduct(products[2]);
  await orderEntries[33].setColor(colors[0])

  //User 7 orders
  await users[7].addOrder(orders[15]);
  await users[7].addOrder(orders[16]);
  await users[7].addOrder(orders[17]);
  await users[7].addOrder(orders[18]);
  await users[7].addOrder(orders[19]);
  await users[7].addOrder(orders[20]);
  await orderEntries[34].setOrder(orders[15]);
  await orderEntries[34].setProduct(products[1]);
  await orderEntries[34].setColor(colors[1])
  await orderEntries[35].setOrder(orders[16]);
  await orderEntries[35].setProduct(products[2]);
  await orderEntries[35].setColor(colors[1])
  await orderEntries[36].setOrder(orders[17]);
  await orderEntries[36].setProduct(products[0]);
  await orderEntries[36].setColor(colors[1])
  await orderEntries[37].setOrder(orders[18]);
  await orderEntries[37].setProduct(products[3]);
  await orderEntries[37].setColor(colors[0])
  await orderEntries[38].setOrder(orders[19]);
  await orderEntries[38].setProduct(products[4]);
  await orderEntries[38].setColor(colors[0])
  await orderEntries[39].setOrder(orders[20]);
  await orderEntries[39].setProduct(products[5]);
  await orderEntries[39].setColor(colors[0])
  await orderEntries[40].setOrder(orders[20]);
  await orderEntries[40].setProduct(products[0]);
  await orderEntries[40].setColor(colors[0])
  await orderEntries[41].setOrder(orders[20]);
  await orderEntries[41].setProduct(products[1]);
  await orderEntries[41].setColor(colors[0])
  await orderEntries[42].setOrder(orders[20]);
  await orderEntries[42].setProduct(products[2]);
  await orderEntries[42].setColor(colors[1])
  await orderEntries[43].setOrder(orders[20]);
  await orderEntries[43].setProduct(products[4]);
  await orderEntries[43].setColor(colors[0])

  //User 8 orders
  await users[8].addOrder(orders[21]);
  await orderEntries[44].setOrder(orders[21]);
  await orderEntries[44].setProduct(products[0]);
  await orderEntries[44].setColor(colors[1])
  await orderEntries[45].setOrder(orders[21]);
  await orderEntries[45].setProduct(products[1]);
  await orderEntries[45].setColor(colors[0])
  await orderEntries[46].setOrder(orders[21]);
  await orderEntries[46].setProduct(products[2]);
  await orderEntries[46].setColor(colors[1])
  await orderEntries[47].setOrder(orders[21]);
  await orderEntries[47].setProduct(products[3]);
  await orderEntries[47].setColor(colors[0])
  await orderEntries[48].setOrder(orders[21]);
  await orderEntries[48].setProduct(products[4]);
  await orderEntries[48].setColor(colors[1])
  await orderEntries[49].setOrder(orders[21]);
  await orderEntries[49].setProduct(products[5]);
  await orderEntries[49].setColor(colors[0])

  //User 9 orders
  await users[9].addOrder(orders[22]);
  await orderEntries[50].setOrder(orders[22]);
  await orderEntries[50].setProduct(products[0]);
  await orderEntries[50].setColor(colors[1])
  await orderEntries[51].setOrder(orders[22]);
  await orderEntries[51].setProduct(products[1]);
  await orderEntries[51].setColor(colors[0])
  await orderEntries[52].setOrder(orders[22]);
  await orderEntries[52].setProduct(products[1]);
  await orderEntries[52].setColor(colors[1])
  await orderEntries[53].setOrder(orders[22]);
  await orderEntries[53].setProduct(products[3]);
  await orderEntries[53].setColor(colors[0])
  await orderEntries[54].setOrder(orders[22]);
  await orderEntries[54].setProduct(products[4]);
  await orderEntries[54].setColor(colors[1])
  await orderEntries[55].setOrder(orders[22]);
  await orderEntries[55].setProduct(products[5]);
  await orderEntries[55].setColor(colors[1])

  //User 10 orders
  await users[10].addOrder(orders[23]);
  await orderEntries[56].setOrder(orders[23]);
  await orderEntries[56].setProduct(products[0]);
  await orderEntries[56].setColor(colors[1])
  await orderEntries[57].setOrder(orders[23]);
  await orderEntries[57].setProduct(products[1]);
  await orderEntries[57].setColor(colors[0])
  await orderEntries[58].setOrder(orders[23]);
  await orderEntries[58].setProduct(products[2]);
  await orderEntries[58].setColor(colors[0])
  await orderEntries[59].setOrder(orders[23]);
  await orderEntries[59].setProduct(products[3]);
  await orderEntries[59].setColor(colors[1])

  //User 11 orders
  await users[11].addOrder(orders[24]);

  
  //User 12 orders
  await users[12].addOrder(orders[25]);
  await orderEntries[60].setOrder(orders[25]);
  await orderEntries[60].setProduct(products[0]);
  await orderEntries[60].setColor(colors[0])
  await orderEntries[61].setOrder(orders[25]);
  await orderEntries[61].setProduct(products[1]);
  await orderEntries[61].setColor(colors[1])
  await orderEntries[62].setOrder(orders[25]);
  await orderEntries[62].setProduct(products[2]);
  await orderEntries[62].setColor(colors[0])
  await orderEntries[63].setOrder(orders[25]);
  await orderEntries[63].setProduct(products[3]);
  await orderEntries[63].setColor(colors[0])
  await orderEntries[64].setOrder(orders[25]);
  await orderEntries[64].setProduct(products[4]);
  await orderEntries[64].setColor(colors[1])


  //User 13 orders
  await users[13].addOrder(orders[26]);
  await users[13].addOrder(orders[27]);
  await users[13].addOrder(orders[28]);
  await orderEntries[65].setOrder(orders[26]);
  await orderEntries[65].setProduct(products[0]);
  await orderEntries[65].setColor(colors[1])
  await orderEntries[66].setOrder(orders[26]);
  await orderEntries[66].setProduct(products[1]);
  await orderEntries[66].setColor(colors[0])
  await orderEntries[67].setOrder(orders[27]);
  await orderEntries[67].setProduct(products[0]);
  await orderEntries[67].setColor(colors[1])
  await orderEntries[68].setOrder(orders[27]);
  await orderEntries[68].setProduct(products[2]);
  await orderEntries[68].setColor(colors[1])
  await orderEntries[69].setOrder(orders[28]);
  await orderEntries[69].setProduct(products[0]);
  await orderEntries[69].setColor(colors[1])
  await orderEntries[70].setOrder(orders[28]);
  await orderEntries[70].setProduct(products[4]);
  await orderEntries[70].setColor(colors[1])

  //User 14 orders
  await users[14].addOrder(orders[29]);
  await users[14].addOrder(orders[30]);
  await users[14].addOrder(orders[31]);
  await users[14].addOrder(orders[32]);
  await orderEntries[71].setOrder(orders[29]);
  await orderEntries[71].setProduct(products[2]);
  await orderEntries[71].setColor(colors[1])
  await orderEntries[72].setOrder(orders[29]);
  await orderEntries[72].setProduct(products[0]);
  await orderEntries[72].setColor(colors[1])
  await orderEntries[73].setOrder(orders[29]);
  await orderEntries[73].setProduct(products[1]);
  await orderEntries[73].setColor(colors[1])
  await orderEntries[74].setOrder(orders[30]);
  await orderEntries[74].setProduct(products[4]);
  await orderEntries[74].setColor(colors[1])
  await orderEntries[75].setOrder(orders[31]);
  await orderEntries[75].setProduct(products[0]);
  await orderEntries[75].setColor(colors[1])
  await orderEntries[76].setOrder(orders[32]);
  await orderEntries[76].setProduct(products[5]);
  await orderEntries[76].setColor(colors[1])
  await orderEntries[77].setOrder(orders[32]);
  await orderEntries[77].setProduct(products[2]);
  await orderEntries[77].setColor(colors[1])
  await orderEntries[78].setOrder(orders[32]);
  await orderEntries[78].setProduct(products[0]);
  await orderEntries[78].setColor(colors[0])

  //User 15 orders
  await users[15].addOrder(orders[33]);
  await orderEntries[79].setOrder(orders[33]);
  await orderEntries[79].setProduct(products[0]);
  await orderEntries[79].setColor(colors[1])
  await orderEntries[80].setOrder(orders[33]);
  await orderEntries[80].setProduct(products[0]);
  await orderEntries[80].setColor(colors[0])
  await orderEntries[81].setOrder(orders[33]);
  await orderEntries[81].setProduct(products[0]);
  await orderEntries[81].setColor(colors[1])

  //User 16 orders
  await users[16].addOrder(orders[34]);
  await orderEntries[82].setOrder(orders[34]);
  await orderEntries[82].setProduct(products[1]);
  await orderEntries[82].setColor(colors[1])
  await orderEntries[83].setOrder(orders[34]);
  await orderEntries[83].setProduct(products[4]);
  await orderEntries[83].setColor(colors[0])
  await orderEntries[84].setOrder(orders[34]);
  await orderEntries[84].setProduct(products[0]);
  await orderEntries[84].setColor(colors[1])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      kendra: users[2],
      alexandra: users[3],
      codey: users[4],
      aden: users[5],
      ess: users[6],
      tobi: users[7],
      resiss: users[8],
      wiktor: users[9],
      tabitha: users[10],
      montel: users[11],
      mia: users[12],
      roxanne: users[13],
      laurynn: users[14],
      safa: users[15],
      kloe: users[16],
      lottie: users[17],
      arandeep: users[18],
      hallam: users[19],
      aysha: users[20],
      sara: users[21],
      jamal: users[22],
      moshin: users[23],
      alena: users[24],
      shanon: users[25],
      catherine: users[26],
      lilly: users[27],
      griff: users[28],
      ezekiel: users[29],
      aedan: users[30],
      alba: users[31],
      ayoub: users[32],
      cheryl: users[33]
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
