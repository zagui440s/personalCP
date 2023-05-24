import { useState } from "react";

export default function UndoComponent() {

    const [value, setValue] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [allValues, setAllValues] = useState([value]);

    const updateValue = () => {
        setValue(inputValue);
        setAllValues([...allValues, inputValue]);
    }

    const undo = () => {
        // need to create a new list, not modify old one
        const allButLast = allValues.slice(0, allValues.length - 1);
        setAllValues(allButLast);

        const newLast = allButLast[allButLast.length - 1];
        setValue(newLast);
    }

    return (
        <div>
            <h3>Value: {value}</h3>
            <div>
                <label>New value</label>
                <input type="number" value={inputValue} onChange={event => setInputValue(event.target.value)} />
                <button onClick={updateValue}>Update Value</button>
            </div>
            <pre>
                <h3>history</h3>
                <ol>
                    {allValues.map((prevValue, index) => <li key={index}>{prevValue}</li>)}
                </ol>
                <button onClick={undo} disabled={allValues.length === 1}>Undo</button>
            </pre>
        </div>
    );
}