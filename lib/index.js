"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlersMap = {};
var generateId = (function () {
    var id = 0;
    return function () { return id++; };
})();
function setChunkedCall(task, callback, limitMs) {
    if (limitMs === void 0) { limitMs = 16; }
    var ctx = {
        alive: true,
        callback: callback,
        handler: -1,
        id: generateId(),
        task: task,
    };
    handlersMap[ctx.id] = ctx;
    var schedule = function () {
        ctx.handler = setImmediate(function () {
            var start = Date.now();
            var proceed = true;
            do {
                proceed = task();
                if (!ctx.alive) {
                    return;
                }
            } while (Date.now() - start <= limitMs && proceed);
            if (!proceed) {
                clearImmediate(ctx.handler);
                delete handlersMap[ctx.id];
                if (callback) {
                    callback();
                }
            }
            else {
                schedule();
            }
        });
    };
    schedule();
    return ctx.id;
}
exports.setChunkedCall = setChunkedCall;
function setChunkedCallPromise(task, limitMs) {
    if (limitMs === void 0) { limitMs = 16; }
    return new Promise(function (resolve, reject) {
        setChunkedCall(task, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        }, limitMs);
    });
}
exports.setChunkedCallPromise = setChunkedCallPromise;
function killChunkedCall(id) {
    if (id in handlersMap) {
        handlersMap[id].alive = false;
        clearImmediate(handlersMap[id].handler);
        delete handlersMap[id];
        return true;
    }
    return false;
}
exports.killChunkedCall = killChunkedCall;
