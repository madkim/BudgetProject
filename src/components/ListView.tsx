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
  IonItemDivider,
} from "@ionic/react";
import moment from "moment";

import { Receipt, Receipts } from "../helpers/types";
import { useEffect, useState } from "react";
import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  receipts: Receipt[];
}

const ListView: React.FC<Props> = (props: Props) => {
  const [receipts, setReceipts] = useState<Receipts>({});

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
                    <IonItem key={index}>
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
                            {receipt.tags.map((tag, index) => {
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
