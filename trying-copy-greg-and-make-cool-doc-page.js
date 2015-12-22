var fs = require('fs'),
    marky = require("marky-markdown"),
    minify = require('html-minifier').minify;

file = fs.readFileSync('README.md', 'utf8');

code = file.match(/\s*```[a-z]*?\n[^`]+?\n\s*```/g);

for( var i = 0; i < code.length; i++ ) {
    
    // Get starting spacing
    var spacing = code[i].match(/^\n*(\s*)`/m)[1];
    
    var codeSnippet = code[i].replace(/```[a-z]*/g, "");
        codeSnippet = minify(codeSnippet, { collapseWhitespace: true });
    
    var newCode = code[i] + "\n" + spacing + codeSnippet;
    
    var newCode = "\n\n" + spacing + "<div class='example'>\n" + code[i] + "\n" + spacing + "<div class='sample'>" + codeSnippet + "</div>\n" + spacing + "</div>\n";

    
    file = file.replace(code[i], newCode);
    
}

fs.writeFileSync('build/index.md', file);

/* Yes, this is ugly. It's a quick way to get styling in there */

fs.writeFileSync('build/index.html', marky(file, {sanitize: false}).html() + "<script src=../build/bundle.js></script><link href=../build/main.css rel=stylesheet><link href=../temo.css rel=stylesheet><style>body { font-family: Open Sans; width: 100%; max-width: 600px; margin: auto }pre { margin: 0 }pre pre { background: #555; color: #eee; overflow-x: scroll; padding: 15px; }.example{ border: 1px solid #eee}.example:before {content: \"Example\";font-size: 13px;background: #555;color: #eee;width: calc(100% - 30px);display: block;padding: 10px 15px;border-bottom: #666 solid 1px;}.sample{padding: 15px}a { text-decoration: none; color: #666}</style><link href='https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic' rel='stylesheet' type='text/css'><style>.comment {color: #7C7C7C;}.entity {color: #FFD2A7;}.entity.name.type {text-decoration: underline;color: #FFFFB6;}.entity.other.inherited-class {color: #9B5C2E;}.keyword {color: #96CBFE;}.keyword.control {color: #96CBFE;}.keyword.operator {color: #EDEDED;}.storage {color: #CFCB90;}.storage.modifier {color: #96CBFE;}.constant {color: #99CC99;}.constant.numeric {color: #FF73FD;}.variable {color: #C6C5FE;}.invalid.deprecated {text-decoration: underline;color: #FD5FF1;}.invalid.illegal {color: #FD5FF1;background-color: rgba(86, 45, 86, 0.75);}.string .source,.string .meta.embedded.line {color: #EDEDED;}.string .punctuation.section.embedded {color: #00A0A0;}.string .punctuation.section.embedded .source {color: #00A0A0;}.string {color: #A8FF60;}.string .constant {color: #00A0A0;}.string.regexp {color: #E9C062;}.string.regexp .constant.character.escape,.string.regexp .source.ruby.embedded,.string.regexp .string.regexp.arbitrary-repetition {color: #FF8000;}.string.regexp.group {color: #C6A24F;background-color: rgba(255, 255, 255, 0.06);}.string.regexp.character-class {color: #B18A3D;}.string .variable {color: #8A9A95;}.support {color: #FFFFB6;}.support.function {color: #DAD085;}.support.constant {color: #FFD2A7;}.support.type.property-name.css {color: #EDEDED;}.source .entity.name.tag,.source .punctuation.tag {color: #96CBFE;}.source .entity.other.attribute-name {color: #C6C5FE;}.entity.other.attribute-name {color: #C6C5FE;}.entity.name.tag.namespace,.entity.other.attribute-name.namespace {color: #E18964;}.meta.preprocessor.c {color: #8996A8;}.meta.preprocessor.c .keyword {color: #AFC4DB;}.meta.cast {color: #676767;}.meta.sgml.html .meta.doctype,.meta.sgml.html .meta.doctype .entity,.meta.sgml.html .meta.doctype .string,.meta.xml-processing,.meta.xml-processing .entity,.meta.xml-processing .string {color: #494949;}.meta.tag .entity,.meta.tag > .punctuation,.meta.tag.inline .entity {color: #C6C5FE;}.meta.tag .name,.meta.tag.inline .name,.meta.tag > .punctuation {color: #96CBFE;}.meta.selector.css .entity.name.tag {text-decoration: underline;color: #96CBFE;}.meta.selector.css .entity.other.attribute-name.tag.pseudo-class {color: #8F9D6A;}.meta.selector.css .entity.other.attribute-name.id {color: #8B98AB;}.meta.selector.css .entity.other.attribute-name.class {color: #62B1FE;}.meta.property-group .support.constant.property-value.css,.meta.property-value .support.constant.property-value.css {color: #F9EE98;}.meta.preprocessor.at-rule .keyword.control.at-rule {color: #8693A5;}.meta.property-value .support.constant.named-color.css,.meta.property-value .constant {color: #87C38A;}.meta.constructor.argument.css {color: #8F9D6A;}.meta.diff,.meta.diff.header {color: #F8F8F8;background-color: #0E2231;}.meta.separator {color: #60A633;background-color: #242424;}.meta.line.entry.logfile,.meta.line.exit.logfile {background-color: rgba(238, 238, 238, 0.16);}.meta.line.error.logfile {background-color: #751012;}pre pre { background: #333; padding: 10px; color: #eee}</style>");