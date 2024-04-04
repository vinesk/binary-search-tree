const { generateRandomArray } = require('../../src/tree/utils');

describe('Utility Functions', () => {
  test('generateRandomArray generates an array of correct length', () => {
    const length = 10;
    const array = generateRandomArray(length, 100);
    expect(array.length).toBe(length);
  });
});
