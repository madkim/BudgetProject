import {
IonRow,
IonCol,
IonPage,
IonGrid,
IonIcon,
IonItem,
IonList,
IonNote,
IonLabel,
IonTitle,
IonHeader,
IonButton,
IonButtons,
IonContent,
IonToolbar,
IonListHeader,
IonDatetime,
} from "@ionic/react";

import { chevronBackOutline } from "ionicons/icons";

import moment from 'moment';
import SpendPath from './SpendPath';
import YearlySpending from "./YearlySpending";

import { Days, Range } from '../../_helpers/types';
import { spendingActions } from "../../_actions/spendingActions";
import { useState, useEffect }from 'react';
import { connect, useDispatch } from "react-redux";

type Props = {
    year: Days;
    range: Range;
    loading: boolean;
};

const Overview: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const start = moment(new Date()).subtract(1,'months').startOf('month').format('YYYY-MM-DD');
        const end = moment(new Date()).endOf('month').format('YYYY-MM-DD');

        dispatch(spendingActions.getSpentThisYear());
        dispatch(spendingActions.getSpentRange(start, end));
    }, [])

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar color="success">
            <IonButtons slot="start" className='ion-padding'>
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
                <h2>My Overview</h2>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
            {props.loading ? null : (
                <>
                    <IonGrid className="ion-text-center">
                        <IonRow>
                            <IonCol>
                                <YearlySpending year={props.year}/>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <SpendPath range={props.range}/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </>
            )}
        </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state: {
    spendingReducer: { year: Days, range: Range, loading: boolean };
    }) => {
        return {
        year: state.spendingReducer.year,
        range: state.spendingReducer.range,
        loading: state.spendingReducer.loading,
    };
};

export default connect(mapStateToProps)(Overview);

