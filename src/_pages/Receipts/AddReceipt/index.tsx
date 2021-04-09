import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTakePhoto } from "../../../_hooks/useTakePhoto";
import { sellerActions } from "../../../_actions/sellerActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { connect, useDispatch } from "react-redux";
import { Receipt, Sellers, Seller } from "../../../_helpers/types";
import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

import moment from "moment";
import AddReceiptSeller from "./AddReceiptSeller";
import AddReceiptDetails from "./AddReceiptDetails";

type Props = {
  dispatch: any;
  location: any;
  receipts: Receipt[];
  sellerOptions: Sellers;
};

const AddReceipts: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const { photo, takePhoto } = useTakePhoto();

  const [step, setStep] = useState("ADD_RECEIPT_DETAILS");
  const [date, setDate] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);
  const [seller, setSeller] = useState<Seller | undefined>(undefined);
  const [noPhoto, setNoPhoto] = useState(false);

  useEffect(() => {
    history.listen(onRouteChange);
    dispatch(sellerActions.getAllSellers());
    takeReceiptPhoto();
  }, []);

  const onRouteChange = (route: any) => {
    initUseStates();
  };

  const initUseStates = () => {
    setStep("ADD_RECEIPT_DETAILS");
    setDate(moment(new Date()).format());
    setPrice(null);
    setSeller(undefined);
    setNoPhoto(false);
  };

  const takeReceiptPhoto = () => {
    takePhoto()
      .then(() => {
        setNoPhoto(false);
      })
      .catch((error) => {
        setNoPhoto(true);
      });
  };

  const addReceipt = () => {
    if (seller !== undefined && price !== null) {
      dispatch(
        receiptActions.addNewReceipt(
          moment(date).toDate(),
          photo,
          price,
          seller,
          props.receipts,
          history
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
            {step === STEP.ADD_RECEIPT_DETAILS ? "Add Details" : "Add Seller"}
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
          takePhoto={takeReceiptPhoto}
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
  receiptsReducer: { receipts: Receipt[] };
  sellersReducer: { sellerOptions: Sellers };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
    sellerOptions: state.sellersReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(AddReceipts);
