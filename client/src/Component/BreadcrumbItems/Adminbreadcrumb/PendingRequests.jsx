import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Button, notification } from 'antd';
import axios from 'axios';

const { Search } = Input;

const PendingRequests = ({ showActions = true }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchAssociationId = async () => {
        const token = localStorage.getItem('token'); // Use the correct token name
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
                const userId = decodedToken.userId;
                const response = await axios.get(`http://localhost:8080/api/association/getAssociationId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching association ID', error);
                throw error;
            }
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const associationId = await fetchAssociationId();
            const token = localStorage.getItem('token');
            if (token && associationId) {
                const response = await axios.get(`http://localhost:8080/api/association/pendingRequests/${associationId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPendingRequests(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the pending requests!', error);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const handleResponse = (record, status) => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8080/api/v1/membership/respondRequest`, {}, {
            params: {
                requestId: record.id,
                status: status
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                notification.success({
                    message: `Request ${status}`,
                    description: `The request has been ${status.toLowerCase()} successfully.`,
                });
                fetchPendingRequests(); // Refresh the pending requests
            })
            .catch(error => {
                console.error('There was an error!', error);
                notification.error({
                    message: 'Error',
                    description: `There was an error ${status.toLowerCase()} the request.`,
                });
            });
    };

    const columns = [
        {
            title: 'Farmer Name',
            dataIndex: 'farmerName',
            key: 'farmerName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        ...(showActions ? [
            {
                title: 'Action',
                key: 'action',
                align: 'right',
                render: (text, record) => (
                    <>
                        <Button type="primary" onClick={() => handleResponse(record, 'ACCEPTED')} style={{ marginRight: '5%' }}>Accept</Button>
                        <Button type="default" onClick={() => handleResponse(record, 'REJECTED')}>Reject</Button>
                    </>
                ),
            },
        ] : []),
    ];

    const onSearchChange = event => {
        setSearchText(event.target.value);
    };

    const filteredRequests = pendingRequests.filter(request =>
        request.farmerName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Card title="Pending Membership Request" bordered={false}>
            <div style={{ height: '25vw' }}>
                <Search placeholder="Search Farmer" onChange={onSearchChange} style={{ width: '100%', marginBottom: '4%' }} />
                <Table columns={columns} dataSource={filteredRequests} pagination={{ pageSize: 6 }} />
            </div>
        </Card>
    );
};

export default PendingRequests;
