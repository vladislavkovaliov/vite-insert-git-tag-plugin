import fs from "fs";

import { TransformLeak } from "./src/streams/TransformLeak";

const file = "./text.txt";

async function main() {
  const rs = fs.createReadStream(file, "utf8");

  rs.pipe(
    new TransformLeak({
      restricted: {
        type: "regex",
        values: [/body/gi], // html
        logLevel: "error",
      },
      file: file,
    })
  );
}

main().catch(console.error);
