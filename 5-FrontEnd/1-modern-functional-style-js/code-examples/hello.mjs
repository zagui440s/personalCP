/* hello.mjs
 * Demo code for basics of ES Modules
 */

function sayHello() {
    console.log('hello!')
}

function sayGoodbye() {
    console.log('goodbye!')
}

const anotherGoodbye = () => 'another goodbye';
export const HELLO_WORLD = 'hello, world!';
export const goodbyeAll = () => 'goodbye, all!';
export {
    sayGoodbye,
    anotherGoodbye,
}

export default sayHello