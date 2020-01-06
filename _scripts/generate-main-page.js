const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ModuleLink = (moduleName) => {
  return `
    <li>
      <a href="${moduleName}/">${moduleName}</a>
    </li>
  `
}
const submodules = execSync('git submodule', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .map((row) => {
    const [commit, name] = row.split(/\s+/);
    return name;
  })
const indexHTMLPath = path.resolve(__dirname, '../index.html');

const page = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Home</title>
</head>
<body>
  <h1>My Experiments</h1>
  <ul>
    ${
      submodules
        .map(moduleName => ModuleLink(moduleName))
        .join('\n')
    }
  </ul>

</body>
</html>
`
fs.writeFileSync(indexHTMLPath, page)
