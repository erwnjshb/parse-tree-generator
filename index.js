const nearley = require("nearley");
const grammar = require("./grammar/grammar.js");

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

const inputExpr = document.getElementById("inputExpr");
const parseBtn = document.getElementById("button-addon2");
const amb = document.getElementById("ambd");
const graphh = document.getElementById("graph");

//Generate Parse Button
parseBtn.addEventListener("click", () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const dataInput = inputExpr.value;
  const inputData = dataInput.replaceAll(" ", "");

  inputData;
  if (inputData != "") {
    try {
      graphh.innerHTML = "";
      parser.feed(inputData);
      const parsed = parser.results;

      console.log(JSON.stringify(parsed));
      if (parsed.length > 1) {
        amb.textContent = `Ambiguous Parse Tree: ${parsed.length} Possible Parses`;
      } else {
        amb.textContent = "Parse Tree is not Ambiguous";
      }
      dTree.init(parsed, option);
    } catch (error) {
      amb.innerHTML = error;
      graphh.innerHTML = "";
    }
  } else {
    amb.textContent = "Parser returned no results.";
    graphh.innerHTML = "";
  }
});
