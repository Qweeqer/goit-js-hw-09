var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequire4c75;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},e.parcelRequire4c75=t);var i=t("iQIUW");function r(e,n){return new Promise(((o,t)=>{setTimeout((()=>{Math.random()>.3?o({position:e,delay:n}):t({position:e,delay:n})}),n)}))}function l({position:e,delay:n}){i.Notify.failure(`❌ Rejected promise ${e} in ${n}ms`)}function a({position:e,delay:n}){i.Notify.success(`✅ Fulfilled promise ${e} in ${n}ms`)}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const n=e.currentTarget,o=new FormData(n),t={};for(const[e,n]of o.entries())t[e]=Number(n);n.reset();for(let e=1;e<=t.amount;e+=1)r(e,t.delay).then(a).catch(l),t.delay=t.delay+t.step}));
//# sourceMappingURL=03-promises.2a67c72c.js.map