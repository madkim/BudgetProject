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
} from "@ionic/react";

import React from "react";
import { chevronForwardOutline, bagHandleOutline } from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle size="large" className="ion-text-center">
              Settings
            </IonTitle>

            <IonButton
              slot="end"
              fill="clear"
              routerLink="/"
              routerDirection="root"
            >
              <IonIcon
                icon={chevronForwardOutline}
                style={{ color: "white" }}
              />
            </IonButton>
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
