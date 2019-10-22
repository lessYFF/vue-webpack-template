# vue-webpack-template

> vue template using webpack4

## problems encountered when completing the feature

### webpack4 config:

官方是 0 配置, 但是针对具体项目有不同需求:
- 不同 npm 包依赖问题, 例如: vue-loader 还需要在插件中配置,生产环境提取 css 文件插件不能和 vue-style-loader 共用;
- 路径解析问题, 例如: 在 module.rules 配置 loader,加上 includle 限定可能会解析不了,得分析依赖;
- 免解析问题, 例如: vue 如果在 module.noParse 里配置,会有异常;
- 无法打开浏览器问题, 例如: 在 devServer.open:true,但是还是无法打开浏览器;
- 无法热更新问题, 例如: 在 addDevServerEntrypoints 方法没有指定入口就无法热更新;
- server 环境输出不在本地问题, 例如: webpackDevMiddleware 在应用中间件输出在内存中;
- node 不完全支持 es6 问题, 例如: import 等, 需要在入口引入@babel/register;
- 优化未完待续。。。

### commitizen config:

- commitizen 是 git 提交信息工具, 需全局或者项目安装 commitizen、conventional-changelog、conventional-changelog-cli,和提交格式标准包 cz-conventional-changelog。

- commitlint 可以校验提交 message, 需安装@commitlint/cli、@commitlint/config-conventional 包, 添加校验配置.commitlintrc.js,与 Husky 配合 git hook 在不符合时拒绝提交。

- standard-version 自动生成 CHANGELOG。

### typescript

ts 是 js 的超集, 可以进行类型检查, 不过有些错误也是一脸无辜。

### eslint prettier

eslint 校验代码风格, prettier 格式化, 组合使用统一团队代码风格。配置.eslintrc.js、.eslintignore、.prettierrc.js,
安装相关依赖和 lint-staged, 配合 git hook 一起校验代码并自动格式化。
