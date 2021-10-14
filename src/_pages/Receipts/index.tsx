import {
  IonImg,
  IonFab,
  IonIcon,
  IonPage,
  IonCard,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonButtons,
  IonFabButton,
  IonCardTitle,
  IonRefresher,
  IonCardHeader,
  IonCardContent,
  IonProgressBar,
  IonRefresherContent,
} from "@ionic/react";

import {
  add,
  menuSharp,
  filterOutline,
  chevronUpOutline,
  chevronDownCircleOutline,
} from "ionicons/icons";

import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import FadeIn from "react-fade-in";
import sadMoney from "../../_assets/sadMoney.jpeg";
import ListReceipts from "./ListReceipts";
import LoadingReceipts from "./LoadingReceipts";

import { Budget, DynObject, Receipt } from "../../_helpers/types";
import { useHaptics } from "../../_hooks/useHaptics";
import { menuController } from "@ionic/core";
import { receiptActions } from "../../_actions/receiptActions";
import { spendingActions } from "../../_actions/spendingActions";
import { receiptsService } from "../../_services/receiptsService";
import { receiptConstants } from "../../_constants/receiptConstants";
import { connect, useDispatch } from "react-redux";
import { budgetActions } from "../../_actions/budgetActions";

interface Props {
  budget: Budget;
  upload: string;
  months: string[];
  request: string;
  loading: boolean;
  progress: number;
  receipts: Receipt[];
  totalSpent: number;
}

const Receipts: React.FC<Props> = (props: Props) => {
  const topRef = useRef<HTMLIonContentElement>(null);
  const [total, setTotal] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
  const [receiptMonth, setReceiptMonth] = useState(moment().format());
  const [currentBudget, setCurrentBudget] = useState<DynObject>({});
  const [allReceiptsLoaded, setAllReceiptsLoaded] = useState(false);

  const dispatch = useDispatch();
  const { impactMedium } = useHaptics();

  useEffect(() => {
    if (receiptsNotRetrieved()) {
      dispatch(spendingActions.getTotalSpent());
      dispatch(spendingActions.getMonthsSpent());
      dispatch(receiptActions.getAllReceipts(moment().format()));
      dispatch(budgetActions.getCurrentBudget(moment(receiptMonth).format("YYYY-MM")));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(total).length === 0 && props.totalSpent > 0) {
      setTotal({[moment(receiptMonth).format("YYYY-MM")]: props.totalSpent});
    }
  }, [props.totalSpent])

  useEffect(() => {
    if (Object.keys(total).length > 0) {
      setTotal({ ...total, [moment(receiptMonth).format("YYYY-MM")]: props.totalSpent });
    }
  }, [receiptMonth])

  useEffect(() => {
    dispatch(budgetActions.getCurrentBudget(moment(receiptMonth).format("YYYY-MM")));
  }, [receiptMonth])

  useEffect(() => {    
    const date = moment(receiptMonth).format("YYYY-MM")
    if ( date === props.budget.month) {
      const updatedBudget = {...currentBudget};
      updatedBudget[date] = budget()?.toFixed(2);
      setCurrentBudget(updatedBudget);
    }
  }, [props.budget])

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

  const budget = () => {
    return +totalIncome()! - +totalExpense()!;
  };

  const receiptsNotRetrieved = () => {
    return Object.keys(props.receipts).length === 0;
  };

  const loadMoreReceipts = (e: any) => {
    const { months } = props;
    const last = moment(months[0]).format("YYYY-MM");
    const month = moment(receiptMonth).subtract(1, "months").format("YYYY-MM");

    if (allReceiptsLoaded === false) {
      dispatch(spendingActions.getTotalSpent(month));

      receiptsService.getAll(month).then((receipts) => {
        dispatch({
          type: receiptConstants.GET_ALL_RECEIPTS,
          payload: receipts,
        });
        if (month === last) {
          setAllReceiptsLoaded(true);
        }
        setReceiptMonth(month);
        e.target.complete();
      });
    }
  };

  const refreshReceipts = (e: any) => {
    impactMedium();
    setAllReceiptsLoaded(false);
    setReceiptMonth(moment().format());
    dispatch(receiptActions.refreshReceipts(e));
  };

  const scrollToTop = () => {
    if (topRef.current !== null) {
      topRef.current!.scrollToTop(300);
    }
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
            <h2>💰 M👀LA&nbsp;</h2>
          </IonTitle>

          <IonButton slot="end" fill="clear">
            <IonIcon
              size="large"
              icon={filterOutline}
              style={{ color: "white" }}
            />
          </IonButton>
        </IonToolbar>

        {props.progress > 0 && (
          <IonProgressBar value={props.progress}></IonProgressBar>
        )}
      </IonHeader>

      <IonContent
        scrollEvents={true}
        onIonScroll={(e) => setScrollTop(e.detail.scrollTop)}
      >
        <IonRefresher
          slot="fixed"
          disabled={scrollTop > 0}
          onIonRefresh={refreshReceipts}
        >
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>

        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          style={{ marginBottom: "8vh" }}
        >
          <IonFabButton color="success" onClick={() => scrollToTop()}>
            <IonIcon icon={chevronUpOutline} />
          </IonFabButton>
        </IonFab>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="success" routerLink="/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {props.loading && receiptsNotRetrieved() ? (
          <LoadingReceipts count={11} />
        ) : (
          <ListReceipts
            day=""
            xref={topRef}
            showByDay={false}
            receipts={props.receipts}
            loadMore={loadMoreReceipts}
            allLoaded={allReceiptsLoaded}
            totalSpent={total}
            currentBudget={currentBudget}
          />
        )}

        {props.request === "failed" && receiptsNotRetrieved() && (
          <FadeIn>
            <IonCard className="ion-margin-top">
              <IonCardHeader>
                <IonCardTitle>Uh Oh ...</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <h3>
                  Looks like we couldn't get your receipts. Please try again
                </h3>
                <IonImg src={sadMoney}></IonImg>
              </IonCardContent>
            </IonCard>
          </FadeIn>
        )}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  budgetReducer: { 
    budget: Budget 
  };
  spendingReducer: {
    months: string[];
    totalSpent: number;
  };
  receiptsReducer: {
    request: string;
    loading: boolean;
    progress: number;
    receipts: Receipt[];
  };
}) => {
  return {
    budget: state.budgetReducer.budget,
    months: state.spendingReducer.months,
    request: state.receiptsReducer.request,
    loading: state.receiptsReducer.loading,
    progress: state.receiptsReducer.progress,
    receipts: state.receiptsReducer.receipts,
    totalSpent: state.spendingReducer.totalSpent,
  };
};

export default connect(mapStateToProps)(Receipts);
