import { useState } from "react";
import Checkbox from "./components/Checkbox";
import ControlledCheckbox from "./components/ControlledCheckbox";
import NameList from "./components/NameList";
import ComplexState from "./components/ComplexState";
import PropDrilling from "./components/PropDrilling";
import CheckboxContext from "./contexts/CheckboxContext";
import ContextAwareCheckbox from "./components/ContextAwareCheckbox";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <div>
        <Checkbox label="self contained" />
      </div> */}
      {/* <div>
        <ControlledCheckbox
          label="controlled"
          checked={checked}
          setChecked={setChecked}
        />
        <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
      </div> */}
      {/* <NameList /> */}
      {/* <ComplexState /> */}
      {/* <PropDrilling label="drilled" checked={checked} setChecked={setChecked} /> */}
      <CheckboxContext.Provider
        value={{
          label: "from context",
          checked,
          setChecked,
        }}
      >
        <ContextAwareCheckbox />
      </CheckboxContext.Provider>
    </>
  );
}
