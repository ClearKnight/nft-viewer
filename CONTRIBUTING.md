# 贡献指南

感谢你对 NFT Viewer 项目的关注！这是一个学习项目，欢迎任何形式的贡献。

## 开发环境设置

1. 克隆项目
```bash
git clone https://github.com/ClearKnight/nft-viewer.git
cd nft-viewer
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

## 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── components/         # React 组件
│   ├── Header.tsx      # 页面头部
│   ├── WalletConnect.tsx # 钱包连接
│   ├── NFTViewer.tsx   # 主要 NFT 查看器
│   ├── NFTGrid.tsx     # NFT 网格展示
│   ├── NFTCard.tsx     # NFT 卡片
│   └── ...            # 其他组件
```

## 贡献方式

1. Fork 这个项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 组件使用函数式组件和 hooks
- 保持代码简洁和可读性

## 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Wagmi 文档](https://wagmi.sh/)
- [Viem 文档](https://viem.sh/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)