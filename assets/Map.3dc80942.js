var t=Object.defineProperty,e=Object.defineProperties,s=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(e,s,a)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[s]=a,c=(t,e,s)=>(o(t,"symbol"!=typeof e?e+"":e,s),s);import{d as r,b as l,e as p,G as h,n as m,o as d,k as u,l as v,r as f,B as b,H as g,I as y,J as k,K as _,L as x,q as w,t as M,a as $,f as T,w as I,y as L,C as E,T as O,v as D,A,F as C,p as P,g as j,s as H}from"./vendor.b126bf3d.js";import{C as B,l as N,g as U,o as S,_ as F,a as G,I as K}from"./Package.b34fb8e5.js";import{a as R,s as q}from"./index.c39460ba.js";var V=r({props:["block","map"],emits:["autoMove"],setup(t){const e=t,s=()=>{const t=e.block.blockType,s=B.MAP_BLOCK_TYPES;let a={display:"inline-block",background:"#51963d"};return(t!=s.ROAD||t==s.HERO||e.block.event)&&(a.background="#c3944e"),a},a=()=>{const t=e.block,s=B.MAP_BLOCK_TYPES.STICK;let a=["map-block"];a.push(["road","hero","stick","end"][Number(t.blockType)]||""),t.event&&a.push(t.event.event_type);const i=e.map.$data.mapData,n=[[-1,-1],[-1,1],[1,-1],[1,1]],{x:o,y:c,blockType:r}=t;for(let e=0;e<4;e++){const t=N.exports.map(new Array(3),((t,a)=>{const[r,l]=n[e];let[p,h]=[[o+r,c],[o,c+l],[o+r,c+l]][a];return i[p]&&i[p][h]?i[p][h].blockType:s}));r==s?N.exports.every(t,(t=>t!=s))&&a.push(`r-${e+1}`):N.exports.every(t.slice(0,2),(t=>t==s))&&a.push(`r-${e+1}`)}return a};return(t,e)=>(d(),l("div",{style:m(s()),onClick:e[0]||(e[0]=e=>t.$emit("autoMove"))},[p("span",{class:h(a())},null,2)],4))}});V.__scopeId="data-v-aed2ada4";class z{constructor(t,e){c(this,"x"),c(this,"y"),c(this,"parent"),c(this,"G"),c(this,"H"),c(this,"getF",(()=>this.G+this.H)),this.x=t,this.y=e,this.parent=null,this.G=0,this.H=null}}class W{constructor(t,e,s){c(this,"map"),c(this,"start"),c(this,"end"),c(this,"init",(()=>{const t={startBlock:this.start,endBlock:this.end,stickList:N.exports.filter(N.exports.flattenDeep(this.map.mapData),{blockType:"2"}),openList:[],closeList:[],isInList:function(t,e){const s=N.exports.findIndex(this[e],{x:t.x,y:t.y});return~s&&{index:s}}};Object.assign(this.map,t),this.map.openList.push(this.map.startBlock);let e=this.step();if(!e.find)return console.info("无法生存路径!"),[];e=e.endBlock;const s=[];for(;e.parent.parent;)e=e.parent,s.push(e);return s.reverse().push(this.end),s})),c(this,"step",(()=>{this.map.openList=this.map.openList.sort((function(t,e){return t.getF()-e.getF()}));const t=this.map.openList.shift();if(!t)return{find:!1};this.map.closeList.push(t);const e=this.around(t);for(let s=0;s<e.length;s++){const a=e[s],i=this.map.isInList(a,"openList");if(a.parent=t,a.H=this.countH(a),a.G=this.countG(a)+(t.G||0),i)t.G+this.countG(a)<this.map.openList[i.index].G&&(this.map.openList[i.index].parent=t);else{if(a.x===this.map.endBlock.x&&a.y===this.map.endBlock.y)return{find:!0,endBlock:a};this.map.openList.push(a)}}return this.step()})),c(this,"around",(t=>{const e=[];for(let s=-1;s<=1;s++)for(let a=-1;a<=1;a++){if(0===s&&0===a)continue;if(0!==s&&0!==a)continue;const i=t.x+s,n=t.y+a;if(i>=this.map.row||n>=this.map.col||i<0||n<0)continue;const o=new z(i,n);this.map.isInList(o,"closeList")||(this.map.isInList(o,"stickList")||e.push(o))}return e})),c(this,"countH",(t=>10*(Math.abs(t.x-this.map.endBlock.x)+Math.abs(t.y-this.map.endBlock.y)))),c(this,"countG",(t=>{const e=t.parent;return t.x!==e.x&&t.y!==e.y?14:10})),this.map=N.exports.cloneDeep(t),this.start=e,this.end=s}}const Y=()=>{const t=document.createElement("div"),e=document.createElement("div"),s=document.querySelector("#router-view"),a={height:300,width:200,animated:"animate__animated animate__faster animate__zoomIn",backForce:.2};e.className=".shadow-view".slice(1),Object.assign(e.style,{position:"absolute",background:`rgba(0,0,0,${a.backForce})`,width:"100%",height:"100%",left:"0px",top:"0px",zIndex:"10"}),Object.assign(t.style,{position:"absolute",width:`${a.height}px`,height:`${a.width}px`,left:(s.offsetWidth-a.width)/2+"px",top:(s.offsetHeight-a.height)/2+"px",zIndex:"20"});return{modal:t,shadowView:e,opt:a,view:s}},J=t=>{q("hero","$canMove",!0);const e=document.querySelector(".map-dialog-modal"),s=document.querySelector(".shadow-view");e&&e.parentNode.removeChild(e),s&&s.parentNode.removeChild(s),t&&t()},Q=B.ITEM_LEVEL,X=function(t,e){const s=Y(),a=s.modal,i=s.shadowView,n=s.opt,o=s.view;Object.assign(a,{className:[n.animated,".map-dialog-modal".slice(1)].join(" "),innerHTML:'\n      <div class="close" @click="this.close">+</div>\n      <div class="msg m-b-4 radius-2">\n        {{this.record.msg}}\n      </div>\n      <div class="change m-b-4 radius-2" v-if="this.record.need && this.record.get">\n        <span>要支付</span>\n        <template v-for="item in this.record.need">\n          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], \'name\') }}</span>*<span class="num">{{item[1]}}</span>\n        </template>\n        <span>为代价，来交换</span>\n        <template v-for="item in this.record.get">\n          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], \'name\') }}</span>*<span class="num">{{item[1]}}</span>\n        </template>\n        <span>吗?</span>\n      </div>\n      <div class="event">\n        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">\n          {{e.title}}\n        </button>\n        <button v-if="this.isEnd" class="action radius-2" @click="close">结束对话</button>\n      </div>\n    '}),o.appendChild(a),o.appendChild(i),u({store:R,created(){this.event=t,this.$i=0,this.isEnd=!1,this.next()},methods:{next(){this.$isEnd?this.close():(this.record=function(t){let e=N.exports.cloneDeep(t);"string"==typeof e&&(e={msg:e});const s=N.exports.map(e.buttons,(function(e){if("object"==typeof e)return e;const s=e.match(/\[([^]+)\]\{([^]+)\}/),a={};if(a.title=s[1],!s[2])return a;if("#"!==e[0])a.action=function(){const[t,e]=s[2].split(",");this.$i=Number(t),this.next(),Number(e)&&(this.isEnd=!0)};else{const e=s[2].split(","),i=e.unshift();a.action=function(){const s=t.need||[],a=t.get||[];if(S.isEnoughItem(s)){S.getItem(a).length?this.$i=e[1]:(S.getItem(a,!0),S.costItem(s),this.$i=e[2])}else this.$i=e[0];this.next(),Number(i)&&(this.isEnd=!0)}}return a}));return e.buttons=s,e}(this.event.data[this.$i]),this.isEnd=this.$i++==this.event.data.length-1,this.$forceUpdate())},action(t){t.call(this)},close(){J(e)},getColor:t=>({color:Q[U(t).grade||0]}),itemKey(t,e){const s=U(t);return s[e]||s}}}).mount(".map-dialog-modal")},Z=function(t,e){const s=Y(),a=s.modal,i=s.shadowView,n=s.opt,o=s.view;Object.assign(a,{className:[n.animated,".map-dialog-modal".slice(1)].join(" "),innerHTML:'\n      <div class="close" @click="this.close">+</div>\n      <div class="msg m-b-4 radius-2">\n        {{this.record.msg}}\n      </div>\n      <div class="change m-b-4 radius-2" v-if="this.record.get">\n        <span>包裹中有</span>\n        <template v-for="item in this.record.get">\n          <span class="name" :style="getColor(item[0])">{{ itemKey(item[0], \'name\') }}</span>*<span class="num">{{ item[1] }}</span>\n        </template>\n        <span>，要拾取吗?</span>\n      </div>\n      <div class="event">\n        <button class="action radius-2" v-for="e in this.record.buttons" @click="action(e.action)">\n          {{ e.title }}\n        </button>\n        <button v-if="this.isEnd" class="action radius-2" @click="close">结束</button>\n      </div>\n    '}),o.appendChild(a),o.appendChild(i),u({store:R,created(){this.chest=t,this.$i=0,this.isEnd=!1,this.next()},methods:{next(){this.$isEnd?this.close():(this.record=function(t){let e=N.exports.cloneDeep(t);"string"==typeof e&&(e={msg:e});const s=N.exports.map(e.buttons,(function(e){if("object"==typeof e)return e;const s=e.match(/\[([^]+)\]\{([^]+)\}/),a={};if(a.title=s[1],!s[2])return a;if("#"!==e[0])a.action=function(){const[t,e]=s[2].split(",");this.$i=Number(t),this.next(),Number(e)&&(this.isEnd=!0)};else{const e=s[2].split(","),i=e.unshift();a.action=function(){const s=t.get||[];S.getItem(s).length?this.$i=Number(e[0]):(S.getItem(s,!0),this.$i=Number(e[1])),this.next(),Number(i)&&(this.isEnd=!0)}}return a}));return e.buttons=s,e}(this.chest.data[this.$i]),this.isEnd=this.$i++==this.chest.data.length-1,this.$forceUpdate())},action(t){t.call(this)},close(){J(e)},getColor:t=>({color:Q[U(t).grade||0]}),itemKey(t,e){const s=U(t);return s[e]||s}}}).mount(".map-dialog-modal")},tt=B.MAP_BLOCK_TYPES;var et=class{constructor(t){c(this,"map"),c(this,"canMoveDelay"),c(this,"keyUpFunc"),c(this,"autoMoveTimer"),c(this,"start",(()=>{this.keyUpFunc=t=>{t.key&&(this.autoMoveTimer&&clearInterval(this.autoMoveTimer),this.move(t.key))},document.addEventListener("keyup",this.keyUpFunc)})),c(this,"stop",(()=>{document.removeEventListener("keyup",this.keyUpFunc),null!==this.autoMoveTimer&&clearInterval(this.autoMoveTimer)})),c(this,"move",(t=>{if(!this.canMoveDelay)return;this.canMoveDelay=!1,setTimeout((()=>{this.canMoveDelay=!0}),280);let e=this.map.hero.x,s=this.map.hero.y;if(R.state.hero.$canMove)switch(t){case"ArrowUp":e--;break;case"ArrowDown":e++;break;case"ArrowLeft":s--;break;case"ArrowRight":s++}let a=null;try{a=this.map.$data.mapData[e][s]}catch(o){}if(!a||a.blockType!=tt.ROAD)return;this.map.hero.blockType=tt.ROAD,a.blockType=tt.HERO;const{event_type:i,event:n}=a.event||{};switch(R.commit("map/UPDATE"),"map-chest"!==i&&"map-dialog"!==i||delete a.event,this.map.hero=a,i){case"map-chest":this.autoMove([]),q("hero","$canMove",!1),Z(n,(()=>this.start()));break;case"map-dialog":this.autoMove([]),q("hero","$canMove",!1),X(n,(()=>this.start()))}})),c(this,"autoMove",(t=>{const e=N.exports.cloneDeep(t);this.autoMoveTimer&&clearInterval(this.autoMoveTimer),this.autoMoveTimer=setInterval((()=>{const t=e.splice(0,1)[0];if(!t)return void(this.autoMoveTimer&&clearInterval(this.autoMoveTimer));const s=this.map.hero.x,a=this.map.hero.y;let i="";switch(!0){case t.x<s:i="ArrowUp";break;case t.x>s:i="ArrowDown";break;case t.y<a:i="ArrowLeft";break;case t.y>a:i="ArrowRight"}this.move(i),e.length<1&&null!==this.autoMoveTimer&&clearInterval(this.autoMoveTimer)}),380)})),this.map=t,this.canMoveDelay=!0,this.keyUpFunc=null,this.autoMoveTimer=null,this.start()}},st=r({name:"Map",components:{MapBlock:V,HomeInfo:F,Package:G},setup(){const t=v(),c=x(),r=f({opt:{info:!1,tip:!0},map:new K(t.state.map.list[0])}),l=new et(r.map);b((()=>t.state.map.UPDATE),(()=>{var t;null==(t=null==c?void 0:c.proxy)||t.$forceUpdate()}));const p=()=>{const t=document.querySelector(".map"),e=document.querySelector(".map-block"),s=e.offsetWidth,a=e.offsetHeight,i=r.map.hero,{row:n,col:o}=r.map.$data,c=document.querySelector(".map-data .map").style;c.left=(t.offsetWidth-s*n)/2-(i.y-(o-1)/2)*s+"px",c.top=(t.offsetHeight-a*o)/2-(i.x-(n-1)/2)*a+"px"};return g((()=>{p()})),y((()=>{p()})),k((()=>{l&&l.stop()})),setTimeout((()=>{r.opt.tip=!1}),5e3),h=((t,e)=>{for(var s in e||(e={}))i.call(e,s)&&o(t,s,e[s]);if(a)for(var s of a(e))n.call(e,s)&&o(t,s,e[s]);return t})({},_(r)),e(h,s({togglePackage:()=>{r.opt.info=!r.opt.info},autoMove:t=>{const e=new W(r.map.$data,r.map.hero,t).init();l.autoMove(e)}}));var h}});w("data-v-2435bde2");const at={class:"map"},it=H("回城"),nt={key:0,class:"arrow-left"},ot={key:1,class:"arrow-right"},ct={key:0,class:"tip"},rt={class:"map-name"},lt=p("div",{class:"tip-blocklist"},[p("span",{class:"tip-block map-chest"},"包裹"),p("span",{class:"tip-block map-dialog"},"事件"),p("span",{class:"tip-block hero"},"你")],-1),pt={class:"map-data"},ht={class:"map"};M(),st.render=function(t,e,s,a,i,n){const o=$("router-link"),c=$("Package"),r=$("HomeInfo"),m=$("MapBlock");return d(),l("div",at,[T(o,{class:"btn backhome",to:"/"},{default:I((()=>[it])),_:1}),T(O,{"enter-active-class":"animate__animated animate__faster animate__slideInUp","leave-active-class":"animate__animated animate__faster animate__slideOutDown"},{default:I((()=>[L(T(c,{class:"v-package"},null,512),[[E,t.opt.info]])])),_:1}),T(O,{"enter-active-class":"animate__animated animate__faster animate__slideInDown","leave-active-class":"animate__animated animate__faster animate__slideOutUp"},{default:I((()=>[L(T(r,{class:"right-info",transition:"bounce"},null,512),[[E,t.opt.info]])])),_:1}),p("div",{class:h(["show-btn",t.opt.info?"opened":"closed"]),onClick:e[0]||(e[0]=(...e)=>t.togglePackage&&t.togglePackage(...e))},[t.opt.info?(d(),l("span",nt)):(d(),l("span",ot))],2),T(O,{"enter-active-class":"animate__animated animate__slideInRight","leave-active-class":"animate__animated animate__slideOutRight"},{default:I((()=>[t.opt.tip?(d(),l("div",ct,[p("div",rt,D(t.map.$opt.name),1),lt])):A("",!0)])),_:1}),p("div",pt,[p("div",ht,[(d(!0),l(C,null,P(t.map.$data.mapData,((e,s)=>(d(),l("div",{key:`line-${String(s)}`},[(d(!0),l(C,null,P(e,((e,s)=>(d(),j(m,{key:`block-${String(s)}`,block:e,map:t.map,onAutoMove:s=>t.autoMove(e)},null,8,["block","map","onAutoMove"])))),128))])))),128))])])])},st.__scopeId="data-v-2435bde2";export{st as default};
