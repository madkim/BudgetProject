import {
  IonIcon,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonButtons,
} from "@ionic/react";

import React from "react";
import { chevronBackOutline, bagHandleOutline } from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="success">
            <IonButtons slot="start">
              <IonButton
                slot="start"
                fill="clear"
                routerLink="/"
                routerDirection="root"
              >
                <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
              </IonButton>
            </IonButtons>

            <IonTitle size="large" className="ion-text-center">
              Settings
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem
            button
            detail={false}
            routerLink="/manage/sellers"
            routerDirection="root"
          >
            <h3>
              <IonLabel>
                <IonIcon icon={bagHandleOutline} />
                &nbsp; Manage Sellers
              </IonLabel>
            </h3>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
