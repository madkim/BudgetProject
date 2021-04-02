import {
  IonFab,
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonLoading,
  IonFabButton,
} from "@ionic/react";
import ListReceipts from "./ListReceipts";

import React, { useEffect } from "react";
import { add, filterOutline, settingsOutline } from "ionicons/icons";

import { connect, useDispatch } from "react-redux";
import { receiptActions } from "../../_actions/receiptActions";
import { Receipt } from "../../_helpers/types";

interface Props {
  receipts: Receipt[];
}

const Receipts: React.FC<Props> = (props: { receipts: Receipt[] }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiptActions.getAllReceipts());
  }, [dispatch]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="success">
            <IonButton slot="start" fill="clear">
              <IonIcon icon={settingsOutline} style={{ color: "white" }} />
            </IonButton>
            <IonTitle size="large" className="ion-text-center">
              💰 M👀LA&nbsp;
            </IonTitle>
            <IonButton slot="end" fill="clear">
              <IonIcon icon={filterOutline} style={{ color: "white" }} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="success" routerLink="/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonLoading
          isOpen={props.receipts && props.receipts.length === 0}
          message={"Please wait..."}
        />

        <ListReceipts receipts={props.receipts} />
        
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipt[] };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(Receipts);
