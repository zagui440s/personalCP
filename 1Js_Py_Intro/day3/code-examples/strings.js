// Anything enclosed in single, double quotes, or back ticks is a string
const basicString = "I am a string";
const mixedString = "Me too, and I make doing 'this' look easy";
const backtickString = `Back ticks give you string interpolation: ${4 + 44}`;

// Interpolation is when you substitute a variable/expression into a string
const firstName = "tom";
console.log(`My first name is ${firstName}`);

// string are immutable, so you cannot change a string once created
firstName[0] = "T";
console.log(firstName); // still "tom", not "Tom"

// even though they are immutable, you can still use the value of one 
// string to create a brand new string. Strings are ultimately objects in 
// JavaScript(most things are) so they support a lot of useful methods

const properFirstName = firstName[0].toUpperCase() + firstName.slice(1);
console.log(`My proper first name is ${firstName}`);
