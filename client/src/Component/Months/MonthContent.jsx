import React, { useState } from "react";
import { Card, Layout, Pagination } from "antd";

const { Content } = Layout;

const MonthContent = () => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const visibleMonths = months.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 500,
                background: '#f5f5f5',
                borderRadius: '20px',
            }}
        >
            <Card style={{ height: '38vw' }} title="Months" bordered={false}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {visibleMonths.map((month, index) => (
                        <Card
                            key={index}
                            title={month}
                            style={{
                                width: '200px',
                                height: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                borderRadius: '10px',
                                marginBottom: '30px',
                                marginTop: '40px',
                            }}
                        >
                            {/* Content for each month goes here */}
                        </Card>
                    ))}
                </div>
                <Pagination
                    style={{ marginTop: '20px', textAlign: 'center' }}
                    current={currentPage}
                    pageSize={pageSize}
                    total={months.length}
                    onChange={handlePageChange}
                />
            </Card>
        </Content>
    );
};

export default MonthContent;
