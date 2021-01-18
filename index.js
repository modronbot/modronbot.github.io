!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.anime=e()}(this,(function(){"use strict";var n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},t=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],r={CSS:{},springs:{}};function a(n,e,t){return Math.min(Math.max(n,e),t)}function o(n,e){return n.indexOf(e)>-1}function i(n,e){return n.apply(null,e)}var u={arr:function(n){return Array.isArray(n)},obj:function(n){return o(Object.prototype.toString.call(n),"Object")},pth:function(n){return u.obj(n)&&n.hasOwnProperty("totalLength")},svg:function(n){return n instanceof SVGElement},inp:function(n){return n instanceof HTMLInputElement},dom:function(n){return n.nodeType||u.svg(n)},str:function(n){return"string"==typeof n},fnc:function(n){return"function"==typeof n},und:function(n){return void 0===n},nil:function(n){return u.und(n)||null===n},hex:function(n){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)},rgb:function(n){return/^rgb/.test(n)},hsl:function(n){return/^hsl/.test(n)},col:function(n){return u.hex(n)||u.rgb(n)||u.hsl(n)},key:function(t){return!n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&"targets"!==t&&"keyframes"!==t}};function c(n){var e=/\(([^)]+)\)/.exec(n);return e?e[1].split(",").map((function(n){return parseFloat(n)})):[]}function s(n,e){var t=c(n),o=a(u.und(t[0])?1:t[0],.1,100),i=a(u.und(t[1])?100:t[1],.1,100),s=a(u.und(t[2])?10:t[2],.1,100),f=a(u.und(t[3])?0:t[3],.1,100),l=Math.sqrt(i/o),d=s/(2*Math.sqrt(i*o)),p=d<1?l*Math.sqrt(1-d*d):0,v=d<1?(d*l-f)/p:-f+l;function g(n){var t=e?e*n/1e3:n;return t=d<1?Math.exp(-t*d*l)*(1*Math.cos(p*t)+v*Math.sin(p*t)):(1+v*t)*Math.exp(-t*l),0===n||1===n?n:1-t}return e?g:function(){var e=r.springs[n];if(e)return e;for(var t=0,a=0;;)if(1===g(t+=1/6)){if(++a>=16)break}else a=0;var o=t*(1/6)*1e3;return r.springs[n]=o,o}}function f(n){return void 0===n&&(n=10),function(e){return Math.ceil(a(e,1e-6,1)*n)*(1/n)}}var l,d,p=function(){var n=.1;function e(n,e){return 1-3*e+3*n}function t(n,e){return 3*e-6*n}function r(n){return 3*n}function a(n,a,o){return((e(a,o)*n+t(a,o))*n+r(a))*n}function o(n,a,o){return 3*e(a,o)*n*n+2*t(a,o)*n+r(a)}return function(e,t,r,i){if(0<=e&&e<=1&&0<=r&&r<=1){var u=new Float32Array(11);if(e!==t||r!==i)for(var c=0;c<11;++c)u[c]=a(c*n,e,r);return function(n){return e===t&&r===i||0===n||1===n?n:a(s(n),t,i)}}function s(t){for(var i=0,c=1;10!==c&&u[c]<=t;++c)i+=n;var s=i+(t-u[--c])/(u[c+1]-u[c])*n,f=o(s,e,r);return f>=.001?function(n,e,t,r){for(var i=0;i<4;++i){var u=o(e,t,r);if(0===u)return e;e-=(a(e,t,r)-n)/u}return e}(t,s,e,r):0===f?s:function(n,e,t,r,o){for(var i,u,c=0;(i=a(u=e+(t-e)/2,r,o)-n)>0?t=u:e=u,Math.abs(i)>1e-7&&++c<10;);return u}(t,i,i+n,e,r)}}}(),v=(l={linear:function(){return function(n){return n}}},d={Sine:function(){return function(n){return 1-Math.cos(n*Math.PI/2)}},Circ:function(){return function(n){return 1-Math.sqrt(1-n*n)}},Back:function(){return function(n){return n*n*(3*n-2)}},Bounce:function(){return function(n){for(var e,t=4;n<((e=Math.pow(2,--t))-1)/11;);return 1/Math.pow(4,3-t)-7.5625*Math.pow((3*e-2)/22-n,2)}},Elastic:function(n,e){void 0===n&&(n=1),void 0===e&&(e=.5);var t=a(n,1,10),r=a(e,.1,2);return function(n){return 0===n||1===n?n:-t*Math.pow(2,10*(n-1))*Math.sin((n-1-r/(2*Math.PI)*Math.asin(1/t))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach((function(n,e){d[n]=function(){return function(n){return Math.pow(n,e+2)}}})),Object.keys(d).forEach((function(n){var e=d[n];l["easeIn"+n]=e,l["easeOut"+n]=function(n,t){return function(r){return 1-e(n,t)(1-r)}},l["easeInOut"+n]=function(n,t){return function(r){return r<.5?e(n,t)(2*r)/2:1-e(n,t)(-2*r+2)/2}},l["easeOutIn"+n]=function(n,t){return function(r){return r<.5?(1-e(n,t)(1-2*r))/2:(e(n,t)(2*r-1)+1)/2}}})),l);function g(n,e){if(u.fnc(n))return n;var t=n.split("(")[0],r=v[t],a=c(n);switch(t){case"spring":return s(n,e);case"cubicBezier":return i(p,a);case"steps":return i(f,a);default:return i(r,a)}}function h(n){try{return document.querySelectorAll(n)}catch(n){return}}function m(n,e){for(var t=n.length,r=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<t;o++)if(o in n){var i=n[o];e.call(r,i,o,n)&&a.push(i)}return a}function y(n){return n.reduce((function(n,e){return n.concat(u.arr(e)?y(e):e)}),[])}function b(n){return u.arr(n)?n:(u.str(n)&&(n=h(n)||n),n instanceof NodeList||n instanceof HTMLCollection?[].slice.call(n):[n])}function M(n,e){return n.some((function(n){return n===e}))}function x(n){var e={};for(var t in n)e[t]=n[t];return e}function w(n,e){var t=x(n);for(var r in n)t[r]=e.hasOwnProperty(r)?e[r]:n[r];return t}function k(n,e){var t=x(n);for(var r in e)t[r]=u.und(n[r])?e[r]:n[r];return t}function O(n){var e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);if(e)return e[1]}function C(n,e){return u.fnc(n)?n(e.target,e.id,e.total):n}function P(n,e){return n.getAttribute(e)}function I(n,e,t){if(M([t,"deg","rad","turn"],O(e)))return e;var a=r.CSS[e+t];if(!u.und(a))return a;var o=document.createElement(n.tagName),i=n.parentNode&&n.parentNode!==document?n.parentNode:document.body;i.appendChild(o),o.style.position="absolute",o.style.width=100+t;var c=100/o.offsetWidth;i.removeChild(o);var s=c*parseFloat(e);return r.CSS[e+t]=s,s}function D(n,e,t){if(e in n.style){var r=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=n.style[e]||getComputedStyle(n).getPropertyValue(r)||"0";return t?I(n,a,t):a}}function B(n,e){return u.dom(n)&&!u.inp(n)&&(!u.nil(P(n,e))||u.svg(n)&&n[e])?"attribute":u.dom(n)&&M(t,e)?"transform":u.dom(n)&&"transform"!==e&&D(n,e)?"css":null!=n[e]?"object":void 0}function T(n){if(u.dom(n)){for(var e,t=n.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;e=r.exec(t);)a.set(e[1],e[2]);return a}}function L(n,e,t,r){switch(B(n,e)){case"transform":return function(n,e,t,r){var a,i=o(e,"scale")?1:0+(o(a=e,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),u=T(n).get(e)||i;return t&&(t.transforms.list.set(e,u),t.transforms.last=e),r?I(n,u,r):u}(n,e,r,t);case"css":return D(n,e,t);case"attribute":return P(n,e);default:return n[e]||0}}function E(n,e){var t=/^(\*=|\+=|-=)/.exec(n);if(!t)return n;var r=O(n)||0,a=parseFloat(e),o=parseFloat(n.replace(t[0],""));switch(t[0][0]){case"+":return a+o+r;case"-":return a-o+r;case"*":return a*o+r}}function F(n,e){if(u.col(n))return function(n){return u.rgb(n)?(t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=n))?"rgba("+t[1]+",1)":e:u.hex(n)?(r=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(n,e,t,r){return e+e+t+t+r+r})),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):u.hsl(n)?function(n){var e,t,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),o=parseInt(a[1],10)/360,i=parseInt(a[2],10)/100,u=parseInt(a[3],10)/100,c=a[4]||1;function s(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+6*(e-n)*t:t<.5?e:t<2/3?n+(e-n)*(2/3-t)*6:n}if(0==i)e=t=r=u;else{var f=u<.5?u*(1+i):u+i-u*i,l=2*u-f;e=s(l,f,o+1/3),t=s(l,f,o),r=s(l,f,o-1/3)}return"rgba("+255*e+","+255*t+","+255*r+","+c+")"}(n):void 0;var e,t,r,a}(n);if(/\s/g.test(n))return n;var t=O(n),r=t?n.substr(0,n.length-t.length):n;return e?r+e:r}function A(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function N(n){for(var e,t=n.points,r=0,a=0;a<t.numberOfItems;a++){var o=t.getItem(a);a>0&&(r+=A(e,o)),e=o}return r}function S(n){if(n.getTotalLength)return n.getTotalLength();switch(n.tagName.toLowerCase()){case"circle":return o=n,2*Math.PI*P(o,"r");case"rect":return 2*P(a=n,"width")+2*P(a,"height");case"line":return A({x:P(r=n,"x1"),y:P(r,"y1")},{x:P(r,"x2"),y:P(r,"y2")});case"polyline":return N(n);case"polygon":return t=(e=n).points,N(e)+A(t.getItem(t.numberOfItems-1),t.getItem(0))}var e,t,r,a,o}function j(n,e){var t=e||{},r=t.el||function(n){for(var e=n.parentNode;u.svg(e)&&u.svg(e.parentNode);)e=e.parentNode;return e}(n),a=r.getBoundingClientRect(),o=P(r,"viewBox"),i=a.width,c=a.height,s=t.viewBox||(o?o.split(" "):[0,0,i,c]);return{el:r,viewBox:s,x:s[0]/1,y:s[1]/1,w:i,h:c,vW:s[2],vH:s[3]}}function q(n,e,t){function r(t){void 0===t&&(t=0);var r=e+t>=1?e+t:0;return n.el.getPointAtLength(r)}var a=j(n.el,n.svg),o=r(),i=r(-1),u=r(1),c=t?1:a.w/a.vW,s=t?1:a.h/a.vH;switch(n.property){case"x":return(o.x-a.x)*c;case"y":return(o.y-a.y)*s;case"angle":return 180*Math.atan2(u.y-i.y,u.x-i.x)/Math.PI}}function H(n,e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=F(u.pth(n)?n.totalLength:n,e)+"";return{original:r,numbers:r.match(t)?r.match(t).map(Number):[0],strings:u.str(n)||e?r.split(t):[]}}function V(n){return m(n?y(u.arr(n)?n.map(b):b(n)):[],(function(n,e,t){return t.indexOf(n)===e}))}function $(n){var e=V(n);return e.map((function(n,t){return{target:n,id:t,total:e.length,transforms:{list:T(n)}}}))}function W(n,e){var t=x(e);if(/^spring/.test(t.easing)&&(t.duration=s(t.easing)),u.arr(n)){var r=n.length;2!==r||u.obj(n[0])?u.fnc(e.duration)||(t.duration=e.duration/r):n={value:n}}var a=u.arr(n)?n:[n];return a.map((function(n,t){var r=u.obj(n)&&!u.pth(n)?n:{value:n};return u.und(r.delay)&&(r.delay=t?0:e.delay),u.und(r.endDelay)&&(r.endDelay=t===a.length-1?e.endDelay:0),r})).map((function(n){return k(n,t)}))}function Y(n,e){var t=[],r=e.keyframes;for(var a in r&&(e=k(function(n){for(var e=m(y(n.map((function(n){return Object.keys(n)}))),(function(n){return u.key(n)})).reduce((function(n,e){return n.indexOf(e)<0&&n.push(e),n}),[]),t={},r=function(r){var a=e[r];t[a]=n.map((function(n){var e={};for(var t in n)u.key(t)?t==a&&(e.value=n[t]):e[t]=n[t];return e}))},a=0;a<e.length;a++)r(a);return t}(r),e)),e)u.key(a)&&t.push({name:a,tweens:W(e[a],n)});return t}var X={css:function(n,e,t){return n.style[e]=t},attribute:function(n,e,t){return n.setAttribute(e,t)},object:function(n,e,t){return n[e]=t},transform:function(n,e,t,r,a){if(r.list.set(e,t),e===r.last||a){var o="";r.list.forEach((function(n,e){o+=e+"("+n+") "})),n.style.transform=o}}};function Z(n,e){$(n).forEach((function(n){for(var t in e){var r=C(e[t],n),a=n.target,o=O(r),i=L(a,t,o,n),u=E(F(r,o||O(i)),i),c=B(a,t);X[c](a,t,u,n.transforms,!0)}}))}function G(n,e){return m(y(n.map((function(n){return e.map((function(e){return function(n,e){var t=B(n.target,e.name);if(t){var r=function(n,e){var t;return n.tweens.map((function(r){var a=function(n,e){var t={};for(var r in n){var a=C(n[r],e);u.arr(a)&&1===(a=a.map((function(n){return C(n,e)}))).length&&(a=a[0]),t[r]=a}return t.duration=parseFloat(t.duration),t.delay=parseFloat(t.delay),t}(r,e),o=a.value,i=u.arr(o)?o[1]:o,c=O(i),s=L(e.target,n.name,c,e),f=t?t.to.original:s,l=u.arr(o)?o[0]:f,d=O(l)||O(s),p=c||d;return u.und(i)&&(i=f),a.from=H(l,p),a.to=H(E(i,l),p),a.start=t?t.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=g(a.easing,a.duration),a.isPath=u.pth(o),a.isPathTargetInsideSVG=a.isPath&&u.svg(e.target),a.isColor=u.col(a.from.original),a.isColor&&(a.round=1),t=a,a}))}(e,n),a=r[r.length-1];return{type:t,property:e.name,animatable:n,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}(n,e)}))}))),(function(n){return!u.und(n)}))}function Q(n,e){var t=n.length,r=function(n){return n.timelineOffset?n.timelineOffset:0},a={};return a.duration=t?Math.max.apply(Math,n.map((function(n){return r(n)+n.duration}))):e.duration,a.delay=t?Math.min.apply(Math,n.map((function(n){return r(n)+n.delay}))):e.delay,a.endDelay=t?a.duration-Math.max.apply(Math,n.map((function(n){return r(n)+n.duration-n.endDelay}))):e.endDelay,a}var z=0,_=[],R=function(){var n;function e(t){for(var r=_.length,a=0;a<r;){var o=_[a];o.paused?(_.splice(a,1),r--):(o.tick(t),a++)}n=a>0?requestAnimationFrame(e):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",(function(){K.suspendWhenDocumentHidden&&(J()?n=cancelAnimationFrame(n):(_.forEach((function(n){return n._onDocumentVisibility()})),R()))})),function(){n||J()&&K.suspendWhenDocumentHidden||!(_.length>0)||(n=requestAnimationFrame(e))}}();function J(){return!!document&&document.hidden}function K(t){void 0===t&&(t={});var r,o=0,i=0,u=0,c=0,s=null;function f(n){var e=window.Promise&&new Promise((function(n){return s=n}));return n.finished=e,e}var l,d,p,v,g,h,y,b,M=(d=w(n,l=t),v=Y(p=w(e,l),l),y=Q(h=G(g=$(l.targets),v),p),b=z,z++,k(d,{id:b,children:[],animatables:g,animations:h,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));function x(){var n=M.direction;"alternate"!==n&&(M.direction="normal"!==n?"normal":"reverse"),M.reversed=!M.reversed,r.forEach((function(n){return n.reversed=M.reversed}))}function O(n){return M.reversed?M.duration-n:n}function C(){o=0,i=O(M.currentTime)*(1/K.speed)}function P(n,e){e&&e.seek(n-e.timelineOffset)}function I(n){for(var e=0,t=M.animations,r=t.length;e<r;){var o=t[e],i=o.animatable,u=o.tweens,c=u.length-1,s=u[c];c&&(s=m(u,(function(e){return n<e.end}))[0]||s);for(var f=a(n-s.start-s.delay,0,s.duration)/s.duration,l=isNaN(f)?1:s.easing(f),d=s.to.strings,p=s.round,v=[],g=s.to.numbers.length,h=void 0,y=0;y<g;y++){var b=void 0,x=s.to.numbers[y],w=s.from.numbers[y]||0;b=s.isPath?q(s.value,l*x,s.isPathTargetInsideSVG):w+l*(x-w),p&&(s.isColor&&y>2||(b=Math.round(b*p)/p)),v.push(b)}var k=d.length;if(k){h=d[0];for(var O=0;O<k;O++){d[O];var C=d[O+1],P=v[O];isNaN(P)||(h+=C?P+C:P+" ")}}else h=v[0];X[o.type](i.target,o.property,h,i.transforms),o.currentValue=h,e++}}function D(n){M[n]&&!M.passThrough&&M[n](M)}function B(n){var e=M.duration,t=M.delay,l=e-M.endDelay,d=O(n);M.progress=a(d/e*100,0,100),M.reversePlayback=d<M.currentTime,r&&function(n){if(M.reversePlayback)for(var e=c;e--;)P(n,r[e]);else for(var t=0;t<c;t++)P(n,r[t])}(d),!M.began&&M.currentTime>0&&(M.began=!0,D("begin")),!M.loopBegan&&M.currentTime>0&&(M.loopBegan=!0,D("loopBegin")),d<=t&&0!==M.currentTime&&I(0),(d>=l&&M.currentTime!==e||!e)&&I(e),d>t&&d<l?(M.changeBegan||(M.changeBegan=!0,M.changeCompleted=!1,D("changeBegin")),D("change"),I(d)):M.changeBegan&&(M.changeCompleted=!0,M.changeBegan=!1,D("changeComplete")),M.currentTime=a(d,0,e),M.began&&D("update"),n>=e&&(i=0,M.remaining&&!0!==M.remaining&&M.remaining--,M.remaining?(o=u,D("loopComplete"),M.loopBegan=!1,"alternate"===M.direction&&x()):(M.paused=!0,M.completed||(M.completed=!0,D("loopComplete"),D("complete"),!M.passThrough&&"Promise"in window&&(s(),f(M)))))}return f(M),M.reset=function(){var n=M.direction;M.passThrough=!1,M.currentTime=0,M.progress=0,M.paused=!0,M.began=!1,M.loopBegan=!1,M.changeBegan=!1,M.completed=!1,M.changeCompleted=!1,M.reversePlayback=!1,M.reversed="reverse"===n,M.remaining=M.loop,r=M.children;for(var e=c=r.length;e--;)M.children[e].reset();(M.reversed&&!0!==M.loop||"alternate"===n&&1===M.loop)&&M.remaining++,I(M.reversed?M.duration:0)},M._onDocumentVisibility=C,M.set=function(n,e){return Z(n,e),M},M.tick=function(n){u=n,o||(o=u),B((u+(i-o))*K.speed)},M.seek=function(n){B(O(n))},M.pause=function(){M.paused=!0,C()},M.play=function(){M.paused&&(M.completed&&M.reset(),M.paused=!1,_.push(M),C(),R())},M.reverse=function(){x(),M.completed=!M.reversed,C()},M.restart=function(){M.reset(),M.play()},M.remove=function(n){nn(V(n),M)},M.reset(),M.autoplay&&M.play(),M}function U(n,e){for(var t=e.length;t--;)M(n,e[t].animatable.target)&&e.splice(t,1)}function nn(n,e){var t=e.animations,r=e.children;U(n,t);for(var a=r.length;a--;){var o=r[a],i=o.animations;U(n,i),i.length||o.children.length||r.splice(a,1)}t.length||r.length||e.pause()}return K.version="3.2.1",K.speed=1,K.suspendWhenDocumentHidden=!0,K.running=_,K.remove=function(n){for(var e=V(n),t=_.length;t--;)nn(e,_[t])},K.get=L,K.set=Z,K.convertPx=I,K.path=function(n,e){var t=u.str(n)?h(n)[0]:n,r=e||100;return function(n){return{property:n,el:t,svg:j(t),totalLength:S(t)*(r/100)}}},K.setDashoffset=function(n){var e=S(n);return n.setAttribute("stroke-dasharray",e),e},K.stagger=function(n,e){void 0===e&&(e={});var t=e.direction||"normal",r=e.easing?g(e.easing):null,a=e.grid,o=e.axis,i=e.from||0,c="first"===i,s="center"===i,f="last"===i,l=u.arr(n),d=l?parseFloat(n[0]):parseFloat(n),p=l?parseFloat(n[1]):0,v=O(l?n[1]:n)||0,h=e.start||0+(l?d:0),m=[],y=0;return function(n,e,u){if(c&&(i=0),s&&(i=(u-1)/2),f&&(i=u-1),!m.length){for(var g=0;g<u;g++){if(a){var b=s?(a[0]-1)/2:i%a[0],M=s?(a[1]-1)/2:Math.floor(i/a[0]),x=b-g%a[0],w=M-Math.floor(g/a[0]),k=Math.sqrt(x*x+w*w);"x"===o&&(k=-x),"y"===o&&(k=-w),m.push(k)}else m.push(Math.abs(i-g));y=Math.max.apply(Math,m)}r&&(m=m.map((function(n){return r(n/y)*y}))),"reverse"===t&&(m=m.map((function(n){return o?n<0?-1*n:-n:Math.abs(y-n)})))}return h+(l?(p-d)/y:d)*(Math.round(100*m[e])/100)+v}},K.timeline=function(n){void 0===n&&(n={});var t=K(n);return t.duration=0,t.add=function(r,a){var o=_.indexOf(t),i=t.children;function c(n){n.passThrough=!0}o>-1&&_.splice(o,1);for(var s=0;s<i.length;s++)c(i[s]);var f=k(r,w(e,n));f.targets=f.targets||n.targets;var l=t.duration;f.autoplay=!1,f.direction=t.direction,f.timelineOffset=u.und(a)?l:E(a,l),c(t),t.seek(f.timelineOffset);var d=K(f);c(d),i.push(d);var p=Q(i,n);return t.delay=p.delay,t.endDelay=p.endDelay,t.duration=p.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t},K.easing=g,K.penner=v,K.random=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},K}));const logoLoop=(n,e)=>anime({targets:n,rotate:-10*e,scale:1,complete:()=>{anime.remove(n),anime({targets:n,rotate:10*e,scale:1,complete:()=>logoLoop(n,e)})}});logoLoop("#logo-5e",1),logoLoop("#logo-mork-borg",-1);const discoverLoop=()=>anime({targets:["#discover-5e","#discover-mork-borg"],translateY:16,direction:"alternate",loop:!0,duration:2e3});anime({targets:["#discover-5e","#discover-mork-borg"],translateY:16,direction:"alternate",loop:!0,duration:2e3}),anime({targets:"#tag-new",scale:1.1,direction:"alternate",loop:!0,duration:500});