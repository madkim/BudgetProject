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
  IonLoading,
} from "@ionic/react";

import React, { useEffect, useState, useRef } from "react";
import FadeIn from "react-fade-in";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { budgetActions } from "../../_actions/budgetActions";
import { menuController } from "@ionic/core";
import { spendingActions } from "../../_actions/spendingActions";
import { useDispatch, connect } from "react-redux";
import { Budget, Days, Receipt } from "../../_helpers/types";
import { menuSharp, timeOutline } from "ionicons/icons";

import SpentPerDay from "./SpentPerDay";
import LoadingSpent from "./LoadingSpent";

interface Props {
  days: Days;
  budget: Budget;
  receipts: Receipt[];
  totalSpent: number;
  spendLoading: boolean;
  budgetLoading: boolean;
}

const Spending: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const datePickerRef = useRef<any>();
  const [exists, setExists] = useState<boolean | void>(false);

  useEffect(() => {
    budgetActions.checkBudgetExists().then((exists) => {
      setExists(exists);
      if (exists) {
        dispatch(budgetActions.getCurrentBudget());
        dispatch(spendingActions.getTotalSpent());
        dispatch(spendingActions.getDaysSpent());
      } else {
        dispatch(budgetActions.createNewBudget(history));
      }
    });
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
        <IonLoading
          isOpen={props.budgetLoading && !exists}
          message={"Please wait..."}
          duration={5000}
        />

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
        {props.spendLoading ? (
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
    loading: boolean;
  };
}) => {
  return {
    days: state.spendingReducer.days,
    budget: state.budgetReducer.budget,
    totalSpent: state.spendingReducer.totalSpent,
    spendLoading: state.spendingReducer.loading,
    budgetLoading: state.budgetReducer.loading,
  };
};

export default connect(mapStateToProps)(Spending);
