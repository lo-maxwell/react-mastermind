import { useState } from "react";
import { Bubble } from "./Bubble";

export const Board = ({ grid }: {grid: Array<Array<string>>}) => {
	const [bubbleGrid, setBubbleGrid] = useState(grid);

	return (
		<div>
			{bubbleGrid.map((row, rowIndex) => (
			<div key={rowIndex}>
				{row.map((value, colIndex) => (
				<Bubble key={`${rowIndex}-${colIndex}`} color={value}/>
				))}
			</div>
			))}
		</div>
		);
}