import React from 'react';
import moment from "moment";
import charts from "fusioncharts/fusioncharts.charts";
import FusionCharts from "fusioncharts";
import ReactFusioncharts from "react-fusioncharts";

import { Range } from '../../_helpers/types';
import { useState, useEffect }from 'react';


type Props = {
    range: Range;
};

const SpendPath: React.FC<Props> = (props: Props) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (Object.keys(props.range).length > 0) {
            const dataset: any = [];
            const categories: any = [{category: []}];

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

            console.log(dataset);
            
            for (let index = 1; index < 32; index++) {
                categories[0]['category'].push({label: index.toString()})
            }

            const data = {
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
                categories: categories,
                dataset: dataset,
              };
            setChartData(data);
        }
    }, [props.range])
    
    // Resolves charts dependancy
    charts(FusionCharts);
    
    return (
        <ReactFusioncharts
            type="msline"
            dataFormat="JSON"
            dataSource={chartData}
        />
    );
    
};

export default SpendPath;

