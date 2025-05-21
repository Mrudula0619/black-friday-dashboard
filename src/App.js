import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/predictions.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const parsed = result.data.map((row) => ({
          ...row,
          Predicted_Purchase: parseFloat(row.Predicted_Purchase),
        }));
        setData(parsed);
      },
    });
  }, []);

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h2>Black Friday Predictions Dashboard</h2>

      <h4>📋 Predictions Table</h4>
      <table border="1" cellPadding="5" style={{ marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Predicted Purchase</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((row, idx) => (
            <tr key={idx}>
              <td>{row.User_ID}</td>
              <td>{row.Product_ID}</td>
              <td>{row.Predicted_Purchase.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>📊 Top 10 Predicted Purchases</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.slice(0, 10)}>
          <XAxis dataKey="User_ID" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Predicted_Purchase" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;

