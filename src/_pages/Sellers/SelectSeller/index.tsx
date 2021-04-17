import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonRadio,
  IonButton,
  IonContent,
  IonRadioGroup,
  IonGrid,
  IonText,
  IonSearchbar,
  IonLoading,
} from "@ionic/react";
import "./SelectSeller.css";

import React, { useState, useRef, useEffect } from "react";

import { useHaptics } from "../../../_hooks/useHaptics";
import { sellerActions } from "../../../_actions/sellerActions";
import { useDispatch, connect } from "react-redux";
import { Sellers, Seller, Ref } from "../../../_helpers/types";
import { addOutline } from "ionicons/icons";

type Props = {
  loading: boolean;
  default: Seller | undefined;
  sellerOptions: Sellers;
  uploadingPhoto: string;
  handleNextText: string;
  stepBack: (() => void) | null;
  handleNext: () => void;
  setParentSeller: (seller: Seller | undefined) => void;
};

const SelectSeller: React.FC<Props> = (props: Props) => {
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

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [seller, setSeller] = useState("");
  const [letter, setLetter] = useState("");
  const [newSeller, setNewSeller] = useState("");
  const [initLoad, setInitLoad] = useState(true);
  const [initLoading, setInitLoading] = useState(false);

  const { impactLight } = useHaptics();
  const { sellerOptions, stepBack, handleNext, setParentSeller } = props;

  useEffect(() => {
    if (Object.keys(sellerOptions).length === 0) {
      dispatch(sellerActions.getAllSellers());
    }
    if (props.default !== undefined) {
      setSeller(props.default.id);
    }
  }, [dispatch, props.default]);

  useEffect(() => {
    if (props.default !== undefined && seller !== "" && initLoad) {
      setInitLoading(true);
      const intervalFunc = () => {
        const sellerPos = document.getElementById(seller);
        if (sellerPos !== null) {
          const topPos = sellerPos.offsetTop;
          document.getElementById("IonSellerList")!.scrollTop = topPos;
          clearInterval(interval);
          setInitLoading(false);
          setInitLoad(false);
        }
      };
      const interval = setInterval(intervalFunc, 1000);
    }
  }, [seller]);

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

  const setSelectedSeller = (id: string) => {
    const sellers = Object.values(sellerOptions).flat(1);
    const selectedSeller = sellers.find((current) => current.id === id);

    setSeller(id);
    setParentSeller(selectedSeller);
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

  const validate = () => {
    setError("");
    if (!seller) {
      setError("seller");
    } else {
      setInitLoad(true);
      handleNext();
    }
  };

  const listHeight = window.screen.height / 2.2;
  const addNewSellerInput: Ref = useRef(null);
  const searchInput: React.Ref<HTMLIonSearchbarElement> = useRef(null);

  return (
    <>
      <IonContent className="ion-padding-end">
        <IonLoading
          isOpen={
            initLoading || props.loading || props.uploadingPhoto === "uploading"
          }
          message={"Please wait..."}
        />
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

            <IonList
              id="IonSellerList"
              style={{ height: listHeight, overflowY: "scroll" }}
            >
              <IonRadioGroup
                value={seller}
                onIonChange={(e) => setSelectedSeller(e.detail.value)}
              >
                {Object.keys(sellerOptions).length > 0 &&
                  Object.keys(sellerOptions)
                    .filter((sellers) =>
                      search !== ""
                        ? sellerOptions[sellers].find((seller) =>
                            seller.name
                              .toLowerCase()
                              .trim()
                              .includes(search.toLowerCase().trim())
                          )
                        : sellers
                    )
                    .map((letter, i) => {
                      return (
                        <div key={i} className="ion-padding-start">
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
                                <IonRow key={i} id={seller.id}>
                                  <IonCol className="ion-no-padding">
                                    <IonItem lines="none">
                                      <IonLabel className="ion-text-capitalize">
                                        {seller.name}
                                      </IonLabel>
                                      <IonRadio
                                        slot="start"
                                        value={seller.id}
                                      />
                                    </IonItem>
                                  </IonCol>
                                </IonRow>
                              );
                            })}
                        </div>
                      );
                    })}
              </IonRadioGroup>
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

        <IonRow className="ion-padding-start ">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              onClick={validate}
              disabled={props.uploadingPhoto === "uploading"}
            >
              {props.handleNextText}
            </IonButton>
          </IonCol>

          {stepBack !== null && (
            <IonCol size="12">
              <IonButton
                fill="outline"
                color="success"
                expand="block"
                onClick={stepBack}
                disabled={props.uploadingPhoto === "uploading"}
              >
                Back
              </IonButton>
            </IonCol>
          )}
        </IonRow>
        <br />
      </IonContent>
    </>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: {
    upload: string;
    loading: boolean;
  };
}) => {
  return {
    loading: state.receiptsReducer.loading,
    uploadingPhoto: state.receiptsReducer.upload,
  };
};

export default connect(mapStateToProps)(SelectSeller);
