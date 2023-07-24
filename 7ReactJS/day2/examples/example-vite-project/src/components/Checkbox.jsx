import { useState } from "react";

export default function Checkbox(props) {
  const { label } = props;

  const [checked, setChecked] = useState(false);

  const onChangeCallback = (event) => {
    setChecked(!checked);
  };

  return (
    <>
      <label>{label}</label>
      <input type="checkbox" checked={checked} onChange={onChangeCallback} />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
    </>
  );
}
