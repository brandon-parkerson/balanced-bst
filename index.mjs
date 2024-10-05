class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function tree(rootNode) {
  return {
    root: rootNode,
  };
}

function buildTree(array) {
  // Sort array low to high and remove duplicates
  let sortedArray = [...new Set(array.sort((a, b) => a - b))];

  let start = 0;
  let end = sortedArray.length - 1;

  // After array sorts, build a balanced bst
  let rootNode = toBst(sortedArray, start, end);

  // Function to build tree and return root node
  function toBst(array, start, end) {
    // Base case
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);
    // Recursively construct left subtree and make it the left child of the root
    node.left = toBst(array, start, mid - 1);
    // Recursively construct right subtree
    node.right = toBst(array, mid + 1, end);
    return node;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  prettyPrint(rootNode);
  return tree(rootNode);
}
// Function to insert new node to tree
function insert(rootNode, node) {
  const temp = new Node(node);
  // If the tree is empty
  if (rootNode === null) {
    return temp;
  }
  // Find parent node to have new node as its child
  let parent = null;
  let curr = rootNode;
  while (curr !== null) {
    parent = curr;
    if (curr.data > node) {
      curr = curr.left;
    } else if (curr.data < node) {
      curr = curr.right;
    } else {
      return rootNode;
    }
  }
  // if give node is smaller, make it left child, else make it right child
  if (parent.data > node) {
    parent.left = temp;
  } else {
    parent.right = temp;
  }
  return rootNode;
}
// Function to delete node from tree
function deleteItem(root, key) {
  // Base case
  if (root === null) {
    return root;
  }
  // If key is smaller than root's data, go to left subtree
  if (key < root.data) {
    root.left = deleteItem(root.left, key);
  }
  // If key is larger than root's data, go to right subtree
  else if (key > root.data) {
    root.right = deleteItem(root.right, key);
  }
  // Node to be deleted is found
  else {
    // Case 1: Node with only one child or no child
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    // Case 2: Node with two children
    // Get the inorder successor (smallest in the right subtree)
    let succ = root.right;
    while (succ.left !== null) {
      succ = succ.left;
    }

    // Copy the successor's data to this node
    root.data = succ.data;

    // Delete the successor
    root.right = deleteItem(root.right, succ.data);
  }
  return root;
}

const arr = [1, 5, 7, 3, 12, 70, 65, 2, 4, 40, 55];
buildTree(arr);
