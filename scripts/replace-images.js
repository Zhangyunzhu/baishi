/**
 * 图片替换脚本
 * 将用户下载的齐白石作品图片替换到网站中
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageReplacer {
    constructor() {
        this.sourceDir = path.join(__dirname, '..', '图片');
        this.targetDir = path.join(__dirname, '..', 'public', 'images');
        
        // 图片映射关系 - 将用户的图片分配到不同类别
        this.imageMapping = {
            artworks: [
                { source: '虾.png', target: 'artwork-001.jpg', title: '群虾戏水图' },
                { source: '虾蟹图.png', target: 'artwork-002.jpg', title: '虾蟹图' },
                { source: '喇叭花.png', target: 'artwork-003.jpg', title: '喇叭花图' },
                { source: '富翁梅花图.png', target: 'artwork-004.jpg', title: '富翁梅花图' },
                { source: '画果蜂蜜图.png', target: 'artwork-005.jpg', title: '画果蜂蜜图' },
                { source: '紫藤花图.png', target: 'artwork-006.jpg', title: '紫藤花图' },
                { source: '棕树蛐蛐图.png', target: 'artwork-007.jpg', title: '棕树蛐蛐图' },
                { source: '虫草册.png', target: 'artwork-008.jpg', title: '虫草册' }
            ],
            hero: [
                { source: '渔村图.png', target: 'hero-001.jpg', title: '渔村图' },
                { source: '虎图.png', target: 'hero-002.jpg', title: '虎图' },
                { source: '富翁梅花图.png', target: 'hero-003.jpg', title: '富翁梅花图' }
            ],
            stories: [
                { source: '虾.png', target: 'story-001.jpg', title: '齐门画虾之秘' },
                { source: '棕树蛐蛐图.png', target: 'story-002.jpg', title: '从木匠到画家的传奇' },
                { source: '喇叭花.png', target: 'story-003.jpg', title: '荷花情缘' },
                { source: '渔村图.png', target: 'story-004.jpg', title: '五出五归的求学路' },
                { source: '虎图.png', target: 'story-005.jpg', title: '衰年变法的勇气' },
                { source: '虫草册.png', target: 'story-006.jpg', title: '一方端砚的传承' },
                { source: '紫藤花图.png', target: 'story-007.jpg', title: '诗书画印四绝' },
                { source: '画果蜂蜜图.png', target: 'story-008.jpg', title: '平民画家的朴素情怀' }
            ]
        };
    }

    checkSourceImages() {
        console.log('📂 检查源图片文件夹...');
        
        if (!fs.existsSync(this.sourceDir)) {
            console.error(`❌ 源文件夹不存在: ${this.sourceDir}`);
            return false;
        }

        const sourceFiles = fs.readdirSync(this.sourceDir);
        console.log(`✅ 找到 ${sourceFiles.length} 个文件:`);
        sourceFiles.forEach(file => {
            const filePath = path.join(this.sourceDir, file);
            const stats = fs.statSync(filePath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`   📄 ${file} (${sizeKB} KB)`);
        });

        return true;
    }

    copyImage(sourcePath, targetPath, title) {
        try {
            // 创建目标目录（如果不存在）
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            // 复制文件
            fs.copyFileSync(sourcePath, targetPath);
            
            const stats = fs.statSync(targetPath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`✅ ${title}: ${path.basename(targetPath)} (${sizeKB} KB)`);
            return true;
        } catch (error) {
            console.error(`❌ 复制失败 ${title}: ${error.message}`);
            return false;
        }
    }

    replaceImages() {
        console.log('\n🔄 开始替换图片...');
        
        let totalCopied = 0;
        let totalFailed = 0;

        for (const [category, mappings] of Object.entries(this.imageMapping)) {
            console.log(`\n📁 处理 ${category} 类别:`);
            
            for (const mapping of mappings) {
                const sourcePath = path.join(this.sourceDir, mapping.source);
                const targetPath = path.join(this.targetDir, category, mapping.target);
                
                if (fs.existsSync(sourcePath)) {
                    if (this.copyImage(sourcePath, targetPath, mapping.title)) {
                        totalCopied++;
                    } else {
                        totalFailed++;
                    }
                } else {
                    console.log(`⚠️  源文件不存在: ${mapping.source}，跳过 ${mapping.title}`);
                }
            }
        }

        console.log(`\n📊 替换统计:`);
        console.log(`✅ 成功复制: ${totalCopied} 个文件`);
        console.log(`❌ 复制失败: ${totalFailed} 个文件`);
    }

    generateImageReport() {
        console.log('\n📋 生成图片使用报告...');
        
        const report = {
            artworks: [],
            hero: [],
            stories: []
        };

        for (const [category, mappings] of Object.entries(this.imageMapping)) {
            for (const mapping of mappings) {
                const targetPath = path.join(this.targetDir, category, mapping.target);
                if (fs.existsSync(targetPath)) {
                    const stats = fs.statSync(targetPath);
                    report[category].push({
                        filename: mapping.target,
                        title: mapping.title,
                        source: mapping.source,
                        size: Math.round(stats.size / 1024) + ' KB'
                    });
                }
            }
        }

        // 保存报告
        const reportPath = path.join(__dirname, '..', 'IMAGE_REPLACEMENT_REPORT.md');
        let reportContent = '# 🎨 图片替换报告\n\n';
        reportContent += `生成时间: ${new Date().toLocaleString('zh-CN')}\n\n`;

        for (const [category, items] of Object.entries(report)) {
            const categoryName = category === 'artworks' ? '藏品图片' : 
                               category === 'hero' ? '轮播图片' : '故事配图';
            reportContent += `## ${categoryName}\n\n`;
            
            items.forEach((item, index) => {
                reportContent += `${index + 1}. **${item.title}**\n`;
                reportContent += `   - 文件名: ${item.filename}\n`;
                reportContent += `   - 源文件: ${item.source}\n`;
                reportContent += `   - 大小: ${item.size}\n\n`;
            });
        }

        fs.writeFileSync(reportPath, reportContent, 'utf8');
        console.log(`✅ 报告已保存: ${reportPath}`);
    }

    run() {
        console.log('🎨 齐白石作品图片替换器启动...\n');
        
        if (!this.checkSourceImages()) {
            return;
        }

        this.replaceImages();
        this.generateImageReport();
        
        console.log('\n🎉 图片替换完成！');
        console.log('🚀 现在可以启动网站查看新的齐白石作品了！');
        console.log('💡 运行 npm run dev 启动开发服务器');
    }
}

// 运行替换器
const replacer = new ImageReplacer();
replacer.run();
