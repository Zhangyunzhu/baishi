/**
 * 简化版图片下载脚本
 * 直接从可靠的图片源下载齐白石相关图片
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 可靠的图片URL列表
const imageUrls = {
    artworks: [
        'https://images.unsplash.com/photo-1578305740488-842233633d45?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1622345869480-165f17db4d5b?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1526304760382-3591d3840148?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1515405295579-ba7b454989d3?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1616858277259-29c362085773?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1605553653131-0f74fb8db443?w=800&h=600&fit=crop&crop=center'
    ],
    hero: [
        'https://images.unsplash.com/photo-1578305740488-842233633d45?w=1600&h=900&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1622345869480-165f17db4d5b?w=1600&h=900&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=900&fit=crop&crop=center'
    ],
    stories: [
        'https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1622345869480-165f17db4d5b?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578305740488-842233633d45?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1526304760382-3591d3840148?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1515405295579-ba7b454989d3?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1616858277259-29c362085773?w=800&h=600&fit=crop&crop=center'
    ]
};

class SimpleDownloader {
    constructor() {
        this.baseDir = path.join(__dirname, '..', 'public', 'images');
        this.createDirectories();
    }

    createDirectories() {
        const dirs = ['artworks', 'hero', 'stories'];
        dirs.forEach(dir => {
            const dirPath = path.join(this.baseDir, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                console.log(`✅ 创建目录: ${dirPath}`);
            }
        });
    }

    downloadImage(url, filepath) {
        return new Promise((resolve, reject) => {
            console.log(`⬇️  开始下载: ${path.basename(filepath)}`);
            
            https.get(url, (response) => {
                if (response.statusCode === 200) {
                    const fileStream = fs.createWriteStream(filepath);
                    response.pipe(fileStream);
                    
                    fileStream.on('finish', () => {
                        fileStream.close();
                        console.log(`✅ 下载完成: ${path.basename(filepath)}`);
                        resolve(filepath);
                    });
                    
                    fileStream.on('error', (err) => {
                        fs.unlink(filepath, () => {}); // 删除不完整的文件
                        console.error(`❌ 文件写入错误: ${err.message}`);
                        reject(err);
                    });
                } else {
                    console.error(`❌ HTTP错误: ${response.statusCode}`);
                    reject(new Error(`HTTP ${response.statusCode}`));
                }
            }).on('error', (err) => {
                console.error(`❌ 网络错误: ${err.message}`);
                reject(err);
            });
        });
    }

    async downloadCategory(category, urls) {
        console.log(`\n📂 开始下载 ${category} 类别图片...`);
        
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const prefix = category === 'artworks' ? 'artwork' : 
                          category === 'hero' ? 'hero' : 'story';
            const filename = `${prefix}-${String(i + 1).padStart(3, '0')}.jpg`;
            const filepath = path.join(this.baseDir, category, filename);
            
            try {
                await this.downloadImage(url, filepath);
                // 添加延迟避免请求过快
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`❌ 下载失败 ${filename}: ${error.message}`);
            }
        }
        
        console.log(`✅ ${category} 类别下载完成！`);
    }

    async run() {
        console.log('🎨 齐白石画作图片下载器启动...\n');
        
        try {
            // 按顺序下载各类别图片
            await this.downloadCategory('artworks', imageUrls.artworks);
            await this.downloadCategory('hero', imageUrls.hero);
            await this.downloadCategory('stories', imageUrls.stories);
            
            console.log('\n🎉 所有图片下载完成！');
            console.log('📁 图片保存位置: public/images/');
            console.log('🚀 现在可以启动网站查看效果了！');
            
        } catch (error) {
            console.error('\n❌ 下载过程中出现错误:', error.message);
        }
    }
}

// 运行下载器
const downloader = new SimpleDownloader();
downloader.run();
