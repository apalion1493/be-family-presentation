!function(e,r){"function"==typeof define&&define.amd?define(["ScrollMagic"],r):"object"==typeof exports?r(require("scrollmagic")):r(e.ScrollMagic||e.jQuery&&e.jQuery.ScrollMagic)}(this,function(i){"use strict";var v="debug.addIndicators",e=window.console||{},r=Function.prototype.bind.call(e.error||e.log||function(){},e);i||r("("+v+") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");var o="0.85em",n="9999",b=i._util,G=0;i.Scene.extend(function(){var t,i=this;i.addIndicators=function(e){if(!t){var r={name:"",indent:0,parent:void 0,colorStart:"green",colorEnd:"red",colorTrigger:"blue"};e=b.extend({},r,e),G++,t=new s(i,e),i.on("add.plugin_addIndicators",t.add),i.on("remove.plugin_addIndicators",t.remove),i.on("destroy.plugin_addIndicators",i.removeIndicators),i.controller()&&t.add()}return i},i.removeIndicators=function(){return t&&(t.remove(),this.off("*.plugin_addIndicators"),t=void 0),i}}),i.Controller.addOption("addIndicators",!1),i.Controller.extend(function(){var p=this,e=p.info(),u=e.container,f=e.isDocument,h=e.vertical,m={groups:[]};p._indicators&&function(){p._log&&(Array.prototype.splice.call(arguments,1,0,"("+v+")","->"),p._log.apply(this,arguments))}(2,"WARNING: Scene already has a property '_indicators', which will be overwritten by plugin."),this._indicators=m;function r(){m.updateBoundsPositions()}function t(){m.updateTriggerGroupPositions()}return u.addEventListener("resize",t),f||(window.addEventListener("resize",t),window.addEventListener("scroll",t)),u.addEventListener("resize",r),u.addEventListener("scroll",r),this._indicators.updateBoundsPositions=function(e){for(var r,t,i,o=e?[b.extend({},e.triggerGroup,{members:[e]})]:m.groups,n=o.length,s={},d=h?"left":"top",a=h?"width":"height",l=h?b.get.scrollLeft(u)+b.get.width(u)-15:b.get.scrollTop(u)+b.get.height(u)-15;n--;)for(r=(i=o[n]).members.length,t=b.get[a](i.element.firstChild);r--;)s[d]=l-t,b.css(i.members[r].bounds,s)},this._indicators.updateTriggerGroupPositions=function(e){for(var r,t,i,o,n=e?[e]:m.groups,s=n.length,d=f?document.body:u,a=f?{top:0,left:0}:b.get.offset(d,!0),l=h?b.get.width(u)-15:b.get.height(u)-15,g=h?"width":"height",c=h?"Y":"X";s--;)t=(r=n[s]).element,i=r.triggerHook*p.info("size"),o=b.get[g](t.firstChild.firstChild)<i?"translate"+c+"(-100%)":"",b.css(t,{top:a.top+(h?i:l-r.members[0].options.indent),left:a.left+(h?l-r.members[0].options.indent:i)}),b.css(t.firstChild.firstChild,{"-ms-transform":o,"-webkit-transform":o,transform:o})},this._indicators.updateTriggerGroupLabel=function(e){var r="trigger"+(1<e.members.length?"":" "+e.members[0].options.name),t=e.element.firstChild.firstChild;t.textContent!==r&&(t.textContent=r,h&&m.updateBoundsPositions())},this.addScene=function(e){this._options.addIndicators&&e instanceof i.Scene&&e.controller()===p&&e.addIndicators(),this.$super.addScene.apply(this,arguments)},this.destroy=function(){u.removeEventListener("resize",t),f||(window.removeEventListener("resize",t),window.removeEventListener("scroll",t)),u.removeEventListener("resize",r),u.removeEventListener("scroll",r),this.$super.destroy.apply(this,arguments)},p});var s=function(o,n){function r(){o._log&&(Array.prototype.splice.call(arguments,1,0,"("+v+")","->"),o._log.apply(this,arguments))}var s,d,a=this,t=w.bounds(),i=w.start(n.colorStart),l=w.end(n.colorEnd),g=n.parent&&b.get.elements(n.parent)[0];n.name=n.name||G,i.firstChild.textContent+=" "+n.name,l.textContent+=" "+n.name,t.appendChild(i),t.appendChild(l),a.options=n,a.bounds=t,a.triggerGroup=void 0,this.add=function(){d=o.controller(),s=d.info("vertical");var e=d.info("isDocument");g=g||(e?document.body:d.info("container")),e||"static"!==b.css(g,"position")||b.css(g,{position:"relative"}),o.on("change.plugin_addIndicators",p),o.on("shift.plugin_addIndicators",c),m(),f(),setTimeout(function(){d._indicators.updateBoundsPositions(a)},0),r(3,"added indicators")},this.remove=function(){if(a.triggerGroup){if(o.off("change.plugin_addIndicators",p),o.off("shift.plugin_addIndicators",c),1<a.triggerGroup.members.length){var e=a.triggerGroup;e.members.splice(e.members.indexOf(a),1),d._indicators.updateTriggerGroupLabel(e),d._indicators.updateTriggerGroupPositions(e),a.triggerGroup=void 0}else h();u(),r(3,"removed indicators")}};var c=function(){f()},p=function(e){"triggerHook"===e.what&&m()},u=function(){t.parentNode.removeChild(t)},f=function(){t.parentNode!==g&&function(){var e=d.info("vertical");b.css(i.firstChild,{"border-bottom-width":e?1:0,"border-right-width":e?0:1,bottom:e?-1:n.indent,right:e?n.indent:-1,padding:e?"0 8px":"2px 4px"}),b.css(l,{"border-top-width":e?1:0,"border-left-width":e?0:1,top:e?"100%":"",right:e?n.indent:"",bottom:e?"":n.indent,left:e?"":"100%",padding:e?"0 8px":"2px 4px"}),g.appendChild(t)}();var e={};e[s?"top":"left"]=o.triggerPosition(),e[s?"height":"width"]=o.duration(),b.css(t,e),b.css(l,{display:0<o.duration()?"":"none"})},h=function(){d._indicators.groups.splice(d._indicators.groups.indexOf(a.triggerGroup),1),a.triggerGroup.element.parentNode.removeChild(a.triggerGroup.element),a.triggerGroup=void 0},m=function(){var e=o.triggerHook();if(!(a.triggerGroup&&Math.abs(a.triggerGroup.triggerHook-e)<1e-4)){for(var r,t=d._indicators.groups,i=t.length;i--;)if(r=t[i],Math.abs(r.triggerHook-e)<1e-4)return a.triggerGroup&&(1===a.triggerGroup.members.length?h():(a.triggerGroup.members.splice(a.triggerGroup.members.indexOf(a),1),d._indicators.updateTriggerGroupLabel(a.triggerGroup),d._indicators.updateTriggerGroupPositions(a.triggerGroup))),r.members.push(a),a.triggerGroup=r,void d._indicators.updateTriggerGroupLabel(r);if(a.triggerGroup){if(1===a.triggerGroup.members.length)return a.triggerGroup.triggerHook=e,void d._indicators.updateTriggerGroupPositions(a.triggerGroup);a.triggerGroup.members.splice(a.triggerGroup.members.indexOf(a),1),d._indicators.updateTriggerGroupLabel(a.triggerGroup),d._indicators.updateTriggerGroupPositions(a.triggerGroup),a.triggerGroup=void 0}!function(){var e=w.trigger(n.colorTrigger),r={};r[s?"right":"bottom"]=0,r[s?"border-top-width":"border-left-width"]=1,b.css(e.firstChild,r),b.css(e.firstChild.firstChild,{padding:s?"0 8px 3px 8px":"3px 4px"}),document.body.appendChild(e);var t={triggerHook:o.triggerHook(),element:e,members:[a]};d._indicators.groups.push(t),a.triggerGroup=t,d._indicators.updateTriggerGroupLabel(t),d._indicators.updateTriggerGroupPositions(t)}()}}},w={start:function(e){var r=document.createElement("div");r.textContent="start",b.css(r,{position:"absolute",overflow:"visible","border-width":0,"border-style":"solid",color:e,"border-color":e});var t=document.createElement("div");return b.css(t,{position:"absolute",overflow:"visible",width:0,height:0}),t.appendChild(r),t},end:function(e){var r=document.createElement("div");return r.textContent="end",b.css(r,{position:"absolute",overflow:"visible","border-width":0,"border-style":"solid",color:e,"border-color":e}),r},bounds:function(){var e=document.createElement("div");return b.css(e,{position:"absolute",overflow:"visible","white-space":"nowrap","pointer-events":"none","font-size":o}),e.style.zIndex=n,e},trigger:function(e){var r=document.createElement("div");r.textContent="trigger",b.css(r,{position:"relative"});var t=document.createElement("div");b.css(t,{position:"absolute",overflow:"visible","border-width":0,"border-style":"solid",color:e,"border-color":e}),t.appendChild(r);var i=document.createElement("div");return b.css(i,{position:"fixed",overflow:"visible","white-space":"nowrap","pointer-events":"none","font-size":o}),i.style.zIndex=n,i.appendChild(t),i}}});