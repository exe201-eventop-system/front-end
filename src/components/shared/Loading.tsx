import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 animate-fade-in">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
            <p className="mt-4 text-lg text-gray-600 animate-pulse">Loading...</p>
        </div>
    );
};

export default Loading;
