import { countFox } from "./countFox";

// possible letters to fill the grid
const letters = ["F", "O", "X"];
export function makeGrid(
    level: number,
): [number, number, string[][], { row: number; col: number }[]] {
    //grid size increases with level
    const baseSize = 3 + level;
    //keep generating until we get a grid with exactly 1 fox
    while (true) {
        //create empty grind
        const grid: string[][] = Array.from({ length: baseSize }, () =>
            Array.from({ length: baseSize }, () => ""),
        );

        //allowed directions
        const directions = [
            [0, 1], //horizontal => left to right
            [1, 0], //vertical => top to bottom
        ];

        const word = "FOX";
        //randomly pick a direction(horizontal or vertical)
        const [dx, dy] =
            directions[Math.floor(Math.random() * directions.length)];

        let placed = false;

        // save positions of the fox for later use in the game
        let foxPositions: { row: number; col: number }[] = [];

        //keep trying to place the word until it fits in the grid
        while (!placed) {
            const row = Math.floor(Math.random() * baseSize);
            const col = Math.floor(Math.random() * baseSize);

            // check if the word fits in the grid
            if (row + dx * 2 < baseSize && col + dy * 2 < baseSize) {
                foxPositions = [];
                //place the word in the grid
                for (let i = 0; i < 3; i++) {
                    grid[row + dx * i][col + dy * i] = word[i];
                    foxPositions.push({
                        row: row + dx * i,
                        col: col + dy * i,
                    });
                }
                placed = true;
            }
        }
        // fill the rest of the grid with random letters
        for (let r = 0; r < baseSize; r++) {
            for (let c = 0; c < baseSize; c++) {
                if (grid[r][c] === "") {
                    grid[r][c] =
                        letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
        // check if the grid has exactly 1 fox
        if (countFox(grid) === 1) {
            return [baseSize, baseSize, grid, foxPositions];
        }
        // if not, generate a new grid
    }
}
