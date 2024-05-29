import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Button } from "antd";
import axios from 'axios';

const { Search } = Input;

const PendingRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [searchText, setSearchText] = useState('');


    const Accept = (record) => {
        let token = localStorage.getItem("decodedToken");
        token = btoa(unescape(encodeURIComponent(token)));
        axios.post(`http://localhost:8080/api/v1/membership/respondRequest?requestId=${record.id}&status=ACCEPTED`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const Reject = (record) => {
        let token = localStorage.getItem("decodedToken");
        token = btoa(unescape(encodeURIComponent(token)));
        axios.post(`http://localhost:8080/api/v1/membership/respondRequest?requestId=${record.id}&status=REJECTED`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("decodedToken");
        if (token) {
            try {
                const decodedToken = JSON.parse(token);
                const userId = decodedToken.userId;
                axios.get(`http://localhost:8080/api/association/pendingRequests/${userId}`)
                    .then(response => {
                        setPendingRequests(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            } catch (e) {
                console.error('Invalid token', e);
            }
        }
    }, []);

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
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => Accept(record)} style={{marginRight:'5%'}}>Accept</Button>
                    <Button type="default" onClick={() => Reject(record)}>Reject</Button>
                </>
            ),
        },

    ];



    const onSearchChange = event => {
        setSearchText(event.target.value);
    };

    const filteredRequests = pendingRequests.filter(request =>
        request.farmerName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Card>
            <div style={{height:'33vw'}}>
                <Search placeholder="Search Farmer" onChange={onSearchChange} style={{width:'20vw', marginBottom: '4%'}}/>
                <Table columns={columns} dataSource={filteredRequests} pagination={6}  />
            </div>
        </Card>
    );
}

export default PendingRequests;