const kbRows = document.getElementById('keyboard-rows');
const paper = document.getElementById('paper');
const scrollContainer = document.querySelector('.scroll-container');
const clickSound = new Audio('https://www.soundjay.com/communication/typewriter-key-1.mp3');

let isNumbers = false;
let isCaps = false;

// Bộ bố cục đầy đủ phím
const layouts = {
    abc: [
        ['1','2','3','4','5','6','7','8','9','0'], // Hàng số luôn hiện
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m',',','.','Backspace']
    ],
    num: [
        ['!','@','#','$','%','^','&','*','(',')'],
        ['+','=','-','_','[',']','{','}','\\','|'],
        [';',':','\'','"','<','>','/','?','`','~'],
        ['Backspace']
    ]
};

function renderKeyboard() {
    kbRows.innerHTML = '';
    const currentLayout = isNumbers ? layouts.num : layouts.abc;

    currentLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = `key ${key === 'Backspace' ? 'special-btn' : ''}`;
            
            let display = key;
            if (!isNumbers && key.length === 1) {
                display = isCaps ? key.toUpperCase() : key.toLowerCase();
            }
            keyDiv.innerText = key === 'Backspace' ? '⌫' : display;
            
            const press = (e) => { e.preventDefault(); handleInput(key); };
            keyDiv.addEventListener('mousedown', press);
            keyDiv.addEventListener('touchstart', press, {passive: false});
            rowDiv.appendChild(keyDiv);
        });
        kbRows.appendChild(rowDiv);
    });
}

function handleInput(key) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (key === 'Backspace') {
        paper.innerText = paper.innerText.slice(0, -1);
    } else if (key === 'Enter') {
        paper.innerHTML += '<br>';
    } else if (key === ' ') {
        paper.innerHTML += '\u00A0';
    } else {
        let char = key;
        if (!isNumbers && key.length === 1) {
            char = isCaps ? key.toUpperCase() : key.toLowerCase();
        }
        paper.innerText += char;
    }
    // Luôn cuộn xuống dòng mới nhất
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

// Gán nút chức năng
document.getElementById('btn-toggle').onclick = (e) => {
    isNumbers = !isNumbers;
    document.getElementById('btn-toggle').innerText = isNumbers ? 'ABC' : '123';
    renderKeyboard();
};

document.getElementById('btn-caps').onclick = (e) => {
    isCaps = !isCaps;
    document.getElementById('btn-caps').classList.toggle('caps-active');
    renderKeyboard();
};

document.querySelector('.space-bar').onclick = () => handleInput(' ');
document.querySelector('.enter-btn').onclick = () => handleInput('Enter');
document.getElementById('btn-save').onclick = () => {
    const blob = new Blob([paper.innerText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'notes.txt'; a.click();
};

renderKeyboard();
function handleInput(key) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (key === 'Backspace') {
        paper.innerText = paper.innerText.slice(0, -1);
    } else if (key === 'Enter') {
        paper.innerHTML += '<br>';
    } else if (key === ' ') {
        paper.innerHTML += '\u00A0';
    } else if (key !== 'Backspace') {
        let char = (!isNumbers) ? (isCaps ? key.toUpperCase() : key.toLowerCase()) : key;
        paper.innerText += char;
    }
    
    // Tự động cuộn xuống khi gõ dòng mới
    paperSection.scrollTop = paperSection.scrollHeight;
}

// Thiết lập các nút chức năng
const setupButtons = () => {
    const bind = (idOrClass, fn) => {
        const el = document.getElementById(idOrClass) || document.querySelector(idOrClass);
        if(!el) return;
        el.addEventListener('mousedown', (e) => { e.preventDefault(); fn(); });
        el.addEventListener('touchstart', (e) => { e.preventDefault(); fn(); }, {passive: false});
    };

    bind('btn-toggle', () => { isNumbers = !isNumbers; renderKeyboard(); });
    bind('btn-caps', () => { isCaps = !isCaps; document.getElementById('btn-caps').classList.toggle('caps-active'); renderKeyboard(); });
    bind('.key.space', () => handleInput(' '));
    bind('.key.enter', () => handleInput('Enter'));
    bind('btn-save', () => {
        const blob = new Blob([paper.innerText], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'typing_note.txt';
        a.click();
    });
};

renderKeyboard();
setupButtons();        kbContent.appendChild(rowDiv);
    });
    document.getElementById('btn-toggle').innerText = isNumbers ? 'ABC' : '123';
}

function handleInput(key) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (key === 'Backspace') {
        paper.innerText = paper.innerText.slice(0, -1);
    } else if (key === 'Enter') {
        paper.innerHTML += '<br>';
    } else if (key === ' ') {
        paper.innerHTML += '\u00A0';
    } else if (key !== 'Backspace') {
        let char = key;
        if (!isNumbers) char = isCaps ? key.toUpperCase() : key.toLowerCase();
        paper.innerText += char;
    }
}

// Thiết lập các nút chức năng
const setupButtons = () => {
    const btnToggle = document.getElementById('btn-toggle');
    const btnCaps = document.getElementById('btn-caps');
    const btnSave = document.getElementById('btn-save');

    const bind = (el, fn) => {
        el.addEventListener('mousedown', (e) => { e.preventDefault(); fn(); });
        el.addEventListener('touchstart', (e) => { e.preventDefault(); fn(); }, {passive: false});
    };

    bind(btnToggle, () => { isNumbers = !isNumbers; renderKeyboard(); });
    bind(btnCaps, () => { isCaps = !isCaps; btnCaps.classList.toggle('caps-active'); renderKeyboard(); });
    bind(document.querySelector('.key.space'), () => handleInput(' '));
    bind(document.querySelector('.key.enter'), () => handleInput('Enter'));
    bind(btnSave, () => {
        const blob = new Blob([paper.innerText], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'typing_note.txt';
        a.click();
    });
};

renderKeyboard();
setupButtons();            keyDiv.addEventListener('mousedown', handleAction);
            
            rowDiv.appendChild(keyDiv);
        });
        kbContent.appendChild(rowDiv);
    });
    btnToggle.innerText = isNumbers ? 'ABC' : '123';
}

function handleInput(key) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (key === 'Backspace') {
        paper.innerText = paper.innerText.slice(0, -1);
    } else if (key === 'Enter') {
        paper.innerHTML += '<br>';
    } else if (key === ' ') {
        paper.innerHTML += '\u00A0';
    } else if (key !== 'Backspace') {
        let char = key;
        if (!isNumbers) char = isCaps ? key.toUpperCase() : key.toLowerCase();
        paper.innerText += char;
    }
}

// Gán sự kiện nút chức năng
const bindBtn = (el, fn) => {
    if(!el) return;
    el.addEventListener('touchstart', (e) => { e.preventDefault(); fn(); }, {passive: false});
    el.addEventListener('mousedown', (e) => { e.preventDefault(); fn(); });
};

bindBtn(btnToggle, () => { isNumbers = !isNumbers; renderKeyboard(); });
bindBtn(btnCaps, () => { isCaps = !isCaps; btnCaps.classList.toggle('caps-active'); renderKeyboard(); });
bindBtn(document.querySelector('.key.space'), () => handleInput(' '));
bindBtn(document.querySelector('.key.enter'), () => handleInput('Enter'));
bindBtn(btnSave, () => {
    const blob = new Blob([paper.innerText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'typing_note.txt';
    a.click();
});

renderKeyboard();            keyDiv.addEventListener('touchstart', handleAction, {passive: false});
            keyDiv.addEventListener('mousedown', handleAction);
            
            rowDiv.appendChild(keyDiv);
        });
        kbContent.appendChild(rowDiv);
    });
    btnToggle.innerText = isNumbers ? 'ABC' : '123';
}

function handleInput(key) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (key === 'Backspace') {
        paper.innerText = paper.innerText.slice(0, -1);
    } else if (key === 'Enter') {
        paper.innerHTML += '<br>';
    } else if (key === ' ') {
        paper.innerHTML += '\u00A0';
    } else if (key !== 'Backspace') {
        let char = key;
        if (!isNumbers) char = isCaps ? key.toUpperCase() : key.toLowerCase();
        paper.innerText += char;
    }
}

// Gán sự kiện cho các nút chức năng cố định
const bind = (el, fn) => {
    if(!el) return;
    el.addEventListener('touchstart', (e) => { e.preventDefault(); fn(); }, {passive: false});
    el.addEventListener('mousedown', (e) => { e.preventDefault(); fn(); });
};

bind(btnToggle, () => { isNumbers = !isNumbers; renderKeyboard(); });
bind(btnCaps, () => { isCaps = !isCaps; btnCaps.classList.toggle('caps-active'); renderKeyboard(); });
bind(document.querySelector('.key.space'), () => handleInput(' '));
bind(document.querySelector('.key.enter'), () => handleInput('Enter'));
bind(btnSave, () => {
    const blob = new Blob([paper.innerText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'typing_note.txt';
    a.click();
});

renderKeyboard();
