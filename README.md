# [vite-plugin-generate-config-into-dist](https://github.com/Alicevia/vite-plugin-generate-config-into-dist)

**English** | [中文](./README.zh-CN.md)

## Intro

Vite-plugin-generate-config-into-dist is a plug-in for vite packaging environment. Its main function is to write the env environment parameters and project configuration in a JS file after the front-end packaging

## Application Scenarios

After the project is packaged and online, it may need to change the background interface address or Axios interface timeout time. At this time, a separate configuration file is needed, and then loaded and written into the window through the network. When the project is opened from the webpage, the variables in the configuration file will be merged with the local one again, so as to achieve the purpose of modifying the configuration after packaging

## Points of caution for use

#### This plug-in does not work in the dev state

If I want to export both the key and value pairs in the env file used in vite and the objects in the local project configuration

The plugin itself will fetch the environment variable that starts with VITE to be used, and it will also export the project configuration. After all, sometimes you won't write everything to the environment variable, so I'll throw them all together, and you can pass in a config object to implement the above idea. Finally, export them as a settings.js file

Eventually we want settings.js to be automatically inserted into index.html after packaging, so you can use vite-plugin-html instead

Under the conditions of production In the head tag into a < script src = "/ settings. js" > < / script >

Achieve the functions that are automatically introduced after packaging

```
use vite-plugin-html
 html({
    inject: {
      injectData: {
        title: 'index',
        injectSettingsScript:isPROD? '<script src="/settings.js"></script>' : null,
      },
    },
    minify: true,
  })

index.html =============
<!DOCTYPE html>
<html lang="en">
  <head>
    <title><%- title %></title>
    <%- injectSettingsScript %> //this way
  </head>
  <body>
    <div id="app"></div>
    <div id="image-show"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## Usage

```js
yarn add vite-plugin-generate-config-into-dist -D
or
npm i vite-plugin-generate-config-into-dist -D
```

```js
vite.config.js;
import config from "src/.../config.js"; //your project configure
import generateConfigIntoDist from "vite-plugin-generate-config-into-dist";
export default () => {
  return {
    plugins: [
      vue(),
      // useage  1
      // generateConfigIntoDist({
      //   file: "settings.js",
      //   globalName: "your_settings",
      //  config, //your config must be object
      // }),
      // useage  2  notice file not the same
      generateConfigIntoDist([
        {
          file: "settings.js",
          globalName: "your_settings",
          config,
        },
        {
          file: "settings2.js",
          globalName: "your_settings2",
          config: { skdfj: 1 },
        },
      ]),
    ],
  };
};
```

## Notice

#### This plug-in does not work in the dev state

The config you pass in should be a separate JS object. You cannot introduce env in this file, otherwise it will cause the config passed in to be undefined

## Thanks

[@anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin)
