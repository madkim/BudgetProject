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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import moment from "moment";

import React from "react";
import { useHistory } from "react-router-dom";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { budgetActions } from "../../../_actions/budgetActions";
import { receiptActions } from "../../../_actions/receiptActions";
import { useDispatch, connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { Receipt, Receipts, DynObject } from "../../../_helpers/types";
import { imageOutline, chevronForwardOutline } from "ionicons/icons";

interface Props {
  day: string;
  xref: React.Ref<HTMLIonContentElement>;
  loading: boolean;
  receipts: Receipt[];
  showByDay: boolean;
  allLoaded: boolean;
  totalSpent: {[date: string]: number};
  currentBudget: DynObject;
  loadMore: ((e: any) => void) | null;
}

const ListReceipts: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const [clicked, setClicked] = useState("");
  const [receipts, setReceipts] = useState<Receipts>({});

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
    const receipts: Receipts = {};
    if (props.receipts) {
      props.receipts.map((receipt) => {
        const date = moment(receipt.date).format("YYYY-MM");
        if (receipts[date]) {
          receipts[date].push(receipt);
        } else {
          receipts[date] = [receipt];
        }
      });
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

  const onRouteChange = () => {
    // Reset to current month spending
    dispatch(budgetActions.getCurrentBudget(moment().format("YYYY-MM")));
  };

  useEffect(() => {
    const unlisten = history.listen(onRouteChange);
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    addMonthAsKey();
  }, [props.receipts])

  return (
    <IonContent ref={props.xref} scrollEvents={true}>
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
                        <small>${props.totalSpent && props.totalSpent[date.format("YYYY-MM")].toFixed(2)}</small>
                      </IonLabel>
                    </>
                  ) : (
                    <>
                      <IonLabel>
                        <h2>{date.format("MMMM YYYY")}</h2>
                      </IonLabel>
                      <IonLabel slot="end" className="ion-padding-horizontal">
                        <small>{props.totalSpent && props.currentBudget[date.format("YYYY-MM")] ? 
                          `$${(props.currentBudget[date.format("YYYY-MM")] - props.totalSpent[date.format("YYYY-MM")]).toFixed(2)}` : <IonSpinner name="dots" />}
                        </small>
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
                                <span style={{textDecoration: receipt.wasRefunded ? 'line-through' : ''}}>
                                  ${receipt.price?.toFixed(2)}
                                </span>
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
  receiptsReducer: { loading: boolean };
}) => {
  return {
    loading: state.receiptsReducer.loading,
  };
};

export default connect(mapStateToProps)(ListReceipts);
