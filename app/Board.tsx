import { useState } from "react";
import { BubbleComponent } from "./Bubble";
import { ColorMap } from "./GameConstants";

export const BoardComponent = ({ grid }: {grid: Array<Array<string>>}) => {
	const [bubbleGrid, setBubbleGrid] = useState(grid);

	return (
		<div>
			{bubbleGrid.map((row, rowIndex) => (
			<div key={rowIndex}>
				{row.map((value, colIndex) => (
				<BubbleComponent key={`${rowIndex}-${colIndex}`} color={ColorMap.getTailwindColor(value)}/>
				))}
			</div>
			))}
		</div>
		);
}