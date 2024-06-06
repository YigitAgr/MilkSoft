import React, { useState } from "react";
import { Card, Layout} from "antd";
import './FarmCard.css';
import FarmCardModal from "../Modals/FarmCardModal.jsx";
import ciftlik from  "../../assets/ciftlik.jpg"

const { Content } = Layout;

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
    marginTop: '40px'
};

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 500,
    background: '#f5f5f5',
    borderRadius: '20px',
};

const FarmCard = ({ farm, onClick }) => {
    const { name, description } = farm;

    // Define the card style with the background image
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
        backgroundImage: `url(${ciftlik})`, // Set the background image
        backgroundSize: 'cover', // Adjust background size as needed
    };
    const customTitleStyle = {
        color: 'white', // Set the text color to white
    };

    return (
        <Card
            title={<div className="custom-card-title" style={customTitleStyle}>{name}</div>} // Apply custom title style
            hoverable
            style={cardStyle} // Apply the card style
            onClick={() => onClick(farm)}
        >
            {description}
        </Card>
    );
};




const FarmCards = ({ currentPage, itemsPerPage, farms, updateFarm }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFarm, setSelectedFarm] = useState(null);

    const showModal = (farm) => {
        setSelectedFarm(farm);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Calculate the farms to display based on pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFarms = farms.slice(startIndex, endIndex);

    return (
        <Content style={contentStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {currentFarms.map(farm => (
                    <FarmCard key={farm.id} farm={farm} onClick={showModal} />
                ))}
            </div>
            {selectedFarm && (
                <FarmCardModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    farm={selectedFarm} // Pass selected farm data
                />
            )}
        </Content>
    );
};


export default FarmCards;
