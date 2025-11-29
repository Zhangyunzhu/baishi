#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
齐白石画作图片爬虫
从必应搜索结果中下载齐白石画作图片
"""

import requests
import os
import time
import json
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup
import hashlib
from PIL import Image
import io

class QiBaishiImageCrawler:
    def __init__(self, output_dir="public/images"):
        self.output_dir = output_dir
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # 创建输出目录
        self.create_directories()
    
    def create_directories(self):
        """创建必要的目录结构"""
        dirs = [
            os.path.join(self.output_dir, "artworks"),
            os.path.join(self.output_dir, "hero"),
            os.path.join(self.output_dir, "stories")
        ]
        for dir_path in dirs:
            os.makedirs(dir_path, exist_ok=True)
            print(f"创建目录: {dir_path}")
    
    def search_bing_images(self, query, count=20):
        """从必应搜索图片"""
        search_url = "https://www.bing.com/images/search"
        params = {
            'q': query,
            'form': 'HDRSC2',
            'first': 1,
            'count': count
        }
        
        try:
            response = self.session.get(search_url, params=params)
            response.raise_for_status()
            return self.extract_image_urls(response.text)
        except Exception as e:
            print(f"搜索失败: {e}")
            return []
    
    def extract_image_urls(self, html_content):
        """从HTML中提取图片URL"""
        soup = BeautifulSoup(html_content, 'html.parser')
        image_urls = []
        
        # 查找图片链接
        img_tags = soup.find_all('img', {'src': True})
        for img in img_tags:
            src = img.get('src')
            if src and ('jpg' in src or 'jpeg' in src or 'png' in src):
                if src.startswith('//'):
                    src = 'https:' + src
                elif src.startswith('/'):
                    src = 'https://www.bing.com' + src
                image_urls.append(src)
        
        # 也尝试从data-src属性获取
        for img in soup.find_all('img', {'data-src': True}):
            src = img.get('data-src')
            if src and ('jpg' in src or 'jpeg' in src or 'png' in src):
                if src.startswith('//'):
                    src = 'https:' + src
                image_urls.append(src)
        
        return list(set(image_urls))  # 去重
    
    def download_image(self, url, filename):
        """下载单张图片"""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            # 验证是否为有效图片
            try:
                img = Image.open(io.BytesIO(response.content))
                # 检查图片尺寸
                if img.width < 300 or img.height < 300:
                    print(f"图片尺寸太小，跳过: {url}")
                    return False
                
                # 保存图片
                with open(filename, 'wb') as f:
                    f.write(response.content)
                print(f"下载成功: {filename}")
                return True
                
            except Exception as e:
                print(f"图片验证失败: {url} - {e}")
                return False
                
        except Exception as e:
            print(f"下载失败: {url} - {e}")
            return False
    
    def crawl_artworks(self):
        """爬取藏品图片"""
        print("开始爬取藏品图片...")
        
        queries = [
            "齐白石 虾 国画 高清",
            "齐白石 荷花 水墨画",
            "齐白石 白菜 蚱蜢 国画",
            "齐白石 山水画 十二条屏",
            "齐白石 桃花 鳜鱼 国画",
            "齐白石 牡丹 蜜蜂 花鸟画",
            "青花瓷 缠枝莲纹 古瓷器",
            "端砚 文房四宝 古砚台"
        ]
        
        artwork_count = 1
        for i, query in enumerate(queries):
            print(f"搜索: {query}")
            image_urls = self.search_bing_images(query, 10)
            
            downloaded = 0
            for url in image_urls:
                if downloaded >= 2:  # 每个主题下载2张
                    break
                
                filename = os.path.join(
                    self.output_dir, 
                    "artworks", 
                    f"artwork-{artwork_count:03d}.jpg"
                )
                
                if self.download_image(url, filename):
                    artwork_count += 1
                    downloaded += 1
                
                time.sleep(1)  # 避免请求过快
            
            time.sleep(2)  # 每个搜索间隔
    
    def crawl_hero_images(self):
        """爬取轮播图片"""
        print("开始爬取轮播图片...")
        
        queries = [
            "齐白石 虾 国画 横版 高清",
            "齐白石 荷花 水墨画 横版",
            "齐白石 山水画 横版 意境"
        ]
        
        for i, query in enumerate(queries, 1):
            print(f"搜索轮播图: {query}")
            image_urls = self.search_bing_images(query, 5)
            
            for url in image_urls[:1]:  # 每个主题1张
                filename = os.path.join(
                    self.output_dir, 
                    "hero", 
                    f"hero-{i:03d}.jpg"
                )
                
                if self.download_image(url, filename):
                    break
                
                time.sleep(1)
            
            time.sleep(2)
    
    def crawl_story_images(self):
        """爬取故事配图"""
        print("开始爬取故事配图...")
        
        queries = [
            "齐白石 画虾 过程 国画",
            "端砚 文房用品 古代",
            "齐白石 荷花 创作"
        ]
        
        for i, query in enumerate(queries, 1):
            print(f"搜索故事配图: {query}")
            image_urls = self.search_bing_images(query, 5)
            
            for url in image_urls[:1]:  # 每个故事1张
                filename = os.path.join(
                    self.output_dir, 
                    "stories", 
                    f"story-{i:03d}.jpg"
                )
                
                if self.download_image(url, filename):
                    break
                
                time.sleep(1)
            
            time.sleep(2)
    
    def run(self):
        """运行爬虫"""
        print("齐白石画作图片爬虫开始运行...")
        
        self.crawl_artworks()
        self.crawl_hero_images()
        self.crawl_story_images()
        
        print("爬虫运行完成！")

if __name__ == "__main__":
    crawler = QiBaishiImageCrawler()
    crawler.run()
