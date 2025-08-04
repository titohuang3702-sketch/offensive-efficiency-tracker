import { useState } from "react";

export default function OffensiveEfficiencyTracker() {
  const [data, setData] = useState(Array(38).fill({ xg: "", possession: "" }));
  const [efficiencies, setEfficiencies] = useState([]);
  const [average, setAverage] = useState(null);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const calculateEfficiencies = () => {
    const newEff = data.map((item) => {
      const xg = parseFloat(item.xg);
      const poss = parseFloat(item.possession);
      if (!isNaN(xg) && !isNaN(poss) && poss > 0) {
        return +(xg / poss).toFixed(2);
      }
      return null;
    });
    setEfficiencies(newEff);

    const lastFour = newEff.slice(-4).filter((v) => v !== null);
    if (lastFour.length === 4) {
      const avg = (lastFour.reduce((a, b) => a + b, 0) / 4) * 10;
      setAverage(avg.toFixed(2));
    } else {
      setAverage(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Team Offensive Efficiency Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm">
            <div className="font-semibold mb-2">Round {index + 1}</div>
            <input
              type="number"
              placeholder="Expected Goals (xG)"
              value={item.xg}
              onChange={(e) => handleChange(index, "xg", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              placeholder="Possession (e.g. 0.58)"
              step="0.01"
              value={item.possession}
              onChange={(e) => handleChange(index, "possession", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            {efficiencies[index] !== undefined && (
              <div className="text-sm text-gray-600">
                Efficiency: {efficiencies[index] !== null ? efficiencies[index] : "-"}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={calculateEfficiencies}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate Efficiencies
      </button>
      {average !== null && (
        <div className="text-lg font-semibold text-green-700">
          Average Efficiency (Last 4 rounds ×10): {average}
        </div>
      )}
    </div>
  );
}
