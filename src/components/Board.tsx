import React, { useEffect, useState } from "react";
import Square from "./Square";
import { createHistory } from "../service/historyService";
import { calculateWinner } from "../utils/calculateWinner";


interface BoardProps {
    size: number;
    option: number;
}

const Board: React.FC<BoardProps> = ({ size, option }) => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(size * size).fill(null));
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState<string[]>([]);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        resetGame();
    }, [size]);

    const resetGame = () => {
        setSquares(Array(size * size).fill(null));
        setIsNext(true);
        setHistory([]);
        setGameEnded(false);
    };

    const handleClick = (i: number) => {
        if (gameEnded || squares[i]) {
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

    const renderSquare = (i: number) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => handleClick(i)}
            />
        );
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
        await createHistory(data)
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
                squaresRow.push(renderSquare(row * size + col));
            }
            board.push(<div key={row} className="board-row">{squaresRow}</div>);
        }
        return board;
    };

    const renderHistory = () => {
        return (
            <div className="history">
                <h3>Move History</h3>
                <ol>
                    {history.map((move, index) => (
                        <li key={index}>{move}</li>
                    ))}
                </ol>
            </div>
        )
    }

    return (
        <div className="board-status">
            {renderBoard()}
            <div className="status">{status}</div>
            <button className="restart-button" onClick={resetGame}>Restart Game</button>
            {renderHistory()}
        </div>
    );
};

export default Board;
