module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["."],
                alias: {
                    component: "./component",
                    app: "./app"
                }
            }
        ]
    ]
};
