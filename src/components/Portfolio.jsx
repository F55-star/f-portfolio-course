"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown, X, Github, Volume2, VolumeX, RotateCcw, Box } from "lucide-react";
import profile from "@/data/profile.json";

const RenderModel = dynamic(() => import("./RenderModel"), { ssr: false });
const Wizard = dynamic(() => import("./models/Wizard"), { ssr: false });
const HatModel = dynamic(() => import("./models/HatModel"), { ssr: false });
const Staff = dynamic(() => import("./models/Staff"), { ssr: false });
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path) => `${base}${path}`;
const assignmentTitle = `${profile.studentId}${profile.name}的第一个网页`;
const models = { wizard: Wizard, hat: HatModel, staff: Staff };

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: .65, delay, ease: [.2,.7,.2,1] }}>{children}</motion.div>;
}

export default function Portfolio() {
  const [filter, setFilter] = useState("全部");
  const [project, setProject] = useState(null);
  const [showModels, setShowModels] = useState(false);
  const [model, setModel] = useState("wizard");
  const [muted, setMuted] = useState(true);
  const [audioError, setAudioError] = useState("");
  const [menu, setMenu] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const audioRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocus = useRef(null);
  const reduced = useReducedMotion();
  const modalOpen = !!project || showModels || showCredits;
  const Model = models[model];
  const visibleProjects = profile.projects.filter(p => filter === "全部" || p.category === filter);

  useEffect(() => {
    const timer = setTimeout(() => setSceneReady(true), 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!modalOpen) return;
    returnFocus.current = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => closeRef.current?.focus(), 0);
    const handleKey = (e) => {
      if (e.key === "Escape") { setProject(null); setShowModels(false); setShowCredits(false); }
      if (e.key === "Tab") {
        const nodes = document.querySelectorAll(".dialog button, .dialog a[href]");
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => { clearTimeout(timer); document.body.style.overflow = previous; document.removeEventListener("keydown", handleKey); returnFocus.current?.focus?.(); };
  }, [modalOpen]);

  async function toggleAudio() {
    if (!audioRef.current) return;
    if (muted) {
      try { await audioRef.current.play(); setMuted(false); setAudioError(""); }
      catch { setAudioError("音频暂时不可用，请稍后重试。"); }
    } else { audioRef.current.pause(); setMuted(true); }
  }
  function close() { setProject(null); setShowModels(false); setShowCredits(false); }

  return <>
    <a href="#main" className="skip-link">跳转至正文</a>
    <header className="navigation">
      <a className="brand" href="#main" aria-label="F 首页">F<span>®</span></a>
      <span className="nav-caption">ENVIRONMENT & LEVEL ART</span>
      <button className="menu-toggle" aria-label="切换导航菜单" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? "关闭" : "菜单"}</button>
      <nav className={menu ? "nav-links opened" : "nav-links"} aria-label="主导航">
        <a href="#works" onClick={() => setMenu(false)}>作品索引 <span>01</span></a>
        <a href="#about" onClick={() => setMenu(false)}>关于我 <span>02</span></a>
        <a href="#contact" onClick={() => setMenu(false)}>联系 <ArrowUpRight size={13} /></a>
      </nav>
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image"><img src={asset("/background/home-background.png")} alt="开源模板提供的幻想森林场景" fetchPriority="high" /></div>
        <div className="hero-shade" />
        <div className="hero-layout">
          <motion.div className="hero-copy" initial={reduced ? false : { opacity:0, y:30 }} animate={{opacity:1,y:0}} transition={{duration:.9}}>
            <p className="eyebrow"><i /> F / DIGITAL ENVIRONMENTS</p>
            <h1 id="hero-title">场景，<br />是故事的<span>开始。</span></h1>
            <p className="hero-intro">范逸风 · 数字媒体技术<br />场景模型师 / 地编师</p>
            <a href="#works" className="hero-button">进入我的世界 <ArrowUpRight size={19} /></a>
            <div className="hero-course"><span>FIRST WEBSITE / 2026</span><p>{assignmentTitle}</p></div>
          </motion.div>
          <div className="hero-object">
            <span className="object-label"><Box size={13} /> REALTIME / THREE.JS</span>
            <div className="model-stage">{sceneReady && <RenderModel><Wizard /></RenderModel>}</div>
            <button className="inspect-button" onClick={() => setShowModels(true)}>查看 3D 示例 <ArrowUpRight size={14} /></button>
            <p className="sample-label">模板模型示例 · 非个人作品</p>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#works"><ArrowDown size={16} /> SCROLL TO EXPLORE</a>
          <span>PORTFOLIO / F · 2026</span>
          <button className="audio-toggle" onClick={toggleAudio} aria-label={muted ? "开启环境声音" : "关闭环境声音"}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />} <span>{muted ? "声音关闭" : "声音开启"}</span></button>
        </div>
        <audio ref={audioRef} loop preload="none" src={asset("/audio/birds39-forest-20772.mp3")} />
        {audioError && <p className="audio-error" role="status">{audioError}</p>}
      </section>

      <section className="works section-shell" id="works" aria-labelledby="works-title">
        <Reveal className="section-top"><p className="eyebrow">01 / SELECTED ENVIRONMENTS</p><p className="section-note">空间 · 材质 · 光影</p></Reveal>
        <Reveal className="section-heading"><h2 id="works-title">世界的切片<span>。</span></h2><p>在不同的空间里，寻找自己的视觉语言。<br />以下为网站栏目示例，个人作品将陆续替换。</p></Reveal>
        <div className="filters" role="group" aria-label="筛选作品栏目">
          {["全部","场景氛围","环境叙事","风格化"].map(f => <button key={f} aria-pressed={filter===f} onClick={() => setFilter(f)}>{f}{filter===f && <span>↗</span>}</button>)}
          <span className="works-count">{String(visibleProjects.length).padStart(2,"0")} / PROJECTS</span>
        </div>
        <div className="project-grid">
          {visibleProjects.map((p,i) => <Reveal key={p.id} delay={i*.05} className="project-card">
            <button onClick={() => setProject(p)} className="project-image" aria-label={`查看${p.title}`}>
              <img src={asset("/background/"+p.image)} alt={`${p.title}栏目示例画面`} loading="lazy" />
              <span className="project-index">0{profile.projects.findIndex(x=>x.id===p.id)+1}</span><span className="preview-tag">示例画面</span>
              <span className="project-open"><ArrowUpRight size={23} /></span>
            </button>
            <div className="project-title"><div><p>{p.english}</p><h3>{p.title}</h3></div><span>{p.category}</span></div>
          </Reveal>)}
        </div>
      </section>

      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <Reveal className="about-mark" aria-hidden="true">F<span> /</span></Reveal>
        <div className="about-copy">
          <Reveal><p className="eyebrow">02 / BEHIND THE WORLDS</p><h2 id="about-title">用空间，<br />讲一个<span>好故事。</span></h2></Reveal>
          <Reveal><p className="about-intro">{profile.intro}</p></Reveal>
          <Reveal className="about-details"><div><span>姓名 / NAME</span><p>{profile.name}</p></div><div><span>方向 / FOCUS</span><p>{profile.role}</p></div><div><span>学号 / STUDENT ID</span><p>{profile.studentId}</p></div></Reveal>
          <Reveal className="tool-list">{profile.tools.map((tool,i)=><span key={tool}><i>0{i+1}</i>{tool}</span>)}</Reveal>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <Reveal><p className="eyebrow">03 / LET'S BUILD SOMETHING</p><h2>下一个世界，<br />期待与你<span>相遇。</span></h2>
          <a className="contact-link" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer"><Github size={21} /> GitHub / {profile.github}<ArrowUpRight size={22} /></a>
          {profile.email && <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>}
        </Reveal>
        <span className="contact-f">F.</span>
      </section>
    </main>

    <footer className="site-footer"><span>© 2026 F / {profile.name}</span><button onClick={() => setShowCredits(true)}>素材来源与开源许可 <ArrowUpRight size={12} /></button><a href="#main">回到顶部 ↑</a></footer>
    <AnimatePresence>
      {modalOpen && <motion.div className="dialog-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={close}>
        <motion.section className={showModels ? "dialog model-dialog" : "dialog"} role="dialog" aria-modal="true" aria-label={showModels ? "开源三维模型预览" : project ? project.title : "素材来源与许可"} onClick={e=>e.stopPropagation()} initial={reduced ? false : {y:20,scale:.98}} animate={{y:0,scale:1}} exit={{y:20,opacity:0}}>
          <button className="dialog-close" ref={closeRef} onClick={close} aria-label="关闭弹窗"><X size={22} /></button>
          {showModels && <>
            <p className="eyebrow">OPEN-SOURCE MODEL VIEWER</p><h2>走近一点。</h2><p className="dialog-description">拖动查看模型，滚轮或双指缩放。这里展示模板自带的授权示例。</p>
            <div className="model-viewer" key={model}><RenderModel interactive><Model /></RenderModel></div>
            <div className="model-options">{[["wizard","巫师"],["hat","帽子"],["staff","法杖"]].map(([v,label])=><button key={v} aria-pressed={model===v} onClick={()=>setModel(v)}>{label}</button>)}<button className="reset-view" onClick={()=>{setModel("wizard");setShowModels(false);setTimeout(()=>setShowModels(true),0)}}><RotateCcw size={13}/>重置</button></div>
            <p className="viewer-credit">CC BY 4.0 · elbertwithane / Enkarra / Toymancer Studio · 非本人建模作品</p>
          </>}
          {project && <>
            <img className="detail-image" src={asset("/background/"+project.image)} alt={project.title+"示例画面"} />
            <div className="detail-copy"><p className="eyebrow">{project.english} / 示例</p><h2>{project.title}</h2><p>{project.description}</p><span className="detail-tools">{project.tools}</span></div>
          </>}
          {showCredits && <div className="credits-content">
            <p className="eyebrow">CREDITS / LICENSES</p><h2>素材与代码来源</h2>
            <p>本站以 CodeBucks 的开源作品集模板为底座，适配了中文内容、页面布局、手机端和静态部署。示例画面与三维模型均明确标注，不作为个人作品。</p>
            <a href="https://github.com/codebucks27/Next.js-Creative-Portfolio-Website" target="_blank" rel="noreferrer">CodeBucks / MIT 开源模板 ↗</a>
            <a href="https://youtu.be/T5t46vuW8fo" target="_blank" rel="noreferrer">模板原作者完整视频教程 ↗</a>
            <a href="https://skfb.ly/6YATu" target="_blank" rel="noreferrer">Tim Mckee - Boy Wizard / elbertwithane / CC BY 4.0 ↗</a>
            <a href="https://skfb.ly/ozxOQ" target="_blank" rel="noreferrer">Stylized wizard hat / Enkarra / CC BY 4.0 ↗</a>
            <a href="https://skfb.ly/6QYZw" target="_blank" rel="noreferrer">Wizard Staff / Toymancer Studio / CC BY 4.0 ↗</a>
            <p>背景图：模板自带，由原作者使用 Playground AI 制作。环境声音：Shiden Beats Music / Pixabay，沿用模板资源。MIT 许可文件随源码保留。</p>
          </div>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </>;
}

