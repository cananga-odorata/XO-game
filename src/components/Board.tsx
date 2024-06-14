import React, { useEffect, useState } from "react";
import Square from "./Square";
import { calculateWinner } from "../utils/calculateWinner";
import { createHistory } from "../service/historyService";
// import GameHistory from "./GameHistory";


interface BoardProps {
    size: number;
    option: number;
    // onGameEnd: () => void;
}

const Board: React.FC<BoardProps> = ({ size, option }) => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(size * size).fill(null));
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState<string[]>([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [vsBot, setVsBot] = useState(false);



    useEffect(() => {
        resetGame();

    }, [size]);

    useEffect(() => {
        if (!isNext && vsBot && !gameEnded) {
            setTimeout(() => {

                makeBotMove();
            }, 200)
        }
    }, [isNext, vsBot, gameEnded]);

    const resetGame = () => {
        setSquares(Array(size * size).fill(null));
        setIsNext(true);
        setHistory([]);
        setGameEnded(false);
    };

    const handleClick = (i: number) => {
        if (gameEnded || squares[i] || (!isNext && vsBot)) {
            return;
        }
        const squareData = squares.slice();
        squareData[i] = isNext ? "x" : "o";
        const newHistory = [...history, `Move ${history.length + 1}: ${squareData[i]}${i}`];

        setSquares(squareData);
        setIsNext(!isNext);
        setHistory(newHistory);

        const winner = calculateWinner(squareData, size);
        if (winner || !squareData.includes(null)) {
            setGameEnded(true);
        }
    };

    const makeBotMove = () => {
        if (gameEnded) return;
        const emptySquares = squares.map((value, index) => value === null ? index : null).filter(val => val !== null);
        if (emptySquares.length === 0) return;

        const botMove = emptySquares[Math.floor(Math.random() * emptySquares.length)] as number;
        const squareData = squares.slice();
        squareData[botMove] = "o";
        const newHistory = [...history, `Move ${history.length + 1}: o${botMove}`];

        setSquares(squareData);
        setIsNext(true);
        setHistory(newHistory);

        const winner = calculateWinner(squareData, size);
        if (winner || !squareData.includes(null)) {
            setGameEnded(true);
        }
    };

    const winner = calculateWinner(squares, size);
    const status = winner
        ? `Winner is: ${winner}`
        : gameEnded && !winner
            ? "Game is a draw"
            : `Next player: ${isNext ? "x" : "o"}`;

    const sendHistorytocreate = async (winner: string) => {
        const data = {
            event: "Tic-Tac-Toe Game",
            option: option,
            date: new Date().toISOString(),
            white: "Player X",
            black: "Player O",
            result: winner,
            history: history
        };
        await createHistory(data);
        location.reload()
    }

    useEffect(() => {
        if (gameEnded) {
            const result = winner || "Draw";
            sendHistorytocreate(result);
        }
    }, [gameEnded]);

    const renderBoard = () => {
        let board = [];
        for (let row = 0; row < size; row++) {
            let squaresRow = [];
            for (let col = 0; col < size; col++) {
                squaresRow.push(
                    <Square
                        key={row * size + col}
                        value={squares[row * size + col]}
                        onClick={() => handleClick(row * size + col)}
                    />
                );
            }
            board.push(
                <div key={row} className="board-row">
                    {squaresRow}
                </div>
            );
        }
        return board;
    };

    return (
        <div className="board-status">
            {renderBoard()}
            <div className="status">{status}</div>
            <button className="restart-button" onClick={resetGame}>Restart Game</button>
            <div className="game-settings">

                <div className="btn-vsbot" onClick={() => setVsBot(!vsBot)}>
                    {vsBot ?
                        <>
                            <img src='https://ik.imagekit.io/4rkpg5ot7/toolkitweb/computer-solid.svg?updatedAt=1718373903087' />
                            <h1>computer</h1>
                        </>
                        :
                        <>
                            <img src='https://ik.imagekit.io/4rkpg5ot7/toolkitweb/user-two-solid.svg?updatedAt=1718373902962' />
                            <h1>2P</h1>
                        </>
                    }
                </div>
            </div>
            {/* {renderHistory()} */}

        </div>
    );
};

export default Board;
