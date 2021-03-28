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
import { receiptsActions } from "../actions/receiptsActions";
import { Receipts, Tag } from "../helpers/types";
import { Tags } from "./Tags/Tags";

import moment from "moment";
import momentTZ from "moment-timezone";
import SelectTags from "./SelectTags";

interface Props {
  receipts: Receipts;
  tagOptions: Tag[];
}

const AddForm: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const timezone = momentTZ.tz.guess();

  const [date, setDate] = useState(moment(new Date()).format());
  const [time, setTime] = useState(moment(new Date()).format());
  const [tags, setTags] = useState([""]);
  const [price, setPrice] = useState<number | null>(null);
  const [tagOptions, setTagOptions] = useState(props.tagOptions);

  const addTags = (tags: Array<{ val: string; isChecked: boolean }>) => {
    const selectedTags = tags.filter((tag) => tag.isChecked === true);
    setTags(selectedTags.map((a) => a.val));
  };

  const selectTag = (value: string) => {
    const updatedTags = [];
    for (let tag of tagOptions) {
      if (tag.val.toLowerCase() === value.toLowerCase()) {
        updatedTags.push({ val: value, isChecked: !tag.isChecked });
      } else {
        updatedTags.push(tag);
      }
    }
    addTags(updatedTags);
    setTagOptions(updatedTags);
  };

  const addReceipt = () => {
    const this_date = moment(date);
    const this_time = moment(time);

    const dateTime = this_date.set({
      hour: this_time.get("hour"),
      minute: this_time.get("minute"),
      second: 0,
      millisecond: 0,
    });

    dispatch(
      receiptsActions.addNewReceipt(
        dateTime.format(),
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

        {/* <SelectTags
          selectTag={(tag) => selectTag(tag)}
          setTagOptions={setTagOptions}
          tagOptions={tagOptions}
        /> */}

        <Tags
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
  receiptsReducer: { receipts: Receipts; tagOptions: Tag[] };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
    tagOptions: state.receiptsReducer.tagOptions,
  };
};

export default connect(mapStateToProps)(AddForm);
