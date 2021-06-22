"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const childProcess = require("child_process");
exports.default = architect_1.createBuilder(commandBuilder);
function commandBuilder(options, context) {
    const process = childProcess.spawn(options.command, options.args, {
        stdio: 'pipe',
    });
    process.stdout.on('data', (data) => {
        context.logger.info(data.toString());
    });
    process.stderr.on('data', (data) => {
        context.logger.error(data.toString());
    });
    return new Promise((resolve) => {
        process.on('close', (code) => {
            resolve({ success: code === 0 });
        });
    });
}
