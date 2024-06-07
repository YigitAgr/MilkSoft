import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import axios from 'axios';

const FarmCardModal = ({ isModalVisible, handleOk, handleCancel, farm, updateFarm }) => {
    const [month, setMonth] = useState('');
    const [totalMilkProduced, setTotalMilkProduced] = useState('');

    // Set the current month in the format YYYY-MM when the component mounts
    useEffect(() => {
        const currentMonth = new Date().toISOString().slice(0, 7); // Get the current year and month in YYYY-MM format
        setMonth(currentMonth);
    }, []);

    const handleSubmit = async () => {
        if (!month || !totalMilkProduced) {
            message.error('Please fill in all fields.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8080/api/monthlyMilkProduction/addMilktoFarmer', {
                farmId: farm.id,
                month,
                totalMilkProduced
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update the farm data in the frontend
            updateFarm({ ...farm, monthlyMilkProductions: [...farm.monthlyMilkProductions, response.data] });

            message.success('Monthly milk production updated successfully.');
            setTotalMilkProduced('');
            handleOk(); // Close the modal
        } catch (error) {
            console.log("error", error);
            console.error('Failed to update monthly milk production:', error);
            message.error('Failed to update monthly milk production.');
        }
    };

    // Aggregate monthly milk production data
    const aggregatedProduction = farm.monthlyMilkProductions.reduce((acc, production) => {
        if (!acc[production.month]) {
            acc[production.month] = 0;
        }
        acc[production.month] += production.totalMilkProduced;
        return acc;
    }, {});

    return (
        <Modal
            title="Farm Details"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Name: {farm.name}</p>
            <p>Total Cows: {farm.totalCows}</p> {/* Display total cows */}
            <h3>Monthly Milk Production:</h3>
            {Object.keys(aggregatedProduction).length > 0 ? (
                <ul>
                    {Object.entries(aggregatedProduction).map(([month, totalProduction], index) => (
                        <li key={index}>
                            Month: {month}, Total Production: {totalProduction}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No monthly milk production data available.</p>
            )}

            <h3>Update Monthly Milk Production:</h3>
            <Form layout="inline">
                <Form.Item>
                    <Input
                        placeholder="Month (e.g. 2024-06)"
                        value={month}
                        onChange={e => setMonth(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Production Amount"
                        value={totalMilkProduced}
                        onChange={e => setTotalMilkProduced(e.target.value)}
                    />
                </Form.Item>
                <Form.Item style={{ marginTop: '2%' }}> {/* Add margin to the right side */}
                    <Button type="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FarmCardModal;
