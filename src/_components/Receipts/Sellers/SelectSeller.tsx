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
} from "@ionic/react";
import "./SelectSeller.css";

import React, { useState, useRef, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { addOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { sellerActions } from "../../../_actions/sellerActions";
import { Sellers, Seller, Ref } from "../../../_helpers/types";

type Props = {
  seller: Seller | null;
  sellerOptions: Sellers;
  addReceipt: () => void;
  setParentState: (value: object) => void;
};

const SelectSeller: React.FC<Props> = (props: Props) => {
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
  const [newSeller, setNewSeller] = useState("");
  const [addSellerFocus, setAddSellerFocus] = useState(false);

  const { sellerOptions, addReceipt, setParentState } = props;

  useEffect(() => {
    if (Object.keys(sellerOptions).length === 0) {
      dispatch(sellerActions.getAllSellers());
    }
  }, [dispatch]);

  const addNewSeller = () => {
    if (newSeller) {
      dispatch(sellerActions.addNewSeller(newSeller, sellerOptions));
      blurIonInput(addNewSellerInput);
      setNewSeller("");
    }
  };

  const setSelectedSeller = (id: string) => {
    const sellers = Object.values(sellerOptions).flat(1);
    const selectedSeller = sellers.find((seller) => seller.id === id);

    setParentState({ seller: selectedSeller });
    setSeller(id);
  };

  const handlePan = (e: any) => {
    const X = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    const Y = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    const realTarget = document.elementFromPoint(X, Y);
    if (realTarget !== null) {
      const letter = realTarget.innerHTML;
      if (alpha[letter] !== undefined && alpha[letter].current !== null) {
        alpha[letter].current.scrollIntoView();
      }
    }
  };

  const blurIonInput = (input: Ref) => {
    input.current?.getInputElement().then((element) => {
      element.blur();
    });
    setAddSellerFocus(false);
  };

  const validate = () => {
    setError("");

    if (!seller) {
      setError("seller");
    } else {
      addReceipt();
      history.push("/");
    }
  };

  const listHeight = window.screen.height / 2;
  const addNewSellerInput: Ref = useRef(null);

  return (
    <IonContent className="ion-padding-end">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Sellers:</IonLabel>
              <IonRow style={{ width: "100%" }}>
                <IonCol className="ion-no-padding">
                  <IonInput
                    ref={addNewSellerInput}
                    type="text"
                    value={newSeller}
                    placeholder="Add New Seller"
                    onIonBlur={() => setAddSellerFocus(false)}
                    onIonFocus={() => setAddSellerFocus(true)}
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
            {addSellerFocus && (
              <IonCol size="auto" className="ion-no-padding">
                <IonButton
                  size="default"
                  color="success"
                  onClick={addNewSeller}
                >
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonCol>
            )}
          </IonCol>
        </IonRow>
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
            <IonRadioGroup
              value={seller}
              onIonChange={(e) => setSelectedSeller(e.detail.value)}
            >
              {Object.keys(sellerOptions).length > 0 &&
                Object.keys(sellerOptions).map((letter, i) => {
                  return (
                    <div key={i} className="ion-padding-start">
                      <div className="text" ref={alpha[letter]}>
                        {letter}
                      </div>
                      {sellerOptions[letter].map((seller, i) => {
                        return (
                          <IonItem lines="none" key={i}>
                            <IonLabel className="ion-text-capitalize">
                              {seller.name}
                            </IonLabel>
                            <IonRadio slot="start" value={seller.id} />
                          </IonItem>
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

      <IonRow className="ion-padding-start ion-padding-top">
        <IonCol size="12">
          <IonButton color="success" expand="block" onClick={validate}>
            Save
          </IonButton>
        </IonCol>
        <IonCol size="12">
          <IonButton
            fill="outline"
            color="success"
            expand="block"
            onClick={() => setParentState({ step: "ADD_RECEIPT" })}
          >
            Back
          </IonButton>
        </IonCol>
      </IonRow>
      <br />
    </IonContent>
  );
};

export default SelectSeller;
