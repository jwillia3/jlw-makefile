(()=>{"use strict";var e={496:e=>{e.exports=require("vscode")},81:e=>{e.exports=require("child_process")}},a={};function s(o){var r=a[o];if(void 0!==r)return r.exports;var i=a[o]={exports:{}};return e[o](i,i.exports,s),i.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const a=s(496),r=s(81);e.activate=function(e){let s,o;const i=()=>{s||(s=a.window.createOutputChannel("Make Results"),s.clear())},t=async()=>{if(o)if(i(),o.kill()||o.kill("SIGKILL"))s.show(!0),s.appendLine(`Killed PID: ${o.pid}`);else{const e=`Cannot kill PID: ${o.pid}`;s.show(!1),s.appendLine(e),a.window.showErrorMessage(`Makefile: ${e}`)}},n=e=>async()=>{o&&t(),i(),s.clear();const n=a.workspace.workspaceFolders?.[0].uri.fsPath;await a.commands.executeCommand("workbench.action.files.saveAll"),o=r.exec(e,{cwd:n},((e,a,r)=>{s.show(!0),a&&s.append(a),r&&s.append(r),o=null}))};e.subscriptions.push(a.commands.registerCommand("jlw-makefile.build",n("make")),a.commands.registerCommand("jlw-makefile.rebuild",n("make clean && make")),a.commands.registerCommand("jlw-makefile.cancel",t))},e.deactivate=function(){}})(),module.exports=o})();