import type { Position } from "../components/Grid";

export function isStraightAndAdjacent(cells: Position[]) {
    // Must be exactly 3 cells
    if (cells.length !== 3) return false;

    // get all rows and cols
    const rows = cells.map((c) => c.row);
    const cols = cells.map((c) => c.col);
    //check if all rows are the same or all cols are the same
    const allSameRow = rows.every((r) => r === rows[0]);
    const allSameCol = cols.every((c) => c === cols[0]);

    // if both false, return false
    if (!allSameRow && !allSameCol) return false;

    // horizontal check: sort cols and check if they are adjacent( ex 1,2,3 or 4,5,6 )
    if (allSameRow) {
        const sortedCols = [...cols].sort((a, b) => a - b);
        return (
            sortedCols[1] === sortedCols[0] + 1 &&
            sortedCols[2] === sortedCols[1] + 1
        );
    }

    // vertical check: sort rows and check if they are adjacent( ex 1,2,3 or 4,5,6 )
    if (allSameCol) {
        const sortedRows = [...rows].sort((a, b) => a - b);
        return (
            sortedRows[1] === sortedRows[0] + 1 &&
            sortedRows[2] === sortedRows[1] + 1
        );
    }
    //safetyreturn
    return false;
}
