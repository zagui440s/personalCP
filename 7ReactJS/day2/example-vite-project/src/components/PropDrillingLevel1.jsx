import PropDrillingLevel2 from "./PropDrillingLevel2";

export default function PropDrillingLevel1(props) {
  const { label, checked, setChecked } = props;

  return (
    <PropDrillingLevel2
      label={label}
      checked={checked}
      setChecked={setChecked}
    />
  );
}
