
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions, registerables } from 'chart.js';

ChartJS.register(...registerables);

const WeekSignupsChart: React.FC = () => {
    const chartRef = useRef<ChartJS<'line'> | null>(null);

    const data: ChartData<'line'> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                label: 'Signups',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Signups',
                },
            },
        },
    };

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full" style={{ position: 'relative', height: '400px' }}>
            <Line
                ref={(instance) => {
                    if (instance) {
                        chartRef.current = instance;
                    }
                }}
                data={data}
                options={options}
            />
        </div>
    );
};

export default WeekSignupsChart;
