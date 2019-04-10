import React, { Component } from "react";
import { Mutation } from "react-apollo";
import ListWines from "./ListWines";
import WINE_TASTERS from "../../../graphql/queries/WINE_TASTERS";
import CREATE_WINE_TASTER from "../../../graphql/mutations/CREATE_WINE_TASTER";
import { Row, Col, Input, InputNumber, Button, Select, Alert, Modal } from 'antd';
import "./CreateWineTaster.css"

const Option = Select.Option;
const initialState = {
  isOpen: false,
  name: "",
  nationality: "",
  gender: "MALE",
  age: undefined,
  favouriteWine: undefined,
};

class CreateWineTaster extends Component {
  state = {...initialState};

  openDialog = () => this.setState({...initialState, isOpen: true});

  closeDialog = () => this.setState({ isOpen: false });

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "number") value = Number(value);
    this.setState({ [name]: value });
  };

  render() {
    const { isOpen, name, nationality, gender, age, favouriteWine } = this.state;
    return (
      <div className="create-wine-taster-container">
        <Button className="main" onClick={this.openDialog}>Create New Wine Taster</Button>

        {isOpen && (
          <Mutation
            mutation={CREATE_WINE_TASTER}
            update={(cache, { data: { createWineTaster } }) => {
              const { wineTasters } = cache.readQuery({
                query: WINE_TASTERS,
              });
              cache.writeQuery({
                query: WINE_TASTERS,
                data: { wineTasters: wineTasters.concat([createWineTaster]) },
              });
            }}
            variables={{ name, nationality, gender, age, favouriteWine }}
            onCompleted={this.closeDialog}
          >
            {(postMutation, { loading, error }) => (
              <Modal
                title="Create New Wine Taster"
                visible={isOpen}
                onCancel={this.closeDialog}
                footer={[
                  <Button key="cancel" disabled={loading} onClick={this.closeDialog}>Cancel</Button>,
                  <Button key="ok" type="primary" loading={loading} onClick={postMutation}>Save</Button>
                ]}
              >
                <div className="create-wine-taster-form">
                  <Row>
                    <Col span={24}>
                      <Input name="name" value={name} onChange={this.inputHandler} placeholder="Name" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input name="nationality" value={nationality} onChange={this.inputHandler} placeholder="Nationality" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Select
                        className="select"
                        name="gender"
                        value={gender}
                        onChange={e => this.setState({ gender: e })}
                      >
                        <Option value="MALE">Male</Option>
                        <Option value="FEMALE">Female</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <InputNumber
                        className="number"
                        value={age}
                        min={0}
                        max={100}
                        onChange={e => this.setState({ age: Number(e) })}
                        placeholder="Age"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ListWines
                        childCB={id => this.setState({ favouriteWine: id })}
                        placeholder="Favourite Wine"
                      />
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

export default CreateWineTaster;
