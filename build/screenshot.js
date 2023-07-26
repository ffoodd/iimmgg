const cp = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

// @note Passer le chemin en argument ?
const files = fs.readdirSync(`docs/pw-2023/svg`);
const outputPath = path.join(process.cwd(), `/docs/pw-2023/png/`);
const colors = {
	green: '\x1B[32m',
	blue: '\x1B[34m',
	end: '\x1B[0m',
	bold: '\x1B[1m'
}

for (let file of files) {
	const filename = file.replace('.svg', '.png');
	cp.execSync(`firefox -p "noob" --screenshot ${outputPath}${filename} --window-size 1920,1080 http://localhost:8080/pw-2023/svg/${file}`)
	console.log(`${colors.bold}${colors.green}Generated${colors.end} ${colors.blue}${filename}${colors.end}`);
}

