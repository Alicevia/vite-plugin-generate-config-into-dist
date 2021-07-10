# vite-plugin-generate-config-into-dist

**中文** | [English](./README.md)

## 简介

 vite-plugin-generate-config-into-dist 是一个vite打包环境下的插件，主要作用是将前端打包后的env环境参数和项目里面的配置写入到一个js文件中

## 应用场景

项目打包上线后可能需要更改后台接口地址或者axios接口超时时间，这个时候需要一个单独的配置文件，然后通过网络加载写入到window上，项目从网页上打开时候会将配置文件中的变量和本地的再次合并，达到打包后修改配置的目的

## 用法

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

## 注意

你传入的config应该是一个独立的js对象，这个文件内不能引入env，否则会导致传入的config为undefined

## 感谢

@anncwb/vue-vben-admin 