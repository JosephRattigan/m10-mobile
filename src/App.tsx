/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Bookmark, 
  Play, 
  Calendar, 
  ChevronRight, 
  LayoutGrid, 
  TrendingUp, 
  Compass, 
  Mic2, 
  MoreHorizontal,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentItem, MorningUpdate } from './types';

const MORNING_UPDATES: MorningUpdate[] = [
  {
    id: '1',
    title: 'Sunday Tea with TBN: Fuel for thought',
    summary: 'Brent has slipped back to roughly USD94/bbl from yesterday\'s USD120/bbl peak...',
    category: 'GLOBAL BOTTOM LINE',
    timestamp: '3h ago'
  },
  {
    id: '2',
    title: 'TBN Bank morning brief',
    summary: 'Valuation-wise many assets appear mispriced within our framework, but given the geopolitics...',
    category: 'MACRO QUANT & DERIVATIVES',
    timestamp: '18h ago'
  },
  {
    id: '3',
    title: 'Eurozone Geopolitics: Vulnerable to Middle East shock',
    summary: 'The conflict is exposing the eurozone and the UK to higher energy costs...',
    category: 'EUROPE ECONOMICS',
    timestamp: '16h ago'
  }
];

const HERO_ITEMS = [
  {
    id: 'h1',
    title: 'The New Geopolitical Landscape',
    subtitle: 'How shifting alliances in the Middle East are reshaping energy markets for the next decade.',
    category: 'MARKET 100',
    tag: 'Special Report',
    image: 'https://picsum.photos/seed/finance_hero/1200/1600',
    color: 'emerald'
  },
  {
    id: 'h2',
    title: 'AI & Private Credit: The Next Frontier',
    subtitle: 'Exploring how machine learning is disrupting traditional credit assessment models.',
    category: 'CREDIT 100',
    tag: 'Deep Dive',
    image: 'https://picsum.photos/seed/ai_finance/1200/1600',
    color: 'blue'
  },
  {
    id: 'h3',
    title: 'Emerging Markets: The 2026 Outlook',
    subtitle: 'Why South East Asia remains the most resilient region in a high-rate environment.',
    category: 'SALES & TRADING',
    tag: 'Forecast',
    image: 'https://picsum.photos/seed/asia_finance/1200/1600',
    color: 'orange'
  }
];

const MARKET_DATA = [
  { symbol: 'S&P 500', value: '5,123.42', change: '+0.45%', up: true },
  { symbol: 'FTSE 100', value: '7,642.10', change: '-0.12%', up: false },
  { symbol: 'DAX', value: '18,015.32', change: '+0.82%', up: true },
  { symbol: 'NIKKEI', value: '38,450.00', change: '+1.24%', up: true },
  { symbol: 'BRENT', value: '94.20', change: '-2.10%', up: false },
  { symbol: 'GOLD', value: '2,154.30', change: '+0.32%', up: true },
];

const CATEGORIES = ['My Feed', 'Market 100', 'Credit 100', 'Sales & Trading', 'Economics', 'Strategy', 'Podcasts'];

const PODCAST_ITEMS: ContentItem[] = [
  {
    id: 'p1',
    title: 'TBN Credit Call: Geopolitics, Private Credit and AI',
    subtitle: 'Join our experts as they discuss the evolving landscape of private credit.',
    type: 'podcast',
    category: 'MARKET 100',
    timestamp: '4d ago',
    duration: '28 mins',
    imageUrl: 'https://picsum.photos/seed/finance1/800/450'
  },
  {
    id: 'p2',
    title: 'Macro Matters: The Fed\'s Next Move',
    subtitle: 'Analyzing the latest inflation data and what it means for interest rates.',
    type: 'podcast',
    category: 'SALES & TRADING',
    timestamp: '2d ago',
    duration: '15 mins',
    imageUrl: 'https://picsum.photos/seed/finance2/800/450'
  },
  {
    id: 'p3',
    title: 'Tech Trends: Fintech Disruption',
    subtitle: 'How digital banks are challenging traditional financial institutions.',
    type: 'podcast',
    category: 'CREDIT 100',
    timestamp: '1w ago',
    duration: '42 mins',
    imageUrl: 'https://picsum.photos/seed/finance3/800/450'
  }
];

const MARKET_100_ITEMS: ContentItem[] = [
  {
    id: 'm1',
    title: '360 on geopolitics: Middle East conflict and market implications',
    type: 'event',
    category: 'MARKET 100',
    timestamp: '7 mins ago',
    readTime: '1 min read'
  },
  {
    id: 'm2',
    title: 'EM rates: Re-engaging EURPLN xccy receivers',
    type: 'article',
    category: 'MARKET 100',
    timestamp: '27 mins ago',
    readTime: '1 min read'
  }
];

const SALES_TRADING_ITEMS: ContentItem[] = [
  {
    id: 's1',
    title: 'South Korea IRFX: USD/KRW opens around 1,470',
    type: 'article',
    category: 'SALES & TRADING',
    timestamp: '1h ago',
    readTime: '1 min read'
  },
  {
    id: 's2',
    title: 'G10 FX: Dollar strength persists amid geopolitical tensions',
    type: 'article',
    category: 'SALES & TRADING',
    timestamp: '3h ago',
    readTime: '2 min read'
  },
  {
    id: 's3',
    title: 'Commodities: Oil prices stabilize after recent volatility',
    type: 'article',
    category: 'SALES & TRADING',
    timestamp: '5h ago',
    readTime: '1 min read'
  }
];

const CREDIT_100_ITEMS: ContentItem[] = [
  {
    id: 'c1',
    title: 'US Lev Fin: AI Disruption Fears Broadening',
    type: 'article',
    category: 'CREDIT 100',
    timestamp: '20 Feb 2026',
    readTime: '1 min read'
  },
  {
    id: 'c2',
    title: 'European High Yield: Energy transition risks in focus',
    type: 'article',
    category: 'CREDIT 100',
    timestamp: '22 Feb 2026',
    readTime: '2 min read'
  },
  {
    id: 'c3',
    title: 'Private Credit: Direct lending vs syndicated loans',
    type: 'article',
    category: 'CREDIT 100',
    timestamp: '24 Feb 2026',
    readTime: '3 min read'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('My Feed');
  const [activeCategory, setActiveCategory] = useState('My Feed');

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden max-w-md mx-auto border-x border-white/5 font-sans">
      {/* Header */}
      <header className="flex flex-col pt-8 pb-2 glass sticky top-0 z-30 border-b border-white/5">
        <div className="flex items-center justify-between px-6 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp className="text-black w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-[0.2em] leading-none">TBN BANK</span>
              <span className="text-[10px] font-medium text-emerald-500/80 tracking-widest mt-0.5 uppercase">Markets 360</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Search className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#050505]" />
            </div>
          </div>
        </div>

        {/* Category Scroll */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-3 no-scrollbar mask-fade-right">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all relative pb-1 ${
                activeCategory === cat ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="cat-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Market Ticker */}
        <div className="py-3 bg-white/5 border-b border-white/5 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...MARKET_DATA, ...MARKET_DATA].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 border-r border-white/10">
                <span className="text-[10px] font-black tracking-widest text-gray-400">{item.symbol}</span>
                <span className="text-[10px] font-mono font-medium">{item.value}</span>
                <span className={`text-[9px] font-bold ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Carousel - Dribbble Style */}
        <section className="mt-6 mb-10 overflow-hidden">
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 horizontal-snap no-scrollbar mask-fade-right">
            {HERO_ITEMS.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[320px] relative h-[420px] rounded-[32px] overflow-hidden group cursor-pointer shadow-2xl"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute top-6 left-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase">Tuesday 11 March</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-black text-[10px] font-black px-2 py-0.5 rounded-sm tracking-tighter uppercase ${
                      item.color === 'emerald' ? 'bg-emerald-500' : 
                      item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                      {item.category}
                    </span>
                    <div className="h-px w-8 bg-white/30" />
                    <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">{item.tag}</span>
                  </div>
                  <h1 className="text-3xl font-bold leading-[1] tracking-tight mb-4 italic">
                    {item.title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {i === 1 ? <span className="text-emerald-400 not-italic">{word} </span> : word + ' '}
                        {i === 2 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="text-xs text-gray-300 line-clamp-2 max-w-[90%] mb-6 font-medium leading-relaxed">
                    {item.subtitle}
                  </p>
                  <button className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-400 transition-colors">
                    Read Analysis <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            {/* Peek card */}
            <div className="min-w-[40px]" />
          </div>
        </section>

        {/* Morning Updates - Horizontal Scroll with Peek */}
        <section className="mb-12">
          <div className="flex items-center justify-between px-6 mb-6">
            <div className="flex flex-col">
              <h2 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase">Daily Briefings</h2>
              <div className="h-1 w-6 bg-emerald-500 mt-1 rounded-full" />
            </div>
            <button className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 uppercase tracking-wider">
              Explore All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 horizontal-snap no-scrollbar mask-fade-right">
            {MORNING_UPDATES.map((update, idx) => (
              <motion.div 
                key={update.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[280px] bg-[#0d0d0d] p-6 rounded-[28px] border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-16 h-16 text-emerald-500" />
                </div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.15em] bg-emerald-500/10 px-2 py-1 rounded-md">
                    {update.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span className="text-[9px] font-bold">{update.timestamp}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-3 line-clamp-2 leading-tight group-hover:text-emerald-400 transition-colors">
                  {update.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-medium">
                  {update.summary}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0d0d0d] bg-gray-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${update.id}${i}`} alt="analyst" />
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-[#0d0d0d] bg-emerald-500 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-black">+2</span>
                    </div>
                  </div>
                  <Bookmark className="w-4 h-4 text-gray-700 hover:text-emerald-400 cursor-pointer transition-colors" />
                </div>
              </motion.div>
            ))}
            <div className="min-w-[60px] flex items-center justify-center">
               <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-400 transition-all">
                 <ChevronRight className="w-6 h-6" />
               </button>
            </div>
          </div>
        </section>

        {/* Audio Insights - Horizontal Scroll */}
        <section className="mb-12">
          <div className="flex items-center justify-between px-6 mb-6">
            <div className="flex flex-col">
              <h2 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase">Audio Insights</h2>
              <div className="h-1 w-6 bg-emerald-500 mt-1 rounded-full" />
            </div>
            <button className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 uppercase tracking-wider">
              Listen All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 horizontal-snap no-scrollbar mask-fade-right">
            {PODCAST_ITEMS.map((podcast, idx) => (
              <div key={podcast.id} className="min-w-[300px]">
                <PodcastCard podcast={podcast} />
              </div>
            ))}
            <div className="min-w-[40px]" />
          </div>
        </section>

        {/* Horizontal Category Sections */}
        <section className="mb-8">
          <div className="px-6 space-y-12">
            {/* Market 100 Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <h2 className="text-xs font-black tracking-[0.15em] text-white uppercase">Market 100</h2>
                </div>
                <button className="text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-0.5">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 horizontal-snap no-scrollbar mask-fade-right">
                {MARKET_100_ITEMS.map((item) => (
                  <div key={item.id} className="min-w-[240px]">
                    <ContentCard item={item} horizontal />
                  </div>
                ))}
                <div className="min-w-[40px]" />
              </div>
            </div>

            {/* Credit 100 Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <h2 className="text-xs font-black tracking-[0.15em] text-white uppercase">Credit 100</h2>
                </div>
                <button className="text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-0.5">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 horizontal-snap no-scrollbar mask-fade-right">
                {CREDIT_100_ITEMS.map((item) => (
                  <div key={item.id} className="min-w-[240px]">
                    <ContentCard item={item} horizontal />
                  </div>
                ))}
                <div className="min-w-[40px]" />
              </div>
            </div>

            {/* Sales & Trading Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <h2 className="text-xs font-black tracking-[0.15em] text-white uppercase">Sales & Trading</h2>
                </div>
                <button className="text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-gray-900 pb-0.5">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 horizontal-snap no-scrollbar mask-fade-right">
                {SALES_TRADING_ITEMS.map((item) => (
                  <div key={item.id} className="min-w-[240px]">
                    <ContentCard item={item} horizontal />
                  </div>
                ))}
                <div className="min-w-[40px]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation - Refined Glassmorphism */}
      <nav className="fixed bottom-6 left-6 right-6 max-w-[calc(100%-3rem)] mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] px-2 py-2 z-40 shadow-2xl">
        <div className="flex items-center justify-around">
          <NavItem 
            icon={<LayoutGrid />} 
            label="Feed" 
            active={activeTab === 'My Feed'} 
            onClick={() => setActiveTab('My Feed')} 
          />
          <NavItem 
            icon={<TrendingUp />} 
            label="Markets" 
            active={activeTab === 'Forecasts'} 
            onClick={() => setActiveTab('Forecasts')} 
          />
          <NavItem 
            icon={<Compass />} 
            label="Explore" 
            active={activeTab === 'Discover'} 
            onClick={() => setActiveTab('Discover')} 
          />
          <NavItem 
            icon={<Mic2 />} 
            label="Audio" 
            active={activeTab === 'Podcasts'} 
            onClick={() => setActiveTab('Podcasts')} 
          />
          <NavItem 
            icon={<MoreHorizontal />} 
            label="Menu" 
            active={activeTab === 'More'} 
            onClick={() => setActiveTab('More')} 
          />
        </div>
      </nav>
    </div>
  );
}

function ContentCard({ item, horizontal = false }: { item: ContentItem, horizontal?: boolean }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.96 }}
      className={`group cursor-pointer bg-[#0d0d0d] p-5 rounded-[24px] border border-white/5 hover:border-emerald-500/20 transition-all ${horizontal ? 'h-full flex flex-col justify-between' : ''}`}
    >
      <div>
        <div className="flex gap-2 items-center mb-3">
          <div className={`w-1.5 h-1.5 rounded-full ${
            item.type === 'event' ? 'bg-emerald-500' : 
            item.type === 'podcast' ? 'bg-purple-500' : 'bg-gray-500'
          }`} />
          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-gray-500">
            {item.type}
          </span>
          <span className="text-[9px] text-gray-800">•</span>
          <span className="text-[9px] font-bold text-gray-600">{item.timestamp}</span>
        </div>
        <h3 className="font-bold text-[15px] leading-tight group-hover:text-emerald-400 transition-colors mb-4 line-clamp-3">
          {item.title}
        </h3>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm ${
            item.category === 'MARKET 100' ? 'bg-emerald-500 text-black' :
            item.category === 'CREDIT 100' ? 'bg-blue-500 text-white' :
            'bg-orange-500 text-black'
          }`}>
            {item.category.split(' ')[0]}
          </span>
          {item.readTime && (
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-3 h-3" />
              <span className="text-[8px] font-bold">{item.readTime}</span>
            </div>
          )}
        </div>
        <Bookmark className="w-3.5 h-3.5 text-gray-700 hover:text-emerald-400 transition-colors" />
      </div>
    </motion.div>
  );
}

function PodcastCard({ podcast }: { podcast: ContentItem }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative bg-[#0d0d0d] rounded-[32px] overflow-hidden border border-white/5 shadow-xl h-full"
    >
      <div className="relative h-48">
        <img src={podcast.imageUrl} alt="Podcast" className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 group"
          >
            <Play className="text-black fill-black w-6 h-6 ml-1 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10">
          <div className="flex gap-0.5 items-end h-3">
            {[0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
              <motion.div 
                key={i}
                animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-0.5 bg-emerald-400 rounded-full"
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-white tracking-wider">{podcast.duration}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter ${
            podcast.category === 'MARKET 100' ? 'bg-emerald-500 text-black' :
            podcast.category === 'CREDIT 100' ? 'bg-blue-500 text-white' :
            'bg-orange-500 text-black'
          }`}>
            {podcast.category}
          </span>
          <span className="text-[10px] font-bold text-gray-600 ml-auto">{podcast.timestamp}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 tracking-tight leading-tight line-clamp-2">{podcast.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">{podcast.subtitle}</p>
      </div>
    </motion.div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center py-1 px-3 relative group"
    >
      <div className={`mb-1 transition-all duration-300 ${active ? 'text-emerald-400 scale-110' : 'text-gray-600 group-hover:text-gray-400'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </div>
      <span className={`text-[9px] font-bold tracking-wider transition-colors duration-300 ${active ? 'text-emerald-400' : 'text-gray-600'}`}>
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute -top-2 w-1 h-1 bg-emerald-400 rounded-full"
        />
      )}
    </button>
  );
}

