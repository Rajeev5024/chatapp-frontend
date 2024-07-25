import React from 'react'
import {Doughnut, Line}  from "react-chartjs-2"

import {
	Chart as ChartsJS, 
	ArcElement, 
	CategoryScale, 
	Filler, 
	Legend, 
	LinearScale, 
	LineElement, 
	PointElement, 
	Tooltip,
	plugins,
	} from "chart.js"

import {  lightorange, lightpurple, orange, purple } from '../../constants/color';
import { getLast7Days } from '../../lib/features';


ChartsJS.register(
	Tooltip,
	CategoryScale, 
	Filler, 
	LinearScale, 
	LineElement, 
	PointElement, 
	ArcElement, 
	Legend, 
);

const labels=getLast7Days();

const lineChartOptions = {
	responsive: true,
	plugins: {
	  legend: {
		display: false,
	  },
	  title: {
		display: false,
	  },
	},
  
	scales: {
	  x: {
		grid: {
		  display: false,
		},
	  },
	  y: {
		beginAtZero: true,
		grid: {
		  display: false,
		},
	  },
	},
  };
const LineChart = ({value=[]}) => {
	const data={
		labels,
		datasets:[
			
		{
			data:value,
			label:"messages",
			fill:true,
			backgroundColor:lightpurple,
			borderColor:purple,
		},
	]
	}
  return (
	<Line data={data} options={lineChartOptions}/>
  )
}

const doughnutChartOptions={
	responsive:true,
	plugins:{
		legend:{
			display:false,
		},
		title:{
			display:false,
		},
	},
	cutout:100,
}

const DoughnutChart = ({value=[],labels=[]}) => {
	const data = {
        labels, // Example labels, replace with actual labels
        datasets: [
            {
                data: value, // Example data, replace with actual data
                backgroundColor: [lightorange, lightpurple],
				hoverBackgroundColor:[orange,purple],
                borderColor:[orange,purple],
				offset:10,
            },
        ],
    };


	return (
	<Doughnut 
	style={{zIndex:10}}
	data={data} 
	options={doughnutChartOptions}/>
	);
  }

export {LineChart,DoughnutChart}