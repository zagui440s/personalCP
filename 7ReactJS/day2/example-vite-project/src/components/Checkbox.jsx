import { useState } from "react";

export default function Checkbox(props) {
  const { label } = props;

  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onCheckChangeCallback = (event) => {
    const newValue = !checked;
    setChecked(newValue);
  };

  const onInputChangeCallback = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheckChangeCallback}
      />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
      <input type="text" value={inputValue} onChange={onInputChangeCallback} />
      <pre>{inputValue}</pre>
    </>
  );
}
