import React from "react";
import {Card, Layout} from "antd";

const { Content } = Layout;

const FarmsContent = () => {

   return (
       <Content
           style={{
               margin: '24px 16px',
               padding: 24,
               minHeight: 280,
               background: '#f5f5f5', // You can customize the background color
               borderRadius: '20px', // You can customize the border radius
           }}
       >

           <Card title="Farms" bordered={false}></Card>
       </Content>
   );
}

export default FarmsContent;