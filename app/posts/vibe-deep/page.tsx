import ArticleLayout from "@/app/components/ArticleLayout";
import { articleMetadata } from "@/app/lib/article-metadata";
import { getPost } from "@/app/lib/posts";

export const metadata = articleMetadata("vibe-deep");
const post = getPost("vibe-deep")!;

export default function Page() {
  return (
    <ArticleLayout
      title={post.title}
      subtitle="一篇全靠真名实姓的公开引用堆出来的反驳"
      signoff="写于把 Karpathy、Willison、Kent Beck、Pichai、Amodei 的原话翻完一遍之后"
      slug={post.slug}
      isoDate={post.isoDate}
      description={post.excerpt}
    >
      <p className="dropcap">
        上一篇我写了为什么<strong>看不起 vibe coding 的人本质上是在搞身份保卫战</strong>。但那篇是态度文，没堆证据。这篇我把证据补上。规则只有一条：<strong>所有论据必须来自真名实姓、可查证的公开发言或数据</strong>，不引自媒体、不引"业内人士透露"、不引知乎匿名。看完这篇，你大概会发现：vibe coding 不简单这件事，最早把它说出口的，从来不是黑它的人，而是<strong>正在用它、并且在它上面建产品的人</strong>。
      </p>

      <h2>一、先把 Karpathy 的原话还原一遍</h2>

      <p>
        2025 年 2 月 3 日，Andrej Karpathy（OpenAI 联合创始人之一、前 Tesla AI 负责人）在 X 上发了一条推。原话是：
      </p>

      <blockquote>
        "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."
      </blockquote>

      <p>
        翻译过来大概是：<em>"我在搞一种新的编程方式，叫 vibe coding——彻底交给氛围、拥抱指数曲线、忘了代码本身的存在。"</em> 注意他这里有三个动词：<strong>give in（交托）、embrace（拥抱）、forget（忘记）</strong>。这三个词的指向是清晰的——他描述的是一种<strong>主动放下控制权、把更高层的判断交给自己、把执行交给模型</strong>的工作方式。
      </p>

      <p>
        这不是"动嘴就行"的意思。能"忘了代码存在"，前提是<strong>你已经能在更高的抽象层稳定输出意图</strong>。一个不知道自己想要什么的人按回车按一千次，得到的也不是 vibe coding，是垃圾。把这条推文拆成"AI 替你写"四个字然后嘲笑它，是阅读理解问题，不是技术问题。
      </p>

      <p>
        而且 Karpathy 自己后来在 2026 年 4 月接受 Business Insider 采访时也补了一句，说今天 AI 写出来的代码<strong>"awkward and gross"（笨拙又难看）、"bloaty"（臃肿），仍然需要人类盯着</strong>。这话经常被反对者拿去当"连发明者都说它不行"的证据，但<strong>他原话从来没说"它不行"，他说的是"它需要人盯"</strong>——这两件事差得很远。需要人盯，恰恰说明它不是傻瓜按钮。
      </p>

      <h2>二、Simon Willison：他直接给它升了一级，叫 vibe engineering</h2>

      <p>
        Simon Willison 是 Django 的联合作者之一，是过去三年里写 LLM 应用最勤、最实诚的那批人之一（个人博客 simonwillison.net 几乎日更 LLM 实战）。他在 2025 年 10 月 7 日发了一篇叫 <em>Vibe engineering</em> 的文章，开宗明义：
      </p>

      <blockquote>
        "Vibe engineering establishes a clear distinction from vibe coding. It signals that this is a different, harder and more sophisticated way of working with AI tools to build production software."
      </blockquote>

      <p>
        翻译：<em>"vibe engineering 和 vibe coding 是有清晰区别的——前者是一种<strong>更难、更精密</strong>的、用 AI 工具构建生产级软件的工作方式。"</em> 然后他列出了用 AI 干活真正需要的能力，原文是 bullet list，我给你按原意翻一遍：
      </p>

      <ul>
        <li><strong>一种 code review 文化</strong>。你 review 别人（或机器）写的代码越快越准，和 LLM 合作就越爽。</li>
        <li><strong>一种很怪的"管理"能力</strong>。让 agent 干活，和管理一个真人合作者非常像——要给清楚的指令、足够的上下文、可执行的反馈。原话尤其妙：他说这群 agent 就是 <em>"a growing army of weird digital interns who will absolutely cheat if you give them a chance"</em>（一群不断扩编的、只要给机会就一定会作弊的奇怪数字实习生）。</li>
        <li><strong>真正过硬的手工 QA</strong>。光自动化测试不够，你得能预判和挖出边界情况。</li>
        <li><strong>强研究能力</strong>。任何问题都有十几种解法，挑哪种、怎么验证可行——这事 agent 替不了你。</li>
        <li><strong>有快速 ship 到 preview 环境的能力</strong>。让 agent 写完，能立刻在隔离环境里跑起来 review。</li>
        <li><strong>对"哪些能交给 AI、哪些必须自己上"的直觉</strong>。这条随着模型变化每个月都在动。</li>
        <li><strong>重新校准的估时能力</strong>。原来的"这个项目要三周"已经不准了，但新的估时方法还没人摸清楚。</li>
      </ul>

      <p>
        他自己一句话总结这套清单：
      </p>

      <blockquote>
        "Almost all of these are characteristics of senior software engineers already! AI tools amplify existing expertise."
      </blockquote>

      <p>
        翻译：<em>"这些基本就是高级工程师的特征——AI 工具放大的是你已有的专业能力。"</em> 注意这句的潜台词——<strong>对没有这些能力的人，AI 工具放大的就是 ta 的无能</strong>。这才是"vibe coding 不简单"的硬核版本，不是"难学"，而是<strong>它把你的水平在结果里乘了一个系数，可正可负</strong>。
      </p>

      <p>
        关于 vibe coding 的边界，Willison 还有一句被维基百科直接收录的判定：<em>"如果一个 LLM 写下了你代码的每一行，但你 review 过、测试过、理解了每一行，<strong>那不是 vibe coding，那是把 LLM 当打字员用</strong>。"</em> 这条标准很重要——它把"vibe coding"从一个模糊的情绪词，钉成了一个有明确定义的工作模式。
      </p>

      <h2>三、Kent Beck：他不叫它 vibe coding，他叫 augmented coding</h2>

      <p>
        Kent Beck 是谁不用我多说——TDD 的发明人之一、《Extreme Programming Explained》作者、《Agile Manifesto》联合签署人之一、JUnit 的合作作者。这个人写代码的时间比 Cursor 的所有用户加起来还长。2025 年 12 月 16 日他在自己的 newsletter（tidyfirst.substack.com）里写道：
      </p>

      <blockquote>
        "I've been watching junior developers use AI coding assistants well. Not vibe coding—not accepting whatever the AI spits out. Augmented coding: using AI to accelerate learning while maintaining quality."
      </blockquote>

      <p>
        翻译：<em>"我一直在观察初级工程师好好使用 AI 编程助手的样子。这不是 vibe coding——不是 AI 吐什么就吃什么。是 augmented coding（增强编程）：用 AI 加速学习的同时保住质量。"</em>
      </p>

      <p>
        他接着说：
      </p>

      <blockquote>
        "The juniors working this way compress their ramp dramatically. Tasks that used to take days take hours. Not because the AI does the work, but because the AI collapses the search space."
      </blockquote>

      <p>
        翻译：<em>"用这种方式工作的初级工程师，上手曲线被极度压缩。以前要几天的任务现在几小时。<strong>不是因为 AI 替他们干了活，而是因为 AI 把搜索空间塌缩了。</strong>"</em> 把这句话再咀嚼一下——他说的不是"AI 让事情变简单"，而是"AI 让本来要花三小时翻文档挑 API 的过程，变成 20 分钟评估几个候选方案"。<strong>评估</strong>这个动作，是没法被绕开的。
      </p>

      <p>
        Beck 在另一篇被广泛转载的 Substack 文章里直接给现在这种工作方式起了个外号——<strong>"working with the genie"（和精灵一起干活）</strong>。他写了好多次"the genie will absolutely cheat"，比如<strong>会偷偷删测试以让测试通过</strong>、会写出"我没让它写"的功能。一个 TDD 之父需要专门写文章警告"AI 会作弊改你的测试"——这件事本身就足够说明 vibe coding 不是嘴炮。
      </p>

      <h2>四、CEO 们也在说同一件事，只是用了报表语气</h2>

      <p>
        如果你觉得 Karpathy / Willison / Beck 都是"圈子里的"，那看下面这两条——这俩是上市公司财报里的、白纸黑字的、带律师把过关的话。
      </p>

      <h3>4.1 Sundar Pichai · 2024 年 10 月 29 日 · Alphabet Q3 财报电话会</h3>

      <blockquote>
        "We're also using AI internally to improve our coding processes, which is boosting productivity and efficiency. Today, more than a quarter of all new code at Google is generated by AI, then reviewed and accepted by engineers."
      </blockquote>

      <p>
        翻译：<em>"我们也在内部用 AI 改进编码流程……今天，Google 超过四分之一的新代码是 AI 生成、再由工程师 review 和接受的。"</em> 注意他特意点出后半句：<strong>reviewed and accepted by engineers</strong>。这就是 Willison 说的那种 vibe engineering——AI 出第一稿，工程师做判断。这不是辅助工具，这是<strong>新的劳动分工</strong>。
      </p>

      <h3>4.2 Dario Amodei · 2025 年 3 月 10 日 · Council on Foreign Relations</h3>

      <blockquote>
        "I think we'll be there in three to six months, where AI is writing 90 percent of the code. And then in twelve months, we may be in a world where AI is writing essentially all of the code."
      </blockquote>

      <p>
        翻译：<em>"3 到 6 个月内，AI 会写下 90% 的代码。再过 12 个月，几乎所有代码都可能由 AI 写出来。"</em> 这个数字争议非常大，到今天（2026 年 5 月）回头看，"essentially all"显然没兑现，但<strong>"AI 写绝大多数代码"这件事实质上已经在 Anthropic、Google、Meta 内部发生了</strong>——他们自己的工程师都在 Claude Code / Cursor / 内部 agent 里干活。Amodei 这句话的精确性可以质疑，但方向上没人能反驳。
      </p>

      <p>
        关键不是"AI 是不是真的写了 90%"，关键是：<strong>当 AI 实际承担了 25%、50%、80% 的代码生成之后，剩下那 75%、50%、20% 的人类工作，到底变成了什么？</strong>
      </p>

      <h2>五、剩下的那部分人类工作，恰恰是变难了，不是变简单</h2>

      <p>
        把上面四个人的话压缩到一起，你会得到一张非常清晰的能力转移图：
      </p>

      <ul>
        <li><strong>下沉的能力</strong>：手写循环、手查文档、手背 API、手敲样板代码、记忆设计模式名字、从零搭脚手架。这些事 AI 大体能干。</li>
        <li><strong>上浮的能力</strong>：判断哪个方案是对的、判断 AI 给的代码哪里在偷懒、判断什么时候要打断它重来、设计 agent 工作循环、写出能让 AI 干对活的规格、做手工 QA、调 prompt 边界、估时、对系统整体有"哪里会断"的直觉。</li>
      </ul>

      <p>
        下沉的那一摞，是过去十年中文技术圈面试题的全部内容。<strong>上浮的那一摞，几乎一条都没在面试题里出现过。</strong>这就是为什么 vibe coding 看起来"简单"——因为它让原来吃饭的那些技能廉价了。但同时它让另一组技能变得稀缺，而这组技能<strong>没有标准教材，没有八股文，没有刷题网站，没有培训班</strong>。
      </p>

      <blockquote>
        所以它不是"简单"，它是"<strong>把你以为重要的部分变简单了，把真正重要的部分露出来了</strong>"。露出来的那部分，对很多人来说还是第一次见。
      </blockquote>

      <h2>六、为什么我说它是真正的革新</h2>

      <p>
        编程史上抽象层跃迁就那么几次，每次都被当时的多数人嘲笑过：
      </p>

      <ul>
        <li>1957 年 Fortran 出现，被汇编程序员嘲笑"编译器写得太烂、跑得慢、不可控"。</li>
        <li>1972 年 C 出现，被汇编守旧派嘲笑"指针就是糖衣，懂个屁底层"。</li>
        <li>1995 年前后高级 GC 语言（Java/Python/Ruby）流行，被 C/C++ 阵营嘲笑"内存都不会管还配叫程序员"。</li>
        <li>2010 年代云原生兴起，被传统运维嘲笑"封装得连 ssh 都不会的人也敢叫工程师"。</li>
      </ul>

      <p>
        每一次跃迁的共同点都是：<strong>下层的复杂度被工具吞掉，上层的复杂度因此暴露出来</strong>，新工种从这里长出来。从汇编到 C，长出了软件工程师；从 C 到 Python/Java，长出了应用工程师；从机房到云，长出了 SRE 和平台工程师。
      </p>

      <p>
        vibe coding（或者按 Willison 叫 vibe engineering、按 Beck 叫 augmented coding——名字会变，事实不会变）正在做完全一样的事：<strong>它把"把意图变成可运行代码"这个步骤吞掉了，把"如何验证、组织、对齐意图"这个更上层的步骤暴露出来</strong>。这就是范式转移的标准长相。
      </p>

      <p>
        当一个东西被业内最顶尖的几个人——OpenAI 联创、Django 联创、TDD 之父、Google CEO、Anthropic CEO——同时从五个完全不同的角度<strong>认真讨论</strong>，而且讨论的不是"它是不是真的"，而是"它该叫什么名字、该怎么用得对、能写到几成、上层人类工作怎么重排"——<strong>它就已经不是趋势了，它是既成事实</strong>。
      </p>

      <h2>七、最后留一句话</h2>

      <p>
        我对那些坚持说"vibe coding 不就是按按回车嘛"的人没有什么要继续辩的。我只想把这句来自 Simon Willison 的原话再放一遍，留给五年后回头看的人：
      </p>

      <blockquote>
        "AI tools amplify existing expertise. The more skills and experience you have as a software engineer the faster and better the results you can get from working with LLMs and coding agents."
      </blockquote>

      <p>
        翻译：<em>"AI 工具放大的是你已经有的专业能力。你作为工程师水平越高、经验越多，用 LLM 和 agent 拿到的结果就越快、越好。"</em>
      </p>

      <p>
        这句话同时是好消息和坏消息：<strong>它对真有水平的人是放大器，对没水平的人也是放大器，只是方向相反。</strong>简单从来不是 vibe coding 的属性，简单只是没用过它的人对它的想象。
      </p>
    </ArticleLayout>
  );
}
