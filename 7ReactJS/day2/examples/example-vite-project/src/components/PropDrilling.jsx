import PropDrillingLevel1 from "./PropDrillingLevel1";

export default function PropDrilling(props) {
  const { label, checked, setChecked } = props;

  return (
    <PropDrillingLevel1
      label={label}
      checked={checked}
      setChecked={setChecked}
    />
  );
}
