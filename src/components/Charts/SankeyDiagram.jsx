import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function SankeyDiagram() {
	useLayoutEffect(() => {
		let x = am4core.create("chartdiv", am4charts.SankeyDiagram);

		x.data = [
			{ from: "A", to: "D", value: 10 },
			{ from: "B", to: "D", value: 8 },
			{ from: "B", to: "E", value: 4 },
			{ from: "C", to: "E", value: 3 },
			{ from: "D", to: "G", value: 5 },
			{ from: "D", to: "I", value: 2 },
			{ from: "D", to: "H", value: 3 },
			{ from: "E", to: "H", value: 6 },
			{ from: "G", to: "J", value: 5 },
			{ from: "I", to: "J", value: 1 },
			{ from: "H", to: "J", value: 9 },
		];

		x.dataFields.fromName = "from";
		x.dataFields.toName = "to";
		x.dataFields.value = "value";

		return () => {
			x.dispose();
		};
	});

	return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
