import React, { Fragment } from "react";

import { connect } from "react-redux";
import { receiptActions } from "../../_actions/receiptActions";
import { Receipt, Sellers } from "../../_helpers/types";

import AddReceipt from "./AddReceipt";
import SelectSeller from "./Sellers/SelectSeller";
import moment from "moment";

type State = {
  step: string;
  date: string;
  time: string;
  price: number | null;
  seller: { id: string; name: string };
};

type Props = {
  dispatch: any;
  location: any;
  receipts: Receipt[];
  sellerOptions: Sellers;
};

class Receipts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      step: "ADD_RECEIPT",
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

    this.props.dispatch(
      receiptActions.addNewReceipt(
        dateTime.toDate(),
        this.state.price,
        this.state.seller,
        this.props.receipts
      )
    );
  };

  handleSetParentState = (value: object) => {
    this.setState(value);
  };

  render() {
    const { step, date, time, price, seller } = this.state;

    enum STEP {
      ADD_RECEIPT = "ADD_RECEIPT",
      SELECT_SELLER = "SELECT_SELLER",
    }

    return (
      <Fragment>
        {step === STEP.ADD_RECEIPT && (
          <AddReceipt
            date={date}
            time={time}
            price={price}
            setParentState={this.handleSetParentState}
          />
        )}

        {step === STEP.SELECT_SELLER && (
          <SelectSeller
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
