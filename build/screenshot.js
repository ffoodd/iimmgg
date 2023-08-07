const cp = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const colors = {
	green: '\x1B[32m',
	blue: '\x1B[34m',
	end: '\x1B[0m',
	bold: '\x1B[1m'
}

// @todo Passer le(s) chemin(s) en argument
const folders = [
	'pw-2023/cartons-titres/base',
	'pw-2023/cartons-titres/vod',
	'pw-2023/cartons-titres/courtesy',
	'pw-2023/cartons-titres/sponsors',
	'pw-2023/cartons-titres/transitions'
];

folders.forEach(folder => {
	const files = fs.readdirSync(`docs/${folder}`)
	const outputPath = path.join(process.cwd(), `dist/${folder}`)

	for (let file of files) {
		const filename = file.replace('.svg', '.png')
		cp.execSync(`firefox -p "noob" --screenshot ${outputPath}/${filename} --window-size 1920,1080 http://localhost:8080/${folder}/${file}`)
		console.log(`${colors.bold}${colors.green}Generated${colors.end} ${colors.blue}${folder}/${filename}${colors.end}`)
	}
})

