const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter('date', (dateObj) => {
		return DateTime.fromISO(dateObj).setLocale('fr').toLocaleString(DateTime.DATE_FULL)
	})

	eleventyConfig.addFilter('wrap', (title) => {
		const lines = title.split('\n')
		const wrappedTitle = lines.map((line, index) => {
			let offsets = []
			// @todo Comment simplifier ça ?
			// @todo spécifique à pw-2023
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
