import ArticleLayout from "@/app/components/ArticleLayout";
import { articleMetadata } from "@/app/lib/article-metadata";
import { getPost } from "@/app/lib/posts";

export const metadata = articleMetadata("go");
const post = getPost("go")!;

export default function Page() {
  return (
    <ArticleLayout
      title={post.title}
      subtitle="一篇关于设计创新与工程胜利的区分"
      signoff="写于一段又一段被 if err != nil 折磨之后"
      slug={post.slug}
      isoDate={post.isoDate}
      description={post.excerpt}
    >
        <p className="dropcap">
          先把我的真实评价摆在最前面：<strong>Go 是一个二流的语言设计，加上一流的工程实现，等于一款划时代的产品</strong>。这三句话组合起来不矛盾。它在语言设计史上不会被记一笔，因为它没发明任何"以前的人没想到的东西"；但它在工程文化史上有自己专属的一页，因为它把一堆<em>已经存在但没被普及的好做法</em>用工业化的方式打包给了几百万从不读 PLT 论文的程序员。
        </p>

        <p>
          这篇文章关于这个区分。我会先把"什么叫划时代的语言"讲清楚（一份比 Go 老得多的功臣名单），然后逐条拆 Go 的设计——指出它哪些是借鉴、哪些是退步、哪些是聪明的克制；再讲它真正伟大的地方在工具链和工程哲学；最后说明为什么这门语言我又佩服又不会全场都用。这不是黑文也不是吹捧——<strong>是一次诚实的分类</strong>。
        </p>

        <h2>一、先搞清楚什么叫"划时代的语言"</h2>

        <p>
          "划时代"这个词被滥用得很厉害。每出一门新语言都有人说划时代，但真正担得起这个词的语言，要满足一个硬条件：<strong>它在自己出现之前，世界上没有任何语言用过它的核心想法</strong>。它不是组合，不是优化，是<em>新增</em>了一种思考程序的方式。
        </p>

        <p>
          按这个标准，过去六十年的"划时代语言"名单其实很短：
        </p>

        <p>
          <strong>Lisp（1958）</strong>。"代码即数据"，第一次把程序当成可被程序操作的数据结构。宏、homoiconicity、垃圾回收的雏形——所有现代动态语言的祖宗。<em>没有 Lisp，就没有今天编程语言研究的整个左半边。</em>
        </p>

        <p>
          <strong>Smalltalk（1972）</strong>。第一个真正贯彻"一切皆对象"的语言，并且把<strong>对象 = 消息传递</strong>的隐喻做到了极致。它还顺手发明了"集成开发环境（IDE）"这个东西——你今天用的所有 IDE 都是 Smalltalk 的私生子。
        </p>

        <p>
          <strong>ML / OCaml（1973~）</strong>。Hindley-Milner 类型推导、代数数据类型、模式匹配——一整套静态类型语言可以"既严谨又不啰嗦"的工程证据。今天 Rust、Swift、Haskell、TypeScript 的类型系统全是它的徒孙辈。
        </p>

        <p>
          <strong>Erlang（1986）</strong>。actor 模型 + 进程级隔离 + 透明分布式 + 热代码替换。把"高可用"当成语言级特性而不是中间件，是它独家发明的工程哲学。爱立信用它撑起电话交换机的<em>九个九</em>可用性，这件事至今没有任何其他语言能复刻。
        </p>

        <p>
          <strong>Haskell（1990）</strong>。把"纯函数 + 副作用类型化"做到极致，monad、类型类、惰性求值——这些概念后来被各路语言抄进去几十年。<em>它不是为了流行而设计的，但它定义了"什么叫认真对待类型系统"的上限。</em>
        </p>

        <p>
          <strong>Rust（2010）</strong>。所有权 + 借用检查器，把"内存安全"和"零成本抽象"这两件历史上看似矛盾的事，第一次在一门主流语言里同时做到了。<strong>这是过去二十年唯一一门称得上语言设计创新的工业语言</strong>。
        </p>

        <p>
          这就是名单。每一个名字背后，都对应着<em>一个或多个之前不存在的核心想法</em>。这才是"划时代"该有的标准。
        </p>

        <h2>二、按这个标准看 Go：它发明了什么？</h2>

        <p>
          答案是：<strong>几乎没有</strong>。把 Go 的设计要素拆开看一遍，每一项都能在比它老二三十年的语言里找到出处：
        </p>

        <h3>goroutine + channel</h3>

        <p>
          这是 Go 最常被吹的"创新"。但 <strong>CSP（Communicating Sequential Processes）模型由 Tony Hoare 1978 年提出</strong>，<strong>Occam（1983）</strong>就把 channel 做进了语言核心，<strong>Erlang（1986）</strong>用更激进的 actor 模型实现了同一类目标。Go 把 CSP 包装成了主流静态语言里好用的语法，<em>这是工程贡献，不是想法贡献</em>。
        </p>

        <h3>结构类型接口（duck typing 的静态版）</h3>

        <p>
          一个类型不需要显式声明"我实现了 interface X"，只要方法签名匹配就自动满足。听起来很现代是吧？<strong>Smalltalk 1972 年就是这么干的</strong>，OCaml 的对象系统、TypeScript 的结构类型——Go 在这条线上是子孙辈。
        </p>

        <h3>组合优于继承 / 没有继承</h3>

        <p>
          Self（1986）就把"一切是对象、没有类继承、只有 prototype 委托"做到了。<strong>"组合优于继承"是 Erich Gamma 那本《设计模式》（1994）里就反复强调的老建议</strong>。Go 把它做进语法不允许写继承，是把社区共识写成了规则——这是聪明的工程决策，不是新想法。
        </p>

        <h3>错误返回值而不是异常</h3>

        <p>
          这是 <strong>C 语言 1972 年的做法</strong>。Go 主动选择回到 C 的方式，加上一个特殊的 <code>error</code> 接口约定。这是<em>退回</em>，不是<em>前进</em>——而且如果对比 Rust 的 <code>Result&lt;T, E&gt;</code> + <code>?</code> 操作符，Go 的 <code>if err != nil &#123; return err &#125;</code> 啰嗦得像还在 1972 年。
        </p>

        <h3>GC + 静态编译 + 单二进制</h3>

        <p>
          每一项都不新。<strong>D 语言</strong>早就这么干。<strong>OCaml</strong> 的 native 编译能产出单二进制。<strong>Java AOT</strong>（GraalVM Native Image）也做到了。Go 的贡献是<em>把这套组合做得足够工业级</em>，让人愿意天天用。但作为想法，它没增加任何东西。
        </p>

        <h3>那 Go 自己发明了什么？</h3>

        <p>
          诚实地说：<strong>defer</strong> 这个语句在 Go 之前没有这么干净的形式（虽然概念类似 C++ RAII），算半个原创。<strong>:= 短变量声明</strong>是个好语法糖，但只是糖。剩下你能在 Go 里找到的所有"亮点"，都是别人发明的、Go 把它们组合起来的。
        </p>

        <blockquote>
          Go 的语言设计史，是一本<em>"好东西鉴赏与组合"</em>的笔记，不是一本<em>"我发明了什么"</em>的论文。
        </blockquote>

        <h2>三、那 Go 的设计算什么？——一种"克制"的工程哲学</h2>

        <p>
          上面这些不是在贬低 Go。<strong>组合不是原罪</strong>，敢于"什么都不发明，只把好东西拼对"在工业语言里反而是一种少见的清醒。Go 的真正特征不是创新，是<strong>克制</strong>——它的设计师 Rob Pike、Ken Thompson、Robert Griesemer 三个人，加起来七十多年的工程经验，做出了一个看似"反潮流"的决定：
        </p>

        <p>
          <strong>把我们见过的一切复杂度都拒绝在门外。</strong>
        </p>

        <p>
          拒绝继承（哪怕"组合优于继承"已是共识，也彻底不给继承开口子）。<strong>拒绝异常</strong>（哪怕这意味着错误处理啰嗦十倍）。<strong>拒绝运算符重载</strong>（哪怕这让数学库写起来很难看）。<strong>拒绝隐式类型转换</strong>（哪怕 <code>int32</code> 和 <code>int64</code> 相加都得手动 cast）。<strong>拒绝泛型整整十年</strong>（直到 1.18 才加，加之前社区被 <code>interface&#123;&#125;</code> + 类型断言折磨了无数年）。<strong>拒绝枚举</strong>（直到现在都没真正的枚举，只有 <code>iota</code> 凑合）。<strong>拒绝继承的可见性修饰符</strong>（只有"首字母大写 = public"这一条规则）。
        </p>

        <p>
          这一连串"拒绝"在学术界看是<em>保守</em>，是<em>反智</em>，是<em>无视过去三十年 PLT 进步</em>。Pike 自己说过一句被广泛引用的话：<em>"我们的目标程序员不是研究生，是 Google 招进来的会一点 C 的工程师。"</em> 这句话被 Hacker News 喷了十年，但<strong>它非常诚实地暴露了 Go 的定位</strong>：它不是给搞 PL 研究的人做的，是给"一群人协作写大型基础设施"做的。
        </p>

        <p>
          这种克制有什么好处？<strong>它把语言能咬到你的牙数控制到了最少</strong>。一个会 C 的人一周能写 Go 生产代码，一个 Java 程序员两小时能上手，一个学完 Python 的新人三天能贡献。这件事的价值在工业里大得离谱——它意味着<em>团队招聘门槛低、新人 ramp-up 快、老代码读起来不蒙</em>。
        </p>

        <p>
          这种克制的代价是什么？<strong>表达力上限低</strong>。同样一段业务逻辑，Rust 的 <code>?</code>、Python 的列表推导、Haskell 的高阶组合，都能写得比 Go 更紧凑、更接近思维。Go 始终是<em>"读起来像一个有耐心的人在认真说话"</em>，永远不会变成<em>"读起来像一个聪明人在写诗"</em>。
        </p>

        <h2>四、Go 真正的伟大：工程化把一切碾压</h2>

        <p>
          如果 Go 只有"克制的语言设计"这一条，它早就被遗忘了。它能成为今天云原生时代的事实标准，靠的是<strong>另一件事——工具链和工程文化的工业级胜利</strong>。这才是它真正划时代的地方。
        </p>

        <h3>go build：编译速度作为产品特性</h3>

        <p>
          一个 Go 项目几十万行代码，<strong><code>go build</code> 几秒钟出结果</strong>。这件事 C++ 三十年没做到（一个中型项目编译十分钟是常事），Java 至今做不到（增量编译靠 IDE 玄学），Rust 也羡慕（debug 编译还行，release 慢得想哭）。Pike 当年说设计 Go 的初始动机就是<em>"在我们等 Google 一个 C++ 项目编译完的时间里，我们能设计一门语言"</em>，这不全是段子。
        </p>

        <p>
          编译快不是技术细节，是<strong>开发者反馈循环的根本</strong>——它决定了你一天能尝试多少种实现，决定了你愿不愿意为重构改动十个文件。<strong>Go 第一次让"编译速度"被当成一等产品指标对待</strong>。
        </p>

        <h3>gofmt：用代码风格争论的死亡来换团队和睦</h3>

        <p>
          Go 工具链里最改变行业的一个东西，不是 goroutine，是 <code>gofmt</code>。<strong>它强行规定了每一段 Go 代码的格式</strong>——制表符还是空格、大括号在不在同一行、import 怎么排序——一切由工具决定，毫无配置余地。
        </p>

        <p>
          Pike 知道他在干什么。每个用过其他语言的人都知道：代码风格争论是工程师之间最浪费时间的非技术冲突，没有之一。tabs vs spaces 能让一个团队吵到分裂。<strong>Go 用一个粗暴决定终结了这件事</strong>——以至于其他语言之后都开始抄（Rust 的 rustfmt、Python 的 black、JavaScript 的 prettier 是 gofmt 的精神后裔）。
        </p>

        <h3>标准库就是答案</h3>

        <p>
          写 HTTP 服务用 <code>net/http</code>，处理 JSON 用 <code>encoding/json</code>，写测试用 <code>testing</code>，做 RPC 用 <code>net/rpc</code>，加密用 <code>crypto/*</code>，处理时间用 <code>time</code>——<strong>这些都内置</strong>，开箱即用，质量过关。对比 Java 的"凡事都要装框架"和 Node.js 的"凡事都要装五个包"，Go 的标准库是降维打击。<em>这不是技术能力问题，是产品哲学问题</em>：标准库该不该被认真对待？Go 给出了一个清晰的"该"。
        </p>

        <h3>单二进制部署</h3>

        <p>
          <code>go build</code> 出来一个静态链接的二进制，<code>scp</code> 到服务器，<code>./app</code>，跑了。<strong>不需要 JVM、不需要 Python 环境、不需要 node_modules、不需要装系统依赖</strong>。这件事在容器时代之前看起来还好；在容器时代它直接定义了"轻量服务"的形态——<strong>一个 Go 服务能塞进 5MB 的 Docker 镜像，一个等价 Spring Boot 服务起步 200MB</strong>。
        </p>

        <h3>goroutine 让轻量并发普及</h3>

        <p>
          再说一次：CSP 不是 Go 发明的。但<strong>"让一千万个普通工程师能用上轻量并发"是 Go 发明的</strong>。在 Go 之前，写并发要么用 Java 的 ThreadPoolExecutor 配七八个参数，要么用 C++ 的 pthread 自己管生命周期，要么用 Erlang（但 Erlang 不在大多数公司的技术栈里）。Go 把 <code>go func() &#123; ... &#125;()</code> 推到了"和写函数一样轻"的地步——<em>并发的认知门槛被它砍到了一个普通后端开发能跨过去的高度</em>。
        </p>

        <h3>tooling 一站式</h3>

        <p>
          <code>go test</code>、<code>go vet</code>、<code>go doc</code>、<code>go mod</code>、<code>go run</code>、<code>go install</code>、<code>go generate</code>——<strong>所有日常需要的工具都在 <code>go</code> 这一个二进制下面</strong>。对比 Python 的 <code>pip / virtualenv / poetry / pytest / black / mypy / pyright / uv</code> 一堆独立工具，Go 的工具链整合度是另一个时代的体验。Rust 的 cargo 是少数能跟它打的——而 cargo 也是<em>受 Go 启发</em>。
        </p>

        <h2>五、Go 真有的设计缺陷</h2>

        <p>
          为了不被人扣"Go 教徒"帽子，必须把 Go 设计上真正不优雅的地方也摆出来。这是任何认真讨论必须做的事：
        </p>

        <h3>错误处理啰嗦到反人类</h3>

        <p>
          <code>if err != nil &#123; return err &#125;</code> 三行一组，写多了自己看着都想吐。Rust 一个 <code>?</code> 解决的事，Go 要堆三行；想加上下文还要 <code>fmt.Errorf("doing X: %w", err)</code>。这是<strong>Go 整套设计里我个人最不能接受的一条</strong>。Go 团队几次提案改进（<code>try</code>、<code>?</code> 等）都被自己否决，理由是"显式比隐式好"——这条原则有它的道理，但被 Go 用得过于教条。
        </p>

        <h3>nil interface 那个坑</h3>

        <p>
          <code>var x error = nil</code> 是 nil；<code>var x error = (*MyErr)(nil)</code> 不是 nil。这种<strong>"typed nil"和"untyped nil"的区别</strong>，能让任何 Go 老手栽跟头一次。这是<em>把 interface 实现成 (type, value) 双字段</em>导致的语义后果，无法在不破坏兼容性的前提下修复。
        </p>

        <h3>没有 sum types / 真枚举</h3>

        <p>
          Rust 的 <code>enum</code>、TypeScript 的 union types、Swift 的 enum——这些表达"一个值是几种可能之一"的能力，<strong>Go 至今没有原生支持</strong>。<code>iota</code> 只能凑合做整数枚举；想表达"要么是成功值、要么是错误"这种本来很自然的事，Go 只能用 <code>(T, error)</code> 这种隐式约定。
        </p>

        <h3>泛型来得太晚 + 不够强</h3>

        <p>
          1.18（2022 年）才加泛型，加之前十年所有写容器、写通用算法的人都在用 <code>interface&#123;&#125;</code> + 类型断言糊。加之后<strong>仍然不支持类型参数化方法</strong>（<code>func (s *Set[T]) Map[U](f func(T) U) Set[U]</code> 这种写法 Go 还做不到），有限的泛型能力让标准库都没法充分利用。
        </p>

        <h3>时间格式化用 reference time</h3>

        <p>
          Go 不用 <code>"YYYY-MM-DD"</code>，用一个固定的参考时刻 <code>2006-01-02 15:04:05</code> 来描述格式。理论上"更直观"，<strong>实践上每个 Go 程序员都得查文档或者死记</strong>。这条争议很大，我个人觉得是过度聪明。
        </p>

        <h3>struct tag 用字符串</h3>

        <p>
          <code>json:"name"</code> 这种 tag 是字符串字面量，<strong>编译器不检查</strong>，写错了运行时也未必报错。一个号称"严谨"的语言把元数据塞进字符串里，是设计妥协。
        </p>

        <h3>错误没有栈跟踪</h3>

        <p>
          原生 <code>error</code> 接口只是个字符串，没栈。要栈得自己用 <code>github.com/pkg/errors</code> 或类似库包一层。生产环境排查问题时这是真痛点。
        </p>

        <h3>GOPATH 时代的包管理黑历史</h3>

        <p>
          虽然 <code>go modules</code> 救场了，但<strong>2009–2018 那十年的 GOPATH 是真的烂</strong>。任何那个时代写过 Go 的人都知道。这一点跟 Python 的打包史可以放一起进博物馆。
        </p>

        <h2>六、Go 的真实影响：定义了"现代后端"的形态</h2>

        <p>
          以上这些缺陷不影响一个事实：<strong>过去十年间，云时代的关键基础设施有相当大一部分是 Go 写的</strong>。挑几个看：
        </p>

        <p>
          <strong>Docker</strong> —— 容器时代的发起者。<strong>Kubernetes</strong> —— 容器编排事实标准。<strong>etcd</strong> —— K8s 的元数据存储。<strong>Terraform</strong> —— 基础设施即代码标杆。<strong>Prometheus</strong> —— 现代监控事实标准。<strong>Grafana</strong> —— 可视化标杆（核心后端 Go）。<strong>CockroachDB / TiDB</strong> —— 分布式数据库新一代。<strong>InfluxDB</strong>。<strong>Consul / Nomad / Vault</strong>。<strong>Caddy</strong>。<strong>Hugo</strong>。<strong>Cloudflare 的核心后端服务</strong>。<strong>Uber 的几乎所有微服务</strong>。<strong>Twitch / Netflix / Dropbox 的关键路径</strong>。
        </p>

        <p>
          这串名单不是巧合。Go 几乎单枪匹马<strong>定义了 2014 年之后"云时代后端服务"该长什么样</strong>：单二进制、容器友好、并发轻量、启动快、内存可控、依赖明确。这些做到了之后，再看其他语言写云组件——<em>怎么看都觉得不顺手</em>。这就是 Go 真正的工程胜利。
        </p>

        <blockquote>
          Go 没有发明任何编程范式，但它定义了"现代云原生服务"该长什么样。<br />
          这件事的工程价值，比任何 paper 都大。
        </blockquote>

        <h2>七、横向放在一起：Go 在语言光谱上的位置</h2>

        <p>
          为了说清楚 Go 的位置，我把它和几门常对比的语言放在一起，每对一句话：
        </p>

        <p>
          <strong>Go vs Rust</strong>。Rust 是<em>设计先锋</em>，Go 是<em>工程典范</em>。Rust 在所有权、类型系统、零成本抽象上推进了语言设计的边界；Go 在工具链、编译速度、团队协作上推进了工业化的边界。<strong>两者并不矛盾</strong>，是互补的两条进步路径。如果有一天我必须只留一个，我留 Rust——但那不代表 Go 该消失，恰恰相反，<em>大多数项目根本用不到 Rust 的那种严苛</em>，Go 的"够用且好用"才是工业的常态。
        </p>

        <p>
          <strong>Go vs Java</strong>。Java 是<em>历史负担</em>，Go 是<em>历史拒绝</em>。Java 三十年的复杂度都是补丁堆出来的；Go 一开始就刻意拒绝那些复杂度。这不仅是语言对比，是<strong>两种工程文化的对立</strong>——Java 文化默认"复杂 = 严谨"，Go 文化默认"简单 = 严谨"。
        </p>

        <p>
          <strong>Go vs Python</strong>。Python 是<em>表达力的胜利</em>，Go 是<em>确定性的胜利</em>。Python 让你用更少的字写更多的事，Go 让你三年后回来还能读懂自己的代码。<em>这两件事都重要，分别在不同场景里更重要</em>。
        </p>

        <p>
          <strong>Go vs Erlang</strong>。Erlang 是<em>理论的极致</em>（actor + 进程隔离 + 热更新），Go 是<em>实用的折衷</em>（goroutine + channel，但没有真隔离）。如果你要做电话交换机级的可用性，Erlang 仍然是答案；如果你要做"靠谱的微服务"，Go 已经够了。
        </p>

        <h2>八、为什么我又佩服 Go，又不会全场都用它</h2>

        <p>
          以上说完，我对 Go 的真实使用立场是这样：
        </p>

        <p>
          <strong>写 CLI 工具、运维脚本、内部服务、API 网关、网络组件、分布式系统组件</strong> —— Go 是当代我会优先选的语言。它在这些场景里的开发-部署体验，没有任何对手。
        </p>

        <p>
          <strong>写算法原型、数据处理、机器学习、科学计算、内部工具脚本</strong> —— 我用 Python，不会考虑 Go。Go 在这些场景里的表达力劣势会被无限放大。
        </p>

        <p>
          <strong>写数据库内核、操作系统、嵌入式、实时系统、引擎</strong> —— Rust 或 C++，不会用 Go。Go 的 GC 暂停在低延迟场景是硬伤。
        </p>

        <p>
          <strong>写大型业务系统、复杂领域建模、有大量状态机的服务</strong> —— 我会优先考虑有 sum type 和强类型系统的语言（Rust、TypeScript、Scala、Kotlin），<strong>不优先 Go</strong>，因为 Go 的类型表达力在这些场景里会变成持续的小痛。
        </p>

        <p>
          换句话说：<strong>Go 是中间层的王者，不是全场的王者</strong>。它在"中等复杂度的网络服务"这个最广大的中间地带里几乎无敌；上不到极致表达力（Haskell/Rust 那一边），下不到极致灵活性（Python 那一边）。但<em>正是因为这个中间地带是软件工业里最广大的地带</em>，Go 的实际市场和影响才会这么大。
        </p>

        <h2>九、结语：把"伟大语言"和"伟大工程"分开</h2>

        <p>
          回到开头那句话：<strong>Go 是一个二流的语言设计 + 一流的工程实现 = 划时代的产品</strong>。
        </p>

        <p>
          它不在"伟大语言"的名册上——那张名册写着 Lisp、Smalltalk、ML、Erlang、Haskell、Rust，这些名字代表"我让人类对程序的思考方式向前走了一步"。
        </p>

        <p>
          但它在"伟大工程"的名册上有自己的一页——这一页写着<strong>"我让一群普通工程师也能写出能扛云规模的程序"</strong>。这件事的价值不输给前者，只是性质不同。
        </p>

        <p>
          中文技术圈对 Go 的讨论经常陷入两个极端：要么是<em>"Go 是次世代语言"</em>的吹捧，要么是<em>"Go 没创新别吹了"</em>的揶揄。这两种声音都对了一半，又都错了一半，因为它们没把<strong>"语言设计的创新"和"工程产品的伟大"分开评价</strong>。把这两件事分开，你才能既承认 Go 在 PLT 史上不会留下名字，又承认 Go 在云时代的工程史上是无可争议的塑造者。
        </p>

        <p>
          下次再听到有人说"Go 是划时代的语言"，你可以平静地纠正一下：<strong>Go 不是划时代的语言，但它是划时代的工程</strong>——而后者，在大多数场景里，比前者更重要。
        </p>

    </ArticleLayout>
  );
}
