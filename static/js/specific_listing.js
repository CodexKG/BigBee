!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(s){"use strict";Number.isNaN=Number.isNaN||function(t){return"number"==typeof t&&t!=t};var t,o="rangeslider",a=0,r=((t=document.createElement("input")).setAttribute("type","range"),"text"!==t.type),h={polyfill:!0,orientation:"horizontal",isRTL:!1,rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",activeClass:"rangeslider--active",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},l={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};function e(e,t){var i=function(){for(var t=[],i=e.parentNode;i&&(0===i.offsetWidth||0===i.offsetHeight||!1===i.open);)t.push(i),i=i.parentNode;return t}(),n=i.length,s=[],o=e[t];function a(t){void 0!==t.open&&(t.open=!t.open)}if(n){for(var r=0;r<n;r++)s[r]=i[r].style.cssText,i[r].style.setProperty?i[r].style.setProperty("display","block","important"):i[r].style.cssText+=";display: block !important",i[r].style.height="0",i[r].style.overflow="hidden",i[r].style.visibility="hidden",a(i[r]);o=e[t];for(var h=0;h<n;h++)i[h].style.cssText=s[h],a(i[h])}return o}function n(t,i){t=parseFloat(t);return Number.isNaN(t)?i:t}function d(t){return t.charAt(0).toUpperCase()+t.substr(1)}function u(t,i){if(this.$window=s(window),this.$document=s(document),this.$element=s(t),this.options=s.extend({},h,i),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=l.orientation[this.orientation].dimension,this.DIRECTION=this.options.isRTL?"right":"left",this.DIRECTION_STYLE=this.options.isRTL?"right":"left",this.COORDINATE=l.orientation[this.orientation].coordinate,this.polyfill&&r)return!1;this.identifier="js-"+o+"-"+a++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=s('<div class="'+this.options.fillClass+'" />'),this.$handle=s('<div class="'+this.options.handleClass+'" />'),this.$range=s('<div class="'+this.options.rangeClass+(this.options.isRTL?" rangeslider-rtl ":"")+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=s.proxy(this.handleDown,this),this.handleMove=s.proxy(this.handleMove,this),this.handleEnd=s.proxy(this.handleEnd,this),this.init();var e,n=this;this.$window.on("resize."+this.identifier,(e=function(){!function(t){var i=Array.prototype.slice.call(arguments,2);setTimeout(function(){return t.apply(null,i)},300)}(function(){n.update(!1,!1)},300)},0,function(){var t;return e.debouncing||(t=Array.prototype.slice.apply(arguments),e.lastReturnVal=e.apply(window,t),e.debouncing=!0),clearTimeout(e.debounceTimeout),e.debounceTimeout=setTimeout(function(){e.debouncing=!1},20),e.lastReturnVal})),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(t,i){i&&i.origin===n.identifier||(t=t.target.value,t=n.getPositionFromValue(t),n.setPosition(t))})}return u.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},u.prototype.update=function(t,i){(t=t||!1)&&(this.min=n(this.$element[0].getAttribute("min"),0),this.max=n(this.$element[0].getAttribute("max"),100),this.value=n(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=n(this.$element[0].getAttribute("step"),1)),this.handleDimension=e(this.$handle[0],"offset"+d(this.DIMENSION)),this.rangeDimension=e(this.$range[0],"offset"+d(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,i)},u.prototype.handleDown=function(t){var i,e;t.preventDefault(),this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),this.$range.addClass(this.options.activeClass),-1<(" "+t.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)||(i=this.getRelativePosition(t),e=this.$range[0].getBoundingClientRect()[this.DIRECTION],t=this.getPositionFromNode(this.$handle[0])-e,e="vertical"===this.orientation?this.maxHandlePos-(i-this.grabPos):i-this.grabPos,this.setPosition(e),t<=i&&i<t+this.handleDimension&&(this.grabPos=i-t))},u.prototype.handleMove=function(t){t.preventDefault();t=this.getRelativePosition(t),t="vertical"===this.orientation?this.maxHandlePos-(t-this.grabPos):t-this.grabPos;this.setPosition(t)},u.prototype.handleEnd=function(t){t.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$range.removeClass(this.options.activeClass),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},u.prototype.cap=function(t,i,e){return t<i?i:e<t?e:t},u.prototype.setPosition=function(t,i){var e;void 0===i&&(i=!0),e=this.getValueFromPosition(this.cap(t,0,this.maxHandlePos)),t=this.getPositionFromValue(e),this.$fill[0].style[this.DIMENSION]=t+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=t+"px",this.setValue(e),this.position=t,this.value=e,i&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(t,e)},u.prototype.getPositionFromNode=function(t){for(var i=0;null!==t;)i+=t.offsetLeft,t=t.offsetParent;return i},u.prototype.getRelativePosition=function(t){var i=d(this.COORDINATE),e=this.$range[0].getBoundingClientRect()[this.DIRECTION],n=0;return void 0!==t.originalEvent["client"+i]?n=t.originalEvent["client"+i]:t.originalEvent.touches&&t.originalEvent.touches[0]&&void 0!==t.originalEvent.touches[0]["client"+i]?n=t.originalEvent.touches[0]["client"+i]:t.currentPoint&&void 0!==t.currentPoint[this.COORDINATE]&&(n=t.currentPoint[this.COORDINATE]),this.options.isRTL?e-n:n-e},u.prototype.getPositionFromValue=function(t){t=(t-this.min)/(this.max-this.min);return Number.isNaN(t)?0:t*this.maxHandlePos},u.prototype.getValueFromPosition=function(t){var t=t/(this.maxHandlePos||1),t=this.step*Math.round(t*(this.max-this.min)/this.step)+this.min;return Number(t.toFixed(this.toFixed))},u.prototype.setValue=function(t){t===this.value&&""!==this.$element[0].value||this.$element.val(t).trigger("input",{origin:this.identifier})},u.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+o),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},s.fn[o]=function(e){var n=Array.prototype.slice.call(arguments,1);return this.each(function(){var t=s(this),i=t.data("plugin_"+o);i||t.data("plugin_"+o,i=new u(this,e)),"string"==typeof e&&i[e].apply(i,n)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"}),function(i){"use strict";i(".categories_carousel_in").owlCarousel({center:!1,stagePadding:50,items:1,loop:!1,margin:20,dots:!1,nav:!0,lazyLoad:!0,navText:["<i class='arrow_left'></i>","<i class='arrow_right'></i>"],responsive:{0:{nav:!1,dots:!1,items:2},600:{nav:!1,dots:!1,items:2},1025:{nav:!0,dots:!1,items:3},1280:{nav:!0,dots:!1,items:4},1440:{nav:!0,dots:!1,items:5}}}),i("#sidebar_fixed").theiaStickySidebar({minWidth:991,updateSidebarHeight:!0,additionalMarginTop:25}),i(".btn_map").on("click",function(){var t=i(".btn_map_txt");t.text()==t.data("text-swap")?t.text(t.data("text-original")):t.text(t.data("text-swap")),i("html, body").animate({scrollTop:i("body").offset().top},600)}),i('input[type="range"]').rangeslider({polyfill:!1,onInit:function(){this.output=i(".distance span").html(this.$element.val())},onSlide:function(t,i){this.output.html(i)}});var t=i(".filter_type h4 a");t.on("click",function(){i(this).toggleClass("opened")}),t.on("click",function(){i(this).toggleClass("closed")}),i("a.open_filters").on("click",function(){i(".filter_col").toggleClass("show"),i(".layer").toggleClass("layer-is-visible")})}(window.jQuery);