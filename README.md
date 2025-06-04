# your-package-name

环境配置加载工具，支持 JSONC 格式。

[![npm version](https://img.shields.io/npm/v/env-config-jsonc.svg)](https://npmjs.com/package/env-config-jsonc)
[![License](https://img.shields.io/npm/l/env-config-jsonc.svg)](https://github.com/qiweiff/env-config-jsonc/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/qiweiff/env-config-jsonc.svg)](https://github.com/qiweiff/env-config-jsonc/stargazers)

## 介绍
env-config-jsonc 是一个轻量级 Node.js 环境配置加载工具，支持 JSONC（JSON with Comments） 格式的配置文件解析。它允许开发者通过简单的 API 加载和合并多层级配置，并自动挂载到 Node.js 的 process.envconfig 上，方便全局访问

## ✨ 特性
- ✅ **支持 JSONC 格式**（允许注释、尾随逗号等）
- 🔄 **深度合并配置**（递归合并对象，数组直接覆盖）
- ⚡ **仅依赖 `jsonc-parser`**（轻量）
- 🚀 **简单 API**（一行代码加载配置）
- 📦 **TypeScript 友好**（包含类型定义）

## 安装
```bash
npm install env-config-jsonc
```

## 使用
```js
// 在项目根目录创建jsonc文件
//env.config.jsonc
{
    "key1": 1,//支持注释
    "key2": {
        "a": "value",
        "b": [1,2,3],
        "c": [{},{},{}],
        "d":123
    }
}
//local.env.config.jsonc
{
    "key1": 10,
    "key2": {
        "a": "newvalue",
        "b": [4,5,6],
        "newkey":"",
        "d": null
    },
    "key3":""
}
```
```typescript
import loadconfig from 'env-config-jsonc';

// 加载默认配置文件 (env.config.jsonc)
loadconfig();

// 或指定自定义路径
loadconfig({ path: 'local.env.config.jsonc' });

// 或根据 NODE_ENV 加载不同配置
loadconfig({ path: `${process.env.NODE_ENV}.env.config.jsonc` });//如果文件不存在 将自动忽略

// 访问配置
console.log(process.envconfig);
// 后面加载的配置文件将与之前加载的配置文件深度合并
// 合并规则
// 相同字段：后者覆盖前者（基础类型、数组直接替换）
// 对象字段：递归合并子属性
// 新增字段：自动合并到最终配置
// 结果示例（使用上方示例配置）:
// {
//     "key1": 10,
//     "key2": {
//         "a": "newvalue",
//         "b": [4,5,6],
//         "c": [{},{},{}]
//         "newkey":""
//     },
//     "key3":""
// }

```
