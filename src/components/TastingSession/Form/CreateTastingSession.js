import React from "react";
import { graphql, compose, Query, Mutation } from "react-apollo";
import { Button, Spin, Alert } from 'antd';
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
import "./CreateTastingSession.css"

const CreateTastingSession = props => {
  return (
    <Query query={LOCAL_STATE}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div>
              <Spin tip="Loading...">
                <Alert
                  message="Fetching Local State"
                  description="Fetching Local State from the client."
                  type="info"
                />
              </Spin>
            </div>
          );
        }
        if (error) {
          return (
            <div>
              <Alert
                message="Something went wrong"
                description={`Error! ${error.message}`}
                type="error"
              />
            </div>
          )
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

            {!!sessionWines.length && <h4 className="separator-top-l">Selected Wines</h4>}
            <div className="wines-container">
              {sessionWines && sessionWines.map((wine, i) => (<div key={`sessionWine${i}`} className="wine">{wine.name}</div>))}
            </div>
            <h5>Choose Wine(s)</h5>
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
            <CreateWine />

            {!!sessionWineTasters.length && <h4 className="separator-top-l">Selected Wine Tasters</h4>}
            <ol>
              {sessionWineTasters && sessionWineTasters.map((taster, i) => (
                <li key={`sessionTasters${i}`}>
                    <h4>Wine Taster: {taster.name}</h4>
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
                              review={review}
                            />
                          )
                        }

                        return (
                          <CreateReview
                            key={`${taster.name}wine${i}`}
                            wineTaster={taster.id}
                            wine={wine.id}
                            tastingSession={sessionID}
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
            >
              {postMutation => (
                <Button
                  className="separator-top-l"
                  type="primary"
                  onClick={postMutation}
                >
                  Submit Form
                </Button>
              )}
            </Mutation>
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
