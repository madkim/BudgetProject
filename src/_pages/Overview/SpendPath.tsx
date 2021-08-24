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
            const categories: any = [{category: [{}]}];

            Object.keys(props.range).forEach(month => {
                let total = 0;
                let series = { seriesname: month, data: [{}]};

                props.range[month].forEach((spent, day) => {
                    total += spent;
                    series['data'].push({value: total});
                    categories[0]['category'].push({label: day.toString()})
                })
                dataset.push(series);
            })

            const data = {
                chart: {
                  caption: "Spend Path (current v. last month)",
                  captionPosition: "left",
                  yaxisname: "Spent",
                  xaxisname: "Day",
                  subcaption: "",
                  showhovereffect: "1",
                  numberprefix: "$",
                  drawcrossline: "1",
                  plottooltext: "You  $seriesName",
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

