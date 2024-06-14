import React, { useEffect, useState } from "react";
import { getHistory } from "../service/historyService";

const GameHistory: React.FC = () => {
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);

    const fetchHistory = async () => {
        try {
            const response = await getHistory();
            setHistoryData(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Game History</h2>
            {historyData.length === 0 ? (
                <div>No game history available.</div>
            ) : (
                <div>
                    <select
                        onClick={fetchHistory}
                        className="btn btn-secondary dropdown-toggle"
                        onChange={(e) => setSelectedGameIndex(parseInt(e.target.value))}
                        defaultValue=""
                        style={{ margin: "0.5rem" }}
                    >
                        <option value="" disabled>Select a game</option>
                        {historyData.map((game, index) => (
                            <option key={index} value={index}>
                                {new Date(game.date).toLocaleString()} - {game.white} vs {game.black}
                            </option>
                        ))}
                    </select>
                    {selectedGameIndex !== null && (
                        <div>
                            <h3>{historyData[selectedGameIndex].event}</h3>
                            <p>Date: {new Date(historyData[selectedGameIndex].date).toLocaleString()}</p>
                            <p style={{ fontWeight: "bold" }}>{historyData[selectedGameIndex].white} (X) vs {historyData[selectedGameIndex].black} (O)</p>
                            <p>Result: {historyData[selectedGameIndex].result}</p>
                            <h4>Move History:</h4>
                            <ol>
                                {historyData[selectedGameIndex].history.map((move: string, moveIndex: number) => (
                                    <li key={moveIndex}>{move}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GameHistory;
