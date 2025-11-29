// 图片配置文件
// 用于统一管理所有图片路径

export const ImagePaths = {
  // 藏品图片
  artworks: {
    artwork001: '/images/artworks/artwork-001.jpg', // 群虾戏水图
    artwork002: '/images/artworks/artwork-002.jpg', // 墨荷图
    artwork003: '/images/artworks/artwork-003.jpg', // 白菜蚱蜢
    artwork004: '/images/artworks/artwork-004.jpg', // 山水十二条屏
    artwork005: '/images/artworks/artwork-005.jpg', // 桃花流水鳜鱼肥
    artwork006: '/images/artworks/artwork-006.jpg', // 牡丹蜜蜂
    artwork007: '/images/artworks/artwork-007.jpg', // 青花缠枝莲纹瓶
    artwork008: '/images/artworks/artwork-008.jpg', // 端溪老坑砚
  },
  
  // 轮播图片
  hero: {
    hero001: '/images/hero/hero-001.jpg', // 齐门虾趣
    hero002: '/images/hero/hero-002.jpg', // 荷塘清韵
    hero003: '/images/hero/hero-003.jpg', // 山水意境
  },
  
  // 故事配图
  stories: {
    story001: '/images/stories/story-001.jpg', // 齐门画虾之秘
    story002: '/images/stories/story-002.jpg', // 一方端砚的故事
    story003: '/images/stories/story-003.jpg', // 荷花情缘
  }
};

// 图片加载错误时的后备图片
export const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjVGMkU5Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veS4rS4uLjwvdGV4dD4KICA8L3N2Zz4=';

// 图片预加载函数
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// 批量预加载图片
export const preloadImages = async (imagePaths: string[]): Promise<void> => {
  try {
    await Promise.all(imagePaths.map(preloadImage));
    console.log('所有图片预加载完成');
  } catch (error) {
    console.warn('部分图片预加载失败:', error);
  }
};
