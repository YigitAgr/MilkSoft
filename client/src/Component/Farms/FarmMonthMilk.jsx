    import { useEffect, useState } from "react";
    import { Empty } from 'antd';
    import axios from 'axios';

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const FarmMonthMilk = () => {
        const [totalProduction, setTotalProduction] = useState(null);
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

                    // Fetch farmerId using userId
                    const farmerIdResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const farmerId = farmerIdResponse.data.farmerId;
                    console.log("farmer", farmerIdResponse);

                    // Fetch farmId using farmerId
                    const farmIdResponse = await axios.get(`http://localhost:8080/api/farm/getFarmId/${farmerId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log("farm", farmIdResponse);

                    // Fetch monthly production data for selected farm using farmId
                    const farmId = farmIdResponse.data;
                    const productionResponse = await axios.get(`http://localhost:8080/api/farm/selectedFarmProductions/${farmId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = productionResponse.data;
                    console.log(data);

                    // Get the current month and year
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();

                    // Calculate the total production for the current month
                    const totalMilkProducedThisMonth = data
                        .filter(production => {
                            const productionDate = new Date(production.month);
                            return productionDate.getMonth() === currentMonth && productionDate.getFullYear() === currentYear;
                        })
                        .reduce((total, production) => total + production.totalMilkProduced, 0);

                    setTotalProduction(totalMilkProducedThisMonth);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data');
                } finally {
                    setLoading(false);
                }
            };

            fetchMonthlyProduction();
        }, []);

        return (
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p> {totalProduction} </p>
                )}
            </div>
        );
    };

    export default FarmMonthMilk;
