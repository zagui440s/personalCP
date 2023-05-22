// in a real world situation this would be read from the operating system but this is for demo sake
const listOFiles = [
    'abc.js',
    'def.js',
    'ghi.py',
    'jkl.txt',
    'mno.ts',
    'pqr.png',
    'stu.jsx',
    'vwx.jpq',
    'yzz.jsx'
];

const validFiles = [];

for (const file of listOFiles) {
    if (file.match(/.*\.jsx?/)) {
        validFiles.push(file);
    }
}

console.log(validFiles); // [ 'abc.js', 'def.js', 'stu.jsx', 'yzz.jsx' ]