'use client'
// Allows useState and onClick, which are client side hooks
import React, { useEffect, useState } from "react";
import {DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, ColorMap} from "./GameConstants";
import { Board, BoardComponent } from "./Board";
import { ColorPalette, ColorPaletteComponent } from "./ColorPalette";
import Game from "./Game";

export default function Home() {
  const game = new Game();
  const gameBoard = new Board(DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, game, []);
  const colorPalette = new ColorPalette(DEFAULT_NUM_COLORS, game);
  game.setupGame(gameBoard, colorPalette);

  return (
  <>
    <div className="text-lg">
      <BoardComponent board={gameBoard} />
    </div>
    <div>
      <ColorPaletteComponent colorPalette={colorPalette} />
    </div>
  </>
  );
}
