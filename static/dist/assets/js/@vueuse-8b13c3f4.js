import{s as U,w as G,r as L,b as m,e as h,u as q,g as K,f as X,h as z,i as Y,n as Z,j as B}from"./@vue-859b4330.js";var k=Object.defineProperty,ee=Object.defineProperties,te=Object.getOwnPropertyDescriptors,x=Object.getOwnPropertySymbols,ne=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable,C=(e,t,n)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t)=>{for(var n in t||(t={}))ne.call(t,n)&&C(e,n,t[n]);if(x)for(var n of x(t))re.call(t,n)&&C(e,n,t[n]);return e},ie=(e,t)=>ee(e,te(t));function je(e,t){var n;const r=U();return G(()=>{r.value=e()},ie(oe({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),L(r)}var F;const S=typeof window<"u",se=e=>typeof e<"u",ue=e=>typeof e=="function",ae=e=>typeof e=="string",E=()=>{},le=S&&((F=window==null?void 0:window.navigator)==null?void 0:F.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function w(e){return typeof e=="function"?e():q(e)}function H(e,t){function n(...r){return new Promise((o,a)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(a)})}return n}function ce(e,t={}){let n,r,o=E;const a=u=>{clearTimeout(u),o(),o=E};return u=>{const l=w(e),d=w(t.maxWait);return n&&a(n),l<=0||d!==void 0&&d<=0?(r&&(a(r),r=null),Promise.resolve(u())):new Promise((f,v)=>{o=t.rejectOnCancel?v:f,d&&!r&&(r=setTimeout(()=>{n&&a(n),r=null,f(u())},d)),n=setTimeout(()=>{r&&a(r),r=null,f(u())},l)})}}function fe(e,t=!0,n=!0,r=!1){let o=0,a,i=!0,u=E,l;const d=()=>{a&&(clearTimeout(a),a=void 0,u(),u=E)};return v=>{const s=w(e),c=Date.now()-o,p=()=>l=v();return d(),s<=0?(o=Date.now(),p()):(c>s&&(n||!i)?(o=Date.now(),p()):t&&(l=new Promise((_,O)=>{u=r?O:_,a=setTimeout(()=>{o=Date.now(),i=!0,_(p()),d()},Math.max(0,s-c))})),!n&&!a&&(a=setTimeout(()=>i=!0,s)),i=!1,l)}}function de(e){return e}function $(e){return K()?(X(e),!0):!1}function pe(e,t=200,n={}){return H(ce(t,n),e)}function xe(e,t=200,n={}){const r=m(e.value),o=pe(()=>{r.value=e.value},t,n);return h(e,()=>o()),r}function Ce(e,t=200,n=!1,r=!0,o=!1){return H(fe(t,n,r,o),e)}function j(e,t=!0){z()?Y(e):t?e():Z(e)}function Fe(e,t,n={}){const{immediate:r=!0}=n,o=m(!1);let a=null;function i(){a&&(clearTimeout(a),a=null)}function u(){o.value=!1,i()}function l(...d){i(),o.value=!0,a=setTimeout(()=>{o.value=!1,a=null,e(...d)},w(t))}return r&&(o.value=!0,S&&l()),$(u),{isPending:L(o),start:l,stop:u}}function y(e){var t;const n=w(e);return(t=n==null?void 0:n.$el)!=null?t:n}const P=S?window:void 0,ve=S?window.document:void 0;function b(...e){let t,n,r,o;if(ae(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=P):[t,n,r,o]=e,!t)return E;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const a=[],i=()=>{a.forEach(f=>f()),a.length=0},u=(f,v,s,c)=>(f.addEventListener(v,s,c),()=>f.removeEventListener(v,s,c)),l=h(()=>[y(t),w(o)],([f,v])=>{i(),f&&a.push(...n.flatMap(s=>r.map(c=>u(f,s,c,v))))},{immediate:!0,flush:"post"}),d=()=>{l(),i()};return $(d),d}let R=!1;function Re(e,t,n={}){const{window:r=P,ignore:o=[],capture:a=!0,detectIframe:i=!1}=n;if(!r)return;le&&!R&&(R=!0,Array.from(r.document.body.children).forEach(s=>s.addEventListener("click",E)));let u=!0;const l=s=>o.some(c=>{if(typeof c=="string")return Array.from(r.document.querySelectorAll(c)).some(p=>p===s.target||s.composedPath().includes(p));{const p=y(c);return p&&(s.target===p||s.composedPath().includes(p))}}),f=[b(r,"click",s=>{const c=y(e);if(!(!c||c===s.target||s.composedPath().includes(c))){if(s.detail===0&&(u=!l(s)),!u){u=!0;return}t(s)}},{passive:!0,capture:a}),b(r,"pointerdown",s=>{const c=y(e);c&&(u=!s.composedPath().includes(c)&&!l(s))},{passive:!0}),i&&b(r,"blur",s=>{var c;const p=y(e);((c=r.document.activeElement)==null?void 0:c.tagName)==="IFRAME"&&!(p!=null&&p.contains(r.document.activeElement))&&t(s)})].filter(Boolean);return()=>f.forEach(s=>s())}function J(e,t=!1){const n=m(),r=()=>n.value=!!e();return r(),j(r,t),n}function me(e){return JSON.parse(JSON.stringify(e))}const W=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},A="__vueuse_ssr_handlers__";W[A]=W[A]||{};function We(e,t,{window:n=P,initialValue:r=""}={}){const o=m(r),a=B(()=>{var i;return y(t)||((i=n==null?void 0:n.document)==null?void 0:i.documentElement)});return h([a,()=>w(e)],([i,u])=>{var l;if(i&&n){const d=(l=n.getComputedStyle(i).getPropertyValue(u))==null?void 0:l.trim();o.value=d||r}},{immediate:!0}),h(o,i=>{var u;(u=a.value)!=null&&u.style&&a.value.style.setProperty(w(e),i)}),o}function Ae({document:e=ve}={}){if(!e)return m("visible");const t=m(e.visibilityState);return b(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var D=Object.getOwnPropertySymbols,Oe=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable,ye=(e,t)=>{var n={};for(var r in e)Oe.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&D)for(var r of D(e))t.indexOf(r)<0&&_e.call(e,r)&&(n[r]=e[r]);return n};function be(e,t,n={}){const r=n,{window:o=P}=r,a=ye(r,["window"]);let i;const u=J(()=>o&&"ResizeObserver"in o),l=()=>{i&&(i.disconnect(),i=void 0)},d=h(()=>y(e),v=>{l(),u.value&&o&&v&&(i=new ResizeObserver(t),i.observe(v,a))},{immediate:!0,flush:"post"}),f=()=>{l(),d()};return $(f),{isSupported:u,stop:f}}function De(e,t={}){const{reset:n=!0,windowResize:r=!0,windowScroll:o=!0,immediate:a=!0}=t,i=m(0),u=m(0),l=m(0),d=m(0),f=m(0),v=m(0),s=m(0),c=m(0);function p(){const _=y(e);if(!_){n&&(i.value=0,u.value=0,l.value=0,d.value=0,f.value=0,v.value=0,s.value=0,c.value=0);return}const O=_.getBoundingClientRect();i.value=O.height,u.value=O.bottom,l.value=O.left,d.value=O.right,f.value=O.top,v.value=O.width,s.value=O.x,c.value=O.y}return be(e,p),h(()=>y(e),_=>!_&&p()),o&&b("scroll",p,{capture:!0,passive:!0}),r&&b("resize",p,{passive:!0}),j(()=>{a&&p()}),{height:i,bottom:u,left:l,right:d,top:f,width:v,x:s,y:c,update:p}}var N=Object.getOwnPropertySymbols,he=Object.prototype.hasOwnProperty,we=Object.prototype.propertyIsEnumerable,ge=(e,t)=>{var n={};for(var r in e)he.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&N)for(var r of N(e))t.indexOf(r)<0&&we.call(e,r)&&(n[r]=e[r]);return n};function Ne(e,t,n={}){const r=n,{window:o=P}=r,a=ge(r,["window"]);let i;const u=J(()=>o&&"MutationObserver"in o),l=()=>{i&&(i.disconnect(),i=void 0)},d=h(()=>y(e),v=>{l(),u.value&&o&&v&&(i=new MutationObserver(t),i.observe(v,a))},{immediate:!0}),f=()=>{l(),d()};return $(f),{isSupported:u,stop:f}}var V;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(V||(V={}));var Pe=Object.defineProperty,M=Object.getOwnPropertySymbols,Ee=Object.prototype.hasOwnProperty,Ie=Object.prototype.propertyIsEnumerable,Q=(e,t,n)=>t in e?Pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Se=(e,t)=>{for(var n in t||(t={}))Ee.call(t,n)&&Q(e,n,t[n]);if(M)for(var n of M(t))Ie.call(t,n)&&Q(e,n,t[n]);return e};const $e={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Se({linear:de},$e);function Ve(e,t,n,r={}){var o,a,i;const{clone:u=!1,passive:l=!1,eventName:d,deep:f=!1,defaultValue:v}=r,s=z(),c=n||(s==null?void 0:s.emit)||((o=s==null?void 0:s.$emit)==null?void 0:o.bind(s))||((i=(a=s==null?void 0:s.proxy)==null?void 0:a.$emit)==null?void 0:i.bind(s==null?void 0:s.proxy));let p=d;t||(t="modelValue"),p=d||p||`update:${t.toString()}`;const _=g=>u?ue(u)?u(g):me(g):g,O=()=>se(e[t])?_(e[t]):v;if(l){const g=O(),T=m(g);return h(()=>e[t],I=>T.value=_(I)),h(T,I=>{(I!==e[t]||f)&&c(p,I)},{deep:f}),T}else return B({get(){return O()},set(g){c(p,g)}})}function Me({window:e=P}={}){if(!e)return m(!1);const t=m(e.document.hasFocus());return b(e,"blur",()=>{t.value=!1}),b(e,"focus",()=>{t.value=!0}),t}function Qe(e={}){const{window:t=P,initialWidth:n=1/0,initialHeight:r=1/0,listenOrientation:o=!0,includeScrollbar:a=!0}=e,i=m(n),u=m(r),l=()=>{t&&(a?(i.value=t.innerWidth,u.value=t.innerHeight):(i.value=t.document.documentElement.clientWidth,u.value=t.document.documentElement.clientHeight))};return l(),j(l),b("resize",l,{passive:!0}),o&&b("orientationchange",l,{passive:!0}),{width:i,height:u}}export{b as a,Qe as b,De as c,be as d,Ce as e,We as f,Fe as g,le as h,S as i,Ae as j,Me as k,je as l,Ve as m,Ne as n,Re as o,xe as r,$ as t,y as u};
