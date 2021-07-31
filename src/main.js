import { writeFile } from "fs";
import { loadEnv } from "vite";
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
  writeFile(options.file, options.data, options.options || {}, (err) => {
    if (err) {
      options.reject && options.reject(err);
      console.error("settings creates fail,you maybe need rebuild" + err);
      return;
    }
    options.resolve && options.resolve(err);
    console.info("settings create success!!!");
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
function generateConfigIntoDist(options, userConfig) {
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
      const env = loadEnv(mode, process.cwd());
      let outDir = `${config.root}/${config.build.outDir}/`;
      generateSettings(options, outDir, env);
    },
  };
}
export { generateConfigIntoDist };
export default generateConfigIntoDist;
