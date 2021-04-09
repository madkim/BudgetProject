import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavContext } from "@ionic/react";
import { useTakePhoto } from "../../../_hooks/useTakePhoto";
import { sellerActions } from "../../../_actions/sellerActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { Receipt, Sellers } from "../../../_helpers/types";
import { chevronBackOutline } from "ionicons/icons";
import { connect, useDispatch } from "react-redux";

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

  const [step, setStep] = useState("EDIT_RECEIPT_DETAILS");
  const [date, setDate] = useState(props.receipt.date);
  const [price, setPrice] = useState(props.receipt.price);
  const [seller, setSeller] = useState(props.receipt.seller);

  const { goBack } = useContext(NavContext);
  const { id } = useParams<{ id: string }>();
  const { photo, takePhoto } = useTakePhoto();

  useEffect(() => {
    dispatch(receiptActions.getReceiptByID(id));
  }, []);

  const retakePhoto = () => {
    takePhoto()
      .then(() => {})
      .catch((error) => {});
  };

  const updateReceipt = () => {
    if (seller !== undefined && price !== null) {
      let fields: { [k: string]: any } = {};

      if (!moment(date).isSame(props.receipt.date)) {
        fields.date = date;
      }
      if (price !== props.receipt.price) {
        fields.price = price;
      }
      if (
        seller.id !== props.receipt.seller.id &&
        seller.name !== props.receipt.seller.name
      ) {
        fields.seller = seller;
      }
      console.log(fields);
      dispatch(receiptActions.updateReceipt(id, photo, fields, goBack));
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
          id={id}
          date={date}
          price={price}
          photo={photo}
          seller={seller}
          hasPhoto={props.receipt.hasPhoto}
          receiptPhoto={props.receipt.photo}
          setStep={setStep}
          setDate={setDate}
          setPrice={setPrice}
          retakePhoto={retakePhoto}
          updateReceipt={updateReceipt}
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
