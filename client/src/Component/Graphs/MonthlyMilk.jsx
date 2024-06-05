import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Empty } from 'antd';

Chart.register(...registerables);

const MonthlyMilk = ({ efforts }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Monthly Data',
                            data: [12, 19, 3, 5, 2, 3, 7, 8, 6, 5, 4, 7],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            return () => {
                chart.destroy();
            };
        }
    }, []);

    return (
        <div>
            <canvas ref={chartRef}/>
            {efforts && efforts.length === 0 && <Empty description="No data available"/>}
        </div>
    );
};

export default MonthlyMilk;
