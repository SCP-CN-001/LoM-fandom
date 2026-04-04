# GitHub Pages + CI/CD + Linter 快速启动指南

## 1. 初始推送到 GitHub

1. **确保本地仓库已连接到 GitHub**
   ```bash
   git remote -v
   # 应该看到 origin 指向 https://github.com/SCP-CN-001/LoM-fandom.git
   ```

2. **如果还没有初始化，运行**
   ```bash
   git add .
   git commit -m "chore: setup github pages and linter"
   git push origin main
   ```

## 2. GitHub 仓库设置

1. **访问**仓库设置 → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

2. **确认部署工作流已启用**
   - Settings → Actions → General
   - Actions permissions: Allow all actions and reusable workflows

## 3. 本地开发工作流

### 安装依赖
```bash
npm install
```

### 使用前置钩子 (pre-commit)

1. **安装 pre-commit**
   ```bash
   # 如果你用macOS/Linux
   brew install pre-commit

   # 或其他包管理器
   pip install pre-commit  # Python
   ```

2. **初始化钩子**
   ```bash
   pre-commit install
   ```

3. **测试钩子**
   ```bash
   # 手动运行所有检查
   pre-commit run --all-files

   # 提交时自动运行（已安装钩子后）
   git add .
   git commit -m "feat: something"
   ```

### 本地 Lint 和 Format

```bash
# 检查 lint 错误（不修改文件）
npm run lint

# 自动修复 lint 错误
npm run lint:fix

# 检查代码格式（不修改文件）
npm run format:check

# 自动格式化代码
npm run format
```

## 4. GitHub Actions 工作流

### 部署流程 (deploy.yml)
- **触发条件**: push 到 main 分支
- **流程**:
  1. 检出代码
  2. 设置 Node 22
  3. 安装依赖
  4. 构建项目
  5. 上传构建产物
  6. 部署到 GitHub Pages

- **结果**: 自动发布到 https://scp-cn-001.github.io/LoM-fandom

### 代码质量检查 (lint.yml)
- **触发条件**: Push 到 main 或 Pull Request
- **流程**:
  1. 运行 ESLint（检查代码质量）
  2. 运行 Prettier（检查代码格式）

- **失败反应**: PR 会显示 check 失败，需要修复后重新提交

## 5. 开发建议

### 推荐工作流

```bash
# 1. 新建分支做功能
git checkout -b feature/new-page

# 2. 开发时实时检查
npm run lint:fix  # 修复 lint 错误
npm run format    # 格式化代码

# 3. 提交前运行
pre-commit run --all-files

# 4. 推送并创建 PR
git push origin feature/new-page

# 5. PR 通过所有 checks 后合并
# 6. push 到 main 时自动部署
```

### VS Code 扩展推荐

- **ESLint**: dbaeumer.vscode-eslint
- **Prettier**: esbenp.prettier-vscode
- **Astro**: astro-build.astro-vscode

**VS Code 工作区设置** (`.vscode/settings.json`):
```json
{
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "eslint.validate": ["astro", "typescript", "typescriptreact"]
}
```

## 6. 网站访问

当部署完成后，网站会在以下地址可访问：

- **主页**: https://scp-cn-001.github.io/LoM-fandom/
- **世界观**: https://scp-cn-001.github.io/LoM-fandom/zh/worldview
- **角色关系**: https://scp-cn-001.github.io/LoM-fandom/zh/relationship
- **时间线**: https://scp-cn-001.github.io/LoM-fandom/zh/timeline
- **地图**: https://scp-cn-001.github.io/LoM-fandom/zh/map

## 7. 监控部署

1. **查看部署状态**
   - 仓库 → Actions → 查看最近的 workflow 运行

2. **查看构建日志**
   - 点击具体的 workflow run → 展开各个 step

3. **查看网站状态**
   - 仓库 → Pages → 查看发布状态

## 8. 常见问题

### Q: 构建失败显示 base path 错误
**A**: 确认 `astro.config.mjs` 中的 `base: '/LoM-fandom'` 正确

### Q: 图片和资源 404
**A**: 使用 `Astro.url` 或相对路径，确保资源相对于 `/LoM-fandom` 基路径

### Q: Pre-commit 检查慢
**A**: 第一次运行会下载 hook 工具，之后会快很多。可以用 `pre-commit run -a --show-diff-on-failure` 调试

### Q: 代码格式冲突
**A**: 本地运行 `npm run format` 确保格式一致，然后提交
