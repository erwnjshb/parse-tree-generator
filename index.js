const nearley = require("nearley");
const grammar = require("./grammar/grammar.js");

// const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

//Document Variables
const option = {
  target: "#graph",
  debug: true,
  hideMarriageNodes: true,
  marriageNodeSize: 5,
  height: 800,
  width: 1200,
  callbacks: {
    nodeRightClick: function (name, extra) {
      alert("Right-click: " + name);
    },
    textRenderer: function (name, extra, textClass) {
      if (extra && extra.nickname) name = name + " (" + extra.nickname + ")";
      return "<p align='center' class='" + textClass + "'>" + name + "</p>";
    },
    marriageClick: function (extra, id) {
      alert("Clicked marriage node" + id);
    },
    marriageRightClick: function (extra, id) {
      alert("Right-clicked marriage node" + id);
    },
  },
};
function extractNames(treeData, parentName = "") {
  let result = "";

  treeData.forEach((node) => {
    const name = parentName ? `${parentName} -> ${node.name}` : node.name;

    if (node.children) {
      const childNames = extractNames(node.children, name);
      result += childNames ? `${childNames}\n` : `${name}\n`;
    } else {
      result += `${name}\n`;
    }
  });

  return result.trim().split("\n").filter(Boolean); // Split by newline, filter out empty strings
}
const inputExpr = document.getElementById("inputExpr");
const parseBtn = document.getElementById("button-addon2");
const amb = document.getElementById("ambd");
const graphh = document.getElementById("graph");
const myGrammar = document.getElementById("grammar");

//Generate Parse Button
parseBtn.addEventListener("click", () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const dataInput = inputExpr.value;
  const inputData = dataInput.replaceAll(" ", "");
  let counter = 0;
  inputData;
  if (inputData != "") {
    try {
      graphh.innerHTML = "";
      parser.feed(inputData);
      const parsed = parser.results;
      const relationships = extractNames(parsed);
      console.log(JSON.stringify(parsed));
      if (parsed.length > 1) {
        amb.textContent = `Ambiguous Parse Tree: ${parsed.length} Possible Parses`;
        myGrammar.innerHTML = `
      PRODUCTION <br>(LEFT TO RIGHT):<br><br>
      ${relationships[counter].replaceAll(",", "<br>")}
      `;
        myGrammar.addEventListener("click", () => {
          ++counter;
          if (relationships.length - 1 >= counter) {
            myGrammar.innerHTML = `
      PRODUCTION <br>(LEFT TO RIGHT):<br><br>
      ${relationships[counter].replaceAll(",", "<br>")}
      `;
          } else if (amb.textContent == "Parse Tree is not Ambiguous") {
            myGrammar.innerHTML = `
      PRODUCTION <br>(LEFT TO RIGHT):<br><br>
      ${relationships[-1].replaceAll(",", "<br>")}
      `;
          } else {
            counter = 0;
            myGrammar.innerHTML = `
      PRODUCTION <br>(LEFT TO RIGHT):<br><br>
      ${relationships[counter].replaceAll(",", "<br>")}
      `;
          }
        });
      } else {
        amb.textContent = "Parse Tree is not Ambiguous";
        myGrammar.innerHTML = `
      PRODUCTION <br>(LEFT TO RIGHT):<br><br>
      ${relationships[0].replaceAll(",", "<br>")}
      `;
      }
      dTree.init(parsed, option);
    } catch (error) {
      amb.innerHTML = error;
      graphh.innerHTML = "";
      myGrammar.innerHTML = "";
      relationships = [];
    }
  } else {
    amb.textContent = "Parser returned no results.";
    graphh.innerHTML = "";
    myGrammar.innerHTML = "";
    relationships = [];
  }
});

// console.log(`\nExpression: ${sample}\n`);

// if (parsed.length > 1) {
//   console.log(
//     `The expression is Ambiguous with ${parsed.length} possible parses.\n`
//   );
// } else if (parsed.length === 1) {
//   console.log("Not Ambiguous\n");
// } else {
//   console.log("Invalid input\n");
// }
// console.log("Parse Tree:");

// const treeData = [
//   {
//     "name": "assign",
//     "class": "woman",
//     "children": [
//       {
//         "name": "id",
//         "class": "man",
//         "children": [{ "name": "Q", "class": "woman" }],
//       },
//       { "name": "=", "class": "woman" },
//       {
//         "name": "expr",
//         "class": "man",
//         "children": [
//           {
//             "name": "expr",
//             "class": "man",
//             "children": [
//               {
//                 "name": "id",
//                 "class": "man",
//                 "children": [{ "name": "A", "class": "woman" }],
//               },
//             ],
//           },
//           { "name": "+", "class": "woman" },
//           {
//             "name": "expr",
//             "class": "man",
//             "children": [
//               {
//                 "name": "id",
//                 "class": "man",
//                 "children": [{ "name": "B", "class": "woman" }],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
