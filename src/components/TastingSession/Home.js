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

  deleteTastingSession = (tastingSessionId) => {}

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

        {!isOpen &&
        <ApolloConsumer>
          {client => (
            <ListTastingSessions
              toggle={this.toggle}
              selectTastingSession={async (tastingSessionId, toggleCallback, isNewFlow) => {
                const { data } = await client.query({
                  query: TASTING_SESSION,
                  variables: { id: tastingSessionId }
                });

                const query = LOCAL_TASTING_SESSION;
                const dataCache = await client.cache.readQuery({ query });

                dataCache.sessionID = data.tastingSession.id;
                dataCache.sessionWines = data.tastingSession.wines;
                dataCache.sessionWineTasters = data.tastingSession.wineTasters;
                dataCache.sessionReviews = data.tastingSession.reviews;

                client.cache.writeQuery({
                  query,
                  data: {
                    sessionID: dataCache.sessionID,
                    sessionWines: [...dataCache.sessionWines],
                    sessionWineTasters: [...dataCache.sessionWineTasters],
                    sessionReviews: [...dataCache.sessionReviews]
                  }
                });
                toggleCallback(isNewFlow);
                return null;
              }}
              deleteTastingSession={this.deleteTastingSession}
            />
          )}
        </ApolloConsumer>}
      </React.Fragment>
    );
  }
}

export default Home;
