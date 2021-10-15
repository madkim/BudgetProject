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
  IonListHeader,
} from "@ionic/react";

import {
  caretUp,
  trashBin,
  caretDown,
  addOutline,
  chevronBackOutline,
} from "ionicons/icons";

import React, { useState, useEffect } from "react";
import moment from "moment";
import FadeIn from "react-fade-in";

import { useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import { budgetActions } from "../../../_actions/budgetActions";
import { spendingActions } from "../../../_actions/spendingActions";
import { Budget, Income, Expense } from "../../../_helpers/types";

interface Props {
  budget: Budget;
  loading: boolean;
}

const ManageBudget: React.FC<Props> = (props: Props) => {
  const sortIcon = [caretDown, caretUp, ""];

  const [error, setError] = useState("");
  const [sortName, setSortName] = useState(2);
  const [sortAmnt, setSortAmnt] = useState(1);
  const [expenseType, setExpenseType] = useState("");
  const [incomeTitle, setIncomeTitle] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseType, setShowExpenseType] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const searchParams = new URLSearchParams(history.location.search);
  const notReviewed = searchParams.get("reviewed") === "false";

  useEffect(() => {
    dispatch(budgetActions.getCurrentBudget());
    return () => {
      dispatch(spendingActions.getTotalSpent());
    };
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
      return total.toFixed(0);
    }
  };

  const deleteIncome = (income: Income) => {
    const answer = window.confirm(
      `Are you sure you want to delete ${income.name}?`
    );
    if (answer) {
      dispatch(budgetActions.deleteIncome(income));
    }
  };

  const deleteExpense = (expense: Expense) => {
    const answer = window.confirm(
      `Are you sure you want to delete ${expense.name}?`
    );
    if (answer) {
      dispatch(budgetActions.deleteExpense(expense));
    }
  };

  const difference = () => {
    return +totalIncome()! - +totalExpense()!;
  };

  // const spending = () => {
  //   return difference() - +props.budget.savings.amount!;
  // };

  const changeSort = (type: number, setType: (i: number) => void) => {
    type === sortName ? setSortAmnt(2) : setSortName(2);
    const index = type + 1;
    setType(index % 2);
  };

  const sortExpenses = (a: Expense, b: Expense) => {
    if (sortName < 2) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sortName === 1 ? -1 : 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sortName === 1 ? 1 : -1;
      }
      return 0;
    } else if (sortAmnt < 2) {
      const aMonthly = a.type === "yearly" ? a.amount / 12 : a.amount;
      const bMonthly = b.type === "yearly" ? b.amount / 12 : b.amount;

      if (aMonthly < bMonthly) {
        return sortAmnt === 1 ? 1 : -1;
      }
      if (aMonthly > bMonthly) {
        return sortAmnt === 1 ? -1 : 1;
      }
      return 0;
    }
    return 0;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start" className='ion-padding'>
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
            <h4>{moment(new Date()).format("MMMM")}</h4>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {props.loading ? null : (
          <>
            <IonAlert
              isOpen={notReviewed}
              header={"New Budget Created"}
              message={
                "Please review this month's budget and update accordingly."
              }
              buttons={["OK"]}
            />
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
                    setIncomeTitle("");
                    setShowAddIncome(false);
                  },
                },
                {
                  text: "Ok",
                  handler: (amount) => {
                    dispatch(budgetActions.addIncome(incomeTitle, +amount[0]));
                    setIncomeTitle("");
                    setShowAddIncome(false);
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
                  placeholder: `Amount Per ${
                    expenseType === "monthly" ? "Month" : "Year"
                  }`,
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
                    setExpenseType("");
                    setExpenseTitle("");
                    setShowAddExpense(false);
                    setShowExpenseType(false);
                  },
                },
                {
                  text: "Ok",
                  handler: (amount) => {
                    dispatch(
                      budgetActions.addExpense(
                        expenseTitle,
                        expenseType,
                        +amount[0]
                      )
                    );
                    setExpenseType("");
                    setExpenseTitle("");
                    setShowAddExpense(false);
                    setShowExpenseType(false);
                  },
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
                    setExpenseType("yearly");
                    setShowAddExpense(true);
                  },
                },
                {
                  text: "Monthly",
                  handler: (blah) => {
                    setExpenseType("monthly");
                    setShowAddExpense(true);
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
                              <IonCol size="6" className="ion-no-padding">
                                <h2>Income</h2>
                              </IonCol>
                              <IonCol size="3" className="ion-text-end">
                                <IonNote color="success">
                                  <h5>${totalIncome()}</h5>
                                </IonNote>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonItem>

                        {props.budget.income &&
                          props.budget.income.map((income) => {
                            return (
                              <IonItem key={income.id}>
                                <IonGrid>
                                  <IonRow>
                                    <IonCol size="5">
                                      <h5 className="ion-text-capitalize">
                                        <IonLabel>{income.name}</IonLabel>
                                      </h5>
                                    </IonCol>
                                    <IonCol size="4" className="ion-text-end">
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
                                        onClick={() => {
                                          deleteIncome(income);
                                        }}
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
                                  value={incomeTitle}
                                  placeholder="Add Income Name"
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
                        <IonListHeader lines="inset">
                          <IonLabel>
                            <IonRow>
                              <IonCol
                                size="6"
                                onClick={() => {
                                  changeSort(sortName, setSortName);
                                }}
                              >
                                Expenses&nbsp;
                                {sortIcon[sortName] !== "" && (
                                  <IonIcon icon={sortIcon[sortName]} />
                                )}
                              </IonCol>
                              <IonCol
                                size="auto"
                                className="ion-no-padding"
                                onClick={() => {
                                  changeSort(sortAmnt, setSortAmnt);
                                }}
                              >
                                <IonNote color="danger">
                                  <h1>-${totalExpense()}</h1>
                                </IonNote>
                              </IonCol>
                              &nbsp;
                              {sortIcon[sortAmnt] !== "" && (
                                <IonIcon icon={sortIcon[sortAmnt]} />
                              )}
                            </IonRow>
                          </IonLabel>
                        </IonListHeader>

                        {props.budget.expenses &&
                          props.budget.expenses
                            .sort(sortExpenses)
                            .map((expense) => {
                              return (
                                <IonItem key={expense.id}>
                                  <IonGrid>
                                    <IonRow>
                                      <IonCol size="5">
                                        <h5>
                                          <IonLabel>{expense.name}</IonLabel>
                                        </h5>
                                      </IonCol>
                                      <IonCol size="4" className="ion-text-end">
                                        <h5>
                                          <IonLabel>
                                            $
                                            {expense.type === "yearly"
                                              ? (expense.amount / 12).toFixed(2)
                                              : expense.amount.toFixed(2)}
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
                                          onClick={() => {
                                            deleteExpense(expense);
                                          }}
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
                                  value={expenseTitle}
                                  placeholder="Add Expense Name"
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
                            <IonCol size="6" className="ion-no-padding">
                              <h2>Budget</h2>
                            </IonCol>
                            <IonCol size="3" className="ion-text-end">
                              <IonNote color="dark">
                                <h5>${difference().toFixed(0)}</h5>
                              </IonNote>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
              <IonRow className="ion-padding-horizontal">
                <IonCol size="12">
                  <IonButton
                    fill="solid"
                    color="success"
                    expand="block"
                    routerLink="/"
                    routerDirection="root"
                  >
                    Done
                  </IonButton>
                </IonCol>
              </IonRow>
              <br />
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
  return {
    budget: state.budgetReducer.budget,
    loading: state.budgetReducer.loading,
  };
};

export default connect(mapStateToProps)(ManageBudget);
