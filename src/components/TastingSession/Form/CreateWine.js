import React, { Component } from "react";
import { Mutation } from "react-apollo";
import CREATE_WINE from "../../../graphql/mutations/CREATE_WINE";
import WINES from "../../../graphql/queries/WINES";
import { Row, Col, Input, Button, Select, Alert, Modal } from 'antd';
import "./CreateWine.css"

const Option = Select.Option;
const initialState = {
  isOpen: false,
  name: "",
  grapes: [],
  winery: "",
  year: undefined,
  alcohol: undefined,
  price: undefined,
};

class CreateWine extends Component {
  state = {...initialState};

  openDialog = () => this.setState({...initialState, isOpen: true});

  closeDialog = () => this.setState({ isOpen: false });

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "price" || name === "year" || name === "alcohol") {
      value = Number(value);
    }
    this.setState({ [name]: value });
  };

  selectHandler = e => this.setState({ grapes: [...e] });

  render() {
    const { isOpen, name, grapes, winery, year, alcohol, price } = this.state;
    return (
      <div className="create-wine-container">
        <Button className="main" onClick={this.openDialog}>Create New Wine</Button>

        {isOpen && (
          <Mutation
            mutation={CREATE_WINE}
            update={(cache, { data: { createWine } }) => {
              const { wines } = cache.readQuery({ query: WINES });
              cache.writeQuery({
                query: WINES,
                data: { wines: wines.concat([createWine]) },
              });
            }}
            variables={{ name, grapes, winery, year, alcohol, price }}
            onCompleted={this.closeDialog}
          >
            {(postMutation, { loading, error }) => (
              <Modal
                title="Create New Wine"
                visible={isOpen}
                onCancel={this.closeDialog}
                footer={[
                  <Button key="cancel" disabled={loading} onClick={this.closeDialog}>Cancel</Button>,
                  <Button key="ok" type="primary" loading={loading} onClick={postMutation}>Save</Button>
                ]}
              >
                <div className="create-wine-form">
                  <Row>
                    <Col span={24}>
                      <Input name="name" value={name} onChange={this.inputHandler} placeholder="Name" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Select
                        className="select"
                        onChange={this.selectHandler}
                        placeholder="Grapes"
                        mode="multiple"
                        value={grapes}
                      >
                        <Option value="GEWURZTRAMINER">GEWURZTRAMINER</Option>
                        <Option value="CHARDONNAY">CHARDONNAY</Option>
                        <Option value="SAUVIGNON_BLANC">SAUVIGNON BLANC</Option>
                        <Option value="SYRAH">SYRAH</Option>
                        <Option value="MERLOT">MERLOT</Option>
                        <Option value="CABERNET_SAUVIGNON">CABERNET SAUVIGNON</Option>
                        <Option value="PINOT_NOIR">PINOT NOIR</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input name="winery" value={winery} onChange={this.inputHandler} placeholder="Winery" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input type="number" name="year" value={year} onChange={this.inputHandler} placeholder="Year" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input type="number" name="alcohol" value={alcohol} onChange={this.inputHandler} placeholder="Alcohol percentage" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input type="number" name="price" value={price} onChange={this.inputHandler} placeholder="Price" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div className="actions">
                        {error && <Alert message={error.message} type="error" />}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Modal>
            )}
          </Mutation>
        )}
      </div>
    );
  }
}

export default CreateWine;
