"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[209],{8257:(e,t,s)=>{s.d(t,{Z:()=>l});var a=s(4420),n=s(3329);const l=()=>{const e="rock"===(0,a.v9)((e=>e.theme))?"https://res.cloudinary.com/ojigs/image/upload/v1696593675/Jollify/jollify_rock_ff1o0d.gif":"https://res.cloudinary.com/ojigs/image/upload/v1696593603/Jollify/jollify_pop_gtzli0.gif";return(0,n.jsx)("div",{className:"h-full flex justify-center items-center",children:(0,n.jsx)("img",{src:e,alt:"",className:"w-24 h-12 md:w-52 md:h-24",width:"210px",height:"100px"})})}},828:(e,t,s)=>{s.d(t,{Z:()=>m});var a=s(4420),n=s(1087),l=s(4683),c=s(7180),r=s(2703),o=s(2202),i=s(4312),d=s(3329);const m=e=>{let{resource:t,resourceType:s}=e;const{title:m,name:x,bio:p,artiste:h,description:u,genre:g,songs:j,coverImage:y,image:f,createdBy:b,releaseDate:v}=t,N=(0,a.v9)((e=>e.theme)),w=(0,a.I0)(),_="artiste"===s,k="playlist"===s,Z="album"===s;return(0,d.jsx)(i.E.article,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},className:"relative bg-secondary-200 sm:h-[400px] rounded-md shadow-lg w-full bg-center bg-cover bg-no-repeat",style:{backgroundImage:"url(".concat(y||f||"",")")},children:(0,d.jsxs)("div",{className:"bg-primary h-full bg-opacity-60 inset-0 rounded-md flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-10 p-6 text-white backdrop-blur-2xl",children:[(0,d.jsxs)("div",{className:"w-48 h-48 md:w-60 md:h-60 flex-shrink-0 overflow-hidden bg-secondary-200 bg-center bg-cover bg-no-repeat shadow-md shadow-secondary-100 ".concat(_?"rounded-full":"rounded-md"),children:[(y||f)&&(0,d.jsx)("img",{src:y||f,alt:"".concat(m," Cover"),className:"w-full h-full object-cover backdrop-blur-2xl ".concat(_?"rounded-full":"rounded-md")}),k&&!y&&(0,d.jsx)(o.F1m,{className:"p-4 text-gray-400 w-full h-full object-cover backdrop-blur-2xl"}),Z&&!y&&(0,d.jsx)(o.MDs,{className:"p-4 text-gray-400 w-full h-full object-cover backdrop-blur-2xl"}),_&&!f&&(0,d.jsx)(o.m9R,{className:"pt-6 text-gray-400 w-full h-full rounded-full object-cover backdrop-blur-2xl"})]}),(0,d.jsxs)("article",{className:"flex flex-col",children:[m&&(0,d.jsx)("h2",{className:"text-2xl text-".concat(N,"-50 font-bold mb-4"),children:m.toUpperCase()}),x&&(0,d.jsx)("h2",{className:"text-2xl text-".concat(N,"-50 font-bold mb-4"),children:x.toUpperCase()}),u&&(0,d.jsx)("p",{className:"text-gray-200 mt-2",children:u}),p&&(0,d.jsx)("p",{className:"text-gray-200 mt-2",children:p}),b&&(0,d.jsxs)("p",{className:"mt-2",children:[(0,d.jsx)("span",{className:"text-gray-400 mr-2",children:"Created By: "})," ",(0,d.jsx)(n.rU,{to:"/users/".concat(b._id),className:"text-gray-200 hover:text-".concat(N,"-50 "),children:b.username})]}),h&&(0,d.jsxs)("p",{className:"mt-2",children:[(0,d.jsx)("span",{className:"text-gray-400 mr-2",children:"Artiste: "})," ",(0,d.jsx)(n.rU,{to:"/artistes/".concat(h._id),className:"text-gray-200 hover:text-".concat(N,"-50 "),children:h.name})]}),v&&(0,d.jsxs)("p",{className:" mt-2",children:[(0,d.jsx)("span",{className:"text-gray-400 mr-2",children:"Release Date:"})," ",(0,d.jsx)("span",{className:"text-gray-200 hover:text-${selectedTheme}-50",children:(0,r.p6)(v)})]}),!_&&(0,d.jsxs)("p",{className:" mt-2",children:[(0,d.jsx)("span",{className:"text-gray-400 mr-2",children:"Genre:"})," ",(0,d.jsx)("span",{className:"text-gray-200 hover:text-${selectedTheme}-50",children:g})]}),!Z&&j&&(0,d.jsx)("p",{className:"text-gray-200 hover:text-".concat(N,"-50 mt-2"),children:(0,r.Ek)(j)}),(0,d.jsxs)("div",{className:"flex flex-row gap-4 mt-6 h-10 items-stretch",children:[!_&&(0,d.jsx)("button",{onClick:()=>{w((0,l.jX)({queue:j})),w((0,l.Lc)(!0))},className:"inset-0 flex items-center justify-center bg-".concat(N,"-50 bg-opacity-80 active:bg-opacity-100 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4"),children:(0,d.jsx)("span",{className:"mr-2 text-xl",children:"Play"})}),(0,d.jsx)("span",{className:" bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4 h-full inline-flex items-center",children:(0,d.jsx)(c.Z,{albumId:Z?t._id:null,artisteId:_?t._id:null,playlistId:k?t._id:null,type:s})})]})]})]})})}},8188:(e,t,s)=>{s.d(t,{Z:()=>x});var a=s(2791),n=s(4420),l=s(1087),c=s(2202),r=s(5804),o=s(7180),i=s(8243),d=s(4683),m=s(3329);const x=e=>{let{songs:t,listType:s}=e;const x=(0,n.v9)((e=>e.theme)),[p,h]=(0,a.useState)(5),u="playlist"===s,g=(0,n.I0)(),{currentSong:j,isPlaying:y}=(0,n.v9)((e=>e.player));return(0,m.jsxs)("ul",{children:[t.slice(0,p).map(((e,s)=>(0,m.jsxs)("li",{className:"grid grid-cols-6 md:grid-cols-12 items-center justify-between gap-4 w-full rounded-md p-4 ".concat(j._id===e._id?"bg-".concat(x," bg-opacity-50"):s%2===0?"bg-secondary-100":"bg-secondary-200"),children:[(0,m.jsx)("div",{className:"col-span-1",children:(0,m.jsx)("button",{onClick:()=>(e=>{g((0,d.jX)({queue:t,index:e})),g((0,d.Lc)(!0))})(s),children:y&&j&&j._id===e._id?(0,m.jsx)(r.rD$,{className:"animate-pulse"}):(0,m.jsx)(c.gmG,{className:"text-base"})})}),(0,m.jsx)("div",{className:"col-span-2 md:col-span-8 flex flex-col gap-1 items-start truncate ...",children:u?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.rU,{to:"/songs/".concat(e._id),className:"hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-".concat(x," truncate ..."),children:e.title}),(0,m.jsx)(l.rU,{to:"/artistes/".concat(e.artiste._id),className:"text-sm text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-".concat(x," truncate ..."),children:e.artiste.name})]}):(0,m.jsx)(l.rU,{to:"/songs/".concat(e._id),className:"truncate ... hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-".concat(x),children:e.title})}),(0,m.jsxs)("div",{className:"col-span-3 justify-end items-center flex gap-2 sm:gap-4",children:[(0,m.jsx)("span",{className:"col-span-1 text-end",children:e.duration}),(0,m.jsx)("div",{className:"col-span-1 text-end",children:(0,m.jsx)("span",{className:"".concat(s%2===0?"bg-secondary-200":"bg-secondary-100"," p-2 rounded-md inline-flex items-center"),children:(0,m.jsx)(o.Z,{songId:e._id,type:"song"})})}),(0,m.jsx)("div",{className:"col-span-1 text-end",children:(0,m.jsx)("span",{className:"".concat(s%2===0?"bg-secondary-200":"bg-secondary-100"," p-2 rounded-md inline-flex items-center"),children:(0,m.jsx)(i.Z,{songId:e._id})})})]})]},e._id))),p<t.length&&(0,m.jsx)("div",{className:"flex justify-center mt-4",children:(0,m.jsx)("button",{onClick:()=>{h(p+5)},className:"text-white px-4 py-2 border-".concat(x," border rounded-full hover:bg-primary-dark transition"),children:"More \u2193"})})]})}},4209:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var a=s(4420),n=s(7689),l=s(4957),c=s(828),r=s(8188),o=s(8257),i=s(8794),d=s(5338),m=s(3050),x=s(9724),p=s(3329);const h=()=>{var e;const{id:t}=(0,n.UO)(),s=(0,a.v9)((e=>e.theme)),{data:h,isLoading:u,isError:g,error:j}=(0,l.J2)(t),y=(0,n.s0)();return u?(0,p.jsx)(o.Z,{}):g?(0,p.jsx)(i.Z,{error:j}):(0,p.jsxs)("section",{className:" text-gray-200",children:[(0,p.jsxs)(m.ql,{prioritizeSeoTags:!0,children:[(0,p.jsx)("title",{children:"".concat(h.title," - Stream on Jollify")}),(0,p.jsx)("link",{rel:"canonical",href:"https://jollify.vercel.app/playlists/".concat(h._id)}),(0,p.jsx)("meta",{name:"description",content:"Stream ".concat(h.title," on Jollify and enjoy other amazing music collections.")}),(0,p.jsx)("meta",{property:"og:title",content:"".concat(h.title," - Stream on Jollify")}),(0,p.jsx)("meta",{property:"og:description",content:"Stream ".concat(h.title," on Jollify and enjoy other amazing music collections.")}),(0,p.jsx)("meta",{property:"og:image",content:h.coverImage||""}),(0,p.jsx)("meta",{property:"og:url",content:"https://jollify-server.vercel.app/playlists/".concat(h._id)}),(0,p.jsx)("meta",{name:"twitter:card",content:"summary"}),(0,p.jsx)("meta",{name:"twitter:title",content:"".concat(h.title," - Stream on Jollify")}),(0,p.jsx)("meta",{name:"twitter:description",content:"Stream ".concat(h.title," on Jollify and enjoy other amazing music collections.")}),(0,p.jsx)("meta",{name:"twitter:image",content:h.coverImage||""})]}),(0,p.jsx)(c.Z,{resource:h,resourceType:"playlist"}),(0,p.jsxs)("section",{className:"mt-8",children:[(0,p.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"Songs"}),null!==h&&void 0!==h&&null!==(e=h.songs)&&void 0!==e&&e.length?(0,p.jsx)(r.Z,{songs:h.songs,listType:"playlist"}):(0,p.jsx)("button",{className:"bg-".concat(s," text-gray-100 hover:bg-").concat(s,"-50 active:bg-opacity-90 py-2 px-4 rounded-md text-lg font-semibold transition duration-300"),onClick:()=>y("/explore"),children:"Find songs on Jollify"}),(0,p.jsx)(d.Z,{}),(0,p.jsx)(x.Z,{})]})]})}}}]);
//# sourceMappingURL=209.36971761.chunk.js.map