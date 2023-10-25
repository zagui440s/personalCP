const uuid = require('uuid');

const uuidv4 = uuid.v4;

console.log('hello, world!')
const myUUID = uuidv4(); // Create a version 4 UUID
console.log('uuid is ', myUUID);


function createStore() {
    return {
        customers: [],
        videos: [],
    }
}

console.log('video store is ', createStore())

function createCustomer(name) {
    return {
      name: name.toLowerCase(),
      id: uuidv4(),
    }
}

console.log('new customer ', createCustomer('Alice'))