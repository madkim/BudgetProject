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
  IonPopover,
  IonList,
  IonListHeader,
  IonText,
  IonBadge,
} from "@ionic/react";

import {
  trashOutline,
  createOutline,
  alertCircleOutline,
  ellipsisHorizontalOutline,
} from "ionicons/icons";

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { receiptActions } from "../../../_actions/receiptActions";
import { Receipt } from "../../../_helpers/types";

import { useContext } from "react";
import { NavContext } from "@ionic/react";

import moment from "moment";

interface Props {
  receipt: Receipt;
}

const ViewReceipt: React.FC<Props> = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { goBack } = useContext(NavContext);

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  useEffect(() => {
    if (Object.keys(props.receipt).length === 0) {
      dispatch(receiptActions.getReceiptByID(id, history));
    }
  }, [dispatch]);

  const getBadgeColor = (price: number | null) => {
    if (price !== null) {
      if (price < 30) {
        return "success";
      }
      if (price > 30 && price < 80) {
        return "warning";
      }
      if (price > 80) {
        return "danger";
      }
    }
  };

  const deleteReceipt = (receipt: Receipt) => {
    let answer = window.confirm(
      "Are you sure you want to delete this receipt?"
    );
    if (answer) {
      dispatch(receiptActions.deleteReceipt(receipt, goBack));
    }
    setShowPopover({ showPopover: false, event: undefined });
  };

  const { receipt } = props;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            View Receipt
          </IonTitle>

          <IonPopover
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() =>
              setShowPopover({ showPopover: false, event: undefined })
            }
          >
            <IonList>
              <IonListHeader>Receipt</IonListHeader>
              <IonItem
                button
                detailIcon={createOutline}
                href={`/edit/${receipt.id}`}
              >
                Edit
              </IonItem>
              <IonItem
                button
                detailIcon={trashOutline}
                onClick={() => deleteReceipt(receipt)}
              >
                <IonText color="danger">Delete</IonText>
              </IonItem>
              <IonItem
                lines="none"
                detail={false}
                button
                onClick={() =>
                  setShowPopover({ showPopover: false, event: undefined })
                }
              >
                Close
              </IonItem>
            </IonList>
          </IonPopover>
          <IonButton
            slot="end"
            fill="clear"
            onClick={(e: any) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          >
            <IonIcon
              icon={ellipsisHorizontalOutline}
              style={{ color: "white" }}
            />
          </IonButton>
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
                  {receipt && (
                    <IonBadge color={getBadgeColor(receipt.price)}>
                      {receipt.price}
                    </IonBadge>
                  )}
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
              <IonThumbnail style={{ height: "35vh", width: "100vw" }}>
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
