const W=Math.min,D=Math.max,F=Math.round,T=t=>({x:t,y:t});function xt(t,e,o){return D(t,W(e,o))}function st(t,e){return typeof t=="function"?t(e):t}function I(t){return t.split("-")[0]}function K(t){return t.split("-")[1]}function yt(t){return t==="x"?"y":"x"}function rt(t){return t==="y"?"height":"width"}function q(t){return["top","bottom"].includes(I(t))?"y":"x"}function ct(t){return yt(q(t))}function bt(t){return{top:0,right:0,bottom:0,left:0,...t}}function Ct(t){return typeof t!="number"?bt(t):{top:t,right:t,bottom:t,left:t}}function lt(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function et(t,e,o){let{reference:n,floating:i}=t;const r=q(e),s=ct(e),c=rt(s),l=I(e),f=r==="y",h=n.x+n.width/2-i.width/2,d=n.y+n.height/2-i.height/2,g=n[c]/2-i[c]/2;let u;switch(l){case"top":u={x:h,y:n.y-i.height};break;case"bottom":u={x:h,y:n.y+n.height};break;case"right":u={x:n.x+n.width,y:d};break;case"left":u={x:n.x-i.width,y:d};break;default:u={x:n.x,y:n.y}}switch(K(e)){case"start":u[s]-=g*(o&&f?-1:1);break;case"end":u[s]+=g*(o&&f?-1:1);break}return u}const Tt=async(t,e,o)=>{const{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:s}=o,c=r.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e));let f=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:h,y:d}=et(f,n,l),g=n,u={},a=0;for(let m=0;m<c.length;m++){const{name:y,fn:E}=c[m],{x:L,y:O,data:$,reset:b}=await E({x:h,y:d,initialPlacement:n,placement:g,strategy:i,middlewareData:u,rects:f,platform:s,elements:{reference:t,floating:e}});if(h=L??h,d=O??d,u={...u,[y]:{...u[y],...$}},b&&a<=50){a++,typeof b=="object"&&(b.placement&&(g=b.placement),b.rects&&(f=b.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):b.rects),{x:h,y:d}=et(f,g,l)),m=-1;continue}}return{x:h,y:d,placement:g,strategy:i,middlewareData:u}},$t=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:n,placement:i,rects:r,platform:s,elements:c,middlewareData:l}=e,{element:f,padding:h=0}=st(t,e)||{};if(f==null)return{};const d=Ct(h),g={x:o,y:n},u=ct(i),a=rt(u),m=await s.getDimensions(f),y=u==="y",E=y?"top":"left",L=y?"bottom":"right",O=y?"clientHeight":"clientWidth",$=r.reference[a]+r.reference[u]-g[u]-r.floating[a],b=g[u]-r.reference[u],_=await(s.getOffsetParent==null?void 0:s.getOffsetParent(f));let V=_?_[O]:0;(!V||!await(s.isElement==null?void 0:s.isElement(_)))&&(V=c.floating[O]||r.floating[a]);const wt=$/2-b/2,Q=V/2-m[a]/2-1,U=W(d[E],Q),Z=W(d[L],Q),P=U,tt=V-m[a]-Z,R=V/2-m[a]/2+wt,X=xt(P,R,tt),Y=!l.arrow&&K(i)!=null&&R!=X&&r.reference[a]/2-(R<P?U:Z)-m[a]/2<0,j=Y?R<P?R-P:R-tt:0;return{[u]:g[u]+j,data:{[u]:X,centerOffset:R-X-j,...Y&&{alignmentOffset:j}},reset:Y}}});async function vt(t,e){const{placement:o,platform:n,elements:i}=t,r=await(n.isRTL==null?void 0:n.isRTL(i.floating)),s=I(o),c=K(o),l=q(o)==="y",f=["left","top"].includes(s)?-1:1,h=r&&l?-1:1,d=st(e,t);let{mainAxis:g,crossAxis:u,alignmentAxis:a}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return c&&typeof a=="number"&&(u=c==="end"?a*-1:a),l?{x:u*h,y:g*f}:{x:g*f,y:u*h}}const _t=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,n;const{x:i,y:r,placement:s,middlewareData:c}=e,l=await vt(e,t);return s===((o=c.offset)==null?void 0:o.placement)&&(n=c.arrow)!=null&&n.alignmentOffset?{}:{x:i+l.x,y:r+l.y,data:{...l,placement:s}}}}};function v(t){return ft(t)?(t.nodeName||"").toLowerCase():"#document"}function p(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function A(t){var e;return(e=(ft(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function ft(t){return t instanceof Node||t instanceof p(t).Node}function C(t){return t instanceof Element||t instanceof p(t).Element}function x(t){return t instanceof HTMLElement||t instanceof p(t).HTMLElement}function nt(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof p(t).ShadowRoot}function B(t){const{overflow:e,overflowX:o,overflowY:n,display:i}=w(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(i)}function At(t){return["table","td","th"].includes(v(t))}function G(t){const e=J(),o=w(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(n=>(o.willChange||"").includes(n))||["paint","layout","strict","content"].some(n=>(o.contain||"").includes(n))}function Ot(t){let e=S(t);for(;x(e)&&!H(e);){if(G(e))return e;e=S(e)}return null}function J(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function H(t){return["html","body","#document"].includes(v(t))}function w(t){return p(t).getComputedStyle(t)}function M(t){return C(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function S(t){if(v(t)==="html")return t;const e=t.assignedSlot||t.parentNode||nt(t)&&t.host||A(t);return nt(e)?e.host:e}function ut(t){const e=S(t);return H(e)?t.ownerDocument?t.ownerDocument.body:t.body:x(e)&&B(e)?e:ut(e)}function z(t,e,o){var n;e===void 0&&(e=[]),o===void 0&&(o=!0);const i=ut(t),r=i===((n=t.ownerDocument)==null?void 0:n.body),s=p(i);return r?e.concat(s,s.visualViewport||[],B(i)?i:[],s.frameElement&&o?z(s.frameElement):[]):e.concat(i,z(i,[],o))}function at(t){const e=w(t);let o=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const i=x(t),r=i?t.offsetWidth:o,s=i?t.offsetHeight:n,c=F(o)!==r||F(n)!==s;return c&&(o=r,n=s),{width:o,height:n,$:c}}function dt(t){return C(t)?t:t.contextElement}function N(t){const e=dt(t);if(!x(e))return T(1);const o=e.getBoundingClientRect(),{width:n,height:i,$:r}=at(e);let s=(r?F(o.width):o.width)/n,c=(r?F(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const Rt=T(0);function ht(t){const e=p(t);return!J()||!e.visualViewport?Rt:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Et(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==p(t)?!1:e}function k(t,e,o,n){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),r=dt(t);let s=T(1);e&&(n?C(n)&&(s=N(n)):s=N(t));const c=Et(r,o,n)?ht(r):T(0);let l=(i.left+c.x)/s.x,f=(i.top+c.y)/s.y,h=i.width/s.x,d=i.height/s.y;if(r){const g=p(r),u=n&&C(n)?p(n):n;let a=g.frameElement;for(;a&&n&&u!==g;){const m=N(a),y=a.getBoundingClientRect(),E=w(a),L=y.left+(a.clientLeft+parseFloat(E.paddingLeft))*m.x,O=y.top+(a.clientTop+parseFloat(E.paddingTop))*m.y;l*=m.x,f*=m.y,h*=m.x,d*=m.y,l+=L,f+=O,a=p(a).frameElement}}return lt({width:h,height:d,x:l,y:f})}function Lt(t){let{rect:e,offsetParent:o,strategy:n}=t;const i=x(o),r=A(o);if(o===r)return e;let s={scrollLeft:0,scrollTop:0},c=T(1);const l=T(0);if((i||!i&&n!=="fixed")&&((v(o)!=="body"||B(r))&&(s=M(o)),x(o))){const f=k(o);c=N(o),l.x=f.x+o.clientLeft,l.y=f.y+o.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-s.scrollLeft*c.x+l.x,y:e.y*c.y-s.scrollTop*c.y+l.y}}function Dt(t){return Array.from(t.getClientRects())}function gt(t){return k(A(t)).left+M(t).scrollLeft}function Nt(t){const e=A(t),o=M(t),n=t.ownerDocument.body,i=D(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=D(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let s=-o.scrollLeft+gt(t);const c=-o.scrollTop;return w(n).direction==="rtl"&&(s+=D(e.clientWidth,n.clientWidth)-i),{width:i,height:r,x:s,y:c}}function St(t,e){const o=p(t),n=A(t),i=o.visualViewport;let r=n.clientWidth,s=n.clientHeight,c=0,l=0;if(i){r=i.width,s=i.height;const f=J();(!f||f&&e==="fixed")&&(c=i.offsetLeft,l=i.offsetTop)}return{width:r,height:s,x:c,y:l}}function Vt(t,e){const o=k(t,!0,e==="fixed"),n=o.top+t.clientTop,i=o.left+t.clientLeft,r=x(t)?N(t):T(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,l=i*r.x,f=n*r.y;return{width:s,height:c,x:l,y:f}}function ot(t,e,o){let n;if(e==="viewport")n=St(t,o);else if(e==="document")n=Nt(A(t));else if(C(e))n=Vt(e,o);else{const i=ht(t);n={...e,x:e.x-i.x,y:e.y-i.y}}return lt(n)}function mt(t,e){const o=S(t);return o===e||!C(o)||H(o)?!1:w(o).position==="fixed"||mt(o,e)}function Wt(t,e){const o=e.get(t);if(o)return o;let n=z(t,[],!1).filter(c=>C(c)&&v(c)!=="body"),i=null;const r=w(t).position==="fixed";let s=r?S(t):t;for(;C(s)&&!H(s);){const c=w(s),l=G(s);!l&&c.position==="fixed"&&(i=null),(r?!l&&!i:!l&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||B(s)&&!l&&mt(t,s))?n=n.filter(h=>h!==s):i=c,s=S(s)}return e.set(t,n),n}function kt(t){let{element:e,boundary:o,rootBoundary:n,strategy:i}=t;const s=[...o==="clippingAncestors"?Wt(e,this._c):[].concat(o),n],c=s[0],l=s.reduce((f,h)=>{const d=ot(e,h,i);return f.top=D(d.top,f.top),f.right=W(d.right,f.right),f.bottom=W(d.bottom,f.bottom),f.left=D(d.left,f.left),f},ot(e,c,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Bt(t){return at(t)}function Pt(t,e,o){const n=x(e),i=A(e),r=o==="fixed",s=k(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const l=T(0);if(n||!n&&!r)if((v(e)!=="body"||B(i))&&(c=M(e)),n){const f=k(e,!0,r,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop}else i&&(l.x=gt(i));return{x:s.left+c.scrollLeft-l.x,y:s.top+c.scrollTop-l.y,width:s.width,height:s.height}}function it(t,e){return!x(t)||w(t).position==="fixed"?null:e?e(t):t.offsetParent}function pt(t,e){const o=p(t);if(!x(t))return o;let n=it(t,e);for(;n&&At(n)&&w(n).position==="static";)n=it(n,e);return n&&(v(n)==="html"||v(n)==="body"&&w(n).position==="static"&&!G(n))?o:n||Ot(t)||o}const Ft=async function(t){let{reference:e,floating:o,strategy:n}=t;const i=this.getOffsetParent||pt,r=this.getDimensions;return{reference:Pt(e,await i(o),n),floating:{x:0,y:0,...await r(o)}}};function Ht(t){return w(t).direction==="rtl"}const Mt={convertOffsetParentRelativeRectToViewportRelativeRect:Lt,getDocumentElement:A,getClippingRect:kt,getOffsetParent:pt,getElementRects:Ft,getClientRects:Dt,getDimensions:Bt,getScale:N,isElement:C,isRTL:Ht},Xt=(t,e,o)=>{const n=new Map,i={platform:Mt,...o},r={...i.platform,_c:n};return Tt(t,e,{...i,platform:r})};export{$t as a,Xt as c,_t as o};
