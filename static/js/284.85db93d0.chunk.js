(self.webpackChunknew_venture=self.webpackChunknew_venture||[]).push([[284],{8525:()=>{},4284:(a,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>b});var n=e(5043),r=e(9650),c=e(3336),o=e(1806),i=e(4882),d=e(8076),s=e(2420),l=e(3460),g=e(1906),h=e(35),u=e(6600),p=e(5316),y=e(5795),m=e(9347),w=e(1563),A=e(5540),_=e(579);const b=function(){const[a,t]=(0,n.useState)(null),[e,b]=(0,n.useState)(!1),[E,f]=(0,n.useState)({banner_heading:"",banner_img:null,section_one_heading:"",section_one_content:""});(0,n.useEffect)((()=>{S()}),[]);const S=async()=>{const a=await(0,w.vB)();t(a)},x=()=>{b(!1)},j=a=>{const{name:t,value:e,files:n}=a.target;if("banner_img"===t){const a=n.length>0?n[0]:null;f((t=>({...t,banner_img:a})))}else f((a=>({...a,[t]:e})))};return(0,_.jsxs)("div",{children:[(0,_.jsx)("h2",{children:"Edit NRI Page"}),a?(0,_.jsx)(r.A,{component:c.A,children:(0,_.jsxs)(o.A,{children:[(0,_.jsx)(i.A,{children:(0,_.jsxs)(d.A,{children:[(0,_.jsx)(s.A,{children:"S No."}),(0,_.jsx)(s.A,{children:"Banner Heading"}),(0,_.jsx)(s.A,{children:"Banner Image"}),(0,_.jsx)(s.A,{children:"Section One Heading"}),(0,_.jsx)(s.A,{children:"Section One Content"}),(0,_.jsx)(s.A,{children:"Edit"})]})}),(0,_.jsx)(l.A,{children:(0,_.jsxs)(d.A,{children:[(0,_.jsx)(s.A,{children:"1"}),(0,_.jsx)(s.A,{children:a.banner_heading}),(0,_.jsx)(s.A,{children:(0,_.jsx)("img",{style:{maxWidth:"100px"},src:a.banner_img,alt:"Banner Image"})}),(0,_.jsx)(s.A,{children:a.section_one_heading}),(0,_.jsx)(s.A,{children:a.section_one_content}),(0,_.jsx)(s.A,{children:(0,_.jsx)(g.A,{startIcon:(0,_.jsx)(A.A,{}),onClick:()=>{b(!0),f({banner_heading:a.banner_heading,banner_img:null,section_one_heading:a.section_one_heading,section_one_content:a.section_one_content})},children:"Edit"})})]})})]})}):(0,_.jsx)("p",{children:"Loading..."}),(0,_.jsxs)(h.A,{open:e,onClose:x,children:[(0,_.jsx)(u.A,{children:"Edit NRI Page Data"}),(0,_.jsxs)(p.A,{children:[(0,_.jsx)(y.A,{label:"Banner Heading",name:"banner_heading",value:E.banner_heading,onChange:j,fullWidth:!0,margin:"dense"}),(0,_.jsx)(y.A,{type:"file",name:"banner_img",accept:"image/*",onChange:j,margin:"dense",fullWidth:!0}),(0,_.jsx)(y.A,{margin:"dense",label:"Section One Heading",name:"section_one_heading",value:E.section_one_heading,onChange:j,fullWidth:!0}),(0,_.jsx)(y.A,{margin:"dense",label:"Section One Content",name:"section_one_content",value:E.section_one_content,onChange:j,fullWidth:!0})]}),(0,_.jsxs)(m.A,{children:[(0,_.jsx)(g.A,{onClick:x,children:"Cancel"}),(0,_.jsx)(g.A,{onClick:async()=>{try{const t=new FormData;t.append("id",a.id),t.append("banner_heading",E.banner_heading),t.append("banner_img",E.banner_img),t.append("section_one_heading",E.section_one_heading),t.append("section_one_content",E.section_one_content),await(0,w.as)(t),x(),S()}catch(t){console.error("Error updating data:",t)}},children:"Save"})]})]})]})}},1563:(a,t,e)=>{"use strict";e.d(t,{$h:()=>h,BD:()=>q,Cg:()=>G,Cl:()=>v,E0:()=>d,G:()=>F,Hh:()=>o,IG:()=>u,J1:()=>z,JL:()=>E,Jz:()=>x,KJ:()=>j,M$:()=>ea,RI:()=>ta,RM:()=>L,TF:()=>w,Te:()=>k,Tx:()=>g,Vv:()=>H,XA:()=>W,XR:()=>aa,Xk:()=>l,Yb:()=>I,Yg:()=>R,Z3:()=>s,_1:()=>Y,_c:()=>i,aK:()=>M,ac:()=>Q,as:()=>N,dp:()=>D,dt:()=>J,fH:()=>_,hT:()=>O,k3:()=>A,mh:()=>C,pD:()=>f,qI:()=>S,qP:()=>P,ql:()=>m,r8:()=>$,sK:()=>K,sL:()=>Z,tK:()=>V,vB:()=>U,vO:()=>y,wf:()=>p,xu:()=>B,yM:()=>b,z_:()=>T,zb:()=>X});var n=e(6213),r=e(8525);const c=r.API_URL,o=async()=>{try{return(await n.A.get("".concat(c,"/getSectionFirstContent"))).data}catch(a){throw console.error("Error fetching data:",a),a}},i=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateOnlyContent/").concat(a),t)).data}catch(e){throw console.error("Error updating data:",e),e}},d=async()=>{try{return(await n.A.get("".concat(c,"/getAllSectionFirst"))).data}catch(a){throw console.error("Error fetching banner images:",a),a}},s=async(a,t)=>{try{const e=new FormData;e.append("image",t);return(await n.A.put("".concat(c,"/updateBannerImages/").concat(a),e,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(e){throw console.error("Error updating banner image:",e),e}},l=async a=>{try{const t=new FormData;t.append("banner_img",a);return(await n.A.put("".concat(c,"/addSectionFirstImages/1"),t,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Error adding banner image:",t),t}},g=async a=>{try{return(await n.A.delete("".concat(c,"/deleteBannerImage/").concat(a))).data}catch(t){throw console.error("Error deleting banner image:",t),t}},h=async()=>{try{return(await n.A.get("".concat(c,"/getAllSliderImages"))).data}catch(a){throw console.error("Error fetching slider images:",a),a}},u=async(a,t)=>{try{const e=new FormData;e.append("slider_img",t);return(await n.A.put("".concat(c,"/updateSliderImages/").concat(a),e,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(e){throw console.error("Error updating slider image:",e),e}},p=async a=>{try{return(await n.A.delete("".concat(c,"/deleteSliderImage/").concat(a))).data}catch(t){throw console.error("Error deleting slider image:",t),t}},y=async()=>{try{return(await n.A.get("".concat(c,"/getAllContentWithSliderImages"))).data}catch(a){throw console.error("Error fetching data:",a),a}},m=async a=>{try{return(await n.A.post("".concat(c,"/addSliderImage"),a,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Error adding slider image:",t),t}},w=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateContentWithVideo/").concat(a),t)).data}catch(e){throw console.error("Error updating data:",e),e}},A=async a=>{try{return(await n.A.post("".concat(c,"/addContentWithVideo"),a,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Error adding slider image:",t),t}},_=async a=>{try{return(await n.A.delete("".concat(c,"/deleteContainerData/").concat(a))).data}catch(t){throw console.error("Error deleting container data:",t),t}},b=async()=>{try{return(await n.A.get("".concat(c,"/getHome"))).data}catch(a){throw console.error("Error fetching home data:",a),a}},E=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateHome"),t)).data}catch(e){throw console.error("Error updating home data:",e),e}},f=async()=>{try{return(await n.A.get("".concat(c,"/getHomeSectionFirst"))).data.data}catch(a){throw console.error("Error fetching data:",a),a}},S=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateHomeSectionFirst"),t)).data}catch(e){throw new Error("Error updating home section first data:",e)}},x=async()=>{try{return(await n.A.get("".concat(c,"/homeSectionSecond"))).data}catch(a){return console.error("Error fetching HomeSectionSecond data:",a),null}},j=async(a,t)=>{try{return(await n.A.put("".concat(c,"/homeSectionSecond/").concat(a),t)).data}catch(e){return console.error("Error updating HomeSectionSecond data:",e),null}},C=async a=>{try{return await n.A.post("".concat(c,"/homeSectionSecond"),a)}catch(t){return console.error("Error adding Home Section Second image:",t),null}},I=async a=>{try{return(await n.A.delete("".concat(c,"/homeSectionSecond/").concat(a))).data}catch(t){return console.error("Error deleting Home Section Second data:",t),null}},F=async()=>{try{return(await n.A.get("".concat(c,"/getHomeSectionThird"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},H=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateHomeSectionThird"),t)).data}catch(e){throw new Error("Error updating home section first data:",e)}},v=async()=>{try{return(await n.A.get("".concat(c,"/aboutus_banner"))).data.data}catch(a){throw console.error("Error fetching about us banner data:",a),a}},T=async(a,t)=>{try{return(await n.A.put("".concat(c,"/aboutus_banner/").concat(a),t)).data}catch(e){throw console.error("Error updating About Us Banner data:",e),e}},D=async a=>{try{return(await n.A.post("".concat(c,"/aboutus_banner"),a)).data}catch(t){throw new Error("Error adding about us banner:",t)}},B=async a=>{try{return(await n.A.delete("".concat(c,"/aboutus_banner/").concat(a))).data}catch(t){throw new Error("Error deleting about us banner:",t)}},k=async()=>{try{return(await n.A.get("".concat(c,"/getAboutUsSectionFirst"))).data}catch(a){throw new Error("Error fetching about us section first:",a)}},P=async a=>{try{return(await n.A.put("".concat(c,"/updateAboutUsSectionFirst"),a)).data}catch(t){throw console.error("Error updating About Us Section First data:",t),t}},W=async()=>{try{return(await n.A.get("".concat(c,"/getAboutUsSectionSecond"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},M=async a=>{try{return(await n.A.put("".concat(c,"/updateAboutUsSectionSecond"),a)).data}catch(t){throw console.error("Error updating data:",t),t}},U=async()=>{try{return(await n.A.get("".concat(c,"/getNriPage"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},N=async a=>{try{return(await n.A.put("".concat(c,"/updateNriPage"),a)).data}catch(t){throw console.error("Error updating data:",t),t}},O=async()=>{try{return(await n.A.get("".concat(c,"/getNriPageForm"))).data.data}catch(a){return console.error("Error fetching data:",a),[]}},R=async()=>{try{return(await n.A.get("".concat(c,"/getContactPage"))).data.data}catch(a){return console.error("Error fetching data:",a),null}},z=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateContactPage"),t)).data}catch(e){return console.error("Error updating data:",e),null}},L=async()=>{try{return(await n.A.get("".concat(c,"/getAllFooterData"))).data}catch(a){return console.error("Error fetching footer data:",a),null}},J=async(a,t)=>{try{return(await n.A.put("".concat(c,"/updateFooter"),t)).data}catch(e){throw console.error("Error updating footer data",e),e}},K=async()=>(await n.A.get("".concat(c,"/getAllGalleryImages"))).data,V=async(a,t)=>(await n.A.put("".concat(c,"/updateMainHeading/").concat(a),{main_heading:t})).data,q=async(a,t,e)=>{const r=new FormData;r.append("image1",t),r.append("main_table_id",e);return(await n.A.put("".concat(c,"/galleryImages/container1_image/").concat(a),r,{headers:{"Content-Type":"multipart/form-data"}})).data},G=async(a,t,e)=>{const r=new FormData;r.append("image2",t),r.append("main_table_id",e);return(await n.A.put("".concat(c,"/galleryImages/container2_image/").concat(a),r,{headers:{"Content-Type":"multipart/form-data"}})).data},X=async(a,t)=>{await n.A.delete("".concat(c,"/galleryImages/container1_image/").concat(a,"/").concat(t))},Y=async(a,t)=>{await n.A.delete("".concat(c,"/galleryImages/container2_image/").concat(a,"/").concat(t))},$=async(a,t)=>{const e=new FormData;e.append("image1",a),e.append("main_table_id",t),await n.A.post("".concat(c,"/galleryImages/container1_image"),e)},Z=async(a,t)=>{const e=new FormData;e.append("image2",a),e.append("main_table_id",t);return(await n.A.post("".concat(c,"/galleryImages/container2_image"),e,{headers:{"Content-Type":"multipart/form-data"}})).data},Q=async a=>(await n.A.post("".concat(c,"/addAllHeadingWithImages"),a)).data,aa=async a=>(await n.A.delete("".concat(c,"/deleteMainData/").concat(a))).data,ta=async()=>(await n.A.get("".concat(c,"/galleryBanner"))).data,ea=async(a,t)=>(await n.A.put("".concat(c,"/galleryBanner/"),t,{headers:{"Content-Type":"multipart/form-data"}})).data},5540:(a,t,e)=>{"use strict";var n=e(4994);t.A=void 0;var r=n(e(39)),c=e(579);t.A=(0,r.default)((0,c.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit")}}]);
//# sourceMappingURL=284.85db93d0.chunk.js.map