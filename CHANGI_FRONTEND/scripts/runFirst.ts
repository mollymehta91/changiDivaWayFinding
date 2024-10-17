export const runFirst = `
document.querySelector('.cmp-map__filter').outerHTML = "";
document.querySelector('#container-700c3506e0').outerHTML = "";
document.querySelector('.inheritedxf').outerHTML = "";
document.querySelector('#container-55b5ae1549').outerHTML = "";

setTimeout(() => {
document.querySelector('#botdistrikt-chatbot-widget').outerHTML = "";

// document.querySelector('.camap-search-box').outerHTML = "";
// document.querySelector('.navigate').outerHTML = "";
// document.querySelector('.share-icon').outerHTML = "";

const style = document.createElement('style');
// style.innerHTML += '.cmp-map__filter { position: absolute; visibility: hidden; } ';
style.innerHTML = '.cmp-map__wrapper { height: 100vh; } ';
style.innerHTML += '.cmp-map__container { height: 100vh; } ';
// style.innerHTML += '#terminals-list { margin-top: 30px !important; } ';
// style.innerHTML += '.camap-terminal-icon .icon { width: 100px !important; } ';
// style.innerHTML += '.changi-map { top: 0px !important; } ';
document.head.appendChild(style);

window.dispatchEvent(new Event('resize'));

}, 1000);


true; // note: this is required, or you'll sometimes get silent failures
`