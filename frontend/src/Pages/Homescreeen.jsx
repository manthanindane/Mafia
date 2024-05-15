// import React from 'react';

const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-600">
      <h1 className="text-6xl font-bold text-yellow-300 mb-4">Mafia</h1>
      <h2 className="text-3xl font-semibold text-gray-300 mb-8">The Game</h2>
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition">
          Create a lobby
        </button>
        <button className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition">
          Join a game
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
