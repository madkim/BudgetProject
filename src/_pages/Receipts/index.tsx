import {
  IonImg,
  IonFab,
  IonIcon,
  IonPage,
  IonCard,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonLoading,
  IonButtons,
  IonFabButton,
  IonCardTitle,
  IonRefresher,
  IonCardHeader,
  IonCardContent,
  IonRefresherContent,
} from "@ionic/react";

import {
  add,
  filterOutline,
  settingsOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";

import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import sadMoney from "../../_assets/sadMoney.jpeg";
import ListReceipts from "./ListReceipts";

import { connect, useDispatch } from "react-redux";
import { menuController } from "@ionic/core";
import { receiptActions } from "../../_actions/receiptActions";
import { useHaptics } from "../../_hooks/useHaptics";
import { Receipt } from "../../_helpers/types";

interface Props {
  receipts: Receipt[];
  loading: boolean;
  request: string;
  upload: string;
}

const Receipts: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const { impactMedium } = useHaptics();

  useEffect(() => {
    if (receiptsNotRetrieved()) {
      dispatch(receiptActions.getAllReceipts());
    }
  }, []);

  const receiptsNotRetrieved = () => {
    return Object.keys(props.receipts).length === 0;
  };

  const refreshReceipts = (e: any) => {
    impactMedium();
    dispatch(receiptActions.refreshReceipts(e));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start" className="ion-padding">
            <IonButton fill="clear" onClick={() => menuController.open()}>
              <IonIcon icon={settingsOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle size="large" className="ion-text-center">
            💰 M👀LA&nbsp;
          </IonTitle>

          <IonButton slot="end" fill="clear">
            <IonIcon icon={filterOutline} style={{ color: "white" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refreshReceipts}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="success" routerLink="/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonLoading
          isOpen={props.loading && receiptsNotRetrieved()}
          message={"Please wait..."}
        />

        {props.request === "failed" && receiptsNotRetrieved() && (
          <FadeIn>
            <IonCard className="ion-margin-top">
              <IonCardHeader>
                <IonCardTitle>Uh Oh ...</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <h3>
                  Looks like we couldn't get your receipts. Please try again
                </h3>
                <IonImg src={sadMoney}></IonImg>
              </IonCardContent>
            </IonCard>
          </FadeIn>
        )}

        <ListReceipts receipts={props.receipts} />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: {
    receipts: Receipt[];
    loading: boolean;
    request: string;
  };
}) => {
  return {
    loading: state.receiptsReducer.loading,
    request: state.receiptsReducer.request,
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(Receipts);
