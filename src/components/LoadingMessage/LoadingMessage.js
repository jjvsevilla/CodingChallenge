import React from "react";
import { Spin, Alert } from 'antd';

const LoadingMessage = ({ loadingMessage, title, message } ) => {
  return (
    <div>
      <Spin tip={loadingMessage || "Loading..."}>
        <Alert
          message={title || "Fetching data..."}
          description={message || "Fetching data..."}
          type="info"
        />
      </Spin>
    </div>
  )
}

export default LoadingMessage;