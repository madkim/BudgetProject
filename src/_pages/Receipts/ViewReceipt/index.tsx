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
  IonButtons,
} from "@ionic/react";

import {
  trashOutline,
  createOutline,
  chevronBackOutline,
  alertCircleOutline,
  ellipsisHorizontalOutline,
} from "ionicons/icons";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { receiptActions } from "../../../_actions/receiptActions";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { NavContext } from "@ionic/react";
import { Receipt } from "../../../_helpers/types";

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

  const dismissPopover = () => {
    setShowPopover({ showPopover: false, event: undefined });
  };

  const veiwReceiptPhoto = (photoUrl: string) => {
    if (photoUrl) {
      var options = {
        share: true, // default is false
        closeButton: false, // default is true
        copyToReference: true, // default is false
        headers: "", // If this is not provided, an exception will be triggered
        piccasoOptions: {}, // If this is not provided, an exception will be triggered
      };
      PhotoViewer.show(photoUrl, props.receipt.seller.name, options);
    }
  };

  const deleteReceipt = (receipt: Receipt) => {
    let answer = window.confirm(
      "Are you sure you want to delete this receipt?"
    );
    if (answer) {
      dispatch(receiptActions.deleteReceipt(receipt, goBack));
    }
    dismissPopover();
  };

  const { receipt } = props;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonButton fill="clear" onClick={() => goBack()}>
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center">
            <h2>View Receipt</h2>
          </IonTitle>

          <IonPopover
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() => dismissPopover()}
          >
            <IonList>
              <IonListHeader>Receipt</IonListHeader>
              <IonItem
                button
                detailIcon={createOutline}
                routerLink={`/edit/${receipt.id}`}
                onClick={() => dismissPopover()}
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
                <IonLabel position="stacked">
                  <h2>Date:</h2>
                </IonLabel>
                <IonLabel position="stacked">
                  <h1> {receipt && moment(receipt.date).format("L")}</h1>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h2>Total spent:</h2>
                </IonLabel>
                <IonLabel position="stacked">
                  {receipt && (
                    <IonBadge
                      color={getBadgeColor(receipt.price)}
                      className="ion-margin-bottom"
                    >
                      <h2>${receipt.price?.toFixed(2)}</h2>
                    </IonBadge>
                  )}
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">
                  <h2>Seller:</h2>
                </IonLabel>
                <IonLabel
                  position="stacked"
                  className="ion-text-capitalize"
                  style={{ paddingBottom: "1vh" }}
                >
                  <h1>{receipt.seller && receipt.seller.name}</h1>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonRow>
          <IonCol>
            <IonItem lines="none">
              <IonThumbnail
                style={{ height: "34vh", width: "100vw" }}
                onClick={() =>
                  receipt.hasPhoto ? veiwReceiptPhoto(receipt.photo) : ""
                }
              >
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
            <IonButton color="success" expand="block" onClick={() => goBack()}>
              Done
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
