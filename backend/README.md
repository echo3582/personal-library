📚 Personal Library API (CLC v0.1)

个人图书馆后端服务
基于 FastAPI 实现，支持：

书籍 CRUD

CLC 大类统计

搜索 / 分页

标签导出（v0.1）

🏗 技术栈

Python 3.11+

FastAPI

Uvicorn

Pydantic

📂 项目结构
backend/
  venv/               # 虚拟环境（不提交 git）
  app/
    main.py
    api/
      v1/
        books.py
        clc.py
        labels.py
    schemas/
      book.py
      clc.py
      labels.py
  requirements.txt
  README.md
🚀 本地开发启动方式
1️⃣ 创建虚拟环境

在 backend 目录下执行：

python -m venv venv
2️⃣ 激活虚拟环境

Windows:

venv\Scripts\activate

Mac / Linux:

source venv/bin/activate

成功后命令行前会出现：

(venv)
3️⃣ 安装依赖
pip install fastapi uvicorn

（如需 WebSocket 支持可安装：）

pip install uvicorn[standard]
4️⃣ 启动服务
uvicorn app.main:app --reload

参数说明：

app.main → app 目录下的 main.py

:app → main.py 中的 FastAPI 实例变量名

--reload → 开发模式自动重载

🌐 服务地址

启动成功后访问：

API 文档（Swagger）:

http://127.0.0.1:8000/docs

健康检查：

http://127.0.0.1:8000/health
🔌 前端对接说明

前端默认运行在：

http://localhost:5173

推荐在 Vite 中配置代理：

server: {
  proxy: {
    "/api": "http://127.0.0.1:8000",
  }
}

后端接口统一使用：

/api/v1/...
📦 生成 requirements.txt（可选）

如需锁定依赖版本：

pip freeze > requirements.txt

重新安装依赖：

pip install -r requirements.txt
🧪 测试接口示例

获取书籍列表：

GET /api/v1/books

新增书籍：

POST /api/v1/books
🧭 后续规划

v0.2 计划：

SQLite 数据库存储

完整分页支持

标签 PDF 生成

Docker 部署

📌 注意事项

venv/ 不要提交到 git

使用 .gitignore 忽略：

venv/
__pycache__/
*.pyc
👤 作者

Personal project by echo Q
CLC-based personal book management system