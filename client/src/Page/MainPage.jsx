import React from 'react';
import '../Component/MainPage/MainPage.css';
const MainPage = () => {
    return (
        <div className="main-page">
            <h1>Welcome to Our Farm</h1>
            <p>We are a farm dedicated to providing high-quality, sustainable produce.</p>

            <h2>Our Associations</h2>
            <p>We are proud members of the following farm-related associations:</p>
            <ul>
                <li>Association 1</li>
                <li>Association 2</li>
                <li>Association 3</li>
                // Add more associations as needed
            </ul>

            {/* Add more content here */}
        </div>
    );
};

export default MainPage;