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
  // sort array low to high
  let sortedArray = array.sort((a, b) => a - b);
  // Check for duplicates
  let dupArray = [];
  for (num in sortedArray) {
    for (num2 in sortedArray) {
      if (num === num2) {
        continue;
      } else {
        if (sortedArray[num] === sortedArray[num2]) {
          dupArray.push(sortedArray[num]);
        }
      }
    }
  }
  let start = 0;
  let end = dupArray.length - 1;
  // After array sorts, build to be a balanced bst

  let rootNode = toBst(dupArray, start, end);

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
  return tree(rootNode);
}
