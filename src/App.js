import { useEffect, useState } from "react";

const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [colorOptions, setColorOptions] = useState([]);
  const [message, setMessages] = useState("");
  const [status, setStatus] = useState(false);
  const [darkTheme, setDarkTheme] = useState("dark");

  function RandomColorGenerator() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += colors[Math.floor(Math.random() * colors.length)];
    }
    return color;
  }

  function RandomColorOptions(targetColor) {
    const options = [targetColor];
    while (options.length < 6) {
      let randomColor = RandomColorGenerator();
      if (!options.includes(randomColor)) {
        options.push(randomColor);
      }
    }

    return options.sort(() => Math.random() - 0.5);
  }

  function Timeout() {
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  }

  function handleGuess(selectedcolor) {
    if (selectedcolor === targetColor) {
      setScore((score) => score + 1);
      setMessages("Correct Guess 🎉");

      Timeout();
      handleReset();
    } else {
      setStatus(true);
      setMessages("Wrong Guess ❌");
      Timeout();
    }
    // console.log(score);
  }

  function handleReset() {
    const newTarget = RandomColorGenerator();
    setTargetColor(newTarget);
    setColorOptions(RandomColorOptions(newTarget));
  }

  function hanleNewGame() {
    setScore(0);
    handleReset();
    setMessages("");
  }

  function handleTheme() {
    setDarkTheme((curTheme) => (curTheme === "dark" ? "" : "dark"));
  }

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <main className={darkTheme === "dark" ? "bg-dark" : "bg-light"}>
      {/* <GameInstruction handleTheme={handleTheme} themeState={darkTheme} /> */}
      <Header handleTheme={handleTheme} themeState={darkTheme} />
      <TargetColorBox targetColor={targetColor} />
      <GameStatus message={message} />
      <ColorOptions
        status={status}
        options={colorOptions}
        handleGuess={handleGuess}
      />
      <Score score={score} />
      <ResetButton onNewGame={hanleNewGame} />
    </main>
  );
}

export default App;

function Header({ themeState, handleTheme }) {
  return (
    <div className="header">
      <GameInstruction />
      <div className="toggle" onClick={handleTheme}>
        {themeState === "dark" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path
              fill="#F8F9FA"
              fill-rule="evenodd"
              d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path
              fill="#2D2D2D"
              fill-rule="evenodd"
              d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
function GameInstruction() {
  return <h1 data-testid="gameInstructions">Guess the correct color</h1>;
}

function TargetColorBox({ targetColor }) {
  return (
    <div
      data-testid="colorBox"
      className="color-box"
      style={{ backgroundColor: targetColor }}
    ></div>
  );
}

function GameStatus({ message }) {
  return (
    <p className="message" data-testid="gameStatus">
      {message}
    </p>
  );
}

function ColorOptions({ options, handleGuess, status }) {
  return (
    <div className="color-options-container">
      {options.map((color) => (
        <ColorOption
          status={status}
          handleGuess={handleGuess}
          backgroundColor={color}
          key={color}
        />
      ))}
    </div>
  );
}

function Score({ score }) {
  return (
    <p className="score" data-testid="score">
      Your Score: {score}
    </p>
  );
}

function ResetButton({ onNewGame }) {
  return (
    <button
      className="reset-btn"
      data-testid="newGameButton"
      onClick={onNewGame}
    >
      New Game
    </button>
  );
}

function ColorOption({ backgroundColor, handleGuess, status }) {
  return (
    <button
      className={status === true ? "color-option wrong" : "color-option"}
      data-testid="colorOption"
      onClick={() => handleGuess(backgroundColor)}
      style={{ backgroundColor: backgroundColor }}
    ></button>
  );
}
