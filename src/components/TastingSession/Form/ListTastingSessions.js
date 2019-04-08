import React from "react";
import { Query, Mutation } from "react-apollo";

import TASTING_SESSIONS from "../../../graphql/queries/TASTING_SESSIONS";
import DELETE_TASTING_SESSION from "../../../graphql/mutations/DELETE_TASTING_SESSION";
import TastingSession from './TastingSession';

const ListTastingSessions = props => {
  return (
    <Query query={TASTING_SESSIONS}>
      {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { tastingSessions } = data;

        return (
          <React.Fragment>
            <h5>Existing Tasting Sessions</h5>
            <ul>
              {tastingSessions.map((tastingSession, i) => (
                <Mutation
                  mutation={DELETE_TASTING_SESSION}
                  variables={{ sessionID: tastingSession.id }}
                  refetchQueries={[{query: TASTING_SESSIONS}]}
                  key={`tastingSessionMutation${i}`}
                >
                {postMutation => (
                  <TastingSession
                    key={`tastingSession${i}`}
                    {...tastingSession}
                    selectTastingSession={props.selectTastingSession}
                    deleteTastingSession={postMutation}
                    toggle={props.toggle}
                  />)}
                </Mutation>
              ))}
            </ul>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default ListTastingSessions;
