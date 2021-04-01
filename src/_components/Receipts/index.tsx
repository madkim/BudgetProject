import React, { Fragment } from "react";

import { connect } from "react-redux";
import { receiptActions } from "../../_actions/receiptActions";
import { Receipt, Sellers } from "../../_helpers/types";

import AddReceipt from "./AddReceipt";
import SelectSellers from "./Sellers/SelectSeller";
import moment from "moment";

type IState = {
  date: string;
  time: string;
  price: number | null;
  seller: { id: string; name: string };
};

type IProps = {
  dispatch: any;
  location: any;
  receipts: Receipt[];
  sellerOptions: Sellers;
};

class Receipts extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      date: moment(new Date()).format(),
      time: moment(new Date()).format(),
      price: null,
      seller: { id: "", name: "" },
    };
  }

  componentDidMount() {
    this.props.dispatch(receiptActions.getAllSellers());
  }

  addReceipt = () => {
    console.log(this.state);
    const mmntDate = moment(this.state.date);
    const mmntTime = moment(this.state.time);

    const dateTime = mmntDate.set({
      hour: mmntTime.get("hour"),
      minute: mmntTime.get("minute"),
      second: 0,
      millisecond: 0,
    });

    // this.props.dispatch(
    //   receiptActions.addNewReceipt(
    //     dateTime.toDate(),
    //     this.state.price,
    //     this.state.seller,
    //     this.props.receipts
    //   )
    // );
  };

  handleSetParentState = (value: object) => {
    this.setState(value);
  };

  path = this.props.location.pathname;

  render() {
    const { date, time, price, seller } = this.state;

    return (
      <Fragment>
        {this.path === "/add" && (
          <AddReceipt
            date={date}
            time={time}
            price={price}
            setParentState={this.handleSetParentState}
          />
        )}
        {this.path === "/sellers" && (
          <SelectSellers
            seller={seller}
            addReceipt={this.addReceipt}
            sellerOptions={this.props.sellerOptions}
            setParentState={this.handleSetParentState}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipt[]; sellerOptions: Sellers };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
    sellerOptions: state.receiptsReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(Receipts);
