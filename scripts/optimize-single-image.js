/**
 * 单张图片优化脚本
 * 将指定的图片转换为WebP格式
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeSingleImage() {
    const inputPath = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-001-qiyanjun.jpg');
    const outputPath = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-001-qiyanjun.webp');

    try {
        const stats = fs.statSync(inputPath);
        const originalSize = stats.size;

        // 转换为WebP格式，质量80%
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSize = newStats.size;
        const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`✅ 齐燕君图片优化完成`);
        console.log(`   原始: ${(originalSize / 1024).toFixed(1)} KB → 优化: ${(newSize / 1024).toFixed(1)} KB`);
        console.log(`   减少: ${reduction}%`);

        // 现在替换原来的hero-001.webp
        const finalPath = path.join(__dirname, '..', 'public', 'images', 'hero', 'hero-001.webp');
        fs.copyFileSync(outputPath, finalPath);
        
        console.log(`✅ 已替换 hero-001.webp 为齐燕君图片`);

    } catch (error) {
        console.error(`❌ 优化失败: ${error.message}`);
    }
}

// 运行优化
optimizeSingleImage().catch(console.error);
