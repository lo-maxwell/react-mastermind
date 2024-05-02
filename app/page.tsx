'use client'
// Allows useState and onClick, which are client side hooks
import React, { useEffect, useState } from "react";
import {DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, ColorMap} from "./GameConstants";
import { Board, BoardComponent } from "./Board";
import { ColorPalette, ColorPaletteComponent } from "./ColorPalette";
import { ColorSelectorComponent, Game } from "./Game";
import { SelectedColorContext } from "./SelectedColorContext";
import { AnswerKeyContext, AnswerKeyComponent } from "./AnswerKey";
import { Config } from "./Config";
import { InstructionPage } from "./InstructionPage";

// const game = new Game();
// game.generateGame(DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, []);
// let gameBoard = game.board;
// let colorPalette = game.colorPalette;
// game.setupGame(gameBoard, colorPalette);

export default function Home() {
  const createGame = (numRows: number, numCols: number, numColors: number, overrideAnswerColors: Array<string>) => {
    const newGame = new Game();
    newGame.generateGame(numRows, numCols, numColors, []);
    return newGame;
  }

  const [game, setGame] = useState(createGame(DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, []));
  const [gameBoard, setGameBoard] = useState(game.board);
  const [colorPalette, setColorPalette] = useState(game.colorPalette);
  const [selectedColor, setSelectedColor] = useState("white");
  const selectedColorContext = { selectedColor: selectedColor, setSelectedColor: setSelectedColor };
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const showAnswerKeyContext = {showAnswerKey: showAnswerKey, setShowAnswerKey: setShowAnswerKey};
  // We use this to force the rerender of all child components when we restart the game. 
  // Note that this is an expensive hack which is usable for this small program, 
  // but should not be used in large models.
  const [forceRerenderKey, setForceRerenderKey] = useState(1);
  
  const restartGame = () => {
    const newGame = createGame(parseInt(formData.rows), parseInt(formData.cols), parseInt(formData.colors), []);
    setGame(newGame);
    setGameBoard(newGame.board);
    setColorPalette(newGame.colorPalette);
    setSelectedColor("white");
    setShowAnswerKey(false);
    setForceRerenderKey(forceRerenderKey => forceRerenderKey + 1);
  }

  //Config Form stuff -- can I move this to an external file somehow? Maybe a context?
  const [showForm, setShowForm] = useState(false);
  const showConfigForm = () => {
    setShowForm(true);
  }
  //Config Form
  const [formData, setFormData] = useState({
    rows: String(DEFAULT_NUM_GUESSES),
    cols: String(DEFAULT_ROW_SIZE),
    colors: String(DEFAULT_NUM_COLORS)
  });

  const [originalFormData, setOriginalFormData] = useState({
    rows: String(DEFAULT_NUM_GUESSES),
    cols: String(DEFAULT_ROW_SIZE),
    colors: String(DEFAULT_NUM_COLORS)
  });

  const handleGameConfigFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log('Form changed', formData);

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleGameConfigFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = handleGameFormSubmitHelper();
    setFormData(newData);
    setOriginalFormData(newData);
    setShowForm(false);
  };

  function handleGameFormSubmitHelper() {
    const newData = {
      rows: formData['rows'],
      cols: formData['cols'],
      colors: formData['colors']
    }
    let newRows = parseInt(formData['rows'], 10) || DEFAULT_NUM_GUESSES;
    let newCols = parseInt(formData['cols'], 10) || DEFAULT_ROW_SIZE;
    let newColors = parseInt(formData['colors'], 10) || DEFAULT_NUM_COLORS;
    newData['rows'] = String(newRows);
    newData['cols'] = String(newCols);
    newData['colors'] = String(newColors);
    return newData;
  }

  //Instructions page
  const [showInstructions, setShowInstructions] = useState(false);
  const showInstructionsPage = () => {
    setShowInstructions(true);
  }

  return (<>
  <div className="fixed px-4 inset-0 mx-auto space-y-2 shadow-lg bg-gray-400 h-screen overflow-x-auto overflow-y-auto">
      <div className="text-center space-y-0.5 px-8 pb-4 bg-gray-400 text-black ">
        <div className="flex">
          <span className="flex-1 mr-auto invisible"> . </span>
          <span className="flex-1 text-2xl font-bold justify-center">Mastermind!</span>
          <span className="flex flex-1 justify-end relative"><button onClick={showInstructionsPage} className="text-3xl absolute top-4 right-0">ℹ️</button></span>
        </div>
    <SelectedColorContext.Provider value={selectedColorContext} key={forceRerenderKey}>
      <AnswerKeyContext.Provider value={showAnswerKeyContext}>
      <span className="">
        <span className="absolute top-4 left-8">
          <div>Current color: </div>
            <ColorSelectorComponent/>
        </span>
      </span>
      <div className="flex justify-center flex-5 space-x-4">
        
        <span className="flex">
          <button className="bg-blue-200 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" onClick={restartGame}>
            Restart Game
          </button>
        </span>
          <span className="flex"><button onClick={showConfigForm} className="bg-blue-200 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Customize Board</button></span>
        </div>
      <div className="flex justify-center">
      <div className="flex mx-8">
        <ColorPaletteComponent colorPalette={colorPalette} board={gameBoard}/>
      </div>
        <div>
        <div className="text-lg">
          <BoardComponent board={gameBoard}/>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-2 border-black dark:bg-gray-700"/>
        <div className="flex justify-left">
          <AnswerKeyComponent bubbles={gameBoard.answerColors}/>
        </div>
        </div>
      </div>
      
      
      </AnswerKeyContext.Provider>
    </SelectedColorContext.Provider>
    <div className="flex justify-center">
    <Config 
      formData={formData}
      setFormData={setFormData}
      handleInputChange={handleGameConfigFormInputChange}
      handleSubmit={handleGameConfigFormSubmit}
      showForm={showForm}
      setShowForm={setShowForm}
      originalForm={originalFormData}
      setOriginalForm={setOriginalFormData}
    />
  </div>
  <div className="">
        <InstructionPage
          showInstructions={showInstructions}
          setShowInstructions={setShowInstructions}
        />
      </div>
  </div>
  </div>
  </>
  );
}
