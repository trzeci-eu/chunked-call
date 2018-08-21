# chunked-call
[![NPM version](https://img.shields.io/npm/v/chunked-call.svg)](https://www.npmjs.com/package/chunked-call) [![Build Status](https://travis-ci.org/trzecieu/chunked-call.svg?branch=master)](https://travis-ci.org/trzecieu/chunked-call)

This package helps you split blocking - time consuming operations to chunks that are executed in an asynchronous manner.
The package was inspired long time ago, by a [StackOverflow Question](https://stackoverflow.com/questions/44669648/asynchronous-callback-javascript-with-complex-calculation) and main usage should be for systems where multi-threading operations are not available. 

## Demo
Please visit [demo](https://trzecieu.github.io/chunked-call/) page to see examples.

## Usage
### Installation
Package is available on npm repository: `npm i chunked-call -D`

### API
```ts
// Callback to execution code
declare type IChunkedCallTask = () => boolean;
// Callback on finishing execution
declare type IChunkedCallCallback = () => void;

// Starts Chunked Call
// @task: callback to function that executes until it returns false. 
// @callback: called when execution is finished.
// @limitMs: once execution time exceeded given time, it waits to a next frame
// return: Handler to Chunked Call executor, can be used to terminate execution
function setChunkedCall(task: IChunkedCallTask, callback?: IChunkedCallCallback, limitMs?: number): number;

// Promisified version of setChunkedCall
function setChunkedCallPromise(task: IChunkedCallTask, limitMs?: number): Promise<void>;

// Terminates execution of ongoing chunked call
// @id: Identifier of chunked call gotten from setChunkedCall
// return: True if an execution has been killed successfully, false otherwise.
function killChunkedCall(id: number): boolean;
```

### How to implement chunked-call?
#### Import required functions
```js
let setChunkedCall = require("chunked-call").setChunkedCall;
let killChunkedCall = require("chunked-call").killChunkedCall;
```

#### Case: Loop `for`
```js
// original code:
for (let i = 0; i < array.length; i++) {
    doSomeOperation(array[i]);
}
nextStep();

// becomes:
setChunkedCall(
    (() => {
        let i = 0;
        return () => {
            i++;
            doSomeOperation(array[i]);
            return i < array.length;
        }
    })(), 
    () => nextStep()
);
```

#### Case: Loop `while`
```js
// original code:
while (array.length) {
    doSomeOperation(array.pop());
}
nextStep();

// becomes:
setChunkedCall(
    () => {
        if (array.length) {
            doSomeOperation(array.pop());
        }
        return array.length;
    }, 
    () => nextStep()
);
```

#### Case: Loop `do-while`
```js
// original code:
do {
    doSomeOperation(array.pop());
}
while (array.length);
nextStep();


// becomes:
setChunkedCall(
    () => {
        doSomeOperation(array.pop());
        return array.length > 0;
    }, 
    () => nextStep()
);
```

## Changelog
- `1.0.0` - Version uses `setTimeout` and `claerTimeout` to schedule next execution
- `0.0.6` - Added Travis CI
- `0.0.5` - Updated documentation
- `0.0.4` - Improve test coverage
- `0.0.3` - Updated documentation
- `0.0.2` - First release

## License
[MIT](LICENSE)

