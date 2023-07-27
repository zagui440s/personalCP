import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { feedback } = useOutletContext();

  return (
    <>
      <h2>This is the Home page</h2>
      {feedback.length > 0 && (
        <>
          <h3>Looks like we got some feedback:</h3>
          <pre>{feedback}</pre>
        </>
      )}
    </>
  );
}
