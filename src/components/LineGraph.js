import React, { useState, useEffect } from 'react'
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';


ChartJS.register(CategoryScale);


function LineGraph() {

    const [ data, setData ] = useState({});

    const buildChartData = (data, casesType='cases') =>{
        const chartData = [];
        let lastDataPoint;
        for(let element in data[casesType]) {
            if(lastDataPoint){
                const newDataPoint = {
                    x: element,
                    y: data[casesType][element] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][element];
        }
        return chartData;
    }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
            setData(buildChartData(data));
        });
    }, []);

    return (
        <div>
            <h1>Im a graph</h1>
            <Line 
                datasetIdKey='id'
                data={{
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, 0.8)",
                        borderColor: "#CC1034", 
                        data: data
                    }]
                }}
            />
        </div>
    )
}

export default LineGraph