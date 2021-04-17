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
  chevronUpOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";

import React, { useEffect, useRef } from "react";
import FadeIn from "react-fade-in";
import sadMoney from "../../_assets/sadMoney.jpeg";
import ListReceipts from "./ListReceipts";
import LoadingReceipts from "./LoadingReceipts";

import { Receipt } from "../../_helpers/types";
import { useHaptics } from "../../_hooks/useHaptics";
import { menuController } from "@ionic/core";
import { receiptActions } from "../../_actions/receiptActions";
import { connect, useDispatch } from "react-redux";

interface Props {
  receipts: Receipt[];
  loading: boolean;
  request: string;
  upload: string;
}

const Receipts: React.FC<Props> = (props: Props) => {
  const topRef = useRef<HTMLIonContentElement>(null);
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

  const scrollToTop = () => {
    if (topRef.current !== null) {
      topRef.current!.scrollToTop(300);
    }
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

          <IonTitle className="ion-text-center">
            <h2>💰 M👀LA&nbsp;</h2>
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

        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          style={{ marginBottom: "8vh" }}
        >
          <IonFabButton color="success" onClick={() => scrollToTop()}>
            <IonIcon icon={chevronUpOutline} />
          </IonFabButton>
        </IonFab>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="success" routerLink="/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {props.loading && receiptsNotRetrieved() ? (
          <LoadingReceipts count={11} />
        ) : (
          <ListReceipts
            day=""
            xref={topRef}
            showByDay={false}
            receipts={props.receipts}
          />
        )}

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
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: {
    receipts: Receipt[];
    request: string;
    loading: boolean;
  };
}) => {
  return {
    request: state.receiptsReducer.request,
    loading: state.receiptsReducer.loading,
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(Receipts);
