const spawnSync = require("child_process").spawnSync;
require("colors");

function runShell(command) {
    const arrayCommand = command.split(" ");
    const result = spawnSync(arrayCommand[0], arrayCommand.slice(1), { stdio: "inherit" });
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }

    if (result.status !== 0) {
        console.error(`non-zero exit code returned, code=${result.status}, command=${command}`.red);
        process.exit(1);
    }
}

function add() {
    console.log("[Task: Git Add .]".green);
    runShell("git add .");
}

function prettier() {
    console.log("[Task: Format Code]".green);
    runShell("prettier --config .prettierrc --write {app,component}/**/*.{ts,tsx}");
}

function tslint() {
    console.log("[Task: tsLint]".green);
    runShell("tslint {app,component}/**/*.{ts,tsx}");
}

function checkTypescriptCode() {
    console.log("[Task: Compile Check Code]".green);
    runShell("tsc -p tsconfig.json");
}

function run() {
    add();
    prettier();
    checkTypescriptCode();
    tslint();
}

run();
