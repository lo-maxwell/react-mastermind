import { useState } from "react";
import { BubbleComponent } from "./Bubble";
import Game from "./Game";
import { ColorMap } from "./GameConstants";
// import { Board } from "./GameUtility";


export class Board {
	// grid: Array<Array<string>>
	colorMap: ColorMap;
	colorGrid: Array<Array<string>>;
	lockedGrid: Array<Array<boolean>>;
	answerColors: Array<string>;
	game: Game;

	constructor(rows: number, cols: number, numColors: number, game: Game, overrideAnswerColors: Array<string>) {
		const gameColorMap = new ColorMap(numColors);
		this.colorMap = gameColorMap;
		// const testColors = gameColorMap.getXRandomColors(numAnswerColors);
		// const testTailwindColors = testColors.map((value, index) => ColorMap.getTailwindColor(value));
		const generateRow = (width: number) => ():  Array<string> => Array.from({length: width}, (v, i) => "white");
		const gameBoardGrid = new Array(rows).fill(0).map(generateRow(cols));
		gameBoardGrid[0][0] = "red";
		gameBoardGrid[0][1] = "orange";
		gameBoardGrid[0][2] = "pink";
		gameBoardGrid[0][3] = "light green";
		this.colorGrid = gameBoardGrid;
		// Create grid of same dimensions but entirely false
		this.lockedGrid = this.generateBooleanGrid(gameBoardGrid, false);
		this.lockedGrid[0][0] = true;
		this.lockedGrid[0][1] = true;
		this.lockedGrid[0][2] = true;
		this.lockedGrid[0][3] = true;
		this.game = game;
		this.game.selectedColor = "white";
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
		if (this.game.selectedColor != "") {
			this.updateVisibleBubble(row, col, this.game.selectedColor);
		}
	}

	setSelectedColor(row: number, col: number) {
		this.game.selectedColor = this.colorGrid[row][col];
	}

	//Changes either the selected color or the color of the clicked bubble. 
	//Returns a string containing the color changed to.
	clickBubble(row: number, col: number) {
		// if bubble is locked
		if (this.lockedGrid[row][col]) {
			this.game.selectedColor = this.colorGrid[row][col];
			return this.game.selectedColor;
		} else {
			this.colorGrid[row][col] = this.game.selectedColor;
			return this.game.selectedColor;
		}
		
	}

	generateBooleanGrid(grid: Array<Array<any>>, value: boolean) {
		return Array.from({ length: grid.length }, () => Array(grid[0].length).fill(value));
	}

	getBubbleIsLocked(row: number, col: number) {
		return this.lockedGrid[row][col];
	}

}

export const BoardComponent = ({ board }: {board: Board}) => {

	return (
		<div>
			{board.colorGrid.map((row, rowIndex) => (
			<div key={rowIndex}>
				{row.map((value, colIndex) => (
				<BubbleComponent key={`${rowIndex}-${colIndex}`} color={value} row={rowIndex} col={colIndex} onBubbleClick={(row, col) => board.clickBubble(row, col)}/>
				))}
			</div>
			))}
		</div>
		);
}