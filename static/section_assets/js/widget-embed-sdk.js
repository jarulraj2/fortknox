import{O as Z,R as $,S as Et,T as tt,U as bt,V as U,W as Wt,X as at,Z as Kt,Q as zt,p as Gt,s as J,a as l,$ as Jt,x as jt,a0 as Xt,a1 as Yt,a2 as Zt,Y as te,a3 as st,a4 as ee,a5 as re,a6 as ot,a7 as ne,a8 as ie,a9 as ae,P as j,v as se,I as ct,J as ut,z as oe,C as It,G as ce,D as ue,E as de,F as le,N as he}from"./assets/index-DaMC146V.js";var fe=/\s/;function pe(e){for(var t=e.length;t--&&fe.test(e.charAt(t)););return t}var ge=/^\s+/;function me(e){return e&&e.slice(0,pe(e)+1).replace(ge,"")}var dt=NaN,ye=/^[-+]0x[0-9a-f]+$/i,we=/^0b[01]+$/i,Ce=/^0o[0-7]+$/i,_e=parseInt;function lt(e){if(typeof e=="number")return e;if(Z(e))return dt;if($(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=$(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=me(e);var r=we.test(e);return r||Ce.test(e)?_e(e.slice(2),r?2:8):ye.test(e)?dt:+e}function ve(e){return e}var Ae="[object AsyncFunction]",Ee="[object Function]",be="[object GeneratorFunction]",Ie="[object Proxy]";function Se(e){if(!$(e))return!1;var t=Et(e);return t==Ee||t==be||t==Ae||t==Ie}var K=tt["__core-js_shared__"],ht=function(){var e=/[^.]+$/.exec(K&&K.keys&&K.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function $e(e){return!!ht&&ht in e}var Pe=Function.prototype,Te=Pe.toString;function Re(e){if(e!=null){try{return Te.call(e)}catch{}try{return e+""}catch{}}return""}var Oe=/[\\^$.*+?()[\]{}|]/g,De=/^\[object .+?Constructor\]$/,xe=Function.prototype,qe=Object.prototype,ke=xe.toString,Le=qe.hasOwnProperty,Ne=RegExp("^"+ke.call(Le).replace(Oe,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Me(e){if(!$(e)||$e(e))return!1;var t=Se(e)?Ne:De;return t.test(Re(e))}function Ue(e,t){return e==null?void 0:e[t]}function et(e,t){var r=Ue(e,t);return Me(r)?r:void 0}function Qe(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var Ve=800,He=16,Be=Date.now;function Fe(e){var t=0,r=0;return function(){var n=Be(),i=He-(n-r);if(r=n,i>0){if(++t>=Ve)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function We(e){return function(){return e}}var N=function(){try{var e=et(Object,"defineProperty");return e({},"",{}),e}catch{}}(),Ke=N?function(e,t){return N(e,"toString",{configurable:!0,enumerable:!1,value:We(t),writable:!0})}:ve,ze=Fe(Ke),Ge=9007199254740991,Je=/^(?:0|[1-9]\d*)$/;function St(e,t){var r=typeof e;return t=t??Ge,!!t&&(r=="number"||r!="symbol"&&Je.test(e))&&e>-1&&e%1==0&&e<t}function je(e,t,r){t=="__proto__"&&N?N(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r}function $t(e,t){return e===t||e!==e&&t!==t}var Xe=Object.prototype,Ye=Xe.hasOwnProperty;function Ze(e,t,r){var n=e[t];(!(Ye.call(e,t)&&$t(n,r))||r===void 0&&!(t in e))&&je(e,t,r)}var ft=Math.max;function tr(e,t,r){return t=ft(t===void 0?e.length-1:t,0),function(){for(var n=arguments,i=-1,a=ft(n.length-t,0),s=Array(a);++i<a;)s[i]=n[t+i];i=-1;for(var o=Array(t+1);++i<t;)o[i]=n[i];return o[t]=r(s),Qe(e,this,o)}}var er=9007199254740991;function rr(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=er}var nr="[object Arguments]";function pt(e){return bt(e)&&Et(e)==nr}var Pt=Object.prototype,ir=Pt.hasOwnProperty,ar=Pt.propertyIsEnumerable,Tt=pt(function(){return arguments}())?pt:function(e){return bt(e)&&ir.call(e,"callee")&&!ar.call(e,"callee")},sr=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,or=/^\w*$/;function cr(e,t){if(U(e))return!1;var r=typeof e;return r=="number"||r=="symbol"||r=="boolean"||e==null||Z(e)?!0:or.test(e)||!sr.test(e)||t!=null&&e in Object(t)}var x=et(Object,"create");function ur(){this.__data__=x?x(null):{},this.size=0}function dr(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var lr="__lodash_hash_undefined__",hr=Object.prototype,fr=hr.hasOwnProperty;function pr(e){var t=this.__data__;if(x){var r=t[e];return r===lr?void 0:r}return fr.call(t,e)?t[e]:void 0}var gr=Object.prototype,mr=gr.hasOwnProperty;function yr(e){var t=this.__data__;return x?t[e]!==void 0:mr.call(t,e)}var wr="__lodash_hash_undefined__";function Cr(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=x&&t===void 0?wr:t,this}function P(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}P.prototype.clear=ur;P.prototype.delete=dr;P.prototype.get=pr;P.prototype.has=yr;P.prototype.set=Cr;function _r(){this.__data__=[],this.size=0}function Q(e,t){for(var r=e.length;r--;)if($t(e[r][0],t))return r;return-1}var vr=Array.prototype,Ar=vr.splice;function Er(e){var t=this.__data__,r=Q(t,e);if(r<0)return!1;var n=t.length-1;return r==n?t.pop():Ar.call(t,r,1),--this.size,!0}function br(e){var t=this.__data__,r=Q(t,e);return r<0?void 0:t[r][1]}function Ir(e){return Q(this.__data__,e)>-1}function Sr(e,t){var r=this.__data__,n=Q(r,e);return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this}function R(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}R.prototype.clear=_r;R.prototype.delete=Er;R.prototype.get=br;R.prototype.has=Ir;R.prototype.set=Sr;var $r=et(tt,"Map");function Pr(){this.size=0,this.__data__={hash:new P,map:new($r||R),string:new P}}function Tr(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function V(e,t){var r=e.__data__;return Tr(t)?r[typeof t=="string"?"string":"hash"]:r.map}function Rr(e){var t=V(this,e).delete(e);return this.size-=t?1:0,t}function Or(e){return V(this,e).get(e)}function Dr(e){return V(this,e).has(e)}function xr(e,t){var r=V(this,e),n=r.size;return r.set(e,t),this.size+=r.size==n?0:1,this}function T(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}T.prototype.clear=Pr;T.prototype.delete=Rr;T.prototype.get=Or;T.prototype.has=Dr;T.prototype.set=xr;var qr="Expected a function";function rt(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(qr);var r=function(){var n=arguments,i=t?t.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var s=e.apply(this,n);return r.cache=a.set(i,s)||a,s};return r.cache=new(rt.Cache||T),r}rt.Cache=T;var kr=500;function Lr(e){var t=rt(e,function(n){return r.size===kr&&r.clear(),n}),r=t.cache;return t}var Nr=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Mr=/\\(\\)?/g,Ur=Lr(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(Nr,function(r,n,i,a){t.push(i?a.replace(Mr,"$1"):n||r)}),t});function H(e,t){return U(e)?e:cr(e,t)?[e]:Ur(Wt(e))}function nt(e){if(typeof e=="string"||Z(e))return e;var t=e+"";return t=="0"&&1/e==-1/0?"-0":t}function Qr(e,t){t=H(t,e);for(var r=0,n=t.length;e!=null&&r<n;)e=e[nt(t[r++])];return r&&r==n?e:void 0}function Vr(e,t){for(var r=-1,n=t.length,i=e.length;++r<n;)e[i+r]=t[r];return e}var gt=at?at.isConcatSpreadable:void 0;function Hr(e){return U(e)||Tt(e)||!!(gt&&e&&e[gt])}function Br(e,t,r,n,i){var a=-1,s=e.length;for(r||(r=Hr),i||(i=[]);++a<s;){var o=e[a];r(o)?Vr(i,o):i[i.length]=o}return i}function Fr(e){var t=e==null?0:e.length;return t?Br(e):[]}function Wr(e){return ze(tr(e,void 0,Fr),e+"")}function Kr(e,t){return e!=null&&t in Object(e)}function zr(e,t,r){t=H(t,e);for(var n=-1,i=t.length,a=!1;++n<i;){var s=nt(t[n]);if(!(a=e!=null&&r(e,s)))break;e=e[s]}return a||++n!=i?a:(i=e==null?0:e.length,!!i&&rr(i)&&St(s,i)&&(U(e)||Tt(e)))}function Gr(e,t){return e!=null&&zr(e,t,Kr)}var z=function(){return tt.Date.now()},Jr="Expected a function",jr=Math.max,Xr=Math.min;function Yr(e,t,r){var n,i,a,s,o,c,u=0,d=!1,h=!1,f=!0;if(typeof e!="function")throw new TypeError(Jr);t=lt(t)||0,$(r)&&(d=!!r.leading,h="maxWait"in r,a=h?jr(lt(r.maxWait)||0,t):a,f="trailing"in r?!!r.trailing:f);function p(g){var E=n,D=i;return n=i=void 0,u=g,s=e.apply(D,E),s}function _(g){return u=g,o=setTimeout(v,t),d?p(g):s}function w(g){var E=g-c,D=g-u,it=t-E;return h?Xr(it,a-D):it}function m(g){var E=g-c,D=g-u;return c===void 0||E>=t||E<0||h&&D>=a}function v(){var g=z();if(m(g))return A(g);o=setTimeout(v,w(g))}function A(g){return o=void 0,f&&n?p(g):(n=i=void 0,s)}function Bt(){o!==void 0&&clearTimeout(o),u=0,n=c=i=o=void 0}function Ft(){return o===void 0?s:A(z())}function W(){var g=z(),E=m(g);if(n=arguments,i=this,c=g,E){if(o===void 0)return _(c);if(h)return clearTimeout(o),o=setTimeout(v,t),p(c)}return o===void 0&&(o=setTimeout(v,t)),s}return W.cancel=Bt,W.flush=Ft,W}function Zr(e,t,r,n){if(!$(e))return e;t=H(t,e);for(var i=-1,a=t.length,s=a-1,o=e;o!=null&&++i<a;){var c=nt(t[i]),u=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return e;if(i!=s){var d=o[c];u=void 0,u===void 0&&(u=$(d)?d:St(t[i+1])?[]:{})}Ze(o,c,u),o=o[c]}return e}function tn(e,t,r){for(var n=-1,i=t.length,a={};++n<i;){var s=t[n],o=Qr(e,s);r(o,s)&&Zr(a,H(s,e),o)}return a}function en(e,t){return tn(e,t,function(r,n){return Gr(e,n)})}var rn=Wr(function(e,t){return e==null?{}:en(e,t)});class nn{constructor(t=1){this.queue=[],this.running=!1,this.maxConcurrent=1,this.currentRunning=0,this.paused=!1,this.maxConcurrent=t}enqueue(t){return new Promise((r,n)=>{const i=async()=>{try{const a=await t();return r(a),a}catch(a){throw n(a),a}};this.queue.push(i),this.run()})}insert(t,r){return new Promise((n,i)=>{const a=async()=>{try{const o=await t();return n(o),o}catch(o){throw i(o),o}},s=Math.max(0,Math.min(r,this.queue.length));this.queue.splice(s,0,a),this.run()})}clear(){this.queue=[]}pause(){this.paused=!0}resume(){this.paused=!1,this.run()}get length(){return this.queue.length}get isRunning(){return this.running}get isPaused(){return this.paused}async run(){if(!(this.running||this.paused||this.currentRunning>=this.maxConcurrent)){for(this.running=!0;this.queue.length>0&&!this.paused&&this.currentRunning<this.maxConcurrent;){this.currentRunning++;const t=this.queue.shift();try{await t()}catch(r){console.error("Task execution failed:",r)}finally{this.currentRunning--}}this.running=!1,this.queue.length>0&&!this.paused&&this.run()}}}const B="GraphQL Client",mt=0,yt=3,Rt="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",Ot="Response returned unexpected Content-Type:",Dt="An unknown error has occurred. The API did not return a data object or any errors in its response.",X={json:"application/json",multipart:"multipart/mixed"},wt="X-SDK-Variant",Ct="X-SDK-Version",an="shopify-graphql-client",sn="1.3.1",xt=1e3,on=[429,503],qt=/@(defer)\b/i,_t=`\r
`,cn=/boundary="?([^=";]+)"?/i,vt=_t+_t;function I(e,t=B){return e.startsWith(`${t}`)?e:`${t}: ${e}`}function O(e){return e instanceof Error?e.message:JSON.stringify(e)}function kt(e){return e instanceof Error&&e.cause?e.cause:void 0}function Lt(e){return e.flatMap(({errors:t})=>t??[])}function Nt({client:e,retries:t}){if(t!==void 0&&(typeof t!="number"||t<mt||t>yt))throw new Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than ${mt} or greater than ${yt}`)}function C(e,t){return t&&(typeof t!="object"||Array.isArray(t)||typeof t=="object"&&Object.keys(t).length>0)?{[e]:t}:{}}function Mt(e,t){if(e.length===0)return t;const n={[e.pop()]:t};return e.length===0?n:Mt(e,n)}function Ut(e,t){return Object.keys(t||{}).reduce((r,n)=>(typeof t[n]=="object"||Array.isArray(t[n]))&&e[n]?(r[n]=Ut(e[n],t[n]),r):(r[n]=t[n],r),Array.isArray(e)?[...e]:{...e})}function Qt([e,...t]){return t.reduce(Ut,{...e})}function un({clientLogger:e,customFetchApi:t=fetch,client:r=B,defaultRetryWaitTime:n=xt,retriableCodes:i=on}){const a=async(s,o,c)=>{const u=o+1,d=c+1;let h;try{if(h=await t(...s),e({type:"HTTP-Response",content:{requestParams:s,response:h}}),!h.ok&&i.includes(h.status)&&u<=d)throw new Error;return h}catch(f){if(u<=d){const p=h==null?void 0:h.headers.get("Retry-After");return await dn(p?parseInt(p,10):n),e({type:"HTTP-Retry",content:{requestParams:s,lastResponse:h,retryAttempt:o,maxRetries:c}}),a(s,u,c)}throw new Error(I(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${O(f)}`,r))}};return a}async function dn(e){return new Promise(t=>setTimeout(t,e))}function ln({headers:e,url:t,customFetchApi:r=fetch,retries:n=0,logger:i}){Nt({client:B,retries:n});const a={headers:e,url:t,retries:n},s=hn(i),o=un({customFetchApi:r,clientLogger:s,defaultRetryWaitTime:xt}),c=fn(o,a),u=pn(c),d=vn(c);return{config:a,fetch:c,request:u,requestStream:d}}function hn(e){return t=>{e&&e(t)}}async function Vt(e){const{errors:t,data:r,extensions:n}=await e.json();return{...C("data",r),...C("extensions",n),headers:e.headers,...t||!r?{errors:{networkStatusCode:e.status,message:I(t?Rt:Dt),...C("graphQLErrors",t),response:e}}:{}}}function fn(e,{url:t,headers:r,retries:n}){return async(i,a={})=>{const{variables:s,headers:o,url:c,retries:u,keepalive:d,signal:h}=a,f=JSON.stringify({query:i,variables:s});Nt({client:B,retries:u});const p=Object.entries({...r,...o}).reduce((w,[m,v])=>(w[m]=Array.isArray(v)?v.join(", "):v.toString(),w),{});return!p[wt]&&!p[Ct]&&(p[wt]=an,p[Ct]=sn),e([c??t,{method:"POST",headers:p,body:f,signal:h,keepalive:d}],1,u??n)}}function pn(e){return async(...t)=>{if(qt.test(t[0]))throw new Error(I("This operation will result in a streamable response - use requestStream() instead."));try{const r=await e(...t),{status:n,statusText:i}=r,a=r.headers.get("content-type")||"";return r.ok?a.includes(X.json)?Vt(r):{errors:{networkStatusCode:n,message:I(`${Ot} ${a}`),response:r}}:{errors:{networkStatusCode:n,message:I(i),response:r}}}catch(r){return{errors:{message:O(r)}}}}}async function*gn(e){const t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(const r of e.body)yield t.decode(r);else{const r=e.body.getReader();let n;try{for(;!(n=await r.read()).done;)yield t.decode(n.value)}finally{r.cancel()}}}function mn(e,t){return{async*[Symbol.asyncIterator](){try{let r="";for await(const n of e)if(r+=n,r.indexOf(t)>-1){const i=r.lastIndexOf(t),s=r.slice(0,i).split(t).filter(o=>o.trim().length>0).map(o=>o.slice(o.indexOf(vt)+vt.length).trim());s.length>0&&(yield s),r=r.slice(i+t.length),r.trim()==="--"&&(r="")}}catch(r){throw new Error(`Error occured while processing stream payload - ${O(r)}`)}}}}function yn(e){return{async*[Symbol.asyncIterator](){yield{...await Vt(e),hasNext:!1}}}}function wn(e){return e.map(t=>{try{return JSON.parse(t)}catch(r){throw new Error(`Error in parsing multipart response - ${O(r)}`)}}).map(t=>{const{data:r,incremental:n,hasNext:i,extensions:a,errors:s}=t;if(!n)return{data:r||{},...C("errors",s),...C("extensions",a),hasNext:i};const o=n.map(({data:c,path:u,errors:d})=>({data:c&&u?Mt(u,c):{},...C("errors",d)}));return{data:o.length===1?o[0].data:Qt([...o.map(({data:c})=>c)]),...C("errors",Lt(o)),hasNext:i}})}function Cn(e,t){if(e.length>0)throw new Error(Rt,{cause:{graphQLErrors:e}});if(Object.keys(t).length===0)throw new Error(Dt)}function _n(e,t){var o,c;const r=(t??"").match(cn),n=`--${r?r[1]:"-"}`;if(!((o=e.body)!=null&&o.getReader)&&!((c=e.body)!=null&&c[Symbol.asyncIterator]))throw new Error("API multipart response did not return an iterable body",{cause:e});const i=gn(e);let a={},s;return{async*[Symbol.asyncIterator](){var u;try{let d=!0;for await(const h of mn(i,n)){const f=wn(h);s=((u=f.find(_=>_.extensions))==null?void 0:u.extensions)??s;const p=Lt(f);a=Qt([a,...f.map(({data:_})=>_)]),d=f.slice(-1)[0].hasNext,Cn(p,a),yield{...C("data",a),...C("extensions",s),hasNext:d}}if(d)throw new Error("Response stream terminated unexpectedly")}catch(d){const h=kt(d);yield{...C("data",a),...C("extensions",s),errors:{message:I(O(d)),networkStatusCode:e.status,...C("graphQLErrors",h==null?void 0:h.graphQLErrors),response:e},hasNext:!1}}}}}function vn(e){return async(...t)=>{if(!qt.test(t[0]))throw new Error(I("This operation does not result in a streamable response - use request() instead."));try{const r=await e(...t),{statusText:n}=r;if(!r.ok)throw new Error(n,{cause:r});const i=r.headers.get("content-type")||"";switch(!0){case i.includes(X.json):return yn(r);case i.includes(X.multipart):return _n(r,i);default:throw new Error(`${Ot} ${i}`,{cause:r})}}catch(r){return{async*[Symbol.asyncIterator](){const n=kt(r);yield{errors:{message:I(O(r)),...C("networkStatusCode",n==null?void 0:n.status),...C("response",n)},hasNext:!1}}}}}}function An({client:e,storeDomain:t}){try{if(!t||typeof t!="string")throw new Error;const r=t.trim(),n=r.match(/^https?:/)?r:`https://${r}`,i=new URL(n);return i.protocol="https",i.origin}catch(r){throw new Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}function Ht({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:n}){const i=`${e}: the provided apiVersion ("${r}")`,a=`Currently supported API versions: ${t.join(", ")}`;if(!r||typeof r!="string")throw new Error(`${i} is invalid. ${a}`);const s=r.trim();t.includes(s)||(n?n({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${i} is likely deprecated or not supported. ${a}`))}function M(e){const t=e*3-2;return t===10?t:`0${t}`}function G(e,t,r){const n=t-r;return n<=0?`${e-1}-${M(n+4)}`:`${e}-${M(n)}`}function En(){const e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),n=Math.floor(t/3+1);return{year:r,quarter:n,version:`${r}-${M(n)}`}}function bn(){const{year:e,quarter:t,version:r}=En(),n=t===4?`${e+1}-01`:`${e}-${M(t+1)}`;return[G(e,t,3),G(e,t,2),G(e,t,1),r,n,"unstable"]}function In(e){return t=>({...t??{},...e.headers})}function Sn({getHeaders:e,getApiUrl:t}){return(r,n)=>{const i=[r];if(n&&Object.keys(n).length>0){const{variables:a,apiVersion:s,headers:o,retries:c}=n;i.push({...a?{variables:a}:{},...o?{headers:e(o)}:{},...s?{url:t(s)}:{},...c?{retries:c}:{}})}return i}}const At="application/json",$n="storefront-api-client",Pn="1.0.6",Tn="X-Shopify-Storefront-Access-Token",Rn="Shopify-Storefront-Private-Token",On="X-SDK-Variant",Dn="X-SDK-Version",xn="X-SDK-Variant-Source",q="Storefront API Client";function qn(e){if(e&&typeof window<"u")throw new Error(`${q}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`)}function kn(e,t){if(!e&&!t)throw new Error(`${q}: a public or private access token must be provided`);if(e&&t)throw new Error(`${q}: only provide either a public or private access token`)}function Ln({storeDomain:e,apiVersion:t,publicAccessToken:r,privateAccessToken:n,clientName:i,retries:a=0,customFetchApi:s,logger:o}){const c=bn(),u=An({client:q,storeDomain:e}),d={client:q,currentSupportedApiVersions:c,logger:o};Ht({...d,apiVersion:t}),kn(r,n),qn(n);const h=Nn(u,t,d),f={storeDomain:u,apiVersion:t,...r?{publicAccessToken:r}:{privateAccessToken:n},headers:{"Content-Type":At,Accept:At,[On]:$n,[Dn]:Pn,...i?{[xn]:i}:{},...r?{[Tn]:r}:{[Rn]:n}},apiUrl:h(),clientName:i},p=ln({headers:f.headers,url:f.apiUrl,retries:a,customFetchApi:s,logger:o}),_=In(f),w=Mn(f,h),m=Sn({getHeaders:_,getApiUrl:w});return Object.freeze({config:f,getHeaders:_,getApiUrl:w,fetch:(...A)=>p.fetch(...m(...A)),request:(...A)=>p.request(...m(...A)),requestStream:(...A)=>p.requestStream(...m(...A))})}function Nn(e,t,r){return n=>{n&&Ht({...r,apiVersion:n});const i=(n??t).trim();return`${e}/api/${i}/graphql.json`}}function Mn(e,t){return r=>r?t(r):e.apiUrl}const F=`
  fragment cart on Cart {
    id
    totalQuantity
    updatedAt
    createdAt
    checkoutUrl
    note
    attributes {
        key
        value
    }
    cost {
      checkoutChargeAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
      totalAmountEstimated
      totalTaxAmountEstimated
      totalDutyAmountEstimated
      subtotalAmountEstimated
    }
    buyerIdentity {
      email
      customer {
        email
        id
      }
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          province
          country
          zip
        }
      }
    }
    discountCodes {
      applicable
      code
    }
    discountAllocations {
      ... on CartCodeDiscountAllocation {
        code
        discountedAmount {
          amount
          currencyCode
        }
      }
      ... on CartAutomaticDiscountAllocation {
        title
        discountedAmount {
          amount
          currencyCode
        }
      }
      ... on CartCustomDiscountAllocation {
        title
        discountedAmount {
          amount
          currencyCode
        }
      }
    }
    deliveryGroups(first: 10) {
      edges {
        node {
          deliveryAddress {
            address1
            address2
            city
            country
            zip
          }
          id
          deliveryOptions {
            code
            deliveryMethodType
            description
            handle
            title
          }
          selectedDeliveryOption {
            code
            title
            handle
            estimatedCost {
              amount
              currencyCode
            }
          }
        }
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          discountAllocations {
            ... on CartCodeDiscountAllocation {
              code
              discountedAmount {
                amount
                currencyCode
              }
            }
            ... on CartAutomaticDiscountAllocation {
              title
              discountedAmount {
                amount
                currencyCode
              }
            }
            ... on CartCustomDiscountAllocation {
              title
              discountedAmount {
                amount
                currencyCode
              }
            }
          }
          attributes {
            key
            value
          }
          cost {
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              sku
              title
              quantityAvailable
              currentlyNotInStock
              availableForSale
              barcode
              selectedOptions {
                name
                value
              }
              requiresShipping
              weight
              image {
                originalSrc
                altText
                width
                height
                url
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
              price {
                amount
                currencyCode
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
    attributes {
      key
      value
    }
  }
  
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    MF_cartInfo: metafield(namespace: "cart", key: "info") {
      
  value
  type
  description
  namespace
  key

    }
    MF_cartModal: metafield(namespace: "cart", key: "modal") {
      
  value
  type
  description
  namespace
  key

    }
  }
  
  fragment image on Image {
    url
    altText
    width
    height
  }

  
  fragment seo on SEO {
    description
    title
  }
`,Un=`query cart($cartId: ID!) {
  cart(id: $cartId) {
    id
    createdAt
    updatedAt
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
  }
}
`,Qn=`mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...cart
    }
    userErrors {
      field
      message
    }
  }
}
${F}
`,Vn=`mutation cartAttributesUpdate($attributes: [AttributeInput!]!, $cartId: ID!) {
  cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
    cart {
      ...cart
    }
    userErrors {
      field
      message
    }
  }
}
${F}
`,Hn=`mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...cart
    }
    userErrors {
      field
      message
    }
  }
}
${F}  
`,Bn=`mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...cart
    }
    userErrors {
      field
      message
    }
  }
}
${F}  
`,Fn=`query cart($cartId: ID!) {
  cart(id: $cartId) {
    attributes {
      key
      value
    }
  }
}
`;class L{constructor(t){this.collection=[],this.level=t.level,this.prefix=t.prefix||"[SDK]"}info(t){(this.level==="debug"||this.level==="info")&&this.collection.push(`${this.prefix} ${new Date().toLocaleTimeString()} ${t}`)}error(t){console.error(`${this.prefix} ${t}`)}getCollection(){console.log(JSON.stringify(this.collection,null,2))}}class Wn{constructor(t){this.unsubscribe=null,this.config=t.getConfig(),this.client=Ln({storeDomain:`https://${this.config.storeDomain}/`,apiVersion:"2024-10",publicAccessToken:this.config.publicAccessToken}),this.logger=new L({level:"info",prefix:"Widget-SDK-Cart"}),this.queue=new nn(1),this.discountAttrs={},this.unsubscribe=t.subscribe(r=>{this.config=r})}updateDiscountAttrs(t){this.discountAttrs=t}checkCartCookie(){if(this.config.cartId){const t=this.config.country?`/${this.config.country}`:"/",r=this.config.cartId.split("/");return document.cookie=`cart=${r[r.length-1]}; path=${t};`,!0}return!1}async getCartInfo(){if(!this.checkCartCookie())throw new Error("not find CartId");const t=this.config.country?`/${this.config.country}/cart.json`:"/cart.json";return await fetch(t+`?v=${new Date().getTime()}`).then(n=>n.json())}async addProduct(t){var i,a,s,o,c,u;(i=this.logger)==null||i.info(`---------> add product ${t}`);const r=[];(a=this.discountAttrs)!=null&&a.is_gift&&r.push({key:"_discounts_function_env",value:JSON.stringify(this.discountAttrs)});const n=await this.client.request(Qn,{variables:{cartId:this.config.cartId,lines:[{attributes:r,merchandiseId:t,quantity:1}]}});return(u=(c=(o=(s=n==null?void 0:n.data)==null?void 0:s.cartLinesAdd)==null?void 0:o.cart)==null?void 0:c.lines)==null?void 0:u.edges}async removeProduct(t){var n,i,a,s,o;(n=this.logger)==null||n.info(`---------> remove product ${t}`);const r=await this.client.request(Hn,{variables:{cartId:this.config.cartId,lineIds:t}});return(o=(s=(a=(i=r==null?void 0:r.data)==null?void 0:i.cartLinesRemove)==null?void 0:a.cart)==null?void 0:s.lines)==null?void 0:o.edges}async updateProduct(t){var n,i,a,s;const r=await this.client.request(Bn,{variables:{cartId:this.config.cartId,lines:t}});return(s=(a=(i=(n=r==null?void 0:r.data)==null?void 0:n.cartLinesUpdate)==null?void 0:i.cart)==null?void 0:a.lines)==null?void 0:s.edges}async updateCartAttr(t){return await this.client.request(Vn,{variables:{cartId:this.config.cartId,attributes:t}})}async getCartLineId(){var r,n,i;const t=await this.client.request(Un,{variables:{cartId:this.config.cartId}});return(i=(n=(r=t==null?void 0:t.data)==null?void 0:r.cart)==null?void 0:n.lines)==null?void 0:i.edges}async getCartAttributes(){var r;const{data:t}=await this.client.request(Fn,{variables:{cartId:this.config.cartId}});return((r=t==null?void 0:t.cart)==null?void 0:r.attributes)??[]}async updateCartAttrByQueue(t,r){const n=async()=>{const i=await this.getCartAttributes();if(t==="ew_quote_id"){const a=i.find(s=>s.key===t);a?a.value=`${a.value},${r.value}`:i.push(r)}else i.push(...r);await this.updateCartAttr(i)};try{this.queue.enqueue(n.bind(this))}catch(i){console.log(i)}}getCartIdByCookies(){try{const t=Kt(),r=["shopifyCheckoutId_","shopifyCartId_","shopifyCheckoutUrl_"];for(const n of r){const i=t[n+this.config.storeDomain];if(i)return n==="shopifyCheckoutUrl_"?i.substring(i.lastIndexof("/")+1):i}return""}catch(t){return console.log(t),""}}}const S=class S{constructor(t){this.listeners=new Set,this.config={...t}}static getInstance(t){return!S.instance&&t&&(S.instance=new S(t)),S.instance}getConfig(){return this.config}subscribe(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}updateConfig(t){this.config={...this.config,...t},this.listeners.forEach(r=>r(this.config))}};S.instance=null;let Y=S;class y{static getCartlineIdByMerchandiseId(t){const r={};return this.cartLines.forEach(n=>{r[n.node.merchandise.id]=n.node.id}),r[t]}}class Kn{constructor(t,r){this.unsubscribe=null,y.cartLines=[],this.config=t.getConfig(),this.logger=new L({level:"info",prefix:"Widget-SDK-BP"}),this.cart=r,this.widget=new zn(t,this.cart),this.qutoeLog=new zt,this.quoteQueue=new Gt(this.qutoeLog,["update_cart"]),this.unsubscribe=t.subscribe(n=>{this.config=n}),this.initialize()}async initialize(){var t,r,n,i,a;if(!((t=this.config)!=null&&t.container)){(r=this==null?void 0:this.logger)==null||r.error("Missing container");return}try{const{profile:s}=J(l);if(!((i=(n=s==null?void 0:s.bp)==null?void 0:n.meta)!=null&&i.live))throw new Error("merchant status is not live");if(!this.config.cartId){const o=this.cart.getCartIdByCookies();if(o)this.updateConfig({cartId:o});else throw new Error("not find CartId")}y.cartLines=await this.cart.getCartLineId(),this.getQuotesAndUpdateCart(JSON.parse(localStorage.getItem("17-discount-info")??"{}"))}catch(s){(a=this==null?void 0:this.logger)==null||a.error(`---------> ${s.message}`)}}getAllLogs(){var t;console.log(JSON.stringify((t=this.qutoeLog)==null?void 0:t.getAllLogs(),null,2))}updateConfig(t){var n,i;(n=this.logger)==null||n.info(`---------> update config ${JSON.stringify(t)}`);const r={...this.config,...t};(i=k.instance)==null||i.updateMainConfig(r)}async operationCart(t,r){y.cartLines=await this.cart[t](r)}async getCartInfo(){const t=await this.cart.getCartInfo();return l.addCartBP=Jt(t,l.cart),l.cart=t,t}getCheckedStatus(){var a,s,o;const{cart:t,profile:r,addCartBP:n}=J(l);if(n===!1)return String(n);const i=String(((a=t==null?void 0:t.attributes)==null?void 0:a["bp-checked"])??((o=(s=r==null?void 0:r.bp)==null?void 0:s.meta)==null?void 0:o.checked)??!1);return i==="undefined"?"false":i}getQuotesAndUpdateCart(t){var i;let r=!1;(t==null?void 0:t.merchant_discount)===100?(this.cart.updateDiscountAttrs({is_gift:!0,rule_id:t==null?void 0:t.discount_rule_id}),t.widget_default_on&&l.discountInfo.widget_default_on!==t.widget_default_on&&(r=!0)):this.cart.updateDiscountAttrs({}),l.discountInfo=t||{},localStorage.setItem("17-discount-info",JSON.stringify(t||{}));const n=[{status:"get_cart",method:async(a,s)=>{var c,u;s("开始-获取购物车信息");const o=await this.getCartInfo();if((c=this.logger)==null||c.info(`---------> get cart info ${JSON.stringify(rn(o,["token","attributes",["item_count"]]))}`),(o==null?void 0:o.item_count)===0)throw(u=this.logger)==null||u.info("not product in cart"),new Error("not product in cart");s("完成-获取购物车信息"),await a()}},{status:"get_quote",method:async(a,s)=>{var c;s("开始-获取BP报价");const o=await Zt();if((c=this.logger)==null||c.info(`---------> get bp qutoe ${JSON.stringify(o)}`),(o==null?void 0:o.status)!=="accepted")throw this.widget.destroy(),await this.removeAllSeelProducts(),await this.cart.updateCartAttrByQueue("bp_quote_id",[{key:"bp_quote_id",value:""}]),await this.updateCart(),new Error("quote status is not accepted");l.quote=o,s("完成-BP报价"),await a()}},{status:"update_cart",method:async(a,s)=>{var d,h,f,p,_;s("开始-更新购物车"),r&&(l.cart.attributes["bp-checked"]="true");const o=this.getCheckedStatus();o==="true"?await this.addSeelProducts():await this.removeAllSeelProducts();const c={"bp-checked":o,bp_quote_id:(d=l.quote)==null?void 0:d.quoteId,cart_token:(h=l.cart)==null?void 0:h.token},u=Object.entries(c).map(([w,m])=>({key:w,value:m}));if(await this.cart.updateCartAttrByQueue("bp_quote_id",u),t){const w=(f=l.cart.items.filter(m=>m.vendor!=="Seel"))==null?void 0:f[0];if(w){(p=this.logger)==null||p.info(`获取product原有的attrs属性 ${w.properties}`);const m=[...Object.entries(w.properties).map(([v,A])=>({key:v,value:A})),{key:"_seventeen_bp_discount_info",value:JSON.stringify(t)}];(_=this.logger)==null||_.info(`即将更改的lint item attrs属性 ${JSON.stringify(m)}`),await this.operationCart("updateProduct",[{id:y.getCartlineIdByMerchandiseId(`gid://shopify/ProductVariant/${w.id}`),attributes:m}])}}l.cart.attributes["bp-checked"]=o,s("完成-更新购物车"),await a()}},{status:"update_view",method:async(a,s)=>{s("开始-更新视图"),this.widget.render(),await this.updateCart(),s("完成-更新视图"),await a()}}];(i=this.quoteQueue)==null||i.addQuoteTask(new jt(n,{reCheck:this.recheck.bind(this)}))}async updateCart(){var t;await this.config.updateCart(y.cartLines),(t=this.logger)==null||t.info(`---------> update cart method ${y.cartLines.length}`)}async removeAllSeelProducts(){const t=Xt(l.cart);if(t!=null&&t.length){const r=t.map(n=>`gid://shopify/ProductVariant/${n.id}`);await this.operationCart("removeProduct",r.map(n=>y.getCartlineIdByMerchandiseId(n)))}}async addSeelProducts(){var n,i,a,s;const{nextSeelVariant:t,notNextSeelVariants:r}=Yt(l.quote,l.cart);if((n=this.logger)==null||n.info(`---------> cart diff - nextSeelVariant ${t==null?void 0:t.price}`),(i=this.logger)==null||i.info(`---------> cart diff - notNextSeelVariants ${r==null?void 0:r.map(o=>o.price)}`),r!=null&&r.length){const o=r.map(c=>`gid://shopify/ProductVariant/${c.id}`);await this.operationCart("removeProduct",o.map(c=>y.getCartlineIdByMerchandiseId(c)))}if(t){const o=`gid://shopify/ProductVariant/${t.id}`;y.cartLines=await this.cart.getCartLineId();const c=y.cartLines.filter(d=>d.node.merchandise.id===o).map(d=>d.node.id);c.length>1&&(c.pop(),await this.operationCart("removeProduct",c));const u=y.getCartlineIdByMerchandiseId(o);await this.operationCart("updateProduct",[{id:u,merchandiseId:o,quantity:1}])}else await this.operationCart("addProduct",`gid://shopify/ProductVariant/${(s=(a=l)==null?void 0:a.quote)==null?void 0:s.variantId}`)}async recheck(){var r,n;(r=this.logger)==null||r.info("---------> recheck start"),await this.cart.getCartInfo(),this.getCheckedStatus()==="false"?await this.removeAllSeelProducts():await this.addSeelProducts(),await this.updateCart(),(n=this.logger)==null||n.info("---------> recheck finishi")}}let zn=class{constructor(t,r){this.unsubscribe=null,this.cart=r,this.config=t.getConfig(),this.logger=new L({level:"info",prefix:"Widget-SDK-BP"}),this.unsubscribe=t.subscribe(n=>{this.config=n})}render(){var n;const t=document.querySelectorAll(this.config.container);if(!t.length)return;const r=document.querySelectorAll(`.${te}`);if(!(r!=null&&r.length)){st();for(let i=0;i<t.length;i++){const a=ee();t[i].append(a)}}re(),l.hasWidgetEvents||(l.hasWidgetEvents=!0,this.bindEvents()),(n=this.logger)==null||n.info("---------> render widget")}bounceHandleCheck(){return Yr(async t=>{var o,c;const{quote:r,cart:n}=J(l);if(String(t)===String(n.attributes["bp-checked"]))return;const{variantId:i=""}=r;(o=this.logger)==null||o.info(`---------> bounceHandleCheck ${t}`),t?(ae({event_name:j.BP_Widget_Add_To_Cart,default_checked:!1,position:"cart"}),y.cartLines=await this.cart.addProduct(`gid://shopify/ProductVariant/${i}`)):y.cartLines=await this.cart.removeProduct([y.getCartlineIdByMerchandiseId(`gid://shopify/ProductVariant/${i}`)]),l.cart.attributes["bp-checked"]=String(t);const a={"bp-checked":String(t),bp_quote_id:r.quoteId,cart_token:n==null?void 0:n.token},s=Object.entries(a).map(([u,d])=>({key:u,value:d}));this.config.updateCart(y.cartLines),await this.cart.updateCartAttrByQueue("bp_quote_id",s),(c=this.logger)==null||c.info("---------> bounceHandleCheck update cart method")},500)}bindEvents(){var r,n;const t=this.bounceHandleCheck();for(let i=0;i<((r=ot)==null?void 0:r.length);i++){const a=(n=ot[i])==null?void 0:n.querySelector(`.yq-widget[data-yq-product-type="${ne.BP}"]`);a==null||a.addEventListener("click",async s=>{const o=s.target,{infoIconLink:c}=ie();o!=null&&o.hasAttribute("data-yq-widget-input")?t(o.checked):o.classList.contains("yq-widget-info")&&window.open(c,"_blank")})}}destroy(){st()}};class Gn{constructor(t,r){this.curPlans=[],this.cartAttributes=[],this.unsubscribe=null,this.config=t.getConfig(),this.widget=new Jn(this.config),this.logger=new L({level:"info",prefix:"Widget-SDK-EW"}),this.cart=r,l.ew.configs=se[l.shop]??{},this.unsubscribe=t.subscribe(n=>{this.config=n})}async addCartSuccess(t){var s,o,c,u;const{attributes:r}=t;this.cartAttributes=r;const n=(s=l.ew.quote)==null?void 0:s.quoteId;if(!n)return;const i=(o=l.ew.selectedPlan)==null?void 0:o.isModal,a=(u=(c=this.curPlans)==null?void 0:c.find(d=>{var h;return d.planId===((h=l.ew.selectedPlan)==null?void 0:h.planId)}))==null?void 0:u.term;a&&(i?ct(ut.EW,{event_name:j.EW_Modal_Add_To_Cart,plan:a,position:"cart"}):ct(ut.EW,{event_name:j.EW_Widget_Add_To_Cart,plan:a,position:"cart"})),await this.updateCartAttrEwQuoteId(n)}async updateCartAttrEwQuoteId(t){const r="ew_quote_id";await this.cart.updateCartAttrByQueue(r,{key:r,value:t})}getCurVariantPlan(t){var i,a,s,o;const n=((o=(((s=(a=(i=l)==null?void 0:i.ew)==null?void 0:a.quote)==null?void 0:s.productQuoteResult)??[]).find(c=>c.variantId===t))==null?void 0:o.plans)??[];return this.curPlans=n,n}updateConfig(t){var n,i;(n=this.logger)==null||n.info(`---------> update config ${JSON.stringify(t)}`);const r={...this.config,...t};(i=k.instance)==null||i.updateMainConfig(r)}async getQuote({productId:t,variantId:r}){var n;if(!this.isQuoteing)try{this.isQuoteing=!0;const i=l.ew.quote;if(!(i!=null&&i.quoteId)){!this.config.cartId&&this.cart.getCartIdByCookies()&&this.updateConfig({cartId:this.cart.getCartIdByCookies()});const s=await oe(t);if((s==null?void 0:s.status)!=="accepted")throw new Error(`quote status is ${s==null?void 0:s.status}`);l.ew.quote=s,this.updateCartAttrEwQuoteId(s.quoteId)}l.ew.selectedPlan={};const a=this.getCurVariantPlan(r);if(!a.length)throw new Error("no plans");return this.widget.render(a),{code:0,message:"success"}}catch(i){return(n=this.logger)==null||n.error(`---------> get ew quote error: ${i}`),It(),{code:-1,message:i}}finally{this.isQuoteing=!1}}getPlan(){return l.ew.selectedPlan}showModal(t){var a,s;const{img:r=null}=t??{},n=this.curPlans,i=new CustomEvent("protection-option-selected",{detail:{planId:(a=n[0])==null?void 0:a.planId,variantId:(s=n[0])==null?void 0:s.variantId}});return document.dispatchEvent(i),ce.showModal(n,r)}}class Jn{constructor(t){this.config=t}render(t){const r=document.querySelectorAll(this.config.ew_container);if(!r.length)return;const n=document.querySelectorAll(`.${ue}`);if(!(n!=null&&n.length)){It();for(let i=0;i<r.length;i++){const a=de();r[i].append(a)}}le(t)}}const b=class b{constructor(t){var r;if(b.instance)return b.instance;this.configManager=Y.getInstance(t),this.cart=new Wn(this.configManager),this.logger=new L({level:"info",prefix:"Widget-SDK"}),b.instance=this;try{const n=[];l.shop=this.configManager.getConfig().storeDomain,he("3.0").then(({bp:i,ew:a})=>{var s,o;if(l.profile={bp:i,ew:a},(s=i==null?void 0:i.meta)!=null&&s.live){const{customStr:c}=i;if(c)try{const u=JSON.parse(c);l.configs=u.configs}catch(u){console.error(u.message)}n.push({namespace:"bp",instance:new Kn(this.configManager,this.cart)})}(o=a==null?void 0:a.meta)!=null&&o.live&&n.push({namespace:"ew",instance:new Gn(this.configManager,this.cart)}),this.applyMixins(this,n)})}catch(n){(r=this.logger)==null||r.error(`---------> init store error: ${n}`)}}init(){return this}getVersion(){return b.VERSION}applyMixins(t,r){for(const{namespace:n,instance:i}of r){const a=Object.getOwnPropertyNames(Object.getPrototypeOf(i)).filter(s=>s!=="constructor");if(n==="bp"){a.forEach(s=>{t[s]=i[s].bind(i)});continue}t[n]||(t[n]={}),a.forEach(s=>{t[n][s]=i[s].bind(i)})}return t}updateMainConfig(t){this.configManager.updateConfig(t)}};b.VERSION="1.0.0",b.instance=null;let k=b;window.WidgetSdk=k;
