import {
  IonFab,
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonLoading,
  IonFabButton,
  IonButtons,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import sadMoney from "../../_assets/sadMoney.jpeg";
import ListReceipts from "./ListReceipts";

import {
  add,
  filterOutline,
  settingsOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";
import { connect, useDispatch } from "react-redux";
import { receiptActions } from "../../_actions/receiptActions";
import { Receipt } from "../../_helpers/types";

interface Props {
  receipts: Receipt[];
  loading: boolean;
  request: string;
}

const Receipts: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiptActions.getAllReceipts());
  }, []);

  const refreshReceipts = (e: any) => {
    dispatch(receiptActions.refreshReceipts(e));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start" className="ion-padding-top">
            <IonButton
              fill="clear"
              routerLink="/settings"
              routerDirection="back"
            >
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

        <IonLoading isOpen={props.loading} message={"Please wait..."} />

        {!props.loading && props.request === "failed" && (
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
  receiptsReducer: { receipts: Receipt[]; loading: boolean; request: string };
}) => {
  return {
    loading: state.receiptsReducer.loading,
    request: state.receiptsReducer.request,
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(Receipts);
