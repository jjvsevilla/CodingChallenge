import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Button } from 'antd';
import CREATE_REVIEW from "../../../graphql/mutations/CREATE_REVIEW";
import { Select, InputNumber } from 'antd';
import "./CreateReview.css";

const Option = Select.Option;

class CreateReview extends Component {
  state = {
    score: undefined,
    tastingNotes: [],
  };

  inputHandler = e => {
    this.setState({ score: e });
  };

  selectHandler = e => {
    this.setState({ tastingNotes: [...e] });
  }

  render() {
    const { score, tastingNotes } = this.state;
    const { wineTaster, wine, tastingSession } = this.props;
    return (
      <div className="review">
        <h5>{this.props.wine}</h5>
        <InputNumber
          className="number"
          value={score}
          min={0}
          max={100}
          onChange={this.inputHandler}
          placeholder="Score: 0 - 100"
        />
        <Select
            className="select"
            onChange={this.selectHandler}
            placeholder="Tasting Notes"
            mode="multiple"
          >
          <Option value="ACIDIC">ACIDIC</Option>
          <Option value="BARNYARD">BARNYARD</Option>
          <Option value="BRIGHT">BRIGHT</Option>
          <Option value="BUTTERY">BUTTERY</Option>
          <Option value="COMPLEX">COMPLEX</Option>
          <Option value="CRISP">CRISP</Option>
          <Option value="EARTHY">EARTHY</Option>
          <Option value="OAKED">OAKED</Option>
          <Option value="JUICY">JUICY</Option>
        </Select>
        <Mutation
          mutation={CREATE_REVIEW}
          variables={{
            wine,
            wineTaster,
            tastingSession,
            score,
            tastingNotes,
          }}
        >
          {(postMutation, { loading }) =>
            <Button
              className="button"
              loading={loading}
              onClick={postMutation}>Save Review</Button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateReview;
