import React, { useEffect, useState } from "react";
import Square from "./Square";
import { createHistory } from "../service/historyService";

interface BoardProps {
    size: number;
}

const Board: React.FC<BoardProps> = ({ size }) => {
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




function calculateWinner(squares: (string | null)[], size: number) {
    const lines: number[][] = [];

    // Rows
    for (let row = 0; row < size; row++) {
        const line = [];
        for (let col = 0; col < size; col++) {
            line.push(row * size + col);
        }
        lines.push(line);
    }

    // Columns
    for (let col = 0; col < size; col++) {
        const line = [];
        for (let row = 0; row < size; row++) {
            line.push(row * size + col);
        }
        lines.push(line);
    }

    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(i * size + i);
        diag2.push(i * size + (size - 1 - i));
    }
    lines.push(diag1, diag2);

    // Check for winner
    for (let line of lines) {
        const [first, ...rest] = line;
        if (squares[first] && rest.every(index => squares[index] === squares[first])) {
            return squares[first];
        }
    }
    return null;
}

export default Board;
