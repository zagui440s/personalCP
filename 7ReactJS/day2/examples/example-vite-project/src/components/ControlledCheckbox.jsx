export default function ControlledCheckbox(props) {
  const { label, checked, setChecked } = props;
  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </>
  );
}
