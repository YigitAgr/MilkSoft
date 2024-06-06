import React from "react";
import { Modal } from "antd";

const FarmCardModal = ({ isModalVisible, handleOk, handleCancel, farm }) => (
    <Modal
        title={farm ? farm.name : ''}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="my-modal-class"
    >
        {farm && (
            <div>
                <p>Name: {farm.name}</p>
                <p>Total Cows: {farm.totalCows}</p>
                <p>Daily Milk Production: {farm.dailyMilkProduction}</p>
                {/* Display other farm details as needed */}
            </div>
        )}
    </Modal>
);


export default FarmCardModal;
