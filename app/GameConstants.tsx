export const DEFAULT_ROW_SIZE = 4;
export const DEFAULT_NUM_COLORS = 6;
export const DEFAULT_NUM_GUESSES = 8;

// Helper data structure that maps color names to their actual colors
export class ColorMap {
	static readonly allColors: string[] = ["red", "pink", "orange", "yellow", "light green", "dark green", "light blue", "dark blue", "violet", "brown"];
	usedColors: string[];

	constructor(numColors: number) {
		this.usedColors = ColorMap.allColors.slice(0, numColors);
		
	}

	getXRandomColors(numColors: number): string[] {
		let colors = new Array(numColors).fill(null);
		for (let i = 0; i < numColors; i++) {
			let rng = Math.floor(Math.random() * this.usedColors.length);
			colors[i] = this.usedColors[rng];
		}
		return colors;
	}

	static getTailwindColor(color: string): string {
		switch (color) {
			case "white":
				return "bg-white";
			case "black":
				return "bg-black";
			case "gray":
				return "bg-gray-300";
			case "red":
				return "bg-red-500";
			case "pink":
				return "bg-pink-500";
			case "orange":
				return "bg-orange-500";
			case "yellow":
				return "bg-yellow-500";
			case "light green":
				return "bg-green-300"; // Adjust as needed
			case "dark green":
				return "bg-green-700"; // Adjust as needed
			case "light blue":
				return "bg-blue-300"; // Adjust as needed
			case "dark blue":
				return "bg-blue-700"; // Adjust as needed
			case "violet":
				return "bg-purple-500";
			case "brown":
				return "bg-brown-500"; // Tailwind CSS doesn't have a brown class by default, adjust as needed
			default:
				return color; // Default to same string
		}
	}

}