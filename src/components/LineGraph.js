import React, { useState, useEffect } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false, 
    }, 
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRation: false,
    tooltips: {
        mode: "index", 
        intersect: false, 
        callbacks: {
            label: function (tooltipItem, data){
                return numeral(tooltipItem.value).format("+0.0");
            }
        }
    }, 
}

function LineGraph({ casesType = 'cases'}) {

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
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                    .then(response => response.json())
                    .then(data => {
                        setData(buildChartData(data));
                    });
        }
        fetchData();

    }, [casesType]);

    return (
        <div>
            {data?.length > 0 && (
                <Line 
                    options={options}
                    data= {{
                        datasets: [{
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1035",
                            data: data
                        }]
                    }}
                />
            )}
            
        </div>
    )
}

export default LineGraph