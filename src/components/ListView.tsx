import {
  IonRow,
  IonCol,
  IonList,
  IonGrid,
  IonItem,
  IonLabel,
  IonBadge,
  IonContent,
  IonItemGroup,
  IonListHeader,
  IonItemDivider,
  IonIcon,
} from "@ionic/react";
import moment from "moment";

import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  items: {
    [key: string]: {
      id: string;
      date: string;
      price: number;
      tags: string[];
    }[];
  };
}

const ListView: React.FC<Props> = (props: Props) => {
  const { items } = props;
  return (
    <IonContent>
      <IonList>
        {Object.keys(items).map((month) => {
          return (
            <IonItemGroup key={`group-${month}`}>
              <IonItemDivider sticky>
                <IonLabel>
                  <h1>{moment(month).format("MMMM YYYY")}</h1>
                </IonLabel>
              </IonItemDivider>
              {items[month].map((item) => {
                return (
                  <IonItem key={item.id}>
                    <IonLabel>
                      <IonRow>
                        <IonCol>{moment(item.date).format("L")}</IonCol>
                        <IonCol size="2">${item.price}</IonCol>
                        <IonCol size="3">
                          {item.tags.map((tag, index) => {
                            return <IonCol>{tag}</IonCol>;
                          })}
                        </IonCol>
                        <IonCol size="auto">
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
