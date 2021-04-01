import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonIcon,
  IonPage,
  IonLabel,
  IonInput,
  IonTitle,
  IonRadio,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRadioGroup,
} from "@ionic/react";
import "./SelectSeller.css";

import React, { useState, useRef, useEffect } from "react";

import { addOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { receiptActions } from "../../../_actions/receiptActions";
import { Sellers, Seller, Ref } from "../../../_helpers/types";

type Props = {
  seller: Seller;
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

  const dispatch = useDispatch();

  const [newSeller, setNewSeller] = useState("");
  const [addSellerFocus, setAddSellerFocus] = useState(false);
  const { sellerOptions, addReceipt } = props;

  useEffect(() => {
    if (Object.keys(sellerOptions).length === 0) {
      dispatch(receiptActions.getAllSellers());
    }
  }, [dispatch]);

  const addNewSeller = () => {
    if (newSeller) {
      dispatch(receiptActions.addNewSeller(newSeller, sellerOptions));
      blurIonInput(addNewSellerInput);
      setNewSeller("");
    }
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

  const listHeight = window.screen.height / 2;
  const addNewSellerInput: Ref = useRef(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            Select Seller
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <br />
      <IonContent className="ion-padding-end ion-padding-top">
        <div className="wrapper">
          <IonItem className="ion-padding-start">
            <IonRow>
              <IonCol size="12" className="ion-no-padding">
                <IonLabel position="stacked">Sellers:</IonLabel>
              </IonCol>
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
              {addSellerFocus && (
                <IonCol size="auto" className="ion-no-padding">
                  <IonButton color="success" onClick={addNewSeller}>
                    <IonIcon icon={addOutline} />
                  </IonButton>
                </IonCol>
              )}
            </IonRow>
          </IonItem>
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
                value={props.seller}
                onIonChange={(e) =>
                  props.setParentState({ seller: e.detail.value })
                }
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
                              <IonRadio
                                slot="start"
                                value={{ id: seller.id, name: seller.name }}
                              />
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

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              onClick={addReceipt}
              routerLink="/"
              routerDirection="forward"
            >
              Save
            </IonButton>
          </IonCol>
          <IonCol size="12">
            <IonButton
              fill="outline"
              color="success"
              expand="block"
              routerLink="/add"
              routerDirection="back"
            >
              Back
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonContent>
    </IonPage>
  );
};

export default SelectSeller;
