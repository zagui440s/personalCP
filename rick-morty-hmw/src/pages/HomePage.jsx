import { Link } from 'react-router-dom'; 

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Rick & Morty App</h1>
      <p>
        Explore characters, episodes, and more! Navigate below:
      </p>
      <nav>
        <Link to="/about">About</Link> | <Link to="/characters">Characters</Link>
      </nav>
    </div>
  );
};

export default HomePage;
