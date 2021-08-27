import {
  IonRow,
  IonCol,
  IonText,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonContent,
  IonSpinner,
  IonThumbnail,
  IonItemGroup,
  IonItemOption,
  IonItemDivider,
  IonItemSliding,
  IonItemOptions,
  IonActionSheet,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import moment from "moment";

import React from "react";
import { useHistory } from "react-router-dom";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { budgetActions } from "../../../_actions/budgetActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { spendingActions } from "../../../_actions/spendingActions";
import { useDispatch, connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { imageOutline, chevronForwardOutline } from "ionicons/icons";
import { Receipt, Receipts, DynObject, Budget } from "../../../_helpers/types";

interface Props {
  day: string;
  xref: React.Ref<HTMLIonContentElement>;
  budget: Budget;
  loading: boolean;
  receipts: Receipt[];
  showByDay: boolean;
  allLoaded: boolean;
  loadMore: ((e: any) => void) | null;
}

const ListReceipts: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [totals, setTotals] = useState<DynObject>({});
  const [clicked, setClicked] = useState("");
  const [receipts, setReceipts] = useState<Receipts>({});
  const [currentBudget, setCurrentBudget] = useState<DynObject>({});
  const [showActionSheet, setShowActionSheet] = useState(false);

  const getBadgeColor = (price: number | null) => {
    if (price !== null) {
      if (price <= 30) {
        return "success";
      }
      if (price >= 31 && price <= 80) {
        return "warning";
      }
      if (price >= 81) {
        return "danger";
      }
    }
  };

  const addMonthAsKey = () => {
    const totals: DynObject = {};
    const receipts: Receipts = {};
    if (props.receipts) {
      props.receipts.map((receipt) => {
        const date = moment(receipt.date).format("YYYY-MM");
        if (receipts[date]) {
          totals[date] += receipt.price;
          receipts[date].push(receipt);
        } else {
          totals[date] = receipt.price;
          receipts[date] = [receipt];
        }
      });
      setTotals(totals);
      setReceipts(receipts);
    }
  };

  const veiwReceiptPhoto = (receipt: Receipt) => {
    if (receipt.hasPhoto) {
      var options = {
        share: true, // default is false
        closeButton: false, // default is true
        copyToReference: true, // default is false
        headers: "", // If this is not provided, an exception will be triggered
        piccasoOptions: {}, // If this is not provided, an exception will be triggered
      };
      PhotoViewer.show(receipt.photo, receipt.seller.name, options);
    }
  };

  const deleteReceipt = (receipt: Receipt) => {
    let answer = window.confirm(
      "Are you sure you want to delete this receipt?"
    );
    if (answer) {
      dispatch(receiptActions.deleteReceipt(receipt, ""));
    }
  };

  const viewReceipt = (id: string) => {
    setClicked(id);
    dispatch(receiptActions.getReceiptByID(id, history));
  };

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
    if (localStorage.getItem("withSavings") === null || localStorage.getItem("withSavings") === "true") {
      localStorage.setItem("withSavings", "true");
      return difference() - +props.budget.savings.amount!; // with savings
    }
    else if (localStorage.getItem("withSavings") === "false") {
      return difference(); // without savings
    }
  };

  useEffect(() => {
    dispatch(spendingActions.getTotalSpent());
    addMonthAsKey();
  }, [props.receipts]);

  useEffect(() => {
    const currentMonth = moment(props.receipts.pop()?.date).format("YYYY-MM");
    if (!(currentMonth in currentBudget)) {
      dispatch(budgetActions.getCurrentBudget(currentMonth));
    }
  }, [props.receipts])

  useEffect(() => {
    const currentMonth = moment(props.receipts.pop()?.date).format("YYYY-MM");
    
    if (currentMonth === props.budget.month) {
      const updatedBudget = {...currentBudget};
      updatedBudget[currentMonth] = budget()?.toFixed(2);
      setCurrentBudget(updatedBudget);
    }
  }, [props.budget])

  return (
    <IonContent ref={props.xref} scrollEvents={true}>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={[
        {
          text: 'Show with savings',
          handler: () => {
            localStorage.setItem("withSavings", "true");
            window.location.reload();
          }
        }, {
          text: 'Show without savings',
          handler: () => {
            localStorage.setItem("withSavings", "false");
            window.location.reload();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
        }]}
      >
      </IonActionSheet>
      <IonList>
        {Object.keys(receipts).length > 0 &&
          Object.keys(receipts).map((month) => {
            const date = moment(month);

            return (
              <IonItemGroup key={`group-${date}`}>
                <IonItemDivider sticky>
                  {props.showByDay ? (
                    <>
                      <IonLabel>
                        <h2>{moment(props.day).format("dddd")}</h2>
                      </IonLabel>
                      <IonLabel slot="end" className="ion-padding-horizontal">
                        <small>${totals && totals[month].toFixed(2)}</small>
                      </IonLabel>
                    </>
                  ) : (
                    <>
                      <IonLabel>
                        <h2>{date.format("MMMM YYYY")}</h2>
                      </IonLabel>
                      <IonLabel slot="end" className="ion-padding-horizontal" onClick={() => setShowActionSheet(true)}>
                        <small>{totals && currentBudget ? (totals[month] - currentBudget[date.format("YYYY-MM")]).toFixed(2) : ""}</small>
                      </IonLabel>
                    </>
                  )}
                </IonItemDivider>

                {receipts[month].map((receipt) => {
                  return (
                    <IonItemSliding key={receipt.id}>
                      <IonItemOptions side="end">
                        <IonItemOption
                          color="danger"
                          onClick={(e) => deleteReceipt(receipt)}
                          expandable
                        >
                          Delete
                        </IonItemOption>
                      </IonItemOptions>

                      <IonItem button detail={false} className="ion-no-padding">
                        {receipt.hasPhoto ? (
                          <IonThumbnail
                            slot="start"
                            onClick={() => veiwReceiptPhoto(receipt)}
                          >
                            <img alt="receipt" src={receipt.photo} />
                          </IonThumbnail>
                        ) : (
                          <IonIcon
                            icon={imageOutline}
                            className="ion-padding"
                          />
                        )}
                        <IonLabel
                          onClick={() => viewReceipt(receipt.id)}
                          className={
                            receipt.hasPhoto ? "" : "ion-padding-start"
                          }
                        >
                          <IonRow style={{ width: "100%" }}>
                            {props.showByDay === false && (
                              <IonCol size="3">
                                {moment(receipt.date).format("ddd, Do")}
                              </IonCol>
                            )}
                            <IonCol
                              size={props.showByDay ? "6" : "4"}
                              className={
                                props.showByDay
                                  ? "ion-text-left"
                                  : "ion-padding-start"
                              }
                            >
                              {receipt.seller && (
                                <IonLabel className="ion-text-capitalize">
                                  {receipt.seller.name}
                                </IonLabel>
                              )}
                            </IonCol>
                            <IonCol className="ion-text-center ion-padding-start">
                              <IonBadge color={getBadgeColor(receipt.price)}>
                                ${receipt.price?.toFixed(2)}
                              </IonBadge>
                            </IonCol>

                            {props.loading && clicked === receipt.id ? (
                              <IonSpinner name="lines-small" />
                            ) : (
                              <IonCol size="1">
                                <IonIcon
                                  color="medium"
                                  icon={chevronForwardOutline}
                                />
                              </IonCol>
                            )}
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                    </IonItemSliding>
                  );
                })}
              </IonItemGroup>
            );
          })}
        {props.allLoaded && !props.showByDay && (
          <IonItem lines="none" className="ion-padding-top">
            <IonRow style={{ width: "100%" }}>
              <IonCol className="ion-text-center">
                <IonText color="medium">All Receipts Loaded!</IonText>
              </IonCol>
            </IonRow>
          </IonItem>
        )}
      </IonList>
      &nbsp;
      {props.loadMore !== null && props.allLoaded === false && (
        <IonInfiniteScroll
          position="bottom"
          onIonInfinite={(e) => props.loadMore!(e)}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      )}
    </IonContent>
  );
};
const mapStateToProps = (state: {
  budgetReducer: { budget: Budget };
  receiptsReducer: { loading: boolean };
  spendingReducer: { totalSpent: number };
}) => {
  return {
    budget: state.budgetReducer.budget,
    loading: state.receiptsReducer.loading,
    totalSpent: state.spendingReducer.totalSpent,
  };
};

export default connect(mapStateToProps)(ListReceipts);
