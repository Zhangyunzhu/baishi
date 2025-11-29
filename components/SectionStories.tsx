/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Story } from '../types';
import { BookOpen } from 'lucide-react';

const STORIES: Story[] = [
  {
    id: 's1',
    title: '齐门画虾之秘',
    summary: '白石老人画虾，经过了几个阶段的蜕变，从形似到神似，终至炉火纯青。先生常说："画虾如写字，要有神韵。"他为了画好虾，在案头养了一缸活虾，日日观察，终成一代虾王。',
    content: '',
    date: '2023.10.01',
    image: '/images/stories/story-001.jpg'
  },
  {
    id: 's2',
    title: '从木匠到画家的传奇',
    summary: '齐白石出身贫寒，少时学木匠手艺。27岁才开始学画，凭着勤奋和天赋，最终成为一代宗师。他常说："学我者生，似我者死"，鼓励后人要有自己的创新精神。',
    content: '',
    date: '2023.09.25',
    image: '/images/stories/story-002.jpg'
  },
  {
    id: 's3',
    title: '荷花情缘',
    summary: '齐白石一生钟爱荷花，"荷花出淤泥而不染"的品格深深打动了他。每逢夏日，必画荷花数幅。他说："画荷花要画出它的清香来。"',
    content: '',
    date: '2023.09.15',
    image: '/images/stories/story-003.jpg'
  },
  {
    id: 's4',
    title: '五出五归的求学路',
    summary: '齐白石57岁时，为了艺术追求，五次出远门游历，开阔眼界。他说："行万里路，读万卷书"，这种求学精神值得后人学习。每次归来，画风都有新的突破。',
    content: '',
    date: '2023.09.05',
    image: '/images/stories/story-004.jpg'
  },
  {
    id: 's5',
    title: '衰年变法的勇气',
    summary: '齐白石60岁后开始"衰年变法"，大胆改变画风，从工笔转向写意。这种在晚年仍敢于创新的勇气，成就了他独特的艺术风格，也给我们很大启发。',
    content: '',
    date: '2023.08.28',
    image: '/images/stories/story-005.jpg'
  },
  {
    id: 's6',
    title: '一方端砚的传承',
    summary: '这方端砚陪伴了齐家三代人，见证了无数佳作的诞生。石质温润如玉，发墨如油，是文房四宝中的珍品。齐白石常说："好砚台如好朋友，陪伴一生。"',
    content: '',
    date: '2023.08.20',
    image: '/images/stories/story-006.jpg'
  },
  {
    id: 's7',
    title: '诗书画印四绝',
    summary: '齐白石不仅画功了得，诗词、书法、篆刻也样样精通。他常说："诗第一，印第二，字第三，画第四。"这种全面的艺术修养，造就了他深厚的文化底蕴。',
    content: '',
    date: '2023.08.12',
    image: '/images/stories/story-007.jpg'
  },
  {
    id: 's8',
    title: '平民画家的朴素情怀',
    summary: '齐白石始终保持着农民的朴素本色，画的都是身边的花鸟虫鱼、瓜果蔬菜。他说："画要为人民服务"，这种平民情怀让他的作品充满了生活气息和人情味。',
    content: '',
    date: '2023.08.05',
    image: '/images/stories/story-008.jpg'
  }
];

const SectionStories: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-[#E0DCD3]/30 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end gap-4 mb-16">
          <h2 className="font-calligraphy text-5xl md:text-6xl text-[#1A1A1A]">笔墨春秋</h2>
          <span className="font-serif text-[#9C5E28] mb-2 tracking-widest">Stories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {STORIES.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group bg-[#F5F2E9] p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#1A1A1A] cursor-pointer relative overflow-hidden"
              data-hover="true"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none" />
              
              <div className="h-64 overflow-hidden mb-6 relative">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                 <img 
                   src={story.image} 
                   alt={story.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 sepia-[0.3]" 
                 />
              </div>

              <div className="flex items-center gap-2 mb-3">
                 <BookOpen className="w-4 h-4 text-[#C83C23]" />
                 <span className="text-xs font-serif text-[#446A7E] tracking-widest">{story.date}</span>
              </div>

              <h3 className="font-calligraphy text-3xl mb-4 group-hover:text-[#C83C23] transition-colors">{story.title}</h3>
              <p className="font-serif text-[#1A1A1A]/70 leading-relaxed mb-6">
                {story.summary}
              </p>

              <div className="flex justify-end">
                <span className="text-sm font-serif border-b border-[#1A1A1A] pb-1 group-hover:text-[#C83C23] group-hover:border-[#C83C23] transition-colors">
                  阅读全文
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionStories;
