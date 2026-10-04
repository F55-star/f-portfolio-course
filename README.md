# 范逸风的个人展示网站 / 课程作业

学号：2408090601026  
网站标题：2408090601026范逸风的第一个网页  
展示昵称：F  
GitHub：F55-star

## 在电脑上打开

开发项目放在 E:\CodexProjects\F-Portfolio\2408090601026范逸风。

双击“启动网站.cmd”，随后打开 http://localhost:3101 。这是 Next.js 网站，需要本地服务；不要通过双击生产 HTML 来检验 3D 模型。

编辑器：电脑已安装 VS Code，位置 D:\VS CODE\Microsoft VS Code\Code.exe。用“打开文件夹”打开上述项目。

## 修改内容

编辑 src/data/profile.json，可修改姓名、学号、个人介绍、软件、GitHub、联系邮箱和作品。正文及浏览器标题自动使用这份资料。

作品图放到 public/background，修改 profile.json 中对应项目的 image 字段。已提供的三张画面均为模板示例，已在网页上标注“示例画面”，不是个人建模作品。

页面结构：src/components/Portfolio.jsx。  
视觉样式与手机断点：src/app/globals.css。  
网页标题与语言：src/app/layout.js。  
3D 组件：src/components/models；沿用模板现成的 gltfjsx 组件。  
场景与 OrbitControls 集成：src/components/RenderModel.jsx。  
构建输出：out。

## 来源与许可

模板：https://github.com/codebucks27/Next.js-Creative-Portfolio-Website  
完整教程：https://youtu.be/T5t46vuW8fo  
许可证：MIT，原作者版权与许可保留于 LICENSE.md。

模型均为 CC BY 4.0：
- Tim Mckee - Boy Wizard，elbertwithane：https://skfb.ly/6YATu
- Stylized wizard hat，Enkarra：https://skfb.ly/ozxOQ
- Wizard Staff，Toymancer Studio：https://skfb.ly/6QYZw

模板背景图由原作者使用 Playground AI 制作。音频沿用原模板 Pixabay 资源，Shiden Beats Music。网页内也提供完整来源弹窗。

本站是在已跑通模板上的集成适配。使用原有 Next.js、React Three Fiber、drei、Framer Motion、Lucide；没有加入未核实来源的 CrazyGL / ThreeUI，也没有重做裂缝开场。

## 免费空间

预备 GitHub 仓库：F55-star/f-portfolio-course。
只有完成上传并确认 Pages 部署成功后，下面地址才是实际公网网站：
https://f55-star.github.io/f-portfolio-course/

.github/workflows/pages.yml 已配置自动构建和部署。
GitHub 仓库 Settings → Pages → Source 选择 GitHub Actions。
更新源码并提交到 main，会重新上线。

本地构建使用 npm run build。
GitHub Actions 构建设置 NEXT_PUBLIC_BASE_PATH=/f-portfolio-course，处理子目录下的图片、模型和解码器路径。

## 已完成的核对

浏览器标题及正文含完整学号姓名；导航、作品筛选、详情弹窗、模型切换、手机菜单、来源弹窗已测试。
模型解码器已随站点打包，不需要额外外部 CDN。
环境声音默认关闭。
3D 需要 WebGL；不支持时显示提示，文字和图片仍能浏览。

