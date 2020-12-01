!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.anime=n()}(this,(function(){"use strict";var e={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},n={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},t=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],r={CSS:{},springs:{}};function a(e,n,t){return Math.min(Math.max(e,n),t)}function o(e,n){return e.indexOf(n)>-1}function i(e,n){return e.apply(null,n)}var u={arr:function(e){return Array.isArray(e)},obj:function(e){return o(Object.prototype.toString.call(e),"Object")},pth:function(e){return u.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||u.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},nil:function(e){return u.und(e)||null===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return u.hex(e)||u.rgb(e)||u.hsl(e)},key:function(t){return!e.hasOwnProperty(t)&&!n.hasOwnProperty(t)&&"targets"!==t&&"keyframes"!==t}};function s(e){var n=/\(([^)]+)\)/.exec(e);return n?n[1].split(",").map((function(e){return parseFloat(e)})):[]}function c(e,n){var t=s(e),o=a(u.und(t[0])?1:t[0],.1,100),i=a(u.und(t[1])?100:t[1],.1,100),c=a(u.und(t[2])?10:t[2],.1,100),l=a(u.und(t[3])?0:t[3],.1,100),f=Math.sqrt(i/o),d=c/(2*Math.sqrt(i*o)),v=d<1?f*Math.sqrt(1-d*d):0,p=d<1?(d*f-l)/v:-l+f;function m(e){var t=n?n*e/1e3:e;return t=d<1?Math.exp(-t*d*f)*(1*Math.cos(v*t)+p*Math.sin(v*t)):(1+p*t)*Math.exp(-t*f),0===e||1===e?e:1-t}return n?m:function(){var n=r.springs[e];if(n)return n;for(var t=0,a=0;;)if(1===m(t+=1/6)){if(++a>=16)break}else a=0;var o=t*(1/6)*1e3;return r.springs[e]=o,o}}function l(e){return void 0===e&&(e=10),function(n){return Math.ceil(a(n,1e-6,1)*e)*(1/e)}}var f,d,v=function(){var e=.1;function n(e,n){return 1-3*n+3*e}function t(e,n){return 3*n-6*e}function r(e){return 3*e}function a(e,a,o){return((n(a,o)*e+t(a,o))*e+r(a))*e}function o(e,a,o){return 3*n(a,o)*e*e+2*t(a,o)*e+r(a)}return function(n,t,r,i){if(0<=n&&n<=1&&0<=r&&r<=1){var u=new Float32Array(11);if(n!==t||r!==i)for(var s=0;s<11;++s)u[s]=a(s*e,n,r);return function(e){return n===t&&r===i||0===e||1===e?e:a(c(e),t,i)}}function c(t){for(var i=0,s=1;10!==s&&u[s]<=t;++s)i+=e;var c=i+(t-u[--s])/(u[s+1]-u[s])*e,l=o(c,n,r);return l>=.001?function(e,n,t,r){for(var i=0;i<4;++i){var u=o(n,t,r);if(0===u)return n;n-=(a(n,t,r)-e)/u}return n}(t,c,n,r):0===l?c:function(e,n,t,r,o){for(var i,u,s=0;(i=a(u=n+(t-n)/2,r,o)-e)>0?t=u:n=u,Math.abs(i)>1e-7&&++s<10;);return u}(t,i,i+e,n,r)}}}(),p=(f={linear:function(){return function(e){return e}}},d={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var n,t=4;e<((n=Math.pow(2,--t))-1)/11;);return 1/Math.pow(4,3-t)-7.5625*Math.pow((3*n-2)/22-e,2)}},Elastic:function(e,n){void 0===e&&(e=1),void 0===n&&(n=.5);var t=a(e,1,10),r=a(n,.1,2);return function(e){return 0===e||1===e?e:-t*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/t))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach((function(e,n){d[e]=function(){return function(e){return Math.pow(e,n+2)}}})),Object.keys(d).forEach((function(e){var n=d[e];f["easeIn"+e]=n,f["easeOut"+e]=function(e,t){return function(r){return 1-n(e,t)(1-r)}},f["easeInOut"+e]=function(e,t){return function(r){return r<.5?n(e,t)(2*r)/2:1-n(e,t)(-2*r+2)/2}},f["easeOutIn"+e]=function(e,t){return function(r){return r<.5?(1-n(e,t)(1-2*r))/2:(n(e,t)(2*r-1)+1)/2}}})),f);function m(e,n){if(u.fnc(e))return e;var t=e.split("(")[0],r=p[t],a=s(e);switch(t){case"spring":return c(e,n);case"cubicBezier":return i(v,a);case"steps":return i(l,a);default:return i(r,a)}}function g(e){try{return document.querySelectorAll(e)}catch(e){return}}function h(e,n){for(var t=e.length,r=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<t;o++)if(o in e){var i=e[o];n.call(r,i,o,e)&&a.push(i)}return a}function y(e){return e.reduce((function(e,n){return e.concat(u.arr(n)?y(n):n)}),[])}function b(e){return u.arr(e)?e:(u.str(e)&&(e=g(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function C(e,n){return e.some((function(e){return e===n}))}function w(e){var n={};for(var t in e)n[t]=e[t];return n}function M(e,n){var t=w(e);for(var r in e)t[r]=n.hasOwnProperty(r)?n[r]:e[r];return t}function x(e,n){var t=w(e);for(var r in n)t[r]=u.und(e[r])?n[r]:e[r];return t}function L(e){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(n)return n[1]}function k(e,n){return u.fnc(e)?e(n.target,n.id,n.total):e}function O(e,n){return e.getAttribute(n)}function I(e,n,t){if(C([t,"deg","rad","turn"],L(n)))return n;var a=r.CSS[n+t];if(!u.und(a))return a;var o=document.createElement(e.tagName),i=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;i.appendChild(o),o.style.position="absolute",o.style.width=100+t;var s=100/o.offsetWidth;i.removeChild(o);var c=s*parseFloat(n);return r.CSS[n+t]=c,c}function S(e,n,t){if(n in e.style){var r=n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[n]||getComputedStyle(e).getPropertyValue(r)||"0";return t?I(e,a,t):a}}function P(e,n){return u.dom(e)&&!u.inp(e)&&(!u.nil(O(e,n))||u.svg(e)&&e[n])?"attribute":u.dom(e)&&C(t,n)?"transform":u.dom(e)&&"transform"!==n&&S(e,n)?"css":null!=e[n]?"object":void 0}function D(e){if(u.dom(e)){for(var n,t=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;n=r.exec(t);)a.set(n[1],n[2]);return a}}function q(e,n,t,r){switch(P(e,n)){case"transform":return function(e,n,t,r){var a,i=o(n,"scale")?1:0+(o(a=n,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),u=D(e).get(n)||i;return t&&(t.transforms.list.set(n,u),t.transforms.last=n),r?I(e,u,r):u}(e,n,r,t);case"css":return S(e,n,t);case"attribute":return O(e,n);default:return e[n]||0}}function B(e,n){var t=/^(\*=|\+=|-=)/.exec(e);if(!t)return e;var r=L(e)||0,a=parseFloat(n),o=parseFloat(e.replace(t[0],""));switch(t[0][0]){case"+":return a+o+r;case"-":return a-o+r;case"*":return a*o+r}}function E(e,n){if(u.col(e))return function(e){return u.rgb(e)?(t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n=e))?"rgba("+t[1]+",1)":n:u.hex(e)?(r=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(e,n,t,r){return n+n+t+t+r+r})),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):u.hsl(e)?function(e){var n,t,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),o=parseInt(a[1],10)/360,i=parseInt(a[2],10)/100,u=parseInt(a[3],10)/100,s=a[4]||1;function c(e,n,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?e+6*(n-e)*t:t<.5?n:t<2/3?e+(n-e)*(2/3-t)*6:e}if(0==i)n=t=r=u;else{var l=u<.5?u*(1+i):u+i-u*i,f=2*u-l;n=c(f,l,o+1/3),t=c(f,l,o),r=c(f,l,o-1/3)}return"rgba("+255*n+","+255*t+","+255*r+","+s+")"}(e):void 0;var n,t,r,a}(e);if(/\s/g.test(e))return e;var t=L(e),r=t?e.substr(0,e.length-t.length):e;return n?r+n:r}function T(e,n){return Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2))}function $(e){for(var n,t=e.points,r=0,a=0;a<t.numberOfItems;a++){var o=t.getItem(a);a>0&&(r+=T(n,o)),n=o}return r}function A(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return o=e,2*Math.PI*O(o,"r");case"rect":return 2*O(a=e,"width")+2*O(a,"height");case"line":return T({x:O(r=e,"x1"),y:O(r,"y1")},{x:O(r,"x2"),y:O(r,"y2")});case"polyline":return $(e);case"polygon":return t=(n=e).points,$(n)+T(t.getItem(t.numberOfItems-1),t.getItem(0))}var n,t,r,a,o}function F(e,n){var t=n||{},r=t.el||function(e){for(var n=e.parentNode;u.svg(n)&&u.svg(n.parentNode);)n=n.parentNode;return n}(e),a=r.getBoundingClientRect(),o=O(r,"viewBox"),i=a.width,s=a.height,c=t.viewBox||(o?o.split(" "):[0,0,i,s]);return{el:r,viewBox:c,x:c[0]/1,y:c[1]/1,w:i,h:s,vW:c[2],vH:c[3]}}function N(e,n,t){function r(t){void 0===t&&(t=0);var r=n+t>=1?n+t:0;return e.el.getPointAtLength(r)}var a=F(e.el,e.svg),o=r(),i=r(-1),u=r(1),s=t?1:a.w/a.vW,c=t?1:a.h/a.vH;switch(e.property){case"x":return(o.x-a.x)*s;case"y":return(o.y-a.y)*c;case"angle":return 180*Math.atan2(u.y-i.y,u.x-i.x)/Math.PI}}function j(e,n){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=E(u.pth(e)?e.totalLength:e,n)+"";return{original:r,numbers:r.match(t)?r.match(t).map(Number):[0],strings:u.str(e)||n?r.split(t):[]}}function H(e){return h(e?y(u.arr(e)?e.map(b):b(e)):[],(function(e,n,t){return t.indexOf(e)===n}))}function Z(e){var n=H(e);return n.map((function(e,t){return{target:e,id:t,total:n.length,transforms:{list:D(e)}}}))}function V(e,n){var t=w(n);if(/^spring/.test(t.easing)&&(t.duration=c(t.easing)),u.arr(e)){var r=e.length;2!==r||u.obj(e[0])?u.fnc(n.duration)||(t.duration=n.duration/r):e={value:e}}var a=u.arr(e)?e:[e];return a.map((function(e,t){var r=u.obj(e)&&!u.pth(e)?e:{value:e};return u.und(r.delay)&&(r.delay=t?0:n.delay),u.und(r.endDelay)&&(r.endDelay=t===a.length-1?n.endDelay:0),r})).map((function(e){return x(e,t)}))}function W(e,n){var t=[],r=n.keyframes;for(var a in r&&(n=x(function(e){for(var n=h(y(e.map((function(e){return Object.keys(e)}))),(function(e){return u.key(e)})).reduce((function(e,n){return e.indexOf(n)<0&&e.push(n),e}),[]),t={},r=function(r){var a=n[r];t[a]=e.map((function(e){var n={};for(var t in e)u.key(t)?t==a&&(n.value=e[t]):n[t]=e[t];return n}))},a=0;a<n.length;a++)r(a);return t}(r),n)),n)u.key(a)&&t.push({name:a,tweens:V(n[a],e)});return t}var Y={css:function(e,n,t){return e.style[n]=t},attribute:function(e,n,t){return e.setAttribute(n,t)},object:function(e,n,t){return e[n]=t},transform:function(e,n,t,r,a){if(r.list.set(n,t),n===r.last||a){var o="";r.list.forEach((function(e,n){o+=n+"("+e+") "})),e.style.transform=o}}};function X(e,n){Z(e).forEach((function(e){for(var t in n){var r=k(n[t],e),a=e.target,o=L(r),i=q(a,t,o,e),u=B(E(r,o||L(i)),i),s=P(a,t);Y[s](a,t,u,e.transforms,!0)}}))}function z(e,n){return h(y(e.map((function(e){return n.map((function(n){return function(e,n){var t=P(e.target,n.name);if(t){var r=function(e,n){var t;return e.tweens.map((function(r){var a=function(e,n){var t={};for(var r in e){var a=k(e[r],n);u.arr(a)&&1===(a=a.map((function(e){return k(e,n)}))).length&&(a=a[0]),t[r]=a}return t.duration=parseFloat(t.duration),t.delay=parseFloat(t.delay),t}(r,n),o=a.value,i=u.arr(o)?o[1]:o,s=L(i),c=q(n.target,e.name,s,n),l=t?t.to.original:c,f=u.arr(o)?o[0]:l,d=L(f)||L(c),v=s||d;return u.und(i)&&(i=l),a.from=j(f,v),a.to=j(B(i,f),v),a.start=t?t.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=m(a.easing,a.duration),a.isPath=u.pth(o),a.isPathTargetInsideSVG=a.isPath&&u.svg(n.target),a.isColor=u.col(a.from.original),a.isColor&&(a.round=1),t=a,a}))}(n,e),a=r[r.length-1];return{type:t,property:n.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}(e,n)}))}))),(function(e){return!u.und(e)}))}function G(e,n){var t=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},a={};return a.duration=t?Math.max.apply(Math,e.map((function(e){return r(e)+e.duration}))):n.duration,a.delay=t?Math.min.apply(Math,e.map((function(e){return r(e)+e.delay}))):n.delay,a.endDelay=t?a.duration-Math.max.apply(Math,e.map((function(e){return r(e)+e.duration-e.endDelay}))):n.endDelay,a}var Q=0,_=[],R=function(){var e;function n(t){for(var r=_.length,a=0;a<r;){var o=_[a];o.paused?(_.splice(a,1),r--):(o.tick(t),a++)}e=a>0?requestAnimationFrame(n):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",(function(){K.suspendWhenDocumentHidden&&(J()?e=cancelAnimationFrame(e):(_.forEach((function(e){return e._onDocumentVisibility()})),R()))})),function(){e||J()&&K.suspendWhenDocumentHidden||!(_.length>0)||(e=requestAnimationFrame(n))}}();function J(){return!!document&&document.hidden}function K(t){void 0===t&&(t={});var r,o=0,i=0,u=0,s=0,c=null;function l(e){var n=window.Promise&&new Promise((function(e){return c=e}));return e.finished=n,n}var f,d,v,p,m,g,y,b,C=(d=M(e,f=t),p=W(v=M(n,f),f),y=G(g=z(m=Z(f.targets),p),v),b=Q,Q++,x(d,{id:b,children:[],animatables:m,animations:g,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));function w(){var e=C.direction;"alternate"!==e&&(C.direction="normal"!==e?"normal":"reverse"),C.reversed=!C.reversed,r.forEach((function(e){return e.reversed=C.reversed}))}function L(e){return C.reversed?C.duration-e:e}function k(){o=0,i=L(C.currentTime)*(1/K.speed)}function O(e,n){n&&n.seek(e-n.timelineOffset)}function I(e){for(var n=0,t=C.animations,r=t.length;n<r;){var o=t[n],i=o.animatable,u=o.tweens,s=u.length-1,c=u[s];s&&(c=h(u,(function(n){return e<n.end}))[0]||c);for(var l=a(e-c.start-c.delay,0,c.duration)/c.duration,f=isNaN(l)?1:c.easing(l),d=c.to.strings,v=c.round,p=[],m=c.to.numbers.length,g=void 0,y=0;y<m;y++){var b=void 0,w=c.to.numbers[y],M=c.from.numbers[y]||0;b=c.isPath?N(c.value,f*w,c.isPathTargetInsideSVG):M+f*(w-M),v&&(c.isColor&&y>2||(b=Math.round(b*v)/v)),p.push(b)}var x=d.length;if(x){g=d[0];for(var L=0;L<x;L++){d[L];var k=d[L+1],O=p[L];isNaN(O)||(g+=k?O+k:O+" ")}}else g=p[0];Y[o.type](i.target,o.property,g,i.transforms),o.currentValue=g,n++}}function S(e){C[e]&&!C.passThrough&&C[e](C)}function P(e){var n=C.duration,t=C.delay,f=n-C.endDelay,d=L(e);C.progress=a(d/n*100,0,100),C.reversePlayback=d<C.currentTime,r&&function(e){if(C.reversePlayback)for(var n=s;n--;)O(e,r[n]);else for(var t=0;t<s;t++)O(e,r[t])}(d),!C.began&&C.currentTime>0&&(C.began=!0,S("begin")),!C.loopBegan&&C.currentTime>0&&(C.loopBegan=!0,S("loopBegin")),d<=t&&0!==C.currentTime&&I(0),(d>=f&&C.currentTime!==n||!n)&&I(n),d>t&&d<f?(C.changeBegan||(C.changeBegan=!0,C.changeCompleted=!1,S("changeBegin")),S("change"),I(d)):C.changeBegan&&(C.changeCompleted=!0,C.changeBegan=!1,S("changeComplete")),C.currentTime=a(d,0,n),C.began&&S("update"),e>=n&&(i=0,C.remaining&&!0!==C.remaining&&C.remaining--,C.remaining?(o=u,S("loopComplete"),C.loopBegan=!1,"alternate"===C.direction&&w()):(C.paused=!0,C.completed||(C.completed=!0,S("loopComplete"),S("complete"),!C.passThrough&&"Promise"in window&&(c(),l(C)))))}return l(C),C.reset=function(){var e=C.direction;C.passThrough=!1,C.currentTime=0,C.progress=0,C.paused=!0,C.began=!1,C.loopBegan=!1,C.changeBegan=!1,C.completed=!1,C.changeCompleted=!1,C.reversePlayback=!1,C.reversed="reverse"===e,C.remaining=C.loop,r=C.children;for(var n=s=r.length;n--;)C.children[n].reset();(C.reversed&&!0!==C.loop||"alternate"===e&&1===C.loop)&&C.remaining++,I(C.reversed?C.duration:0)},C._onDocumentVisibility=k,C.set=function(e,n){return X(e,n),C},C.tick=function(e){u=e,o||(o=u),P((u+(i-o))*K.speed)},C.seek=function(e){P(L(e))},C.pause=function(){C.paused=!0,k()},C.play=function(){C.paused&&(C.completed&&C.reset(),C.paused=!1,_.push(C),k(),R())},C.reverse=function(){w(),C.completed=!C.reversed,k()},C.restart=function(){C.reset(),C.play()},C.remove=function(e){ee(H(e),C)},C.reset(),C.autoplay&&C.play(),C}function U(e,n){for(var t=n.length;t--;)C(e,n[t].animatable.target)&&n.splice(t,1)}function ee(e,n){var t=n.animations,r=n.children;U(e,t);for(var a=r.length;a--;){var o=r[a],i=o.animations;U(e,i),i.length||o.children.length||r.splice(a,1)}t.length||r.length||n.pause()}return K.version="3.2.1",K.speed=1,K.suspendWhenDocumentHidden=!0,K.running=_,K.remove=function(e){for(var n=H(e),t=_.length;t--;)ee(n,_[t])},K.get=q,K.set=X,K.convertPx=I,K.path=function(e,n){var t=u.str(e)?g(e)[0]:e,r=n||100;return function(e){return{property:e,el:t,svg:F(t),totalLength:A(t)*(r/100)}}},K.setDashoffset=function(e){var n=A(e);return e.setAttribute("stroke-dasharray",n),n},K.stagger=function(e,n){void 0===n&&(n={});var t=n.direction||"normal",r=n.easing?m(n.easing):null,a=n.grid,o=n.axis,i=n.from||0,s="first"===i,c="center"===i,l="last"===i,f=u.arr(e),d=f?parseFloat(e[0]):parseFloat(e),v=f?parseFloat(e[1]):0,p=L(f?e[1]:e)||0,g=n.start||0+(f?d:0),h=[],y=0;return function(e,n,u){if(s&&(i=0),c&&(i=(u-1)/2),l&&(i=u-1),!h.length){for(var m=0;m<u;m++){if(a){var b=c?(a[0]-1)/2:i%a[0],C=c?(a[1]-1)/2:Math.floor(i/a[0]),w=b-m%a[0],M=C-Math.floor(m/a[0]),x=Math.sqrt(w*w+M*M);"x"===o&&(x=-w),"y"===o&&(x=-M),h.push(x)}else h.push(Math.abs(i-m));y=Math.max.apply(Math,h)}r&&(h=h.map((function(e){return r(e/y)*y}))),"reverse"===t&&(h=h.map((function(e){return o?e<0?-1*e:-e:Math.abs(y-e)})))}return g+(f?(v-d)/y:d)*(Math.round(100*h[n])/100)+p}},K.timeline=function(e){void 0===e&&(e={});var t=K(e);return t.duration=0,t.add=function(r,a){var o=_.indexOf(t),i=t.children;function s(e){e.passThrough=!0}o>-1&&_.splice(o,1);for(var c=0;c<i.length;c++)s(i[c]);var l=x(r,M(n,e));l.targets=l.targets||e.targets;var f=t.duration;l.autoplay=!1,l.direction=t.direction,l.timelineOffset=u.und(a)?f:B(a,f),s(t),t.seek(l.timelineOffset);var d=K(l);s(d),i.push(d);var v=G(i,e);return t.delay=v.delay,t.endDelay=v.endDelay,t.duration=v.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t},K.easing=m,K.penner=p,K.random=function(e,n){return Math.floor(Math.random()*(n-e+1))+e},K})),document.addEventListener("DOMContentLoaded",(()=>{const e=e=>414*e/window.innerWidth,n=()=>anime({targets:"#logo",rotate:-10,scale:1,complete:()=>{anime.remove("#logo"),anime({targets:"#logo",rotate:10,scale:1,complete:()=>n()})}});n();anime({targets:"#discover",translateY:32,direction:"alternate",loop:!0,duration:2e3}),anime({targets:"header > svg",scale:e(2.5)}),document.querySelector("#dice > svg").style.transform=`scale(${e(3)})`,document.querySelector("#equipment > svg").style.transform=`scale(${e(3)})`,document.querySelector("#turn > svg").style.transform=`scale(${e(3)})`,document.querySelector("#shop > svg").style.transform=`scale(${e(3)})`,document.querySelector("#treasure > svg").style.transform=`scale(${e(3)})`,document.querySelector("#spellcasting > svg").style.transform=`scale(${e(3.5)})`,document.querySelector("#enemy > svg").style.transform=`scale(${e(3.5)})`,document.querySelector("#end > svg").style.transform=`scale(${e(3)})`;(()=>{let e,n;e=e=>{e.map((e=>{if(e.isIntersecting){let n,t,r;n=e.target.parentElement.parentElement.parentElement,t=n.id,e.target.buffered.length>0?(r=document.querySelector(`#${t} > div > div > .wave`)||document.createElement("div"),anime.remove(`#${t} > div > div > .wave svg > path`),r.remove()):(r='\n  <div class="wave mxw64 psa zi1 df fdc aic jcc">\n    <div class="hw64 ofh br64 bw1 bss bc-primary psr">\n      <svg class="hw128 pb64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">\n        <path\n          class="fl-wave-background"\n          d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"\n        ></path>\n      </svg>\n      <div class="psa b0 w64 h24 bg-wave-background"></div>\n    </div>\n    <span class="mt8 fs10 fw700 fvsc primary">video in caricamento</span>\n  </div>\n  ',n.querySelector("div > div").innerHTML+=r,(e=>{anime({targets:`#${e} > div > div > .wave svg > path`,d:[{value:"M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,154.7C672,181,768,203,864,197.3C960,192,1056,160,1152,176C1248,192,1344,256,1392,288L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"},{value:"M0,256L48,245.3C96,235,192,213,288,192C384,171,480,149,576,122.7C672,96,768,64,864,42.7C960,21,1056,11,1152,26.7C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"},{value:"M0,256L48,224C96,192,192,128,288,138.7C384,149,480,235,576,229.3C672,224,768,128,864,117.3C960,107,1056,181,1152,197.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"}],direction:"alternate",loop:!0,easing:"linear",duration:2e3})})(t)),e.target.play()}else e.target.pause()}))},n=new IntersectionObserver(e),document.querySelectorAll("video").forEach((e=>n.observe(e)))})()}));