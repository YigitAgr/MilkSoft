import React, { useState } from "react";
import { Card, Pagination } from "antd";

const cardStyle = {
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
};

const containerStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 500,
    background: '#f5f5f5',
    borderRadius: '20px',
};

const MonthsCard = () => {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const visibleMonths = months.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {visibleMonths.map((month, index) => (
                    <Card
                        key={index}
                        title={month}
                        hoverable
                        style={cardStyle}
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
        </div>
    );
};

export default MonthsCard;
