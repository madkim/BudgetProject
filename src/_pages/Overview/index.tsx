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

import React from 'react';
import moment from "moment";
import FadeIn from "react-fade-in";
import ReactFC from "react-fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionCharts from "fusioncharts";

import { Days } from '../../_helpers/types';
import { spendingActions } from "../../_actions/spendingActions";
import { useState, useEffect }from 'react';
import { connect, useDispatch } from "react-redux";


ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

type Props = {
    year: Days;
    loading: boolean;
};

const Overview: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        dispatch(spendingActions.getSpentThisYear());
    }, [])

    useEffect(() => {
        if (Object.values(props.year).length > 0) {
            const data: any = [];
            Object.keys(props.year).forEach(month => {
                const mnth = moment().month(month).format("MMM");
                const dataPoint = { label: mnth, value: props.year[month], color: "#2dd36f" }
                data.push(dataPoint);
            })
            setChartData(data);
        }
    }, [props.year])

    // Create a JSON object to store the chart configurations
    const chartConfigs = {
        type: "column2d", // The chart type
        // width: window.screen.width - 25, // Width of the chart
        // height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
        // Chart Configuration
        chart: {
            caption: `Spending Per Month (${moment().format('yyyy')})`,    //Set the chart caption
            captionAlignment: "left",
            subCaption: "",     //Set the chart subcaption
            xAxisName: "Month", //Set the x-axis name
            yAxisName: "Spent", //Set the y-axis name
            numberPrefix: "$",
            theme: "fusion"     //Set the theme for your chart
        },
        data: chartData
        }
    };

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
                <h2>Overview</h2>
            </IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            {props.loading ? null : (
                <>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <ReactFC {...chartConfigs} />
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
    spendingReducer: { year: Days, loading: boolean };
    }) => {
    return {
        year: state.spendingReducer.year,
        loading: state.spendingReducer.loading,
    };
};

export default connect(mapStateToProps)(Overview);

