### usage

```js
vite.config.js
import config from 'src/.../config.js'//project configure
import generateConfigIntoDistfrom "vite-plugin-generate-config-into-dist";
export default ( ) => {
  return {
    plugins: [
      vue(),
       // useage  1
      // writeFileInDist({ 
      //   file: "settings.js",
      //   globalName: "unionpay_settings",
       //  config,
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

