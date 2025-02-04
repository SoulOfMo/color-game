import { useEffect, useState } from "react";

const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [colorOptions, setColorOptions] = useState([]);
  const [message, setMessages] = useState("");
  const [status, setStatus] = useState(false);

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
    }, 2000);
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

  function hanleNewewGame() {
    setScore(0);
    handleReset();
    setMessages("");
  }
  useEffect(() => {
    handleReset();
  }, []);

  return (
    <main>
      <GameInstruction />
      <TargetColorBox targetColor={targetColor} />
      {/* {status && <GameStatus score={score} message={message} />} */}
      <GameStatus score={score} message={message} />
      <ColorOptions
        status={status}
        options={colorOptions}
        handleGuess={handleGuess}
      />
      <Score />
      <ResetButton onNewGame={hanleNewewGame} />
    </main>
  );
}

export default App;

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

function GameStatus({ message, status }) {
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
