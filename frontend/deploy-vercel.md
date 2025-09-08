# Vercel 部署指南

## 方法一：使用 Vercel Web 界面部署

1. **访问 Vercel**: https://vercel.com/
2. **注册/登录** GitHub 账号
3. **导入项目**:
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 授权访问你的 GitHub 仓库

4. **配置设置**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: `https://gd13hkolalm04ug7aov80.apigateway-cn-beijing.volceapi.com/api`

5. **点击 Deploy**

## 方法二：使用 GitHub 部署

1. **创建 GitHub 仓库**
2. **上传前端代码**:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

3. **在 Vercel 中连接 GitHub 仓库**

## 环境变量配置

在 Vercel 仪表板中设置以下环境变量：
- `REACT_APP_API_URL`: `https://gd13hkolalm04ug7aov80.apigateway-cn-beijing.volceapi.com/api`

## 手动部署步骤

如果 CLI 有问题，可以：

1. 将 `frontend` 文件夹压缩为 ZIP 文件
2. 访问 https://vercel.com/
3. 点击 "Deploy" -> "Drag & Drop"
4. 上传 ZIP 文件
5. 按照提示完成部署

## 部署后验证

1. 访问 Vercel 提供的域名
2. 测试搜索功能是否正常工作
3. 检查浏览器开发者工具中的网络请求

## 故障排除

如果遇到 CORS 问题，确保后端 API 的 CORS 配置允许 Vercel 域名。