import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300 via-green-200 to-green-300"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
            {/*  Glow blobs */}
            <div className="absolute w-[600px] h-[600px] bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse top-[-200px] left-[-200px]" />
            <div className="absolute w-[500px] h-[500px] bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse bottom-[-150px] right-[-150px]" />

            {/*  Subtle particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Card */}
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-4 border-white">
                <h1 className="text-lg md:text-xl text-orange-600 mb-6 drop-shadow-md">
                    FIND THE FOX
                </h1>

                {/*  Floating Fox */}
                <img
                    src="/fox.png"
                    alt="Fox"
                    className="w-28 mx-auto mb-6 animate-bounce"
                />

                <ul className="text-[10px] text-gray-800 space-y-3 mb-8 leading-relaxed">
                    <li>• Zoek het woord FOX</li>
                    <li>• Enkel horizontaal of verticaal</li>
                    <li>• 1 oplossing per level</li>
                    <li>• Tijd loopt... </li>
                </ul>

                {/* Pulsing Button */}
                <button
                    onClick={() => navigate("/game")}
                    className="w-full py-4 rounded-2xl bg-orange-400 hover:bg-orange-500 active:scale-95 transition-all duration-200 text-white shadow-lg animate-pulse"
                >
                    START GAME
                </button>
            </div>
        </div>
    );
};

export default Home;
