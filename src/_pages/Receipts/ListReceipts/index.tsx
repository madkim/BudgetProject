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
  IonThumbnail,
} from "@ionic/react";
import moment from "moment";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { receiptActions } from "../../../_actions/receiptActions";
import { Receipt, Receipts } from "../../../_helpers/types";
import { useEffect, useState } from "react";
import { imageOutline, chevronForwardOutline } from "ionicons/icons";

interface Props {
  receipts: Receipt[];
}

const ListRecepts: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [receipts, setReceipts] = useState<Receipts>({});

  const deleteReceipt = (receipt: Receipt) => {
    let answer = window.confirm(
      "Are you sure you want to delete this receipt?"
    );

    if (answer) {
      dispatch(receiptActions.deleteReceipt(receipt));
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
      setReceipts(receipts);
    }
  };

  const viewReceipt = (id: string) => {
    history.push(`/view/${id}`);
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
                {receipts[month].map((receipt) => {
                  return (
                    <IonItemSliding
                      key={receipt.id}
                      onClick={() => viewReceipt(receipt.id)}
                    >
                      <IonItemOptions side="end">
                        <IonItemOption
                          color="danger"
                          onClick={() => deleteReceipt(receipt)}
                          expandable
                        >
                          Delete
                        </IonItemOption>
                      </IonItemOptions>
                      <IonItem className="ion-no-padding">
                        {receipt.hasPhoto ? (
                          <IonThumbnail slot="start">
                            <img alt="receipt" src={receipt.photo} />
                          </IonThumbnail>
                        ) : (
                          <IonIcon
                            color="large"
                            icon={imageOutline}
                            className="ion-padding"
                          />
                        )}
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
                              {receipt.seller && (
                                <IonLabel
                                  text-wrap
                                  className="ion-text-capitalize"
                                >
                                  {receipt.seller.name}
                                </IonLabel>
                              )}
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

export default ListRecepts;
