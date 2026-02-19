export function countFox(grid: string[][]): number {
    const size = grid.length;
    let count = 0;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            // horizontaal
            if (
                c + 2 < size &&
                grid[r][c] === "F" &&
                grid[r][c + 1] === "O" &&
                grid[r][c + 2] === "X"
            ) {
                count++;
            }

            // verticaal
            if (
                r + 2 < size &&
                grid[r][c] === "F" &&
                grid[r + 1][c] === "O" &&
                grid[r + 2][c] === "X"
            ) {
                count++;
            }
        }
    }

    return count;
}
