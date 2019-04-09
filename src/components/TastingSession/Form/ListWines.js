import React from "react";
import { graphql, compose, Query } from "react-apollo";
import { Select } from 'antd';
import ADD_WINE from "../../../graphql/mutations/ADD_WINE";
import WINES from "../../../graphql/queries/WINES";
import ErrorMessage from "../../ErrorMessage"
import LoadingMessage from '../../LoadingMessage';
import "./ListWines.css"

const Option = Select.Option;

const ListWines = props => {
  return (
    <Query query={WINES}>
      {({ loading, error, data }) => {
        if (loading) {
          return (<LoadingMessage title="Fetching Wines" message="Fetching Wines from the server." />);
        }
        if (error) {
          return (
            <ErrorMessage error={error.message} />
          )
        }

        const { wines } = data;
        return (
          <Select
            className="list-wines"
            onChange={(e) => {
              const selectedWine = wines.find(wine => wine.id === e);
              props.childCB
                ? props.childCB(e)
                : props.addWine({ variables: { ...selectedWine } });
            }}
            defaultValue="default"
          >
            <Option value="default" disabled hidden>{props.placeholder}</Option>
            {wines.map((wine, i) => (<Option key={`wine${i}`} value={wine.id}>{wine.name}</Option>))}
          </Select>
        );
      }}
    </Query>
  );
};

export default compose(graphql(ADD_WINE, { name: "addWine" }))(ListWines);
