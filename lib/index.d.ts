declare type IChunkedCallCallback = () => void;
declare type IChunkedCallTask = () => boolean;
export declare function setChunkedCall(task: IChunkedCallTask, callback?: IChunkedCallCallback, limitMs?: number): number;
export declare function setChunkedCallPromise(task: IChunkedCallTask, limitMs?: number): Promise<void>;
export declare function killChunkedCall(id: number): boolean;
export {};
