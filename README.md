# NFT Viewer

一个基于 Next.js、Wagmi 和 Viem 构建的 Web3 NFT 查看器，允许用户连接钱包并查看任何 ERC-721 合约中的 NFT。

## 项目完成情况

✅ **已完成功能**
- 🔗 **钱包连接**: 支持 MetaMask 等注入式钱包连接
- 💰 **余额显示**: 实时显示用户 ETH 余额和钱包地址
- 🎨 **热门 NFT 快捷选择**: 内置 5 个热门 NFT 合约快速选择
- 🔍 **NFT 搜索**: 支持按名称和符号搜索热门 NFT 合约
- 📊 **合约信息**: 显示合约总供应量和用户持有数量
- 🖼️ **NFT 展示**: 完整的 NFT 图片、名称、描述和 Token ID 显示
- 🌐 **IPFS 支持**: 自动处理 IPFS 元数据和图片链接
- 📱 **响应式设计**: 支持桌面和移动设备
- ⚡ **性能优化**: 使用 Next.js 15 和 Turbopack 提升开发体验
- 🔧 **错误处理**: 完善的错误处理和加载状态

## 技术栈

- **Next.js 15**: React 框架，使用 App Router
- **Wagmi 2.16**: React hooks for Ethereum
- **Viem 2.33**: TypeScript 以太坊接口
- **TanStack Query 5.83**: 数据获取和缓存
- **Tailwind CSS 4**: 实用优先的 CSS 框架
- **TypeScript 5**: 完整的类型安全

## 项目架构

### 核心组件
- **NFTViewer**: 主要的 NFT 查看组件，包含所有核心功能
- **WalletConnect**: 钱包连接和断开连接组件
- **Providers**: Wagmi 和 React Query 提供者配置

### API 路由
- `/api/nft/token-of-owner-by-index`: 获取用户指定索引的 Token ID
- `/api/nft/token-uri`: 获取指定 Token 的 URI 和元数据

### 内置热门 NFT 合约
- **Bored Ape Yacht Club** (BAYC): `0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D`
- **CryptoPunks** (PUNKS): `0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB`
- **Doodles** (DOODLE): `0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e`
- **Azuki** (AZUKI): `0xED5AF388653567Af7F388a6234A7Dd8c4E3E28c8`
- **Moonbirds** (MOONBIRD): `0x23581767a106ae21c074b2276D25e5C3e136a68b`

## 快速开始

### 环境要求
- Node.js 18+
- Web3 钱包 (MetaMask 等)

### 安装和运行

1. 克隆项目:
```bash
git clone <repository-url>
cd nft-viewer
```

2. 安装依赖:
```bash
npm install
```

3. 启动开发服务器:
```bash
npm run dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 使用方法

1. **连接钱包**: 点击 "Connect Wallet" 选择你的钱包
2. **选择 NFT 合约**: 
   - 使用搜索框快速找到热门 NFT
   - 或直接输入任何 ERC-721 合约地址
3. **查看 NFT**: 点击 "Fetch My NFTs" 加载并显示你拥有的 NFT

## 项目结构

```
nft-viewer/
├── src/
│   ├── app/
│   │   ├── api/nft/           # API 路由
│   │   │   ├── token-of-owner-by-index/
│   │   │   └── token-uri/
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx          # 首页
│   └── components/
│       ├── NFTViewer.tsx      # 主要 NFT 查看器
│       ├── Providers.tsx      # Web3 提供者配置
│       └── WalletConnect.tsx  # 钱包连接组件
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 开发脚本

- `npm run dev`: 启动开发服务器 (使用 Turbopack)
- `npm run build`: 构建生产版本
- `npm run start`: 启动生产服务器
- `npm run lint`: 运行 ESLint 检查

## 特色功能

### 智能合约交互
- 使用 Viem 进行类型安全的合约调用
- 支持 ERC-721 标准的所有核心功能
- 自动处理 IPFS 链接转换

### 用户体验优化
- 加载状态和错误处理
- 响应式网格布局
- 图片加载失败的优雅降级
- 实时余额和合约信息显示

### 开发体验
- 完整的 TypeScript 支持
- ESLint 代码规范
- 组件化架构
- 清晰的错误调试信息

## 技术亮点

1. **现代化技术栈**: 使用最新版本的 Next.js 15 和相关依赖
2. **类型安全**: 全面的 TypeScript 类型定义
3. **性能优化**: 使用 React Query 进行数据缓存
4. **用户友好**: 直观的界面和完善的错误处理
5. **可扩展性**: 模块化的组件设计，易于添加新功能

## 许可证

MIT License
