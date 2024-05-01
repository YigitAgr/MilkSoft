import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const ButtonLoading = ({ buttonText }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const enterLoading = () => {
        setLoading(true);
        if(buttonText === "Log In"){
            navigate("/login");
        }else if(buttonText === "Sign Up"){
            navigate("/signup");
        }
    };

    return (
        <Space wrap>
            <Button type="primary"
                    style={{color: "white", backgroundColor: "rgba(0, 0, 0, 0.700)"}}
                    loading={loading}
                    onClick={enterLoading}>
                {buttonText}
            </Button>
        </Space>
    );
};

export default ButtonLoading;