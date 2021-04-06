import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonGrid,
  IonText,
  IonTitle,
  IonLabel,
  IonInput,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonPage,
} from "@ionic/react";
import "./ManageSellers.css";

import React, { useState, useRef, useEffect } from "react";

import { useHaptics } from "../../_hooks/useHaptics";
import { useHistory } from "react-router-dom";
import { addOutline } from "ionicons/icons";
import { sellerActions } from "../../_actions/sellerActions";
import { Sellers, Seller, Ref } from "../../_helpers/types";
import { useDispatch, connect } from "react-redux";

type Props = {
  sellerOptions: Sellers;
  setShowModal: (value: boolean) => void;
};

const ManageSellers: React.FC<Props> = (props: Props) => {
  const alpha: any = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    E: useRef(null),
    F: useRef(null),
    G: useRef(null),
    H: useRef(null),
    I: useRef(null),
    J: useRef(null),
    K: useRef(null),
    L: useRef(null),
    M: useRef(null),
    N: useRef(null),
    O: useRef(null),
    P: useRef(null),
    Q: useRef(null),
    R: useRef(null),
    S: useRef(null),
    T: useRef(null),
    U: useRef(null),
    V: useRef(null),
    W: useRef(null),
    X: useRef(null),
    Y: useRef(null),
    Z: useRef(null),
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [seller, setSeller] = useState("");
  const [letter, setLetter] = useState("");
  const [newSeller, setNewSeller] = useState("");

  const { impactLight } = useHaptics();
  const { sellerOptions } = props;

  useEffect(() => {
    if (Object.keys(sellerOptions).length === 0) {
      dispatch(sellerActions.getAllSellers());
    }
  }, [dispatch]);

  const addNewSeller = () => {
    if (newSeller) {
      setError("");
      dispatch(sellerActions.addNewSeller(newSeller, sellerOptions));
      blurIonInput(addNewSellerInput);
      setNewSeller("");
    } else {
      setError("newSeller");
    }
  };

  const setSelectedSeller = (id: string) => {
    // const sellers = Object.values(sellerOptions).flat(1);
    // const selectedSeller = sellers.find((current) => current.id === id);
    // setSeller(id);
    // setParentSeller(selectedSeller);
  };

  const handlePan = (e: any) => {
    const X = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    const Y = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    const realTarget = document.elementFromPoint(X, Y);
    if (realTarget !== null) {
      const current = realTarget.innerHTML;
      if (current !== letter) {
        setLetter(current);
        if (alpha[current] !== undefined && alpha[current].current !== null) {
          impactLight();
          alpha[current].current.scrollIntoView();
        }
      }
    }
  };

  const blurIonInput = (input: Ref) => {
    input.current?.getInputElement().then((element) => {
      element.blur();
    });
  };

  const listHeight = window.screen.height / 1.8;
  const addNewSellerInput: Ref = useRef(null);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle size="large" className="ion-text-center">
              Manage Sellers
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <br />
                <IonRow style={{ width: "100%" }}>
                  <IonCol className="ion-no-padding">
                    <br />
                    <IonInput
                      ref={addNewSellerInput}
                      type="text"
                      value={newSeller}
                      placeholder="Add New Seller"
                      onIonChange={(e) => setNewSeller(e.detail.value!)}
                      onKeyPress={(e) =>
                        e.key === "Enter" ? blurIonInput(addNewSellerInput) : ""
                      }
                    ></IonInput>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
            <IonCol size="auto" className="ion-text-right ion-margin-top">
              <IonCol size="auto" className="ion-no-padding">
                <IonButton
                  size="default"
                  color="success"
                  onClick={addNewSeller}
                >
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonCol>
            </IonCol>
          </IonRow>
          {error === "newSeller" && (
            <IonText color="danger">
              <span className="ion-margin ion-padding">
                Please add a seller name.
              </span>
            </IonText>
          )}
        </IonGrid>
        <div className="wrapper">
          <div className="container js-abc ion-padding-start">
            <div style={{ touchAction: "none" }}>
              <ul
                id="alphaList"
                onTouchMove={handlePan}
                className="abc js-abc-nav"
                style={{ height: listHeight }}
              >
                {Object.keys(alpha).map((letter) => {
                  if (Object.keys(sellerOptions).includes(letter)) {
                    return (
                      <small key={letter}>
                        <li>{letter}</li>
                      </small>
                    );
                  }
                })}
              </ul>
            </div>

            <IonList style={{ height: listHeight, overflowY: "scroll" }}>
              {Object.keys(sellerOptions).length > 0 &&
                Object.keys(sellerOptions).map((letter, i) => {
                  return (
                    <div key={i} className="ion-padding-horizontal">
                      <div className="text" ref={alpha[letter]}>
                        {letter}
                      </div>
                      {sellerOptions[letter].map((seller, i) => {
                        return (
                          <IonItem
                            button
                            lines="none"
                            detail={true}
                            key={i}
                            className="ion-padding-end"
                          >
                            <h5>
                              <IonLabel className="ion-text-capitalize">
                                {seller.name}
                              </IonLabel>
                            </h5>
                          </IonItem>
                        );
                      })}
                    </div>
                  );
                })}
            </IonList>
          </div>
        </div>

        <br />

        {error === "seller" && (
          <IonText color="danger">
            <span className="ion-margin ion-padding">
              Please select a seller.
            </span>
          </IonText>
        )}

        <IonRow className="ion-padding-horizontal ion-padding-top">
          <IonCol size="12">
            <IonButton
              fill="solid"
              color="success"
              expand="block"
              routerLink="/settings"
              routerDirection="root"
            >
              Done
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  sellersReducer: { sellerOptions: Sellers };
}) => {
  return {
    sellerOptions: state.sellersReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(ManageSellers);
