# [vite-plugin-generate-config-into-dist](https://github.com/Alicevia/vite-plugin-generate-config-into-dist)

**English** | [中文](./README.zh-CN.md)

## Intro

Vite-plugin-generate-config-into-dist is a plug-in for vite packaging environment. Its main function is to write the env environment parameters and project configuration in a JS file after the front-end packaging

## Application Scenarios 

After the project is packaged and online, it may need to change the background interface address or Axios interface timeout time. At this time, a separate configuration file is needed, and then loaded and written into the window through the network. When the project is opened from the webpage, the variables in the configuration file will be merged with the local one again, so as to achieve the purpose of modifying the configuration after packaging

## Usage

```js
yarn add vite-plugin-generate-config-into-dist -D
or
npm i vite-plugin-generate-config-into-dist -D
```



```js
vite.config.js
import config from 'src/.../config.js'//your project configure
import generateConfigIntoDistfrom "vite-plugin-generate-config-into-dist";
export default ( ) => {
  return {
    plugins: [
      vue(),
       // useage  1
      // writeFileInDist({ 
      //   file: "settings.js",
      //   globalName: "unionpay_settings",
       //  config, //your config must be object
      // }),
      // useage  2  notice file not the same
      writeFileInDist(
        [
          {
            file: "settings.js",
            globalName: "unionpay_settings",
            config,
          },
          {
            file: "settings2.js",
            globalName: "unionpay_settings2",
            config: { skdfj: 1 },
          },
        ],
      )
    ],
  };
};
```

## Notice

The config you pass in should be a separate JS object. You cannot introduce env in this file, otherwise it will cause the config passed in to be undefined

## Thanks 

[@anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin)

