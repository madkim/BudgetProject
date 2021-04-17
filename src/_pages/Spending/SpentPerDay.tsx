import {
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonLabel,
  IonContent,
  IonBadge,
  IonGrid,
} from "@ionic/react";

import React from "react";
import moment from "moment";
import { Days } from "../../_helpers/types";

interface Props {
  days: Days;
}

const SpentPerDay: React.FC<Props> = (props: Props) => {
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

  const getTotal = (prices: number[]) => {
    return prices.reduce((total: number, num: number) => {
      return total + num;
    });
  };

  const { days } = props;

  return (
    <>
      <IonContent>
        <IonList
          slot="fixed"
          style={{ width: "100%", padding: "0em 1em 0 1em" }}
        >
          {Object.keys(days).length > 0 &&
            Object.keys(days).map((day) => {
              return (
                <IonItem
                  button
                  key={day}
                  lines="full"
                  routerLink={`spent/${moment(day).format("YYYY-MM-DD")}/${
                    days[day].length
                  }`}
                >
                  <IonGrid>
                    <IonRow style={{ width: "100%", padding: "1vh" }}>
                      <IonCol size="8">
                        <IonLabel className="ion-text-capitalize">
                          {moment(day).format("dddd, Do")}
                        </IonLabel>
                      </IonCol>
                      <IonCol size="4">
                        <IonLabel className="ion-text-left">
                          <IonBadge color={getBadgeColor(getTotal(days[day]))}>
                            ${getTotal(days[day]).toFixed(2)}
                          </IonBadge>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </>
  );
};

export default SpentPerDay;
