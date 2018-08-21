export class Binder {
    private _buttons:HTMLButtonElement[] = [];

    lock() {
        this._buttons.forEach((b) => {
            b.style.opacity = "0.4";
            b.disabled = true;
        });
    }
    unlock() {
        this._buttons.forEach((b) => {
            b.style.opacity = "1.0";
            b.disabled = false;
        });
    }
    bind(selector:string, task:Function) {
        const button:HTMLButtonElement = document.querySelector(selector + " button");
        const code:HTMLElement = document.querySelector(selector + " code");
        const label:HTMLElement = document.querySelector(selector + " p");

        if (code && button && label) {
            this._buttons.push(button);
            code.innerHTML = function_source(task);
            button.onclick = (e) => {
                this.lock();
                label.innerHTML = "Execution started";
                // let redraw ui
                setTimeout( () => {
                    const start = Date.now();
                    
                    const updateLabelHandler = setInterval(() => {
                        label.innerHTML = "Execution time: " + (Date.now() - start) + "ms";
                    }, 10);
                    

                    task(() => {
                        clearInterval(updateLabelHandler);
                        label.innerHTML = "Finished in: " + (Date.now() - start) + "ms";
                        this.unlock();
                    });
                }, 0);
            }
        }
    } 
}

function function_source(code) {
    if (typeof code == "function") {
        code = code.toString();
    }
    let lines = code.split("\n");
    lines = lines.slice(1, -1);

    let r = /^(\s+)\w+/gm
    let ret = r.exec(lines[0]);
    if (ret) {
        let trim = ret[1].length;
        lines = lines.map(x => {
            return x.substr(trim).split("  ").join(" ");
        });
    }

    return lines.join("\n");
}