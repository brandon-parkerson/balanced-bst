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

function find(root, key) {
  // Base Case
  if (root === null || root.data === key) {
    return root;
  }
  if (key < root.data) {
    return find(root.left, key);
  } else {
    return find(root.right, key);
  }
}

function levelOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("Your argument is not a function");
  }
  if (root === null) {
    return;
  }
  const q = [];

  q.push(root);
  while (q.length > 0) {
    let node = q.shift();
    callback(node.data);

    // If node has a left child, push child to queue
    if (node.left !== null) {
      q.push(node.left);
    }
    // If node has a right child, push to queue
    if (node.right !== null) {
      q.push(node.right);
    }
  }
}
function preOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("Your argument is not a function");
  }
  if (root === null) {
    return;
  }
  // Processes the current node first
  callback(root.data);
  // Recursively calls the left subtree
  preOrder(root.left, callback);
  // Recursively call the right subtree
  preOrder(root.right, callback);
}
function inOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("Your argument is not a function");
  }
  if (root === null) {
    return;
  }
  // Recursively call left subtree
  inOrder(root.left, callback);
  // Pass root to callback
  callback(root.data);
  // Recursively call the right subtree
  inOrder(root.right, callback);
}

function postOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("You argument is not a function");
  }
  // Base Case
  if (root === null) {
    return;
  }
  // Recursively call left subtree
  postOrder(root.left, callback);
  // Recursively call right subtree
  postOrder(root.right, callback);
  // Pass root to callback
  callback(root.data);
}

function height(node) {
  // Base case
  if (node === null) {
    return 0;
  }
  // Height of left subtree
  let leftHeight = height(node.left);
  // Height of right subtree
  let rightHeight = height(node.right);
  // In case left or right subtree is unbalanced
  if (leftHeight == -1 || rightHeight == -1) {
    return -1;
  }
  // If height difference between left and right is more than 1 (unbalanced)
  if (Math.abs(leftHeight - rightHeight) > 1) {
    return -1;
  }
  // else, return height
  return Math.max(leftHeight, rightHeight) + 1;
}

function depth(node, root) {
  if (root === null) {
    return -1;
  }
  if (node.data === root.data) {
    return 0;
  }
  let leftDepth = depth(node, root.left);
  if (leftDepth !== -1) {
    return 1 + leftDepth;
  }
  let rightDepth = depth(node, root.right);
  if (rightDepth !== -1) {
    return 1 + rightDepth;
  }
  return -1;
}

function isBalanced(root) {
  if (root === null) {
    return true;
  }
  function checkBalance(node) {
    if (node === null) {
      return true;
    }
    let leftHeight = checkBalance(node.left);
    if (leftHeight === -1) {
      return false;
    }
    let rightHeight = checkBalance(node.right);
    if (rightHeight === -1) {
      return false;
    }
    let hieghtDiff = Math.abs(leftHeight - rightHeight);
    if (hieghtDiff > 1) {
      return false;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }
  return checkBalance(root) !== -1;
}

function rebalance(root) {
  let nodes = [];
  if (root === null) {
    return;
  }
  function traverse(root) {
    if (root === null) {
      return;
    }
    traverse(root.left);
    nodes.push(root.data);
    traverse(root.right);
  }
  return buildTree(nodes);
}

function randomNums() {
  let numbers = [];
  for (let i = 0; i < 11; i++) {
    let min = 0;
    let max = 99;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(randomNum);
  }
  return numbers;
}

// Driver Script

let randomNumbers = randomNums();
console.log("Random Numbers:", randomNumbers);

// Create a binary search tree
let bst = buildTree(randomNumbers);
console.log("Initial Tree:");
levelOrder(bst.root, (data) => console.log(data));

// Check if the tree is balanced
console.log("Is the tree balanced?", isBalanced(bst.root));

// Print the tree in various orders
console.log("Level Order:");
levelOrder(bst.root, (data) => process.stdout.write(data + " "));
console.log("\nPre Order:");
preOrder(bst.root, (data) => process.stdout.write(data + " "));
console.log("\nIn Order:");
inOrder(bst.root, (data) => process.stdout.write(data + " "));
console.log("\nPost Order:");
postOrder(bst.root, (data) => process.stdout.write(data + " "));

// Unbalance the tree by adding numbers > 100
for (let i = 101; i <= 110; i++) {
  bst.root = insert(bst.root, i); // Assuming insert function modifies the root
}
console.log("\nAfter adding numbers > 100:");
levelOrder(bst.root, (data) => console.log(data));
console.log("Is the tree balanced?", isBalanced(bst.root));

// Rebalance the tree
bst = rebalance(bst.root);
console.log("Rebalanced Tree:");
levelOrder(bst.root, (data) => console.log(data));
console.log("Is the tree balanced?", isBalanced(bst.root));

// Print the final tree in various orders
console.log("Final Level Order:");
levelOrder(bst.root, (data) => process.stdout.write(data + " "));
console.log("\nFinal Pre Order:");
preOrder(bst.root, (data) => process.stdout.write(data + " "));
console.log("\nFinal In Order:");
inOrder(bst.root, (data) => process.stdout.write(data + " "));
console.log("\nFinal Post Order:");
postOrder(bst.root, (data) => process.stdout.write(data + " "));

