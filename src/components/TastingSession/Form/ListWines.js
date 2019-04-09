import React from "react";
import { graphql, compose, Query } from "react-apollo";

import { Select } from 'antd';

import ADD_WINE from "../../../graphql/mutations/ADD_WINE";
import WINES from "../../../graphql/queries/WINES";

const Option = Select.Option;

const ListWines = props => {
  return (
    <Query query={WINES}>
      {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { wines } = data;

        return (
          <Select
            onChange={e => {
              console.log('onChange', e)
              const selectedWine = wines.find(wine => wine.id === e)
              console.log('onChange selectedWine', selectedWine)

              props.addWine({
                variables: { ...selectedWine },
              });
              // e.target.value = "default";
              // props.childCB
              //   ? props.childCB(wines[e.target.options.selectedIndex - 1].id)
              //   : props.addWine({
              //       variables: { ...wines[e.target.options.selectedIndex - 1] },
              //     });
              // if (!props.childCB) e.target.value = "default";
            }}
            defaultValue="default"
          >
            <Option value="default" disabled hidden>
              {props.placeholder}
            </Option>
            {wines.map((wine, i) => {
              return (
                <Option key={`wine${i}`} value={wine.id}>
                  {wine.name}
                </Option>
              );
            })}
          </Select>
        );
      }}
    </Query>
  );
};

export default compose(graphql(ADD_WINE, { name: "addWine" }))(ListWines);
