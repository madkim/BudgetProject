import {
  IonRow,
  IonCol,
  IonItem,
  IonNote,
  IonText,
  IonCard,
  IonInput,
  IonRange,
  IonLabel,
  IonModal,
  IonTitle,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import React, { useState, useRef, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Ref, Saving } from "../../../_helpers/types";
import { budgetActions } from "../../../_actions/budgetActions";

import "./SavingsModal.css";

interface Props {
  show: boolean;
  difference: number;
  budgetSavings: Saving;
  setShow: (value: boolean) => void;
}

export default function SavingsModal({
  show,
  setShow,
  difference,
  budgetSavings,
}: Props): ReactElement {
  const [type, setType] = useState(
    budgetSavings.type ? budgetSavings.type : "value"
  );
  const [savings, setSavings] = useState(
    budgetSavings.type === "value" ? budgetSavings.amount : 0
  );
  const [savingsPercent, setSavingsPercent] = useState(
    budgetSavings.type === "percent"
      ? (budgetSavings.amount / difference) * 100
      : 0
  );

  const [error, setError] = useState("");
  const [savingsInputFocus, setSavingsInputFocus] = useState(false);
  const savingsInput: Ref = useRef(null);
  const dispatch = useDispatch();

  const calculateSavings = () => {
    if (type === "value") {
      return savings;
    } else if (type === "percent") {
      return difference * (savingsPercent / 100);
    }
  };

  const selectInputType = (value: string) => {
    if (value === "value") {
      setSavingsPercent(0);
    } else {
      setSavings(0);
    }
    setType(value);
  };

  const blurIonInput = () => {
    savingsInput.current?.getInputElement().then((element) => {
      element.blur();
    });
    setSavingsInputFocus(false);
  };

  const validate = () => {
    if (type === "value" && savings > difference) {
      setError("savings");
      return false;
    } else return true;
  };

  const save = () => {
    if (validate()) {
      const setSavingsValue =
        type === "value" ? savings : difference * (savingsPercent / 100);
      dispatch(budgetActions.setSavings(setSavingsValue, type, budgetSavings));
      setShow(false);
    }
  };

  return (
    <IonModal isOpen={show}>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding-vertical">
          <IonTitle className="ion-text-center">
            <h2>Adjust Savings</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonItem lines="none">
            <IonRow style={{ width: "100%" }}>
              <IonCol size="6">
                <h2>Difference</h2>
              </IonCol>
              <IonCol size="5">
                <IonNote color="dark">
                  <h2>&nbsp;&nbsp;${difference}</h2>
                </IonNote>
              </IonCol>
            </IonRow>
          </IonItem>

          <IonItem lines="none">
            <IonRow style={{ width: "100%" }}>
              <IonCol size="6">
                <h2>Savings</h2>
              </IonCol>
              <IonCol size="5">
                <IonNote color="primary">
                  <h2>&nbsp;&nbsp;${calculateSavings()}</h2>
                </IonNote>
              </IonCol>
            </IonRow>
          </IonItem>

          <IonItem lines="none">
            <IonRow style={{ width: "100%" }}>
              <IonCol size="6">
                <h2>Spending</h2>
              </IonCol>
              <IonCol size="6">
                <IonNote color="dark">
                  <h2 className="ion-padding-end ">
                    &nbsp;&nbsp;$
                    {difference - calculateSavings()!}
                  </h2>
                </IonNote>
              </IonCol>
            </IonRow>
          </IonItem>
        </IonCard>

        <IonCard className="ion-padding-vertical">
          <div className="ion-padding">
            <IonSegment
              value={type}
              onIonChange={(e) => selectInputType(e.detail.value!)}
            >
              <IonSegmentButton value="value" style={{ fontSize: "medium" }}>
                <IonLabel>Value</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="percent" style={{ fontSize: "medium" }}>
                <IonLabel>Percentage</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {type === "value" && (
              <>
                <IonRow className="ion-margin-top">
                  <IonCol>
                    <IonItem>
                      <IonRow style={{ width: "100%" }}>
                        <IonCol size="auto" style={{ marginTop: "8px" }}>
                          $
                        </IonCol>

                        <IonCol>
                          <IonInput
                            type="tel"
                            inputmode="decimal"
                            placeholder="Enter Savings Amount"
                            ref={savingsInput}
                            value={savings}
                            maxlength={difference.toString().length}
                            onIonBlur={() => setSavingsInputFocus(false)}
                            onIonFocus={() => setSavingsInputFocus(true)}
                            onKeyPress={(e) =>
                              e.key === "Enter" ? blurIonInput() : ""
                            }
                            onIonChange={(e) => {
                              setError("");
                              setSavings(+e.detail.value!);
                            }}
                          ></IonInput>
                        </IonCol>
                      </IonRow>
                    </IonItem>
                  </IonCol>
                  <IonCol size="auto" className="ion-text-right ">
                    {savingsInputFocus && (
                      <IonButton
                        size="default"
                        color="success"
                        onClick={() => blurIonInput()}
                      >
                        Done
                      </IonButton>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    {error === "savings" && (
                      <IonText color="danger">
                        <span className="ion-margin">
                          Savings must not exceed Difference.
                        </span>
                      </IonText>
                    )}
                  </IonCol>
                </IonRow>
              </>
            )}

            {type === "percent" && (
              <>
                <br />
                <IonRow className="ion-padding-top">
                  <IonCol className="ion-padding-top">
                    <IonRange
                      min={0}
                      max={100}
                      pin={true}
                      step={25}
                      snaps={true}
                      value={savingsPercent}
                      color="secondary"
                      className="ion-no-padding"
                      onIonChange={(e) =>
                        setSavingsPercent(e.detail.value as number)
                      }
                    >
                      <IonLabel
                        slot="start"
                        className="ion-padding-end ion-text-center"
                      >
                        0%
                        <br />
                        Savings
                      </IonLabel>
                      <IonLabel
                        slot="end"
                        className="ion-padding-start ion-text-center"
                      >
                        100%
                        <br />
                        Savings
                      </IonLabel>
                    </IonRange>
                  </IonCol>
                </IonRow>
              </>
            )}
          </div>
        </IonCard>

        <div className="ion-padding">
          <IonRow>
            <IonCol>
              <IonButton
                fill="solid"
                color="success"
                expand="block"
                onClick={save}
              >
                Save
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                fill="outline"
                color="success"
                expand="block"
                onClick={() => {
                  setShow(false);
                }}
              >
                Back
              </IonButton>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
    </IonModal>
  );
}
