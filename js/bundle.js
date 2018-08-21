/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/chunked-call/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/chunked-call/lib/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar handlersMap = {};\r\nvar generateId = (function () {\r\n    var id = 0;\r\n    return function () { return id++; };\r\n})();\r\nfunction setChunkedCall(task, callback, limitMs) {\r\n    if (limitMs === void 0) { limitMs = 16; }\r\n    var ctx = {\r\n        alive: true,\r\n        callback: callback,\r\n        handler: -1,\r\n        id: generateId(),\r\n        task: task,\r\n    };\r\n    handlersMap[ctx.id] = ctx;\r\n    var schedule = function () {\r\n        ctx.handler = setTimeout(function () {\r\n            var start = Date.now();\r\n            var proceed = true;\r\n            do {\r\n                proceed = task();\r\n                if (!ctx.alive) {\r\n                    return;\r\n                }\r\n            } while (Date.now() - start <= limitMs && proceed);\r\n            if (!proceed) {\r\n                clearTimeout(ctx.handler);\r\n                delete handlersMap[ctx.id];\r\n                if (callback) {\r\n                    callback();\r\n                }\r\n            }\r\n            else {\r\n                schedule();\r\n            }\r\n        });\r\n    };\r\n    schedule();\r\n    return ctx.id;\r\n}\r\nexports.setChunkedCall = setChunkedCall;\r\nfunction setChunkedCallPromise(task, limitMs) {\r\n    if (limitMs === void 0) { limitMs = 16; }\r\n    return new Promise(function (resolve, reject) {\r\n        setChunkedCall(task, function () { return resolve(); }, limitMs);\r\n    });\r\n}\r\nexports.setChunkedCallPromise = setChunkedCallPromise;\r\nfunction killChunkedCall(id) {\r\n    if (id in handlersMap) {\r\n        handlersMap[id].alive = false;\r\n        clearTimeout(handlersMap[id].handler);\r\n        delete handlersMap[id];\r\n        return true;\r\n    }\r\n    return false;\r\n}\r\nexports.killChunkedCall = killChunkedCall;\r\n\n\n//# sourceURL=webpack:///./node_modules/chunked-call/lib/index.js?");

/***/ }),

/***/ "./src/Animator.ts":
/*!*************************!*\
  !*** ./src/Animator.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar _currentHandler = 0;\r\nvar _loop = null;\r\nfunction tick() {\r\n    _loop();\r\n    _currentHandler = window.requestAnimationFrame(tick);\r\n}\r\nfunction animate_start(loop) {\r\n    if (!_currentHandler) {\r\n        _loop = loop;\r\n    }\r\n    tick();\r\n}\r\nexports.animate_start = animate_start;\r\nfunction animate_stop() {\r\n    if (_currentHandler) {\r\n        window.cancelAnimationFrame(_currentHandler);\r\n        _currentHandler = 0;\r\n        _loop = null;\r\n    }\r\n}\r\nexports.animate_stop = animate_stop;\r\n\n\n//# sourceURL=webpack:///./src/Animator.ts?");

/***/ }),

/***/ "./src/Binder.ts":
/*!***********************!*\
  !*** ./src/Binder.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Binder = /** @class */ (function () {\r\n    function Binder() {\r\n        this._buttons = [];\r\n    }\r\n    Binder.prototype.lock = function () {\r\n        this._buttons.forEach(function (b) {\r\n            b.style.opacity = \"0.4\";\r\n            b.disabled = true;\r\n        });\r\n    };\r\n    Binder.prototype.unlock = function () {\r\n        this._buttons.forEach(function (b) {\r\n            b.style.opacity = \"1.0\";\r\n            b.disabled = false;\r\n        });\r\n    };\r\n    Binder.prototype.bind = function (selector, task) {\r\n        var _this = this;\r\n        var button = document.querySelector(selector + \" button\");\r\n        var code = document.querySelector(selector + \" code\");\r\n        var label = document.querySelector(selector + \" p\");\r\n        if (code && button && label) {\r\n            this._buttons.push(button);\r\n            code.innerHTML = function_source(task);\r\n            button.onclick = function (e) {\r\n                _this.lock();\r\n                label.innerHTML = \"Execution started\";\r\n                // let redraw ui\r\n                setTimeout(function () {\r\n                    var start = Date.now();\r\n                    var updateLabelHandler = setInterval(function () {\r\n                        label.innerHTML = \"Execution time: \" + (Date.now() - start) + \"ms\";\r\n                    }, 10);\r\n                    task(function () {\r\n                        clearInterval(updateLabelHandler);\r\n                        label.innerHTML = \"Finished in: \" + (Date.now() - start) + \"ms\";\r\n                        _this.unlock();\r\n                    });\r\n                }, 0);\r\n            };\r\n        }\r\n    };\r\n    return Binder;\r\n}());\r\nexports.Binder = Binder;\r\nfunction function_source(code) {\r\n    if (typeof code == \"function\") {\r\n        code = code.toString();\r\n    }\r\n    var lines = code.split(\"\\n\");\r\n    lines = lines.slice(1, -1);\r\n    var r = /^(\\s+)\\w+/gm;\r\n    var ret = r.exec(lines[0]);\r\n    if (ret) {\r\n        var trim_1 = ret[1].length;\r\n        lines = lines.map(function (x) {\r\n            return x.substr(trim_1).split(\"  \").join(\" \");\r\n        });\r\n    }\r\n    return lines.join(\"\\n\");\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Binder.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Binder_1 = __webpack_require__(/*! ./Binder */ \"./src/Binder.ts\");\r\nvar Animator_1 = __webpack_require__(/*! ./Animator */ \"./src/Animator.ts\");\r\nvar setChunkedCall = __webpack_require__(/*! chunked-call */ \"./node_modules/chunked-call/lib/index.js\").setChunkedCall;\r\n// Examples\r\nfunction executeSync(done) {\r\n    var size = 30 * 1000000;\r\n    var result = [];\r\n    result.length = size;\r\n    for (var i = 0; i < size; i++) {\r\n        result[i] = i * i;\r\n    }\r\n    done(result);\r\n}\r\nfunction executeChunked(done) {\r\n    var size = 30 * 1000000;\r\n    var result = [];\r\n    result.length = size;\r\n    setChunkedCall((function () {\r\n        var i = 0;\r\n        return function () {\r\n            result[i] = i * i;\r\n            return ++i < size;\r\n        };\r\n    })(), function () { return done(result); });\r\n}\r\nfunction executeChunkedBuckets(done) {\r\n    var size = 30 * 1000000;\r\n    var result = [];\r\n    result.length = size;\r\n    setChunkedCall((function () {\r\n        var i = 0;\r\n        return function () {\r\n            var limit = Math.min(i + 60, size);\r\n            for (; i < limit; i++) {\r\n                result[i] = i * i;\r\n            }\r\n            return i < size;\r\n        };\r\n    })(), function () { return done(result); });\r\n}\r\nvar binder = new Binder_1.Binder();\r\nbinder.bind(\"#demo-sync\", executeSync);\r\nbinder.bind(\"#demo-async\", executeChunked);\r\nbinder.bind(\"#demo-async-buckets\", executeChunkedBuckets);\r\nvar anim_object = document.querySelector(\"#demo-animation > div\");\r\nif (anim_object) {\r\n    Animator_1.animate_start(function () {\r\n        anim_object.style.transform += \"rotate(1deg)\";\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });