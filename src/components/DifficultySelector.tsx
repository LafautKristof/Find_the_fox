import type { Difficulty } from "../pages/Game";

const DifficultySelector = ({
    difficulty,
    setDifficulty,
}: {
    difficulty: Difficulty;
    setDifficulty: (difficulty: Difficulty) => void;
}) => {
    return (
        <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="px-4 py-2 rounded-xl border cursor-pointer"
        >
            <option className="cursor-pointer" value="easy">
                Easy
            </option>
            <option className="cursor-pointer" value="medium">
                Medium
            </option>
            <option className="cursor-pointer" value="hard">
                Hard
            </option>
            <option className="cursor-pointer" value="expert">
                Expert
            </option>
        </select>
    );
};
export default DifficultySelector;
