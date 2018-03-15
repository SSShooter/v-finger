!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t["v-finger-IV"]=e()}(this,function(){"use strict";function t(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function e(e,i){var s=function(e,i){var s=t(e)*t(i);if(0===s)return 0;var n=function(t,e){return t.x*e.x+t.y*e.y}(e,i)/s;return n>1&&(n=1),Math.acos(n)}(e,i);return function(t,e){return t.x*e.y-e.x*t.y}(e,i)>0&&(s*=-1),180*s/Math.PI}var i=function(t){this.handlers=[],this.el=t};function s(t,e){var s=new i(t);return s.add(e),s}i.prototype.add=function(t){this.handlers.push(t)},i.prototype.del=function(t){t||(this.handlers=[]);for(var e=this.handlers.length;e>=0;e--)this.handlers[e]===t&&this.handlers.splice(e,1)},i.prototype.dispatch=function(){for(var t=0,e=this.handlers.length;t<e;t++){var i=this.handlers[t];"function"==typeof i&&i.apply(this.el,arguments)}};var n=function(t,e){this.element="string"==typeof t?document.querySelector(t):t,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var i=function(){};this.rotate=s(this.element,e.rotate||i),this.touchStart=s(this.element,e.touchStart||i),this.multipointStart=s(this.element,e.multipointStart||i),this.multipointEnd=s(this.element,e.multipointEnd||i),this.pinch=s(this.element,e.pinch||i),this.swipe=s(this.element,e.swipe||i),this.tap=s(this.element,e.tap||i),this.doubleTap=s(this.element,e.doubleTap||i),this.longTap=s(this.element,e.longTap||i),this.singleTap=s(this.element,e.singleTap||i),this.pressMove=s(this.element,e.pressMove||i),this.twoFingerPressMove=s(this.element,e.twoFingerPressMove||i),this.touchMove=s(this.element,e.touchMove||i),this.touchEnd=s(this.element,e.touchEnd||i),this.touchCancel=s(this.element,e.touchCancel||i),this._cancelAllHandler=this.cancelAll.bind(this),window.removeEventListener("scroll",this._cancelAllHandler),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}};n.prototype={start:function(e){if(e.touches){this.now=Date.now(),this.x1=e.touches[0].pageX,this.y1=e.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(e,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var i=this.preV;if(e.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var s={x:e.touches[1].pageX-this.x1,y:e.touches[1].pageY-this.y1};i.x=s.x,i.y=s.y,this.pinchStartLen=t(i),this.multipointStart.dispatch(e,this.element)}this._preventTap=!1,this.notSingleTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(e,this.element),this._preventTap=!0,this.notSingleTap=!0}.bind(this),750)}},move:function(i){if(i.touches){var s=this.preV,n=i.touches.length,h=i.touches[0].pageX,a=i.touches[0].pageY;if(this.isDoubleTap=!1,n>1){var o=i.touches[1].pageX,r=i.touches[1].pageY,l={x:i.touches[1].pageX-h,y:i.touches[1].pageY-a};null!==s.x&&(this.pinchStartLen>0&&(i.zoom=t(l)/this.pinchStartLen,this.pinch.dispatch(i,this.element)),i.angle=e(l,s),this.rotate.dispatch(i,this.element)),s.x=l.x,s.y=l.y,null!==this.x2&&null!==this.sx2?(i.deltaX=(h-this.x2+o-this.sx2)/2,i.deltaY=(a-this.y2+r-this.sy2)/2):(i.deltaX=0,i.deltaY=0),this.twoFingerPressMove.dispatch(i,this.element),this.sx2=o,this.sy2=r}else null!==this.x2?(i.deltaX=h-this.x2,i.deltaY=a-this.y2):(i.deltaX=0,i.deltaY=0),this.pressMove.dispatch(i,this.element);this.touchMove.dispatch(i,this.element),this.notSingleTap=!0,this._cancelLongTap(),this.x2=h,this.y2=a,n>1&&i.preventDefault()}},end:function(t){if(t.changedTouches){this._cancelLongTap();var e=this;t.touches.length<2&&(this.multipointEnd.dispatch(t,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>120||this.y2&&Math.abs(this.y1-this.y2)>120?(t.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout(function(){e.swipe.dispatch(t,e.element)},0)):(!this.x2||Math.abs(this.x1-this.x2)<5&&Math.abs(this.y1-this.y2)<5)&&(this.tapTimeout=setTimeout(function(){e._preventTap||e.tap.dispatch(t,e.element),e.isDoubleTap&&(e.doubleTap.dispatch(t,e.element),clearTimeout(e.singleTapTimeout),e.isDoubleTap=!1)},0),e.isDoubleTap||e.notSingleTap||(e.singleTapTimeout=setTimeout(function(){e.singleTap.dispatch(t,e.element)},250))),this.touchEnd.dispatch(t,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}},cancelAll:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)},cancel:function(t){this.cancelAll(),this.touchCancel.dispatch(t,this.element)},_cancelLongTap:function(){clearTimeout(this.longTapTimeout)},_cancelSingleTap:function(){clearTimeout(this.singleTapTimeout)},_swipeDirection:function(t,e,i,s){return Math.abs(t-e)>=Math.abs(i-s)?t-e>0?"Left":"Right":i-s>0?"Up":"Down"},on:function(t,e){this[t]&&this[t].add(e)},off:function(t,e){this[t]&&this[t].del(e)},destroy:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,null}};var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=.017453292519943295,o=function(t,e,i,s,n,h,a,o,r,l,u,c,p,d,m,f){this.elements=window.Float32Array?new Float32Array(16):[];var T=this.elements;T[0]=void 0!==t?t:1,T[4]=e||0,T[8]=i||0,T[12]=s||0,T[1]=n||0,T[5]=void 0!==h?h:1,T[9]=a||0,T[13]=o||0,T[2]=r||0,T[6]=l||0,T[10]=void 0!==u?u:1,T[14]=c||0,T[3]=p||0,T[7]=d||0,T[11]=m||0,T[15]=void 0!==f?f:1};o.prototype={set:function(t,e,i,s,n,h,a,o,r,l,u,c,p,d,m,f){var T=this.elements;return T[0]=t,T[4]=e,T[8]=i,T[12]=s,T[1]=n,T[5]=h,T[9]=a,T[13]=o,T[2]=r,T[6]=l,T[10]=u,T[14]=c,T[3]=p,T[7]=d,T[11]=m,T[15]=f,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},multiplyMatrices:function(t,e){var i=t.elements,s=this.elements,n=i[0],h=i[4],a=i[8],o=i[12],r=i[1],l=i[5],u=i[9],c=i[13],p=i[2],d=i[6],m=i[10],f=i[14],T=i[3],y=i[7],g=i[11],v=i[15],x=e[0],w=e[1],M=e[2],b=e[3],X=e[4],Y=e[5],_=e[6],S=e[7],L=e[8],E=e[9],Z=e[10],P=e[11],k=e[12],D=e[13],A=e[14],F=e[15];return s[0]=n*x+h*X+a*L+o*k,s[4]=n*w+h*Y+a*E+o*D,s[8]=n*M+h*_+a*Z+o*A,s[12]=n*b+h*S+a*P+o*F,s[1]=r*x+l*X+u*L+c*k,s[5]=r*w+l*Y+u*E+c*D,s[9]=r*M+l*_+u*Z+c*A,s[13]=r*b+l*S+u*P+c*F,s[2]=p*x+d*X+m*L+f*k,s[6]=p*w+d*Y+m*E+f*D,s[10]=p*M+d*_+m*Z+f*A,s[14]=p*b+d*S+m*P+f*F,s[3]=T*x+y*X+g*L+v*k,s[7]=T*w+y*Y+g*E+v*D,s[11]=T*M+y*_+g*Z+v*A,s[15]=T*b+y*S+g*P+v*F,this},_rounded:function(t,e){return e=Math.pow(10,e||15),Math.round(t*e)/e},_arrayWrap:function(t){return window.Float32Array?new Float32Array(t):t},appendTransform:function(t,e,i,s,n,h,o,r,l,u,c,p,d,m){var f=o*a,T=this._rounded(Math.cos(f)),y=this._rounded(Math.sin(f)),g=r*a,v=this._rounded(Math.cos(g)),x=this._rounded(Math.sin(g)),w=l*a,M=this._rounded(Math.cos(-1*w)),b=this._rounded(Math.sin(-1*w));return this.multiplyMatrices(this,this._arrayWrap([1,0,0,t,0,T,y,e,0,-y,T,i,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([v,0,x,0,0,1,0,0,-x,0,v,0,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([M*s,b*n,0,0,-b*s,M*n,0,0,0,0,1*h,0,0,0,0,1])),(u||c)&&this.multiplyMatrices(this,this._arrayWrap([this._rounded(Math.cos(u*a)),this._rounded(Math.sin(u*a)),0,0,-1*this._rounded(Math.sin(c*a)),this._rounded(Math.cos(c*a)),0,0,0,0,1,0,0,0,0,1])),(p||d||m)&&(this.elements[12]-=p*this.elements[0]+d*this.elements[4]+m*this.elements[8],this.elements[13]-=p*this.elements[1]+d*this.elements[5]+m*this.elements[9],this.elements[14]-=p*this.elements[2]+d*this.elements[6]+m*this.elements[10]),this}};var r=function(t,e,i,s,n,h){return this.a=null==t?1:t,this.b=e||0,this.c=i||0,this.d=null==s?1:s,this.tx=n||0,this.ty=h||0,this};function l(t,e,i){Object.defineProperty(t,e,{get:function(){return this["_"+e]},set:function(t){this["_"+e]=t,i()}})}function u(t,e){if(!t.___mixCSS3Transform){var i,s=["translateX","translateY","translateZ","scaleX","scaleY","scaleZ","rotateX","rotateY","rotateZ","skewX","skewY","originX","originY","originZ"],n=(i=t,"object"===("undefined"==typeof HTMLElement?"undefined":h(HTMLElement))?i instanceof HTMLElement:i&&"object"===(void 0===i?"undefined":h(i))&&null!==i&&1===i.nodeType&&"string"==typeof i.nodeName);e||s.push("perspective"),t.___mixCSS3Transform=!0,function(t,e,i){for(var s=0,n=e.length;s<n;s++)l(t,e[s],i)}(t,s,function(){var i=t.matrix3d.identity().appendTransform(t.translateX,t.translateY,t.translateZ,t.scaleX,t.scaleY,t.scaleZ,t.rotateX,t.rotateY,t.rotateZ,t.skewX,t.skewY,t.originX,t.originY,t.originZ),s=(e?"":"perspective("+t.perspective+"px) ")+"matrix3d("+Array.prototype.slice.call(i.elements).join(",")+")";n?t.style.transform=t.style.msTransform=t.style.OTransform=t.style.MozTransform=t.style.webkitTransform=s:t.transform=s}),t.matrix3d=new o,e||(t.perspective=500),t.scaleX=t.scaleY=t.scaleZ=1,t.translateX=t.translateY=t.translateZ=t.rotateX=t.rotateY=t.rotateZ=t.skewX=t.skewY=t.originX=t.originY=t.originZ=0}}return r.prototype={identity:function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},appendTransform:function(t,e,i,s,n,h,o,r,l){if(n%360)var u=n*a,c=Math.cos(u),p=Math.sin(u);else c=1,p=0;return h||o?(h*=a,o*=a,this.append(Math.cos(o),Math.sin(o),-Math.sin(h),Math.cos(h),t,e),this.append(c*i,p*i,-p*s,c*s,0,0)):this.append(c*i,p*i,-p*s,c*s,t,e),(r||l)&&(this.tx-=r*this.a+l*this.c,this.ty-=r*this.b+l*this.d),this},append:function(t,e,i,s,n,h){var a=this.a,o=this.b,r=this.c,l=this.d;return this.a=t*a+e*r,this.b=t*o+e*l,this.c=i*a+s*r,this.d=i*o+s*l,this.tx=n*a+h*r+this.tx,this.ty=n*o+h*l+this.ty,this},initialize:function(t,e,i,s,n,h){return this.a=t,this.b=e,this.c=i,this.d=s,this.tx=n,this.ty=h,this},setValues:function(t,e,i,s,n,h){return this.a=null==t?1:t,this.b=e||0,this.c=i||0,this.d=null==s?1:s,this.tx=n||0,this.ty=h||0,this},copy:function(t){return this.setValues(t.a,t.b,t.c,t.d,t.tx,t.ty)}},u.getMatrix3D=function(t){var e={translateX:0,translateY:0,translateZ:0,rotateX:0,rotateY:0,rotateZ:0,skewX:0,skewY:0,originX:0,originY:0,originZ:0,scaleX:1,scaleY:1,scaleZ:1};for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return(new o).identity().appendTransform(e.translateX,e.translateY,e.translateZ,e.scaleX,e.scaleY,e.scaleZ,e.rotateX,e.rotateY,e.rotateZ,e.skewX,e.skewY,e.originX,e.originY,e.originZ).elements},u.getMatrix2D=function(t){var e={translateX:0,translateY:0,rotation:0,skewX:0,skewY:0,originX:0,originY:0,scaleX:1,scaleY:1};for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return(new r).identity().appendTransform(e.translateX,e.translateY,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.originX,e.originY)},{install:function(t,e){t.prototype.toJSON=function(){},t.directive("finger-test",{inserted:function(t){console.log("vFingerMK42 added")}}),t.directive("transform",{inserted:function(t){u(t)}});var i=new Map;t.directive("finger",{inserted:function(t,e){var s,h,a,o=i.get(t);void 0===o?i.set(t,new n(t,(s={},h=e.arg,a=function(t,i){return e.value(t,i)},h in s?Object.defineProperty(s,h,{value:a,enumerable:!0,configurable:!0,writable:!0}):s[h]=a,s))):o.on(e.arg,function(t,i){return e.value(t,i)})}})}}});
