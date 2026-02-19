import { useEffect, useMemo, useState } from "react";
import { makeGrid } from "../helpers/makeGrid";

import { isInList } from "../helpers/isInList";
import { isStraightAndAdjacent } from "../helpers/isStraightAndAdjacent";
export type Position = {
    row: number;
    col: number;
};
const Grid = ({
    level,
    onLevelUp,

    gameActive,
}: {
    level: number;
    onLevelUp: () => void;

    gameActive: boolean;
}) => {
    const [, , grid, foxPositions] = useMemo(() => makeGrid(level), [level]);
    const [selected, setSelected] = useState<Position[]>([]);
    const [found, setFound] = useState<Position[]>([]);

    function handleClick(row: number, col: number) {
        if (!gameActive) return;

        const newSelection = [...selected, { row, col }];

        if (newSelection.length > 3) return;

        setSelected(newSelection);

        if (newSelection.length === 3) {
            checkSelection(newSelection);
            setSelected([]);
        }
    }

    useEffect(() => {
        setSelected([]);
        setFound([]);
    }, [level, gameActive]);

    useEffect(() => {
        if (!gameActive && found.length === 0) {
            setFound(foxPositions);
        }
    }, [gameActive, foxPositions, found.length]);
    function checkSelection(cells: Position[]) {
        if (!isStraightAndAdjacent(cells)) {
            setSelected([]);
            return;
        }

        // Sorteer de cellen eerst op grid-positie
        const sorted = [...cells].sort((a, b) =>
            a.row === b.row ? a.col - b.col : a.row - b.row,
        );

        const letters = sorted.map((pos) => grid[pos.row][pos.col]).join("");

        if (letters === "FOX") {
            setFound(cells);
            setTimeout(() => {
                onLevelUp();
            }, 400);
        }

        setSelected([]);
    }

    return (
        <table>
            <tbody>
                {grid.map((rowData, rowIndex) => (
                    <tr key={rowIndex}>
                        {rowData.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                onClick={() => handleClick(rowIndex, colIndex)}
                                style={{
                                    border: "1px solid black",
                                    width: "40px",
                                    height: "40px",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    cursor: gameActive ? "pointer" : "default",
                                    background:
                                        isInList(
                                            selected,
                                            rowIndex,
                                            colIndex,
                                        ) || isInList(found, rowIndex, colIndex)
                                            ? "#ff6b00"
                                            : "white",
                                }}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default Grid;
