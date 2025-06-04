# your-package-name

环境配置加载工具，支持 JSONC 格式。

## 介绍
env-config-jsonc 是一个轻量级 Node.js 环境配置加载工具，支持 JSONC（JSON with Comments） 格式的配置文件解析。它允许开发者通过简单的 API 加载和合并多层级配置，并自动挂载到 Node.js 的 process.envconfig 上，方便全局访问
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
// 后面加载的配置文件将与之前加载的配置文件深度合并，对于覆盖重复的值将覆盖，如果重复的值是一个字典，将覆盖字典中重复的键值，例如上面的示例代码，会输出以下结果
{
    "key1": 10,
    "key2": {
        "a": "newvalue",
        "b": [4,5,6],
        "c": [{},{},{}]
        "newkey":""
    },
    "key3":""
}
// 访问配置
console.log(process.envconfig);
```
