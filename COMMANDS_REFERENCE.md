# 快速命令参考

## 本地开发

```bash
# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

## 代码质量检查

```bash
# 运行 ESLint（检查代码质量）
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# 检查代码格式（Prettier）
npm run format:check

# 自动格式化所有代码
npm run format
```

## Pre-commit 钩子（本地推送前自动检查）

```bash
# 首次安装 pre-commit
brew install pre-commit  # macOS
# 或
pip install pre-commit   # Linux/其他

# 初始化钩子
pre-commit install

# 手动运行所有检查
pre-commit run --all-files

# 从注册表更新 hooks
pre-commit autoupdate
```

## Git 工作流

```bash
# 新建分支开发功能
git checkout -b feature/my-feature

# 修改文件后，自动修复格式和 lint 问题
npm run format
npm run lint:fix

# 提交（pre-commit 钩子会自动检查）
git add -A
git commit -m "feat: add my feature"

# 推送到 GitHub
git push origin feature/my-feature

# 创建 PR，等待 GitHub Actions 检查通过
# 检查通过后，管理员合并到 main
# 合并后，GitHub Actions 自动部署到 GitHub Pages
```

## 部署查看

```bash
# 查看 GitHub Actions 日志
# https://github.com/SCP-CN-001/LoM-fandom/actions

# 查看网站状态
# https://github.com/SCP-CN-001/LoM-fandom/settings/pages

# 访问网站
# https://scp-cn-001.github.io/LoM-fandom/
```

## VS Code 推荐设置

- **自动格式化保存**: 已配置在 `.vscode/settings.json`
- **ESLint 实时检查**: 已启用
- **推荐扩展**:
  - ESLint: dbaeumer.vscode-eslint
  - Prettier: esbenp.prettier-vscode
  - Astro: astro-build.astro-vscode

安装后会自动看到代码问题和格式建议。

## 常见场景

### 场景 1: 本地修改后推送
```bash
npm run format     # 统一格式
npm run lint:fix   # 修复 lint 问题
git add -A
git commit -m "fix: update something"
git push origin main
# → GitHub Actions 自动构建和部署
```

### 场景 2: Pre-commit 卡住
```bash
# 检查是哪个 hook 失败
pre-commit run --all-files --show-diff-on-failure

# 如果是格式问题，直接修复
npm run format

# 重新 commit
git add -A
git commit -m "..."
```

### 场景 3: GitHub Actions 失败
1. 访问 https://github.com/SCP-CN-001/LoM-fandom/actions
2. 找到失败的 workflow 点击查看日志
3. 根据错误信息修复本地代码
4. 本地通过 `npm run lint` 和 `npm run format:check` 验证
5. 重新 push
