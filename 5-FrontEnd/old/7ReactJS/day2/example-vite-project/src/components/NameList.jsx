import { useState } from "react";

export default function NameList() {
  const [names, setNames] = useState(["Ben", "Francisco"]);
  const [inputText, setInputText] = useState("");

  const addNameHandler = () => {
    // add the name to the list
    setNames([...names, inputText]);
    // reset the input
    setInputText("");
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button onClick={addNameHandler}>Add Name</button>
      </div>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <pre>{inputText}</pre>
    </>
  );
}
