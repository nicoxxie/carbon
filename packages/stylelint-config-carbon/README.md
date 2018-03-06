# `stylelint-config-carbon`

## Usage

Run the following command using [npm]():

```bash
npm i stylelint stylelint-config-carbon --save-dev
```

If you prefer [Yarn](), use the following command instead:

```bash
yarn add stylelint stylelint-config-carbon --dev
```

## Configuration

Now that you've added `stylelint` and the `stylelint` configuration for Carbon,
you can specify your configuration in one of [these
locations](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#loading-the-configuration-object).

For example, if I included a `stylelint` key in the `package.json` file in a
project then I would do the following:

```json
{
  "stylelint": {
    "extends": "stylelint-config-carbon"
  }
}
```

You can always override any rule that `stylelint-config-carbon` provides that
causes issues in your codebase by adding additional rules to the `rules` key.
You can also use `stylelint-config-carbon` with any other `stylelint` plugins by
changing the `extends` value to an array and including the packages alongisde
`stylelint-config-carb`.
