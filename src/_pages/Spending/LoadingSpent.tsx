import {
  IonCol,
  IonRow,
  IonIcon,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonSkeletonText,
  IonList,
} from "@ionic/react";
import React, { ReactElement } from "react";
import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  count: number;
}

export default function LoadingReceipts(props: Props): ReactElement {
  const skeletonTextCount = () => {
    let loopCount = [];
    for (let i = 1; i < props.count; i++) {
      loopCount.push(i);
    }
    return loopCount;
  };

  return (
    <IonList style={{ width: "100%", padding: "0em 1em 0 1em" }}>
      {skeletonTextCount().map((index) => {
        return (
          <IonItem detail lines="full" key={index} className="ion-no-padding">
            <IonLabel>
              <IonRow style={{ width: "100%", padding: "1vh" }}>
                <IonCol size="6" offset="1">
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonCol>
                <IonCol size="3" offset="1">
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonCol>
              </IonRow>
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
}
