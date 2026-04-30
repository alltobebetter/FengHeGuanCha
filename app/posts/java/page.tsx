import ArticleLayout from "@/app/components/ArticleLayout";
import { articleMetadata } from "@/app/lib/article-metadata";
import { getPost } from "@/app/lib/posts";

export const metadata = articleMetadata("java");
const post = getPost("java")!;

export default function Page() {
  return (
    <ArticleLayout
      title={post.title}
      subtitle="一篇纯主观的、带情绪的、不打算客气的长文"
      signoff="写于一次又一次被 NullPointerException 之后"
      slug={post.slug}
      isoDate={post.isoDate}
      description={post.excerpt}
    >
        <p className="dropcap">
          先把结论摆在最前面，省得你浪费时间：Java 不是因为它"好"才流行的，而是因为它<strong>恰好在 2000 年前后那段窗口期出现，恰好赶上互联网爆发，恰好被 Sun、IBM、Oracle 三家联手推上了企业级神坛</strong>。它能活到今天，靠的是历史惯性、生态绑架、和无数被 KPI 锁死的中年程序员，<em>不是</em>它的设计有多优雅。把"流行"和"优秀"划等号，是这个行业最廉价的错觉之一。
        </p>

        <p>
          这篇不打算装客观，也不打算两边各打五十大板。我就是要把 Java 这套缝合怪从头到尾骂一遍——不是骂它的 bug，bug 是可以修的；我要骂的是它<strong>骨子里的设计取向</strong>，那种"我先随便糊一个出来，错了以后再补、再补、再补、补到再也回不去"的思路。这种东西不是 bug，是<strong>原罪</strong>。

        </p>

        <h2>一、它流行，纯粹是时代给的</h2>

        <p>
          1995 年，Sun 推出 Java，主打"一次编写，到处运行"。这句口号在今天听起来稀松平常，但放在那个 Windows 还在打补丁、Unix 还在分裂、C++ 还在和各种平台 ABI 搏斗的年代，简直像是降维打击。<strong>不是 Java 多牛，是当时所有人都太烂了。</strong>
        </p>

        <p>
          紧接着是 2000 年前后的互联网泡沫。企业要建网站、要写后端、要搭"中间件"，但又请不起 C++ 老法师（贵、慢、容易写出段错误），Python 那时候还在襁褓里没人当真，Ruby 更是边缘玩具。Java 在这个真空里被 Sun 砸了无数广告、被 IBM WebSphere、BEA WebLogic 这些"企业级"巨兽抬上轿，一路把"严肃后端 = Java"这个等式焊死在了一代 CTO 的脑子里。
        </p>

        <p>
          于是后面的事你都知道了：银行用 Java、电信用 Java、政企用 Java、外包用 Java。不是因为 Java 适合，而是因为<strong>招得到人、骂得动人、出了事赖得掉人</strong>。一门语言一旦变成"安全选择"，它就再也不需要进步了——它的护城河不是技术，是 HR 部门。
        </p>

        <blockquote>
          Java 的成功，是市场胜利，不是工程胜利。把这两件事搞混的人，往往还在用 XML 配 Spring。
        </blockquote>

        <h2>二、"一切皆对象"——Java 最大的一句营销谎言</h2>

        <p>
          你翻开任何一本国内的 Java 教材，前三页一定会出现这句话："Java 是纯面向对象的语言，一切皆对象。" 然后第十页，它就会教你 <code>int</code>、<code>long</code>、<code>double</code>、<code>boolean</code>、<code>char</code>、<code>byte</code>、<code>short</code>、<code>float</code>——<strong>八个不是对象的"基本类型"</strong>。
        </p>

        <p>
          那它到底是不是"一切皆对象"？显然不是。<strong>它是"一切皆对象，除了那八个不是的"</strong>。这句话翻译成人话，就是："我吹了个牛，但你不要拆穿。" 真正一切皆对象的语言是 Smalltalk、是 Ruby——在 Ruby 里 <code>1.times</code> 都能调，<code>nil</code> 都是对象。Java 呢？为了性能（其实也是为了偷懒、为了向 C 兼容），保留了一套基本类型，然后又给每个基本类型配了一个"包装类" <code>Integer</code>、<code>Long</code>……<strong>同一个概念两套东西，互相之间还要靠"自动装箱拆箱"这种隐式魔法来回转</strong>。
        </p>

        <p>
          这就是典型的 Java 思路：先吹一个干净漂亮的概念，发现做不到，就在底下偷偷糊一层补丁，再吹这个补丁也很优雅。<code>Integer i = 1000; Integer j = 1000; i == j</code>，你猜结果？<code>false</code>。但 <code>Integer i = 100; Integer j = 100; i == j</code>，结果是 <code>true</code>。因为 <code>-128~127</code> 之间有缓存。这种坑，新手踩一次，老手每年还要再踩一次，<strong>而它居然被当成"语言特性"写进面试题里反复考</strong>。
        </p>

        <p>
          Python 怎么做的？Python 里 <code>1</code> 就是 <code>int</code> 对象，<code>(1).bit_length()</code> 直接调，<code>True</code> 是 <code>bool</code>，<code>bool</code> 继承自 <code>int</code>，干净、统一、不需要"自动装箱"这种鬼东西。Java 把简单的事情复杂化，然后管这种复杂叫"严谨"——这是它一辈子的修辞习惯。
        </p>

        <h2>三、泛型：贴在脸上的"我做不到"</h2>

        <p>
          Java 1.5 加了泛型。听起来很现代是吧？<strong>它是"伪"泛型——类型擦除（Type Erasure）</strong>。意思是，编译期检查类型，运行期把类型信息全删掉，<code>List&lt;String&gt;</code> 和 <code>List&lt;Integer&gt;</code> 在运行时是同一个东西。
        </p>

        <p>
          为什么要这么干？因为 Java 1.0 没有泛型，加泛型的时候老代码已经堆积如山，改不动了。Sun 不敢动 JVM、不敢破坏二进制兼容，于是发明了"擦除"这个词，把锅甩给"为了向后兼容"。后果是什么？
        </p>

        <p>
          你不能 <code>new T()</code>。你不能 <code>T[] arr = new T[10]</code>。你不能 <code>if (x instanceof List&lt;String&gt;)</code>。你想反射拿泛型参数？得用 <code>TypeToken</code> 这种"匿名子类骗反射"的恶心 trick。<strong>一个号称"严谨""强类型"的语言，泛型却连最基本的"运行时知道自己是什么类型"都做不到。</strong>
        </p>

        <p>
          C# 怎么做的？真泛型，运行时保留。Go 怎么做的？2022 年才加泛型，但加得干净。Python 根本不需要——它是动态类型，类型注解纯辅助。只有 Java，加了一个半成品，还要全社会一起配合演戏，假装它是个"功能"。
        </p>

        <h2>四、并发：缝合怪集大成之作</h2>

        <p>
          这一节我得多写几段，因为 Java 并发就是它"缝合"哲学的活化石。
        </p>

        <p>
          Java 1996 年发布的时候，根本没认真想过高并发。那时候服务器还是单核的、Web 才刚起步、CPU 频率还在拼主频。然后互联网爆了，多线程突然成了刚需，于是 Java 开始往身上缝补丁：先是 <code>synchronized</code> 这种笨重的内置锁，再是 <code>volatile</code> 来打可见性补丁，再是 <code>java.util.concurrent</code>（Doug Lea 一个人扛起来的，否则 Java 并发会更惨）补出 <code>Lock</code>、<code>AQS</code>、<code>CAS</code>、<code>Atomic*</code>，再是 <code>Future</code>、<code>CompletableFuture</code>……一直缝到 JDK 21 的<strong>虚拟线程</strong>，几十年后才算把"轻量并发"这块短板补上。
        </p>

        <p>
          注意：是<strong>补</strong>上，不是<strong>设计</strong>出来。Go 一出生就有 goroutine，channel 一套到底；Erlang 一出生就有 actor。Java 是<strong>单线程语言被互联网架在火上硬改成并发语言</strong>的，每一层都是补丁，每一层都和上一层规则不一样。
        </p>

        <h3>4.1 两套锁，规则各不相同</h3>

        <p>
          <code>synchronized</code> 是关键字、不可中断、不能超时、不能 trylock、释放是自动的。<code>ReentrantLock</code> 是类、可中断、可超时、可公平、释放必须 <code>finally &#123; unlock() &#125;</code>，忘了就死锁。同一门语言，两套锁，<strong>底层都不一样</strong>（一个是 monitor，一个是 AQS），新手要背两套规则、两套坑。这不是"灵活"，这是"我第一次没设计好，又不敢删，只好再做一套"。
        </p>

        <h3>4.2 JMM：把硬件的脏活全甩给程序员</h3>

        <p>
          Java 内存模型（JMM）是为了兼容各种 CPU 缓存和指令重排发明的。它告诉你：你以为线程 A 写了变量、线程 B 立刻看得见？<strong>不一定。</strong> 可能在工作内存里，可能被重排了，可能要加 <code>volatile</code>，可能要加 <code>synchronized</code>，可能要 <code>happens-before</code>。
        </p>

        <p>
          一整套规则，一本书都讲不完，新人读完一脸懵，老人写代码全靠"我以前这么写没出过事"的玄学。<strong>把硬件复杂度直接暴露在语言层、还包装成"高级特性"</strong>，是 Java 一贯的做派。Go 用 happens-before 也讲，但配 channel 用，根本不需要你天天想这些；Python 有 GIL，简单粗暴一锁了之，写起来心智负担为零。Java 选了最难的那条路，然后告诉你"这是程序员的基本功"。
        </p>

        <h3>4.3 ThreadLocal：内存泄漏教科书</h3>

        <p>
          <code>ThreadLocal</code> 本来是个聪明主意，给每个线程一份副本。但 Java 没考虑到一件事：<strong>线程池会复用线程</strong>。于是用完不 <code>remove()</code>，下一个请求过来就读到上一个用户的数据，<strong>数据串号</strong>，Web 项目里这种事故能写满一本《血泪史》。再加上 ThreadLocalMap 用弱引用 key、强引用 value，配合线程池长寿命，<strong>内存泄漏直接送给你</strong>。
        </p>

        <p>
          这玩意儿设计的时候根本没考虑线程复用场景，出事之后就靠"程序员注意事项"来打补丁。<strong>把缺陷美化成"使用规范"，是 Java 文化的一大特色。</strong>
        </p>

        <h3>4.4 线程池：把简单需求强行复杂化</h3>

        <p>
          你只是想"开几个线程跑点活"，Java 给你的是 <code>ThreadPoolExecutor</code>：核心线程数、最大线程数、阻塞队列、拒绝策略、空闲存活时间、线程工厂——七八个参数，配错一个，轻则任务堆积，重则 OOM 雪崩。<code>Executors.newFixedThreadPool</code> 这种快捷方法因为用 <code>LinkedBlockingQueue</code> 无界队列，被阿里规约直接禁用。
        </p>

        <p>
          Go 怎么做的？<code>go func() &#123;...&#125;()</code>。Python 怎么做的？<code>asyncio.create_task(...)</code>。Java 是<strong>给你一个工厂，让你自己造车</strong>，造错了还说是你不懂"调优"。
        </p>

        <h2>五、Spring 生态：把工程难度刷成"我懂得多"的徽章</h2>

        <p>
          Java 生态的灵魂是 Spring，Spring 的灵魂是<strong>把简单事情包装成复杂事情，再让你以为这就是工程</strong>。
        </p>

        <p>
          一个 HTTP 服务，Python 用 FastAPI 二十行写完，自带文档、自带类型校验、自带异步。Java 用 Spring Boot 写，要 <code>@SpringBootApplication</code>、<code>@RestController</code>、<code>@Autowired</code>、<code>@Configuration</code>、<code>@ConditionalOnProperty</code>……一堆注解魔法，启动慢、内存大、堆栈一炸三十层全是 <code>org.springframework.*</code>，调试起来想砸键盘。
        </p>

        <p>
          但你不能不用 Spring，因为整个 Java 后端生态都被它吃掉了。<strong>它不是技术选型，是宗教信仰。</strong> 离开 Spring 你写不了主流 Java 项目；用了 Spring 你就要接受那一整套"约定大于配置"的玄学——所谓"约定"，就是"你不知道为什么它能跑，但它跑了，别问"。
        </p>

        <h2>六、Nacos：典型的"造个配置中心证明我们公司技术很强"</h2>

        <p>
          这一段单拎出来骂。配置管理这件事，本来用<strong>环境变量</strong>就能解决：<code>DB_HOST=127.0.0.1 ./app</code>，要改重启就行。十二要素应用（12-Factor App）2011 年就把这套写进规范了，全世界用得好好的。
        </p>

        <p>
          Java 圈不行。Java 圈搞出来一个 <strong>Nacos</strong>——一个独立的服务，用来"统一管理配置和注册中心"。听起来很高大上对吧？我们看看代价：
        </p>

        <p>
          你要多部署一个 Nacos 集群（不然挂了全公司服务全挂）。你要保证 Nacos 高可用（多节点、MySQL 后端、Raft 选主）。你要给每个应用配 Nacos 的地址（绕了一圈，<strong>这个地址你还是得用环境变量配</strong>）。你要处理 Nacos 推送配置时应用怎么热加载——结果热加载本身就是 bug 温床。你要担心 Nacos 配置错了导致<strong>线上服务全部读到错配置一起挂</strong>（真实事故，年年都有）。
        </p>

        <p>
          解决了什么问题？<strong>没解决任何环境变量解决不了的问题。</strong> 只解决了一个问题：让公司中间件团队有活干、让简历上能写"参与配置中心架构"。我每次启动服务改一个 <code>.env</code>，重启，搞定。Java 圈非要把这件事变成一个分布式系统，再用这个分布式系统的复杂度证明"看，我们的体系多严谨"。
        </p>

        <blockquote>
          需要一整个集群来管理"几个字符串"，这不是工程，这是表演。
        </blockquote>

        <p>
          类似的还有：用 Eureka 做服务发现（K8s 自带 DNS 不香吗）、用 Sentinel 做限流（Nginx 一行 <code>limit_req</code> 完事）、用 SkyWalking 做链路追踪（OpenTelemetry 一统天下早就够了）、用 XXL-JOB 做分布式定时任务（cron + 一个分布式锁就行）。<strong>Java 圈最擅长的，就是把别人语言里一行解决的事，做成一个产品、一个团队、一份 PPT。</strong>
        </p>

        <h2>七、纯净度和优雅度：被 Python 全方位吊打</h2>

        <p>
          写一个"读文件、过滤空行、排序、写回去"。
        </p>

        <p>
          <strong>Python</strong>：一行。<code>open("b.txt","w").writelines(sorted(l for l in open("a.txt") if l.strip()))</code>。读起来像英文，意图清晰。
        </p>

        <p>
          <strong>Java</strong>：先 <code>try-with-resources</code> 包一层 <code>BufferedReader</code>，里面套 <code>FileReader</code>，<code>FileReader</code> 还要 catch <code>FileNotFoundException</code> 和 <code>IOException</code>（受检异常，编译器逼你处理，哪怕你根本不想处理）。然后 <code>lines.stream().filter(...).sorted().collect(Collectors.toList())</code>，再开一个 <code>BufferedWriter</code> 写出去，再 catch 一层异常，再处理一下编码（默认平台编码这个坑能写一篇专文）。
        </p>

        <p>
          十几行起步。<strong>每一行都在和语言斗争，而不是在表达需求。</strong>
        </p>

        <p>
          Python 的哲学是 <em>"There should be one—and preferably only one—obvious way to do it."</em>（应该有一种，最好只有一种，显然的做法）。Java 的哲学是 <em>"There should be a Factory, an AbstractFactory, a Builder, a Strategy, and seventeen interfaces to do it."</em>（应该有一个工厂、一个抽象工厂、一个建造者、一个策略、和十七个接口来做它）。
        </p>

        <p>
          Java 程序员会反驳："但 Java 类型安全！" 朋友，TypeScript 的类型系统比 Java 强一个时代；Rust 的类型系统比 Java 强两个时代；Kotlin 在 JVM 上都把 Java 按在地上摩擦。Java 的"类型安全"是 1990 年代水平的类型安全，到了 2026 年，<strong>它的"严谨"已经从优势变成了惯性</strong>。
        </p>

        <h2>八、字符串：又是一个补丁套补丁</h2>

        <p>
          <code>String</code> 不可变，听起来很优雅。但因为不可变，<code>"a" + "b" + "c"</code> 在循环里就会创建一堆中间对象，GC 压力爆炸。怎么办？再造一个 <code>StringBuilder</code>。<code>StringBuilder</code> 不线程安全？再造一个 <code>StringBuffer</code>。<strong>同一个"拼字符串"的需求，三个类，规则各不相同。</strong>
        </p>

        <p>
          Python 直接 <code>"".join(parts)</code>，一行，性能优秀，没有第二套 API。Go 用 <code>strings.Builder</code>，一个就够。Java 偏要给你三个，再写一篇博客告诉你"什么时候用哪个"，然后这成了面试题。<strong>把语言缺陷做成知识点考你，是 Java 教育的另一项发明。</strong>
        </p>

        <h2>九、空指针：诞生 60 年后还在折磨 Java 程序员</h2>

        <p>
          Tony Hoare 在 1965 年发明了 null，他自己后来把这件事称为"<strong>价值十亿美元的错误</strong>"。Kotlin、Swift、Rust、TypeScript 都用类型系统在编译期把 null 干掉了。Java 呢？Java 在 2014 年加了 <code>Optional</code>——
        </p>

        <p>
          <strong>不是替换 null，是在 null 旁边再加一个东西</strong>。于是你的代码里既有可能 null 的对象，又有 <code>Optional&lt;T&gt;</code>，还有 <code>@Nullable</code>、<code>@NonNull</code> 注解（不同框架的注解还不通用，Spring 一套、JetBrains 一套、JSR-305 一套）。<strong>本来是要解决一个问题，结果变成四个问题并存。</strong>
        </p>

        <p>
          这就是 Java 的修辞模式：<em>"我们不删旧的，我们加新的，你自己挑。"</em> 加到最后，语言里全是历史地层，每一层都活着，每一层都能咬你。
        </p>

        <h2>九点五、横向对比：别的语言也有缺点，但都比 Java 体面</h2>

        <p>
          有人会说：你光骂 Java，难道别的语言就没毛病？当然有。每门语言都是某个时代、某个权衡下的产物，都有自己的脏地方。但<strong>"有缺点"和"通体缝合"是两件事</strong>。我下面挨个过一遍，公允地说每门语言烂在哪儿，然后你自己判断和 Java 比起来谁更体面。
        </p>

        <h3>Go：丑，但是诚实</h3>

        <p>
          Go 的缺点是真存在的：错误处理啰嗦到反人类，<code>if err != nil &#123; return err &#125;</code> 三行一组，写多了自己看着都烦；早期没有泛型，2022 年才加，加之前写容器代码全靠 <code>interface&#123;&#125;</code> + 类型断言，丑得离谱；没有继承，全靠组合和接口，OOP 老炮儿一开始很不适应；<code>nil interface</code> 那个坑（typed nil ≠ untyped nil）能让任何老手栽跟头一次。
        </p>

        <p>
          但 Go 有一件事 Java 永远学不来：<strong>它知道自己在做什么</strong>。Go 的设计哲学是"少就是多"——只有一种写循环的方式，只有一种格式化代码的方式（<code>gofmt</code> 全宇宙统一），并发就是 goroutine + channel，没有第二套。它丑，但它<strong>诚实地丑</strong>，不假装自己优雅。Java 是又复杂又假装优雅，这是两个境界。
        </p>

        <h3>Python：慢，并发拉胯，但写起来像在思考</h3>

        <p>
          Python 的问题大家心里都有数：<strong>GIL 全局解释器锁</strong>让多线程在 CPU 密集场景下基本等于单线程，多核优势完全发挥不出来，要并行只能开多进程，进程间通信又是另一套坑；运行慢，纯 Python 跑数值计算能比 C 慢 50 倍，所以科学计算才要靠 NumPy 这种 C 扩展续命；动态类型导致大型项目重构地狱（虽然现在有 type hints + mypy + Pyright 缓解，但和真静态语言比还差一档）；打包和依赖管理是一段血泪史，<code>pip / virtualenv / poetry / pipenv / conda / uv</code> 一路换过来，每一代都说自己解决了上一代的问题。
        </p>

        <p>
          但你注意到没——<strong>Python 的缺点是"它做不到某些事"，Java 的缺点是"它做事的方式让人崩溃"</strong>。这是两种完全不同的烂。Python 慢，是物理事实；Java 啰嗦，是设计选择。Python 的 GIL 是为了内存管理简化做的妥协，缺点公开承认、社区一直在试图解决（PEP 703 已经在推进 free-threaded Python）；Java 的缝合是为了不破坏向后兼容，缺点被包装成"特性"，社区还要写文章夸"这就是 Java 严谨的地方"。
        </p>

        <p>
          就算 Python 并发再差，<strong>写一个 CRUD Web 服务的体验也比 Java 好十倍</strong>。FastAPI + SQLAlchemy 半小时搭出来的东西，类型安全、有自动文档、有异步、代码量是 Spring Boot 的五分之一。而当你真的需要高并发，你会上 Go、Rust、Elixir，<em>不会</em>上 Java——会上 Java 的唯一理由是"团队只会 Java"，这是社会问题，不是技术问题。
        </p>

        <h3>Rust：陡，但陡得有意义</h3>

        <p>
          Rust 的缺点也明摆着：<strong>学习曲线像悬崖</strong>，所有权、借用、生命周期、<code>Pin</code>、<code>async</code> 那一套足够劝退 90% 的初学者；编译慢；异步生态分裂（<code>tokio</code> / <code>async-std</code> / <code>smol</code>）；写起来确实比 Go 慢，类型推导报错信息有时长得像编译器在哭。
        </p>

        <p>
          但 Rust 的难是<strong>"在帮你解决真实问题"的难</strong>——内存安全、并发安全、零成本抽象，每一条都对应着 C/C++ 三十年踩过的坑。你被借用检查器骂三个小时，换来的是这段代码<strong>永远不会有 use-after-free、不会有 data race</strong>。Java 的难是"在帮你应付历史包袱"的难——你研究三天 JMM、搞清楚 happens-before，换来的是<strong>祖传代码不会突然崩</strong>。前者是投资，后者是还债。
        </p>

        <h3>Kotlin：JVM 上的"如果 Java 能重来"</h3>

        <p>
          Kotlin 的缺点：编译慢一点、和某些 Java 框架结合时有反射坑、协程的取消机制需要时间理解、生态相对小（虽然能直接用 Java 的所有库）。
        </p>

        <p>
          但 Kotlin 几乎是<strong>对 Java 所有原罪的逐条平反</strong>：null safety 在类型层面解决（<code>String?</code> 和 <code>String</code> 是不同类型）、数据类一行搞定（<code>data class User(val name: String)</code>）、扩展函数、smart cast、协程原生支持、不需要 <code>;</code>、不需要 <code>new</code>、<code>when</code> 取代 <code>switch</code>、属性自动 getter/setter。<strong>JetBrains 用 Kotlin 等于宣告了 Java 设计的破产</strong>——一群最懂 JVM 的工程师，做出来的 Java 替代品长这样，这本身就是判决书。
        </p>

        <h3>JavaScript / TypeScript：野，但野得灵活</h3>

        <p>
          JS 的黑历史不用我说：<code>== / ===</code> 双重相等、<code>this</code> 漂移、<code>0.1 + 0.2 !== 0.3</code>、<code>typeof null === "object"</code>、自动类型转换的迷惑行为足够写一本《JS 的怪癖》。生态混乱也是真的，<code>node_modules</code> 黑洞、构建工具几年换一代（Grunt → Gulp → Webpack → Rollup → Vite → esbuild → Turbopack）。
        </p>

        <p>
          但 TypeScript 用一套<strong>结构类型 + 类型推导</strong>把 JS 的烂账擦得相当干净。今天写 TS 的体验：类型系统强大（联合、交叉、条件、模板字面量、infer），编辑器智能、生态宇宙第一、迭代速度极快。<strong>TS 的类型系统比 Java 的强一个时代不止</strong>——你在 Java 里想表达"这个函数返回 T，T 是参数 obj 的某个 key 对应的值类型"，得写一段 PhD 级别的泛型；TS 里就是 <code>function get&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K]</code>，一行。
        </p>

        <h3>那 Java 呢？</h3>

        <p>回到主角。Java 的"缺点"和上面这些都不在一个维度：</p>

        <p>Go 是<strong>丑</strong>但<strong>统一</strong>；Java 是<strong>啰嗦</strong>且<strong>分裂</strong>。</p>

        <p>Python 是<strong>慢</strong>但<strong>表达力强</strong>；Java 是<strong>不算快</strong>（启动慢、内存大）且<strong>表达力弱</strong>（同样的事多写五倍代码）。</p>

        <p>Rust 是<strong>难</strong>但<strong>难得有回报</strong>；Java 是<strong>不难也不优雅</strong>，难的部分（JMM、泛型擦除、Spring 玄学）全是历史债，学了对你下一份工作以外的人生毫无意义。</p>

        <p>Kotlin 是<strong>Java 的进化形态</strong>，存在本身就是对 Java 的判决；TypeScript 在动态语言上做出的类型系统都比 Java 强。<strong>横向看一圈，Java 是唯一一门"缺点是设计哲学本身"的主流语言。</strong></p>

        <blockquote>
          其它语言的缺点，是它们没做到的事；<br />
          Java 的缺点，是它做到了的事。
        </blockquote>

        <h2>十、那为什么还有这么多人写 Java？</h2>

        <p>
          因为<strong>沉没成本</strong>。银行 20 年的核心系统是 Java 写的，重写一遍要十亿，谁来背锅？因为<strong>就业市场</strong>。Java 岗位多，培训班批量产出 Java 程序员，HR 招 Java 比招 Rust 容易。因为<strong>JVM 真的不错</strong>——这是我唯一愿意夸的东西，HotSpot 的 JIT 是工程奇迹，但<strong>JVM 的优秀不能掩盖 Java 语言的平庸</strong>。Kotlin、Scala、Clojure 都跑在 JVM 上，比 Java 好用得多。
        </p>

        <p>
          Java 之于现代编程语言，就像 COBOL 之于 1990 年代——<strong>不是它好，是它走不掉</strong>。一个被时代选中、被生态绑架、被 KPI 供养的语言，它的延续不是技术胜利，是社会学现象。
        </p>

        <h2>结语：缝合怪的胜利，是行业的失败</h2>

        <p>
          我不恨 Java，恨的是这个行业把"流行"当成"正确"、把"复杂"当成"严谨"、把"历史包袱"当成"成熟稳重"的集体催眠。Java 用三十年的时间证明了一件事：<strong>一个语言只要够早、够稳、够能招人，它的烂就能被叫做"特性"，它的坑就能被写进面试题，它的补丁就能被包装成"演进"。</strong>
        </p>

        <p>
          下次再有人跟你说"Java 严谨""Java 是企业级"，你可以礼貌地点点头，然后心里默念：<em>严谨的不是 Java，是被 Java 折磨了二十年还不敢离开的人。</em>
        </p>

    </ArticleLayout>
  );
}
