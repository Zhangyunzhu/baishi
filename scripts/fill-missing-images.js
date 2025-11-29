/**
 * 填补缺失图片脚本
 * 复制现有图片来填补缺失的图片文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageFiller {
    constructor() {
        this.baseDir = path.join(__dirname, '..', 'public', 'images');
    }

    getExistingImages(category) {
        const categoryDir = path.join(this.baseDir, category);
        if (!fs.existsSync(categoryDir)) {
            return [];
        }
        
        return fs.readdirSync(categoryDir)
            .filter(file => file.endsWith('.jpg') || file.endsWith('.png'))
            .sort();
    }

    copyImage(sourcePath, targetPath) {
        try {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`✅ 复制图片: ${path.basename(targetPath)}`);
            return true;
        } catch (error) {
            console.error(`❌ 复制失败: ${error.message}`);
            return false;
        }
    }

    fillMissingImages(category, expectedCount) {
        console.log(`\n📂 检查 ${category} 类别图片...`);
        
        const existingImages = this.getExistingImages(category);
        console.log(`现有图片: ${existingImages.length} 张`);
        console.log(`需要图片: ${expectedCount} 张`);
        
        if (existingImages.length === 0) {
            console.log(`❌ ${category} 目录下没有图片，无法填补`);
            return;
        }
        
        const prefix = category === 'artworks' ? 'artwork' : 
                      category === 'hero' ? 'hero' : 'story';
        
        for (let i = 1; i <= expectedCount; i++) {
            const expectedFilename = `${prefix}-${String(i).padStart(3, '0')}.jpg`;
            const expectedPath = path.join(this.baseDir, category, expectedFilename);
            
            if (!fs.existsSync(expectedPath)) {
                // 选择一个现有图片来复制
                const sourceImage = existingImages[i % existingImages.length];
                const sourcePath = path.join(this.baseDir, category, sourceImage);
                
                console.log(`🔄 缺失 ${expectedFilename}，从 ${sourceImage} 复制`);
                this.copyImage(sourcePath, expectedPath);
            } else {
                console.log(`✅ ${expectedFilename} 已存在`);
            }
        }
    }

    run() {
        console.log('🖼️  开始填补缺失图片...');
        
        // 定义各类别需要的图片数量
        const requirements = {
            artworks: 8,
            hero: 3,
            stories: 8
        };
        
        for (const [category, count] of Object.entries(requirements)) {
            this.fillMissingImages(category, count);
        }
        
        console.log('\n🎉 图片填补完成！');
        console.log('📁 所有图片现在都应该可用了');
    }
}

// 运行填补器
const filler = new ImageFiller();
filler.run();
