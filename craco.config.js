module.exports = {
	reactScriptsVersion: "react-scripts",
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
	babel: {
		presets: [],
		plugins: ["styled-jsx/babel"],
		loaderOptions: (babelLoaderOptions, { env, paths }) => {
			return babelLoaderOptions;
		},
	},
};
