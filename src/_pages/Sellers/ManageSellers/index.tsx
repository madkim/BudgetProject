import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonPage,
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
  IonButtons,
  IonSpinner,
  IonSearchbar,
  IonCardTitle,
} from "@ionic/react";

import {
  star,
  addOutline,
  starOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from "ionicons/icons";

import React, { useState, useRef, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useHaptics } from "../../../_hooks/useHaptics";
import { Sellers, Ref } from "../../../_helpers/types";
import { sellerActions } from "../../../_actions/sellerActions";
import { useDispatch, connect } from "react-redux";

import "./ManageSellers.css";

type Props = {
  loading: boolean;
  sellerOptions: Sellers;
  setShowModal: (value: boolean) => void;
};

const ManageSellers: React.FC<Props> = (props: Props) => {
  const alpha: any = {
    "*": useRef(null),
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
    "#": useRef(null),
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("");
  const [clicked, setClicked] = useState("");
  const [newSeller, setNewSeller] = useState("");

  const { impactLight } = useHaptics();
  const { sellerOptions } = props;

  useEffect(() => {
    if (Object.keys(sellerOptions).length === 0) {
      dispatch(sellerActions.getAllSellers());
    }
  }, [dispatch]);

  const addNewSeller = () => {
    setError("");
    if (newSeller) {
      if (nameUnique(newSeller)) {
        dispatch(sellerActions.addNewSeller(newSeller, sellerOptions));
        blurIonInput(addNewSellerInput);
        setNewSeller("");
      } else {
        setError("sellerExists");
      }
    } else {
      setError("newSeller");
    }
  };

  const nameUnique = (newSeller: string) => {
    const sellerList = Object.values(sellerOptions).flat(1);

    return sellerList.find(
      (current) =>
        current.name.toLowerCase().trim() === newSeller.toLowerCase().trim()
    )
      ? false
      : true;
  };

  const handlePan = (e: any) => {
    const X = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    const Y = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    const realTarget = document.elementFromPoint(X, Y);
    if (realTarget !== null) {
      const target = realTarget;
      const current = target.className === "*" ? "*" : target.innerHTML;
      if (current !== letter) {
        setLetter(current);
        if (alpha[current] !== undefined && alpha[current].current !== null) {
          impactLight();
          alpha[current].current.scrollIntoView();
        }
      }
    }
  };

  const blurIonInput = (input: any) => {
    input.current?.getInputElement().then((element: typeof input) => {
      element.blur();
    });
  };

  const editSeller = (id: string) => {
    setClicked(id);
    dispatch(sellerActions.getSellerByID(id, history));
  };

  const listHeight = window.screen.height / 2;
  const addNewSellerInput: Ref = useRef(null);
  const searchInput: React.Ref<HTMLIonSearchbarElement> = useRef(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding-top">
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
          <IonTitle className="ion-text-center">
            <h2>Manage Sellers</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end">
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

          <IonText color="danger">
            {error === "newSeller" && (
              <span className="ion-margin ion-padding">
                Please add a seller name.
              </span>
            )}
            {error === "sellerExists" && (
              <span className="ion-margin ion-padding">
                A seller with this name already exists.
              </span>
            )}
          </IonText>
        </IonGrid>

        <div className="wrapper">
          <div className="ion-padding-horizontal">
            <IonSearchbar
              ref={searchInput}
              value={search}
              onIonChange={(e) => setSearch(e.detail.value!)}
              onKeyPress={(e) =>
                e.key === "Enter" ? blurIonInput(searchInput) : ""
              }
              showCancelButton="never"
            ></IonSearchbar>
          </div>
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
                        {letter === "*" ? (
                          <li className="*" style={{ color: "#ffc409" }}>
                            &#9733;
                          </li>
                        ) : (
                          <li>{letter}</li>
                        )}
                      </small>
                    );
                  }
                })}
              </ul>
            </div>

            <IonList style={{ height: listHeight, overflowY: "scroll" }}>
              {Object.keys(sellerOptions).length > 0 &&
                Object.keys(sellerOptions)
                  .filter((seller) =>
                    search !== ""
                      ? seller.charAt(0).toLowerCase() ===
                        search.charAt(0).toLowerCase()
                      : seller
                  )
                  .map((letter, i) => {
                    return (
                      <div key={i} className="ion-padding-horizontal">
                        <div className="text" ref={alpha[letter]}>
                          {letter === "*" ? (
                            <li style={{ color: "#ffc409" }}>&#9733;</li>
                          ) : (
                            <li>{letter}</li>
                          )}
                        </div>
                        {sellerOptions[letter]
                          .filter((seller) =>
                            seller.name
                              .toLowerCase()
                              .trim()
                              .includes(search.toLowerCase().trim())
                          )
                          .map((seller, i) => {
                            return (
                              <IonItem
                                key={i}
                                button
                                lines="none"
                                detail={false}
                              >
                                <IonButton
                                  fill="clear"
                                  className="ion-no-padding"
                                >
                                  <IonIcon
                                    icon={seller.favorite ? star : starOutline}
                                  />
                                </IonButton>

                                <IonRow
                                  style={{ width: "100%", height: "7vh" }}
                                  onClick={() => editSeller(seller.id)}
                                  className="ion-padding"
                                >
                                  <IonCol size="10">
                                    <IonLabel className="ion-text-capitalize">
                                      {seller.name}
                                    </IonLabel>
                                  </IonCol>
                                  <IonCol size="2">
                                    {props.loading && clicked === seller.id ? (
                                      <IonSpinner name="lines-small" />
                                    ) : (
                                      <IonIcon
                                        color="medium"
                                        icon={chevronForwardOutline}
                                      />
                                    )}
                                  </IonCol>
                                </IonRow>
                              </IonItem>
                            );
                          })}
                      </div>
                    );
                  })}
            </IonList>
          </div>
        </div>

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              fill="solid"
              color="success"
              expand="block"
              routerLink="/"
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
  sellersReducer: { sellerOptions: Sellers; loading: boolean };
}) => {
  return {
    loading: state.sellersReducer.loading,
    sellerOptions: state.sellersReducer.sellerOptions,
  };
};

export default connect(mapStateToProps)(ManageSellers);
