import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Inner from "./Inner";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	var wrapperClass = classNames({
		wrapper: true,
		open: isOpen,
	});

	var menuBtn = classNames({
		"menu-btn": true,
		open: isOpen,
	});

	return (
		<>
			<h1 className="text-center text-4xl font-bold mt-10">
				<Link to="/">TODO</Link>
			</h1>
			<div className={wrapperClass}>
				<ul className="navbar">
					<li className="nav-item">
						<Link to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/history">History</Link>
					</li>
					<li className="nav-item">
						<Link to="/chart">Chart</Link>
					</li>
					<li className="nav-item">
						<Link to="/charts">All Charts</Link>
					</li>
				</ul>
				<div
					className={menuBtn}
					onClick={() => {
						isOpen ? setIsOpen(false) : setIsOpen(true);
					}}
				>
					<div className="menu-btn__burger"></div>
				</div>
			</div>
			<style jsx>{`
				.wrapper {
					display: flex;
					align-items: center;
					position: absolute;
					right: 50px;
					top: 40px;
				}

				.navbar {
					display: flex;
					list-style-type: none;
					transform: translateX(100px);
					transition: 0.5s ease-in-out;
					opacity: 0;
				}

				.nav-item {
					margin: 0px 5px;
				}

				.menu-btn {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 40px;
					height: 40px;
					cursor: pointer;
					transition: all 0.5s ease-in-out;
					border: 3px solid black;
					border-radius: 50%;
				}

				.menu-btn__burger {
					width: 20px;
					height: 3px;
					background: black;
					border-radius: 5px;
					transition: all 0.5s ease-in-out;
				}

				.menu-btn__burger::before,
				.menu-btn__burger::after {
					content: "";
					position: absolute;
					width: 20px;
					height: 3px;
					background: black;
					border-radius: 5px;
					transition: all 0.5s ease-in-out;
				}

				.menu-btn__burger::before {
					transform: translateY(-7px);
				}

				.menu-btn__burger::after {
					transform: translateY(7px);
				}

				.wrapper.open .navbar {
					transform: translateX(-20px);
					// width: 200px;
					// height: 100px;
					opacity: 1;
				}

				.menu-btn.open .menu-btn__burger {
					transform: translateX(-30px);
					background: transparent;
				}

				.menu-btn.open .menu-btn__burger::before {
					transform: rotate(45deg) translate(21px, -21px);
				}

				.menu-btn.open .menu-btn__burger::after {
					transform: rotate(-45deg) translate(21px, 21px);
				}
			`}</style>
		</>
	);
}

export function InnerNav() {
	return <Inner />;
}
