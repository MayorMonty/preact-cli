import { relative } from 'path';
import { create } from './lib/cli';
import { expand } from './lib/utils';
import snapshots from './images/create';

// TODO: Move all `examples/` to `preactjs-templates`
const ours = ['default'];

describe('preact create', () => {
	ours.forEach(key => {
		it(`scaffolds the '${key}' official template`, async () => {
			let dir = await create(key);

			let output = await expand(dir).then(arr => {
				return arr.map(x => relative(dir, x));
			});

			expect(output).toEqual(snapshots[key]);
		});
	});

	it('should fail given an invalid name', async () => {
		const INVALID_NAME = '*()@!#!$-invalid-name';

		try {
			await create('default', INVALID_NAME);
		} catch (e) {
			expect(e);
		}
	});
});
