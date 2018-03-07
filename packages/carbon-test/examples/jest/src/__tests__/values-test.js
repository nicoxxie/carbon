/**
 * @jest-environment node
 */

import getValuesFor from '../values';

test('getValuesFor', () => {
  expect(getValuesFor({ a: 1 })).toEqual([1]);
});
