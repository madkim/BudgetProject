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
} from "@ionic/react";

import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import moment from "moment";

import { connect } from "react-redux";
import { Receipt } from "../../_helpers/types";
import { useDispatch } from "react-redux";
import { budgetActions } from "../../_actions/budgetActions";

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
          <IonCard className="ion-text-center">
            <IonCardHeader
              className="ion-no-padding"
              style={{ paddingBottom: "1vh" }}
            >
              <IonCardTitle>
                <h1>{moment().format("MMMM Do YYYY")}</h1>
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
          <IonCard>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Allowance</IonCardSubtitle>
                  <IonCardTitle>
                    ${(428.5 - props.totalSpent).toFixed(1)}
                  </IonCardTitle>
                </IonCardHeader>
              </IonCol>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Saved</IonCardSubtitle>
                  <IonCardTitle>${(1200 - 155.79).toFixed(1)}</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Days Left</IonCardSubtitle>
                  <IonCardTitle>
                    {moment().endOf("month").diff(moment(), "days")}
                  </IonCardTitle>
                </IonCardHeader>
              </IonCol>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Spent</IonCardSubtitle>
                  <IonCardTitle>${props.totalSpent}</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonCard>
        </FadeIn>
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
