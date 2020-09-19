import React from "react";
import "./StartScreen.css";

const StartScreen = ({ handleClose, gameStatus, children, score }) => {
  const showHideClassName =
    gameStatus === "inprogress" ? "modal display-none" : "modal display-block";

  console.log(showHideClassName);
  return (
    <div className={showHideClassName}>
      <section className="startScreen__main">
        {children}
        <button onClick={handleClose}>
          {gameStatus === "end" ? "Play Again" : "Start Game"}
        </button>
      </section>
    </div>
  );
};

export default StartScreen;
