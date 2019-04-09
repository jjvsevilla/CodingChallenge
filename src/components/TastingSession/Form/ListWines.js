import React from "react";
import { graphql, compose, Query } from "react-apollo";
import { Select, Spin, Alert } from 'antd';
import ADD_WINE from "../../../graphql/mutations/ADD_WINE";
import WINES from "../../../graphql/queries/WINES";
import "./ListWines.css"

const Option = Select.Option;

const ListWines = props => {
  return (
    <Query query={WINES}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div>
              <Spin tip="Loading...">
                <Alert
                  message="Fetching Wines"
                  description="Fetching Wines from the server."
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
