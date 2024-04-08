'use client'
// Allows useState and onClick, which are client side hooks
import React, { useEffect, useState } from "react";
import {DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, ColorMap} from "./GameConstants";
// import { BubbleComponent } from "./Bubble";
import { Board } from "./Board";



export default function Home() {
  const gameColorMap = new ColorMap(DEFAULT_NUM_COLORS);
  const testColors = gameColorMap.getXRandomColors(4);
  const testTailwindColors = testColors.map((value, index) => gameColorMap.getTailwindColor(value));
  const generateRow = (width: number) => ():  Array<string> => testTailwindColors;
  const gameBoardGrid = new Array(DEFAULT_NUM_GUESSES).fill(0).map(generateRow(DEFAULT_ROW_SIZE));
  

  return <div className="text-lg"> 
    <Board grid={gameBoardGrid}/>
  </div>;
}
