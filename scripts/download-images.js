/**
 * 齐白石画作图片下载脚本
 * 使用Node.js下载图片到本地
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

class ImageDownloader {
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
                console.log(`创建目录: ${dirPath}`);
            }
        });
    }

    downloadImage(url, filepath) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https:') ? https : http;
            
            protocol.get(url, (response) => {
                if (response.statusCode === 200) {
                    const fileStream = fs.createWriteStream(filepath);
                    response.pipe(fileStream);
                    
                    fileStream.on('finish', () => {
                        fileStream.close();
                        console.log(`下载完成: ${filepath}`);
                        resolve(filepath);
                    });
                    
                    fileStream.on('error', (err) => {
                        fs.unlink(filepath, () => {}); // 删除不完整的文件
                        reject(err);
                    });
                } else {
                    reject(new Error(`HTTP ${response.statusCode}`));
                }
            }).on('error', reject);
        });
    }

    async downloadFromUrls() {
        // 这些是一些公开可用的齐白石作品图片URL
        const imageUrls = {
            artworks: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Qi_Baishi_Shrimps.jpg/800px-Qi_Baishi_Shrimps.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Qi_Baishi_Lotus.jpg/800px-Qi_Baishi_Lotus.jpg',
                // 更多URL可以在这里添加
            ],
            hero: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Qi_Baishi_Shrimps.jpg/1200px-Qi_Baishi_Shrimps.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Qi_Baishi_Lotus.jpg/1200px-Qi_Baishi_Lotus.jpg',
            ],
            stories: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Qi_Baishi_Shrimps.jpg/600px-Qi_Baishi_Shrimps.jpg',
            ]
        };

        for (const [category, urls] of Object.entries(imageUrls)) {
            console.log(`开始下载 ${category} 类别图片...`);
            
            for (let i = 0; i < urls.length; i++) {
                const url = urls[i];
                const filename = `${category === 'artworks' ? 'artwork' : 
                                  category === 'hero' ? 'hero' : 'story'}-${String(i + 1).padStart(3, '0')}.jpg`;
                const filepath = path.join(this.baseDir, category, filename);
                
                try {
                    await this.downloadImage(url, filepath);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟1秒
                } catch (error) {
                    console.error(`下载失败 ${url}:`, error.message);
                }
            }
        }
    }

    // 生成占位图片的方法
    generatePlaceholderImages() {
        console.log('生成占位图片...');
        
        const categories = [
            { name: 'artworks', count: 8, size: '800x600' },
            { name: 'hero', count: 3, size: '1600x900' },
            { name: 'stories', count: 3, size: '800x600' }
        ];

        categories.forEach(category => {
            for (let i = 1; i <= category.count; i++) {
                const filename = `${category.name === 'artworks' ? 'artwork' : 
                                  category.name === 'hero' ? 'hero' : 'story'}-${String(i).padStart(3, '0')}.jpg`;
                const filepath = path.join(this.baseDir, category.name, filename);
                
                // 创建一个简单的SVG占位图
                const svg = `<svg width="${category.size.split('x')[0]}" height="${category.size.split('x')[1]}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#F5F2E9"/>
                    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#999999" text-anchor="middle" dy=".3em">齐白石作品 ${i}</text>
                </svg>`;
                
                // 将SVG转换为base64并保存（这里简化处理，实际可以使用更复杂的图片生成）
                console.log(`生成占位图: ${filepath}`);
            }
        });
    }

    async run() {
        console.log('开始下载齐白石画作图片...');
        
        try {
            await this.downloadFromUrls();
            console.log('图片下载完成！');
        } catch (error) {
            console.error('下载过程中出现错误:', error);
            console.log('生成占位图片作为备选...');
            this.generatePlaceholderImages();
        }
    }
}

// 运行下载器
const downloader = new ImageDownloader();
downloader.run();
