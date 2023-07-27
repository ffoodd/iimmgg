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

const folders = ['dist/pw-2023/cartons-titres/base', 'dist/pw-2023/cartons-titres/vod'];

folders.forEach(folder => {
	const images = fs.readdirSync(folder)

	images.forEach(image => {
		const imagePath = path.join(process.cwd(),`${folder}/${image}`)

		sharp(imagePath)
			.png({ colours: 32, force: true })
			.toBuffer((error, buffer) => {
				fs.writeFile(`${folder}/${image}`, buffer, (error) => {
					if (error) throw error
					console.log(`${colors.bold}${colors.green}Optimized${colors.end} ${colors.blue}${folder}/${image}${colors.end}`)
				})
		})

	})
})

