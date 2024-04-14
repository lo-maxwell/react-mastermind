import { useContext, useEffect, useState } from "react";
import { Board } from "./Board";
import { BubbleComponent } from "./Bubble";
import { ColorPalette } from "./ColorPalette";
import { ColorMap } from "./GameConstants";
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
}

export const ColorSelectorComponent = () => {
	const {selectedColor, setSelectedColor} = useContext(SelectedColorContext);

	return (
		<button
			className={`${ColorMap.getTailwindColor(selectedColor)} text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
		>
			{selectedColor}
		</button>
	);
}