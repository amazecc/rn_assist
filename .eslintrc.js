module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "react/prop-types": "off",
        "react/display-name": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: true
            }
        ],
        "@typescript-eslint/no-explicit-any": "off"
    },
    env: {
        es6: true,
        node: true
    },
    settings: {
        react: {
            version: "detect" // eslint-plugin-react 需要指定 react 的版本，detect 项目中安装的版本
        }
    }
};
