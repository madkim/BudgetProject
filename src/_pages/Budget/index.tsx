import {
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonLoading,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import moment from "moment";
import FadeIn from "react-fade-in";

import { budgetActions } from "../../_actions/budgetActions";
import { menuController } from "@ionic/core";
import { settingsOutline } from "ionicons/icons";
import { useDispatch, connect } from "react-redux";
import { Budget as BudgetType } from "../../_helpers/types";

interface Props {
  budget: BudgetType;
  loading: boolean;
}

const Budget: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const month = moment(new Date()).format("YYYY-MM");
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

  const totalSavings = () => {
    if (Object.keys(props.budget).length > 0) {
      const total = props.budget.savings.reduce((total, saving) => {
        return total + saving.amount;
      }, 0);
      return total.toFixed(2);
    }
  };

  const difference = () => {
    return parseFloat(totalIncome()!) - parseFloat(totalExpense()!);
  };

  const spending = () => {
    return difference() - parseFloat(totalSavings()!);
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
              <IonIcon icon={settingsOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center">
            <h3>April 2021 Budget</h3>
          </IonTitle>
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
                            <IonCol>Income</IonCol>
                            <IonCol>
                              <IonNote
                                color="success"
                                className="ion-text-start"
                              >
                                <h1 className="ion-padding-end ">
                                  &nbsp;&nbsp;${totalIncome()}
                                </h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>

                      <div className="ion-padding-start">
                        {props.budget.income &&
                          props.budget.income.map((income) => {
                            return (
                              <IonItem key={income.id}>
                                <IonLabel>
                                  <IonRow>
                                    <IonCol>
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
                            <IonCol>Expenses</IonCol>
                            <IonCol>
                              <IonNote color="danger">
                                <h1 className="ion-padding-end ">
                                  -${totalExpense()}
                                </h1>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonListHeader>

                      <div className="ion-padding-start">
                        {props.budget.expenses &&
                          props.budget.expenses.map((expense) => {
                            return (
                              <IonItem key={expense.id}>
                                <IonLabel>
                                  <IonRow>
                                    <IonCol>
                                      <h1>{expense.name}</h1>
                                    </IonCol>
                                    <IonCol>
                                      <h1>
                                        &nbsp;&nbsp;$
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
                            <IonCol>Difference</IonCol>
                            <IonCol>
                              <IonNote color="dark">
                                <h1 className="ion-padding-end">
                                  &nbsp;&nbsp;${difference()}
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
                            <IonCol>Savings</IonCol>
                            <IonCol>
                              <IonNote color="primary">
                                <h1 className="ion-padding-end">
                                  -${totalSavings()}
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
                            <IonCol>Budget</IonCol>
                            <IonCol>
                              <IonNote color="dark">
                                <h1 className="ion-padding-end">
                                  &nbsp;&nbsp;${spending()}
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
