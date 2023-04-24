import path from "path";

import { exec } from "child_process";

import { promisify } from "util";

const execAsync = promisify(exec);

export function viteInsertVersion() {
  return {
    name: "vite-insert-version",

    async transformIndexHtml(html: string) {
      const head = html.match("<head>");
      const len = "<head>".length;

      try {
        if (!head) {
          throw new Error("No head tag in index.html");
        }
        const { index } = head;
        await execAsync("git fetch --tags");
        const { stdout } = await execAsync("git describe --tags --abbrev=0");
        const newHtml =
          html.substring(0, index! + len) +
          `<meta content="${stdout.trim()}">` +
          html.substring(index! + len);

        return newHtml;
      } catch (e) {
        console.error(e);
      }
    },
  };
}
