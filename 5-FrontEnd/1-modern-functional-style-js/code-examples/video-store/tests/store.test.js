// store.test.js
const store = require('../src/store');
const createStore = store.createStore;

test('createStore() new store has customers and videos arrays', () => {
    const newStore = createStore();
    expect(newStore.customers.length).toBe(0);
    expect(newStore.videos.length).toBe(0);
})