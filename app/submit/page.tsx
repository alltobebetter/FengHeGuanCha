import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "投稿 / 来信",
  description: "怎么联系作者、欢迎什么样的来信、不欢迎什么、版权与授权、隐私政策。",
  alternates: { canonical: "/submit" },
  openGraph: {
    title: "投稿 / 来信",
    description: "怎么联系作者、欢迎什么样的来信、不欢迎什么、版权与授权、隐私政策。",
    url: "/submit",
    type: "website",
  },
};

export default function Submit() {
  return (
    <main className="min-h-screen px-6 py-12 sm:py-20">
      <header className="mx-auto max-w-prose flex items-center justify-between text-sm text-[color:var(--muted)] mb-20">
        <a href="/" className="tracking-widest hover:text-[color:var(--ink)] transition-colors">
          缝 合 观 察
        </a>
        <span className="tracking-widest">2026 · 春</span>
      </header>

      <article className="mx-auto max-w-prose prose-article">
        <h1 className="text-3xl sm:text-4xl leading-snug mb-4 tracking-wide">
          投稿 / 建议 / 来信
        </h1>
        <p className="text-sm text-[color:var(--muted)] mb-12 tracking-wider">
          这里不是博客平台，但我欢迎一切有意思的来信
        </p>

        <p>
          这个站不开评论区、不接广告、不养社区——我个人受不了那些东西的精神负担。但<strong>我永远欢迎好的来信</strong>，无论是观点、反驳、选题建议、还是你写好的文章。
        </p>

        <h2>怎么联系我</h2>

        <p>
          一封邮件，发到：
        </p>

        <p className="my-8 text-center">
          <a
            href="mailto:admin@lool.click"
            className="inline-flex items-center gap-3 text-xl tracking-widest border-b-2 border-[color:var(--accent)] pb-1 hover:opacity-80 transition-opacity"
          >
            <Mail size={20} strokeWidth={1.5} />
            admin@lool.click
          </a>
        </p>

        <p>
          没有表单，没有验证码，没有"提交后等待审核 3–7 个工作日"。就是邮件。我看到会回，看不上的不会回——这是一种诚实。
        </p>

        <h2>欢迎什么样的来信</h2>

        <p>
          <strong>反驳</strong>。这个站发的每一篇都是主观批判，肯定有不少错的、片面的、过激的地方。如果你能把"哪一段不对、为什么不对、应该是什么"讲清楚，我大概率会改文、署名感谢、或者写一篇回应。<em>我对反驳的兴趣远高于对赞同的兴趣。</em>
        </p>

        <p>
          <strong>选题建议</strong>。你觉得哪件事在这个行业里被默认正确、却经不起推敲？告诉我。我未必会写，但好的选题我会记下来。
        </p>

        <p>
          <strong>整篇投稿</strong>。如果你写好了一篇，符合这个站的调性（主观、具体、踩过坑、不和稀泥），可以直接发过来。我会认真读。<strong>署名你来定</strong>——实名、笔名、匿名都行。
        </p>

        <p>
          <strong>纠错</strong>。事实错误、错别字、链接坏了、引用不准，告诉我，半小时内一般会改。
        </p>

        <h2>不欢迎什么</h2>

        <p>
          软文、推广、SEO 合作、互链请求——别浪费你和我的时间。任何带"我们公司"开头的合作邮件不会得到回复。
        </p>

        <p>
          单纯的情绪宣泄（"你写的都是垃圾"）也不会得到回复。但<strong>带具体论据的批判</strong>无论多激烈我都欢迎——这是两件不同的事。
        </p>

        <h2>关于版权和授权</h2>

        <h3>你看到的内容</h3>

        <p>
          本站所有文章默认<strong>保留所有权利（All Rights Reserved）</strong>。你可以：
        </p>

        <p>
          自由阅读、链接、引用（请保留来源链接 <code>lool.click</code>）；在你的私人笔记、聊天群、读书会里转述讨论。
        </p>

        <p>
          未经书面同意，请不要：整篇转载到其它平台（公众号、知乎、CSDN、掘金等）；用于商业用途（包括但不限于训练数据集售卖、付费文章合集、收费课程素材）；二次修改后冠以他人署名发布。
        </p>

        <p>
          想转载？发邮件，<strong>非商业、注明出处的转载请求基本上都会同意</strong>，只是希望被告知一下，让我知道这篇被搬到了哪里。
        </p>

        <h3>你投给我的内容</h3>

        <p>
          如果你给我发一篇文章希望我发布在这个站上，请明确写：
        </p>

        <p>
          <strong>署名方式</strong>（实名 / 笔名 / 匿名）。<br />
          <strong>授权范围</strong>（仅授权本站发布 / 同时允许我授权他人转载 / 公共领域 / CC 协议）。<br />
          <strong>是否允许我做编辑性修订</strong>（错别字、排版、轻微措辞 / 我可以提建议但不擅自改 / 不允许任何修改）。
        </p>

        <p>
          投稿默认意味着你<strong>拥有该文章的版权或合法授权</strong>，且不侵犯第三方权利——这条请你自己确保，否则后果由投稿者承担。
        </p>

        <p>
          如果文章被采用，我会保留你的署名和原文链接（如有）。<strong>我不付稿费</strong>——这个站不商业化，没收入也没支出预算，请你提前知情。
        </p>

        <h2>关于隐私</h2>

        <p>
          你发邮件给我的时候，我能看到你的邮箱地址。我不会把它给任何第三方、不会拿去注册任何东西、不会列入任何"订阅列表"。来信的内容如果不公开发布，<strong>我会当成私信对待</strong>。如果某句话我想引用进文章，会先问你。
        </p>

        <p>
          这个站本身不放任何分析脚本、不种 cookie、不搞用户行为追踪。访问日志只在服务器层面有最简的访问记录（IP、时间、路径），用于排查异常，不会主动分析。
        </p>

        <h2>最后</h2>

        <p>
          这个站会不会一直在？不知道。我可能哪天觉得没意思了就停更，但已经发出去的文章<strong>我承诺保留至少五年</strong>，链接不会随便失效。如果哪天真的要关站，我会提前一个月在首页公告。
        </p>

        <p>
          欢迎来信。
        </p>

        <p className="text-center my-12">
          <a
            href="mailto:admin@lool.click"
            className="inline-flex items-center gap-2 text-base tracking-widest border-b border-[color:var(--accent)] pb-1 hover:opacity-80 transition-opacity"
          >
            <Mail size={16} strokeWidth={1.5} />
            admin@lool.click
          </a>
        </p>

        <hr />

        <p className="text-center text-sm text-[color:var(--muted)] tracking-widest mt-16">
          —— 不是博客，是一封慢慢写的、没指定收件人的长信
        </p>
      </article>

      <footer className="mx-auto max-w-prose mt-24 pt-8 border-t border-[color:var(--rule)] text-xs text-[color:var(--muted)] flex justify-between tracking-widest">
        <span>© 缝合观察</span>
        <span>本页内容默认保留所有权利</span>
      </footer>
    </main>
  );
}
