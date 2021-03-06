import {
  IonRow,
  IonCol,
  IonItem,
  IonGrid,
  IonPage,
  IonIcon,
  IonText,
  IonTitle,
  IonInput,
  IonHeader,
  IonButton,
  IonLoading,
  IonContent,
  IonToolbar,
  IonButtons,
} from "@ionic/react";

import React, { useState, useEffect, useRef } from "react";
import { sellerActions } from "../../../_actions/sellerActions";
import { chevronBackOutline } from "ionicons/icons";
import { Seller, Sellers, Ref } from "../../../_helpers/types";
import { useDispatch, connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

interface Props {
  seller: Seller;
  sellers: Sellers;
  loading: boolean;
}

const EditSeller: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const renameInput: Ref = useRef(null);

  const [error, setError] = useState("");
  const [seller, setSeller] = useState(props.seller.name);
  const [isFavorite, setIsFavorite] = useState(props.seller.favorite);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (Object.keys(props.seller).length === 0) {
      dispatch(sellerActions.getSellerByID(id, history, setSeller));
    }
    if (Object.keys(props.sellers).length === 0) {
      dispatch(sellerActions.getAllSellers());
    }
  }, []);

  const renameSeller = () => {
    setError("");
    const { sellers } = props;
    const sellerList = Object.values(sellers).flat(1);

    if (
      sellerList.find(
        (current) =>
          current.name.toLowerCase().trim() === seller.toLowerCase().trim()
      )
    ) {
      setError("sellerExists");
    } else {
      dispatch(sellerActions.renameSeller(props.seller.id, seller));
    }
  };

  const deleteSeller = () => {
    let answer = window.confirm("Are you sure you want to delete this seller?");

    if (answer) {
      dispatch(sellerActions.deleteSeller(props.seller.id, history));
    }
  };

  const favoriteSeller = (id: string, current: boolean) => {
    dispatch(sellerActions.setFavoriteSeller(id, isFavorite));
    setIsFavorite(!isFavorite);
  };

  const blurIonInput = () => {
    renameInput.current!.getInputElement().then((element) => {
      element.blur();
    });
  };
  const buttonsMarginTop = window.screen.height / 1.9;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding-top">
          <IonButtons slot="start">
            <IonButton
              slot="start"
              fill="clear"
              routerLink="/manage/sellers"
              routerDirection="back"
            >
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center">
            <h2>Edit Seller</h2>
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
          {error === "sellerExists" && (
            <IonText color="danger">
              <span className="ion-margin ion-padding">
                A seller with this name already exists.
              </span>
            </IonText>
          )}
        </IonGrid>

        <IonLoading isOpen={props.loading} message={"Please wait..."} />

        <IonGrid style={{ marginTop: buttonsMarginTop }}>
          <IonRow className="ion-padding-horizontal">
            <IonCol size="9">
              <IonButton
                fill="outline"
                color="danger"
                expand="block"
                onClick={deleteSeller}
              >
                Delete Seller
              </IonButton>
            </IonCol>
            <IonCol size="3">
              <IonButton
                fill="outline"
                color={isFavorite ? "warning" : "medium"}
                expand="block"
                onClick={() => {
                  favoriteSeller(props.seller.id, props.seller.favorite);
                }}
              >
                {isFavorite ? <>&#9733;</> : <>&#9734;</>}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal">
            <IonCol size="12">
              <IonButton
                fill="solid"
                color="success"
                expand="block"
                routerLink="/manage/sellers"
                routerDirection="back"
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

const mapStateToProps = (state: {
  sellersReducer: {
    seller: Seller;
    sellerOptions: Sellers;
    loading: boolean;
  };
}) => {
  return {
    seller: state.sellersReducer.seller,
    sellers: state.sellersReducer.sellerOptions,
    loading: state.sellersReducer.loading,
  };
};

export default connect(mapStateToProps)(EditSeller);
