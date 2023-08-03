export default function PropDrillingLevel2(props) {
  const { label, checked, setChecked } = props;

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
