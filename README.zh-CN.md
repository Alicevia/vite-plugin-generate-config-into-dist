# [vite-plugin-generate-config-into-dist](https://github.com/Alicevia/vite-plugin-generate-config-into-dist)

**中文** | [English](./README.md)

## 简介

vite-plugin-generate-config-into-dist 是一个 vite 打包环境下的插件，主要作用是将前端打包后的 env 环境参数和项目里面的配置写入到一个 js 文件中

## 应用场景

项目打包上线后可能需要更改后台接口地址或者 axios 接口超时时间，这个时候需要一个单独的配置文件，然后通过网络加载写入到 window 上，项目从网页上打开时候会将配置文件中的变量和本地的再次合并，达到打包后修改配置的目的

## 使用的注意点

#### 此插件不会在dev状态下工作

如果我想把vite里面使用到的env文件里面的键值对和本地项目配置的对象都导出

该插件本身会去获取到要使用到的以VITE开头的环境变量，同时也可以将项目配置导出，毕竟有的时候不会把所有的东西都往环境变量上写，所以我把他们都扔到了一起，你可以传入一个config对象来实现上面的想法，最终把他们导出为一个settings.js文件

最终我们还是希望打包完成后在index.html内能够自动将settings.js引入，所以你可以用vite-plugin-html

在production的状态下 在head标签里引入一个<script src="/settings.js"></script> 

达成打包后自动引入的功能

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



## 用法

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
      //   globalName: "unionpay_settings",
      //  config, //your config must be object
      // }),
      // useage  2  notice file not the same
      generateConfigIntoDist([
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
      ]),
    ],
  };
};
```

## 注意

#### 此插件不会在dev状态下工作 

同时你传入的 config 应该是一个独立的 js 对象，这个文件内不能引入 env，否则会导致传入的 config 为 undefined

## 感谢

[@anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin)
