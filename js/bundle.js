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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nlet _currentHandler = 0;\r\nlet _loop = null;\r\nfunction tick() {\r\n    _loop();\r\n    _currentHandler = window.requestAnimationFrame(tick);\r\n}\r\nfunction animate_start(loop) {\r\n    if (!_currentHandler) {\r\n        _loop = loop;\r\n    }\r\n    tick();\r\n}\r\nexports.animate_start = animate_start;\r\nfunction animate_stop() {\r\n    if (_currentHandler) {\r\n        window.cancelAnimationFrame(_currentHandler);\r\n        _currentHandler = 0;\r\n        _loop = null;\r\n    }\r\n}\r\nexports.animate_stop = animate_stop;\r\n\n\n//# sourceURL=webpack:///./src/Animator.ts?");

/***/ }),

/***/ "./src/Binder.ts":
/*!***********************!*\
  !*** ./src/Binder.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Binder {\r\n    constructor() {\r\n        this._buttons = [];\r\n    }\r\n    lock() {\r\n        this._buttons.forEach((b) => {\r\n            b.style.opacity = \"0.4\";\r\n            // b.disabled = true;\r\n        });\r\n    }\r\n    unlock() {\r\n        this._buttons.forEach((b) => {\r\n            b.style.opacity = \"1.0\";\r\n            // b.disabled = false;\r\n        });\r\n    }\r\n    bind(selector, task) {\r\n        const button = document.querySelector(selector + \" button\");\r\n        const code = document.querySelector(selector + \" code\");\r\n        const label = document.querySelector(selector + \" p\");\r\n        if (code && button && label) {\r\n            this._buttons.push(button);\r\n            code.innerHTML = function_source(task);\r\n            button.onclick = (e) => {\r\n                this.lock();\r\n                label.innerHTML = \"Execution started\";\r\n                // let redraw ui\r\n                setTimeout(() => {\r\n                    const start = Date.now();\r\n                    const updateLabelHandler = setInterval(() => {\r\n                        label.innerHTML = \"Execution time: \" + (((Date.now() - start) / 10) | 0) / 100 + \"s\";\r\n                    }, 10);\r\n                    task((result) => {\r\n                        clearInterval(updateLabelHandler);\r\n                        label.innerHTML = \"Finished in: \" + (((Date.now() - start) / 10) | 0) / 100 + \"s\";\r\n                        this.unlock();\r\n                    });\r\n                }, 0);\r\n            };\r\n        }\r\n    }\r\n}\r\nexports.Binder = Binder;\r\nfunction function_source(code) {\r\n    if (typeof code == \"function\") {\r\n        code = code.toString();\r\n    }\r\n    let lines = code.split(\"\\n\");\r\n    lines = lines.slice(1, -1);\r\n    let r = /^(\\s+)\\S+/gm;\r\n    let ret = r.exec(lines[0]);\r\n    if (ret) {\r\n        let trim = ret[1].length;\r\n        lines = lines.map(x => {\r\n            return x.substr(trim).split(\"  \").join(\" \");\r\n        });\r\n    }\r\n    return lines.join(\"\\n\");\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Binder.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Binder_1 = __webpack_require__(/*! ./Binder */ \"./src/Binder.ts\");\r\nconst Animator_1 = __webpack_require__(/*! ./Animator */ \"./src/Animator.ts\");\r\nlet setChunkedCall = __webpack_require__(/*! chunked-call */ \"./node_modules/chunked-call/lib/index.js\").setChunkedCall;\r\nconst SAMPLES = 5 * 1000000;\r\nfunction someOperation(input) {\r\n    let i = 150;\r\n    let factorialOver9000 = 1;\r\n    while (i-- > 1) {\r\n        factorialOver9000 *= i;\r\n    }\r\n    return factorialOver9000 + input;\r\n}\r\nfunction clamp(value, min, max) {\r\n    return value < min ? min : value > max ? max : value;\r\n}\r\n// Examples\r\nfunction executeSync(done) {\r\n    var result = 0;\r\n    for (var i = 1; i < SAMPLES; i++) {\r\n        result += someOperation(i);\r\n    }\r\n    done(result);\r\n}\r\nfunction executeChunked(done) {\r\n    var result = 1;\r\n    setChunkedCall((() => {\r\n        var i = 1;\r\n        return () => {\r\n            result += someOperation(i);\r\n            return ++i < SAMPLES;\r\n        };\r\n    })(), () => done(result));\r\n}\r\nfunction executeChunkedBuckets(done) {\r\n    const groupSize = 1500;\r\n    let result = 1;\r\n    setChunkedCall((() => {\r\n        let i = 0;\r\n        let lastTime = Date.now();\r\n        return () => {\r\n            let currentTime = Date.now();\r\n            lastTime = currentTime;\r\n            var ceil = Math.min(i + groupSize, SAMPLES);\r\n            for (; i < ceil; i++) {\r\n                result += someOperation(i);\r\n            }\r\n            return i < SAMPLES;\r\n        };\r\n    })(), () => done(result));\r\n}\r\nfunction executeChunkedAdaptive(done) {\r\n    const timeBudgetMs = 30;\r\n    let groupSize = 1500;\r\n    let result = 1;\r\n    setChunkedCall((() => {\r\n        let i = 0;\r\n        let lastTime = Date.now();\r\n        return () => {\r\n            let currentTime = Date.now();\r\n            groupSize *= timeBudgetMs / clamp(currentTime - lastTime, 5, 60);\r\n            groupSize = Math.max(200, groupSize);\r\n            lastTime = currentTime;\r\n            var ceil = Math.min(i + groupSize, SAMPLES);\r\n            for (; i < ceil; i++) {\r\n                result += someOperation(i);\r\n            }\r\n            return i < SAMPLES;\r\n        };\r\n    })(), () => done(result), 0);\r\n}\r\nconst binder = new Binder_1.Binder();\r\nbinder.bind(\"#demo-sync\", executeSync);\r\nbinder.bind(\"#demo-async\", executeChunked);\r\nbinder.bind(\"#demo-async-buckets\", executeChunkedBuckets);\r\nbinder.bind(\"#demo-async-adaptive\", executeChunkedAdaptive);\r\nconst anim_object = document.querySelector(\"#demo-animation > div\");\r\nif (anim_object) {\r\n    Animator_1.animate_start((() => {\r\n        let deg = 0;\r\n        return () => {\r\n            deg = (deg + 2) % 360;\r\n            anim_object.style.transform = `rotate(${deg}deg)`;\r\n        };\r\n    })());\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });