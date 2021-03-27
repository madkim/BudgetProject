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
} from "@ionic/react";
import moment from "moment";

import { Receipt, Receipts } from "../helpers/types";
import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  receipts: Receipts;
}

const ListView: React.FC<Props> = (props: Props) => {
  const { receipts } = props;
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
                          <IonCol>
                            {moment(receipt.date).format("dddd, Do")}
                          </IonCol>
                          <IonCol size="2">${receipt.price}</IonCol>
                          <IonCol size="3">
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
