// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Layout } from 'antd';
import { RootRoute } from '../routers';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f5f5f5',
          borderBottom: '1px solid #dadada',
        }}
      >
        <h1>Third-party platform</h1>
      </Header>

      <Content
        style={{
          padding: '0 48px',
          height: '100%',
          background: '#fefefe',
        }}
      >
        <RootRoute />
      </Content>

      <Footer style={{ textAlign: 'center' }}>Design ©2023 Created by </Footer>
    </Layout>
  );
};

export default App;
