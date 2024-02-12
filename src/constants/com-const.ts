// api 設定
export const API = {
  // baseURL: 'http://192.168.0.174:3000',
  baseURL: 'http://127.0.0.1:3000' ,
};

// 預設模型選項
export const DefaultModuleOptions = [
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
];

// 使用模型方式
export const ModuleMethods = {
  CUSTOMIZED: {
    value: 'customized',
    label: 'Customized Model',
  },
  DEFAULT: {
    value: 'default',
    label: 'Default Model',
  },
};
