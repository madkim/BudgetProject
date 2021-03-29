import {
  IonRow,
  IonCol,
  IonItem,
  IonPage,
  IonGrid,
  IonInput,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonDatetime,
} from "@ionic/react";

import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Receipt, Tag, Tags } from "../helpers/types";
import { receiptsActions } from "../actions/receiptsActions";

import moment from "moment";
import momentTZ from "moment-timezone";
import SelectTags from "./Tags/SelectTags";

interface Props {
  receipts: Receipt[];
  tagOptions: Tags;
}

const AddForm: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const timezone = momentTZ.tz.guess();

  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(moment(new Date()).format());
  const [time, setTime] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);
  const [tagOptions, setTagOptions] = useState(props.tagOptions);

  const addTags = (updatedTags: Tags) => {
    let selectedTags: Tag[] = [];
    Object.keys(updatedTags).map((letter) => {
      selectedTags = [
        ...selectedTags,
        ...updatedTags[letter].filter((tag) => tag.isChecked === true),
      ];
    });
    setTags(selectedTags.map((a) => a.val));
  };

  const selectTag = (value: string) => {
    const updatedTags: Tags = {};

    Object.keys(tagOptions).map((letter: string) => {
      updatedTags[letter] = [];

      tagOptions[letter].map((tagOption) => {
        if (tagOption.val.toLowerCase() === value.toLowerCase()) {
          updatedTags[letter].push({
            val: value,
            isChecked: !tagOption.isChecked,
          });
        } else {
          updatedTags[letter].push(tagOption);
        }
      });
    });
    addTags(updatedTags);
    setTagOptions(updatedTags);
  };

  const addReceipt = () => {
    const mmntDate = moment(date);
    const mmntTime = moment(time);

    const dateTime = mmntDate.set({
      hour: mmntTime.get("hour"),
      minute: mmntTime.get("minute"),
      second: 0,
      millisecond: 0,
    });

    dispatch(
      receiptsActions.addNewReceipt(
        dateTime.toDate(),
        price,
        tags,
        props.receipts
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            Add Item
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end ion-padding-top">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Date</IonLabel>
                <IonDatetime
                  value={date}
                  onIonChange={(e) => setDate(e.detail.value!)}
                  display-timezone={timezone}
                ></IonDatetime>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Time</IonLabel>
                <IonDatetime
                  value={time}
                  displayFormat="h:mm A"
                  onIonChange={(e) => setTime(e.detail.value!)}
                  display-timezone={timezone}
                ></IonDatetime>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Price</IonLabel>
                <IonRow>
                  <IonCol size="auto" style={{ marginTop: "8px" }}>
                    $
                  </IonCol>
                  <IonCol>
                    <IonInput
                      type="number"
                      value={price}
                      placeholder="Enter Price"
                      onIonChange={(e) => setPrice(+e.detail.value!)}
                    ></IonInput>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <br />

        <SelectTags
          selectTag={(tag) => selectTag(tag)}
          setTagOptions={setTagOptions}
          tagOptions={tagOptions}
        />

        <br />

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              onClick={addReceipt}
              routerLink="/"
              routerDirection="back"
            >
              Save
            </IonButton>
          </IonCol>
          <IonCol size="12">
            <IonButton
              fill="outline"
              color="success"
              expand="block"
              routerLink="/"
              routerDirection="back"
            >
              Delete
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipt[]; tagOptions: Tags };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
    tagOptions: state.receiptsReducer.tagOptions,
  };
};

export default connect(mapStateToProps)(AddForm);
