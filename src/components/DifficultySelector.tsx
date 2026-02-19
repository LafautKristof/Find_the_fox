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
            className="px-4 py-2 rounded-xl border"
        >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
        </select>
    );
};
export default DifficultySelector;
