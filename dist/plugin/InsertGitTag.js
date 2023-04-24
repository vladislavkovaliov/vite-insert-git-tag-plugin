"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteInsertVersion = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
function viteInsertVersion() {
    return {
        name: "vite-insert-version",
        async transformIndexHtml(html) {
            const head = html.match("<head>");
            const len = "<head>".length;
            try {
                if (!head) {
                    throw new Error("No head tag in index.html");
                }
                const { index } = head;
                await execAsync("git fetch --tags");
                const { stdout } = await execAsync("git describe --tags --abbrev=0");
                const newHtml = html.substring(0, index + len) +
                    `<meta content="${stdout.trim()}">` +
                    html.substring(index + len);
                return newHtml;
            }
            catch (e) {
                console.error(e);
            }
        },
    };
}
exports.viteInsertVersion = viteInsertVersion;
