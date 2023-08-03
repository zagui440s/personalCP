import { useContext } from "react";
import CheckboxContext from "../contexts/CheckboxContext";
import DifferentContext from "../contexts/DifferentContext";

export default function ContextAwareCheckbox() {
  const { label, checked, setChecked } = useContext(CheckboxContext);
  const number = useContext(DifferentContext);

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
      <pre>My fave number {number}</pre>
    </>
  );
}
