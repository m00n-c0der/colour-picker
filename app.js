const cols = document.querySelectorAll('.col');

// generata random colors with tapping space button
document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.code.toLocaleLowerCase() == 'space') {
        setRandomColors();
    }
})

// copy color when clicking on color code
// lock or unlock color whtn clicking on lock icon
document.addEventListener('click', event => {
    const type = event.target.dataset.type;

    if (type == 'lock') {
        const node = event.target.tagName.toLocaleLowerCase() == "i" 
        ? event.target 
        : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
        console.log(node);
    } else if (type == 'copy') {
        copyToClickboard(event.target.textContent);
    }
})

// check colors for hash
// if hash exist => set color scheme from hash
// if hash not exist => generate random colors
// and sat relative hash
function setRandomColors(isInitial) {

    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');

        if (isLocked) {
            colors.push(text.textContent)
            return;
        }

        const color = isInitial 
        ? colors[index]
            ? colors[index]
            : chroma.random()
        : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        col.style.background = color;
        text.textContent = color;

        setTextColor(text, color);
        setTextColor(button, color);
    })

    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}


function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-');
}

// get color from hash if exist 
// else return empty array
function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => "#" + color);
    }
    return [];
}


setRandomColors(true);

