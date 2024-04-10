'use client'
// Allows useState and onClick, which are client side hooks
import React, { useEffect, useState } from "react";
import {DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, ColorMap} from "./GameConstants";
// import { BubbleComponent } from "./Bubble";
import { BoardComponent } from "./BoardComponent";
import { Board } from "./GameUtility";



export default function Home() {
  const gameBoard = new Board(DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE, DEFAULT_NUM_COLORS, []);
  

  return <div className="text-lg"> 
    <BoardComponent board={gameBoard}/>
  </div>;
}
