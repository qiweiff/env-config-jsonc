import path from "path";
import fs from "fs";
import { parse } from 'jsonc-parser';
// 定义环境配置类型
interface EnvConfig {
    [key: string]: any;
}
// 扩展全局的 Process 接口
declare global {
    namespace NodeJS {
        interface Process {
            envconfig: EnvConfig;
        }
    }
}
/**
 * 合并两个json对象
 * @param target 
 * @param source 
 * @returns 
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const targetValue = target[key];
            const sourceValue = source[key];
            if (sourceValue === undefined) continue;
            // 处理对象类型的合并
            if (typeof sourceValue === 'object' && sourceValue !== null && !Array.isArray(sourceValue)) {
                if (typeof targetValue === 'object' && targetValue !== null && !Array.isArray(targetValue)) {
                    deepMerge(targetValue, sourceValue);
                } else {
                    (target as any)[key] = { ...sourceValue };
                }
            } else {
                (target as any)[key] = sourceValue;
            }
        }
    }
    return target;
}
/**
 * 读取jsonc文件内容
 * @param filePath 文件路径
 * @returns 
 */
function readJsoncFile(filePath: string): unknown {
    const absolutePath = path.resolve(filePath);
    const jsonData = parse(fs.readFileSync(absolutePath, 'utf-8'));
    return jsonData;
}
/**
 * 加载配置文件
 * @param options 加载选项
 * @returns 是否加载成功
 * @throws 加载或解析失败时抛出错误
 * 
 * @example
 * // 加载默认配置文件 (env.config.jsonc)
 * loadconfig();
 * 
 * @example
 * // 加载自定义路径配置文件
 * loadconfig({ path: 'custom.config.jsonc' });
 */
function loadconfig(options: { path?: string } = {}): boolean {
    try {
        if (!process.envconfig) {
            process.envconfig = {}
        }
        const configPath = options.path || "env.config.jsonc";
        if (!fs.existsSync(configPath)) {
            return false;
        }
        const configdata = readJsoncFile(configPath);
        deepMerge(process.envconfig, configdata as EnvConfig);
        return true;
    } catch (ex) {
        console.error("loadconfig 加载配置失败", ex);
        throw ex;
    }
}
export default loadconfig;