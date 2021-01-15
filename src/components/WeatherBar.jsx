import React, { Component } from "react";
import axios from "axios";

export default class WeatherBar extends Component {
	state = {
		weatherData: null,
	};

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=5d73ea722c0a00193134a92a6bdbc07d`
				)
				.then((res) => {
					this.setState({
						weatherData: res.data,
					});
				})
				.catch((err) => console.log(err));
		});
	}

	getWeatherBar = () => (
		<div>
			{this.state.weatherData.weather[0].main} - {this.state.weatherData.name},{" "}
			{this.state.weatherData.sys.country}
		</div>
	);

	render() {
		return (
			<div className="wrapper">
				{this.state.weatherData != null ? this.getWeatherBar() : null}

				<style jsx>{`
					.wrapper {
						position: fixed;
						bottom: 20px;
						left: 50%;
						transform: translateX(-50%);
					}
				`}</style>
			</div>
		);
	}
}
