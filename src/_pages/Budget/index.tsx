import {
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonNote,
  IonLabel,
  IonTitle,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
  IonListHeader,
  IonDatetime,
} from "@ionic/react";

import React, { useEffect, useRef } from "react";
import FadeIn from "react-fade-in";

import { budgetActions } from "../../_actions/budgetActions";
import { menuController } from "@ionic/core";
import { useDispatch, connect } from "react-redux";
import { Budget as BudgetType } from "../../_helpers/types";
import { menuSharp, timeOutline } from "ionicons/icons";

interface Props {
  budget: BudgetType;
  loading: boolean;
}

const Budget: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const datePickerRef = useRef<any>();

  useEffect(() => {
    dispatch(budgetActions.getCurrentBudget());
  }, []);

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

  const spending = () => {
    return difference() - props.budget.savings.amount;
  };

  const yearlyExpense = (amount: number) => {
    return (
      <>
        {(amount / 12).toFixed(2)}
        {/* <br />
        &nbsp;&nbsp;<small>${amount.toFixed(2)} / yr</small> */}
      </>
    );
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
            <h3>April 2021 Budget</h3>
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
        {props.loading ? (
          <IonLoading isOpen={props.loading} message={"Please wait..."} />
        ) : (
          <FadeIn>
            <div className="ion-padding-bottom ion-padding-end">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonList>
                      <IonListHeader lines="inset">
                        <IonLabel>
                          <IonRow>
                            <IonCol size="7">Income</IonCol>
                            <IonCol>
                              <IonNote
                                color="success"
                                className="ion-text-start"
                              >
                                <h1 className="ion-padding-end ">
                                  ${totalIncome()}
                                </h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>

                      {props.budget.income &&
                        props.budget.income.map((income) => {
                          return (
                            <IonItem key={income.id}>
                              <IonLabel>
                                <IonRow>
                                  <IonCol size="7">
                                    <h1>{income.name}</h1>
                                  </IonCol>
                                  <IonCol>
                                    <h1>
                                      &nbsp;&nbsp;${income.amount.toFixed(2)}
                                    </h1>
                                  </IonCol>
                                </IonRow>
                              </IonLabel>
                            </IonItem>
                          );
                        })}
                    </IonList>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonList>
                      <IonListHeader lines="inset">
                        <IonLabel>
                          <IonRow>
                            <IonCol size="7">Expenses</IonCol>
                            <IonCol className="ion-no-padding">
                              <IonNote color="danger">
                                <h1>-${totalExpense()}</h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>

                      <div>
                        {props.budget.expenses &&
                          props.budget.expenses.map((expense) => {
                            return (
                              <IonItem key={expense.id}>
                                <IonLabel>
                                  <IonRow>
                                    <IonCol size="7">
                                      <IonLabel>
                                        <h1>{expense.name}</h1>
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol>
                                      <h1>
                                        &nbsp;&nbsp;&nbsp;$
                                        {expense.type === "yearly"
                                          ? yearlyExpense(expense.amount)
                                          : expense.amount.toFixed(2)}
                                      </h1>
                                    </IonCol>
                                  </IonRow>
                                </IonLabel>
                              </IonItem>
                            );
                          })}
                      </div>
                    </IonList>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonList>
                      <IonListHeader lines="inset">
                        <IonLabel>
                          <IonRow>
                            <IonCol size="7">Difference</IonCol>
                            <IonCol>
                              <IonNote color="dark">
                                <h1 className="ion-padding-end">
                                  &nbsp;${difference()}
                                </h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>
                    </IonList>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonList>
                      <IonListHeader lines="inset">
                        <IonLabel>
                          <IonRow>
                            <IonCol size="7">Savings</IonCol>
                            <IonCol className="ion-no-padding">
                              <IonNote color="primary">
                                <h1 className="ion-padding-end">
                                  -${props.budget.savings.amount}
                                </h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>
                    </IonList>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonList>
                      <IonListHeader lines="none">
                        <IonLabel>
                          <IonRow>
                            <IonCol size="7">Budget</IonCol>
                            <IonCol>
                              <IonNote color="dark">
                                <h1 className="ion-padding-end">
                                  &nbsp;${spending().toFixed(2)}
                                </h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>
                    </IonList>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </FadeIn>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  budgetReducer: { budget: BudgetType; loading: boolean };
}) => {
  return {
    budget: state.budgetReducer.budget,
    loading: state.budgetReducer.loading,
  };
};

export default connect(mapStateToProps)(Budget);
