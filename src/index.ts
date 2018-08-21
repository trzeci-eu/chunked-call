type IChunkedCallCallback = () => void;
type IChunkedCallTask = () => boolean;

interface IContextHandler {
	alive: boolean;
	callback: IChunkedCallCallback | undefined;
	handler: number;
	id: number;
	task: IChunkedCallTask;
}

const handlersMap: { [id: number]: IContextHandler } = {};

const generateId: () => number = (() => {
	let id = 0;
	return () => id++;
})();

export function setChunkedCall(task: IChunkedCallTask, callback?: IChunkedCallCallback, limitMs = 16): number {
	const ctx: IContextHandler = {
		alive: true,
		callback,
		handler: -1,
		id: generateId(),
		task,
	};
	handlersMap[ctx.id] = ctx;

	const schedule = () => {
		ctx.handler = setTimeout(() => {
			const start = Date.now();
			let proceed = true;

			do {
				proceed = task();
				if (!ctx.alive) {
					return;
				}
			} while (Date.now() - start <= limitMs && proceed);

			if (!proceed) {
				clearTimeout(ctx.handler);
				delete handlersMap[ctx.id];
				if (callback) {
					callback();
				}
			} else {
				schedule();
			}
		});
	};
	schedule();
	return ctx.id;
}

export function setChunkedCallPromise(task: IChunkedCallTask, limitMs = 16): Promise<void> {
	return new Promise((resolve, reject) => {
		setChunkedCall(task, () => resolve(), limitMs);
	});
}

export function killChunkedCall(id: number): boolean {
	if (id in handlersMap) {
		handlersMap[id].alive = false;
		clearTimeout(handlersMap[id].handler);
		delete handlersMap[id];
		return true;
	}
	return false;
}
