import { Binder } from "./Binder"
import { animate_start, animate_stop } from "./Animator"

let setChunkedCall = require("chunked-call").setChunkedCall;
const SAMPLES = 5 * 1000000;

function someOperation(input:number) {
    let i = 150;
    let factorialOver9000 = 1;
    while (i-- > 1) {
        factorialOver9000 *= i;
    }
    return factorialOver9000 + input;
}

function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}

// Examples
function executeSync(done) {
    var result = 0;
    for (var i = 1; i < SAMPLES; i++) {
        result += someOperation(i);
    }
    done(result);
}

function executeChunked(done) {
    var result = 1;
    setChunkedCall((() => {
            var i = 1;
            return () => {
                result += someOperation(i);
                return ++i < SAMPLES;
            }
        })(),
        () => done(result)
    );
}

function executeChunkedBuckets(done) {
    const groupSize = 1500;
    let result = 1;
    setChunkedCall((() => {
            let i = 0;
            let lastTime = Date.now();
            return () => {
                let currentTime = Date.now();
                lastTime = currentTime;

                var ceil = Math.min(i + groupSize, SAMPLES);
                for (; i < ceil; i++) {
                    result += someOperation(i);
                }
                return i < SAMPLES;
            }
        })(),
        () => done(result)
    );
}

function executeChunkedAdaptive(done) {
    const budgetMs = 30;
    let groupSize = 1500;
    let result = 1;
    setChunkedCall((() => {
            let i = 0;
            let lastTime = Date.now();
            return () => {
                let currentTime = Date.now();
                groupSize *= budgetMs /  clamp(currentTime - lastTime, 5, 60);
                groupSize = Math.max(200, groupSize); 
                lastTime = currentTime;

                var ceil = Math.min(i + groupSize, SAMPLES);
                for (; i < ceil; i++) {
                    result += someOperation(i);
                }
                return i < SAMPLES;
            }
        })(),
        () => done(result),
        0 
    );
}


const binder = new Binder();
binder.bind("#demo-sync", executeSync);
binder.bind("#demo-async", executeChunked);
binder.bind("#demo-async-buckets", executeChunkedBuckets);
binder.bind("#demo-async-adaptive", executeChunkedAdaptive);

const anim_object = document.querySelector("#demo-animation > div") as HTMLDivElement;
if (anim_object) {
    animate_start((() => {
        let deg = 0;
        return ()=> {
            deg = (deg + 2) % 360;
            anim_object.style.transform = `rotate(${deg}deg)`;
        }
    })());
}
