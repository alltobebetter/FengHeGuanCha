"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  /** 副标题前缀（描述性文字），后面会自动拼接字数和阅读时长 */
  subtitle: string;
  /** 文末签名行，例：写于一次又一次被 NullPointerException 之后 */
  signoff?: string;
  /** 文章 ISO 日期 · 用于 JSON-LD 结构化数据 */
  isoDate?: string;
  /** 文章 slug · 用于 JSON-LD URL */
  slug?: string;
  /** 作者 */
  author?: string;
  /** 描述 · 用于 JSON-LD */
  description?: string;
  children: ReactNode;
};

export default function ArticleLayout({
  title,
  subtitle,
  signoff,
  isoDate,
  slug,
  author,
  description,
  children,
}: Props) {
  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [meta, setMeta] = useState<{ chars: number; minutes: number } | null>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    // 1. 扫 h2 生成 TOC
    const h2s = Array.from(article.querySelectorAll("h2"));
    const items = h2s.map((h, i) => {
      const text = (h.textContent || "").trim();
      const id = `sec-${i + 1}`;
      h.id = id;
      // 给 h2 加滚动偏移，避免锚点跳到顶部被进度条挡住
      (h as HTMLElement).style.scrollMarginTop = "2rem";
      return { id, text };
    });
    setToc(items);

    // 2. 自动计算字数 + 阅读时长
    const text = article.innerText || "";
    const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const words = (text.match(/[a-zA-Z0-9]+/g) || []).length;
    const total = cjk + words;
    // 中文阅读速度约 400 字/分钟
    const minutes = Math.max(1, Math.round(total / 400));
    setMeta({ chars: total, minutes });

    // 3. 滚动监听：进度条 + 当前章节高亮
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, scrollY / docH) : 0);

      let current = items[0]?.id || "";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = it.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jsonLd = isoDate && slug ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || subtitle,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: author || "缝合观察",
    },
    publisher: {
      "@type": "Organization",
      name: "缝合观察",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lool.click/posts/${slug}`,
    },
    wordCount: meta?.chars,
    inLanguage: "zh-CN",
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* 顶部阅读进度条 */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
      >
        <div
          className="h-full bg-[color:var(--accent)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <main className="min-h-screen px-6 py-12 sm:py-20">
        <header className="mx-auto max-w-prose flex items-center justify-between text-sm text-[color:var(--muted)] mb-20">
          <a
            href="/"
            className="tracking-widest hover:text-[color:var(--ink)] transition-colors"
          >
            缝 合 观 察
          </a>
          <span className="tracking-widest">2026 · 春</span>
        </header>

        <article ref={articleRef} className="mx-auto max-w-prose prose-article">
          <h1 className="text-3xl sm:text-4xl leading-snug mb-4 tracking-wide">
            {title}
          </h1>
          <p className="text-sm text-[color:var(--muted)] mb-12 tracking-wider">
            {subtitle}
            {meta && (
              <>
                {" · "}
                共 {meta.chars.toLocaleString()} 字 · 阅读约 {meta.minutes} 分钟
              </>
            )}
          </p>

          {/* 目录 */}
          {toc.length > 1 && (
            <details className="mb-12 border-y border-[color:var(--rule)] py-4 group">
              <summary className="cursor-pointer text-xs tracking-[0.3em] text-[color:var(--muted)] uppercase select-none list-none flex items-center justify-between hover:text-[color:var(--ink)] transition-colors">
                <span>目 录</span>
                <ChevronRight
                  size={14}
                  className="group-open:rotate-90 transition-transform"
                  strokeWidth={1.5}
                />
              </summary>
              <ol className="mt-5 space-y-2 text-[15px] leading-relaxed">
                {toc.map((it, i) => (
                  <li key={it.id} className="flex gap-3">
                    <span className="text-[color:var(--muted)] tabular-nums w-6 shrink-0 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${it.id}`}
                      data-active={activeId === it.id}
                      className="text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors data-[active=true]:text-[color:var(--accent)] data-[active=true]:font-medium"
                    >
                      {it.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          {children}

          {signoff && (
            <>
              <hr />
              <p className="text-center text-sm text-[color:var(--muted)] tracking-widest mt-16">
                —— {signoff}
              </p>
            </>
          )}
        </article>

        <footer className="mx-auto max-w-prose mt-24 pt-8 border-t border-[color:var(--rule)] text-xs text-[color:var(--muted)] flex justify-between tracking-widest">
          <span>© 缝合观察</span>
          <span>本文仅代表作者本人主观情绪</span>
        </footer>
      </main>
    </>
  );
}
