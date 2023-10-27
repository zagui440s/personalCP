/* main.mjs
 * Demo code for basics of ES Modules
 */

import sayHello, { goodbyeAll, sayGoodbye, HELLO_WORLD } from "./hello.mjs"; // Note the relative path

// We use any name for default import we want
// import sayHelloToTheWorld from "./hello.mjs"; // Note the relative path
// sayHelloToTheWorld()

sayHello();
console.log(HELLO_WORLD)
sayGoodbye();
goodbyeAll();
