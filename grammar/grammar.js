// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "start", "symbols": ["assign"], "postprocess": 
        (data) => ({
            "name": "assign",
            "class": "man",
            "children": data[0]
            
        })
                },
    {"name": "assign", "symbols": ["Id", "equal", "expr"], "postprocess": 
        (data) => ([
            data[0],
            {"name": data[1], "class": "woman"},
            {"name": "expr", "class": "man", "children": data[2]}
            
        ])
                },
    {"name": "expr", "symbols": ["expr", "opt", "expr"], "postprocess": 
        (data) => ([
            {"name": "expr", "class": "man", "children": data[0]},
            {"name": data[1], "class": "woman"},
            {"name": "expr", "class": "man", "children": data[2]}
        ])
                },
    {"name": "expr", "symbols": ["_", "expr", "_"], "postprocess": 
        (data) => ([
            {"name": data[0], "class": "woman"},
            {"name": "expr", "class": "man", "children": data[1]},
            {"name": data[2], "class": "woman"}
        ])
                },
    {"name": "expr", "symbols": ["id"], "postprocess": id},
    {"name": "expr", "symbols": ["const"], "postprocess": id},
    {"name": "_", "symbols": [{"literal":"("}], "postprocess": id},
    {"name": "_", "symbols": [{"literal":")"}], "postprocess": id},
    {"name": "opt", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "opt", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "opt", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "opt", "symbols": [{"literal":"/"}], "postprocess": id},
    {"name": "equal", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "Id", "symbols": [/[A-Za-z]/], "postprocess": 
        (data) => (
            {"name":"id", "class": "man", "children": [{"name": data[0], "class": "woman"}]}
        )
                },
    {"name": "id", "symbols": [/[A-Za-z]/], "postprocess": 
        (data) => (
            [{"name":"id", "class": "man", "children": [{"name": data[0], "class": "woman"}]}]
        )
                },
    {"name": "const", "symbols": [/[0-9]/], "postprocess": 
        (data) => (
            [{"name":"const", "class": "man", "children": [{"name": data[0], "class": "woman"}]}]
        )
                }
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
