// defining helper function to to 'mock' a request
// and a flag to choose the response we want
function mockRequest(resolve, reject, flag) {
  setTimeout(() => {
    if (flag) {
      resolve("Promise success!");
    } else {
      reject("Promise failiure :(");
    }
  }, 2000);
}

function promise1Callback(resolve, reject) {
  return mockRequest(resolve, reject, true);
}

function promise2Callback(resolve, reject) {
  return mockRequest(resolve, reject, true);
}

// create a Promise from our own callback
// new Promise itself takes (resolve, reject)
// You will generally not have to define a Promise yourself
// a library like axios will have this logic already baked in
// to a function like 'axios.get()' or 'axios.post()'
const promise1 = new Promise(promise1Callback);

// use Promise API to handle chaining/failure
promise1
  // .then will trigger on response (resolve or reject called)
  .then((response) => {
    console.log(response);
    // trigger the next promise and return it
    const promise2 = new Promise(promise2Callback);
    return promise2;
  })
  // the next .then will trigger on response to promise2 resolving
  .then((response) => {
    console.log(response);
  })
  // either faliure will end up here
  .catch((error) => {
    console.error(error);
  })
  //   will happen in succes or faliure case
  .finally(() => {
    console.log("I happen either way");
  });
