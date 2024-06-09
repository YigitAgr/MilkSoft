import { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Empty } from 'antd';
import axios from 'axios';

Chart.register(...registerables);

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MonthlyMilk = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMonthlyProduction = async () => {
            setLoading(true);
            try {
                // Get token from local storage
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Token not found');
                }

                // Decode token to get userId
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                const farmerIdResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const farmerId = farmerIdResponse.data.farmerId;
                console.log("farmer",farmerIdResponse);
                // Fetch association ID using user ID
                const farmIdResponse = await axios.get(`http://localhost:8080/api/farm/getFarmId/${farmerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("farm",farmIdResponse);
                // Fetch monthly production data for selected farm using association ID
                const farmId = farmIdResponse.data; // Replace with the actual farm ID
                const productionResponse = await axios.get(`http://localhost:8080/api/farm/selectedFarmProductions/${farmId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = productionResponse.data;
                console.log(data);
                // Process data to combine production values by month
                const monthlyProduction = {};
                data.forEach(production => {
                    const monthName = monthNames[new Date(production.month).getMonth()];
                    if (!monthlyProduction[monthName]) {
                        monthlyProduction[monthName] = 0;
                    }
                    monthlyProduction[monthName] += production.totalMilkProduced;
                });

                // Create labels for all months of the year
                const labels = monthNames;

                // Create data array with production values for each month
                const values = monthNames.map(monthName => monthlyProduction[monthName] || 0);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Monthly Milk Production',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyProduction();
    }, []);

    useEffect(() => {
        let chart;
        if (chartRef.current && chartData) {
            chart = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
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
    }, [chartData]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : chartData && chartData.labels.length > 0 ? (
                <canvas ref={chartRef} />
            ) : (
                <Empty description="No data available" />
            )}
        </div>
    );
};

export default MonthlyMilk;
