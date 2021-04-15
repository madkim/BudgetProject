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

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { chevronBackOutline } from "ionicons/icons";
import { spendingActions } from "../../_actions/spendingActions";
import { Receipt } from "../../_helpers/types";

import ListReceipts from "../Receipts/ListReceipts";
import moment from "moment";

interface Props {
  loading: boolean;
  day: Receipt[];
}

const SpentDetails: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const { date } = useParams<{ date: string }>();

  useEffect(() => {
    dispatch(spendingActions.getSpentByDay(date));
  }, []);

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
            <h2>Date</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ListReceipts receipts={props.day} />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  spendingReducer: {
    loading: boolean;
    day: Receipt[];
  };
}) => {
  return {
    loading: state.spendingReducer.loading,
    day: state.spendingReducer.day,
  };
};

export default connect(mapStateToProps)(SpentDetails);
