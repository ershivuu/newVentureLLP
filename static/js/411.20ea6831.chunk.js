"use strict";(self.webpackChunknew_venture=self.webpackChunknew_venture||[]).push([[411],{9411:(e,i,n)=>{n.r(i),n.d(i,{default:()=>I});var a=n(5043),l=n(1563),r=n(6446),t=n(5865),s=n(1906),d=n(9650),c=n(3336),o=n(1806),h=n(4882),m=n(8076),j=n(2420),A=n(3460),x=n(35),u=n(6600),_=n(5316),g=n(3193),p=n(5795),C=n(9347),b=n(9190),w=n(8714),f=n(8988),y=n(5540),v=n(3471),k=n(2505),S=n(579);const I=()=>{const[e,i]=(0,a.useState)([]),[n,I]=(0,a.useState)(!1),[D,W]=(0,a.useState)(!1),[E,F]=(0,a.useState)(!1),[K,B]=(0,a.useState)({id:null,image1:null,main_table_id:null}),[N,P]=(0,a.useState)({main_table_id:null,container1_image_id:null}),[V,z]=(0,a.useState)({image1:null,main_table_id:""});(0,a.useEffect)((()=>{(async()=>{const e=await(0,l.sK)();i(e)})()}),[]);const q=()=>{I(!1)},G=()=>{W(!1)},H=()=>{F(!1)};return(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(r.A,{children:[(0,S.jsx)(t.A,{variant:"h4",component:"h1",gutterBottom:!0,children:"Front View Image"}),(0,S.jsx)(s.A,{startIcon:(0,S.jsx)(k.A,{}),variant:"contained",color:"primary",onClick:()=>{W(!0)},style:{marginBottom:"16px"},children:"Add Image"}),(0,S.jsx)(d.A,{component:c.A,children:(0,S.jsxs)(o.A,{children:[(0,S.jsx)(h.A,{children:(0,S.jsxs)(m.A,{children:[(0,S.jsx)(j.A,{children:"S.No"}),(0,S.jsx)(j.A,{children:"Project Name"}),(0,S.jsx)(j.A,{children:"Front-View Image"}),(0,S.jsx)(j.A,{children:"Edit"}),(0,S.jsx)(j.A,{children:"Delete"})]})}),(0,S.jsx)(A.A,{children:e.map(((e,i)=>e.container1_image.map((n=>(0,S.jsxs)(m.A,{children:[(0,S.jsx)(j.A,{children:i+1}),(0,S.jsx)(j.A,{children:e.main_heading}),(0,S.jsx)(j.A,{children:(0,S.jsx)("img",{src:n.img1,alt:"Container 1 - ".concat(n.id),width:"100"})}),(0,S.jsx)(j.A,{children:(0,S.jsx)(s.A,{startIcon:(0,S.jsx)(y.A,{}),onClick:()=>{return i=n.id,a=e.main_table_id,B({id:i,image1:null,main_table_id:a}),void I(!0);var i,a},children:"Edit"})}),(0,S.jsx)(j.A,{children:(0,S.jsx)(s.A,{startIcon:(0,S.jsx)(v.A,{}),color:"error",onClick:()=>{return i=e.main_table_id,a=n.id,P({main_table_id:i,container1_image_id:a}),void F(!0);var i,a},children:"Delete"})})]},n.id)))))})]})}),(0,S.jsxs)(x.A,{open:n,onClose:q,children:[(0,S.jsx)(u.A,{children:"Edit Image"}),(0,S.jsx)(_.A,{children:(0,S.jsx)(g.A,{fullWidth:!0,margin:"dense",children:(0,S.jsx)(p.A,{fullWidth:!0,id:"upload-image",type:"file",onChange:e=>{B({...K,image1:e.target.files[0]})}})})}),(0,S.jsxs)(C.A,{children:[(0,S.jsx)(s.A,{onClick:q,color:"primary",children:"Cancel"}),(0,S.jsx)(s.A,{onClick:async()=>{await(0,l.BD)(K.id,K.image1,K.main_table_id);const e=await(0,l.sK)();i(e),I(!1)},color:"primary",children:"Save"})]})]}),(0,S.jsxs)(x.A,{open:D,onClose:G,children:[(0,S.jsx)(u.A,{children:"Add Image"}),(0,S.jsxs)(_.A,{children:[(0,S.jsxs)(g.A,{fullWidth:!0,margin:"dense",children:[(0,S.jsx)(b.A,{htmlFor:"main-table-id",children:"Select Project"}),(0,S.jsx)(w.A,{id:"main-table-id",value:V.main_table_id,onChange:e=>z({...V,main_table_id:e.target.value}),children:e.map((e=>(0,S.jsx)(f.A,{value:e.main_table_id,children:e.main_heading},e.main_table_id)))})]}),(0,S.jsx)(g.A,{fullWidth:!0,margin:"dense",children:(0,S.jsx)(p.A,{fullWidth:!0,id:"upload-new-image",type:"file",onChange:e=>{z({...V,image1:e.target.files[0]})}})})]}),(0,S.jsxs)(C.A,{children:[(0,S.jsx)(s.A,{onClick:G,color:"primary",children:"Cancel"}),(0,S.jsx)(s.A,{onClick:async()=>{await(0,l.r8)(V.image1,V.main_table_id);const e=await(0,l.sK)();i(e),W(!1)},color:"primary",children:"Save"})]})]}),(0,S.jsxs)(x.A,{open:E,onClose:H,children:[(0,S.jsx)(u.A,{children:"Confirm Delete"}),(0,S.jsx)(_.A,{children:(0,S.jsx)(t.A,{children:"Are you sure you want to delete this image?"})}),(0,S.jsxs)(C.A,{children:[(0,S.jsx)(s.A,{onClick:H,color:"primary",children:"Cancel"}),(0,S.jsx)(s.A,{onClick:async()=>{await(0,l.zb)(N.main_table_id,N.container1_image_id);const e=await(0,l.sK)();i(e),F(!1)},color:"error",children:"Delete"})]})]})]})})}}}]);
//# sourceMappingURL=411.20ea6831.chunk.js.map