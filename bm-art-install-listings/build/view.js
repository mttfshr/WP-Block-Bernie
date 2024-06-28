(()=>{"use strict";var e={338:(e,t,a)=>{var r=a(795);t.H=r.createRoot,r.hydrateRoot},795:e=>{e.exports=window.ReactDOM}},t={};const a=window.React,r=window.wp.element,n=window.wp.components,o=window.wp.i18n;var l=function a(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,a),o.exports}(338);const i="bmArtInstallListings",s="bmArtInstallListingsTimestamp",c=({apiUrl:e,authToken:t})=>{const[l,c]=(0,r.useState)([]),[m,d]=(0,r.useState)("All"),[u,g]=(0,r.useState)("");(0,r.useEffect)((()=>{(async()=>{try{const e=(new Date).getTime(),t=localStorage.getItem(i),a=localStorage.getItem(s);if(t&&a&&e-a<864e5)c(JSON.parse(t));else{const t=await fetch("http://localhost:3001/api/art-installs");if(!t.ok)throw new Error("Network response was not ok");const a=await t.json();console.log("API Response:",a);const r=a.sort(((e,t)=>e.name.toString().toLowerCase()>t.name.toString().toLowerCase()?1:-1));localStorage.setItem(i,JSON.stringify(r)),localStorage.setItem(s,e.toString()),c(r)}const r=new URLSearchParams(window.location.search),n=r.get("name")||"",o=r.get("program")||"All";g(n),d(o)}catch(e){console.error("Error fetching API data:",e)}})()}),[e,t]);const w=l.filter((e=>"All"===m||e.program.toString().toLowerCase()===m.toString().toLowerCase())).filter((e=>e.name.toString().toLowerCase().includes(u.toLowerCase())));return(0,a.createElement)("div",null,(0,a.createElement)(n.TextControl,{label:(0,o.__)("Search by artwork name","bm-art-install-listings"),value:u,onChange:e=>g(e),placeholder:(0,o.__)("Type to search...","bm-art-install-listings")}),(0,a.createElement)("div",{className:"filter-toggle"},(0,a.createElement)(n.Button,{variant:"All"===m?"primary":"secondary",onClick:()=>d("All")},(0,o.__)("All","bm-art-install-listings")),(0,a.createElement)(n.Button,{variant:"Honorarium"===m?"primary":"secondary",onClick:()=>d("Honorarium")},(0,o.__)("Honorarium","bm-art-install-listings")),(0,a.createElement)(n.Button,{variant:"Self-Funded"===m?"primary":"secondary",onClick:()=>d("Self-Funded")},(0,o.__)("Self-Funded","bm-art-install-listings"))),w.map((e=>(0,a.createElement)(n.Card,{key:e.uid,className:"listing-card"},(0,a.createElement)(n.CardHeader,null,(0,a.createElement)(n.__experimentalHeading,null,e.name)),(0,a.createElement)(n.CardMedia,null,(0,a.createElement)("img",{src:e.images[0].thumbnail_url,alt:e.name})),(0,a.createElement)(n.CardBody,null,(0,a.createElement)(n.__experimentalText,null,e.description)),(0,a.createElement)(n.CardFooter,{className:"card-footer"},(0,a.createElement)(n.Button,{variant:"secondary"},e.year),(0,a.createElement)(n.Button,{variant:"secondary"},e.artist),(0,a.createElement)(n.Button,{variant:"secondary"},e.hometown),(0,a.createElement)(n.Button,{variant:"secondary"},e.program),e.donation_link&&(0,a.createElement)(n.Button,{variant:"primary",href:e.donation_link,target:"_blank",rel:"noopener noreferrer"},(0,o.__)("Donate","bm-art-install-listings")))))))};document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("#bm-art-install-listings-block").forEach((e=>{(0,l.H)(e).render((0,a.createElement)(c,null))}))}))})();