# green

## Setup 

After building go into `build/dev/javascript/lustre/ffi.mjs` and change the imports to:

```js
import * as React from "preact";
import * as ReactDOM from "preact";

import { useState } from "preact/hooks";
```

and change `React.useState` to `useState`

## Building/Running

```sh
gleam build

deno run -A ./build/dev/javascript/green/main.mjs
```