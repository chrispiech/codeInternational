define("ace/theme/jeremys",["require","exports","module"],function(a,b,c){
    var colorForNumbers         = 'blue'; //aqua! 
    var colorForOperators       = 'black';
    var colorForComments        = 'darkgreen';
    var colorForKeyword         = '#7F0055'; 
    var colorForString          = 'blue';
    var colorForFunction        = '#7F0055';
    var colorForIterators       = colorForKeyword;
    var colorForConditionals    = colorForKeyword;
    var colorForAssignment      = '#0099FF'; //aqua! 
    
    /*This is a hack to get repeat to look like an operator for the karel section of the project, it should be taken out upon the completion of a Karel mode*/
    var colorForRepeat          = colorForKeyword;
    
    
    var d=a("pilot/dom"),e="\
\
.ace-tm .ace_line .ace_if, .ace-tm .ace_line .ace_else{\
color: " + colorForConditionals + ";\
}\
.ace-tm .ace_scroller .ace_line .ace_assignment{\
color: " + colorForAssignment + ";\
}\
.ace-tm .ace_line .ace_while, .ace-tm .ace_line .ace_for{\
color: " + colorForIterators + ";\
}\
.ace-tm .ace_line .ace_function{\
color: " + colorForFunction + ";\
}\
\
.ace-tm .ace_editor {\
border: 2px solid rgb(159, 159, 159);\
}\
\
.ace-tm .ace_editor.ace_focus {\
border: 2px solid #327fbd;\
}\
\
.ace-tm .ace_gutter {\
width: 50px;\
background: #DAECFF;\
overflow : hidden;\
border: 1px;\
}\
\
.ace-tm .ace_gutter-layer {\
width: 100%;\
text-align: right;\
}\
\
.ace-tm .ace_gutter-layer .ace_gutter-cell {\
padding-right: 6px;\
color: grey;\
}\
\
.ace-tm .ace_print_margin {\
width: 1px;\
background: blue;\
}\
\
.ace-tm .ace_text-layer {\
cursor: text;\
}\
\
.ace-tm .ace_cursor {\
border-left: 2px solid black;\
}\
\
.ace-tm .ace_cursor.ace_overwrite {\
border-left: 0px;\
border-bottom: 1px solid black;\
}\
    \
.ace-tm .ace_line .ace_invisible {\
color: blue;\
}\
\
.ace-tm .ace_line .ace_keyword {\
color: " + colorForKeyword + ";\
}\
.ace-tm .ace_line .ace_repeat {\
color: " + colorForRepeat + ";\
}\
\
.ace-tm .ace_line .ace_constant.ace_buildin {\
color: pink;\
}\
\
.ace-tm .ace_line .ace_constant.ace_language {\
color: pink;\
}\
\
.ace-tm .ace_line .ace_constant.ace_library {\
color: 6, 150, 14;\
}\
\
.ace-tm .ace_line .ace_invalid {\
background-color: red;\
color: white;\
}\
\
.ace-tm .ace_line .ace_fold {\
background-color: #E4E4E4;\
border-radius: 3px;\
}\
\
.ace-tm .ace_line .ace_support.ace_function {\
color: red ;\
}\
\
.ace-tm .ace_line .ace_support.ace_constant {\
color: red;\
}\
\
.ace-tm .ace_line .ace_support.ace_type,\
.ace-tm .ace_line .ace_support.ace_class {\
color: red;\
}\
\
.ace-tm .ace_line .ace_keyword.ace_operator {\
color: " + colorForOperators + ";\
}\
\
.ace-tm .ace_line .ace_string {\
color: " + colorForString + ";\
}\
\
.ace-tm .ace_line .ace_comment {\
color: " + colorForComments + ";\
}\
\
.ace-tm .ace_line .ace_comment.ace_doc {\
color: blue;\
}\
\
.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {\
}\
\
.ace-tm .ace_line .ace_constant.ace_numeric {\
color: " + colorForNumbers + ";\
}\
\
.ace-tm .ace_line .ace_variable {\
color: pink;\
}\
\
.ace-tm .ace_line .ace_xml_pe {\
color: red;\
}\
\
.ace-tm .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
\
.ace-tm .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
\
.ace-tm .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
\
.ace-tm .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
background: rgb(232, 242, 254);\
}\
\
.ace-tm .ace_marker-layer .ace_active_line {\
background: rgb(232, 242, 254);\
}\
\
.ace-tm .ace_marker-layer .ace_selected_word {\
background: rgb(181, 213, 255);\
border: 1px solid darkblue;\
}\
\
.ace_error {\
}\
.ace-tm .ace_string.ace_regex {\
color: rgb(255, 0, 0)\
}";
