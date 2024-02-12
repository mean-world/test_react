import { Button, Col, Divider, Radio, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { setTraining } from 'src/api/test';
import { useQuery } from '@tanstack/react-query';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { DefaultModuleOptions, ModuleMethods } from 'src/constants/com-const';
import { InputNumber } from 'antd';

//api create_ray_env(username, cpu, memory, worker)

/* eslint-disable-next-line */
export interface DashboardProps { }

export function Dashboard(props: DashboardProps) {
  const [moduleMethod, setModuleMethod] = useState(ModuleMethods.DEFAULT.value);
  const [selectedModule, setSelectedModule] = useState(
    DefaultModuleOptions[0].value
  );
  const [isSendTraining, setIsSendTraining] = useState(false);
  const [cpu_num, setcpu_num] = useState<number | null>(2)
  const [memory_num, setmemory_num] = useState<number | null>(2)
  const [worker_num, setworker_num] = useState<number | null>(2)
  const [isNext, setIsNext] = useState(false);

  const file_path = [];
  // 當檔案上傳變更
  const onFileUploadChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      file_path.push(info);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 調用API
  const { data, isFetching, isSuccess, isError } = useQuery({
    queryKey: ['create_ray_env'],
    queryFn: () => setTraining('test', 2, 2, 3),
    enabled: isSendTraining,
    gcTime: 0,
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

  const onChange_cpu = (value: number | null) => {
    console.log('changed', value);
    setcpu_num(value)
  };

  const onChange_memory = (value: number | null) => {
    console.log('changed', value);
    setmemory_num(value)
  };

  const onChange_worker = (value: number | null) => {
    console.log('changed', value);
    setworker_num(value)
  };

  return (
    <div className='setting-section'>
        <section className='dashboard-section section1'>
          <h2 className='title'>設定分散式訓練環境</h2>
          <Row style={{ marginTop: '12px' }} gutter={12} align={'middle'} justify={'space-between'}>
            <Col>
              <label>CPU：</label>
              <InputNumber
                name="cpu"
                min={2}
                max={6}
                value={cpu_num}
                onChange={onChange_cpu}
              />
            </Col>
            <Col>
              <label>Memory：</label>
              <InputNumber
                name="memory"
                min={2}
                max={6}
                value={memory_num}
                onChange={onChange_memory}
              />
            </Col>
            <Col>
              <label>Worker：</label>
              <InputNumber
                name="worker"
                min={2}
                max={6}
                value={worker_num}
                onChange={onChange_worker}
              />
            </Col>

            <Col>
              <Button
                type="primary"
                onClick={() => setIsSendTraining(true)}
                loading={isFetching}
              >
                Create
              </Button>
            </Col>
          </Row>

        </section>


        <section className={`dashboard-section ${isNext ? 'section2' : 'disable'}`}>
          <h2 className='title'>選擇模型</h2>
          <Row style={{ marginTop: '12px' }} gutter={12} align={'middle'} justify={'space-between'}>

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

            <Col>
              <Button
                type="primary"
                onClick={() => setIsSendTraining(true)}
                loading={isFetching}
                disabled={!isNext}
              >
                start
              </Button>
            </Col>
          </Row>

          {!isNext &&
            <div className='disable-cover'>
              <h2>請先新增環境</h2>
            </div>
          }
        </section>
      </div >
  );
}

export default Dashboard;
