import fs from "node:fs";
import path from "node:path";
import { ArrowRight, Mail, Pin } from "lucide-react";
import { posts } from "@/app/lib/posts";

/** 读文章源文件数 CJK 字符，JSX 标签都是 ASCII 不计入。 */
function countChars(slug: string): number {
  try {
    const file = path.join(process.cwd(), "app", "posts", slug, "page.tsx");
    const src = fs.readFileSync(file, "utf8");
    return (src.match(/[\u4e00-\u9fff]/g) || []).length;
  } catch {
    return 0;
  }
}

function formatLength(n: number): string {
  if (n === 0) return "";
  return `${n.toLocaleString()} 字`;
}

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 sm:py-20">
      <header className="mx-auto max-w-prose flex items-center justify-between text-sm text-[color:var(--muted)] mb-24">
        <span className="tracking-widest">缝 合 观 察</span>
        <span className="tracking-widest">2026 · 春</span>
      </header>

      <section className="mx-auto max-w-prose">
        <h1 className="text-4xl sm:text-5xl leading-tight mb-6 tracking-wide">
          缝合观察
        </h1>
        <p className="text-base text-[color:var(--muted)] leading-relaxed mb-4">
          这里不是博客。
        </p>
        <p className="text-base text-[color:var(--ink)] leading-relaxed mb-4">
          这里是一个偶尔写、不定期更新、不追热点、不接广告、不讨好任何人的<strong>个人观点存档</strong>。
        </p>
        <p className="text-base text-[color:var(--muted)] leading-relaxed mb-16">
          内容大多关于编程语言、软件工程、和这个行业里那些被默认正确、却经不起推敲的事。情绪可能偏激，立场一定主观，欢迎反对，但别期待我会改口。
        </p>

        <div className="border-t border-[color:var(--rule)] pt-16">
          <h2 className="text-xs tracking-[0.3em] text-[color:var(--muted)] mb-10 uppercase">
            文 章
          </h2>

          <ul className="space-y-12">
            {posts.map((post, i) => (
              <li key={i} className="group">
                {post.pinned && (
                  <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-[color:var(--accent)] mb-3 uppercase">
                    <Pin size={12} strokeWidth={1.8} />
                    <span>置 顶</span>
                  </div>
                )}

                <a href={`/posts/${post.slug}`} className="block">
                    <article>
                      <h3 className="text-xl sm:text-2xl leading-snug mb-3 tracking-wide text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[color:var(--ink)] mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex gap-4 text-xs tracking-widest text-[color:var(--muted)]">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{formatLength(countChars(post.slug))}</span>
                        <span className="ml-auto flex items-center gap-1 group-hover:text-[color:var(--accent)] transition-colors">
                          阅读
                          <ArrowRight size={12} strokeWidth={1.5} />
                        </span>
                      </div>
                  </article>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 pt-16 border-t border-[color:var(--rule)]">
          <h2 className="text-xs tracking-[0.3em] text-[color:var(--muted)] mb-6 uppercase">
            投 稿 · 来 信
          </h2>
          <p className="text-[15px] leading-relaxed text-[color:var(--ink)] mb-3">
            有反驳、有选题建议、或者你写好了一篇想投过来——欢迎写信。<strong>不开评论，只看邮件。</strong>
          </p>
          <p className="text-[15px] leading-relaxed text-[color:var(--muted)] mb-6">
            版权、授权、隐私等具体说明都在投稿页里。
          </p>
          <a
            href="/submit"
            className="inline-flex items-center gap-2 text-sm tracking-widest border-b border-[color:var(--accent)] pb-1 hover:opacity-80 transition-opacity"
          >
            <Mail size={14} strokeWidth={1.5} />
            前往投稿页
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <footer className="mx-auto max-w-prose mt-20 pt-8 border-t border-[color:var(--rule)] text-xs text-[color:var(--muted)] flex justify-between tracking-widest">
        <span>© 缝合观察</span>
        <span>慢慢写，慢慢读</span>
      </footer>
    </main>
  );
}
