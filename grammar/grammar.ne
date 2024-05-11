start 
    -> assign 
        {%
            (data) => ({
                "name": "assign",
                "class": "woman",
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
    # -> expr
    #     {%
    #         (data) => ({
    #             type: "expr",
    #             parentId: "assign",
    #             child: data[0]
                
    #         })
    #     %}

# expr 
#     -> expr opt expr 
#         {%
#             (data) => ({
#                 type: "expr opt expr",
#                 parentId: "expr",
#                 operator: data[1],
#                 left: data[0],
#                 right: data[2]
#             })
#         %}
#     | "(" expr opt expr ")" 
#         {%
#             (data) => ({
#                 type: "( expr opt expr )",
#                 parentId: "expr",
#                 operator: data[2],
#                 left: data[1],
#                 right: data[3]
#             })
#         %}
#     | id {% id %}
#     | const {% id %}


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
