import { useState } from "react";
import { AnswerKey, AnswerKeyBubblesContext, AnswerKeyComponent } from "./AnswerKey";
import { BubbleComponent } from "./Bubble";
import { BubbleGrid } from "./BubbleGrid";
import { Game } from "./Game";
import { Utility } from "./Utilities";


export class Board extends BubbleGrid{
	lockedGrid: Array<Array<boolean>>;
	answerColors: Array<string>;
	activeRow: number;
	answerGrid: Array<AnswerKey>;

	constructor(rows: number, cols: number, numColors: number, game: Game, overrideAnswerColors: Array<string>) {
		super(rows, cols, numColors, game);
		
		// Create grid of same dimensions but entirely false
		this.lockedGrid = this.generateBooleanGrid(this.colorGrid, false);
		this.game.selectedColor = "white";
		this.activeRow = 0;
		if (overrideAnswerColors.length > 0) {
			this.answerColors = overrideAnswerColors;
		} else {
			this.answerColors = this.colorMap.getXRandomColors(cols);
		}
		console.log("Answer: ", this.answerColors);
		this.answerGrid = new Array(rows).fill(0).map(() => new AnswerKey(cols));
	}

	

	//Changes either the selected color or the color of the clicked bubble. 
	//Returns a list of [newBubbleColor, selectedColor] strings.
	clickBubble(row: number, col: number) {
		// if bubble is locked
		if (this.lockedGrid[row][col]) {
			//Doesn't do anything right now because we dont have any locked rows, only 1 active row
			this.game.selectedColor = this.colorGrid[row][col];
			return [this.colorGrid[row][col], this.game.selectedColor];
		} else if (this.activeRow == row) {
			//We can only modify the active row
			this.colorGrid[row][col] = this.game.selectedColor;
			this.checkWinCondition();
			this.answerGrid[row].setBubbles(this.getAnswerKeyBubbles(row));
			return [this.colorGrid[row][col], this.game.selectedColor];
		} else {
			//Otherwise just return the same color we were given, probably white
			//Note that the starting white bubbles are neither locked nor active rows
			return [this.colorGrid[row][col], this.game.selectedColor];
		}
	}

	getAnswerKeyBubbles(row: number) {
		const currentRow = this.colorGrid[row].slice();
		const answerKeyBubbles = AnswerKey.generateGrayBubbles(this.numCols);
		const answerCopy = this.answerColors.slice();

		let index = 0;
		for (let i = 0; i < currentRow.length; i++) {
			if (answerCopy[i] == currentRow[i]) {
				answerCopy[i] = "answer used";
				currentRow[i] = "color used";
				answerKeyBubbles[index] = "black"
				index++;
			}
		}
		for (let i = 0; i < currentRow.length; i++) {
			if (answerCopy.includes(currentRow[i])) {
				answerCopy[answerCopy.indexOf(currentRow[i])] = "answer used";
				currentRow[i] = "color used";
				answerKeyBubbles[index] = "white"
				index++;
			}
		}
		
		return answerKeyBubbles;

	}

	checkWinCondition() {
		if (Utility.arraysEqual(this.colorGrid[this.activeRow], this.answerColors)) {
			console.log("You win!");
			this.lockedGrid = this.generateBooleanGrid(this.colorGrid, true);
			return true;
		}
		return false;
	}

	getBubbleIsLocked(row: number, col: number) {
		return this.lockedGrid[row][col];
	}

	getAnswerGridBubbles() {
		const bubbleGrid = new Array(this.answerGrid.length).fill(0).map((row, rowIndex) => this.answerGrid[rowIndex].bubbles);
		return bubbleGrid;
	}

	setActiveRow(newActiveRow: number) {
		this.activeRow = newActiveRow;
	}

	lockRow(row: number) {
		for (let i = 0; i < this.numCols; i++) {
			this.lockedGrid[row][i] = true;
		}
	}

}

export const BoardComponent = ({ board }: {board: Board}) => {
	const [answerKeyGrid, setAnswerKeyGrid] = useState(board.getAnswerGridBubbles());
	const value = {answerKeyBubbles: answerKeyGrid, setAnswerKeyBubbles: setAnswerKeyGrid};
	return (
		<div>
			<AnswerKeyBubblesContext.Provider value={value}>
				{board.colorGrid.map((row, rowIndex) => (
					<div key={rowIndex} className={`flex ${rowIndex == board.activeRow ? `bg-gray-100` : ``}`}>
						{row.map((value, colIndex) => (
						<BubbleComponent key={`${rowIndex}-${colIndex}`} color={value} row={rowIndex} col={colIndex} board={board} onBubbleClick={(row, col) => board.clickBubble(row, col)}/>
						))}
						<AnswerKeyComponent key={`${rowIndex}-answers`} row={rowIndex} board={board}/>
					</div>
				))}
			</AnswerKeyBubblesContext.Provider>
		</div>
		);
}