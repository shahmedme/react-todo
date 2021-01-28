import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axiosInstance from "../utils/axios";
import Page from "../components/Page";

am4core.useTheme(am4themes_animated);

export default function Timeline() {
	const chart = useRef(null);

	useEffect(() => {
		async function setChart() {
			let res = await axiosInstance.get(
				process.env.REACT_APP_WEBSITE_NAME + "/api/todos"
			);
			let todos = res.data.filter((todo) => todo.status === "completed");

			let data = [];

			for (let i = 1; i < 366; i++) {
				data.push({
					date: new Date(2021, 0, i),
					taskCompleted: (() => {
						let count = 0;
						todos.forEach((todo) => {
							if (
								new Date(2021, 0, i + 1).toISOString().split("T")[0] ===
								todo.range[1]
							) {
								count++;
							}
						});
						return count;
					})(),
				});
			}

			let x = am4core.create("chartdiv", am4charts.XYChart);

			x.data = data;

			x.dateFormatter.inputDateFormat = "yyyy-MM-dd";

			let dateAxis = x.xAxes.push(new am4charts.DateAxis());
			x.yAxes.push(new am4charts.ValueAxis());

			let series = x.series.push(new am4charts.LineSeries());
			series.dataFields.valueY = "taskCompleted";
			series.dataFields.dateX = "date";
			series.tooltipText = "{taskCompleted}";
			series.strokeWidth = 2;
			series.minBulletDistance = 15;

			series.tooltip.background.cornerRadius = 20;
			series.tooltip.background.strokeOpacity = 0;
			series.tooltip.pointerOrientation = "vertical";
			series.tooltip.label.minWidth = 40;
			series.tooltip.label.minHeight = 40;
			series.tooltip.label.textAlign = "middle";
			series.tooltip.label.textValign = "middle";

			let bullet = series.bullets.push(new am4charts.CircleBullet());
			bullet.circle.strokeWidth = 2;
			bullet.circle.radius = 4;
			bullet.circle.fill = am4core.color("#fff");

			let bullethover = bullet.states.create("hover");
			bullethover.properties.scale = 1.3;

			x.cursor = new am4charts.XYCursor();
			x.cursor.behavior = "panXY";
			x.cursor.xAxis = dateAxis;
			x.cursor.snapToSeries = series;

			x.scrollbarY = new am4core.Scrollbar();
			x.scrollbarY.parent = x.leftAxesContainer;
			x.scrollbarY.toBack();

			x.scrollbarX = new am4charts.XYChartScrollbar();
			x.scrollbarX.series.push(series);
			x.scrollbarX.parent = x.bottomAxesContainer;

			// dateAxis.start = 0.1;
			// dateAxis.keepSelection = true;

			chart.current = x;

			return () => {
				x.dispose();
			};
		}

		setChart();
	}, []);

	return (
		<Page>
			<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
		</Page>
	);
}
