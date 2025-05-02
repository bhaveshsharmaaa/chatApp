import React from "react";
import { useState, useCallback, startTransition } from "react";
import { FaHome, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);

  const handleGuess = useCallback(() => {
    startTransition(() => {
      const guessNum = parseInt(guess, 10);
      setAttempts((prev) => prev + 1);

      if (isNaN(guessNum)) {
        setMessage("Please enter a valid number.");
      } else if (guessNum === targetNumber) {
        setMessage(
          `Congratulations! You guessed the number in ${attempts + 1} attempts.`
        );
        setGameWon(true);
      } else if (guessNum < targetNumber) {
        setMessage("Too low! Try a higher number.");
      } else {
        setMessage("Too high! Try a lower number.");
      }
      setGuess("");
    });
  }, [guess, attempts, targetNumber]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-6">
          Oops! Page not found
        </p>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            While you&apos;re here, play a game!
          </h2>
          <p className="text-gray-600 mb-4">
            Guess a number between 1 and 100:
          </p>
          <div className="flex mb-4">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={gameWon}
            />
            <button
              onClick={handleGuess}
              disabled={gameWon}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Guess
            </button>
          </div>
          {message && <p className="text-blue-600 font-medium">{message}</p>}
          {gameWon && (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
            >
              <FaPlay className="mr-2" />
              Play Again
            </button>
          )}
        </div>

        <Link to="/">
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FaHome className="w-5 h-5 mr-2" />
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
