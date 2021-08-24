import React from 'react';
import moment from "moment";
import ReactFC from "react-fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionCharts from "fusioncharts";

import { Days } from '../../_helpers/types';
import { useState, useEffect }from 'react';


ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

type Props = {
    year: Days;
};

const YearlySpending: React.FC<Props> = (props: Props) => {
    const [chartData, setChartData] = useState([]);

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

    return <ReactFC {...chartConfigs} />
};

export default YearlySpending;

