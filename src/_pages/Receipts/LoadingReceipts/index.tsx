import {
  IonCol,
  IonRow,
  IonIcon,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonSkeletonText,
} from "@ionic/react";
import React, { ReactElement } from "react";
import { chevronForwardOutline } from "ionicons/icons";

interface Props {
  count: number;
}

export default function LoadingReceipts(props: Props): ReactElement {
  const skeletonTextCount = () => {
    let loopCount = [];
    for (let i = 0; i < props.count; i++) {
      loopCount.push(i);
    }
    return loopCount;
  };

  return (
    <>
      <IonItemDivider></IonItemDivider>
      {skeletonTextCount().map((index) => {
        return (
          <IonItem key={index} className="ion-no-padding">
            <IonSkeletonText
              animated
              style={{ width: "56px", height: "56px" }}
              slot="start"
            />
            <IonLabel>
              <IonRow>
                <IonCol>
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonCol>
                <IonCol>
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonCol>
                <IonCol>
                  <IonSkeletonText animated style={{ width: "90%" }} />
                </IonCol>
                <IonCol size="1">
                  <IonIcon color="medium" icon={chevronForwardOutline} />
                </IonCol>
              </IonRow>
            </IonLabel>
          </IonItem>
        );
      })}
    </>
  );
}
