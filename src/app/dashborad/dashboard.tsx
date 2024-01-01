import { Button, Col, Radio, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { setTraining } from 'src/api/test';
import { useQuery } from '@tanstack/react-query';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { DefaultModuleOptions, ModuleMethods } from 'src/constants/com-const';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const [moduleMethod, setModuleMethod] = useState(ModuleMethods.DEFAULT.value);
  const [selectedModule, setSelectedModule] = useState(
    DefaultModuleOptions[0].value
  );
  const [isSendTraining, setIsSendTraining] = useState(false);

  // 當檔案上傳變更
  const onFileUploadChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 調用API
  const { data, isFetching, isSuccess, isError } = useQuery({
    queryKey: ['training'],
    queryFn: () => setTraining(selectedModule),
    enabled: isSendTraining,
  });

  useEffect(() => {
    if (!isFetching) {
      setIsSendTraining(false);
      if (isError) message.error(`Failed`);
      if (isSuccess) {
        console.log(data);
      }
    }
  }, [isFetching]);

  return (
    <>
      <h2>choose plan</h2>
      <Row>
        <Col>
          <Radio.Group
            onChange={(e) => setModuleMethod(e.target.value)}
            value={moduleMethod}
          >
            <Radio value={ModuleMethods.DEFAULT.value}>
              {ModuleMethods.DEFAULT.label}
            </Radio>
            <Radio value={ModuleMethods.CUSTOMIZED.value}>
              {ModuleMethods.CUSTOMIZED.label}
            </Radio>
          </Radio.Group>
        </Col>
      </Row>

      <Row style={{ marginTop: '20px' }}>
        <Col>
          {moduleMethod === ModuleMethods.DEFAULT.value && (
            <Select
              options={DefaultModuleOptions}
              value={selectedModule}
              onChange={(value) => setSelectedModule(value)}
            />
          )}

          {moduleMethod === ModuleMethods.CUSTOMIZED.value && (
            <Upload
              name="file"
              onChange={onFileUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>
                Click to Upload your model
              </Button>
            </Upload>
          )}
        </Col>
      </Row>

      <Row style={{ marginTop: '20px' }}>
        <Col>
          <Button
            type="primary"
            onClick={() => setIsSendTraining(true)}
            loading={isFetching}
          >
            start
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
