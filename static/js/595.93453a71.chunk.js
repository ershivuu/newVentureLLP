(self.webpackChunknew_venture=self.webpackChunknew_venture||[]).push([[595],{8525:()=>{},9595:(a,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>b});var r=e(5043),n=e(6446),c=e(5865),o=e(1906),i=e(9650),d=e(3336),s=e(1806),l=e(4882),h=e(8076),u=e(2420),g=e(3460),m=e(35),A=e(6600),p=e(5316),y=e(5795),w=e(9347),x=e(1563),f=e(5540),E=e(2505),j=e(3471),C=e(579);const b=function(){const[a,t]=(0,r.useState)([]),[e,b]=(0,r.useState)(!1),[S,_]=(0,r.useState)(!1),[v,F]=(0,r.useState)(!1),[I,H]=(0,r.useState)(null),[D,T]=(0,r.useState)({id:"",heading:"",imageFile:null});(0,r.useEffect)((()=>{B()}),[]);const B=async()=>{try{const a=await(0,x.Cl)();t(a)}catch(a){console.error("Error fetching data:",a)}},k=()=>{b(!1)},M=()=>{_(!1)},N=()=>{F(!1)},z=a=>{const{name:t,value:e,files:r}=a.target;T("banner_img"===t?{...D,imageFile:r[0]}:{...D,[t]:e})},W=e=>{const r=a.map((a=>a.id===e.id?{...a,heading:e.heading}:a));t(r)};return(0,C.jsxs)(n.A,{children:[(0,C.jsx)(c.A,{variant:"h4",component:"h1",gutterBottom:!0,children:"Edit Banner"}),(0,C.jsx)(o.A,{startIcon:(0,C.jsx)(E.A,{}),variant:"contained",color:"primary",onClick:()=>{T({id:"",heading:"",imageFile:null}),_(!0)},style:{marginBottom:"16px"},children:"Add"}),(0,C.jsx)(i.A,{component:d.A,children:(0,C.jsxs)(s.A,{children:[(0,C.jsx)(l.A,{children:(0,C.jsxs)(h.A,{children:[(0,C.jsx)(u.A,{children:"S No."}),(0,C.jsx)(u.A,{children:"Heading"}),(0,C.jsx)(u.A,{children:"Banner Image"}),(0,C.jsx)(u.A,{children:"Edit"}),(0,C.jsx)(u.A,{children:"Delete"})]})}),(0,C.jsx)(g.A,{children:a.map(((a,t)=>(0,C.jsxs)(h.A,{children:[(0,C.jsx)(u.A,{children:t+1}),(0,C.jsx)(u.A,{children:a.heading}),(0,C.jsx)(u.A,{children:(0,C.jsx)("img",{src:a.banner_img_path,alt:a.banner_img_originalname,style:{maxWidth:"100px"}})}),(0,C.jsx)(u.A,{children:(0,C.jsx)(o.A,{startIcon:(0,C.jsx)(f.A,{}),onClick:()=>(a=>{H(a),T({id:a.id,heading:a.heading,imageFile:null}),b(!0)})(a),children:"Edit"})}),(0,C.jsx)(u.A,{children:(0,C.jsx)(o.A,{startIcon:(0,C.jsx)(j.A,{}),color:"error",onClick:()=>(a=>{H(a),F(!0)})(a),children:"Delete"})})]},a.id)))})]})}),(0,C.jsxs)(m.A,{open:e,onClose:k,children:[(0,C.jsx)(A.A,{children:"Edit Banner"}),(0,C.jsxs)(p.A,{children:[(0,C.jsx)(y.A,{autoFocus:!0,margin:"dense",name:"heading",label:"Heading",fullWidth:!0,value:D.heading,onChange:z}),(0,C.jsx)(y.A,{margin:"dense",fullWidth:!0,type:"file",name:"banner_img",onChange:z,style:{margin:"10px 0"}})]}),(0,C.jsxs)(w.A,{children:[(0,C.jsx)(o.A,{onClick:k,children:"Cancel"}),(0,C.jsx)(o.A,{onClick:async()=>{try{const a=new FormData;a.append("id",I.id),a.append("heading",D.heading),a.append("banner_img",D.imageFile),await(0,x.z_)(I.id,a),W({id:I.id,heading:D.heading}),b(!1),B()}catch(a){console.error("Error updating data:",a)}},children:"Save"})]})]}),(0,C.jsxs)(m.A,{open:S,onClose:M,children:[(0,C.jsx)(A.A,{children:"Add Banner"}),(0,C.jsxs)(p.A,{children:[(0,C.jsx)(y.A,{autoFocus:!0,margin:"dense",name:"heading",label:"Heading",fullWidth:!0,value:D.heading,onChange:z}),(0,C.jsx)(y.A,{margin:"dense",fullWidth:!0,type:"file",name:"banner_img",onChange:z,style:{margin:"10px 0"}})]}),(0,C.jsxs)(w.A,{children:[(0,C.jsx)(o.A,{onClick:M,children:"Cancel"}),(0,C.jsx)(o.A,{onClick:async()=>{try{const a=new FormData;a.append("heading",D.heading),a.append("banner_img",D.imageFile),await(0,x.dp)(a),_(!1),B()}catch(a){console.error("Error adding data:",a)}},children:"Save"})]})]}),(0,C.jsxs)(m.A,{open:v,onClose:N,children:[(0,C.jsx)(A.A,{children:"Delete Banner"}),(0,C.jsx)(p.A,{children:(0,C.jsx)(c.A,{children:"Are you sure you want to delete this banner?"})}),(0,C.jsxs)(w.A,{children:[(0,C.jsx)(o.A,{onClick:N,children:"Cancel"}),(0,C.jsx)(o.A,{color:"secondary",onClick:async()=>{try{await(0,x.xu)(I.id),F(!1),B()}catch(a){console.error("Error deleting data:",a)}},children:"Delete"})]})]})]})}},1563:(a,t,e)=>{"use strict";e.d(t,{$h:()=>u,BD:()=>G,Cg:()=>X,Cl:()=>H,E0:()=>d,G:()=>F,Hh:()=>o,IG:()=>g,J1:()=>R,JL:()=>E,Jz:()=>b,KJ:()=>S,M$:()=>ea,RI:()=>ta,RM:()=>J,TF:()=>y,Te:()=>k,Tx:()=>h,Vv:()=>I,XA:()=>N,XR:()=>aa,Xk:()=>l,Yb:()=>v,Yg:()=>V,Z3:()=>s,_1:()=>Y,_c:()=>i,aK:()=>z,ac:()=>Q,as:()=>P,dp:()=>T,dt:()=>K,fH:()=>x,hT:()=>U,k3:()=>w,mh:()=>_,pD:()=>j,qI:()=>C,qP:()=>M,ql:()=>p,r8:()=>$,sK:()=>L,sL:()=>Z,tK:()=>q,vB:()=>W,vO:()=>A,wf:()=>m,xu:()=>B,yM:()=>f,z_:()=>D,zb:()=>O});var r=e(6213),n=e(8525);const c=n.API_URL,o=async()=>{try{return(await r.A.get("".concat(c,"/getSectionFirstContent"))).data}catch(a){throw console.error("Error fetching data:",a),a}},i=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateOnlyContent/").concat(a),t)).data}catch(e){throw console.error("Error updating data:",e),e}},d=async()=>{try{return(await r.A.get("".concat(c,"/getAllSectionFirst"))).data}catch(a){throw console.error("Error fetching banner images:",a),a}},s=async(a,t)=>{try{const e=new FormData;e.append("image",t);return(await r.A.put("".concat(c,"/updateBannerImages/").concat(a),e,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(e){throw console.error("Error updating banner image:",e),e}},l=async a=>{try{const t=new FormData;t.append("banner_img",a);return(await r.A.put("".concat(c,"/addSectionFirstImages/1"),t,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Error adding banner image:",t),t}},h=async a=>{try{return(await r.A.delete("".concat(c,"/deleteBannerImage/").concat(a))).data}catch(t){throw console.error("Error deleting banner image:",t),t}},u=async()=>{try{return(await r.A.get("".concat(c,"/getAllSliderImages"))).data}catch(a){throw console.error("Error fetching slider images:",a),a}},g=async(a,t)=>{try{const e=new FormData;e.append("slider_img",t);return(await r.A.put("".concat(c,"/updateSliderImages/").concat(a),e,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(e){throw console.error("Error updating slider image:",e),e}},m=async a=>{try{return(await r.A.delete("".concat(c,"/deleteSliderImage/").concat(a))).data}catch(t){throw console.error("Error deleting slider image:",t),t}},A=async()=>{try{return(await r.A.get("".concat(c,"/getAllContentWithSliderImages"))).data}catch(a){throw console.error("Error fetching data:",a),a}},p=async a=>{try{return(await r.A.post("".concat(c,"/addSliderImage"),a,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Error adding slider image:",t),t}},y=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateContentWithVideo/").concat(a),t)).data}catch(e){throw console.error("Error updating data:",e),e}},w=async a=>{try{return(await r.A.post("".concat(c,"/addContentWithVideo"),a,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Error adding slider image:",t),t}},x=async a=>{try{return(await r.A.delete("".concat(c,"/deleteContainerData/").concat(a))).data}catch(t){throw console.error("Error deleting container data:",t),t}},f=async()=>{try{return(await r.A.get("".concat(c,"/getHome"))).data}catch(a){throw console.error("Error fetching home data:",a),a}},E=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateHome"),t)).data}catch(e){throw console.error("Error updating home data:",e),e}},j=async()=>{try{return(await r.A.get("".concat(c,"/getHomeSectionFirst"))).data.data}catch(a){throw console.error("Error fetching data:",a),a}},C=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateHomeSectionFirst"),t)).data}catch(e){throw new Error("Error updating home section first data:",e)}},b=async()=>{try{return(await r.A.get("".concat(c,"/homeSectionSecond"))).data}catch(a){return console.error("Error fetching HomeSectionSecond data:",a),null}},S=async(a,t)=>{try{return(await r.A.put("".concat(c,"/homeSectionSecond/").concat(a),t)).data}catch(e){return console.error("Error updating HomeSectionSecond data:",e),null}},_=async a=>{try{return await r.A.post("".concat(c,"/homeSectionSecond"),a)}catch(t){return console.error("Error adding Home Section Second image:",t),null}},v=async a=>{try{return(await r.A.delete("".concat(c,"/homeSectionSecond/").concat(a))).data}catch(t){return console.error("Error deleting Home Section Second data:",t),null}},F=async()=>{try{return(await r.A.get("".concat(c,"/getHomeSectionThird"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},I=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateHomeSectionThird"),t)).data}catch(e){throw new Error("Error updating home section first data:",e)}},H=async()=>{try{return(await r.A.get("".concat(c,"/aboutus_banner"))).data.data}catch(a){throw console.error("Error fetching about us banner data:",a),a}},D=async(a,t)=>{try{return(await r.A.put("".concat(c,"/aboutus_banner/").concat(a),t)).data}catch(e){throw console.error("Error updating About Us Banner data:",e),e}},T=async a=>{try{return(await r.A.post("".concat(c,"/aboutus_banner"),a)).data}catch(t){throw new Error("Error adding about us banner:",t)}},B=async a=>{try{return(await r.A.delete("".concat(c,"/aboutus_banner/").concat(a))).data}catch(t){throw new Error("Error deleting about us banner:",t)}},k=async()=>{try{return(await r.A.get("".concat(c,"/getAboutUsSectionFirst"))).data}catch(a){throw new Error("Error fetching about us section first:",a)}},M=async a=>{try{return(await r.A.put("".concat(c,"/updateAboutUsSectionFirst"),a)).data}catch(t){throw console.error("Error updating About Us Section First data:",t),t}},N=async()=>{try{return(await r.A.get("".concat(c,"/getAboutUsSectionSecond"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},z=async a=>{try{return(await r.A.put("".concat(c,"/updateAboutUsSectionSecond"),a)).data}catch(t){throw console.error("Error updating data:",t),t}},W=async()=>{try{return(await r.A.get("".concat(c,"/getNriPage"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},P=async a=>{try{return(await r.A.put("".concat(c,"/updateNriPage"),a)).data}catch(t){throw console.error("Error updating data:",t),t}},U=async()=>{try{return(await r.A.get("".concat(c,"/getNriPageForm"))).data.data}catch(a){return console.error("Error fetching data:",a),[]}},V=async()=>{try{return(await r.A.get("".concat(c,"/getContactPage"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},R=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateContactPage"),t)).data}catch(e){return console.error("Error updating data:",e),null}},J=async()=>{try{return(await r.A.get("".concat(c,"/getAllFooterData"))).data}catch(a){return console.error("Error fetching footer data:",a),null}},K=async(a,t)=>{try{return(await r.A.put("".concat(c,"/updateFooter"),t)).data}catch(e){throw console.error("Error updating footer data",e),e}},L=async()=>(await r.A.get("".concat(c,"/getAllGalleryImages"))).data,q=async(a,t)=>(await r.A.put("".concat(c,"/updateMainHeading/").concat(a),{main_heading:t})).data,G=async(a,t,e)=>{const n=new FormData;n.append("image1",t),n.append("main_table_id",e);return(await r.A.put("".concat(c,"/galleryImages/container1_image/").concat(a),n,{headers:{"Content-Type":"multipart/form-data"}})).data},X=async(a,t,e)=>{const n=new FormData;n.append("image2",t),n.append("main_table_id",e);return(await r.A.put("".concat(c,"/galleryImages/container2_image/").concat(a),n,{headers:{"Content-Type":"multipart/form-data"}})).data},O=async(a,t)=>{await r.A.delete("".concat(c,"/galleryImages/container1_image/").concat(a,"/").concat(t))},Y=async(a,t)=>{await r.A.delete("".concat(c,"/galleryImages/container2_image/").concat(a,"/").concat(t))},$=async(a,t)=>{const e=new FormData;e.append("image1",a),e.append("main_table_id",t),await r.A.post("".concat(c,"/galleryImages/container1_image"),e)},Z=async(a,t)=>{const e=new FormData;e.append("image2",a),e.append("main_table_id",t);return(await r.A.post("".concat(c,"/galleryImages/container2_image"),e,{headers:{"Content-Type":"multipart/form-data"}})).data},Q=async a=>(await r.A.post("".concat(c,"/addAllHeadingWithImages"),a)).data,aa=async a=>(await r.A.delete("".concat(c,"/deleteMainData/").concat(a))).data,ta=async()=>(await r.A.get("".concat(c,"/galleryBanner"))).data,ea=async(a,t)=>(await r.A.put("".concat(c,"/galleryBanner/"),t,{headers:{"Content-Type":"multipart/form-data"}})).data},2505:(a,t,e)=>{"use strict";var r=e(4994);t.A=void 0;var n=r(e(39)),c=e(579);t.A=(0,n.default)((0,c.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},3471:(a,t,e)=>{"use strict";var r=e(4994);t.A=void 0;var n=r(e(39)),c=e(579);t.A=(0,n.default)((0,c.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},5540:(a,t,e)=>{"use strict";var r=e(4994);t.A=void 0;var n=r(e(39)),c=e(579);t.A=(0,n.default)((0,c.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit")},6446:(a,t,e)=>{"use strict";e.d(t,{A:()=>x});var r=e(8168),n=e(8587),c=e(5043),o=e(8387),i=e(3174),d=e(8812),s=e(8698),l=e(8653),h=e(579);const u=["className","component"];var g=e(5430),m=e(8279),A=e(3375);const p=(0,e(7056).A)("MuiBox",["root"]),y=(0,m.A)(),w=function(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:e,defaultClassName:g="MuiBox-root",generateClassName:m}=a,A=(0,i.default)("div",{shouldForwardProp:a=>"theme"!==a&&"sx"!==a&&"as"!==a})(d.A);return c.forwardRef((function(a,c){const i=(0,l.A)(e),d=(0,s.A)(a),{className:p,component:y="div"}=d,w=(0,n.A)(d,u);return(0,h.jsx)(A,(0,r.A)({as:y,ref:c,className:(0,o.A)(p,m?m(g):g),theme:t&&i[t]||i},w))}))}({themeId:A.A,defaultTheme:y,defaultClassName:p.root,generateClassName:g.A.generate}),x=w}}]);
//# sourceMappingURL=595.93453a71.chunk.js.map