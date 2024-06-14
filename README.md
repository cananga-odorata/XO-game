# React + TypeScript + Vite

1. XO Web can use in "Phone" && "Computer" Can define size of TIC-TAC-TOE
2. There is a database for storing information.
3. Bot

# Link for play game 
https://tic-tac-toe-xo-1.web.app/


# How to setup
```js
Git clone https://github.com/cananga-odorata/XO-game
cd XO-Game
npm install
npm run dev
```

## Alorithm ตรวจหาผู้ชนะ
```js
export function calculateWinner(squares: (string | null)[], size: number) {
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
```

## algorithm สุ่มเลือกของ both
```js
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
```
## References
https://www.youtube.com/watch?v=w8V--ZBzh7w
https://playtictactoe.org/
https://github.com/Jeswin-8802/tic-tac-toe?tab=readme-ov-file