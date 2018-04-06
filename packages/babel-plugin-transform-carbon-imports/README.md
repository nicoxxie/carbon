# `babel-plugin-transform-carbon-imports`

> Babel plugin for transforming import paths for `carbon-components-react`

## Usage

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm i babel-plugin-transform-carbon-imports --save-dev
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```
yarn add babel-plugin-transform-carbon-imports --dev
```

Then, in your babel config you add the following:

```json
{
  "plugins": ["transform-carbon-imports"]
}
```

### Options

`babel-plugin-transform-carbon-imports` supports a couple of options, namely:

* `throwOnNamespace`: toggle whether you want the plugin to throw when it
  encounters `import * from 'carbon-components-react'` syntax.

You can pass in these options when adding the plugin to your babel
configuration, for example:

```json
{
  "plugins": [["transform-carbon-imports", { "throwOnNamespace": false }]]
}
```
