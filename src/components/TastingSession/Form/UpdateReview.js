import React, { Component } from "react";
import { Mutation } from "react-apollo";
import UPDATE_REVIEW from "../../../graphql/mutations/UPDATE_REVIEW";
import { Select, InputNumber, Button, Alert } from 'antd';
import "./UpdateReview.css"

const Option = Select.Option;

class UpdateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.review.score,
      tastingNotes: [...props.review.tastingNotes]
    };
  }

  inputHandler = e => this.setState({ score: e });

  selectHandler = e => this.setState({ tastingNotes: [...e] });

  render() {
    const { score, tastingNotes } = this.state;
    const { wineTaster, wine, wineName, tastingSession, review } = this.props;
    return (
      <div className="review">
        <h5>{wineName}</h5>
        <InputNumber
          className="number"
          min={0}
          max={100}
          onChange={this.inputHandler}
          placeholder="Score: 0 - 100"
          value={score}
        />
        <Select
          className="select"
          onChange={this.selectHandler}
          placeholder="Tasting Notes"
          mode="multiple"
          value={tastingNotes}
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
          mutation={UPDATE_REVIEW}
          variables={{
            reviewID: review.id,
            wine,
            wineTaster,
            tastingSession,
            score,
            tastingNotes,
          }}
        >
          {(postMutation, { loading, error }) => (
            <div className="actions">
              <Button loading={loading}  onClick={postMutation}>Update Review</Button>
              {error && <Alert message={error.message} type="error" />}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UpdateReview;
