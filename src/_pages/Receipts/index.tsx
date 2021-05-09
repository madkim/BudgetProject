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
  IonProgressBar,
  IonItem,
  IonLabel,
} from "@ionic/react";

import {
  add,
  menuSharp,
  filterOutline,
  chevronUpOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";

import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import FadeIn from "react-fade-in";
import sadMoney from "../../_assets/sadMoney.jpeg";
import ListReceipts from "./ListReceipts";
import LoadingReceipts from "./LoadingReceipts";

import { Receipt } from "../../_helpers/types";
import { useHaptics } from "../../_hooks/useHaptics";
import { menuController } from "@ionic/core";
import { receiptActions } from "../../_actions/receiptActions";
import { receiptsService } from "../../_services/receiptsService";
import { receiptConstants } from "../../_constants/receiptConstants";
import { connect, useDispatch } from "react-redux";

interface Props {
  upload: string;
  request: string;
  loading: boolean;
  progress: number;
  receipts: Receipt[];
}

const Receipts: React.FC<Props> = (props: Props) => {
  const topRef = useRef<HTMLIonContentElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [receiptMonths, setReceiptMonths] = useState(moment().format());
  const [allReceiptsLoaded, setAllReceiptsLoaded] = useState(false);

  const dispatch = useDispatch();
  const { impactMedium } = useHaptics();

  useEffect(() => {
    if (receiptsNotRetrieved()) {
      dispatch(receiptActions.getAllReceipts(moment().format()));
    }
  }, []);

  const receiptsNotRetrieved = () => {
    return Object.keys(props.receipts).length === 0;
  };

  const loadMoreReceipts = (e: any) => {
    const month = moment(receiptMonths).subtract(1, "months").format();
    setReceiptMonths(month);
    receiptsService.getAll(month).then((receipts) => {
      if (JSON.stringify(receipts) === JSON.stringify(props.receipts)) {
        setAllReceiptsLoaded(true);
      } else {
        dispatch({
          type: receiptConstants.GET_ALL_RECEIPTS,
          payload: receipts,
        });
      }
      e.target.complete();
    });
  };

  const refreshReceipts = (e: any) => {
    impactMedium();
    setAllReceiptsLoaded(false);
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
              <IonIcon
                size="large"
                icon={menuSharp}
                style={{ color: "white" }}
              />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center">
            <h2>💰 M👀LA&nbsp;</h2>
          </IonTitle>

          <IonButton slot="end" fill="clear">
            <IonIcon
              size="large"
              icon={filterOutline}
              style={{ color: "white" }}
            />
          </IonButton>
        </IonToolbar>

        {props.progress > 0 && (
          <IonProgressBar value={props.progress}></IonProgressBar>
        )}
      </IonHeader>

      <IonContent
        scrollEvents={true}
        onIonScroll={(e) => setScrollTop(e.detail.scrollTop)}
      >
        <IonRefresher
          slot="fixed"
          disabled={scrollTop > 0}
          onIonRefresh={refreshReceipts}
        >
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
            loadMore={loadMoreReceipts}
            allLoaded={allReceiptsLoaded}
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
    request: string;
    loading: boolean;
    progress: number;
    receipts: Receipt[];
  };
}) => {
  return {
    request: state.receiptsReducer.request,
    loading: state.receiptsReducer.loading,
    progress: state.receiptsReducer.progress,
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(Receipts);
