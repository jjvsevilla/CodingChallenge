import React from "react";
import { graphql, compose, Query, Mutation } from "react-apollo";
import { Button } from 'antd';
import ListWines from "./ListWines";
import ListWineTasters from "./ListWineTasters";
import CreateWineTaster from "./CreateWineTaster";
import CreateWine from "./CreateWine";
import CreateReview from "./CreateReview";
import UpdateReview from "./UpdateReview";
import UPDATE_TASTING_SESSION from "../../../graphql/mutations/UPDATE_TASTING_SESSION";
import LOCAL_STATE from "../../../graphql/queries/LOCAL_TASTING_SESSION";
import initialState from "../../../graphql/initialState";
import TASTING_SESSIONS from "../../../graphql/queries/TASTING_SESSIONS";
import ErrorMessage from "../../ErrorMessage"
import LoadingMessage from '../../LoadingMessage';
import "./CreateTastingSession.css"

const CreateTastingSession = props => {
  return (
    <Query query={LOCAL_STATE}>
      {({ loading, error, data }) => {
        if (loading) {
          return (<LoadingMessage title="Fetching Local State" message="Fetching Local State from the client." />);
        }
        if (error) {
          return (<ErrorMessage error={error.message} />)
        }

        const {
          sessionID,
          sessionWines,
          sessionWineTasters,
          sessionReviews,
        } = data;

        const sessionWineIDs = sessionWines.map(wine => ({ id: wine.id }));
        const sessionWineTastersIDs = sessionWineTasters.map(taster => ({ id: taster.id }));

        return (
          <div className="create-tasting-session">
            <h3>{props.isNewFlow ? 'Create New' : 'Update'} Tasting Session</h3>
            <p className="help-text">SessionId {sessionID}</p>

            {!!sessionWines.length && <h4 className="separator-top-l">Selected Wines</h4>}
            <div className="wines-container">
              {sessionWines && sessionWines.map((wine, i) => (
                <div key={`sessionWine${i}`} className="wine">
                  <p>{wine.name} ({wine.year})</p>
                  <p>{wine.alcohol}% alcohol</p>
                  <p>${wine.price}</p>
                </div>
              ))}
            </div>
            <h5>Choose Wine(s)</h5>
            <div className="wine-list-container">
              <ListWines
                cb={wine => {
                  if (!wine.includes(wine)) {
                    this.setState({
                      wines: [...this.state.wines, wine],
                    });
                  }
                }}
                placeholder="Existing Wines"
              />
            </div>
            <CreateWine />

            {!!sessionWineTasters.length && <h4 className="separator-top-l">Selected Wine Tasters</h4>}
            <ol>
              {sessionWineTasters && sessionWineTasters.map((taster, i) => (
                <li key={`sessionTasters${i}`}>
                    <h4>Wine Taster: {taster.name} ({taster.nationality})</h4>
                    <div className="reviews-container separator-bottom-m">
                      {sessionWines.map((wine, i) => {
                        const review = sessionReviews.find(review =>
                          review.tastingSession.id === sessionID &&
                          review.wineTaster.id === taster.id &&
                          review.wine.id === wine.id)

                        if (review) {
                          return (
                            <UpdateReview
                              key={`${taster.name}wine${i}`}
                              tastingSession={sessionID}
                              wineTaster={taster.id}
                              wine={wine.id}
                              wineName={wine.name}
                              review={review}
                            />
                          )
                        }

                        return (
                          <CreateReview
                            key={`${taster.name}wine${i}`}
                            tastingSession={sessionID}
                            wineTaster={taster.id}
                            wine={wine.id}
                            wineName={wine.name}
                          />
                        );
                      })}
                    </div>
                </li>
              ))}
            </ol>

            <h5 className="separator-top-l">Choose Wine Taster(s)</h5>
            <ListWineTasters placeholder="Existing Wine Tester" />
            <CreateWineTaster />

            <div className="separator-top-l separator-bottom-l actions">
              <Mutation
                mutation={UPDATE_TASTING_SESSION}
                variables={{ sessionWineIDs, sessionWineTastersIDs, sessionID }}
                update={cache => {
                  cache.writeQuery({
                    query: LOCAL_STATE,
                    data: initialState,
                  });
                }}
                onCompleted={() => props.toggle(false)}
                refetchQueries={[{query: TASTING_SESSIONS}]}
                awaitRefetchQueries={true}
              >
                {(postMutation, { loading }) => (
                  <Button type="primary" size="large" loading={loading} onClick={postMutation}>Submit Form</Button>
                )}
              </Mutation>
              <Button type="danger" size="large" onClick={() => props.toggle(false)}>Cancel</Button>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default compose(
  graphql(UPDATE_TASTING_SESSION, {
    name: "updateTastingSession",
  })
)(CreateTastingSession);
