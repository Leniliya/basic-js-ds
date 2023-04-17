const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(data) {
    if (!this.head) {
      this.head = new Node(data)
    } else {
      let current = this.head;
      addInPlace(current, data)
      function addInPlace(current, data) {
        if (data === current.data) {
          return current;
        } else if (data > current.data) {
          if (!current.right) {
            return current.right = new Node(data);
          } else {
            return addInPlace(current.right, data);
          }
        } else {
          if (!current.left) {
            return current.left = new Node(data);
          } else {
            return addInPlace(current.left, data);
          }
        }
      }
    }
  }

  find(data) {
    function search(node, data) {
      if (!node) {
        return null;
      }
      if (data === node.data) {
        return node;
      }
      if (data > node.data) {
        return search(node.right, data);
      } else {
        return search(node.left, data);
      }
    }
    return search(this.head, data);
  }

  has(data) {
    function search2(node, data) {
      if (!node) {
        return false;
      }
      if (data === node.data) {
        return true;
      }
      if (data > node.data) {
        return search2(node.right, data);
      } else {
        return search2(node.left, data);
      }
    }
    return search2(this.head, data);
  }

  remove(data) {
    function del(node, data) {
      if (!node) {
        return null;
      }
      if (data > node.data) {
        node.right = del(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = del(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }
        let min = node.right;
        while (min.left) {
          min = min.left;
        }
        node.data = min.data;
        node.right = del(node.right, min.data);
        return node;
      }
    }
    this.head = del(this.head, data);
  }

  min() {
    let current = this.head;
    while (current.left) {
      current = current.left
    }
    return current.data;
  }

  max() {
    let current = this.head;
    while (current.right) {
      current = current.right
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
