import React from "react";
import { Spin, Alert } from 'antd';

const LoadingMessage = ({ loadingMessage, title, message } ) => {
  return (
    <Spin tip={loadingMessage || "Loading..."}>
      <Alert
        message={title || "Fetching data..."}
        description={message || "Fetching data..."}
        type="info"
      />
    </Spin>
  )
}

export default LoadingMessage;