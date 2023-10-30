import "./App.css";

function App() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const gameName = "Random Number Guesser"
  console.log(randomNumber) //why is this logging to the console twice? (Strict Mode?)
  const guessNumber = (e) => {
    e.preventDefault();
    let userInput = document.getElementById("userInput");
    let result = document.getElementById("result");
    if (userInput.value > randomNumber) {
      result.innerHTML = "<h3>Too High</h3>";
    } else if (userInput.value < randomNumber) {
      result.innerHTML = "<h3>Too Low</h3>";
    } else {
      result.innerHTML = "<h1>You Won!</h1>";
    }
  };

  return (
    <>
      <h1>{gameName}</h1>
      {/* 
      if you are passing an argument to a function you 
      must do it through an arrow function 
      */}
      <form onSubmit={(e) => guessNumber(e)}>
        <input type="number" id="userInput" />
        <button type="submit">Submit</button>
      </form>
      <div id="result">
        <h3>Make a guess</h3>
      </div>
    </>
  );
}

export default App;
