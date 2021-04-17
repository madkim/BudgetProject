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

export default function LoadingReceipts(): ReactElement {
  return (
    <>
      <IonItemDivider></IonItemDivider>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
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
