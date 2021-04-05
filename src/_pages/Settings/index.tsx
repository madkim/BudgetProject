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
  IonModal,
} from "@ionic/react";

import React, { useState } from "react";
import ManageSellers from "./ManageSellers";
import { chevronForwardOutline, bagHandleOutline } from "ionicons/icons";

type Props = {
  setShowModal: (value: boolean) => void;
};

const Settings: React.FC<Props> = (props: Props) => {
  const [showManageSellersModal, setShowManageSellersModal] = useState(false);

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
              onClick={() => props.setShowModal(false)}
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
            onClick={() => setShowManageSellersModal(true)}
          >
            <h3>
              <IonLabel>
                <IonIcon icon={bagHandleOutline} />
                &nbsp; Manage Sellers
              </IonLabel>
            </h3>
          </IonItem>
        </IonList>

        <IonModal isOpen={showManageSellersModal}>
          <ManageSellers setShowModal={setShowManageSellersModal} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
