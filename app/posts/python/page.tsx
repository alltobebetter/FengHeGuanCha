import ArticleLayout from "@/app/components/ArticleLayout";
import { articleMetadata } from "@/app/lib/article-metadata";
import { getPost } from "@/app/lib/posts";

export const metadata = articleMetadata("python");
const post = getPost("python")!;

export default function Page() {
  return (
    <ArticleLayout
      title={post.title}
      subtitle='一次面对"Python 慢党"的全方位反驳'
      signoff="写于一次又一次被 import 的清晨"
      slug={post.slug}
      isoDate={post.isoDate}
      description={post.excerpt}
    >
        <p className="dropcap">
          每次在群里、在评论区、在面试现场听到一句"Python 慢"，我心里都有同一个疑问：<strong>你跑过什么？</strong> 你跑了一段未优化的纯 Python 数值循环，对比了一段精心写的 C，然后得出"Python 慢"这个结论？还是你听说过这件事，转手就把它当成了真理？这篇文章不为 Python 翻案——它本来就不需要——它只是想把这个被滥用了三十年的"慢"字，拆成几个粒度，一个个看清楚。
        </p>

        <p>
          先说清我的立场：<strong>我不否认 Python 在某些维度上慢</strong>。纯 CPython 跑紧密数值循环，比 C 慢 50 倍是常事，比 Java 慢 5–20 倍也很正常。GIL 限制了多线程在 CPU 密集场景下的扩展能力。启动比 Go 慢，部署比 Rust 重。<strong>这些都是真的。</strong> 但是——把"某些维度上慢"翻译成"Python 不能用于严肃工程"，这是一次彻头彻尾的偷换概念。我下面就一条条拆给你看。
        </p>

        <h2>一、先搞清楚一件事：你说的"慢"，是哪种慢？</h2>

        <p>
          性能这个词在工程里至少有四种粒度，每一种的瓶颈完全不同：
        </p>

        <p>
          <strong>1. CPU 密集型（数值计算、科学计算、机器学习内核）</strong>。这是 Python 最被诟病的一类。纯 Python 跑两层 for 循环算矩阵乘法，确实能比 C 慢 50 倍。<em>但谁会用纯 Python 算矩阵乘法？</em> 这是后面要讲的"工具箱问题"。
        </p>

        <p>
          <strong>2. IO 密集型（Web 后端、爬虫、数据管道）</strong>。这是 90% 的服务端代码的真实场景。一个 HTTP 请求里，<strong>语言执行时间通常只占 1%，剩下 99% 在等数据库、等缓存、等下游 API、等磁盘</strong>。这种场景下，Python 和 Go、和 Java、和 Rust 的差距，在端到端延迟上几乎看不出来。
        </p>

        <p>
          <strong>3. 启动 / 冷启动</strong>。Python 启动确实比 Go 慢（解释器加载 + 模块导入），但比 JVM 快得多。Spring Boot 应用冷启动十几秒是常事，Python FastAPI 一般在一秒以内。Serverless 场景下 Python 反而是优等生。
        </p>

        <p>
          <strong>4. 内存占用</strong>。Python 对象有头部开销，每个 <code>int</code> 都是堆上对象，内存效率不如 Go 和 Rust。但比 JVM 的"先吃 1G 再说"已经斯文得多了。
        </p>

        <p>
          说"Python 慢"的人，<strong>99% 想的是第 1 种，但他们的工作 99% 是第 2 种</strong>。这就是这场争论最荒唐的地方。
        </p>

        <h2>二、Python 性能工具箱：你只是不会用</h2>

        <p>
          Python 慢党的另一个盲区是：<strong>把"纯 CPython"当成了 Python 的全部</strong>。但 Python 的真实形态是<em>"一个胶水语言 + 一整套加速生态"</em>。你抱怨纯 Python 慢，就像抱怨 SQL 不能写 GUI 一样——它本来就不是干那个的。
        </p>

        <h3>NumPy / Pandas：把热点代码丢给 C</h3>

        <p>
          NumPy 底层是 C 和 Fortran（BLAS、LAPACK），向量化操作的速度和原生 C 在一个量级。一个矩阵乘法 <code>A @ B</code>，纯 Python 嵌套循环跑 30 秒的事，NumPy 一行 30 毫秒。<strong>这不是优化，这是 Python 的标准用法</strong>。整个科学计算、深度学习、数据分析生态都建立在这个范式上：<em>Python 写逻辑，C 跑数字</em>。
        </p>

        <p>
          有人会说"那不就是 C 的功劳吗？" 朋友，<strong>能让你用一行 Python 调出一段精心优化的 C，本身就是 Python 的价值</strong>。Java 也想这么干，做出来是 JNI——一个让人闻风丧胆的东西。Python 做出来是 NumPy，全世界用了三十年。这就是设计差距。
        </p>

        <h3>PyPy：把 CPython 替换成 JIT 解释器</h3>

        <p>
          PyPy 是 Python 的另一个实现，自带 tracing JIT，对纯 Python 代码<strong>平均提速 3–6 倍</strong>，热点代码能到 10 倍以上。绝大多数纯 Python 项目把 <code>python</code> 改成 <code>pypy</code> 就能直接受益，几乎零改动。它不是万灵药（C 扩展兼容性是历史痛点），但对于"我有一段算法想跑快点"的场景，足够。
        </p>

        <h3>Numba：一个装饰器，提速 100 倍</h3>

        <p>
          Numba 是 Anaconda 出品的 JIT 编译器，对数值代码尤其凶狠。给函数加一个 <code>@njit</code> 装饰器，它就把这段 Python 编译成 LLVM IR、再编译成机器码，<strong>常见数值循环能从 10 秒压到 0.1 秒</strong>，逼近 C/Fortran 速度。还能一行 <code>@cuda.jit</code> 上 GPU。<em>这是其它语言用户做梦都想要的工程体验。</em>
        </p>

        <h3>Cython / mypyc：把 Python 直接编译成 C</h3>

        <p>
          Cython 让你在 Python 里写 C 类型注解，编译成 .so 加载。pandas、scikit-learn、spaCy 大量使用。mypyc 更进一步，能把带类型注解的纯 Python 直接编译成 C 扩展，黑盒优化，无需改代码。<strong>Mypy 自己就是用 mypyc 编译加速的</strong>，提速约 4 倍。
        </p>

        <h3>Cython 之外：C/C++/Rust 扩展</h3>

        <p>
          Python 的 C API 是它的灵魂。<code>cffi</code>、<code>ctypes</code>、<code>pybind11</code>、<code>PyO3</code>（Rust 绑定）让你随时可以把热点丢给底层语言。Polars、Pydantic V2、ruff、uv 这些近几年炸场的"Python 工具"，<strong>底层全是 Rust</strong>——这不是 Python 的失败，这是 Python 生态的胜利：<em>用最适合表达逻辑的语言写表层，用最适合压榨性能的语言写底层</em>。
        </p>

        <h3>asyncio：IO 密集场景的核心武器</h3>

        <p>
          一个 IO 密集的爬虫，同步写法每个请求阻塞 200ms、100 个 URL 要 20 秒；用 <code>asyncio</code> + <code>aiohttp</code> 改一下，100 个并发请求 200ms 全部跑完。<strong>这种 100 倍的提速，不需要任何 C 扩展、不需要任何 JIT，就是语言级 async/await 的直接收益</strong>。Java 写等价的东西要 CompletableFuture 嵌套 + 线程池调优 + 一堆样板。
        </p>

        <h2>三、3.13 之后：时代变了</h2>

        <p>
          上面那些都还是"老 Python"的故事。2024 年 10 月发布的 Python 3.13 带来两个改变游戏的东西，很多骂 Python 的人甚至还不知道：
        </p>

        <h3>Free-Threaded Python：GIL 真的开始拆了</h3>

        <p>
          PEP 703 通过，CPython 提供了实验性的 <code>--disable-gil</code> 构建模式（也叫 free-threaded build），<strong>真正意义上的多线程并行可以在 Python 里跑了</strong>。早期测试显示 CPU 密集多线程任务能近线性扩展到多核。3.14 已经把它从实验性升级为<em>受支持的官方构建</em>。
        </p>

        <p>
          这件事意义有多大？意味着 Python 黑了二十年的"GIL 让多线程成废物"这条论据，正在到期。<strong>不是"Python 没解决 GIL"，是 Python 团队花了五年时间在不破坏现有生态的前提下解决了它</strong>。这种渐进式工程决心，比某些语言每个大版本破坏一次兼容然后让你"拥抱变化"要负责得多。
        </p>

        <h3>实验性 JIT</h3>

        <p>
          3.13 还内置了一个实验性的 copy-and-patch JIT，3.14、3.15 会持续改进。这是 CPython 主线第一次把 JIT 纳入官方实现。换句话说，<strong>未来几年，纯 CPython 自己就会变快</strong>，PyPy 那种"我换个解释器就能提速"的时代会逐渐被默认体验追上。
        </p>

        <h2>四、真实世界里跑着多少 Python？</h2>

        <p>
          有人喜欢拿"Python 慢" 当大公司不会用 Python 的论据。事实正相反：
        </p>

        <p>
          <strong>Instagram</strong> 后端核心是 Django，月活十几亿，Meta 内部对 CPython 的优化贡献是顶级的，他们写过一篇博客详细讲怎么把 Python 调到能扛 Instagram 的流量。<strong>YouTube</strong> 早期主体是 Python，至今后端工具链大量是 Python。<strong>Dropbox</strong> 全栈 Python，养着 Guido van Rossum（Python 之父）多年，专门做内部性能优化和类型系统。<strong>Reddit</strong>、<strong>Pinterest</strong>、<strong>Spotify 数据平台</strong>、<strong>Stripe 后端工具</strong>……名单可以列很长。
        </p>

        <p>
          AI 时代更别提：<strong>OpenAI、Anthropic、Google DeepMind、xAI</strong> 的训练代码、推理服务、研究框架，<strong>从上到下全是 Python</strong>。PyTorch、TensorFlow、JAX、HuggingFace、vLLM、SGLang——整个 AI 工业的脚手架是 Python 搭的。当你用 ChatGPT 时，请求最终落到一段 Python 里。<em>"Python 慢，不能用于严肃场景"——你跟这些公司说去。</em>
        </p>

        <blockquote>
          一门语言能跑得动地球上所有大模型的训练和推理，跑得动 Instagram 的几亿日活，<br />
          却被一群只写过 LeetCode 的人评价为"不能用"——这不是 Python 的问题，是评价者的问题。
        </blockquote>

        <h2>五、"动态类型不可维护"——这话十年前就过期了</h2>

        <p>
          反 Python 的人最爱的第二句话是"动态类型，大型项目维护地狱"。这话在 2014 年还有点道理，2026 年说出来基本暴露你没跟上时代。
        </p>

        <p>
          Python 3.5（2015 年）引入 type hints，到 3.12 已经成熟到可以表达：泛型、协议（结构化类型 / duck typing 的静态版）、<code>TypedDict</code>、<code>Literal</code>、<code>ParamSpec</code>、<code>TypeVarTuple</code>、<code>Self</code>、<code>Unpack</code>……配合 <strong>mypy</strong>、<strong>Pyright</strong>（VS Code Pylance 的内核）、<strong>ty</strong>（Astral 出的新一代，Rust 写的，比 mypy 快几十倍），<strong>静态检查的体验已经接近 TypeScript</strong>。
        </p>

        <p>
          Dropbox、Instagram、OpenAI 的代码库都是百万行级别的<strong>strict typed Python</strong>，重构起来比无类型 JavaScript 不知道安全多少。"Python 不可维护"这种话，请放到 2014 年再说，<em>当代 Python 已经是渐进类型语言里做得最好的之一</em>。
        </p>

        <h2>六、"打包混乱"——uv 出来后基本结束了</h2>

        <p>
          这条我承认过去十年是真的烂。<code>pip</code> + <code>virtualenv</code> + <code>requirements.txt</code> + <code>setup.py</code> + <code>pyproject.toml</code>，再加上 <code>poetry</code>、<code>pipenv</code>、<code>conda</code>、<code>pdm</code> 各立山头，新人入门第一关就是被打包工具劝退。这是 Python 社区真实的历史债。
        </p>

        <p>
          但 2024 年 <strong>uv</strong>（Astral 出品，Rust 实现）的出现基本上把这事画上句号了。<code>uv</code> 一个二进制文件，<strong>解析依赖比 pip 快 10–100 倍</strong>，原生支持锁文件、虚拟环境、Python 版本管理、脚本执行，一条命令搞定原本要装一堆工具的事。社区在以肉眼可见的速度向 uv 收敛。<em>问题在被解决，不是被遗忘</em>。
        </p>

        <h2>七、那 Python 真有的毛病是什么？</h2>

        <p>
          我前面说了不当辩护士，那就把 Python 真有的问题也摆出来，省得被人说我是 Python 教徒：
        </p>

        <h3>启动开销和内存占用</h3>

        <p>
          解释器加载 + 模块导入需要时间，一个稍微复杂的 Python 程序冷启动 200–800ms 是常见的。命令行小工具用 Python 写有点亏（Rust/Go 的二进制启动是几毫秒）。内存占用因为对象头部开销，比 Go/Rust 大几倍。这些是真实成本。
        </p>

        <h3>纯 CPU 密集场景的纯 Python 实现确实慢</h3>

        <p>
          如果你写一段不依赖任何加速库、不能用 NumPy 表达、不能 JIT 的、纯 Python 的紧密循环——它就是慢。这种场景下 Go 一个文件比你这段 Python 快 30 倍是事实。<strong>但这种场景在工程里很少见</strong>，而且就算遇到，前面说的工具箱里随便挑一个都能解决。
        </p>

        <h3>历史遗留的设计问题</h3>

        <p>
          有几条 Python 自己也认账：可变默认参数（<code>def f(x=[])</code> 那个经典坑）；<code>self</code> 显式参数虽然清晰但确实啰嗦；早期的 <code>str</code>/<code>bytes</code> 在 2 → 3 迁移时割裂了整个生态（迁移用了将近十年）；<code>__init__.py</code> 包机制历史上换过几次设计；闭包 late-binding 的怪行为；<code>True == 1</code> 这种奇葩历史行为。
        </p>

        <h3>动态语言的天然代价</h3>

        <p>
          就算上了 type hints，Python 在运行时仍然不强制类型，性能上限不可能追上真静态语言。某些编译期能抓的错只能等到运行时才暴露。这是动态语言的通病，不是 Python 独有，但你得知道自己在用一门什么样的语言。
        </p>

        <h3>GIL 历史包袱（虽然在拆）</h3>

        <p>
          老版本里 CPU 密集多线程基本没用，要并行只能 multiprocessing 开多进程，IPC 是另一套坑。3.13 之前这是真问题，3.13 之后在变好，但生态完全适配 free-threaded 还要几年。<em>不能假装这件事不存在</em>。
        </p>

        <h2>八、看不起 Python 的人，通常是什么人</h2>

        <p>
          根据我多年观察，看不起 Python 的人主要分三类：
        </p>

        <p>
          <strong>第一类，只学过 Java 的工程师</strong>。他们的世界观里"严肃 = 静态类型 + 编译 + JVM"，看到 Python 没有 <code>;</code>、没有 <code>public static void main</code>、没有 Maven，就觉得这是"脚本"、是"小孩玩的"。他们没意识到自己只是在用熟悉度衡量优雅度。
        </p>

        <p>
          <strong>第二类，C++ 老法师</strong>。这一类的鄙视有它的合理性——他们对内存、缓存、SIMD、模板元编程的理解确实是 Python 用户大多数没有的。但他们的鄙视往往没区分场景：<em>Python 不是来抢 C++ 工作的</em>，Python 是来让你不用为了写一个数据清洗脚本去手动管理内存的。
        </p>

        <p>
          <strong>第三类，没真正写过大型 Python 项目的旁观者</strong>。这一类最吵。他们的全部 Python 经验是大学一门课、一段爬虫脚本、和知乎上的一句话，然后开始评价 Instagram 的技术选型。<strong>互联网上大部分对 Python 的批评，发言权重应该乘以 0.05</strong>。
        </p>

        <h2>九、那为什么我推荐 Python？</h2>

        <p>
          因为<strong>表达力</strong>。同一段业务逻辑，Python 的代码量通常是 Java 的 1/3、C++ 的 1/5。少写的每一行代码，是少写的一个 bug、少看的一段噪音、少花的半小时心智。在<em>大部分</em>软件项目里，瓶颈从来不是机器跑得多快，是<strong>你脑子里的想法多快能变成可运行的程序</strong>。
        </p>

        <p>
          因为<strong>生态</strong>。从 Web（Django/FastAPI）到数据（pandas/Polars）到机器学习（PyTorch/JAX）到自动化（Selenium/Playwright）到运维（Ansible/SaltStack）到科学计算（SciPy/SymPy）——你能想到的任何方向，Python 都有顶级生态。这不是历史巧合，是它表达力优势在三十年里复利出来的结果。
        </p>

        <p>
          因为<strong>渐进性</strong>。你可以从一个十行脚本开始，加一点类型注解，加一点测试，加一点性能优化，加一点 C 扩展——同一份代码可以从原型一路演化到生产。<em>很少有语言能像 Python 这样，让你用同一种心智模型覆盖从作业本到 OpenAI 的整个光谱。</em>
        </p>

        <h2>结语：慢的是你对"慢"的理解</h2>

        <p>
          再回到开头那个问题：Python 慢吗？<strong>在某些维度上慢，在大多数维度上够用，在表达力和生态上是冠军</strong>。把"慢"当成 Python 的判决书的人，是把工程问题简化成了 benchmark 比赛。但软件工程从来不是 benchmark 比赛——是<em>"在一个个不完美的权衡里，挑出对你这个具体场景最划算的那个"</em>。
        </p>

        <p>
          Python 不完美。它有 GIL（虽然在拆）、有启动开销、有打包历史债（虽然 uv 救场了）、有动态类型的天然代价。<strong>但它把"让你专注思考、而不是和语言搏斗"这件事，做到了主流语言里几乎最好的水平</strong>。这件事的价值，比任何一个 microbenchmark 都大。
        </p>

        <p>
          下次再有人跟你说"Python 慢"，你可以问他三个问题：你跑的是什么？你试过 NumPy / asyncio / PyPy / Numba 吗？你知道 3.13 已经在拆 GIL 了吗？<strong>大概率，他三个都答不上来。</strong>
        </p>

    </ArticleLayout>
  );
}
