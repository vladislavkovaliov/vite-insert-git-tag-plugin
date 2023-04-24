## Overview

The small plugin to find in the source codes hard-coded text, for instance, it could be `locahost`, IP, domains.

## How to use

```

export default defineConfig({
  plugins: [
    viteResctrectedVariable({
      restricted: {
        type: "array",
        values: ["html"],
      },
    }),
  ],
});

```

## Properties

| Name   | Type           | Example                              |
| ------ | -------------- | ------------------------------------ |
| type   | {array,regex}  | `array` or `regex`                   |
| values | {string,regex} | `["localhost"]` or ["/localhost/gi"] |
