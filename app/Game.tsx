import { Board } from "./Board";
import { ColorPalette } from "./ColorPalette";

export default class Game {
	selectedColor: string;
	board: Board | undefined;
	colorPalette: ColorPalette | undefined;

	constructor() {
		this.selectedColor = "white";
	}

	setupGame(board: Board, colorPalette: ColorPalette) {
		this.board = board;
		this.colorPalette = colorPalette;
	}
}