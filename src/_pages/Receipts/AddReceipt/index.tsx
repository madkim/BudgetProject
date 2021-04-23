import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTakePhoto } from "../../../_hooks/useTakePhoto";
import { sellerActions } from "../../../_actions/sellerActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { connect, useDispatch } from "react-redux";
import { Receipt, Sellers, Seller, Photo } from "../../../_helpers/types";
import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

import moment from "moment";
import SelectSellers from "../../Sellers/SelectSeller";
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
  const { takePhoto } = useTakePhoto();

  const [step, setStep] = useState("ADD_RECEIPT_DETAILS");
  const [date, setDate] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);
  const [seller, setSeller] = useState<Seller | undefined>(undefined);
  const [noPhoto, setNoPhoto] = useState(false);
  const [receiptPhoto, setReceiptPhoto] = useState<Photo | undefined>(
    undefined
  );

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
    setReceiptPhoto(undefined);
  };

  const takeReceiptPhoto = () => {
    takePhoto()
      .then((photo) => {
        setReceiptPhoto(photo);
        setNoPhoto(false);
      })
      .catch((error) => {
        console.log(error);
        setReceiptPhoto(undefined);
        setNoPhoto(true);
      });
  };

  const addReceipt = () => {
    if (seller !== undefined && price !== null) {
      dispatch(
        receiptActions.addNewReceipt(
          moment(date).toDate(),
          receiptPhoto,
          price,
          seller,
          props.receipts
        )
      );
      history.push("/receipts");
    }
  };

  const handleStepBack = () => {
    setStep("ADD_RECEIPT_DETAILS");
  };

  enum STEP {
    ADD_RECEIPT_DETAILS = "ADD_RECEIPT_DETAILS",
    ADD_RECEIPT_SELLER = "ADD_RECEIPT_SELLER",
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding">
          <IonTitle className="ion-text-center">
            <h2>
              {step === STEP.ADD_RECEIPT_DETAILS ? "Add Receipt" : "Add Seller"}
            </h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {step === STEP.ADD_RECEIPT_DETAILS && (
        <AddReceiptDetails
          date={date}
          price={price}
          photo={receiptPhoto}
          noPhoto={noPhoto}
          setStep={setStep}
          setDate={setDate}
          setPrice={setPrice}
          takePhoto={takeReceiptPhoto}
        />
      )}

      {step === STEP.ADD_RECEIPT_SELLER && (
        <SelectSellers
          default={undefined}
          stepBack={handleStepBack}
          handleNext={addReceipt}
          handleNextText="Save"
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
