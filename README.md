# 航班订票查询系统

基于 React + TypeScript + FastAPI 的现代化航班查询系统，集成聚合数据航班查询API。

## 功能特性

- 🛫 实时航班查询（出发地、目的地、日期）
- 🔍 多条件筛选（航空公司、价格范围、时间段）
- 📱 响应式设计，支持桌面和移动端
- ⚡ 现代化UI/UX设计，Material Design风格
- 📊 航班信息完整展示（价格、时间、准点率等）
- 💾 搜索历史记录
- 🎯 智能排序（按价格、时间）

## 技术栈

### 前端
- React 18 + TypeScript
- Tailwind CSS + Material Design
- Axios for API calls
- Lucide React icons

### 后端
- Python + FastAPI
- Requests for external API calls
- CORS middleware
- Environment variables configuration

### API集成
- 聚合数据航班查询API
- 实时航班数据获取
- 错误处理和重试机制

## 项目结构

```
flight-query-vecli-dpsk/
├── frontend/                 # React前端应用
│   ├── src/
│   │   ├── components/       # 可复用组件
│   │   ├── hooks/           # 自定义Hooks
│   │   ├── services/        # API服务
│   │   ├── types/           # TypeScript类型定义
│   │   └── utils/           # 工具函数
│   ├── tailwind.config.js   # Tailwind配置
│   └── package.json
├── backend/                  # FastAPI后端服务
│   ├── main.py              # 应用入口
│   ├── .env                 # 环境变量
│   └── requirements.txt     # Python依赖
└── README.md
```

## 快速开始

### 后端启动

1. 进入backend目录并安装依赖：
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

2. 启动FastAPI服务：
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

后端服务将在 http://localhost:8000 运行

### 前端启动

1. 进入frontend目录并安装依赖：
```bash
cd frontend
npm install
```

2. 启动React开发服务器：
```bash
npm start
```

前端应用将在 http://localhost:3000 运行

## API接口

### 航班查询
- **端点**: `GET /api/flights`
- **参数**:
  - `dcity`: 出发城市三字码 (如: PEK)
  - `acity`: 到达城市三字码 (如: SHA)  
  - `date`: 出发日期 (YYYY-MM-DD)
  - `flight_type`: 航班类型 (oneway/roundtrip)
  - `return_date`: 返程日期 (YYYY-MM-DD)

### 健康检查
- **端点**: `GET /api/health`
- **响应**: 服务状态信息

## 环境变量

后端需要配置以下环境变量（在backend/.env文件中）：

```env
FLIGHT_API_KEY=your_api_key_here
FLIGHT_API_URL=https://apis.juhe.cn/flight/query
```

## 开发特性

- ✅ TypeScript严格模式
- ✅ 响应式设计
- ✅ 错误边界处理
- ✅ 加载状态管理
- ✅ 搜索历史持久化
- ✅ 现代化的UI组件
- ✅ API错误处理和重试
- ✅ 输入验证和清理

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

MIT License