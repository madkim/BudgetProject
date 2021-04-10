import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
} from "@ionic/react";

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { NavContext } from "@ionic/react";
import { useTakePhoto } from "../../../_hooks/useTakePhoto";
import { sellerActions } from "../../../_actions/sellerActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { chevronBackOutline } from "ionicons/icons";
import { connect, useDispatch } from "react-redux";
import { Receipt, Sellers, Seller, DynObject } from "../../../_helpers/types";

import moment from "moment";
import SelectSeller from "../../Sellers/SelectSeller";
import EditReceiptDetails from "./EditReceiptDetails";

type Props = {
  upload: string;
  receipt: Receipt;
  loading: boolean;
  location: any;
  dispatch: any;
  receipts: Receipt[];
  sellerOptions: Sellers;
};

const EditReceipt: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(props.receipt.date);
  const [price, setPrice] = useState(props.receipt.price);
  const [seller, setSeller] = useState(props.receipt.seller);
  const [showModal, setShowModal] = useState(false);

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
      let fields: DynObject = {};

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

      if (Object.keys(fields).length === 0 && photo === undefined) {
        alert("No fields changed, nothing to update.");
      } else {
        dispatch(receiptActions.updateReceipt(id, photo, fields, goBack));
      }
    }
  };

  const handleSetSeller = (seller: Seller | undefined) => {
    if (seller !== undefined) {
      setSeller(seller);
    }
  };

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
            Edit Receipt
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <EditReceiptDetails
        id={id}
        date={date}
        price={price}
        photo={photo}
        seller={seller}
        upload={props.upload}
        loading={props.loading}
        hasPhoto={props.receipt.hasPhoto}
        receiptPhoto={props.receipt.photo}
        setDate={setDate}
        setPrice={setPrice}
        retakePhoto={retakePhoto}
        showSellers={setShowModal}
        updateReceipt={updateReceipt}
      />

      <IonModal isOpen={showModal} cssClass="my-custom-class">
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle size="large" className="ion-text-center">
              Edit Seller
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {showModal && (
          <SelectSeller
            default={seller}
            stepBack={null}
            handleNext={() => setShowModal(false)}
            handleNextText="Select"
            setParentSeller={handleSetSeller}
            sellerOptions={props.sellerOptions}
          />
        )}
      </IonModal>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipt: Receipt; upload: string; loading: boolean };
  sellersReducer: { sellerOptions: Sellers };
}) => {
  return {
    upload: state.receiptsReducer.upload,
    receipt: state.receiptsReducer.receipt,
    loading: state.receiptsReducer.loading,
    sellerOptions: state.sellersReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(EditReceipt);
