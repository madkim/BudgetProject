import {
  IonFab,
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonFabButton,
  IonButton,
} from "@ionic/react";
import ListView from "../components/ListView";

import React, { useEffect } from "react";
import { add, filterOutline, settingsOutline } from "ionicons/icons";

import { connect, useDispatch } from "react-redux";
import { receiptsActions } from "../actions/receiptsActions";
import { Receipts } from "../helpers/types";

interface Props {
  receipts: Receipts;
}

const Home: React.FC<Props> = (props: { receipts: Receipts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiptsActions.getAllReceipts());
    dispatch(receiptsActions.getAllTags());
  }, []);

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

        <ListView receipts={props.receipts} />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipts };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(Home);
