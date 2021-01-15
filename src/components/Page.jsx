import React from "react";
import Navbar from "./Navbar";

export default function Page(props) {
	return (
		<>
			<Navbar />
			{props.children}
		</>
	);
}
