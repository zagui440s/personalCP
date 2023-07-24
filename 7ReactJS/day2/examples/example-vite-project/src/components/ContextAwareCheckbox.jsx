import { useContext } from "react";
import CheckboxContext from "../contexts/CheckboxContext";

export default function ContextAwareCheckbox() {
  const { label, checked, setChecked } = useContext(CheckboxContext);

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
    </>
  );
}
