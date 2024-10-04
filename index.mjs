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

const arr = [1, 5, 7, 3, 12, 70];
buildTree(arr);
