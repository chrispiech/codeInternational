define("ace/theme/eclipse",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
"use strict";

exports.isDark = false;
exports.cssText = ".ace-chris .ace_gutter {\
background: #ebebeb;\
border-right: 1px solid rgb(159, 159, 159);\
color: rgb(136, 136, 136);\
}\
.ace-chris .ace_print-margin {\
width: 1px;\
background: #ebebeb;\
}\
.ace-chris {\
background-color: #FFFFFF;\
color: black;\
}\
.ace-chris .ace_fold {\
background-color: rgb(60, 76, 114);\
}\
.ace-chris .ace_cursor {\
color: black;\
}\
.ace-chris .ace_storage,\
.ace-chris .ace_keyword,\
.ace-chris .ace_variable {\
color: rgb(127, 0, 85);\
}\
.ace-chris .ace_constant.ace_buildin {\
color: rgb(88, 72, 246);\
}\
.ace-chris .ace_constant.ace_library {\
color: rgb(6, 150, 14);\
}\
.ace-chris .ace_function {\
color: rgb(60, 76, 114);\
}\
.ace-chris .ace_string {\
color: rgb(42, 0, 255);\
}\
.ace-chris .ace_comment {\
color: rgb(113, 150, 130);\
}\
.ace-chris .ace_comment.ace_doc {\
color: rgb(63, 95, 191);\
}\
.ace-chris .ace_comment.ace_doc.ace_tag {\
color: rgb(127, 159, 191);\
}\
.ace-chris .ace_constant.ace_numeric {\
color: darkblue;\
}\
.ace-chris .ace_tag {\
color: rgb(25, 118, 116);\
}\
.ace-chris .ace_type {\
color: rgb(127, 0, 127);\
}\
.ace-chris .ace_xml-pe {\
color: rgb(104, 104, 91);\
}\
.ace-chris .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-chris .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-chris .ace_meta.ace_tag {\
color:rgb(25, 118, 116);\
}\
.ace-chris .ace_invisible {\
color: #ddd;\
}\
.ace-chris .ace_entity.ace_other.ace_attribute-name {\
color:rgb(127, 0, 127);\
}\
.ace-chris .ace_marker-layer .ace_step {\
background: rgb(255, 255, 0);\
}\
.ace-chris .ace_active-line {\
background: rgb(232, 242, 254);\
}\
.ace-chris .ace_gutter-active-line {\
background-color : #DADADA;\
}\
.ace-chris .ace_marker-layer .ace_selected-word {\
border: 1px solid rgb(181, 213, 255);\
}\
.ace-chris .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

exports.cssClass = "ace-chris";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
                (function() {
                    window.require(["ace/theme/chris"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();