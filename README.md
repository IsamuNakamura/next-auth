### Stack

ベースは[こちら](https://github.com/IsamuNakamura/next-mantine-tailwind)のリポジトリ

- Next.js(App Router)
- Mantine
- TailwindCSS
- Biome
- pnpm

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
