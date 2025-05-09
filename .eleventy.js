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
				case 6:
					offsets = [positions.at(-6), positions.at(-5), positions.at(-4), positions.at(-3), positions.at(-2), positions.at(-1)]
					break;
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
			let fontWeight = ''
			let fontStyle = ''
			let fontSize = ''
			let color = ''
			if (['À suivre', 'septembre 2023', 'en anglais'].some(string => line.includes(string))) {
				fontStyle = ' font-style="italic"'
			}
			if (line.startsWith('[Partenaire]') && !lines[0].startsWith('À suivre')) {
				fontStyle = ' font-style="italic"'
				fontSize = ' font-size="48"'
			}
			// @note Ajouts 2024, peut avoir des impacts sur 2023
			if (['À'].some(string => line.startsWith(string))) {
				fontWeight = ' font-weight="400"'
				color = ' fill="var(--gray)"'
				fontStyle = ''
			}
			if (['en anglais'].some(string => line.includes(string))) {
				fontStyle = '';
				line = line.replace(' (en anglais)', ' <tspan font-weight="400" fill="var(--gray)" font-style="italic">(en anglais)</tspan>')
			}
			return `<tspan x="${offsetX}" y="${offsets[index]}"${fontStyle}${fontSize}${fontWeight}${color}>${line}</tspan>`
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
	)

	eleventyConfig.addPassthroughCopy("_site/img")
	eleventyConfig.addPassthroughCopy("_site/fonts")

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
