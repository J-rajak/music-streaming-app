"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[571],{8257:(e,s,t)=>{t.d(s,{Z:()=>a});var r=t(4420),l=t(3329);const a=()=>{const e="rock"===(0,r.v9)((e=>e.theme))?"https://res.cloudinary.com/ojigs/image/upload/v1696593675/Jollify/jollify_rock_ff1o0d.gif":"https://res.cloudinary.com/ojigs/image/upload/v1696593603/Jollify/jollify_pop_gtzli0.gif";return(0,l.jsx)("div",{className:"h-full flex justify-center items-center",children:(0,l.jsx)("img",{src:e,alt:"",className:"w-24 h-12 md:w-52 md:h-24",width:"210px",height:"100px"})})}},4076:(e,s,t)=>{t.d(s,{Z:()=>o});var r=t(1087),l=t(4420),a=t(2202),i=t(3329);const o=e=>{let{playlist:s,type:t}=e;const o=(0,l.v9)((e=>e.theme)),c="user"===t;return(0,i.jsxs)("article",{className:"group bg-secondary-100 rounded-lg shadow-lg p-2 md:p-4 transition transform hover:scale-105",children:[(0,i.jsx)("div",{className:"relative bg-secondary-200",children:(0,i.jsx)(r.rU,{to:"/playlists/".concat(s._id),children:s.coverImage?(0,i.jsx)("img",{src:s.coverImage,alt:s.title,className:"w-full h-24 sm:h-40 object-cover rounded-t-lg relative"}):(0,i.jsx)(a.F1m,{className:"w-full p-4 h-24 sm:h-40 text-gray-400"})})}),(0,i.jsxs)("div",{className:"p-2 md:p-4 flex flex-col",children:[(0,i.jsx)(r.rU,{to:"/playlists/".concat(s._id),className:"text-sm sm:text-base lg:text-lg font-semibold mb-1 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-".concat(o," truncate ..."),children:s.title}),!c&&(0,i.jsx)(r.rU,{to:"/users/".concat(s.createdBy._id),className:"text-xs sm:text-sm lg:text-base text-gray-500 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-".concat(o," truncate ..."),children:s.createdBy.username})]})]})}},7571:(e,s,t)=>{t.r(s),t.d(s,{default:()=>u});var r=t(4420),l=t(1909),a=t(4076),i=t(2222),o=t(8257),c=t(8794),n=t(4220),d=t(4312),m=t(3050),x=t(3329);const h=[],u=()=>{const{data:e,isLoading:s,isError:t,error:u}=(0,i.XC)(void 0,{selectFromResult:e=>{var s;let{data:t,isLoading:r,isError:l,error:a}=e;return{data:null!==(s=null===t||void 0===t?void 0:t.playlist)&&void 0!==s?s:h,isLoading:r,isError:l,error:a}}}),g=(0,r.I0)();if(s)return(0,x.jsx)(o.Z,{});if(t)return(0,x.jsx)(c.Z,{error:u});return(0,x.jsxs)("section",{className:"text-gray-100",children:[(0,x.jsx)(m.ql,{children:(0,x.jsx)("title",{children:"My Playlists - Jollify"})}),(0,x.jsx)("h1",{className:"text-xl md:text-3xl font-semibold mb-8",children:"My Playlist"}),(0,x.jsxs)(d.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",children:[(0,x.jsxs)("button",{onClick:()=>{g((0,n.y7)())},className:"w-full h-full min-h[120px] sm:min-h-[185px] lg:min-h-[256px] flex flex-col gap-2 justify-center items-center rounded-lg shadow-lg bg-secondary-100 hover:text-gray-400 active:text-opacity-80 cursor-pointer",children:[(0,x.jsx)(l.j4v,{className:"text-3xl"}),(0,x.jsx)("span",{children:"Create Playlist"})]}),e&&e.map((e=>(0,x.jsx)(a.Z,{playlist:e,type:"user"},e._id)))]})]})}}}]);
//# sourceMappingURL=571.094b83b6.chunk.js.map