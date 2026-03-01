const kbContent = document.getElementById('keyboard-content');
const btnToggle = document.getElementById('btn-toggle');
const btnCaps = document.getElementById('btn-caps');
const btnSave = document.getElementById('btn-save');
const paper = document.getElementById('paper');

const clickSound = new Audio('https://www.soundjay.com/communication/typewriter-key-1.mp3');

let isNumbers = false;
let isCaps = false;

const layouts = {
    abc: [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['z','x','c','v','b','n','m','Backspace']],
    num: [['1','2','3','4','5','6','7','8','9','0'],['-','/',':',';','(',')','$','&','@','"'],['.',',','?','!','\'','_','+','=','Backspace']]
};

function renderKeyboard() {
    kbContent.innerHTML = ''; // Xóa sạch để không bị lặp phím
    const layout = isNumbers ? layouts.num : layouts.abc;

    layout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = `key ${key === 'Backspace' ? 'special' : ''}`;
            
            let display = key;
            if (!isNumbers && key !== 'Backspace') display = isCaps ? key.toUpperCase() : key.toLowerCase();
            keyDiv.innerText = key === 'Backspace' ? '⌫' : display;
            
            const handleAction = (e) => {
                e.preventDefault();
                handleInput(key);
            };
            keyDiv.addEventListener('touchstart', handleAction, {passive: false});
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
