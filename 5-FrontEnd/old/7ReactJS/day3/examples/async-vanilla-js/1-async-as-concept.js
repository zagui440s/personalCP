// function definition is sync

// that means the program doesn't continue evaluating until
// said command (defining a function) is complete

// we are naming these explicitly for convenience and better
// debug output in https://www.jsv9000.app/
function sayMyNameA() {
  console.log("Alpha");
}

function sayMyNameB() {
  console.log("Bravo");
}

function sayMyNameC() {
  console.log("Charlie");
}

function sayMyNameD() {
  console.log("Delta");
}

function sayMyNameE() {
  console.log("Echo");
}

// function evaluation is sync, this runs immediately
sayMyNameA();

// evaluating setTimeout itself is sync

// HOWEVER: setTimeout is used to setup an async call
// the first argument is the function to run, the second how many ms later
// so we are saying 'call sayMyNameB in 2 seconds'
setTimeout(sayMyNameB, 2000);

// but we don't wait around for the response
// so the next sync command runs immediately
sayMyNameC();

// We set up another async call. Notice we set it to 0 ms.
// This doesn't mean it runs immediately, but 0 seconds after
// sync phase ends
setTimeout(sayMyNameD, 0);

// another sync call
sayMyNameE();

// once all sync calls are done, we start evaluating the async code
// this is much more easily visualized using https://www.jsv9000.app/
