📚 Personal Library (CLC Edition)

一个基于 中国图书馆分类法（CLC） 的个人图书馆管理系统。

目标：
在 10 秒内回答：

我有哪些书？

某类（如 I 文学、TP 计算机）我有多少？

某本书属于哪个类？

✨ 功能特性（v0.1）
📖 书籍管理

新增书籍

编辑书籍

删除书籍

搜索（标题 / 作者 / ISBN）

按 CLC 分类筛选

🗂 CLC 分类浏览

按大类浏览（A / B / C / I / TP 等）

显示每个大类藏书数量

统计结构概览

🏷 标签导出

导出类目标签（支持 PDF / CSV）

用于打印贴在书脊

🏗 技术架构
Frontend (React + Vite + TS)
        │
        │ HTTP API
        ▼
Backend (FastAPI)
        │
        ▼
SQLite（v0.2）
📂 项目结构
my-library/
  frontend/              # React + Vite + TypeScript
  backend/               # FastAPI
    app/
      main.py
      api/
      schemas/
    venv/
  README.md
🚀 本地开发启动指南
1️⃣ 启动后端

进入 backend 目录：

cd backend

创建虚拟环境：

python -m venv venv

激活（Windows）：

venv\Scripts\activate

安装依赖：

pip install fastapi uvicorn

启动服务：

uvicorn app.main:app --reload

访问 API 文档：

http://127.0.0.1:8000/docs
2️⃣ 启动前端

进入 frontend 目录：

cd frontend

安装依赖：

npm install

启动开发服务器：

npm run dev

默认地址：

http://localhost:5173
🔌 前后端连接说明

前端通过 /api 访问后端。

推荐在 vite.config.ts 中配置：

server: {
  proxy: {
    "/api": "http://127.0.0.1:8000",
  }
}

后端 API 统一前缀：

/api/v1/...
🧠 设计理念

本项目不是“读书记录工具”，而是：

一个结构化的个人馆藏管理系统。

强调：

分类结构清晰

数据可统计

类目统一（基于 CLC）

接近真实图书馆体系

🗺 版本规划
v0.1

手动录入

CLC 大类管理

基础统计

标签导出

v0.2

SQLite 数据库存储

完整分页

PDF 标签排版优化

Docker 部署

v1.0

ISBN 自动识别

扫码录入

书籍封面抓取

部署到云服务器

🛠 开发规范

后端 API 使用 RESTful 风格

接口统一前缀 /api/v1

前后端分离架构

虚拟环境不提交到 git

建议 .gitignore：

venv/
__pycache__/
*.pyc
node_modules/
dist/
🎯 项目定位

个人学习项目
用于练习：

全栈架构设计

FastAPI 实践

前后端接口规范

数据结构建模

工程化项目组织能力

👤 Author

echo Q
Full-stack experiment project
CLC-based personal knowledge organization system

🌱 未来可能方向

个人图书数据分析（阅读偏好）

可视化馆藏结构图

多端同步

公开展示个人书架