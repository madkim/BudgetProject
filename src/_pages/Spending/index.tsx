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
  IonCardTitle,
  IonCardSubtitle,
  IonDatetime,
} from "@ionic/react";

import { menuSharp, settingsOutline, timeOutline } from "ionicons/icons";

import React, { useEffect, useRef } from "react";
import FadeIn from "react-fade-in";
import moment from "moment";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { budgetActions } from "../../_actions/budgetActions";
import { menuController } from "@ionic/core";
import { spendingActions } from "../../_actions/spendingActions";
import { Budget, Days, Receipt } from "../../_helpers/types";

import SpentPerDay from "./SpentPerDay";
import LoadingSpent from "./LoadingSpent";

interface Props {
  days: Days;
  budget: Budget;
  loading: boolean;
  receipts: Receipt[];
  totalSpent: number;
}

const Spending: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const datePickerRef = useRef<any>();

  useEffect(() => {
    dispatch(spendingActions.getTotalSpent());
    dispatch(spendingActions.getDaysSpent());
    dispatch(budgetActions.getCurrentBudget());
  }, [props.totalSpent]);

  const totalIncome = () => {
    if (Object.keys(props.budget).length > 0) {
      const total = props.budget.income.reduce((total, current) => {
        return total + current.amount;
      }, 0);
      return total.toFixed(0);
    }
  };

  const totalExpense = () => {
    if (Object.keys(props.budget).length > 0) {
      const total = props.budget.expenses.reduce((total, expense) => {
        return expense.type === "yearly"
          ? total + expense.amount / 12
          : total + expense.amount;
      }, 0);
      return total.toFixed(2);
    }
  };

  const difference = () => {
    return +totalIncome()! - +totalExpense()!;
  };

  const budget = () => {
    return difference() - +props.budget.savings.amount!;
  };

  const allowance = () => {
    const allowance = budget() - props.totalSpent;
    return allowance < 0 ? 0 : allowance.toFixed(0);
  };

  const saved = () => {
    const saved = props.budget.savings.amount;
    return allowance() === 0 ? saved + (budget() - props.totalSpent) : saved;
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
            {/* <h2>💰 M👀LA&nbsp;</h2> */}
            <h3>{moment().format("MMMM YYYY")}</h3>
          </IonTitle>

          <IonButton
            slot="end"
            fill="clear"
            onClick={() => {
              datePickerRef.current?.open();
            }}
          >
            <IonIcon
              size="large"
              icon={timeOutline}
              style={{ color: "white" }}
            />
          </IonButton>
          <IonDatetime
            ref={datePickerRef}
            className="ion-hide"
            displayFormat="MMMM:YYYY"
          ></IonDatetime>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <FadeIn>
          <IonCard>
            <IonGrid className="ion-padding-start ion-text-center">
              <IonRow>
                <IonCol className="ion-padding-top ion-text-center">
                  <IonCardSubtitle>Today is:</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().format("dddd Do ")}
                  </IonCardTitle>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding-vertical">
                <IonCol size="4">
                  <IonCardSubtitle>Allowance</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${allowance()}
                  </IonCardTitle>
                </IonCol>
                <IonCol size="4">
                  <IonCardSubtitle>Days Left</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().endOf("month").diff(moment(), "days")}
                  </IonCardTitle>
                </IonCol>
                <IonCol size="4">
                  <IonCardSubtitle>Saved</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${saved().toFixed(0)}
                  </IonCardTitle>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding-bottom">
                <IonCol size="4">
                  <IonCardSubtitle>Budget</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    ${budget().toFixed()}
                  </IonCardTitle>
                </IonCol>
                <IonCol size="4">
                  <IonCardSubtitle>Days Total</IonCardSubtitle>
                  <IonCardTitle style={{ fontWeight: "300" }}>
                    {moment().daysInMonth()}
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
        {props.loading ? (
          <LoadingSpent count={7} />
        ) : (
          <SpentPerDay days={props.days} />
        )}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  spendingReducer: {
    days: Days;
    loading: boolean;
    totalSpent: number;
  };
  budgetReducer: {
    budget: Budget;
  };
}) => {
  return {
    days: state.spendingReducer.days,
    budget: state.budgetReducer.budget,
    loading: state.spendingReducer.loading,
    totalSpent: state.spendingReducer.totalSpent,
  };
};

export default connect(mapStateToProps)(Spending);
