import {useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

function SummaryChart() {
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/getAllPizzas')
            .then(res => res.json())
            .then(data => {
                setSummary(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load data');
                setLoading(false);
            });
    }, []);

    const chartData = {
        labels: summary.map((pizza) => pizza.name),
        datasets: [
            {
                label: "Upvotes",
                data: summary.map((pizza) => pizza.upvotes),
                backgroundColor: [
                    "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6", "#facc15", "#38bdf8", "#4ade80", "#f472b6"
                ],
                borderRadius: 8,
                maxBarThickness: 48,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Pizza Upvotes",
                color: '#fff',
                font: { size: 22, weight: 'bold' },
                padding: { top: 10, bottom: 30 },
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: '#fff',
                font: { weight: 'bold', size: 16 },
                formatter: (value) => value,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `Upvotes: ${context.parsed.y}`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#fff', font: { size: 14 } },
                grid: { color: 'rgba(255,255,255,0.1)' },
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#fff', font: { size: 14 } },
                grid: { color: 'rgba(255,255,255,0.1)' },
            },
        },
        animation: {
            duration: 1200,
            easing: 'easeOutQuart',
        },
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-zinc-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Pizza Votes Summary
            </h2>
            <div className="bg-zinc-700 rounded-lg p-6 flex items-center justify-center min-h-[300px]">
                {loading ? (
                    <span className="text-gray-400">Načítám graf...</span>
                ) : error ? (
                    <span className="text-red-400">{error}</span>
                ) : summary.length === 0 ? (
                    <span className="text-gray-400">Žádná data</span>
                ) : (
                    <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
                )}
            </div>
        </div>
    );
}

export default SummaryChart;

