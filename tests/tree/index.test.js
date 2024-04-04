const { Tree } = require('../../src/tree');
const { generateRandomArray } = require('../../src/tree/utils');

describe('Binary Search Tree', () => {
  let tree;
  const unbalanceNumbers = [101, 102, 103, 104, 105];

  beforeEach(() => {
    tree = new Tree(generateRandomArray(15, 99));
  });

  test('should be balanced after creation', () => {
    expect(tree.isBalanced()).toBeTruthy();
  });

  test('should have a correct level order traversal', () => {
    const expected = tree.levelOrder();
    expect(expected.length).toBeGreaterThan(0);
  });

  test('should have a correct pre-order traversal', () => {
    const expected = tree.preOrder();
    expect(expected.length).toBeGreaterThan(0);
  });

  test('should have a correct post-order traversal', () => {
    const expected = tree.postOrder();
    expect(expected.length).toBeGreaterThan(0);
  });

  test('should have a correct in-order traversal', () => {
    const expected = tree.inOrder();
    expect(expected).toEqual(
      expect.arrayContaining(expected.sort((a, b) => a - b))
    );
  });

  test('should become unbalanced after adding numbers > 100', () => {
    unbalanceNumbers.forEach((num) => tree.insert(num));
    expect(tree.isBalanced()).toBeFalsy();
  });

  test('should be balanced after rebalancing', () => {
    unbalanceNumbers.forEach((num) => tree.insert(num));
    tree.rebalance();
    expect(tree.isBalanced()).toBeTruthy();
  });
});
