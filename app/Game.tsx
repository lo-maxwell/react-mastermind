import { useContext, useEffect, useState } from "react";
import { Board } from "./Board";
import { BubbleComponent } from "./Bubble";
import { ColorPalette } from "./ColorPalette";
import { ColorMap, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE } from "./GameConstants";
import { SelectedColorContext } from "./SelectedColorContext";

export class Game {
	selectedColor: string;
	board!: Board;
	colorPalette!: ColorPalette;

	constructor() {
		this.selectedColor = "white";
	}

	setupGame(board: Board, colorPalette: ColorPalette) {
		this.board = board;
		this.colorPalette = colorPalette;
	}

	generateGame(numRows: number, numCols: number, numColors: number, overrideAnswerColors: Array<string>) {
		this.board = new Board(numRows, numCols, numColors, this, overrideAnswerColors);
		this.colorPalette = new ColorPalette(numColors, this);
	}
}

export const ColorSelectorComponent = () => {
	const {selectedColor, setSelectedColor} = useContext(SelectedColorContext);

	return (
		<button
			className={`${ColorMap.getTailwindColor(selectedColor)} border-2 border-black min-w-[64px] min-h-[64px] text-black font-bold ml-1 my-1 px-4 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
		>
			
		</button>
	);
}