function sayMyName(name) {
    console.log(`Name is: ${name}`);
}

sayMyName('A');

setTimeout(() => sayMyName('B'), 2000);

setTimeout(() => sayMyName('C'), 0);

sayMyName('D');