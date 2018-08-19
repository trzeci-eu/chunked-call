import { killChunkedCall, setChunkedCall } from '../src/index';
import { setChunkedCallPromise } from '../src/index';

describe('Main Suit Case', () => {
	test('Test simple task', done => {
		setChunkedCall(() => false, () => done());
	});

	test('Test simple task as Promise', done => {
		setChunkedCallPromise(() => false).then(() => {
			done();
		});
	});

	test('Task is called until it returns false', done => {
		let times = 10;
		setChunkedCallPromise(() => --times > 0).then(() => {
			expect(times).toBe(0);
			done();
		});
	});

	test('Killing in task stops propagation', done => {
		const handler = setChunkedCall(
			() => {
				const killed = killChunkedCall(handler);
				expect(killed).toBeTruthy();
				return false;
			},
			() => done('Callback is should never call after killed'),
		);
		setTimeout(() => {
			done();
		}, 100);
	});

	test('Killing on callback returns false', done => {
		let times = 10;
		const handler = setChunkedCall(
			() => times-- > 0,
			() => {
				if (killChunkedCall(handler)) {
					done('kill should return false');
				} else {
					done();
				}
			},
		);
	});

	test('Two chunked calls have different handler', () => {
		const h1 = setChunkedCall(() => false);
		const h2 = setChunkedCall(() => false);
		expect(h1).not.toEqual(h2);
	});

	test('Setting limit to 0 ms should still execute at lease once a frame', done => {
		setChunkedCallPromise(() => {
			return false;
		}, 0).then(done);
	});

	test('Operation takes longer than budget', done => {
		const start = Date.now();
		const budget = 12;
		setChunkedCall(
			() => {
				return Date.now() - start < budget * 2;
			},
			() => {
				if (Date.now() - start > budget) {
					done();
				} else {
					done('Expected to finish after budget');
				}
			},
			budget,
		);
	});
});
