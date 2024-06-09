import React, { useState } from 'react';
import { Card, Button, notification } from 'antd';
import axios from 'axios';

const GenerateCSV = () => {
    const [csvData, setCsvData] = useState('');

    const generateCSV = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/api/reports/generate-csv', {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob' // Set response type to blob to handle file download
        })
            .then(response => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setCsvData(fileReader.result); // Set the CSV data to state
                };
                fileReader.readAsText(response.data); // Read the blob data as text
                notification.success({
                    message: 'CSV Generated',
                    description: 'CSV file generated successfully.',
                });
            })
            .catch(error => {
                console.error('Failed to generate CSV file', error);
                notification.error({
                    message: 'Error',
                    description: 'Failed to generate CSV file.',
                });
            });
    };

    return (
        <Card title="Generated CSV">
            <Button type="primary" onClick={generateCSV}>Generate CSV</Button>
            <div style={{ marginTop: '20px' }}>
                {csvData && (
                    <pre>{csvData}</pre>
                )}
            </div>
        </Card>
    );
};

export default GenerateCSV;
