import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonContent,
  IonItemGroup,
  IonItemOption,
  IonItemDivider,
  IonItemSliding,
  IonItemOptions,
} from "@ionic/react";
import moment from "moment";

import { useDispatch } from "react-redux";
import { receiptsActions } from "../actions/receiptsActions";
import { Receipt, Receipts } from "../helpers/types";
import { useEffect, useState } from "react";
import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  receipts: Receipt[];
}

const ListView: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [receipts, setReceipts] = useState<Receipts>({});

  const deleteReceipt = (receiptId: string) => {
    let answer = window.confirm(
      "Are you sure you want to delete this receipt?"
    );

    if (answer) {
      dispatch(receiptsActions.deleteReceipt(receiptId));
    }
  };

  const getBadgeColor = (price: number | null) => {
    if (price !== null) {
      if (price < 30) {
        return "success";
      }
      if (price > 30 && price < 80) {
        return "warning";
      }
      if (price > 80) {
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
      console.log(receipts);
      setReceipts(receipts);
    }
  };

  useEffect(() => {
    addMonthAsKey();
  }, [props.receipts]);

  return (
    <IonContent>
      <IonList>
        {Object.keys(receipts).length > 0 &&
          Object.keys(receipts).map((month) => {
            const date = moment(month);
            return (
              <IonItemGroup key={`group-${date}`}>
                <IonItemDivider sticky>
                  <IonLabel>
                    <h1>{date.format("MMMM YYYY")}</h1>
                  </IonLabel>
                </IonItemDivider>
                {receipts[month].map((receipt, index) => {
                  return (
                    <IonItemSliding key={receipt.id}>
                      <IonItemOptions side="start">
                        <IonItemOption
                          color="danger"
                          onClick={() => deleteReceipt(receipt.id)}
                          expandable
                        >
                          Delete
                        </IonItemOption>
                      </IonItemOptions>
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol size="auto">
                              {moment(receipt.date).format("ddd, Do")}
                            </IonCol>
                            <IonCol className="ion-text-center">
                              <IonBadge color={getBadgeColor(receipt.price)}>
                                ${receipt.price}
                              </IonBadge>
                            </IonCol>
                            <IonCol size="4">
                              {receipt.tags &&
                                receipt.tags.map((tag, index) => {
                                  return (
                                    <IonLabel
                                      key={index}
                                      text-wrap
                                      className="ion-text-capitalize"
                                    >
                                      {tag}
                                    </IonLabel>
                                  );
                                })}
                            </IonCol>
                            <IonCol size="1">
                              <IonIcon
                                color="medium"
                                icon={chevronForwardOutline}
                              />
                            </IonCol>
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

export default ListView;
