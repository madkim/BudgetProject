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
  }, []);

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
            <IonRow className="ion-text-center">
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Allowance</IonCardSubtitle>
                  <IonCardTitle>$95.50</IonCardTitle>
                </IonCardHeader>
              </IonCol>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Saved</IonCardSubtitle>
                  <IonCardTitle>$1,044</IonCardTitle>
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
