import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Button } from 'antd';
import CreateTastingSession from "./Form/CreateTastingSession";
import ListTastingSessions from "./Form/ListTastingSessions";
import CREATE_TASTING_SESSION from "../../graphql/mutations/CREATE_TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../graphql/queries/LOCAL_TASTING_SESSION";
import TASTING_SESSIONS from "../../graphql/queries/TASTING_SESSIONS";
import './Home.css';

class Home extends Component {
  state = {
    isOpen: false,
    isNewFlow: false
  };

  toggle = (isNewFlow = true) => this.setState({ isOpen: !this.state.isOpen, isNewFlow });

  render() {
    const { isOpen, isNewFlow, isFetching } = this.state;
    return (
      <React.Fragment>
        <Mutation
          variables={{}}
          mutation={CREATE_TASTING_SESSION}
          update={(cache, { data }) => {
            const localData = cache.readQuery({ query: LOCAL_TASTING_SESSION });
            cache.writeQuery({
              query: LOCAL_TASTING_SESSION,
              data: { ...localData, sessionID: data.createTastingSession.id },
            });
          }}
          onCompleted={() => (this.setState({ isOpen: true, isNewFlow: true }))}
          refetchQueries={[{query: TASTING_SESSIONS}]}
        >
          {(postMutation, { loading }) => (!isOpen && !isFetching) ? (
            <Button loading={loading} size="large" className="new-tasting-session" onClick={postMutation}>Create New Tasting Session</Button>
          ) : null}
        </Mutation>

        {isOpen && <CreateTastingSession toggle={this.toggle} isNewFlow={isNewFlow} />}
        {!isOpen && <ListTastingSessions toggle={this.toggle} />}
      </React.Fragment>
    );
  }
}

export default Home;
