import React from "react";
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import TASTING_SESSIONS from "../../../graphql/queries/TASTING_SESSIONS";
import DELETE_TASTING_SESSION from "../../../graphql/mutations/DELETE_TASTING_SESSION";
import TastingSession from './TastingSession';
import TASTING_SESSION from "../../../graphql/queries/TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../../graphql/queries/LOCAL_TASTING_SESSION";
import ErrorMessage from "../../ErrorMessage"
import LoadingMessage from '../../LoadingMessage';

const ListTastingSessions = props => {
  return (
    <Query query={TASTING_SESSIONS}>
      {({ loading, error, data }) => {
        if (loading) {
          return (<LoadingMessage title="Fetching Tasting Sessions" message="Fetching Tasting Session from the server." />);
        }
        if (error) {
          return (
            <ErrorMessage error={error.message} />
          )
        }

        const { tastingSessions } = data;
        return (
          <React.Fragment>
            <h5>Existing Tasting Sessions: {tastingSessions.length}</h5>
            <ul>
              {tastingSessions.map((tastingSession, i) => (
                <Mutation
                  key={`tastingSessionMutation${i}`}
                  mutation={DELETE_TASTING_SESSION}
                  variables={{ sessionID: tastingSession.id }}
                  refetchQueries={[{query: TASTING_SESSIONS}]}
                  awaitRefetchQueries={true}
                >
                {(postMutation, { loading, error }) => (
                  <ApolloConsumer>
                    {client => (
                      <TastingSession
                        key={`tastingSession${i}`}
                        {...tastingSession}
                        deleting={loading}
                        deleteError={error}
                        selectTastingSession={async (id) => {
                          const { data } = await client.query({
                            query: TASTING_SESSION,
                            variables: { id }
                          });
                          const dataCache = client.cache.readQuery({ query: LOCAL_TASTING_SESSION });

                          dataCache.sessionID = data.tastingSession.id;
                          dataCache.sessionWines = data.tastingSession.wines;
                          dataCache.sessionWineTasters = data.tastingSession.wineTasters;
                          dataCache.sessionReviews = data.tastingSession.reviews;

                          client.cache.writeQuery({
                            query: LOCAL_TASTING_SESSION,
                            data: {
                              sessionID: dataCache.sessionID,
                              sessionWines: [...dataCache.sessionWines],
                              sessionWineTasters: [...dataCache.sessionWineTasters],
                              sessionReviews: [...dataCache.sessionReviews]
                            }
                          });
                          props.toggle(false);
                        }}
                        deleteTastingSession={postMutation}
                      />
                    )}
                  </ApolloConsumer>
                )}
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
