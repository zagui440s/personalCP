import { createContext } from 'react';

// initial context values can be dummy data, just need the keys to match
const CountContext = createContext({
    count: 0,
    setCount: () => { }
});

export default CountContext;