import { useOutletContext } from "react-router-dom";

export default function ContactUsPage() {
  const { feedback, setFeedback } = useOutletContext();

  return (
    <>
      <h2>This is the Contact Us page</h2>
      <h3>What's your complaint?</h3>
      <textarea
        rows={20}
        cols={50}
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
      />
    </>
  );
}
