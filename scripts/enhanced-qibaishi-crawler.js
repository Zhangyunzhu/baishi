import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EnhancedQibaishiCrawler {
    constructor() {
        this.baseUrl = 'https://g2.ltfc.net';
        this.searchUrl = 'https://g2.ltfc.net/search?searchType=ALL_SOURCE&curTab=HUIA&keyword=%E9%BD%90%E7%99%BD%E7%9F%B3&sortBy=score';
        this.outputDir = path.join(__dirname, '..', 'public', 'images', 'qibaishi-crawled');
        this.dataFile = path.join(this.outputDir, 'content.json');
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0'
        };
    }

    // 创建输出目录
    ensureOutputDir() {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
            console.log(`创建输出目录: ${this.outputDir}`);
        }
    }

    // 获取网页内容（支持重定向和gzip）
    async fetchPage(url, maxRedirects = 5) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https:') ? https : http;
            
            const req = protocol.get(url, { headers: this.headers }, (res) => {
                // 处理重定向
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    if (maxRedirects > 0) {
                        const redirectUrl = res.headers.location.startsWith('http') 
                            ? res.headers.location 
                            : this.baseUrl + res.headers.location;
                        console.log(`重定向到: ${redirectUrl}`);
                        return this.fetchPage(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
                    } else {
                        reject(new Error('重定向次数过多'));
                        return;
                    }
                }

                let data = '';
                
                // 处理gzip压缩
                let stream = res;
                if (res.headers['content-encoding'] === 'gzip') {
                    stream = res.pipe(zlib.createGunzip());
                }
                
                stream.on('data', (chunk) => {
                    data += chunk;
                });
                
                stream.on('end', () => {
                    console.log(`页面获取完成，内容长度: ${data.length} 字符`);
                    resolve(data);
                });

                stream.on('error', (err) => {
                    reject(err);
                });
            });
            
            req.on('error', (err) => {
                reject(err);
            });
            
            req.setTimeout(30000, () => {
                req.destroy();
                reject(new Error('请求超时'));
            });
        });
    }

    // 下载图片
    async downloadImage(imageUrl, filename) {
        return new Promise((resolve, reject) => {
            // 处理相对路径
            let fullUrl = imageUrl;
            if (!imageUrl.startsWith('http')) {
                if (imageUrl.startsWith('//')) {
                    fullUrl = 'https:' + imageUrl;
                } else if (imageUrl.startsWith('/')) {
                    fullUrl = this.baseUrl + imageUrl;
                } else {
                    fullUrl = this.baseUrl + '/' + imageUrl;
                }
            }
            
            const protocol = fullUrl.startsWith('https:') ? https : http;
            const filepath = path.join(this.outputDir, filename);
            
            const req = protocol.get(fullUrl, { headers: this.headers }, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream(filepath);
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`下载完成: ${filename}`);
                        resolve(filepath);
                    });
                    file.on('error', (err) => {
                        fs.unlink(filepath, () => {});
                        reject(err);
                    });
                } else {
                    reject(new Error(`下载失败: ${res.statusCode} - ${fullUrl}`));
                }
            });
            
            req.on('error', (err) => {
                reject(err);
            });
            
            req.setTimeout(20000, () => {
                req.destroy();
                reject(new Error('下载超时'));
            });
        });
    }

    // 增强的HTML解析
    parseContent(html) {
        console.log('开始解析HTML内容...');
        
        // 更全面的正则表达式
        const imgRegex = /<img[^>]*?src\s*=\s*["']([^"']+)["'][^>]*>/gi;
        const titleRegex = /<title[^>]*?>([^<]+)<\/title>/i;
        const metaTitleRegex = /<meta[^>]*?property\s*=\s*["']og:title["'][^>]*?content\s*=\s*["']([^"']+)["'][^>]*?>/i;
        
        // 更灵活的内容提取
        const headingRegex = /<h[1-6][^>]*?>([^<]+)<\/h[1-6]>/gi;
        const paragraphRegex = /<p[^>]*?>([^<]+)<\/p>/gi;
        const divTextRegex = /<div[^>]*?class\s*=\s*["'][^"']*?(title|name|desc|content)[^"']*?["'][^>]*?>([^<]+)<\/div>/gi;
        const spanTextRegex = /<span[^>]*?class\s*=\s*["'][^"']*?(title|name|desc|content)[^"']*?["'][^>]*?>([^<]+)<\/span>/gi;
        
        // 提取页面标题
        let pageTitle = '齐白石作品';
        const titleMatch = html.match(titleRegex);
        const metaTitleMatch = html.match(metaTitleRegex);
        
        if (metaTitleMatch) {
            pageTitle = metaTitleMatch[1].trim();
        } else if (titleMatch) {
            pageTitle = titleMatch[1].trim();
        }
        
        // 提取图片URL
        const images = new Set();
        let imgMatch;
        while ((imgMatch = imgRegex.exec(html)) !== null) {
            const src = imgMatch[1].trim();
            if (src && 
                !src.includes('data:') && 
                !src.includes('base64') &&
                !src.endsWith('.svg') &&
                (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png') || src.includes('.webp') || src.includes('.gif'))) {
                images.add(src);
            }
        }
        
        // 提取文本内容
        const headings = [];
        const paragraphs = [];
        const allText = [];
        
        // 提取标题
        let headingMatch;
        while ((headingMatch = headingRegex.exec(html)) !== null) {
            const text = headingMatch[1].trim().replace(/\s+/g, ' ');
            if (text.length > 2 && !text.includes('script') && !text.includes('style')) {
                headings.push(text);
                allText.push(text);
            }
        }
        
        // 提取段落
        let paragraphMatch;
        while ((paragraphMatch = paragraphRegex.exec(html)) !== null) {
            const text = paragraphMatch[1].trim().replace(/\s+/g, ' ');
            if (text.length > 10 && !text.includes('script') && !text.includes('style')) {
                paragraphs.push(text);
                allText.push(text);
            }
        }
        
        // 提取div中的文本
        let divMatch;
        while ((divMatch = divTextRegex.exec(html)) !== null) {
            const text = divMatch[2].trim().replace(/\s+/g, ' ');
            if (text.length > 5 && !text.includes('script') && !text.includes('style')) {
                allText.push(text);
            }
        }
        
        // 提取span中的文本
        let spanMatch;
        while ((spanMatch = spanTextRegex.exec(html)) !== null) {
            const text = spanMatch[2].trim().replace(/\s+/g, ' ');
            if (text.length > 5 && !text.includes('script') && !text.includes('style')) {
                allText.push(text);
            }
        }
        
        console.log(`解析完成: 找到 ${images.size} 张图片, ${headings.length} 个标题, ${paragraphs.length} 个段落, ${allText.length} 段文本`);
        
        return {
            title: pageTitle,
            images: Array.from(images),
            headings: [...new Set(headings)], // 去重
            paragraphs: [...new Set(paragraphs)], // 去重
            allText: [...new Set(allText)], // 去重
            crawlTime: new Date().toISOString(),
            htmlLength: html.length
        };
    }

    // 主爬取方法
    async crawl() {
        try {
            console.log('开始爬取齐白石相关内容...');
            console.log(`目标URL: ${this.searchUrl}`);
            
            this.ensureOutputDir();
            
            // 获取页面内容
            console.log('正在获取页面内容...');
            const html = await this.fetchPage(this.searchUrl);
            
            // 保存原始HTML用于调试
            const htmlFile = path.join(this.outputDir, 'page.html');
            fs.writeFileSync(htmlFile, html, 'utf8');
            console.log(`原始HTML已保存至: ${htmlFile}`);
            
            // 解析内容
            const parsedData = this.parseContent(html);
            
            console.log(`\n=== 解析结果 ===`);
            console.log(`页面标题: ${parsedData.title}`);
            console.log(`HTML长度: ${parsedData.htmlLength} 字符`);
            console.log(`找到图片: ${parsedData.images.length} 张`);
            console.log(`找到标题: ${parsedData.headings.length} 个`);
            console.log(`找到段落: ${parsedData.paragraphs.length} 个`);
            console.log(`总文本段: ${parsedData.allText.length} 段`);
            
            // 显示前几个找到的内容
            if (parsedData.images.length > 0) {
                console.log('\n前5张图片URL:');
                parsedData.images.slice(0, 5).forEach((img, i) => {
                    console.log(`${i + 1}. ${img}`);
                });
            }
            
            if (parsedData.headings.length > 0) {
                console.log('\n找到的标题:');
                parsedData.headings.slice(0, 10).forEach((heading, i) => {
                    console.log(`${i + 1}. ${heading}`);
                });
            }
            
            if (parsedData.allText.length > 0) {
                console.log('\n找到的文本内容:');
                parsedData.allText.slice(0, 10).forEach((text, i) => {
                    console.log(`${i + 1}. ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`);
                });
            }
            
            // 下载图片
            const downloadedImages = [];
            if (parsedData.images.length > 0) {
                console.log('\n开始下载图片...');
                for (let i = 0; i < Math.min(parsedData.images.length, 20); i++) { // 限制最多下载20张
                    const imageUrl = parsedData.images[i];
                    try {
                        const urlParts = imageUrl.split('/');
                        const originalName = urlParts[urlParts.length - 1].split('?')[0];
                        const ext = path.extname(originalName) || '.jpg';
                        const filename = `qibaishi_${String(i + 1).padStart(3, '0')}${ext}`;
                        
                        console.log(`正在下载图片 ${i + 1}/${Math.min(parsedData.images.length, 20)}: ${filename}`);
                        await this.downloadImage(imageUrl, filename);
                        downloadedImages.push({
                            originalUrl: imageUrl,
                            filename: filename,
                            localPath: path.join(this.outputDir, filename)
                        });
                        
                        // 添加延迟避免请求过快
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    } catch (error) {
                        console.error(`下载图片失败 ${imageUrl}:`, error.message);
                    }
                }
            }
            
            // 保存数据
            const finalData = {
                ...parsedData,
                downloadedImages,
                sourceUrl: this.searchUrl,
                totalImages: parsedData.images.length,
                successfulDownloads: downloadedImages.length,
                crawlStats: {
                    htmlLength: parsedData.htmlLength,
                    imagesFound: parsedData.images.length,
                    imagesDownloaded: downloadedImages.length,
                    headingsFound: parsedData.headings.length,
                    paragraphsFound: parsedData.paragraphs.length,
                    totalTextSegments: parsedData.allText.length
                }
            };
            
            fs.writeFileSync(this.dataFile, JSON.stringify(finalData, null, 2), 'utf8');
            
            console.log('\n=== 爬取完成 ===');
            console.log(`数据保存至: ${this.dataFile}`);
            console.log(`图片保存至: ${this.outputDir}`);
            console.log(`成功下载图片: ${downloadedImages.length}/${parsedData.images.length}`);
            
            return finalData;
            
        } catch (error) {
            console.error('爬取过程中出现错误:', error);
            throw error;
        }
    }
}

// 如果直接运行此脚本
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1].endsWith('enhanced-qibaishi-crawler.js')) {
    console.log('启动增强版齐白石爬虫...');
    const crawler = new EnhancedQibaishiCrawler();
    crawler.crawl().catch(console.error);
}

export default EnhancedQibaishiCrawler;
