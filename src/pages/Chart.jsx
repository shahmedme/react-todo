import React, { useRef, useLayoutEffect } from "react";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Page from "../components/Page";

am4core.useTheme(am4themes_animated);

export default function Chart() {
	const chart = useRef(null);

	useLayoutEffect(() => {
		async function setChart() {
			let res = await axios.get(
				process.env.REACT_APP_WEBSITE_NAME + "/api/todos",
				{
					headers: {
						authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			let todos = res.data.filter((todo) => todo.status === "completed");

			let todoData = todos.map((todo) => {
				let diffTime = new Date(todo.range[1]) - new Date(todo.range[0]);

				return {
					title: todo.title,
					duration: diffTime / (1000 * 60 * 60 * 24),
				};
			});

			let x = am4core.create("chartdiv", am4charts.XYChart);

			x.padding(40, 40, 40, 40);

			x.data = todoData;

			let categoryAxis = x.yAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "title";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.minGridDistance = 1;
			categoryAxis.renderer.inversed = true;
			categoryAxis.renderer.grid.template.disabled = true;

			let valueAxis = x.xAxes.push(new am4charts.ValueAxis());
			valueAxis.min = 0;

			let series = x.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryY = "title";
			series.dataFields.valueX = "duration";
			series.tooltipText = "{valueX.value}";
			series.columns.template.strokeOpacity = 0;
			series.columns.template.column.cornerRadiusBottomRight = 5;
			series.columns.template.column.cornerRadiusTopRight = 5;

			let labelBullet = series.bullets.push(new am4charts.LabelBullet());
			labelBullet.label.horizontalCenter = "left";
			labelBullet.label.dx = 10;
			labelBullet.label.text = "{values.valueX.workingValue} days";
			labelBullet.locationX = 1;

			series.columns.template.adapter.add("fill", function (fill, target) {
				return x.colors.getIndex(target.dataItem.index);
			});

			categoryAxis.sortBySeries = series;

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
