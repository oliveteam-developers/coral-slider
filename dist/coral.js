(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Coral"] = factory();
	else
		root["Coral"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/coral.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/coral.js":
/*!*********************!*\
  !*** ./js/coral.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Coral; });\nclass Coral {\n    constructor(obj) {\n        this.stepWidth = 0;\n        this.mobileStepWidth = 0;\n        this.speed = 0;\n        this.autoplaySpeed = 0;\n        this.sliderElement = null;\n        this.sliderElementCount = 1;\n        this.sliderWidth = 0;\n        this.sliderInterval = null;\n        this.viewportInterval = null;\n        this.leftOffset = 0;\n        this.drag = false;\n        this.startPoint = null;\n        this.class = null;\n        this.position = null;\n        this.isRunning = true;\n        this.windowHeight = window.innerHeight;\n        this.setup(obj);\n        this.init();\n    }\n\n    setup(obj) {\n        this.stepWidth = obj && obj.stepWidth ? obj.stepWidth : 500;\n        this.mobileStepWidth = obj && obj.mobileStepWidth ? obj.mobileStepWidth : 500;\n        this.speed = obj && obj.speed ? obj.speed : 1;\n        this.autoplaySpeed = obj && obj.autoplaySpeed ? obj.autoplaySpeed : 0;\n        this.class = obj && obj.class ? obj.class : 'coral-slider';\n    }\n\n    init() {\n        if ($(`.${this.class}`)[0]) {\n            this.sliderElement = $(`.${this.class}`).children().clone();\n            this.handleActiveWindow();\n            this.handleMouseEnter();\n            this.handleMouseLeave();\n            this.handleTouchStart();\n            this.handleTouchMove();\n            this.handleTouchEnd();\n            this.handleTouchCancel();\n            this.getSliderWidth();\n            this.trackingViewport();\n            this.runningSlider();\n            this.handleOffset();\n            this.triggerScrolling();\n        }\n    }\n\n    handleActiveWindow() {\n        $(window).focus(() => {\n            if (!this.isRunning) {\n                this.reRunningSlider();\n                this.isRunning = true;\n            }\n        });\n\n        $(window).blur(() => {\n            if (this.isRunning) {\n                this.resetSlider();\n                this.isRunning = false;\n            }\n        });\n    }\n\n    triggerScrolling() {\n        setTimeout(() => {\n            $(document).ready(() => {\n                $(window).scroll(() => {\n                    const currentScroll = $(window).scrollTop();\n                    if (currentScroll <= (this.position.topLine - this.windowHeight - 100) || currentScroll >= (this.position.bottomLine + this.windowHeight + 100)) {\n                        if (this.isRunning) {\n                            this.resetSlider();\n                            this.isRunning = false;\n                        }\n                    } else {\n                        if (!this.isRunning) {\n                            this.reRunningSlider();\n                            this.isRunning = true;\n                        }\n                    }\n                });\n            });\n        }, 2000);\n    }\n\n    handleOffset() {\n        const offsetToTop = $(`.${this.class}`).offset().top;\n        const height = $(`.${this.class}`).height();\n        this.position = {\n            topLine: offsetToTop,\n            height,\n            bottomLine: offsetToTop + height,\n        }\n    }\n\n    getSliderWidth() {\n        const sliderItems = $(`.${this.class}`).children();\n        if (sliderItems && sliderItems.length) {\n            $(sliderItems).each((index, object) => {\n                this.sliderWidth += $(object).width();\n            });\n        }\n    }\n\n    handleMouseEnter() {\n        $(`.${this.class}`).on('mouseenter', () => {\n            this.destroyRunning();\n        });\n    }\n\n    handleMouseLeave() {\n        $(`.${this.class}`).on('mouseleave', () => {\n            this.runningSlider();\n        });\n    }\n\n    handleTouchStart() {\n        $(`.${this.class}`).on('touchstart mousedown', (event) => {\n            if (!this.isMobile()) {\n                event.preventDefault();\n            } else {\n                this.destroyRunning();\n            }\n            this.drag = true;\n            this.startPoint = !this.isMobile() ? event.originalEvent.screenX : event.originalEvent.changedTouches[0].screenX;\n        });\n    }\n\n    handleTouchMove() {\n        $(`.${this.class}`).on('touchmove mousemove', (event) => {\n            // event.preventDefault();\n        });\n    }\n\n    animation(offset, speed) {\n        $(`.${this.class}`).css('transform', `translate3d(${offset}px, 0px, 0px)`);\n        $(`.${this.class}`).css('transition', `transform ${speed}s`);\n        $(`.${this.class}`).css('-webkit-transform', `translate3d(${offset}px, 0px, 0px)`);\n        $(`.${this.class}`).css('-webkit-transition', `transform ${speed}s`);\n    }\n\n    handleTouchEnd() {\n        $(`.${this.class}`).on('touchend mouseup', (event) => {\n            // event.preventDefault();\n            const element = $(`.${this.class}`).offset();\n            const start = this.startPoint;\n            const end = !this.isMobile() ? event.originalEvent.screenX : event.originalEvent.changedTouches[0].screenX;\n            this.leftOffset = element.left - 2 * (start - end);\n            this.leftOffset = this.leftOffset > 0 ? 0 : this.leftOffset;\n            this.animation(this.leftOffset, this.speed);\n            this.startPoint = null;\n            this.drag = false;\n        });\n    }\n\n    handleTouchCancel() {\n        $(`.${this.class}`).on('touchcancel mouseleave', (event) => {\n            // event.preventDefault();\n        });\n    }\n\n    runningSlider() {\n        this.sliderInterval = setInterval(() => {\n            this.leftOffset = Math.ceil($(`.${this.class}`).find('.coral-item').first().offset().left);\n            const stepWidth = this.isMobile() ? this.mobileStepWidth : this.stepWidth;\n            $(`.${this.class}`).css('transform', `translate3d(${this.leftOffset - stepWidth}px, 0px, 0px)`);\n            $(`.${this.class}`).css('transition', `transform ${this.speed}s`);\n            $(`.${this.class}`).css('-webkit-transform', `translate3d(${this.leftOffset - stepWidth}px, 0px, 0px)`);\n            $(`.${this.class}`).css('-webkit-transition', `transform ${this.speed}s`);\n            this.animation(this.leftOffset - stepWidth, this.speed);\n        }, this.autoplaySpeed);\n    }\n\n    trackingViewport() {\n        this.viewportInterval = setInterval(() => {\n            const windowWidth = $(window).width();\n            if (((this.leftOffset * -1) + windowWidth) >= (this.sliderWidth * this.sliderElementCount - 500)) {\n                this.appendToSlider();\n            }\n        }, 1000);\n    }\n\n    appendToSlider() {\n        this.sliderElement = this.sliderElement.clone();\n        this.sliderElement.appendTo(`.${this.class}`);\n        this.sliderElementCount += 1;\n    }\n\n    prependToSlider() {\n        this.sliderElement = this.sliderElement.clone();\n        this.sliderElement.prependTo(`.${this.class}`);\n        this.sliderElementCount += 1;\n    }\n\n    destroyRunning() {\n        if (this.sliderInterval) {\n            clearInterval(this.sliderInterval);\n        }\n    }\n\n    destroyTrackingViewport() {\n        if (this.viewportInterval) {\n            clearInterval(this.viewportInterval);\n        }\n    }\n\n    resetSlider() {\n        this.destroyRunning();\n        this.destroyTrackingViewport();\n\n        // Reset DOM\n        $(`.${this.class}`).css('transform', 'none');\n        $(`.${this.class}`).css('-webkit-transform', 'none');\n        $(`.${this.class}`).find('.coral-item').remove();\n        this.sliderElement = this.sliderElement.clone();\n        this.sliderElement.appendTo(`.${this.class}`);\n\n        // Reset variables\n        this.leftOffset = 0;\n        this.sliderElementCount = 1;\n    }\n\n    reRunningSlider() {\n        this.trackingViewport();\n        this.runningSlider();\n    }\n\n    isMobile() {\n        const windowWidth = $(window).width();\n        return windowWidth > 767 ? false : true;\n    }\n}\n\n\n//# sourceURL=webpack://Coral/./js/coral.js?");

/***/ })

/******/ })["default"];
});