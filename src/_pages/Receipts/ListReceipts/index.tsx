import {
  IonRow,
  IonCol,
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
} from "@ionic/react";
import moment from "moment";

import React from "react";
import { useHistory } from "react-router-dom";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { receiptActions } from "../../../_actions/receiptActions";
import { spendingActions } from "../../../_actions/spendingActions";
import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { Receipt, Receipts, DynObject } from "../../../_helpers/types";
import { imageOutline, chevronForwardOutline } from "ionicons/icons";

interface Props {
  day: string;
  xref: React.Ref<HTMLIonContentElement>;
  loading: boolean;
  receipts: Receipt[];
  showByDay: boolean;
}

const ListReceipts: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [totals, setTotals] = useState<DynObject>({});
  const [clicked, setClicked] = useState("");
  const [receipts, setReceipts] = useState<Receipts>({});

  const deleteReceipt = (receipt: Receipt) => {
    let answer = window.confirm(
      "Are you sure you want to delete this receipt?"
    );
    if (answer) {
      dispatch(receiptActions.deleteReceipt(receipt, ""));
    }
  };

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

  const viewReceipt = (id: string) => {
    setClicked(id);
    dispatch(receiptActions.getReceiptByID(id, history));
  };

  useEffect(() => {
    dispatch(spendingActions.getTotalSpent());
    addMonthAsKey();
  }, [props.receipts]);

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
                        <h1>
                          {`${moment(props.day).format("MMMM")} ${parseInt(
                            props.day.split("-")[2]
                          )}`}
                        </h1>
                      </IonLabel>
                      <IonLabel slot="end" className="ion-padding-horizontal">
                        <small>${totals && totals[month].toFixed(2)}</small>
                      </IonLabel>
                    </>
                  ) : (
                    <>
                      <IonLabel>
                        <h1>{date.format("MMMM YYYY")}</h1>
                      </IonLabel>
                      <IonLabel slot="end" className="ion-padding-horizontal">
                        <small>
                          ${totals && totals[month].toFixed(2)} / 428.5
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
      </IonList>
    </IonContent>
  );
};
const mapStateToProps = (state: {
  spendingReducer: { totalSpent: number };
  receiptsReducer: { loading: boolean };
}) => {
  return {
    loading: state.receiptsReducer.loading,
    totalSpent: state.spendingReducer.totalSpent,
  };
};

export default connect(mapStateToProps)(ListReceipts);
