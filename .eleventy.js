const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
	eleventyConfig.ignores.add("README.md");


	eleventyConfig.addFilter('date', (dateObj) => {
		return DateTime.fromISO(dateObj).setLocale('fr').toLocaleString(DateTime.DATE_FULL)
	})

	// Paris Web 2023 en SVG
	eleventyConfig.addFilter('wrap', (title) => {
		const lines = title.split('\n')
		const wrappedTitle = lines.map((line, index) => {
			let offsets = []
			// @note Comment simplifier ça ?
			switch (lines.length) {
				case 3:
					offsets = [314,400,486]
					break;
				case 2:
					offsets = [400,486]
					break;
				case 1:
				default:
					offsets = [486]
					break;
			}
			return `<tspan x="120" y="${offsets[index]}">${line}</tspan>`;
		})
		return wrappedTitle.join('')
	})

	eleventyConfig.addPassthroughCopy("_site/img")

	eleventyConfig.setServerOptions({
		liveReload: true
	})

	return {
		dir: {
			input: '_site',
			output: 'docs'
		},
		markdownTemplateEngine: 'njk'
	}
}
