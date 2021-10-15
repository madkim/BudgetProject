import {
  IonRow,
  IonCol,
  IonPage,
  IonGrid,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
} from "@ionic/react";

import React from "react";
import FadeIn from "react-fade-in";

import { useHistory } from "react-router-dom";

interface Props {
  months: string[];
  loading: boolean;
}

const User: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  const selectUser = (id: number, user: string) => {
    localStorage.setItem('userId', id.toString());
    localStorage.setItem('user', user);
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className='ion-padding'>
          <IonTitle className="ion-text-center">
            <h3>Select User</h3>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {props.loading ? null : (
          <FadeIn>
            <div className="ion-padding">
              <IonGrid>
                <br />
                <IonRow>
                  <IonCol>
                    <IonButton onClick={() => selectUser(1, 'M')} shape="round" size='large' expand='block'>Matthew Kim</IonButton>
                  </IonCol>
                </IonRow>
                <br />
                <IonRow>
                  <IonCol>
                    <IonButton onClick={() => selectUser(2, 'C')} shape="round" size='large' expand='block'>Carmen Chen</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </FadeIn>
        )}
      </IonContent>
    </IonPage>
  );
};

export default User