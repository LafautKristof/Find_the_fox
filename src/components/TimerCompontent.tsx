import { useEffect, useRef, useState } from "react";

type Props = {
    seconds: number;
    onTimeUp: () => void;
};

const TimerComponent = ({ seconds, onTimeUp }: Props) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [percentage, setPercentage] = useState(100);

    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        startTimeRef.current = Date.now();
        setTimeLeft(seconds);
        setPercentage(100);
    }, [seconds]);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            const remaining = Math.max(seconds - elapsed, 0);

            setTimeLeft(Math.ceil(remaining));
            setPercentage((remaining / seconds) * 100);

            if (remaining <= 0) {
                clearInterval(interval);
                onTimeUp();
            }
        }, 100); // 100ms voor smooth animatie

        return () => clearInterval(interval);
    }, [seconds, onTimeUp]);

    const isLow = percentage <= 20;

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <div
                className={`text-sm ${
                    isLow ? "text-red-500 animate-bounce" : "text-gray-800"
                }`}
            >
                {timeLeft}s
            </div>

            <div className="w-72 h-6 bg-white/70 rounded-full overflow-hidden shadow-inner border-4 border-white">
                <div
                    className={`h-full transition-[width] duration-100 ease-linear rounded-full ${
                        isLow
                            ? "bg-gradient-to-r from-red-400 to-red-600 animate-pulse"
                            : "bg-gradient-to-r from-green-400 via-yellow-300 to-orange-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default TimerComponent;
