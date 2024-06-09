import React from 'react';

const DateComponent = () => {
    // Get the current date
    const currentDate = new Date();

    // Format the date to a readable string (e.g., June 9, 2024)
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <p>Today's date is: {formattedDate}</p>
        </div>
    );
}

export default DateComponent;
