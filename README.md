- test
- [x] 用 github pages 搭建博客，没有后台。
- [x] 根据文章实时生成归档及分类，不用每次重启看效果。
- [ ] ~~写文章时可以实时预览。~~
- [ ] 上传即发布，打包路径特殊处理。
- [ ] github 路由处理,使用 browserRouter


## 个人博客 Tangzuo

## 启动

```
//安装依赖
npm install

//服务器环境
npm run build
npm run server

//开发环境
npm run start

```

## 开发规范

请启用 prettier 插件,在文件保存时会自动规范代码

#### vscode

插件->prettier->安装

#### webstorm

file->setting->搜索 prettier->启用 prettier 插件,并指定 prettier 包地址(需要本地全局安装 prettier 包)->fileWatcher->add 添加 prettier 文件监听,指定 perttier.cmd 执行文件位置

## 备忘录

#### 开启 eslint

```
#安装eslint相关包
npm i babel-eslint eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

#### eslint 配置

```json
{
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "extends": ["airbnb", "prettier"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "arrow-parens": ["off"],
    "consistent-return": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-console": "off",
    "no-use-before-define": "off",
    "no-multi-assign": "off"
  },
  "plugins": ["import", "react"],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "../webpack.config.eslint.js"
      }
    }
  }
}
```
