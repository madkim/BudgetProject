import {
  IonRow,
  IonCol,
  IonPage,
  IonCard,
  IonGrid,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

import {
  settingsOutline,
  notificationsOutline,
  swapHorizontalOutline,
} from "ionicons/icons";

import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import moment from "moment";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { spendingActions } from "../../_actions/spendingActions";
import { menuController } from "@ionic/core";

import SpentPerDay from "./SpentPerDay";

interface Props {
  loading: boolean;
  totalSpent: number;
}

const Spending: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spendingActions.getTotalSpent());
    dispatch(spendingActions.getDaysSpent());
  }, [props.totalSpent]);

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
            <IonIcon icon={notificationsOutline} style={{ color: "white" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={props.loading} message={"Please wait..."} />

        <FadeIn>
          <IonCard>
            <IonGrid className="ion-padding-start ion-text-center">
              <IonRow>
                <IonCol className="ion-padding-vertical">
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().format("dddd MMMM Do ")}
                  </IonCardTitle>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding-bottom">
                <IonCol size="4">
                  <IonCardSubtitle>Allowance</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${(428.5 - props.totalSpent).toFixed(0)}
                  </IonCardTitle>
                </IonCol>
                <IonCol size="4">
                  <IonButton fill="outline" color="dark" shape="round">
                    <IonIcon icon={swapHorizontalOutline} />
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonCardSubtitle>Saved</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${(1200 - 155.79).toFixed(0)}
                  </IonCardTitle>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding-bottom">
                <IonCol size="4">
                  <IonCardSubtitle>Budget</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    $428
                  </IonCardTitle>
                </IonCol>
                <IonCol size="4">
                  <IonCardSubtitle>Days Left</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().endOf("month").diff(moment(), "days")}
                  </IonCardTitle>
                </IonCol>
                <IonCol size="4">
                  <IonCardSubtitle>Spent</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${props.totalSpent.toFixed(0)}
                  </IonCardTitle>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </FadeIn>
        <SpentPerDay />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  spendingReducer: {
    loading: boolean;
    totalSpent: number;
  };
}) => {
  return {
    loading: state.spendingReducer.loading,
    totalSpent: state.spendingReducer.totalSpent,
  };
};

export default connect(mapStateToProps)(Spending);
