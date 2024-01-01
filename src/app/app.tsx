// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios'
import Dashboard from './dashborad/dashboard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState } from 'react';
import {  Button, Layout,Radio,Select,Upload,theme } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { RadioChangeEvent } from 'antd';

// upload use
const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info:any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


// layout use
const { Header, Content, Footer } = Layout;

let value_re = "";
// seclet menu use
const handleChange = (value: { value: string; label: React.ReactNode }) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  value_re = value.value;
};



const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // backend api use
  // const testClick =() =>{
  //   axios.get('http://127.0.0.1:3000/google').then(response=>{
  //   if (response.status >= 200 && response.status < 300){
  //     console.log(response)
  //   } else{
  //     //
  //   }
    
  //   })
  // };

  //Radio use
  const [value, setValue] = useState(null);
  const [radio_status, setDisabled] = useState(false);
  const [isShow_1, setisShow_1] = useState(false)
  const [isShow_2, setisShow_2] = useState(false)
  const [select_status, Disabled_select] = useState(false)
  const [upload_status, Disabled_upload] = useState(false)
  
 
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setDisabled(!radio_status);
    if (e.target.value === 1){
      setisShow_1(!isShow_1)
    }else {
      setisShow_2(!isShow_2)
    }
  };
  const toggleDisabled = () => {
    if (radio_status===false){
      setDisabled(radio_status)
    }else{
      setDisabled(!radio_status);
    }
    if (isShow_1===false){
      setisShow_1(isShow_1)
    }else{
      setisShow_1(!isShow_1)
    }
    if (isShow_2===false){
      setisShow_2(isShow_2)
    }else{
      setisShow_2(!isShow_2)
    }
    setValue(null)
    Disabled_select(false)
    Disabled_upload(false)
    console.log('checked', isShow_2);
  };

  const startwork = () => {
    console.log(value);
    console.log(value_re)
    Disabled_select(true)
    Disabled_upload(true)
    axios.get('http://127.0.0.1:3000/default',{
        params: {
          model: value_re
        }
      }
    )
    .then( (response) => console.log(response))
    .catch( (error) => console.log(error));
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: "#ADD8E6" }}>Third-party platform</h1>
      </Header>
      
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 550,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content */}
          <Dashboard></Dashboard>
          
          <h2>choose plan</h2>
          <Radio.Group onChange={onChange} value={value}>
              <Radio value={1} disabled={radio_status}>customized model </Radio>
              <Radio value={2} disabled={radio_status}>default model </Radio>
          </Radio.Group>

          <Button type="primary" onClick={toggleDisabled} style={{ marginTop: 16 }}>
            rest
          </Button>
          <br />

          <Upload {...props}>
            <Button disabled={upload_status} style={{display:isShow_1?'block':'none'}} icon={<UploadOutlined />}>Click to Upload your model</Button>
          </Upload>


          <Select
            labelInValue
            defaultValue={{ value: 'default', label: 'choose model' }}
            style={{ width: 150,display:isShow_2?'block':'none'}}
            onChange={handleChange}
            disabled={select_status}
            options={[
              {
                value: 'MLP',
                label: 'MLP model',
              },
              {
                value: 'CNN',
                label: 'CNN model',
              },
              {
                value: 'LSTM',
                label: 'LSTM model',
              },
            ]}
          />
          <br />
          <Button type="primary" onClick={startwork} style={{ marginTop: 16 }}>
            start
          </Button>

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Design ©2023 Created by </Footer>
    </Layout>
  );
};

export default App;

