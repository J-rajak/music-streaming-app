"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[897],{8257:(e,s,a)=>{a.d(s,{Z:()=>l});var r=a(4420),t=a(3329);const l=()=>{const e="rock"===(0,r.v9)((e=>e.theme))?"https://res.cloudinary.com/ojigs/image/upload/v1696593675/Jollify/jollify_rock_ff1o0d.gif":"https://res.cloudinary.com/ojigs/image/upload/v1696593603/Jollify/jollify_pop_gtzli0.gif";return(0,t.jsx)("div",{className:"h-full flex justify-center items-center",children:(0,t.jsx)("img",{src:e,alt:"",className:"w-24 h-12 md:w-52 md:h-24",width:"210px",height:"100px"})})}},1897:(e,s,a)=>{a.r(s),a.d(s,{default:()=>p});var r=a(2791),t=a(4420),l=a(7689),o=a(2202),n=a(9108),c=a(2222),i=a(6910),d=a(3329);const m=e=>{var s;let{closeModal:a,isModalOpen:l,user:o,children:i}=e;const m=(0,t.v9)((e=>e.theme)),[u,{isLoading:x,isError:h,error:g}]=(0,c.gD)(),[p,b]=(0,r.useState)({bio:o.bio,country:o.country});return(0,d.jsxs)("div",{children:[i,l&&(0,d.jsx)("div",{className:"fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm",children:(0,d.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,d.jsxs)("div",{className:"relative bg-gray-200 w-96 rounded-lg shadow-lg",children:[(0,d.jsx)("div",{className:"absolute top-0 right-0 pt-2 pr-4",children:(0,d.jsx)("button",{onClick:a,className:"text-gray-800 hover:text-gray-200 hover:bg-red-500",children:(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})})}),(0,d.jsxs)("div",{className:"p-8",children:[(0,d.jsx)("div",{className:"flex items-center gap-4 mb-4",children:(0,d.jsx)("h2",{className:"text-2xl text-gray-800 font-semibold",children:"Edit Profile"})}),(0,d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{const{error:e}=await u(p);e?console.error(e):a()}catch(s){console.error(s)}},children:[(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-gray-700  mb-1",children:"Username"}),(0,d.jsx)("input",{type:"text",placeholder:"john",name:"username",value:o.username,className:"w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800",required:!0,disabled:!0})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-gray-700  mb-1",children:"Bio"}),(0,d.jsx)("input",{type:"text",placeholder:"I love Jollify",name:"bio",defaultValue:o.bio,onChange:e=>b({...p,bio:e.target.value}),className:"w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-gray-700  mb-1",children:"Country"}),(0,d.jsx)("input",{type:"text",placeholder:"Nigeria",name:"country",defaultValue:o.country,onChange:e=>b({...p,country:e.target.value}),className:"w-full border border-gray-400 bg-gray-200 rounded-md focus:outline-none p-2  text-gray-800"})]}),(0,d.jsxs)("div",{className:"flex justify-end",children:[(0,d.jsx)("button",{type:"button",onClick:a,className:"mr-2 text-gray-800 hover:text-gray-800 font-medium",children:"Cancel"}),(0,d.jsx)("button",{type:"submit",className:"bg-".concat(m," hover:bg-").concat(m," text-white font-bold py-2 px-4 rounded ").concat(x&&"cursor-not-allowed"),disabled:x,children:x?(0,d.jsx)(n.Z7b,{className:"animate-spin m-auto text-2xl text-gray-400"}):"Done"})]})]}),h&&(0,d.jsx)("span",{className:"block text-sm mt-2 saturate-100 text-red-500",children:null===g||void 0===g||null===(s=g.data)||void 0===s?void 0:s.message})]})]})})})]})};var u=a(8794),x=a(8257),h=a(2564),g=a(3050);const p=()=>{const e=(0,t.v9)((e=>e.theme)),[s,a]=(0,r.useState)(!1),{data:p,isLoading:b,isError:y,error:f}=(0,c.XC)(),j=(0,r.useRef)(null),[v,{isError:N,error:w}]=(0,c.a)(),[k,{isLoading:C}]=(0,i.g0)(),L=(0,l.s0)();if(b)return(0,d.jsx)(x.Z,{});if(y)return(0,d.jsx)(u.Z,{error:f});return(0,d.jsxs)("section",{className:" text-gray-100",children:[(0,d.jsx)(g.ql,{children:(0,d.jsx)("title",{children:"My Profile - Jollify"})}),(0,d.jsx)("div",{className:"w-full h-28 md:h-48  bg-gradient-to-r from-transparent via-".concat(e," to-transparent relative")}),(0,d.jsxs)("div",{className:"-translate-y-14 md:-translate-y-24 translate-x-5 absolute",children:[(0,d.jsxs)("div",{className:"w-28 h-28 md:w-48 md:h-48 rounded-full relative bg-secondary-100 shadow-lg  shadow-secondary-100 overflow-hidden",onClick:()=>{j.current.click()},children:[null!==p&&void 0!==p&&p.image?(0,d.jsx)("img",{src:p.image,alt:"",className:"w-full h-full rounded-full object-cover cursor-pointer"}):(0,d.jsx)(o.Xws,{className:"w-full h-full pt-4 rounded-full object-cover text-gray-400 cursor-pointer"}),(0,d.jsx)("span",{className:"absolute left-0 bottom-0 text-center w-full p-1 text-sm sm:text-base bg-secondary-200 bg-opacity-50 cursor-pointer",children:"Upload"}),(0,d.jsx)("input",{type:"file",accept:"image/jpeg, image/png, image/jpg",ref:j,className:"hidden",onChange:async e=>{const s=e.target.files[0];if(s){const e=new FormData;e.append("image",s),await h.Am.promise(v(e).unwrap(),{pending:"Uploading...",success:"Upload successful",error:"An error occurred"}),N&&console.error(w)}}})]}),(0,d.jsx)("h1",{className:"text-xl md:text-3xl font-semibold text-center m-2",children:p.username})]}),(0,d.jsxs)("div",{className:"flex flex-col items-end sm:flex-row sm:justify-end gap-4 mt-4 text-sm",children:[(0,d.jsx)(m,{closeModal:()=>{a(!1)},isModalOpen:s,user:p,children:(0,d.jsx)("button",{onClick:()=>{a(!0)},className:"bg-".concat(e," hover:bg-").concat(e,"-50 active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded"),children:"Edit"})}),(0,d.jsx)("button",{className:"bg-transparent  border hover:bg-".concat(e," active:bg-opacity-80 font-bold py-1  px-2 sm:py-2 sm:px-4 rounded  ").concat(C&&"cursor-not-allowed"),onClick:async()=>{const{error:e}=await k().unwrap();e?console.error(e):L("/")},disabled:C,children:C?(0,d.jsx)(n.Z7b,{className:"animate-spin m-auto text-lg text-gray-400"}):"Log out"})]}),(0,d.jsxs)("div",{className:"mt-14 md:mt-36 md:w-3/4",children:[(0,d.jsx)("div",{className:"px-4 py-6 rounded-lg bg-secondary-100 shadow-sm shadow-gray-700",children:(0,d.jsxs)("h2",{className:"flex gap-8 font-semibold",children:[(0,d.jsx)("span",{className:"text-gray-300",children:"Bio: "}),(0,d.jsx)("span",{children:p.bio})]})}),(0,d.jsx)("div",{className:"px-4 py-6 mt-4 rounded-md bg-secondary-100 shadow-sm shadow-gray-700",children:(0,d.jsxs)("h2",{className:"flex gap-8 font-semibold",children:[(0,d.jsx)("span",{className:"text-gray-300",children:"Country: "}),(0,d.jsx)("span",{children:p.country})]})})]})]})}}}]);
//# sourceMappingURL=897.fc3ffed2.chunk.js.map