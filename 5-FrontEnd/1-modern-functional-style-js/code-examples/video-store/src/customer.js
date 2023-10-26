// customer.js
const uuid = require('uuid');

const uuidv4 = uuid.v4;

function createCustomer(name) {
    return {
      name: name.toLowerCase(),
      id: uuidv4(),
    }
}

module.exports = {
    createCustomer,
}