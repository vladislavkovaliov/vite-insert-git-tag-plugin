"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const TransformLeak_1 = require("./src/streams/TransformLeak");
const file = "./text.txt";
async function main() {
    const rs = fs_1.default.createReadStream(file, "utf8");
    rs.pipe(new TransformLeak_1.TransformLeak({
        restricted: {
            type: "regex",
            values: [/body/gi],
            logLevel: "error",
        },
        file: file,
    }));
}
main().catch(console.error);
