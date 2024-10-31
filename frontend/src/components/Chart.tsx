// components/Chart.tsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of sentiment data
interface SentimentDistribution {
  negative: number;
  neutral: number;
  positive: number;
}

// Define the props for the Chart component
interface ChartProps {
  sentiment: SentimentDistribution;
}

// Define the data structure for each pie slice
interface PieData {
  name: string;
  value: number;
}

// Define color constants for the pie slices
const COLORS: string[] = ['#FF4D4F', '#FFC53D', '#73D13D']; // Negative, Neutral, Positive

const Chart: React.FC<ChartProps> = ({ sentiment }) => {
  // Prepare data for the pie chart
  const data: PieData[] = [
    { name: 'Negative', value: sentiment.negative },
    { name: 'Neutral', value: sentiment.neutral },
    { name: 'Positive', value: sentiment.positive },
  ];

  return (
    <div className="bg-white bg-opacity-90 p-5 rounded-lg w-full max-w-md">
      <h3 className="text-xl font-bold mb-4 text-black">Sentiment Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
