# 组件模板

React 开发模式, 优先使用 hooks 管理状态

使用 TypeScript 语言提高业务开发体验, 代码间请加上必要的注释, 参数类型等

组件适配多平台 H5 微信小程序 字节跳动小程序

开发过程中请完善 web 的测试用例, H5 调试完成后, 再调试对应的其他小程序端

```bash
$ wff dev -h #默认 H5调试
$ wff dev -w #微信小程序
$ wff dev -t #字节跳动小程序
```

## 多端

使用的框架是 <https://remaxjs.org/>

## 目录规范

```bash
├── README.md
├── package.json
├── src
│   └── index.tsx
└── tsconfig.json
```