import { useState } from "react";
import { BubbleComponent } from "./BubbleComponent";
import { ColorMap } from "./GameConstants";
import { Board } from "./GameUtility";

export const BoardComponent = ({ board }: {board: Board}) => {

	return (
		<div>
			{board.colorGrid.map((row, rowIndex) => (
			<div key={rowIndex}>
				{row.map((value, colIndex) => (
				<BubbleComponent key={`${rowIndex}-${colIndex}`} color={ColorMap.getTailwindColor(value)} row={rowIndex} col={colIndex} onBubbleClick={(row, col, color) => board.clickBubble(row, col, color)}/>
				))}
			</div>
			))}
		</div>
		);
}