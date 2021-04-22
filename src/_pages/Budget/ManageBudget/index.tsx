import {
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  IonIcon,
  IonItem,
  IonList,
  IonNote,
  IonText,
  IonLabel,
  IonInput,
  IonTitle,
  IonAlert,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
} from "@ionic/react";

import React, { useState, useEffect } from "react";
import moment from "moment";
import FadeIn from "react-fade-in";

import { budgetActions } from "../../../_actions/budgetActions";
import { Budget, Income } from "../../../_helpers/types";
import { useDispatch, connect } from "react-redux";
import { addOutline, chevronBackOutline, trashBin } from "ionicons/icons";

interface Props {
  budget: Budget;
  loading: boolean;
}

const ManageBudget: React.FC<Props> = (props: Props) => {
  const [error, setError] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [incomeTitle, setIncomeTitle] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseType, setShowExpenseType] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const month = moment(new Date()).format("YYYY-MM");
    dispatch(budgetActions.getCurrentBudget(month));
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
        return total + expense.amount;
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding-top">
          <IonButtons slot="start">
            <IonButton
              slot="start"
              fill="clear"
              routerLink="/"
              routerDirection="root"
            >
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">
            <h4>Manage April Budget</h4>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {props.loading ? (
          <IonLoading isOpen={props.loading} message={"Please wait..."} />
        ) : (
          <>
            <IonAlert
              isOpen={showAddIncome}
              onDidDismiss={() => setShowAddIncome(false)}
              cssClass="my-custom-class"
              header={incomeTitle}
              inputs={[
                {
                  type: "number",
                  placeholder: "Amount",
                  cssClass: "specialClass",
                  attributes: {
                    inputmode: "decimal",
                  },
                },
              ]}
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {
                    console.log("Confirm Cancel");
                  },
                },
                {
                  text: "Ok",
                  handler: () => {
                    console.log("Confirm Ok");
                  },
                },
              ]}
            />
            <IonAlert
              backdropDismiss={false}
              isOpen={showAddExpense}
              header={expenseTitle}
              inputs={[
                {
                  type: "number",
                  placeholder: `Amount Per ${expenseType}`,
                  cssClass: "specialClass",
                  attributes: {
                    inputmode: "decimal",
                  },
                },
              ]}
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {
                    console.log("Confirm Cancel");
                  },
                },
                {
                  text: "Ok",
                  handler: () => {},
                },
              ]}
            />
            <IonAlert
              backdropDismiss={false}
              isOpen={showExpenseType}
              header={`Is ${expenseTitle} a monthly or yearly expense?`}
              buttons={[
                {
                  text: "Yearly",
                  handler: () => {
                    setExpenseType("Year");
                    setShowAddExpense(true);
                    console.log("Confirm Okay");
                  },
                },
                {
                  text: "Monthly",
                  handler: (blah) => {
                    setExpenseType("Month");
                    setShowAddExpense(true);
                    console.log("Confirm Cancel: blah");
                  },
                },
              ]}
            />
            <FadeIn>
              <div className="ion-padding-bottom ion-padding-end">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonList>
                        <IonItem>
                          <IonGrid>
                            <IonRow>
                              <IonCol size="5">
                                <h5>Income</h5>
                              </IonCol>
                              <IonCol size="auto" className="ion-padding-start">
                                <IonNote color="success">
                                  <h5>${totalIncome()}</h5>
                                </IonNote>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonItem>

                        <div className="ion-padding-start">
                          {props.budget.income &&
                            props.budget.income.map((income) => {
                              return (
                                <IonItem key={income.id}>
                                  <IonGrid>
                                    <IonRow>
                                      <IonCol size="5">
                                        <h5>
                                          <IonLabel>{income.name}</IonLabel>
                                        </h5>
                                      </IonCol>
                                      <IonCol
                                        size="4"
                                        className="ion-text-start"
                                      >
                                        <h5>
                                          <IonLabel>${income.amount}</IonLabel>
                                        </h5>
                                      </IonCol>
                                      <IonCol
                                        size="3"
                                        className="ion-text-end ion-no-padding"
                                      >
                                        <IonButton
                                          size="default"
                                          color="danger"
                                        >
                                          <IonIcon icon={trashBin} />
                                        </IonButton>
                                      </IonCol>
                                    </IonRow>
                                  </IonGrid>
                                </IonItem>
                              );
                            })}
                          <IonItem lines="inset">
                            <IonGrid>
                              <IonRow>
                                <IonCol size="9">
                                  <IonInput
                                    placeholder="Add Income"
                                    onIonChange={(e) => {
                                      setIncomeTitle(e.detail.value!);
                                    }}
                                  ></IonInput>
                                </IonCol>

                                <IonCol
                                  size="3"
                                  className="ion-text-end ion-no-padding"
                                >
                                  <IonButton
                                    size="default"
                                    color="success"
                                    onClick={() => {
                                      if (incomeTitle) {
                                        setError("");
                                        setShowAddIncome(true);
                                      } else {
                                        setError("newIncome");
                                      }
                                    }}
                                  >
                                    <IonIcon icon={addOutline} />
                                  </IonButton>
                                </IonCol>
                              </IonRow>
                            </IonGrid>
                          </IonItem>
                        </div>
                      </IonList>
                    </IonCol>
                  </IonRow>
                  <IonText color="danger">
                    {error === "newIncome" && (
                      <span className="ion-margin ion-padding">
                        Please add an income name.
                      </span>
                    )}
                  </IonText>

                  <IonRow>
                    <IonCol>
                      <IonList>
                        <IonItem>
                          <IonGrid>
                            <IonRow>
                              <IonCol size="5">
                                <h5>Expenses</h5>
                              </IonCol>
                              <IonCol size="5" className="ion-padding-start">
                                <IonNote color="danger">
                                  <h5>${totalExpense()}</h5>
                                </IonNote>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonItem>

                        <div className="ion-padding-start">
                          {props.budget.expenses &&
                            props.budget.expenses.map((expense) => {
                              return (
                                <IonItem key={expense.id}>
                                  <IonGrid>
                                    <IonRow>
                                      <IonCol size="5">
                                        <h5>
                                          <IonLabel>{expense.name}</IonLabel>
                                        </h5>
                                      </IonCol>
                                      <IonCol
                                        size="4"
                                        className="ion-text-start"
                                      >
                                        <h5>
                                          <IonLabel>
                                            ${expense.amount.toFixed(2)}
                                          </IonLabel>
                                        </h5>
                                      </IonCol>
                                      <IonCol
                                        size="3"
                                        className="ion-text-end ion-no-padding"
                                      >
                                        <IonButton
                                          size="default"
                                          color="danger"
                                        >
                                          <IonIcon icon={trashBin} />
                                        </IonButton>
                                      </IonCol>
                                    </IonRow>
                                  </IonGrid>
                                </IonItem>
                              );
                            })}
                          <IonItem lines="inset">
                            <IonGrid>
                              <IonRow>
                                <IonCol size="9">
                                  <IonInput
                                    placeholder="Add Expense"
                                    onIonChange={(e) => {
                                      setExpenseTitle(e.detail.value!);
                                    }}
                                  ></IonInput>
                                </IonCol>

                                <IonCol
                                  size="3"
                                  className="ion-text-end ion-no-padding"
                                >
                                  <IonButton
                                    size="default"
                                    color="success"
                                    onClick={() => {
                                      if (expenseTitle) {
                                        setError("");
                                        setShowExpenseType(true);
                                      } else {
                                        setError("newExpense");
                                      }
                                    }}
                                  >
                                    <IonIcon icon={addOutline} />
                                  </IonButton>
                                </IonCol>
                              </IonRow>
                            </IonGrid>
                          </IonItem>
                        </div>
                      </IonList>
                    </IonCol>
                  </IonRow>
                  {error === "newExpense" && (
                    <IonText color="danger" className="ion-padding-start">
                      <span className="ion-margin ion-padding">
                        Please add an expense name.
                      </span>
                    </IonText>
                  )}
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h5>Difference</h5>
                            </IonCol>
                            <IonCol size="6">
                              <IonNote color="dark">
                                <h5 className="ion-padding-end ">
                                  &nbsp;&nbsp;${difference().toFixed(2)}
                                </h5>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h5>Savings</h5>
                            </IonCol>
                            <IonCol size="5">
                              <IonNote color="primary">
                                <h5 className="ion-padding-end ">
                                  -${totalSavings()}
                                </h5>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none">
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h5>Budget</h5>
                            </IonCol>
                            <IonCol size="6">
                              <IonNote color="dark">
                                <h5 className="ion-padding-end ">
                                  &nbsp;&nbsp;${spending().toFixed(2)}
                                </h5>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </FadeIn>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  budgetReducer: { budget: Budget; loading: boolean };
}) => {
  console.log(state.budgetReducer.loading);
  console.log(state.budgetReducer.budget);
  return {
    budget: state.budgetReducer.budget,
    loading: state.budgetReducer.loading,
  };
};

export default connect(mapStateToProps)(ManageBudget);
