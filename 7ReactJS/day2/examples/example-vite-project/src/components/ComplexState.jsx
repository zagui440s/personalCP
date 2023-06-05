import { useState } from "react";

export default function ComplexState() {
    const [newNameInput, setNewNameInput] = useState("");
    const [newTitleInput, setNewTitleInput] = useState("");

    const [names, setNames] = useState(["A", "B", "C"]);
    const [rental, setRental] = useState({
        id: 1,
        title: "The Big Lebowski",
        year: "1991",
        rating: "R"
    });

    const addName = () => {
        // guard 1
        if (newNameInput.length === 0) {
            console.error("can't add empty string");
        }
        // guard 2
        else if (names.findIndex(name => name === newNameInput) !== -1) {
            console.error("can't add existing name to name list");
        }
        // valid case
        else {
            setNames([...names, newNameInput]);
        }

        // always reset input
        setNewNameInput("");
    }

    const changeTitle = () => {
        if (newTitleInput.length === 0) {
            console.error("can't add empty string");
            return;
        }

        setRental({
            ...rental,
            title: newTitleInput
        })

        setNewTitleInput("");
    }


    return (
        <>
            <h2>names:</h2>
            <ul>
                {names.map((name, index) => <li key={index}>{name}</li>)}
            </ul>
            <h3>Add name:</h3>
            <input type="text" onChange={(event) => setNewNameInput(event.target.value)} />
            <button onClick={addName} value={newNameInput}>Add name</button>
            <h2>Rental</h2>
            <div style={{ border: "3px solid black", width: "fit-content", padding: "18px" }}>
                <p>{rental.title}</p>
                <pre>{rental.year}</pre>
                <pre>rated {rental.rating}</pre>
            </div>
            <h3>Change title:</h3>
            <input type="text" onChange={(event) => setNewTitleInput(event.target.value)} />
            <button onClick={changeTitle} value={newNameInput}>Change title</button>

        </>
    );
}