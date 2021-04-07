import {
  IonRow,
  IonCol,
  IonItem,
  IonGrid,
  IonPage,
  IonIcon,
  IonTitle,
  IonInput,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonButtons,
} from "@ionic/react";

import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { chevronBackOutline } from "ionicons/icons";
import { sellerActions } from "../../_actions/sellerActions";
import { Seller, Ref } from "../../_helpers/types";

interface Props {
  seller: Seller;
}

const EditSeller: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [seller, setSeller] = useState(props.seller.name);
  const renameInput: Ref = useRef(null);

  useEffect(() => {
    if (Object.keys(props.seller).length === 0) {
      dispatch(sellerActions.getSellerByID(id, history));
    }
  }, []);

  const renameSeller = () => {
    // rename the seller name.
    // check that seller doesn't already exist
  };

  const deleteSeller = () => {
    let answer = window.confirm("Are you sure you want to delete this seller?");

    if (answer) {
      console.log("delete");
    }
  };

  const blurIonInput = () => {
    renameInput.current!.getInputElement().then((element) => {
      element.blur();
    });
  };
  const buttonsMarginTop = window.screen.height / 2;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonButton
              slot="start"
              fill="clear"
              routerLink="/manage/sellers"
              routerDirection="root"
            >
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle size="large" className="ion-text-center">
            Edit Seller
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <br />
                <IonRow style={{ width: "100%" }}>
                  <IonCol className="ion-no-padding ion-text-capitalize">
                    <br />
                    <IonInput
                      ref={renameInput}
                      type="text"
                      value={seller}
                      placeholder="Enter Seller Name"
                      onIonChange={(e) => setSeller(e.detail.value!)}
                      onKeyPress={(e) =>
                        e.key === "Enter" ? blurIonInput() : ""
                      }
                    ></IonInput>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
            <IonCol size="auto" className="ion-text-right ion-margin-top">
              <IonCol size="auto">
                <IonButton
                  size="default"
                  color="success"
                  onClick={renameSeller}
                >
                  Rename
                </IonButton>
              </IonCol>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid style={{ marginTop: buttonsMarginTop }}>
          <IonRow className="ion-padding-horizontal">
            <IonCol size="12">
              <IonButton
                fill="outline"
                color="danger"
                expand="block"
                onClick={deleteSeller}
              >
                Delete Seller
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal ion-padding-top">
            <IonCol size="12">
              <IonButton
                fill="solid"
                color="success"
                expand="block"
                routerLink="/manage/sellers"
                routerDirection="root"
              >
                Back
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <br />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: { sellersReducer: { seller: Seller } }) => {
  return {
    seller: state.sellersReducer.seller,
  };
};

export default connect(mapStateToProps)(EditSeller);
