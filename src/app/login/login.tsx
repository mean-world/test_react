/* eslint-disable react-hooks/rules-of-hooks */
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // const [iscreateuser, setIscreateuser] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!iscreateuser) navigate('/');
  // }, [iscreateuser]);

  return (
    <div style={{ height: '100%' }}>
      <Flex justify="center" align="ceter">
        <Card bordered={false} style={{ background: '#ADD8E6' }}>
          <h2>input username</h2>
          <Input
            size="large"
            placeholder="username"
            prefix={<UserOutlined />}
            maxLength={10}
            style={{ width: 150 }}
          />
          <br />
          <Button
            type="primary"
            onClick={() => navigate('/', { state: {} })}
            style={{ width: 150, marginTop: 10 }}
          >
            submit
          </Button>
        </Card>
      </Flex>
    </div>
  );
};

export default Login;
