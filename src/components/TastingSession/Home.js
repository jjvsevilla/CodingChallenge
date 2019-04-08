import React, { Component } from "react";
import { Mutation, ApolloConsumer } from "react-apollo";

import CreateTastingSession from "./Form/CreateTastingSession";
import ListTastingSessions from "./Form/ListTastingSessions";

import CREATE_TASTING_SESSION from "../../graphql/mutations/CREATE_TASTING_SESSION";
import TASTING_SESSION from "../../graphql/queries/TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../graphql/queries/LOCAL_TASTING_SESSION";

class Home extends Component {
  state = {
    isOpen: false,
    isNewFlow: true
  };

  toggle = (isNewFlow = true) => {
    this.setState({ isOpen: !this.state.isOpen, isNewFlow });
  };

  setTastingSession = (tastingSessionId) => {
    this.setState(prevState => ({ isUpdating: !prevState.isUpdating }))
  }

  render() {
    const { isOpen, isNewFlow } = this.state;
    return (
      <React.Fragment>
        <Mutation
          variables={{}}
          onCompleted={() => {
            this.setState({
              isOpen: true,
            });
          }}
          mutation={CREATE_TASTING_SESSION}
          update={(cache, { data }) => {
            const localData = cache.readQuery({ query: LOCAL_TASTING_SESSION });
            cache.writeQuery({
              query: LOCAL_TASTING_SESSION,
              data: { ...localData, sessionID: data.createTastingSession.id },
            });
          }}
        >
          {postMutation => isNewFlow ? (<button onClick={isOpen ? null : postMutation}>Create New Tasting Session</button>) : null}
        </Mutation>

        {isOpen && <CreateTastingSession toggle={this.toggle} isNewFlow={isNewFlow} />}

        {!isOpen && <ListTastingSessions toggle={this.toggle} />}
      </React.Fragment>
    );
  }
}

export default Home;
