
let _currentHandler = 0;
let _loop:Function = null;
function tick() {
    _loop();
    _currentHandler = window.requestAnimationFrame(tick);
}

export function animate_start(loop:Function) {
    if (!_currentHandler) {
        _loop = loop;
    }
    tick();
}
export function animate_stop() {
    if (_currentHandler) {
        window.cancelAnimationFrame(_currentHandler);
        _currentHandler = 0;
        _loop = null;
    }
}