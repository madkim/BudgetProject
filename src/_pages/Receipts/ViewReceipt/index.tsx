import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonGrid,
  IonIcon,
  IonPage,
  IonLabel,
  IonButton,
  IonContent,
  IonThumbnail,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { alertCircleOutline } from "ionicons/icons";
import { receiptActions } from "../../../_actions/receiptActions";
import { Receipt } from "../../../_helpers/types";

import moment from "moment";

interface Props {
  receipt: Receipt;
}

const ViewReceipt: React.FC<Props> = (props: Props) => {
  // const { id } = useParams<{ id: string }>();
  // const history = useHistory();
  // const dispatch = useDispatch();

  // useEffect(() => {
  // dispatch(receiptActions.getReceiptByID(id, history));
  // }, [dispatch]);

  const { receipt } = props;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            View Receipt
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Date:</IonLabel>
                <IonLabel position="stacked">
                  {receipt && moment(receipt.date).format("L")}
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Total spent:</IonLabel>
                <IonLabel position="stacked">
                  {receipt && receipt.price}
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Seller:</IonLabel>
                <IonLabel position="stacked">
                  {receipt.seller && receipt.seller.name}
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <br />

        <IonRow>
          <IonCol>
            <IonItem lines="none">
              <IonThumbnail style={{ height: "40vh", width: "100vw" }}>
                {receipt.hasPhoto ? (
                  receipt.photo && <IonImg src={receipt.photo} />
                ) : (
                  <>
                    <IonIcon icon={alertCircleOutline} />
                    <small> No Photo</small>
                  </>
                )}
              </IonThumbnail>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              routerLink="/"
              routerDirection="back"
            >
              Back
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: { receiptsReducer: { receipt: Receipt } }) => {
  return {
    receipt: state.receiptsReducer.receipt,
  };
};

export default connect(mapStateToProps)(ViewReceipt);
