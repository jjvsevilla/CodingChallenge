import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Button } from 'antd';
import UPDATE_REVIEW from "../../../graphql/mutations/UPDATE_REVIEW";
import { Select, InputNumber } from 'antd';
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

  // inputHandler = e => {
  //   let { name, value } = e.target;
  //   if (name === "tastingNotes") {
  //     this.setState({
  //       tastingNotes: [...e.target.selectedOptions].map(o => o.value),
  //     });
  //   } else {
  //     if (name === "score") value = Number(value);
  //     this.setState({ [name]: value });
  //   }
  // };

  inputHandler = e => {
    this.setState({ score: e });
  };

  selectHandler = e => {
    this.setState({ tastingNotes: [...e] });
  }

  render() {
    const { score, tastingNotes } = this.state;
    const { wineTaster, wine, tastingSession, review } = this.props;
    return (
      <div className="review">
        <h5>{this.props.wine}</h5>
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
          onChange={this.inputHandler}
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
          {(postMutation, { loading }) =>
            <Button
              className="button"
              loading={loading}
              onClick={postMutation}>Update Review</Button>}
        </Mutation>
      </div>
    );
  }
}

export default UpdateReview;
