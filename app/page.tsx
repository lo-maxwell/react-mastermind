'use client'
// Allows useState and onClick, which are client side hooks
import React, { useEffect, useState } from "react";
import {DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, ColorMap} from "./GameConstants";
import { Board, BoardComponent } from "./Board";
import { ColorPalette, ColorPaletteComponent } from "./ColorPalette";
import { ColorSelectorComponent, Game } from "./Game";
import { SelectedColorContext } from "./SelectedColorContext";
import { AnswerKeyContext, AnswerKeyComponent } from "./AnswerKey";

const game = new Game();
const gameBoard = new Board(DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, game, []);
const colorPalette = new ColorPalette(DEFAULT_NUM_COLORS, game);
game.setupGame(gameBoard, colorPalette);

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("white");
  const selectedColorContext = { selectedColor: selectedColor, setSelectedColor: setSelectedColor };
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const showAnswerKeyContext = {showAnswerKey: showAnswerKey, setShowAnswerKey: setShowAnswerKey};
  return (
    <SelectedColorContext.Provider value={selectedColorContext}>
      <AnswerKeyContext.Provider value={showAnswerKeyContext}>
      <div className="text-lg">
        <BoardComponent board={gameBoard}/>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
      <div>
        <AnswerKeyComponent bubbles={gameBoard.answerColors}/>
      </div>
      <div>
        <ColorPaletteComponent colorPalette={colorPalette} board={gameBoard}/>
      </div>
      <div>
        <p>Current color: </p>
        <ColorSelectorComponent/>
      </div>
      </AnswerKeyContext.Provider>
    </SelectedColorContext.Provider>
  );
}
