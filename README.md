### Stack

ベースは[こちら](https://github.com/IsamuNakamura/next-mantine-tailwind)のリポジトリ

- Next.js(App Router)
- Mantine
- TailwindCSS
- Biome
- pnpm
- Next Auth
- Vercel Postgres
- Prisma

### Install

#### pnpm

[Volta](https://docs.volta.sh/guide/getting-started)を使用して、パッケージマネージャーのバージョンを管理

```
volta install corepack
corepack enable
corepack enable pnpm
pnpm -v
```

#### Next.js

```
pnpm dlx create-next-app front
```

#### Biome

設定ファイル(biome.json)は、ワークスペースの最上位の階層に配置しないとコマンド無で VSCode が warning 等を出してくれない

```
pnpm add --save-dev --save-exact @biomejs/biome

pnpm biome init
```

#### Mantine

[こちら](https://mantine.dev/getting-started/#get-started-without-framework)で必要なパッケージをインストール

```
pnpm add @mantine/core @mantine/hooks
```

#### Next Auth

セットアップ方法は下記

- https://next-auth.js.org/getting-started/example#add-api-route
- https://next-auth.js.org/configuration/initialization#route-handlers-app
- https://next-auth.js.org/configuration/options#secret

```
pnpm add next-auth
```

##### Providers

###### Github

[こちら](https://github.com/settings/developers)からアプリケーションを登録し、認証で使用する GITHUB_ID と GITHUB_SECRET を取得し、環境変数に設定

###### Google Provider

[こちら](https://zenn.dev/hayato94087/articles/91179fbbe1cad4#%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E5%8F%96%E5%BE%97)を参考に、認証で使用する GITHUB_ID と GITHUB_SECRET を取得し、環境変数に設定

#### Prisma

```
pnpm add prisma --save-dev
pnpm dlx prisma init

pnpm add @prisma/client @auth/prisma-adapter

pnpm exec prisma migrate dev --schema ./src/lib/prisma/schema.prisma
```

##### Migration

```
pnpm exec prisma migrate dev --schema ./src/lib/prisma/schema.prisma
```
