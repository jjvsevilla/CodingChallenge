import React from "react";
import { graphql, compose, Query } from "react-apollo";
import { Select, Spin, Alert } from 'antd';
import WINE_TASTERS from "../../../graphql/queries/WINE_TASTERS";
import ADD_WINE_TASTER from "../../../graphql/mutations/ADD_WINE_TASTER";
import "./ListWineTasters.css"

const Option = Select.Option;

const ListWineTasters = props => {
  return (
    <Query query={WINE_TASTERS}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div>
              <Spin tip="Loading...">
                <Alert
                  message="Fetching Wine Tasters"
                  description="Fetching Wine Tasters from the server."
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

        const { wineTasters } = data;
        return (
          <Select
            className="list-wines-tasters"
            onChange={e => {
              const selectedWineTaster = wineTasters.find(wineTaster => wineTaster.id === e);
              props.addWineTaster({variables: {...selectedWineTaster}});
            }}
            defaultValue="default"
          >
            <Option value="default" disabled hidden>
              {props.placeholder}
            </Option>
            {wineTasters.map((taster, i) => (<Option key={`taster${i}`} value={taster.id}>{taster.name}</Option>))}
          </Select>
        );
      }}
    </Query>
  );
};

export default compose(graphql(ADD_WINE_TASTER, { name: "addWineTaster" }))(
  ListWineTasters
);
