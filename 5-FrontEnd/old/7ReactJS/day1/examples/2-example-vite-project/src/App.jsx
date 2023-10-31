import Profile from "./components/Profile";

export default function App() {
  const hobbies = ["Dancing", "Kiting", "Surfing", "Dancing"];

  return (
    <div>
      <h1>List of hobbies</h1>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      <Profile name="Ben" imgUrl="www.google.com" hobbies={hobbies} />
    </div>
  );
}
