import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function Inner() {
	let match = useRouteMatch();

	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								<Link
									to="/"
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									<i class="fas fa-arrow-left"></i> &nbsp; Go To Home
								</Link>
								<Link
									to={match.url + "/pie"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Pie Chart
								</Link>
								<Link
									to={match.url + "/xy"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									XY Chart
								</Link>
								<Link
									to={match.url + "/radar"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Radar Chart
								</Link>
								<Link
									to={match.url + "/treemap"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									TreeMap Chart
								</Link>
								<Link
									to={match.url + "/sankeydiagram"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									Sankey Diagram
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
