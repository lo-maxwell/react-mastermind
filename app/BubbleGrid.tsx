import { HintKey } from "./HintKey";
import { Game } from "./Game";
import { ColorMap } from "./GameConstants";


export class BubbleGrid {
	numRows: number;
	numCols: number;
	colorMap: ColorMap;
	colorGrid: Array<Array<string>>;
	game: Game;

	constructor(rows: number, cols: number, numColors: number, game: Game) {
		const gameColorMap = new ColorMap(numColors);
		this.colorMap = gameColorMap;
		this.numRows = rows;
		this.numCols = cols;
		const generateRow = (width: number) => ():  Array<string> => Array.from({length: width}, (v, i) => "white");
		const gameBoardGrid = new Array(rows).fill(0).map(generateRow(cols));
		this.colorGrid = gameBoardGrid;
		this.game = game;
	}

	updateVisibleBubble(row: number, col: number, newColor: string) {
		this.colorGrid[row][col] = newColor;
	}

	setSelectedBubble(row: number, col: number) {
		if (this.game.selectedColor != "") {
			this.updateVisibleBubble(row, col, this.game.selectedColor);
		}
	}

	setSelectedColor(row: number, col: number) {
		this.game.selectedColor = this.colorGrid[row][col];
	}

	generateBooleanGrid(grid: Array<Array<any>>, value: boolean) {
		return Array.from({ length: grid.length }, () => Array(grid[0].length).fill(value));
	}

}