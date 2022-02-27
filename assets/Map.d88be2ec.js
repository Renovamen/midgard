var nt=Object.defineProperty,at=Object.defineProperties;var it=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var ct=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable;var B=(n,e,t)=>e in n?nt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,P=(n,e)=>{for(var t in e||(e={}))ct.call(e,t)&&B(n,t,e[t]);if(H)for(var t of H(e))rt.call(e,t)&&B(n,t,e[t]);return n},U=(n,e)=>at(n,it(e));var p=(n,e,t)=>(B(n,typeof e!="symbol"?e+"":e,t),t);import{d as X,o as g,b as y,e as k,G as J,n as lt,k as Q,r as pt,B as ut,H as mt,I as dt,J as ht,K as ft,f as x,w as C,T as S,F as K,p as G,l as vt,a as I,y as j,C as R,t as _t,A as gt,g as kt,q as yt,s as bt,v as Et,L as xt}from"./vendor.3c28c2ee.js";import{_ as Z,l as _,C as T,g as D,o as M,H as Mt,P as wt,I as $t}from"./Package.de4881d3.js";import{a as L,s as A}from"./index.a70f9522.js";const Ct=X({props:["block","map"],emits:["autoMove"],setup(n){const e=n,t=()=>{const s="#c3944e",c="#51963d",a=e.block.blockType,r=T.MAP_BLOCK_TYPES;let i={display:"inline-block",background:c};return(a!=r.ROAD||a==r.HERO||e.block.event)&&(i.background=s),i},o=()=>{const s=e.block,c=["road","hero","stick","end"],a=T.MAP_BLOCK_TYPES.STICK;let r=["map-block"];r.push(c[Number(s.blockType)]||""),s.event&&r.push(s.event.event_type);const i=e.map.$data.mapData,l=[[-1,-1],[-1,1],[1,-1],[1,1]],{x:m,y:h,blockType:f}=s;for(let u=0;u<4;u++){const d=_.exports.map(new Array(3),(v,b)=>{const[E,F]=l[u];let[$,O]=[[m+E,h],[m,h+F],[m+E,h+F]][b];return i[$]&&i[$][O]?i[$][O].blockType:a});f==a?_.exports.every(d,v=>v!=a)&&r.push(`r-${u+1}`):_.exports.every(d.slice(0,2),v=>v==a)&&r.push(`r-${u+1}`)}return r};return(s,c)=>(g(),y("div",{style:lt(t()),onClick:c[0]||(c[0]=a=>s.$emit("autoMove"))},[k("span",{class:J(o())},null,2)],4))}});var It=Z(Ct,[["__scopeId","data-v-aed2ada4"]]);class Tt{constructor(e,t){p(this,"x");p(this,"y");p(this,"parent");p(this,"G");p(this,"H");p(this,"getF",()=>this.G+this.H);this.x=e,this.y=t,this.parent=null,this.G=0,this.H=null}}class Dt{constructor(e,t,o){p(this,"map");p(this,"start");p(this,"end");p(this,"init",()=>{const e={startBlock:this.start,endBlock:this.end,stickList:_.exports.filter(_.exports.flattenDeep(this.map.mapData),{blockType:"2"}),openList:[],closeList:[],isInList:function(s,c){const a=_.exports.findIndex(this[c],{x:s.x,y:s.y});return~a&&{index:a}}};Object.assign(this.map,e),this.map.openList.push(this.map.startBlock);let t=this.step();if(!t.find)return console.info("\u65E0\u6CD5\u751F\u5B58\u8DEF\u5F84!"),[];t=t.endBlock;const o=[];for(;t.parent.parent;)t=t.parent,o.push(t);return o.reverse().push(this.end),o});p(this,"step",()=>{this.map.openList=this.map.openList.sort(function(o,s){return o.getF()-s.getF()});const e=this.map.openList.shift();if(!e)return{find:!1};this.map.closeList.push(e);const t=this.around(e);for(let o=0;o<t.length;o++){const s=t[o],c=this.map.isInList(s,"openList");if(s.parent=e,s.H=this.countH(s),s.G=this.countG(s)+(e.G||0),!c){if(s.x===this.map.endBlock.x&&s.y===this.map.endBlock.y)return{find:!0,endBlock:s};this.map.openList.push(s);continue}e.G+this.countG(s)<this.map.openList[c.index].G&&(this.map.openList[c.index].parent=e)}return this.step()});p(this,"around",e=>{const t=[];for(let o=-1;o<=1;o++)for(let s=-1;s<=1;s++){if(o===0&&s===0||o!==0&&s!==0)continue;const c=e.x+o,a=e.y+s;if(c>=this.map.row||a>=this.map.col||c<0||a<0)continue;const r=new Tt(c,a);this.map.isInList(r,"closeList")||this.map.isInList(r,"stickList")||t.push(r)}return t});p(this,"countH",e=>{const t=Math.abs(e.x-this.map.endBlock.x),o=Math.abs(e.y-this.map.endBlock.y);return(t+o)*10});p(this,"countG",e=>{const t=e.parent;return e.x!==t.x&&e.y!==t.y?14:10});this.map=_.exports.cloneDeep(e),this.start=t,this.end=o}}const w=".map-dialog-modal",tt=".shadow-view",et=()=>{const n=document.createElement("div"),e=document.createElement("div"),t=document.querySelector("#router-view"),o={height:300,width:200,animated:"animate__animated animate__faster animate__zoomIn",backForce:.2};return e.className=tt.slice(1),Object.assign(e.style,{position:"absolute",background:`rgba(0,0,0,${o.backForce})`,width:"100%",height:"100%",left:"0px",top:"0px",zIndex:"10"}),Object.assign(n.style,{position:"absolute",width:`${o.height}px`,height:`${o.width}px`,left:`${(t.offsetWidth-o.width)/2}px`,top:`${(t.offsetHeight-o.height)/2}px`,zIndex:"20"}),{modal:n,shadowView:e,opt:o,view:t}},st=n=>{A("hero","$canMove",!0);const e=document.querySelector(w),t=document.querySelector(tt);e&&e.parentNode.removeChild(e),t&&t.parentNode.removeChild(t),n&&n()},ot=T.ITEM_LEVEL,Lt=function(n,e){const t=et(),o=t.modal,s=t.shadowView,c=t.opt,a=t.view;Object.assign(o,{className:[c.animated,w.slice(1)].join(" "),innerHTML:`
      <div class="close" @click="this.close">+</div>
      <div class="msg m-b-4 radius-2">
        {{this.record.msg}}
      </div>
      <div class="change m-b-4 radius-2" v-if="this.record.need && this.record.get">
        <span>\u8981\u652F\u4ED8</span>
        <template v-for="item in this.record.need">
          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], 'name') }}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>\u4E3A\u4EE3\u4EF7\uFF0C\u6765\u4EA4\u6362</span>
        <template v-for="item in this.record.get">
          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], 'name') }}</span>*<span class="num">{{item[1]}}</span>
        </template>
        <span>\u5417?</span>
      </div>
      <div class="event">
        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">
          {{e.title}}
        </button>
        <button v-if="this.isEnd" class="action radius-2" @click="close">\u7ED3\u675F\u5BF9\u8BDD</button>
      </div>
    `}),a.appendChild(o),a.appendChild(s),Q({store:L,created(){this.event=n,this.$i=0,this.isEnd=!1,this.next()},methods:{next(){if(this.$isEnd){this.close();return}this.record=r(this.event.data[this.$i]),this.isEnd=this.$i++===this.event.data.length-1,this.$forceUpdate()},action(i){i.call(this)},close(){st(e)},getColor(i){return{color:ot[D(i).grade||0]}},itemKey(i,l){const m=D(i);return m[l]||m}}}).mount(w);function r(i){let l=_.exports.cloneDeep(i);typeof l=="string"&&(l={msg:l});const m=_.exports.map(l.buttons,function(h){if(typeof h=="object")return h;const f=h.match(/\[([^]+)\]\{([^]+)\}/),u={};if(u.title=f[1],!f[2])return u;if(h[0]!=="#")u.action=function(){const[d,v]=f[2].split(",");this.$i=Number(d),this.next(),Number(v)&&(this.isEnd=!0)};else{const d=f[2].split(","),v=d.unshift();u.action=function(){const b=i.need||[],E=i.get||[];M.isEnoughItem(b)?M.getItem(E).length?this.$i=d[1]:(M.getItem(E,!0),M.costItem(b),this.$i=d[2]):this.$i=d[0],this.next(),Number(v)&&(this.isEnd=!0)}}return u});return l.buttons=m,l}},Ft=function(n,e){const t=et(),o=t.modal,s=t.shadowView,c=t.opt,a=t.view;Object.assign(o,{className:[c.animated,w.slice(1)].join(" "),innerHTML:`
      <div class="close" @click="this.close">+</div>
      <div class="msg m-b-4 radius-2">
        {{this.record.msg}}
      </div>
      <div class="change m-b-4 radius-2" v-if="this.record.get">
        <span>\u5305\u88F9\u4E2D\u6709</span>
        <template v-for="item in this.record.get">
          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], 'name') }}</span>*<span class="num">{{ item[1] }}</span>
        </template>
        <span>\uFF0C\u8981\u62FE\u53D6\u5417?</span>
      </div>
      <div class="event">
        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">
          {{ e.title }}
        </button>
        <button v-if="this.isEnd" class="action radius-2" @click="close">\u7ED3\u675F</button>
      </div>
    `}),a.appendChild(o),a.appendChild(s),Q({store:L,created(){this.chest=n,this.$i=0,this.isEnd=!1,this.next()},methods:{next(){if(this.$isEnd){this.close();return}this.record=r(this.chest.data[this.$i]),this.isEnd=this.$i++===this.chest.data.length-1,this.$forceUpdate()},action(i){i.call(this)},close(){st(e)},getColor(i){return{color:ot[D(i).grade||0]}},itemKey(i,l){const m=D(i);return m[l]||m}}}).mount(w);function r(i){let l=_.exports.cloneDeep(i);typeof l=="string"&&(l={msg:l});const m=_.exports.map(l.buttons,function(h){if(typeof h=="object")return h;const f=h.match(/\[([^]+)\]\{([^]+)\}/),u={};if(u.title=f[1],!f[2])return u;if(h[0]!=="#")u.action=function(){const[d,v]=f[2].split(",");this.$i=Number(d),this.next(),Number(v)&&(this.isEnd=!0)};else{const d=f[2].split(","),v=d.unshift();u.action=function(){const b=i.get||[];M.getItem(b).length?this.$i=Number(d[0]):(M.getItem(b,!0),this.$i=Number(d[1])),this.next(),Number(v)&&(this.isEnd=!0)}}return u});return l.buttons=m,l}},V="ArrowUp",Y="ArrowDown",q="ArrowLeft",z="ArrowRight",W=280,N=T.MAP_BLOCK_TYPES;class Bt{constructor(e){p(this,"map");p(this,"canMoveDelay");p(this,"keyUpFunc");p(this,"autoMoveTimer");p(this,"start",()=>{this.keyUpFunc=e=>{!e.key||(this.autoMoveTimer&&clearInterval(this.autoMoveTimer),this.move(e.key))},document.addEventListener("keyup",this.keyUpFunc)});p(this,"stop",()=>{document.removeEventListener("keyup",this.keyUpFunc),this.autoMoveTimer!==null&&clearInterval(this.autoMoveTimer)});p(this,"move",e=>{if(!this.canMoveDelay)return;this.canMoveDelay=!1,setTimeout(()=>{this.canMoveDelay=!0},W);let t=this.map.hero.x,o=this.map.hero.y;if(L.state.hero.$canMove)switch(e){case V:t--;break;case Y:t++;break;case q:o--;break;case z:o++;break}let s=null;try{s=this.map.$data.mapData[t][o]}catch{}if(!s||s.blockType!=N.ROAD)return;this.map.hero.blockType=N.ROAD,s.blockType=N.HERO;const{event_type:c,event:a}=s.event||{};switch(L.commit("map/UPDATE"),(c==="map-chest"||c==="map-dialog")&&delete s.event,this.map.hero=s,c){case"map-chest":this.autoMove([]),A("hero","$canMove",!1),Ft(a,()=>this.start());break;case"map-dialog":this.autoMove([]),A("hero","$canMove",!1),Lt(a,()=>this.start());break}});p(this,"autoMove",e=>{const t=_.exports.cloneDeep(e);this.autoMoveTimer&&clearInterval(this.autoMoveTimer),this.autoMoveTimer=setInterval(()=>{const o=t.splice(0,1)[0];if(!o){this.autoMoveTimer&&clearInterval(this.autoMoveTimer);return}const s=this.map.hero.x,c=this.map.hero.y;let a="";switch(!0){case o.x<s:a=V;break;case o.x>s:a=Y;break;case o.y<c:a=q;break;case o.y>c:a=z;break}this.move(a),t.length<1&&this.autoMoveTimer!==null&&clearInterval(this.autoMoveTimer)},W+100)});this.map=e,this.canMoveDelay=!0,this.keyUpFunc=null,this.autoMoveTimer=null,this.start()}}const St=X({name:"Map",components:{MapBlock:It,HomeInfo:Mt,Package:wt},setup(){const n=vt(),e=xt(),t=pt({opt:{info:!1,tip:!0},map:new $t(n.state.map.list[0])}),o=new Bt(t.map);ut(()=>n.state.map.UPDATE,()=>{var r;(r=e==null?void 0:e.proxy)==null||r.$forceUpdate()});const s=()=>{const r=document.querySelector(".map"),i=document.querySelector(".map-block"),l=i.offsetWidth,m=i.offsetHeight,h=t.map.hero,{row:f,col:u}=t.map.$data,d=document.querySelector(".map-data .map").style;d.left=(r.offsetWidth-l*f)/2-(h.y-(u-1)/2)*l+"px",d.top=(r.offsetHeight-m*u)/2-(h.x-(f-1)/2)*m+"px"},c=()=>{t.opt.info=!t.opt.info},a=r=>{const i=new Dt(t.map.$data,t.map.hero,r).init();o.autoMove(i)};return mt(()=>{s()}),dt(()=>{s()}),ht(()=>{o&&o.stop()}),setTimeout(()=>{t.opt.tip=!1},5e3),U(P({},ft(t)),{togglePackage:c,autoMove:a})}}),Nt=n=>(bt("data-v-6367d36d"),n=n(),Et(),n),At={class:"map"},Ot=yt("\u56DE\u57CE"),Ht={key:0,class:"arrow-left"},Pt={key:1,class:"arrow-right"},Ut={key:0,class:"tip"},Kt={class:"map-name"},Gt=Nt(()=>k("div",{class:"tip-blocklist"},[k("span",{class:"tip-block map-chest"},"\u5305\u88F9"),k("span",{class:"tip-block map-dialog"},"\u4E8B\u4EF6"),k("span",{class:"tip-block hero"},"\u4F60")],-1)),jt={class:"map-data"},Rt={class:"map"};function Vt(n,e,t,o,s,c){const a=I("router-link"),r=I("Package"),i=I("HomeInfo"),l=I("MapBlock");return g(),y("div",At,[x(a,{class:"btn backhome",to:"/"},{default:C(()=>[Ot]),_:1}),x(S,{"enter-active-class":"animate__animated animate__faster animate__slideInUp","leave-active-class":"animate__animated animate__faster animate__slideOutDown"},{default:C(()=>[j(x(r,{class:"v-package"},null,512),[[R,n.opt.info]])]),_:1}),x(S,{"enter-active-class":"animate__animated animate__faster animate__slideInDown","leave-active-class":"animate__animated animate__faster animate__slideOutUp"},{default:C(()=>[j(x(i,{class:"right-info",transition:"bounce"},null,512),[[R,n.opt.info]])]),_:1}),k("div",{class:J(["show-btn",n.opt.info?"opened":"closed"]),onClick:e[0]||(e[0]=(...m)=>n.togglePackage&&n.togglePackage(...m))},[n.opt.info?(g(),y("span",Ht)):(g(),y("span",Pt))],2),x(S,{"enter-active-class":"animate__animated animate__slideInRight","leave-active-class":"animate__animated animate__slideOutRight"},{default:C(()=>[n.opt.tip?(g(),y("div",Ut,[k("div",Kt,_t(n.map.$opt.name),1),Gt])):gt("",!0)]),_:1}),k("div",jt,[k("div",Rt,[(g(!0),y(K,null,G(n.map.$data.mapData,(m,h)=>(g(),y("div",{key:`line-${String(h)}`},[(g(!0),y(K,null,G(m,(f,u)=>(g(),kt(l,{key:`block-${String(u)}`,block:f,map:n.map,onAutoMove:d=>n.autoMove(f)},null,8,["block","map","onAutoMove"]))),128))]))),128))])])])}var Xt=Z(St,[["render",Vt],["__scopeId","data-v-6367d36d"]]);export{Xt as default};
