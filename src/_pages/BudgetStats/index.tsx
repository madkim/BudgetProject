import {
  IonRow,
  IonCol,
  IonPage,
  IonCard,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonLoading,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonItem,
  IonGrid,
} from "@ionic/react";

import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import moment from "moment";

import { connect } from "react-redux";
import { Receipt } from "../../_helpers/types";
import { useDispatch } from "react-redux";
import { budgetActions } from "../../_actions/budgetActions";

import SpentPerDay from "./SpentPerDay";

interface Props {
  loading: boolean;
  totalSpent: number;
}

const BudgetStats: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(budgetActions.getTotalSpent());
  }, [props.totalSpent]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding">
          <IonTitle className="ion-text-center">
            <h2>Budget Stats&nbsp;</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={props.loading} message={"Please wait..."} />

        <FadeIn>
          <IonCard>
            <IonGrid className="ion-padding-start">
              <IonRow>
                <IonCol className="ion-padding-vertical">
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().format("MMMM Do YYYY")}
                  </IonCardTitle>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding-bottom">
                <IonCol>
                  <IonCardSubtitle>Allowance</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${(428.5 - props.totalSpent).toFixed(1)}
                  </IonCardTitle>
                </IonCol>
                <IonCol>
                  <IonCardSubtitle>Saved</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${(1200 - 155.79).toFixed(1)}
                  </IonCardTitle>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding-bottom">
                <IonCol>
                  <IonCardSubtitle>Days Left</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().endOf("month").diff(moment(), "days")}
                  </IonCardTitle>
                </IonCol>
                <IonCol>
                  <IonCardSubtitle>Spent</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${props.totalSpent}
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
  budgetReducer: {
    loading: boolean;
    totalSpent: number;
  };
}) => {
  return {
    loading: state.budgetReducer.loading,
    totalSpent: state.budgetReducer.totalSpent,
  };
};

export default connect(mapStateToProps)(BudgetStats);
