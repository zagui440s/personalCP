const uuid = require('uuid');
const store = require('./store')
const customer = require('./customer')

const uuidv4 = uuid.v4;

console.log('hello, world!')
const myUUID = uuidv4(); // Create a version 4 UUID
console.log('uuid is ', myUUID);

console.log('video store is ', store.createStore())

console.log('new customer ', customer.createCustomer('Alice'))