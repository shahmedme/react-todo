import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function RadarChart() {
	useLayoutEffect(() => {
		let x = am4core.create("chartdiv", am4charts.RadarChart);

		x.data = [
			{
				country: "Lithuania",
				litres: 501,
			},
			{
				country: "Czech Republic",
				litres: 301,
			},
			{
				country: "Ireland",
				litres: 266,
			},
			{
				country: "Germany",
				litres: 165,
			},
			{
				country: "Australia",
				litres: 139,
			},
			{
				country: "Austria",
				litres: 336,
			},
			{
				country: "UK",
				litres: 290,
			},
			{
				country: "Belgium",
				litres: 325,
			},
			{
				country: "The Netherlands",
				litres: 40,
			},
		];

		let categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "country";
		x.yAxes.push(new am4charts.ValueAxis());

		let series = x.series.push(new am4charts.RadarSeries());
		series.dataFields.valueY = "litres";
		series.dataFields.categoryX = "country";
		series.name = "Sales";
		series.strokeWidth = 3;
		series.zIndex = 2;

		let series2 = x.series.push(new am4charts.RadarColumnSeries());
		series2.dataFields.valueY = "units";
		series2.dataFields.categoryX = "country";
		series2.name = "Units";
		series2.strokeWidth = 0;
		series2.columns.template.fill = am4core.color("#CDA2AB");
		series2.columns.template.tooltipText =
			"Series: {name}\nCategory: {categoryX}\nValue: {valueY}";

		return () => {
			x.dispose();
		};
	}, []);

	return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
