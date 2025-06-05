const cp = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const colors = {
	green: '\x1B[32m',
	blue: '\x1B[34m',
	end: '\x1B[0m',
	bold: '\x1B[1m',
	red: '\x1B[31m',
	yellow: '\x1B[33m'
}

// @todo Passer le(s) chemin(s) en argument
// @note Anciens chemins
const oldFolders = [
	'pw-2023/cartons-titres/base',
	'pw-2023/cartons-titres/vod',
	'pw-2023/cartons-titres/sponsors',
	'pw-2023/cartons-titres/colors',
	'pw-2023/cartons-titres/transitions',
	'pw-2024/cartons-titres/vod',
	'pw-2024/cartons-titres/video',
	'pw-2024/cartons-titres/colors',
	'pw-2024/cartons-titres/sponsors',
	'pw-2024/cartons-titres/transitions'
]

const folders = [
	'pw-2025/vignettes/base',
	'pw-2025/vignettes/ateliers',
	'pw-2025/vignettes/conferences'
];

folders.forEach(folder => {
	const files = fs.readdirSync(`docs/${folder}/`)
	const outputPath = path.join(process.cwd(), `dist/${folder}/`)
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath, { recursive: true })
	}

	for (let file of files) {
		const filename = file.replace('.svg', '.png')
		const filePath = `docs/${folder}/${file}`
		const isGitModified = cp.execSync(`git diff --name-only HEAD ${filePath}`, { encoding: 'utf-8' }).trim() === filePath
		const outputFileExists = fs.existsSync(`${outputPath}/${filename}`)

		if (isGitModified || !outputFileExists) {
			try {
				cp.execSync(`firefox -p "noob" --no-remote --screenshot ${outputPath}/${filename} --window-size 1920,1080 http://localhost:8080/${folder}/${file}`, { encoding: 'utf-8' })
				console.log(`${colors.bold}${colors.green}Generated${colors.end} ${colors.blue}${folder}/${filename}${colors.end}`)
			} catch (error) {
				console.error(`${colors.bold}${colors.red}Error: ${colors.yellow}${error}${colors.end} ${colors.blue}${folder}/${filename}${colors.end}`)
			}
		}
	}
})

