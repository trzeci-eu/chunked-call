import { Binder } from "./Binder"
import { animate_start, animate_stop } from "./Animator"

let setChunkedCall = require("chunked-call").setChunkedCall;

// Examples
function executeSync(done) {
    var size = 30 * 1000000;
    var result:number[] = [];
    result.length = size;
    for (var i = 0; i < size; i++) {
        result[i] = i * i;
    }
    done(result);
}

function executeChunked(done) {
    var size = 30 * 1000000;
    var result:number[] = [];
    result.length = size;
    setChunkedCall((() => {
            var i = 0;
            return () => {
                result[i] = i * i;
                return ++i < size;
            }
        })(),
        () => done(result)
    );
}

function executeChunkedBuckets(done) {
    var size = 30 * 1000000;
    var result:number[] = [];
    result.length = size;
    setChunkedCall((() => {
            var i = 0;
            return () => {
                var limit = Math.min(i + 100, size);
                for (; i < limit; i++) {
                    result[i] = i * i;
                }
                return i < size;
            }
        })(),
        () => done(result)
    );
}


const binder = new Binder();
binder.bind("#demo-sync", executeSync);
binder.bind("#demo-async", executeChunked);
binder.bind("#demo-async-buckets", executeChunkedBuckets);

const anim_object = document.querySelector("#demo-animation > div") as HTMLDivElement;
if (anim_object) {
    animate_start(() => {
        anim_object.style.transform += "rotate(1deg)";
    });
}
