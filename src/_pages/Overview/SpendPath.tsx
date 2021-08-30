import React from 'react';
import moment from 'moment';
import MSArea from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionCharts from "fusioncharts";

import { Range } from '../../_helpers/types';
import { useState, useEffect }from 'react';

ReactFC.fcRoot(FusionCharts, MSArea, FusionTheme);

type Props = {
    range: Range;
};

const SpendPath: React.FC<Props> = (props: Props) => {
    const [chartConfigs, setChartConfigs] = useState({})

    const reload = () => {
        window.location.reload();
    }

    useEffect(() => {
        window.addEventListener("orientationchange", reload);
        return () => {
            window.addEventListener("orientationchange", reload, true);
        }
    }, [])

    useEffect(() => {
        if (Object.keys(props.range).length > 0) {
            const dataset: any = [];
            const categories: any = [];

            Object.keys(props.range).forEach(month => {
                let total = 0;
                let series = { seriesname: month, data: [{}]};

                props.range[month].forEach((spent, day) => {
                    total += spent;
                    series['data'].push({value: total});
                })
                series.data.shift();
                dataset.push(series);
            })

            const currentDay = parseInt(moment(new Date()).format("D"));
            
            for (let index = 1; index <= currentDay; index++) {
                categories.push({label: index.toString()})
            }

            const chartConfigs = {
                type: "msarea", // The chart type
                width: "90%",
                dataFormat: "json", // Data type
                dataSource : {
                    chart: {
                        drawAnchors: 0,
                        caption: "Spend Path (current v. last month)",
                        captionPosition: "left",
                        yaxisname: "Spent",
                        xaxisname: "Day",
                        subcaption: "",
                        numberprefix: "$",
                        drawcrossline: "1",
                        plottooltext: `$label - <b>$dataValue</b>`,
                        tooltipPosition: "top",
                        theme: "fusion"
                    },
                    dataset: dataset,
                    categories: [{category: categories}],
                },
            }
            setChartConfigs(chartConfigs);
        }
    }, [props.range])
    
    return <ReactFC {...chartConfigs} />
};

export default SpendPath;

