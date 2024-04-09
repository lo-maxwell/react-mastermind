import { ColorMap, DEFAULT_NUM_COLORS, DEFAULT_NUM_GUESSES, DEFAULT_ROW_SIZE } from "./GameConstants";

type BubbleType = [boolean, string];

export class Board {
	// grid: Array<Array<string>>
	colorGrid: Array<Array<string>>;
	lockedGrid: Array<Array<boolean>>;
	selectedColor: string;
	answerColors: Array<string>;

	constructor(rows: number, cols: number, numColors: number, overrideAnswerColors: Array<string>) {
		const gameColorMap = new ColorMap(numColors);
		// const testColors = gameColorMap.getXRandomColors(numAnswerColors);
		// const testTailwindColors = testColors.map((value, index) => ColorMap.getTailwindColor(value));
		const generateRow = (width: number) => ():  Array<string> => Array.from({length: width}, (v, i) => "white");
		const gameBoardGrid = new Array(rows).fill(0).map(generateRow(cols));
		this.colorGrid = gameBoardGrid;
		// Create grid of same dimensions but entirely false
		this.lockedGrid = this.generateBooleanGrid(gameBoardGrid, false);
		this.selectedColor = "";
		if (overrideAnswerColors.length > 0) {
			this.answerColors = overrideAnswerColors;
		} else {
			this.answerColors = gameColorMap.getXRandomColors(cols);
		}
	}

	updateVisibleBubble(row: number, col: number, newColor: string) {
		this.colorGrid[row][col] = newColor;
	}

	setSelectedBubble(row: number, col: number) {
		if (this.selectedColor != "") {
			this.updateVisibleBubble(row, col, this.selectedColor);
		}
	}

	setSelectedColor(row: number, col: number) {
		this.selectedColor = this.colorGrid[row][col];
	}

	clickBubble(row: number, col: number) {

	}

	generateBooleanGrid(grid: Array<Array<any>>, value: boolean) {
		return Array.from({ length: grid.length }, () => Array(grid[0].length).fill(value));
	}

}