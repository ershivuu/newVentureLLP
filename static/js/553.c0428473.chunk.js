(self.webpackChunknew_venture=self.webpackChunknew_venture||[]).push([[553],{8525:()=>{},7553:(t,a,e)=>{"use strict";e.r(a),e.d(a,{default:()=>x});var r=e(5043),n=e(1563),c=e(6446),o=e(5865),i=e(9650),d=e(3336),s=e(1806),l=e(4882),h=e(8076),u=e(2420),g=e(3460),m=e(1906),p=e(35),y=e(6600),A=e(5316),w=e(5795),f=e(9347),_=e(5540),E=e(579);const x=function(){const[t,a]=(0,r.useState)(null),[e,x]=(0,r.useState)(!1),[j,S]=(0,r.useState)({});(0,r.useEffect)((()=>{C()}),[]);const C=async()=>{try{const t=await(0,n.G)();a(t),S({heading:t.heading,content:t.content,sectionthird_img_first:null,sectionthird_img_second:null,sectionthird_img_third:null})}catch(t){console.error("Error fetching data:",t)}},b=()=>{x(!1)},I=t=>{const{name:a,value:e,files:r}=t.target;S((t=>({...t,[a]:r?r[0]:e})))};return(0,E.jsxs)(c.A,{children:[(0,E.jsx)(o.A,{variant:"h4",component:"h1",gutterBottom:!0,children:"Edit Testimonial Section"}),t?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(i.A,{component:d.A,children:(0,E.jsxs)(s.A,{children:[(0,E.jsx)(l.A,{children:(0,E.jsxs)(h.A,{children:[(0,E.jsx)(u.A,{children:"S No."}),(0,E.jsx)(u.A,{children:"Heading"}),(0,E.jsx)(u.A,{children:"Content"}),(0,E.jsx)(u.A,{children:"Image 1"}),(0,E.jsx)(u.A,{children:"Image 2"}),(0,E.jsx)(u.A,{children:"Image 3"}),(0,E.jsx)(u.A,{children:"Edit"})]})}),(0,E.jsx)(g.A,{children:(0,E.jsxs)(h.A,{children:[(0,E.jsx)(u.A,{children:t.id}),(0,E.jsx)(u.A,{children:t.heading}),(0,E.jsx)(u.A,{children:t.content}),(0,E.jsx)(u.A,{children:(0,E.jsx)("img",{src:t.sectionthird_img_first,alt:"Image 1",style:{width:100}})}),(0,E.jsx)(u.A,{children:(0,E.jsx)("img",{src:t.sectionthird_img_second,alt:"Image 2",style:{width:100}})}),(0,E.jsx)(u.A,{children:(0,E.jsx)("img",{src:t.sectionthird_img_third,alt:"Image 3",style:{width:100}})}),(0,E.jsx)(u.A,{children:(0,E.jsx)(m.A,{startIcon:(0,E.jsx)(_.A,{}),onClick:()=>{x(!0)},children:"Edit"})})]})})]})}),(0,E.jsxs)(p.A,{open:e,onClose:b,children:[(0,E.jsx)(y.A,{children:"Edit Section 3"}),(0,E.jsxs)(A.A,{children:[(0,E.jsx)(w.A,{label:"Heading",defaultValue:t.heading,fullWidth:!0,variant:"outlined",name:"heading",onChange:I,style:{marginTop:10}}),(0,E.jsx)(w.A,{label:"Content",defaultValue:t.content,fullWidth:!0,variant:"outlined",name:"content",onChange:I,style:{marginTop:10}}),(0,E.jsx)(w.A,{type:"file",name:"sectionthird_img_first",onChange:I,style:{marginTop:10},fullWidth:!0}),(0,E.jsx)(w.A,{type:"file",name:"sectionthird_img_second",onChange:I,style:{marginTop:10},fullWidth:!0}),(0,E.jsx)(w.A,{type:"file",name:"sectionthird_img_third",onChange:I,style:{marginTop:10},fullWidth:!0})]}),(0,E.jsxs)(f.A,{children:[(0,E.jsx)(m.A,{onClick:b,children:"Cancel"}),(0,E.jsx)(m.A,{onClick:async()=>{try{const a=new FormData;a.append("heading",j.heading),a.append("content",j.content),a.append("sectionthird_img_first",j.sectionthird_img_first),a.append("sectionthird_img_second",j.sectionthird_img_second),a.append("sectionthird_img_third",j.sectionthird_img_third),await(0,n.Vv)(t.id,a),C(),b()}catch(a){console.error("Error updating data:",a)}},children:"Update"})]})]})]}):(0,E.jsx)("p",{children:"Loading..."})]})}},1563:(t,a,e)=>{"use strict";e.d(a,{$h:()=>u,BD:()=>q,Cg:()=>X,Cl:()=>v,E0:()=>d,G:()=>T,Hh:()=>o,IG:()=>g,J1:()=>L,JL:()=>E,Jz:()=>S,KJ:()=>C,M$:()=>et,RI:()=>at,RM:()=>R,TF:()=>A,Te:()=>B,Tx:()=>h,Vv:()=>F,XA:()=>M,XR:()=>tt,Xk:()=>l,Yb:()=>I,Yg:()=>z,Z3:()=>s,_1:()=>Y,_c:()=>i,aK:()=>W,ac:()=>Q,as:()=>U,dp:()=>D,dt:()=>G,fH:()=>f,hT:()=>V,k3:()=>w,mh:()=>b,pD:()=>x,qI:()=>j,qP:()=>k,ql:()=>y,r8:()=>$,sK:()=>J,sL:()=>Z,tK:()=>K,vB:()=>P,vO:()=>p,wf:()=>m,xu:()=>N,yM:()=>_,z_:()=>H,zb:()=>O});var r=e(6213),n=e(8525);const c=n.API_URL,o=async()=>{try{return(await r.A.get("".concat(c,"/getSectionFirstContent"))).data}catch(t){throw console.error("Error fetching data:",t),t}},i=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateOnlyContent/").concat(t),a)).data}catch(e){throw console.error("Error updating data:",e),e}},d=async()=>{try{return(await r.A.get("".concat(c,"/getAllSectionFirst"))).data}catch(t){throw console.error("Error fetching banner images:",t),t}},s=async(t,a)=>{try{const e=new FormData;e.append("image",a);return(await r.A.put("".concat(c,"/updateBannerImages/").concat(t),e,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(e){throw console.error("Error updating banner image:",e),e}},l=async t=>{try{const a=new FormData;a.append("banner_img",t);return(await r.A.put("".concat(c,"/addSectionFirstImages/1"),a,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(a){throw console.error("Error adding banner image:",a),a}},h=async t=>{try{return(await r.A.delete("".concat(c,"/deleteBannerImage/").concat(t))).data}catch(a){throw console.error("Error deleting banner image:",a),a}},u=async()=>{try{return(await r.A.get("".concat(c,"/getAllSliderImages"))).data}catch(t){throw console.error("Error fetching slider images:",t),t}},g=async(t,a)=>{try{const e=new FormData;e.append("slider_img",a);return(await r.A.put("".concat(c,"/updateSliderImages/").concat(t),e,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(e){throw console.error("Error updating slider image:",e),e}},m=async t=>{try{return(await r.A.delete("".concat(c,"/deleteSliderImage/").concat(t))).data}catch(a){throw console.error("Error deleting slider image:",a),a}},p=async()=>{try{return(await r.A.get("".concat(c,"/getAllContentWithSliderImages"))).data}catch(t){throw console.error("Error fetching data:",t),t}},y=async t=>{try{return(await r.A.post("".concat(c,"/addSliderImage"),t,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(a){throw console.error("Error adding slider image:",a),a}},A=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateContentWithVideo/").concat(t),a)).data}catch(e){throw console.error("Error updating data:",e),e}},w=async t=>{try{return(await r.A.post("".concat(c,"/addContentWithVideo"),t,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(a){throw console.error("Error adding slider image:",a),a}},f=async t=>{try{return(await r.A.delete("".concat(c,"/deleteContainerData/").concat(t))).data}catch(a){throw console.error("Error deleting container data:",a),a}},_=async()=>{try{return(await r.A.get("".concat(c,"/getHome"))).data}catch(t){throw console.error("Error fetching home data:",t),t}},E=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateHome"),a)).data}catch(e){throw console.error("Error updating home data:",e),e}},x=async()=>{try{return(await r.A.get("".concat(c,"/getHomeSectionFirst"))).data.data}catch(t){throw console.error("Error fetching data:",t),t}},j=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateHomeSectionFirst"),a)).data}catch(e){throw new Error("Error updating home section first data:",e)}},S=async()=>{try{return(await r.A.get("".concat(c,"/homeSectionSecond"))).data}catch(t){return console.error("Error fetching HomeSectionSecond data:",t),null}},C=async(t,a)=>{try{return(await r.A.put("".concat(c,"/homeSectionSecond/").concat(t),a)).data}catch(e){return console.error("Error updating HomeSectionSecond data:",e),null}},b=async t=>{try{return await r.A.post("".concat(c,"/homeSectionSecond"),t)}catch(a){return console.error("Error adding Home Section Second image:",a),null}},I=async t=>{try{return(await r.A.delete("".concat(c,"/homeSectionSecond/").concat(t))).data}catch(a){return console.error("Error deleting Home Section Second data:",a),null}},T=async()=>{try{return(await r.A.get("".concat(c,"/getHomeSectionThird"))).data.data}catch(t){return console.error("Error fetching data:",t),null}},F=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateHomeSectionThird"),a)).data}catch(e){throw new Error("Error updating home section first data:",e)}},v=async()=>{try{return(await r.A.get("".concat(c,"/aboutus_banner"))).data.data}catch(t){throw console.error("Error fetching about us banner data:",t),t}},H=async(t,a)=>{try{return(await r.A.put("".concat(c,"/aboutus_banner/").concat(t),a)).data}catch(e){throw console.error("Error updating About Us Banner data:",e),e}},D=async t=>{try{return(await r.A.post("".concat(c,"/aboutus_banner"),t)).data}catch(a){throw new Error("Error adding about us banner:",a)}},N=async t=>{try{return(await r.A.delete("".concat(c,"/aboutus_banner/").concat(t))).data}catch(a){throw new Error("Error deleting about us banner:",a)}},B=async()=>{try{return(await r.A.get("".concat(c,"/getAboutUsSectionFirst"))).data}catch(t){throw new Error("Error fetching about us section first:",t)}},k=async t=>{try{return(await r.A.put("".concat(c,"/updateAboutUsSectionFirst"),t)).data}catch(a){throw console.error("Error updating About Us Section First data:",a),a}},M=async()=>{try{return(await r.A.get("".concat(c,"/getAboutUsSectionSecond"))).data.data}catch(t){return console.error("Error fetching data:",t),null}},W=async t=>{try{return(await r.A.put("".concat(c,"/updateAboutUsSectionSecond"),t)).data}catch(a){throw console.error("Error updating data:",a),a}},P=async()=>{try{return(await r.A.get("".concat(c,"/getNriPage"))).data.data}catch(t){return console.error("Error fetching data:",t),null}},U=async t=>{try{return(await r.A.put("".concat(c,"/updateNriPage"),t)).data}catch(a){throw console.error("Error updating data:",a),a}},V=async()=>{try{return(await r.A.get("".concat(c,"/getNriPageForm"))).data.data}catch(t){return console.error("Error fetching data:",t),[]}},z=async()=>{try{return(await r.A.get("".concat(c,"/getContactPage"))).data.data}catch(t){return console.error("Error fetching data:",t),null}},L=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateContactPage"),a)).data}catch(e){return console.error("Error updating data:",e),null}},R=async()=>{try{return(await r.A.get("".concat(c,"/getAllFooterData"))).data}catch(t){return console.error("Error fetching footer data:",t),null}},G=async(t,a)=>{try{return(await r.A.put("".concat(c,"/updateFooter"),a)).data}catch(e){throw console.error("Error updating footer data",e),e}},J=async()=>(await r.A.get("".concat(c,"/getAllGalleryImages"))).data,K=async(t,a)=>(await r.A.put("".concat(c,"/updateMainHeading/").concat(t),{main_heading:a})).data,q=async(t,a,e)=>{const n=new FormData;n.append("image1",a),n.append("main_table_id",e);return(await r.A.put("".concat(c,"/galleryImages/container1_image/").concat(t),n,{headers:{"Content-Type":"multipart/form-data"}})).data},X=async(t,a,e)=>{const n=new FormData;n.append("image2",a),n.append("main_table_id",e);return(await r.A.put("".concat(c,"/galleryImages/container2_image/").concat(t),n,{headers:{"Content-Type":"multipart/form-data"}})).data},O=async(t,a)=>{await r.A.delete("".concat(c,"/galleryImages/container1_image/").concat(t,"/").concat(a))},Y=async(t,a)=>{await r.A.delete("".concat(c,"/galleryImages/container2_image/").concat(t,"/").concat(a))},$=async(t,a)=>{const e=new FormData;e.append("image1",t),e.append("main_table_id",a),await r.A.post("".concat(c,"/galleryImages/container1_image"),e)},Z=async(t,a)=>{const e=new FormData;e.append("image2",t),e.append("main_table_id",a);return(await r.A.post("".concat(c,"/galleryImages/container2_image"),e,{headers:{"Content-Type":"multipart/form-data"}})).data},Q=async t=>(await r.A.post("".concat(c,"/addAllHeadingWithImages"),t)).data,tt=async t=>(await r.A.delete("".concat(c,"/deleteMainData/").concat(t))).data,at=async()=>(await r.A.get("".concat(c,"/galleryBanner"))).data,et=async(t,a)=>(await r.A.put("".concat(c,"/galleryBanner/"),a,{headers:{"Content-Type":"multipart/form-data"}})).data},5540:(t,a,e)=>{"use strict";var r=e(4994);a.A=void 0;var n=r(e(39)),c=e(579);a.A=(0,n.default)((0,c.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit")},6446:(t,a,e)=>{"use strict";e.d(a,{A:()=>f});var r=e(8168),n=e(8587),c=e(5043),o=e(8387),i=e(3174),d=e(8812),s=e(8698),l=e(8653),h=e(579);const u=["className","component"];var g=e(5430),m=e(8279),p=e(3375);const y=(0,e(7056).A)("MuiBox",["root"]),A=(0,m.A)(),w=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:a,defaultTheme:e,defaultClassName:g="MuiBox-root",generateClassName:m}=t,p=(0,i.default)("div",{shouldForwardProp:t=>"theme"!==t&&"sx"!==t&&"as"!==t})(d.A);return c.forwardRef((function(t,c){const i=(0,l.A)(e),d=(0,s.A)(t),{className:y,component:A="div"}=d,w=(0,n.A)(d,u);return(0,h.jsx)(p,(0,r.A)({as:A,ref:c,className:(0,o.A)(y,m?m(g):g),theme:a&&i[a]||i},w))}))}({themeId:p.A,defaultTheme:A,defaultClassName:y.root,generateClassName:g.A.generate}),f=w}}]);
//# sourceMappingURL=553.c0428473.chunk.js.map