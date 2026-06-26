<div align="center">

# IBAS InitialFantasy

**身份认证与系统管理模块**

IBAS 系统的核心基础模块，提供用户认证、组织管理、权限控制、应用配置、业务对象编号等系统级功能。

Core infrastructure module for the IBAS system — user authentication, organization management, privilege control, application configuration, and business object numbering.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-1.8+-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.x-red.svg)](https://maven.apache.org/)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](pom.xml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-贡献--contributing)

</div>

---

## 📖 目录 | Table of Contents

- [✨ 特性 | Features](#-特性--features)
- [📦 模块结构 | Modules](#-模块结构--modules)
- [🚀 快速开始 | Quick Start](#-快速开始--quick-start)
- [📋 业务对象 | Business Objects](#-业务对象--business-objects)
- [📚 相关项目 | Related Projects](#-相关项目--related-projects)
- [🤝 贡献 | Contributing](#-贡献--contributing)
- [📄 许可证 | License](#-许可证--license)

---

## ✨ 特性 | Features

- **🔐 用户认证** — 用户登录、密码管理（PBKDF2 安全存储）、Token 机制
- **👥 组织管理** — 用户、组织结构、组织关系管理
- **🔑 权限控制** — 基于角色的权限分配，功能级与数据级权限
- **📱 应用配置** — 应用模块、平台、功能元素、身份认证配置
- **🔢 业务对象编号** — 业务对象编号规则与系列编号管理
- **📋 数据过滤** — 业务对象查询条件预设与过滤规则
- **📊 操作日志** — 用户操作日志记录与查询
- **🔍 自定义字段** — 用户自定义字段管理（UserFields）

---

## 📦 模块结构 | Modules

| 模块 | 类型 | 说明 |
|------|------|------|
| `ibas.initialfantasy` | JAR | **核心模块** — 业务对象定义、仓储层、认证逻辑、用户字段管理 |
| `ibas.initialfantasy.service` | WAR | **REST 服务** — Jersey 端点，暴露认证、数据、文件服务 |

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites

- **JDK** 1.8+
- **Maven** 3.x
- [ibas-framework](https://github.com/color-coding/ibas-framework)（BOBAS 框架）

### 构建 | Build

```bash
# 克隆仓库
git clone https://github.com/color-coding/ibas.initialfantasy.git
cd ibas.initialfantasy

# 编译全部模块
./compile_packages.sh            # Linux / macOS
compile_packages.bat             # Windows

# 编译单个模块
mvn clean package install -Dmaven.test.skip=true -f ibas.initialfantasy/pom.xml

# 运行测试
mvn test -f ibas.initialfantasy/pom.xml

# 部署
./deploy_packages.sh
```

### Maven 依赖

```xml
<dependency>
    <groupId>org.colorcoding.apps</groupId>
    <artifactId>ibas.initialfantasy</artifactId>
    <version>0.2.0</version>
</dependency>
```

---

## 📋 业务对象 | Business Objects

| 业务对象 | 说明 |
|----------|------|
| `User` | 系统用户 |
| `SystemUser` | 系统用户（认证信息） |
| `Organization` | 组织结构 |
| `UserActionLog` | 用户操作日志 |
| `PasswordStorage` | 密码安全存储 |
| `Application` / `ApplicationModule` / `ApplicationFunction` / `ApplicationElement` | 应用配置体系 |
| `ApplicationConfig` / `ApplicationConfigIdentity` / `ApplicationPlatform` | 应用平台配置 |
| `BONumbering` / `BOSeriesNumbering` | 业务对象编号规则与系列 |
| `BOLogst` | 业务对象日志 |
| `BOCriteria` / `BOFiltering` / `BOInformation` | 查询条件预设与过滤 |
| `Privilege` / `ReFunction` | 权限与功能管理 |
| `Identity` / `Shell` | 身份与外壳配置 |

---

## 📚 相关项目 | Related Projects

| 项目 | 说明 |
|------|------|
| [ibas-framework](https://github.com/color-coding/ibas-framework) | BOBAS 业务对象框架 |
| [ibas.thirdpartyapp](https://github.com/color-coding/ibas.thirdpartyapp) | 第三方应用集成（SSO/OIDC） |

---

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

---

## 📄 许可证 | License

本项目基于 [Apache License 2.0](LICENSE) 开源。
---

## 🙏 鸣谢 | Thanks

<div align="center">

**[Color-Coding Studio](http://colorcoding.org/)** · 咔啦工作室

</div>
