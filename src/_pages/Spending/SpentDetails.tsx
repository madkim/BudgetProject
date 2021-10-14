import {
  IonIcon,
  IonPage,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";

import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { chevronBackOutline } from "ionicons/icons";
import { spendingActions } from "../../_actions/spendingActions";
import { Receipt, Days } from "../../_helpers/types";
import { useParams } from "react-router-dom";

import moment from "moment";
import ListReceipts from "../Receipts/ListReceipts";
import LoadingReceipts from "../Receipts/LoadingReceipts";

interface Props {
  day: Receipt[];
  loading: boolean;
}

const SpentDetails: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const topRef = useRef<HTMLIonContentElement>(null);
  
  const [totalSpent, setTotalSpent] = useState({});
  const [currentBudget, setCurrentBudget] = useState({});

  const { date, days } = useParams<{ date: string; days: string }>();

  useEffect(() => {
    dispatch(spendingActions.getSpentByDay(date));
  }, []);

  useEffect(() => {
    let total = 0;
    props.day.map(day => {
      total += day.price!;
    })
    setTotalSpent({[moment(date).format("YYYY-MM")]: total})
    setCurrentBudget({[moment(date).format("YYYY-MM")]: 0})
  }, [props.day])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          color="success"
          className="ion-padding-vertical"
          style={{ paddingBottom: ".1em" }}
        >
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              routerLink="/spending"
              routerDirection="back"
            >
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center">
            <h2>{moment(date).format("MMMM Do")}</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {props.loading && Object.keys(totalSpent).length === 0 ? (
          <LoadingReceipts count={parseInt(days)} />
        ) : (
          <ListReceipts
            day={date}
            xref={topRef}
            loadMore={null}
            showByDay={true}
            allLoaded={true}
            totalSpent={totalSpent}
            receipts={props.day}
            currentBudget={currentBudget}
          />
        )}

        <IonButton
          slot="fixed"
          fill="solid"
          color="success"
          expand="block"
          routerLink="/spending"
          routerDirection="back"
          style={{ top: "69vh", left: "5vw", width: "90%" }}
        >
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  spendingReducer: {
    day: Receipt[];
    loading: boolean;
  };
}) => {
  return {
    day: state.spendingReducer.day,
    loading: state.spendingReducer.loading,
  };
};

export default connect(mapStateToProps)(SpentDetails);
