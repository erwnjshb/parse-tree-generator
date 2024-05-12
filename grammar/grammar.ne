start 
    -> assign 
        {%
            (data) => ({
                "name": "assign",
                "class": "man",
                "children": data[0]
                
            })
        %}

assign
    -> Id equal expr
        {%
            (data) => ([
                data[0],
                {"name": data[1], "class": "woman"},
                {"name": "expr", "class": "man", "children": data[2]}
                
            ])
        %}

expr 
    -> expr opt expr 
        {%
            (data) => ([
                {"name": "expr", "class": "man", "children": data[0]},
                {"name": data[1], "class": "woman"},
                {"name": "expr", "class": "man", "children": data[2]}
            ])
        %}
    | _ expr _
        {%
            (data) => ([
                {"name": data[0], "class": "woman"},
                {"name": "expr", "class": "man", "children": data[1]},
                {"name": data[2], "class": "woman"}
            ])
        %}
    
    | id {% id %}
    | const {% id %}

_ 
    -> "(" {% id %}
    | ")" {% id %}

opt 
    -> "+" {% id %}
    | "-" {% id %}
    | "*" {% id %}
    | "/" {% id %}

equal 
    -> "=" {% id %}

Id
    -> [A-Za-z] 
        {%
            (data) => (
                {"name":"id", "class": "man", "children": [{"name": data[0], "class": "woman"}]}
            )
        %}

id 
    -> [A-Za-z] 
        {%
            (data) => (
                [{"name":"id", "class": "man", "children": [{"name": data[0], "class": "woman"}]}]
            )
        %}
const 
    -> [0-9]
        {%
            (data) => (
                [{"name":"const", "class": "man", "children": [{"name": data[0], "class": "woman"}]}]
            )
        %}
