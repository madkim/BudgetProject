import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonContent,
  IonItemGroup,
  IonItemDivider,
  IonBadge,
} from "@ionic/react";
import moment from "moment";

import { Receipt, Receipts } from "../helpers/types";
import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  receipts: Receipts;
}

const ListView: React.FC<Props> = (props: Props) => {
  const { receipts } = props;

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

  return (
    <IonContent>
      <IonList>
        {Object.keys(receipts).length > 0 &&
          Object.keys(receipts).map((month: string) => {
            return (
              <IonItemGroup key={`group-${month}`}>
                <IonItemDivider sticky>
                  <IonLabel>
                    <h1>{moment(month).format("MMMM YYYY")}</h1>
                  </IonLabel>
                </IonItemDivider>
                {receipts[month].map((receipt: Receipt) => {
                  return (
                    <IonItem key={receipt.id}>
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
                                <IonLabel key={index} text-wrap>
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
