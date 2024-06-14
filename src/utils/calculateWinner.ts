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
