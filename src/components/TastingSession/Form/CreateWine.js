import React, { Component } from "react";
import { Mutation } from "react-apollo";
import CREATE_WINE from "../../../graphql/mutations/CREATE_WINE";
import WINES from "../../../graphql/queries/WINES";
import { Row, Col, Input, InputNumber, Button, Select, Alert } from 'antd';
import "./CreateWine.css"

class CreateWine extends Component {
  state = {
    isOpen: false,
    name: "",
    grapes: [],
    winery: "",
    year: undefined,
    alcohol: undefined,
    price: undefined,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "grapes") {
      this.setState({
        grapes: [...e.target.selectedOptions].map(o => o.value),
      });
    } else {
      if (name === "price" || name === "year" || name === "alcohol")
        value = Number(value);
      this.setState({ [name]: value });
    }
  };

  render() {
    const { isOpen, name, grapes, winery, year, alcohol, price } = this.state;
    return (
      <div className="create-wine-container">
        <Button className="main" onClick={this.toggle}>Create New Wine</Button>

        {isOpen ? (
          <div className="create-wine-form"
            style={{
              border: "1px solid black",
              padding: "20px",
              margin: "0 10%",
              borderRadius: "2%",
            }}
          >
            <Row>
              <Col span={24}>
                <Input name="name" value={name} onChange={this.inputHandler} placeholder="Name" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <select
                  name="grapes"
                  value={grapes}
                  onChange={this.inputHandler}
                  type="text"
                  placeholder="Grapes"
                  multiple={true}
                >
                  <option value="GEWURZTRAMINER">GEWURZTRAMINER</option>
                  <option value="CHARDONNAY">CHARDONNAY</option>
                  <option value="SAUVIGNON_BLANC">SAUVIGNON BLANC</option>
                  <option value="SYRAH">SYRAH</option>
                  <option value="MERLOT">MERLOT</option>
                  <option value="CABERNET_SAUVIGNON">CABERNET SAUVIGNON</option>
                  <option value="PINOT_NOIR">PINOT NOIR</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input name="winery" value={winery} onChange={this.inputHandler} placeholder="Winery" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input name="year" value={year} onChange={this.inputHandler} placeholder="Year" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input name="alcohol" value={alcohol} onChange={this.inputHandler} placeholder="Alcohol percentage" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input name="price" value={price} onChange={this.inputHandler} placeholder="Price" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Mutation
                  mutation={CREATE_WINE}
                  update={(cache, { data: { createWine } }) => {
                    const { wines } = cache.readQuery({ query: WINES });
                    cache.writeQuery({
                      query: WINES,
                      data: { wines: wines.concat([createWine]) },
                    });
                  }}
                  variables={{
                    name,
                    grapes,
                    winery,
                    year,
                    alcohol,
                    price,
                  }}
                  onCompleted={() =>
                    this.setState({
                      isOpen: false,
                      name: "",
                      grapes: [],
                      winery: "",
                      year: undefined,
                      alcohol: undefined,
                      price: undefined,
                    })
                  }
                >
                  {(postMutation, { loading, error }) => (
                    <div className="actions">
                      <Button loading={loading} onClick={postMutation}>Submit</Button>
                      <Button type="danger" onClick={this.toggle}>Cancel</Button>
                      {error && <Alert message={error.message} type="error" />}
                    </div>
                  )}
                </Mutation>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CreateWine;
