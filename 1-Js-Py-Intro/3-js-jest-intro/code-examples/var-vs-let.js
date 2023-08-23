function sumWithVar(n) {
    var sum = 0;

    for (var i = 0; i < n; i++) {
        sum += i;
    }

    console.log(
        `Hey can I still access ${i}? Yup it exists for the entire life of the function!`
    );

    return sum;
}

function sumWithLet(n) {
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += i;
    }

    console.log(
        `Hey can I still access ${i}? No of course not, why would that be useful behavior ?`
    );

    return sum;
}

sumWithVar(5); // 15
sumWithLet(5); // ReferenceError: i is not defined
