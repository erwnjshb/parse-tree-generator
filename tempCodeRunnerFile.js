function extractNames(treeData, parentName = "") {
  let result = "";

  treeData.forEach((node) => {
    const name = parentName ? `${parentName} -> ${node.name}` : node.name;

    if (node.children) {
      const childNames = extractNames(node.children, name);
      result += childNames ? `${childNames}` : `${name}`;
    } else {
      result += `${name}`;
    }

    result += "\n";
  });

  return result.trim();
}

const output = extractNames(treeData);
console.log(output);