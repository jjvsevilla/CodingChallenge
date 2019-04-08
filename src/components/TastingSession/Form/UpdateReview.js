import React, { Component } from "react";
import { Mutation } from "react-apollo";

import UPDATE_REVIEW from "../../../graphql/mutations/UPDATE_REVIEW";

class UpdateReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: props.review.score,
      tastingNotes: [...props.review.tastingNotes]
    };
  }

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "tastingNotes") {
      this.setState({
        tastingNotes: [...e.target.selectedOptions].map(o => o.value),
      });
    } else {
      if (name === "score") value = Number(value);
      this.setState({ [name]: value });
    }
  };

  render() {
    const { score, tastingNotes } = this.state;
    const { wineTaster, wine, tastingSession, review } = this.props;

    return (
      <div>
        <div>
          <h5>{this.props.wine}</h5>
          <input
            name="score"
            value={score}
            onChange={this.inputHandler}
            type="number"
            placeholder="Score: 0 - 100"
          />
          <select
            name="tastingNotes"
            value={tastingNotes}
            onChange={this.inputHandler}
            type="text"
            placeholder="Tasting Notes"
            multiple={true}
          >
            <option value="ACIDIC">ACIDIC</option>
            <option value="BARNYARD">BARNYARD</option>
            <option value="BRIGHT">BRIGHT</option>
            <option value="BUTTERY">BUTTERY</option>
            <option value="COMPLEX">COMPLEX</option>
            <option value="CRISP">CRISP</option>
            <option value="EARTHY">EARTHY</option>
            <option value="OAKED">OAKED</option>
            <option value="JUICY">JUICY</option>
          </select>
        </div>
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
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default UpdateReview;
