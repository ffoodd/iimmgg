const { DateTime } = require('luxon');

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('date', (dateObj) => {
		return DateTime.fromISO(dateObj).setLocale('fr').toLocaleString(DateTime.DATE_FULL)
	})

	eleventyConfig.addFilter('wrap', (title, positions = [314,400,486], offsetX = 120) => {
		const lines = title.split('\n')
		const wrappedTitle = lines.map((line, index) => {
			let offsets = []
			// @todo Comment simplifier ça ?
			switch (lines.length) {
				case 5:
					offsets = [positions.at(-5), positions.at(-4), positions.at(-3), positions.at(-2), positions.at(-1)]
					break;
				case 4:
					offsets = [positions.at(-4), positions.at(-3), positions.at(-2), positions.at(-1)]
					break;
				case 3:
					offsets = [positions.at(-3), positions.at(-2), positions.at(-1)]
					break;
				case 2:
					offsets = [positions.at(-2), positions.at(-1)]
					break;
				case 1:
				default:
					offsets = [positions.at(-1)]
					break;
			}
			return `<tspan x="${offsetX}" y="${offsets[index]}"${line.startsWith('À suivre') || line.includes('septembre 2023') || line.includes('en anglais') ? ' font-style="italic"' : ''}>${line}</tspan>`;
		})
		return wrappedTitle.join('')
	})

	// @note Micro-typographie FR : des choses à ajouter ?
	eleventyConfig.addFilter('microtypo', (text) => {
		return text
			.replace(' :', ' :')
			.replace(' ?', ' ?')
			.replace(' !', ' !')
			.replace(' ;', ' ;')
			.replace(' »', ' »')
			.replace('« ', '« ')
			.replace(' - ', ' - ')
			.replace(' — ', ' — ')
			.replace(' / ', ' / ')
	})

	eleventyConfig.addCollection("orderedConferences", (collection) =>
		collection.getFilteredByGlob("_posts/*.md").sort((a, b) => {
			if (a.data.title > b.data.title) return -1;
			else if (a.data.title < b.data.title) return 1;
			else return 0;
		})
	);

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
