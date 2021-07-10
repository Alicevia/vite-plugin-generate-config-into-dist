"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var fs = require("fs");
var vite = require("vite");

// thanks for vben
function generateFileContent(options, env) {
  const windowConf = `window.${options.globalName}`;
  const configStr = `${windowConf}=${JSON.stringify(env, undefined, 2)};
  Object.freeze(${windowConf});
  Object.defineProperty(window, "${options.globalName}", {
    configurable: false,
    writable: false,
  });`;
  return configStr;
}

function writeSettingFile(options, outDir, env) {
  options.data =
    generateFileContent(options, env) + (options.data ? options.data : "");
  options.file = outDir + options.file;
  fs.writeFile(options.file, options.data, options.options || {}, (err) => {
    if (err) {
      options.reject && options.reject(err);
      console.error(`${options.file} create error,and you can try again` + err);
      return;
    }
    options.resolve && options.resolve(err);
    console.info(options.file + " create successfully");
  });
}
function generateSettings(options, outDir, env) {
  if (Array.isArray(options)) {
    options.forEach((item) => {
      writeSettingFile(item, outDir, Object.assign({}, env, item.config));
    });
    return;
  }
  writeSettingFile(options, outDir, Object.assign({}, env, options.config));
}
function generateConfigIntoDist(options) {
  let config, mode;
  return {
    apply: "build",
    name: "write-env-in-dist",
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },
    config: (...arg) => {
      mode = arg[1].mode;
    },
    closeBundle() {
      const env = vite.loadEnv(mode, process.cwd());
      let outDir = `${config.root}/${config.build.outDir}/`;
      generateSettings(options, outDir, env);
    },
  };
}

exports.default = generateConfigIntoDist;
exports.generateConfigIntoDist = generateConfigIntoDist;
