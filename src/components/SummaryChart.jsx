import {useEffect, useState} from "react";


import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function SummaryChart() {
    const[summary, setSummary] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/getAllPizzas')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSummary(data);
            })
            .catch(err => console.log(err));
    }, []);

    const chartData = {
        labels: summary.map((pizza) => pizza.name),
        datasets: [
            {
                label: "Upvotes",
                data: summary.map((pizza) => pizza.upvotes),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-zinc-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Pizza Votes Summary
            </h2>
            <div className="bg-zinc-700 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                            title: { display: true, text: "Pizza Upvotes" },
                        },
                    }}
                />
                <span className="text-gray-400">[Chart Placeholder]</span>
            </div>
        </div>
    );
}

export default SummaryChart;