class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    if (sortedUniqueArray.length === 0) {
      return null;
    }
    const middleIndex = Math.floor(sortedUniqueArray.length / 2);
    const rootNode = new Node(sortedUniqueArray[middleIndex]);
    rootNode.left = this.buildTree(sortedUniqueArray.slice(0, middleIndex));
    rootNode.right = this.buildTree(sortedUniqueArray.slice(middleIndex + 1));
    return rootNode;
  }

  insertIntoNode(node, value) {
    if (node === null) {
      return new Node(value);
    }
    if (value < node.data) {
      node.left = this.insertIntoNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertIntoNode(node.right, value);
    }
    return node;
  }

  insert(value) {
    this.root = this.insertIntoNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        node.data = this.findMinValue(node.right);
        node.right = this.deleteNode(node.right, node.data);
      }
    }
    return node;
  }

  findMinValue(node) {
    let minValue = node.data;
    while (node.left !== null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  findNode(node, value) {
    if (node === null) {
      return null;
    }
    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  levelOrder(callback = null) {
    const queue = [this.root];
    const values = [];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node) {
        if (callback) {
          callback(node);
        } else {
          values.push(node.data);
        }

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    return callback ? null : values;
  }

  inOrder(callback = null) {
    const values = [];

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
      traverse(node.right);
    };

    traverse(this.root);
    return callback ? null : values;
  }

  preOrder(callback = null) {
    const values = [];

    const traverse = (node) => {
      if (node === null) return;
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return callback ? null : values;
  }

  postOrder(callback = null) {
    const values = [];

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      if (callback) {
        callback(node);
      } else {
        values.push(node.data);
      }
    };

    traverse(this.root);
    return callback ? null : values;
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, edges = 0) {
    if (current === null || node === null) {
      return null;
    }

    if (current === node) {
      return edges;
    }

    const left = this.depth(node, current.left, edges + 1);
    if (left !== null) {
      return left;
    }

    return this.depth(node, current.right, edges + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}

module.exports = { Node, Tree };
