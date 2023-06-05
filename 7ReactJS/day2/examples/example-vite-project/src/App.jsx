import { useState } from "react";
import Checkbox from './components/Checkbox';
import ComplexState from "./components/ComplexState";
import UndoComponent from "./components/UndoComponent";

export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  const onClickHandler = () => {
    setIsChecked(!isChecked);
  }

  return (
    <>
      <h1>hello world</h1>
      <button onClick={onClickHandler}>Click me</button>
      <div>
        <Checkbox label={"I am a transformer"} isChecked={isChecked} />
      </div>
      <ComplexState />
      <UndoComponent />
    </>
  );
}