import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";

import React, { useState, useEffect } from "react";
import { useTakePhoto } from "../../../_hooks/useTakePhoto";
import { sellerActions } from "../../../_actions/sellerActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { chevronBackOutline } from "ionicons/icons";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Receipt, Sellers, Seller } from "../../../_helpers/types";

import moment from "moment";
// import AddReceiptSeller from "./AddReceiptSeller";
import EditReceiptDetails from "./EditReceiptDetails";

type Props = {
  dispatch: any;
  location: any;
  receipt: Receipt;
  receipts: Receipt[];
  sellerOptions: Sellers;
};

const EditReceipt: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const { photo, takePhoto } = useTakePhoto();

  const [step, setStep] = useState("EDIT_RECEIPT_DETAILS");
  const [date, setDate] = useState(moment(props.receipt.date).format());
  const [price, setPrice] = useState(props.receipt.price);
  const [seller, setSeller] = useState(undefined);
  const [noPhoto, setNoPhoto] = useState(props.receipt.hasPhoto);

  useEffect(() => {
    dispatch(receiptActions.getReceiptByID(id));
  }, []);

  const updateReceipt = () => {
    if (seller !== undefined && price !== null) {
      //   dispatch(
      //     receiptActions.updateReceipt(
      //       moment(date).toDate(),
      //       photo,
      //       price,
      //       seller,
      //       history
      //     )
      //   );
    }
  };

  enum STEP {
    EDIT_RECEIPT_DETAILS = "EDIT_RECEIPT_DETAILS",
    ADD_RECEIPT_SELLER = "UPDATE_RECEIPT_SELLER",
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start" className="ion-padding-top">
            <IonButton
              fill="clear"
              routerLink={`/view/${props.receipt.id}`}
              routerDirection="back"
            >
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>
          <IonTitle size="large" className="ion-text-center">
            {step === STEP.EDIT_RECEIPT_DETAILS
              ? "Edit Details"
              : "Update Seller"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {step === STEP.EDIT_RECEIPT_DETAILS && (
        <EditReceiptDetails
          date={date}
          photo={photo}
          receipt={props.receipt}
          setStep={setStep}
          setDate={setDate}
          setPrice={setPrice}
        />
      )}

      {/* {step === STEP.ADD_RECEIPT_SELLER && (
        <AddReceiptSeller
          setStep={setStep}
          addReceipt={addReceipt}
          setParentSeller={setSeller}
          sellerOptions={props.sellerOptions}
        />
      )} */}
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipt: Receipt };
  sellersReducer: { sellerOptions: Sellers };
}) => {
  return {
    receipt: state.receiptsReducer.receipt,
    sellerOptions: state.sellersReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(EditReceipt);
