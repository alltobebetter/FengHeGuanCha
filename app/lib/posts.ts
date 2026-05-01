export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // 显示用 e.g. "2026 · 04 · 30"
  isoDate: string; // ISO 8601 e.g. "2026-04-30"
  pinned?: boolean;
};

export const SITE_NAME = "缝合观察";
export const SITE_URL = "https://lool.click";
export const SITE_EMAIL = "admin@lool.click";
export const SITE_DESCRIPTION =
  "一个偶尔写、不定期更新、不追热点、不接广告的个人观点存档。";
export const AUTHOR = "缝合观察";

export const posts: Post[] = [
  {
    slug: "java",
    title: 'Java 是怎么靠时代红利，把一身设计缺陷活成"行业标准"的',
    excerpt:
      'Java 不是因为它"好"才流行的，而是因为它恰好在 2000 年前后那段窗口期出现，恰好赶上互联网爆发，恰好被 Sun、IBM、Oracle 三家联手推上了企业级神坛——一篇九千字的纯主观批判。',
    date: "2026 · 04 · 30",
    isoDate: "2026-04-30",
    pinned: true,
  },
  {
    slug: "python",
    title: "都说 Python 慢——其实你只是不会用",
    excerpt:
      'Python 慢是事实，但"慢到不能用"是误解。NumPy、Cython、PyPy、Numba、asyncio、3.13 的 free-threaded 和 JIT……这些工具存在的意义就是把 Python 的瓶颈一层层打掉。一篇关于"慢"这个词被滥用了三十年的反驳。',
    date: "2026 · 04 · 12",
    isoDate: "2026-04-12",
  },
  {
    slug: "rubric",
    title: "我用来评价一门编程语言的提示词",
    excerpt:
      '看一门语言好不好，别看 benchmark、别看招聘市场、别凭语感。把"好不好"拆成八条具体、加权、可观察的标准，然后照着量。这是一份我个人在用的语言体检表，附带怎么写这种提示词的几条原则，以及它对主流语言的粗评。',
    date: "2026 · 03 · 22",
    isoDate: "2026-03-22",
  },
  {
    slug: "go",
    title: "Go 不是划时代的语言，但它是划时代的工程",
    excerpt:
      "Go 是一个二流的语言设计 + 一流的工程实现 = 划时代的产品。它没发明任何新东西——goroutine 是 1978 的 CSP，结构类型来自 Smalltalk，组合优于继承是老建议。但它定义了云原生时代后端服务该长什么样。一篇关于设计创新与工程胜利的区分。",
    date: "2026 · 03 · 05",
    isoDate: "2026-03-05",
  },
  {
    slug: "enterprise",
    title: '为什么我不再相信"企业级"这三个字',
    excerpt:
      '"企业级"在中文技术圈是一个魔咒：意思是"复杂得让人不敢质疑"。从 EJB 到 Spring，从 Dubbo 到 Nacos，每一代企业级方案都在用复杂度证明自己存在的合理性。一篇关于复杂度崇拜、表演型工程、和"够用就好"的反企业级范式。',
    date: "2026 · 02 · 14",
    isoDate: "2026-02-14",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
