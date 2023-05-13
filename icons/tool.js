const fs = require("fs");
const path = require("path");

const iconDirs = ["dragon", "interaction", "universe", "weather"];
const result = [];

for (const iconDir of iconDirs) {
    const iconPath = path.join(__dirname, iconDir);
    if(!fs.existsSync(iconPath)){
        console.log(iconPath + " dont exist");
        continue;
    }

    const files = fs.readdirSync(iconPath);
    result.push({
        name: iconDir,
        base: `/icons/${iconDir}`,
        icons: files
    });
}

const outPath = path.join(__dirname, "icons.json");
fs.writeFileSync(outPath, JSON.stringify(result));
