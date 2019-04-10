import React from "react";
import { Alert } from 'antd';

const ErrorMessage = (props) => {
  const title = props.title || "Something went wrong";
  return (
    <Alert
      message={title}
      description={props.error}
      type="error"
    />
  )
}

export default ErrorMessage;