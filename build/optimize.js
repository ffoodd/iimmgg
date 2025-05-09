const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
sharp.cache(false);

const colors = {
	green: '\x1B[32m',
	blue: '\x1B[34m',
	end: '\x1B[0m',
	bold: '\x1B[1m'
}

const folders = [
	'dist/pw-2025/vignettes'
];

folders.forEach(folder => {
	const images = fs.readdirSync(folder)

	images.forEach(image => {
		const relativeImagePath = `${folder}/${image}`
		const imagePath = path.join(process.cwd(), relativeImagePath)
		sharp(imagePath)
			.png({colours: 256, force: true})
			.toBuffer((error, buffer) => {
				fs.writeFile(`${folder}/${image}`, buffer, (error) => {
					if (error) throw error
					console.log(`${colors.bold}${colors.green}Optimized${colors.end} ${colors.blue}${folder}/${image}${colors.end}`)
				})
			})
	})
})

