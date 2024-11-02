(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const h=async r=>{const t=r.split("{{Species table/end}}"),o=[];for(const e of t){const n=e.split("{{Species table/row");for(const c of n){const i=c.match(/\|name=\[\[(.*?)]]/),l=c.match(/\|binomial=(.*?)\n/),m=c.match(/\|image=(.*?)\n/),d=c.match(/\|range=(.*?)\n/);if(i!==null&&l!==null&&m!==null&&d!==null){const f=m[1].trim().replace("File:","");try{const s=await y(f),p={name:i[1],binomial:l[1],image:s,range:d[1].trim()};o.push(p)}catch(s){console.error(`Error fetching image for ${i[1]}:`,s)}}}}const a=document.querySelector(".more_bears");a!==null&&o.forEach(e=>{a.innerHTML+=`
      <div>
        <h3>${e.name} (${e.binomial})</h3>
        <img src="${e.image}" alt="${e.name}" style="...">
        <p><strong>Range:</strong> ${e.range}</p>
      </div>
    `})},u="https://en.wikipedia.org/w/api.php",g="List_of_ursids",y=async r=>{const t={action:"query",titles:`File:${r}`,prop:"imageinfo",iiprop:"url",format:"json",origin:"*"},o=`${u}?${new URLSearchParams(t).toString()}`;try{const a=await fetch(o);if(!a.ok)throw new Error(`Failed to fetch image URL for ${r}`);const n=(await a.json()).query.pages;return Object.values(n)[0].imageinfo[0].url}catch(a){return console.error("Error fetching image URL:",a),"media/imagePlaceholder.png"}},w=async()=>{const r={action:"parse",page:g,prop:"wikitext",section:"3",format:"json",origin:"*"},t=`${u}?${new URLSearchParams(r).toString()}`;try{const o=await fetch(t);if(!o.ok)throw new Error("Failed to fetch bear data.");const e=(await o.json()).parse.wikitext["*"];await h(e)}catch(o){console.error("An error occurred when fetching the bear data:",o)}},L=()=>{const r=document.querySelector(".show-hide"),t=document.querySelector(".comment-wrapper");r==null||t==null||(t.classList.add("hidden"),r.addEventListener("click",()=>{t.classList.contains("hidden")?(r.textContent="Hide comments",t.classList.remove("hidden")):(r.textContent="Show comments",t.classList.add("hidden"))}))},b=()=>{const r=document.querySelector(".comment-form"),t=document.querySelector("#name"),o=document.querySelector("#comment"),a=document.querySelector(".comment-container");r!=null&&t!=null&&o!=null&&a!=null&&r.addEventListener("submit",e=>{e.preventDefault();const n=document.createElement("li"),c=document.createElement("p"),i=document.createElement("p");c.textContent=t.value,i.textContent=o.value,a.appendChild(n),n.appendChild(c),n.appendChild(i),t.value="",o.value=""})};document.addEventListener("DOMContentLoaded",()=>{L(),b(),(async()=>{try{await w()}catch(r){console.error("Error loading bear data:",r)}})()});
