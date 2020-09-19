import React from "react";
import "./StartScreen.css";

const StartScreen = ({ handleClose, gameStatus, children, onKeyPress }) => {
  const showHideClassName =
    gameStatus === "inprogress" ? "modal display-none" : "modal display-block";

  console.log(showHideClassName);
  return (
    <div className={showHideClassName}>
      <section className="startScreen__main">
        {children}
        <button onClick={handleClose} onKeyPress={onKeyPress}>
          {gameStatus === "end" ? "Play Again" : "Start Game"}
        </button>
      </section>
    </div>
  );
};

export default StartScreen;
