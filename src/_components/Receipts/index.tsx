import React, { Fragment } from "react";

import { connect } from "react-redux";
import { Receipt as ReceiptType } from "../../_helpers/types";
import { receiptActions } from "../../_actions/receiptActions";

import AddReceipt from "./AddReceipt";
import SelectSellers from "./Sellers/SelectSeller";
import moment from "moment";

type State = {
  date: "";
  time: "";
  price: 0;
  seller: { id: ""; name: "" };
};

type Props = {
  dispatch: any;
  location: any;
  receipts: ReceiptType[];
};

class Receipt extends React.Component<Props, State> {
  path = this.props.location.pathname;

  addReceipt = () => {
    const mmntDate = moment(this.state.date);
    const mmntTime = moment(this.state.time);

    const dateTime = mmntDate.set({
      hour: mmntTime.get("hour"),
      minute: mmntTime.get("minute"),
      second: 0,
      millisecond: 0,
    });

    this.props.dispatch(
      receiptActions.addNewReceipt(
        dateTime.toDate(),
        this.state.price,
        this.state.seller,
        this.props.receipts
      )
    );
  };

  render() {
    return (
      <Fragment>
        {this.path === "/add" && <AddReceipt />}
        {this.path === "/sellers" && (
          <SelectSellers addReceipt={this.addReceipt} />
        )}
      </Fragment>
    );
  }
}

export default connect()(Receipt);
