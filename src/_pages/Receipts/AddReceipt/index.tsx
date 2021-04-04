import React, { useState, useEffect } from "react";

import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

import { useTakePhoto } from "../../../_hooks/useTakePhoto";
import { sellerActions } from "../../../_actions/sellerActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { connect, useDispatch } from "react-redux";
import { Receipt, Sellers, Seller } from "../../../_helpers/types";

import AddReceiptDetails from "./AddReceiptDetails";
import AddReceiptSeller from "./AddReceiptSeller";
import moment from "moment";

type Props = {
  dispatch: any;
  location: any;
  receipts: Receipt[];
  sellerOptions: Sellers;
};

const AddReceipts: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const { photo, takePhoto } = useTakePhoto();

  const [step, setStep] = useState("ADD_RECEIPT_DETAILS");
  const [date, setDate] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);
  const [seller, setSeller] = useState<Seller | undefined>(undefined);
  const [noPhoto, setNoPhoto] = useState(false);

  useEffect(() => {
    dispatch(sellerActions.getAllSellers());

    takePhoto()
      .then(() => {})
      .catch((error) => {
        setNoPhoto(true);
      });
  }, []);

  const addReceipt = () => {
    if (seller !== undefined && price !== null) {
      dispatch(
        receiptActions.addNewReceipt(
          moment(date).toDate(),
          photo,
          price,
          seller,
          props.receipts
        )
      );
    }
  };

  enum STEP {
    ADD_RECEIPT_DETAILS = "ADD_RECEIPT_DETAILS",
    ADD_RECEIPT_SELLER = "ADD_RECEIPT_SELLER",
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            {step === STEP.ADD_RECEIPT_DETAILS
              ? "Add Receipt"
              : "Select Seller"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {step === STEP.ADD_RECEIPT_DETAILS && (
        <AddReceiptDetails
          date={date}
          price={price}
          photo={photo}
          noPhoto={noPhoto}
          setStep={setStep}
          setDate={setDate}
          setPrice={setPrice}
        />
      )}

      {step === STEP.ADD_RECEIPT_SELLER && (
        <AddReceiptSeller
          setStep={setStep}
          addReceipt={addReceipt}
          setParentSeller={setSeller}
          sellerOptions={props.sellerOptions}
        />
      )}
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipt[]; sellerOptions: Sellers };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
    sellerOptions: state.receiptsReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(AddReceipts);
