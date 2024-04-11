import { Board } from "./Board";
import { BubbleComponent } from "./Bubble";
import Game from "./Game";

export class ColorPalette extends Board{
	
	constructor(size: number, game: Game) {
		//"Grid" of size 1 by size
		super(1, size, size, game, []);
		this.lockedGrid = this.generateBooleanGrid(this.colorGrid, true);
		const colors = this.colorMap.usedColors;
		//Set one color to each bubble in the palette
		for (let i = 0; i < size; i++) {
			this.colorGrid[0][i] = colors[i];
		}
	}

	clickBubble(row: number, col: number): string {
		//All bubbles in the color palette are locked, so we just set the selected color.
		this.game.selectedColor = this.colorGrid[row][col];
		return this.game.selectedColor;
	}

}

export const ColorPaletteComponent = ({colorPalette}: {colorPalette: ColorPalette}) => {
	return (
		<div>
			{colorPalette.colorGrid[0].map((value, index) => (
				<BubbleComponent key={`${index}`} color={value} row={0} col={index} onBubbleClick={(row, col) => colorPalette.clickBubble(row, col)}/>
			))}
		</div>
		);
}