import { Board } from "./Board";
import { BubbleComponent } from "./Bubble";
import { BubbleGrid } from "./BubbleGrid";
import { Game } from "./Game";

//Made this an instance of Board for ease but they should really both implement another class
export class ColorPalette extends BubbleGrid{
	
	constructor(size: number, game: Game) {
		//"Grid" of size 1 by size
		super(1, size, size, game);
		const colors = this.colorMap.usedColors;
		//Set one color to each bubble in the palette
		for (let i = 0; i < size; i++) {
			this.colorGrid[0][i] = colors[i];
		}
	}

	clickBubble(row: number, col: number): [string, string] {
		//All bubbles in the color palette are locked, so we just set the selected color.
		this.game.selectedColor = this.colorGrid[row][col];
		return [this.colorGrid[row][col], this.game.selectedColor];
	}

}

export const ColorPaletteComponent = ({colorPalette, board}: {colorPalette: ColorPalette, board: Board}) => {
	return (
		<div>
			{colorPalette.colorGrid[0].map((value, index) => (
				<div key={`div-${index}`}>
				<BubbleComponent key={`${index}`} color={value} row={0} col={index} board={board} onBubbleClick={(row, col) => colorPalette.clickBubble(row, col)} borderColor={`border-black`}/>
				</div>
			))}
		</div>
		);
}