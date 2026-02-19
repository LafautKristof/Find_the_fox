import { useState } from "react";
import TimerCompontent from "../components/TimerCompontent";
import Grid from "../components/Grid";
import { useNavigate } from "react-router-dom";

import DifficultySelector from "../components/DifficultySelector";
const MAX_LEVEL = 10;
export type Difficulty = "easy" | "medium" | "hard" | "expert";
const baseTime: Record<Difficulty, number> = {
    easy: 12,
    medium: 10,
    hard: 8,
    expert: 6,
};
const difficultyConfig: Record<Difficulty, { bonusTime: number }> = {
    easy: { bonusTime: 6 },
    medium: { bonusTime: 4 },
    hard: { bonusTime: 2 },
    expert: { bonusTime: 1 },
};
const Game = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState(1);
    const [seconds, setSeconds] = useState(baseTime["easy"]);
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [gameStatus, setGameStatus] = useState<
        "starting" | "playing" | "lost" | "won"
    >("starting");

    function handleTimeUp() {
        setGameStatus("lost");
    }

    function handleLevelUp() {
        setLevel((prev) => {
            if (prev >= MAX_LEVEL) {
                setGameStatus("won");
                return MAX_LEVEL;
            }
            setSeconds((s) => s + difficultyConfig[difficulty].bonusTime);
            return prev + 1;
        });
    }
    function handleReset() {
        setLevel(1);
        setSeconds(baseTime[difficulty]);
        setGameStatus("playing");
    }
    function handleStopGame() {
        setGameStatus("starting");
    }
    function handleStartGame() {
        setLevel(1);
        setSeconds(baseTime[difficulty]);
        setGameStatus("playing");
    }
    function handleWon() {
        setLevel(1);
        setSeconds(baseTime[difficulty]);
        setGameStatus("starting");
    }
    function handleGoHome() {
        navigate("/");
    }
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 overflow-hidden bg-gradient-to-b from-sky-300 via-green-200 to-green-300 font-['Press_Start_2P']">
            <div className="absolute w-[500px] h-[500px] bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse top-[-200px] left-[-200px]" />
            <div className="absolute w-[400px] h-[400px] bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse bottom-[-150px] right-[-150px]" />

            {/* Title */}
            <h1 className="text-xl md:text-2xl text-orange-600 drop-shadow-md mb-6">
                FIND THE FOX
            </h1>
            <div className="flex flex-col md:flex-row gap-2 items-center">
                {/* Level */}
                <div className="bg-white/80 px-6 py-3 rounded-2xl shadow-lg border-2 border-white mb-4 text-xs">
                    LEVEL {level}
                </div>
                {/* Difficulty */}
                <div className="bg-white/80 px-6 py-3 rounded-2xl shadow-lg border-2 border-white mb-4 text-xs">
                    Difficulty: {difficulty.toUpperCase()}
                </div>
                {/* Go HomePage */}
                <button
                    className="mb-6 px-6 py-3 bg-blue-400 hover:bg-blue-500 active:scale-95 transition-all duration-200 rounded-2xl text-white text-xs shadow-lg"
                    onClick={handleGoHome}
                >
                    HomePage
                </button>
            </div>

            {gameStatus === "playing" && (
                <button
                    onClick={handleStopGame}
                    className="mb-6 px-6 py-3 bg-red-400 hover:bg-red-500 active:scale-95 transition-all duration-200 rounded-2xl text-white text-xs shadow-lg"
                >
                    STOP GAME
                </button>
            )}

            {/* Timer */}
            {gameStatus === "playing" && (
                <div className="bg-yellow-200 px-6 py-3 rounded-2xl shadow-md border-2 border-yellow-300 mb-6 text-xs">
                    <TimerCompontent
                        seconds={seconds}
                        onTimeUp={handleTimeUp}
                    />
                </div>
            )}

            {/*  Grid  */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-white">
                <Grid
                    level={level}
                    onLevelUp={handleLevelUp}
                    gameActive={gameStatus === "playing"}
                />
            </div>

            {/* Game Over Overlay */}
            {gameStatus === "lost" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-center z-50">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
                        <h2 className="text-red-500 mb-6 animate-bounce">
                            TIME'S UP!
                        </h2>

                        {/*  Difficulty Selector */}
                        <div className="mb-6">
                            <DifficultySelector
                                difficulty={difficulty}
                                setDifficulty={setDifficulty}
                            />
                        </div>

                        <button
                            onClick={handleReset}
                            className="px-8 py-4 bg-orange-400 hover:bg-orange-500 rounded-2xl text-white"
                        >
                            RESTART
                        </button>
                    </div>
                </div>
            )}
            {/*  Game Won Overlay */}
            {gameStatus === "won" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
                        <h2 className="text-green-500 mb-6 animate-bounce">
                            YOU WON!
                        </h2>

                        <button
                            onClick={handleWon}
                            className="px-8 py-4 bg-orange-400 hover:bg-orange-500 rounded-2xl text-white"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
            {/* Start overlay */}
            {gameStatus === "starting" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md text-center z-50">
                    <div className="bg-white p-12 rounded-3xl shadow-2xl">
                        <h2 className="text-orange-600 text-lg mb-8 animate-bounce">
                            READY TO FIND THE FOX?
                        </h2>

                        {/* Difficulty selector */}
                        <div className="mb-8">
                            <DifficultySelector
                                difficulty={difficulty}
                                setDifficulty={setDifficulty}
                            />
                        </div>

                        <button
                            onClick={handleStartGame}
                            className="px-10 py-4 bg-orange-400 hover:bg-orange-500 rounded-2xl text-white animate-pulse"
                        >
                            START GAME
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
