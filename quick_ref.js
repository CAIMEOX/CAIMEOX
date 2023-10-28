let code = new Map();

function make_image(file, name) {
    code.set(name, `<img src="icons/${file}" title="${name}" alt="${name}" width="40" height="40"/>&nbsp;\n`)
}

function copy(names) {
    var fs = require('fs');
    var path = require('path');
    var dir = '../devicon-master/icons';
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (names.indexOf(file) !== -1) {
            console.log('copying ' + file)
            const entry = path.join(dir, file);
            const files2 = fs.readdirSync(entry);
            const original = files2.filter((x) => x.endsWith('-original.svg'))
            if (original.length === 1) {
                make_image(original[0], file);
                fs.copyFileSync(path.join(entry, original[0]), path.join('icons', original[0]));
            } else {
                fs.copyFileSync(path.join(entry, file + '-plain.svg'), path.join('icons', file + '-plain.svg'));
                make_image(file + '-plain.svg', file);
            }
        }
    });
}

const lat = ['bash', 'c', 'denojs', 'clojure', 'go', 'haskell', 'javascript', 'kotlin', 'latex', 'markdown', 'nodejs', 'ocaml', 'python', 'ruby', 'rust', 'typescript',
    'arduino', 'git', 'gulp', 'tensorflow', 'linux', 'vim', 'vscode']
copy(lat);

let final = '';
for (let i of lat) {
    if (code.get(i)) { final += code.get(i) }
    else {
        console.log('missing ' + i);
    }
}

// write code to file
var fs = require('fs');
fs.writeFileSync('quick_ref.md', `<div>${final}</div>`);
