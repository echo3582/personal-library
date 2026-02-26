// Mock data for the library app
export interface Book {
  id: string;
  title: string;
  author: string;
  category: CLCCategory;
  status: BookStatus;
  tags: string[];
  note?: string;
  addedDate: string;
}

export type BookStatus = 'unread' | 'reading' | 'read' | 'paused' | 'want-to-read';

export interface CLCCategory {
  code: string;
  name: string;
  nameEn: string;
}

export const CLC_CATEGORIES: CLCCategory[] = [
  { code: 'A', name: '马克思主义、列宁主义', nameEn: 'Marxism, Leninism' },
  { code: 'B', name: '哲学、宗教', nameEn: 'Philosophy, Religion' },
  { code: 'C', name: '社会科学总论', nameEn: 'Social Sciences' },
  { code: 'D', name: '政治、法律', nameEn: 'Politics, Law' },
  { code: 'E', name: '军事', nameEn: 'Military' },
  { code: 'F', name: '经济', nameEn: 'Economics' },
  { code: 'G', name: '文化、科学、教育、体育', nameEn: 'Culture, Education, Sports' },
  { code: 'H', name: '语言、文字', nameEn: 'Language, Linguistics' },
  { code: 'I', name: '文学', nameEn: 'Literature' },
  { code: 'J', name: '艺术', nameEn: 'Arts' },
  { code: 'K', name: '历史、地理', nameEn: 'History, Geography' },
  { code: 'N', name: '自然科学总论', nameEn: 'Natural Sciences' },
  { code: 'O', name: '数理科学和化学', nameEn: 'Mathematics, Chemistry' },
  { code: 'P', name: '天文学、地球科学', nameEn: 'Astronomy, Earth Sciences' },
  { code: 'Q', name: '生物科学', nameEn: 'Biological Sciences' },
  { code: 'R', name: '医药、卫生', nameEn: 'Medicine, Health' },
  { code: 'S', name: '农业科学', nameEn: 'Agricultural Sciences' },
  { code: 'T', name: '工业技术', nameEn: 'Industrial Technology' },
  { code: 'TP', name: '计算机技术', nameEn: 'Computer Technology' },
  { code: 'U', name: '交通运输', nameEn: 'Transportation' },
  { code: 'V', name: '航空、航天', nameEn: 'Aviation, Aerospace' },
  { code: 'X', name: '环境科学、安全科学', nameEn: 'Environmental Sciences' },
  { code: 'Z', name: '综合性图书', nameEn: 'Comprehensive Books' },
];

export const BOOK_STATUS_LABELS: Record<BookStatus, { zh: string; color: string }> = {
  'unread': { zh: '未读', color: 'bg-gray-100 text-gray-700' },
  'reading': { zh: '阅读中', color: 'bg-blue-100 text-blue-700' },
  'read': { zh: '已读', color: 'bg-green-100 text-green-700' },
  'paused': { zh: '暂停', color: 'bg-yellow-100 text-yellow-700' },
  'want-to-read': { zh: '想读', color: 'bg-purple-100 text-purple-700' },
};

// Sample books
export const mockBooks: Book[] = [
  {
    id: '1',
    title: '人间失格',
    author: '太宰治',
    category: CLC_CATEGORIES.find(c => c.code === 'I')!,
    status: 'read',
    tags: ['日本文学', '小说'],
    note: '深刻的自我剖析',
    addedDate: '2026-01-15',
  },
  {
    id: '2',
    title: '西方哲学史',
    author: '罗素',
    category: CLC_CATEGORIES.find(c => c.code === 'B')!,
    status: 'reading',
    tags: ['哲学', '历史'],
    addedDate: '2026-01-20',
  },
  {
    id: '3',
    title: '明朝那些事儿',
    author: '当年明月',
    category: CLC_CATEGORIES.find(c => c.code === 'K')!,
    status: 'want-to-read',
    tags: ['历史', '明朝'],
    addedDate: '2026-02-01',
  },
  {
    id: '4',
    title: '深入理解计算机系统',
    author: 'Randal E. Bryant',
    category: CLC_CATEGORIES.find(c => c.code === 'TP')!,
    status: 'reading',
    tags: ['计算机', '系统'],
    addedDate: '2026-02-10',
  },
  {
    id: '5',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    category: CLC_CATEGORIES.find(c => c.code === 'I')!,
    status: 'unread',
    tags: ['拉美文学', '魔幻现实主义'],
    addedDate: '2026-02-15',
  },
  {
    id: '6',
    title: '经济学原理',
    author: '曼昆',
    category: CLC_CATEGORIES.find(c => c.code === 'F')!,
    status: 'paused',
    tags: ['经济学', '教材'],
    addedDate: '2026-02-20',
  },
];
