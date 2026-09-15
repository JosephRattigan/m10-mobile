export type ContentType = 'article' | 'podcast' | 'event';
export type Category = 'MARKET 100' | 'CREDIT 100' | 'SALES & TRADING';

export interface ContentItem {
  id: string;
  title: string;
  subtitle?: string;
  type: ContentType;
  category: Category;
  timestamp: string;
  readTime?: string;
  duration?: string;
  imageUrl?: string;
  isNew?: boolean;
  isBookmarked?: boolean;
}

export interface MorningUpdate {
  id: string;
  title: string;
  summary: string;
  category: string;
  timestamp: string;
}
