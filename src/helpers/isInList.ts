import type { Position } from "../components/Grid";

export function isInList(list: Position[], row: number, col: number) {
    return list.some((p) => p.row === row && p.col === col);
}
