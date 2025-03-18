//https://github.com/dkoch5594/rvotd
"use-strict";
// global constants
const COOKIE_NAME = "rvotd_tr_pr";
const BIBLE_API = "https://bible-api.com";
const BIBLE = [
    {name:'GEN',chapters:[31,25,24,26,32,22,24,22,29,32,22,20,25,23,24,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]},
    {name:'EXO',chapters:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]},
    {name:'LEV',chapters:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]},
    {name:'NUM',chapters:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]},
    {name:'DEU',chapters:[46,37,29,49,31,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]},
    {name:'JOS',chapters:[18,24,17,24,15,26,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]},
    {name:'JUD',chapters:[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]},
    {name:'RUT',chapters:[22,23,18,22]},
    {name:'1SA',chapters:[28,36,21,22,12,21,17,22,29,27,27,22,25,52,35,23,58,30,24,42,15,23,29,22,44,25,12]},
    {name:'2SA',chapters:[27,32,39,12,25,23,29,18,13,19,19,31,39,33,37,23,22,32,44,26,22,51,39,25]},
    {name:'1KI',chapters:[53,46,28,34,44,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]},
    {name:'2KI',chapters:[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]},
    {name:'1CH',chapters:[54,55,24,43,41,66,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,31,30,21]},
    {name:'2CH',chapters:[18,17,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]},
    {name:'EZR',chapters:[11,70,13,24,17,22,28,36,15,44]},
    {name:'NEH',chapters:[11,20,32,23,19,19,73,18,38,39,36,47,31]},
    {name:'EST',chapters:[22,23,15,17,14,14,10,17,32,3]},
    {name:'JOB',chapters:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,16,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]},
    {name:'PSA',chapters:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,11,13,21,72,13,20,17,8,19,13,14,20,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]},
    {name:'PRO',chapters:[33,22,35,27,35,36,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]},
    {name:'ECC',chapters:[18,26,22,16,20,12,29,17,18,20,10,14]},
    {name:'SNG',chapters:[17,17,11,16,16,13,13,14]},
    {name:'ISA',chapters:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,11,25,24]},
    {name:'JER',chapters:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,19,21,14,22,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]},
    {name:'LAM',chapters:[22,22,66,22,22]},
    {name:'EZK',chapters:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]},
    {name:'DAN',chapters:[21,49,100,30,31,28,28,27,27,21,45,13]},
    {name:'HOS',chapters:[11,23,5,19,15,11,16,14,17,15,12,14,16,9]},
    {name:'JOL',chapters:[20,32,21]},
    {name:'AMO',chapters:[15,16,15,13,27,14,17,14,15]},
    {name:'OBA',chapters:[21]},
    {name:'JON',chapters:[17,10,10,11]},
    {name:'MIC',chapters:[16,13,12,13,15,16,20]},
    {name:'NAM',chapters:[15,13,19]},
    {name:'HAB',chapters:[17,20,19]},
    {name:'ZEP',chapters:[18,15,20]},
    {name:'HAG',chapters:[15,23]},
    {name:'ZEC',chapters:[21,13,10,14,11,15,14,23,17,12,17,14,9,21]},
    {name:'MAL',chapters:[14,17,18,6]},
    {name:'MAT',chapters:[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,46,27,35,30,34,46,46,39,51,46,75,66,20]},
    {name:'MRK',chapters:[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]},
    {name:'LUK',chapters:[80,52,38,44,39,49,50,56,62,42,54,59,35,34,32,31,37,43,48,47,38,71,56,53]},
    {name:'JHN',chapters:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]},
    {name:'ACT',chapters:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,40,38,40,30,35,27,27,32,44,31]},
    {name:'ROM',chapters:[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]},
    {name:'1CO',chapters:[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]},
    {name:'2CO',chapters:[24,17,18,18,21,13,16,24,15,18,33,21,13]},
    {name:'GAL',chapters:[24,21,29,31,26,18]},
    {name:'EPH',chapters:[23,22,21,32,33,24]},
    {name:'PHP',chapters:[30,30,21,23]},
    {name:'COL',chapters:[29,23,25,18]},
    {name:'1TH',chapters:[10,20,13,18,28]},
    {name:'2TH',chapters:[12,17,18]},
    {name:'1TI',chapters:[20,15,16,16,25,21]},
    {name:'2TI',chapters:[18,26,17,22]},
    {name:'TIT',chapters:[16,15,15]},
    {name:'PHM',chapters:[25]},
    {name:'HEB',chapters:[14,18,19,16,14,20,28,13,28,39,40,29,25]},
    {name:'JAS',chapters:[27,26,18,17,20]},
    {name:'1PE',chapters:[25,25,22,19,14]},
    {name:'2PE',chapters:[21,22,18]},
    {name:'1JN',chapters:[10,29,24,21,21]},
    {name:'2JN',chapters:[13]},
    {name:'3JN',chapters:[15]},
    {name:'JUD',chapters:[25]},
    {name:'REV',chapters:[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]}
];
const TRANSLATIONS = [
    {language:"Cherokee",name:"Cherokee New Testament",default:['chr'],identifier:"cherokee"},
    {language:"Chinese",name:"Chinese Union Version",default:['zh'],identifier:"cuv"},
    {language:"Czech",name:"Bible kralická",default:['cs'],identifier:"bkr"},
    {language:"English",name:"American Standard Version (1901)",default:[],identifier:"asv"},
    {language:"English",name:"Bible in Basic English",default:[],identifier:"bbe"},
    {language:"English",name:"Darby Bible",default:[],identifier:"darby"},
    {language:"English",name:"Douay-Rheims 1899 American Edition",default:[],identifier:"dra"},
    {language:"English",name:"King James Version",default:[],identifier:"kjv"},
    {language:"English",name:"World English Bible",default:['en-US','en'],identifier:"web"},
    {language:"English",name:"Young's Literal Translation (NT only)",default:[],identifier:"ylt"},
    {language:"English (UK)",name:"Open English Bible,Commonwealth Edition",default:['en-GB'],identifier:"oeb-cw"},
    {language:"English (UK)",name:"World English Bible,British Edition",default:[],identifier:"webbe"},
    {language:"English (US)",name:"Open English Bible,US Edition",default:[],identifier:"oeb-us"},
    {language:"Latin",name:"Clementine Latin Vulgate",default:['la'],identifier:"clementine"},
    {language:"Portuguese",name:"João Ferreira de Almeida",default:['pt'],identifier:"almeida"},
    {language:"Romanian",name:"Protestant Romanian Corrected Cornilescu Version",default:['ro'],identifier:"rccv"}
];

// global functions
// https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-hash-from-a-string-in-javascript-node-js/53490958#53490958
async function sha1(msg) {
    const msgBuff = new TextEncoder().encode(msg);
    const hashBuff = await crypto.subtle.digest('SHA-1', msgBuff);
    const hashArr = Array.from(new Uint8Array(hashBuff));
    const hashHex = hashArr.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex
}

async function getVerse() {
    let translation = getTranslationPreference();
    if (translation === "") {
        setDefaultTranslation();
        translation = getTranslationPreference();
    }
    fetch(`${BIBLE_API}/${reference}?translation=${translation}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(json => {
        document.getElementById("verse").innerHTML = json.text.trim();
        const disp_ref = `${json.reference} ${json.translation_id.toUpperCase()}`;
        document.getElementById("ref").innerHTML = disp_ref;
        document.title = `RVOTD - ${disp_ref}`;
    })
}

function setContentFontSize() {
    requestAnimationFrame(() => {
        const grid = document.querySelector('.grid-container');
        const content = document.querySelector('.content');
        // start too big, get smaller
        let fontSize = 100;
        content.style.fontSize = fontSize + 'px';
        while ((grid.scrollHeight > grid.clientHeight)
            || (grid.scrollWidth > grid.clientWidth)) {
            fontSize--;
            content.style.fontSize = fontSize + 'px';
            // avoid infinite loops
            if (fontSize < 10 ) {
                break;
            }
        }
    })
}

function setDefaultTranslation() {
    const langPref = navigator.languages.find(lang =>
        TRANSLATIONS.some(t => t.default.includes(lang))
    );
    setTranslationPreference(langPref ? TRANSLATIONS.find(t => t.default.includes(langPref)).identifier : "web");
}

function getTranslationPreference() {
    return document.cookie.split('; ').find(row => row.startsWith(COOKIE_NAME + '='))?.split('=')[1] || "";
}

function setTranslationPreference(new_tr) {
    if (!(TRANSLATIONS.map(t => t.identifier).includes(new_tr))) {
        throw new Error(`Unsupported translation ${new_tr}`);
    }
    // cookie will expire in 30 days
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${COOKIE_NAME}=${new_tr};${expires};path=/`;
}

function drawDropdown() {
    const dd_div = document.getElementById("tr_drop");
    dd_div.innerHTML = ""; // Clear previous content
    const fragment = document.createDocumentFragment();
    TRANSLATIONS.forEach(t => {
        const item = document.createElement("div");
        item.className = "dropdown_item";
        item.dataset.identifier = t.identifier;
        item.innerHTML = `
            <p class="dropdown_name">${t.name}</p>
            <p class="dropdown_lang">${t.language}</p>
        `;
        fragment.appendChild(item);
    });
    dd_div.appendChild(fragment);
    dd_div.style.display = "block";
}

function getNewTranslation(new_tr) {
    setTranslationPreference(new_tr);
    getVerse();
}

function onContentChange(targetElement, callback) {
    const observer = new MutationObserver(debounce(() => {
        callback();
    }));
    observer.observe(targetElement, { childList: true });
}

function debounce(func, delay = 100) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// window events
// adjust content when we need to
window.addEventListener("load", setContentFontSize);
window.addEventListener("resize", setContentFontSize);
onContentChange(document.getElementById('verse'), setContentFontSize);

// close the dropdown when we click outside of it
window.onclick = function(event) {
    if (!event.target.matches('.toggle')) {
        const dropdown = document.getElementById("tr_drop");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}

//document functions
// draw the dropdown when we click on the trigger
document.querySelector('.toggle').addEventListener('click', drawDropdown);

// get a new translation when we select it in the  dropdown
document.getElementById("tr_drop").addEventListener("click", function (event) {
    const item = event.target.closest(".dropdown_item");
    if (item) {
        getNewTranslation(item.dataset.identifier);
    }
});

// use the ESC key to dismiss the menu, because why not?
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.getElementById("tr_drop").style.display = "none";
    }
});

// the main thing
let reference = "2TI 3:16";
const date = new Date().toISOString().split("T")[0];
sha1(date)
.then(date_hash => {
    // split the hash so we have 3 unpredicatble values to select verse parts with
    const hash_split = Math.floor(date_hash.length / 3);
    const book_part = date_hash.substring(0, hash_split);
    const chap_part = date_hash.substring(hash_split, hash_split*2);
    const verse_part = date_hash.substring(hash_split*2);

    // calcualte the divisors used to select verse parts
    const book_div = parseInt(book_part, 16);
    const chap_div = parseInt(chap_part, 16);
    const verse_div = parseInt(verse_part, 16);

    // pick the book the verse will be from
    const book_rem = book_div % BIBLE.length;
    const book = BIBLE[book_rem];

    // pick the chapter of the book the verse will be from
    const chap_rem = chap_div % book.chapters.length;
    const chap = chap_rem + 1;

    // pick the verse from the chapter of the book
    const verse_rem = verse_div % book.chapters[chap_rem];
    const verse = verse_rem + 1;

    reference = `${book.name} ${chap}:${verse}`

    return getVerse();
})
