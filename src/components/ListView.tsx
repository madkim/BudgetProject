import {
  IonRow,
  IonCol,
  IonList,
  IonGrid,
  IonItem,
  IonLabel,
  IonBadge,
  IonContent,
  IonListHeader,
} from "@ionic/react";
import moment from "moment";

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
        {Object.keys(items).map((month, index) => {
          return (
            <div key={month}>
              <IonListHeader lines="full">
                <IonLabel>
                  <h1>{moment(month).format("MMMM YYYY")}</h1>
                </IonLabel>
              </IonListHeader>
              {items[month].map((item) => {
                return (
                  <IonItem key={item.id}>
                    <IonLabel>
                      <IonGrid>
                        <IonRow>
                          <IonCol>{moment(item.date).format("L")}</IonCol>
                          <IonCol>{item.price}</IonCol>
                          <IonCol>
                            {item.tags.map((tag, index) => {
                              return (
                                <IonRow key={index}>
                                  <IonCol>
                                    <IonBadge
                                      color="primary"
                                      className="ion-text-capitalize"
                                    >
                                      {tag}
                                    </IonBadge>
                                  </IonCol>
                                </IonRow>
                              );
                            })}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonLabel>
                  </IonItem>
                );
              })}
            </div>
          );
        })}
      </IonList>
    </IonContent>
  );
};

export default ListView;
