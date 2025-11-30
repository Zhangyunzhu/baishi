/**
 * 图片优化脚本
 * 将PNG图片压缩并转换为WebP格式，大幅减少文件大小
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageOptimizer {
    constructor() {
        this.baseDir = path.join(__dirname, '..', 'public', 'images');
        this.categories = ['artworks', 'hero', 'stories'];
    }

    async optimizeImage(inputPath, outputPath) {
        try {
            const stats = fs.statSync(inputPath);
            const originalSize = stats.size;

            // 转换为WebP格式，质量80%，大幅减小文件
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);

            const newStats = fs.statSync(outputPath);
            const newSize = newStats.size;
            const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

            console.log(`✅ ${path.basename(inputPath)}`);
            console.log(`   原始: ${(originalSize / 1024).toFixed(1)} KB → 优化: ${(newSize / 1024).toFixed(1)} KB`);
            console.log(`   减少: ${reduction}%\n`);

            return { originalSize, newSize, reduction };
        } catch (error) {
            console.error(`❌ 优化失败 ${inputPath}: ${error.message}`);
            return null;
        }
    }

    async optimizeCategory(category) {
        console.log(`\n📁 优化 ${category} 类别图片...\n`);
        
        const categoryDir = path.join(this.baseDir, category);
        if (!fs.existsSync(categoryDir)) {
            console.log(`⚠️  目录不存在: ${category}`);
            return;
        }

        const files = fs.readdirSync(categoryDir)
            .filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

        let totalOriginal = 0;
        let totalNew = 0;

        for (const file of files) {
            const inputPath = path.join(categoryDir, file);
            const outputPath = path.join(categoryDir, file.replace(/\.(jpg|png)$/, '.webp'));

            const result = await this.optimizeImage(inputPath, outputPath);
            if (result) {
                totalOriginal += result.originalSize;
                totalNew += result.newSize;
            }
        }

        console.log(`📊 ${category} 总计:`);
        console.log(`   原始: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   优化: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   节省: ${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%`);
    }

    async run() {
        console.log('🎨 开始优化图片...');
        console.log('将PNG/JPG转换为WebP格式，大幅减小文件大小\n');

        let grandTotalOriginal = 0;
        let grandTotalNew = 0;

        for (const category of this.categories) {
            await this.optimizeCategory(category);
        }

        console.log('\n🎉 图片优化完成！');
        console.log('\n📝 下一步：更新组件代码使用.webp文件');
    }
}

// 运行优化器
const optimizer = new ImageOptimizer();
optimizer.run().catch(console.error);
