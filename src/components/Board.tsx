import React, { useEffect, useState } from "react";
import Square from "./Square";

interface BoardProps {
    size: number;  // เพิ่ม props สำหรับขนาดบอร์ด
}

const Board: React.FC<BoardProps> = ({ size }) => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(size * size).fill(null));
    const [isNext, setIsNext] = useState(true);


    useEffect(() => {
        setSquares(Array(size * size).fill(null));
        setIsNext(true);
    }, [size]);

    const handleClick = (i: number) => {
        const squareData = squares.slice();
        if (calculateWinner(squares, size) || squareData[i]) {
            return;
        }
        squareData[i] = isNext ? "x" : "o";
        setSquares(squareData);
        setIsNext(!isNext);
        console.log("isNext:", isNext)
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
        : `Next player: ${isNext ? "x" : "o"}`;

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

    return (
        <div className="board-status">
            {renderBoard()}
            <div className="status">{status}</div>
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
