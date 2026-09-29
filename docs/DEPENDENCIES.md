# Dependency decisions

Checked 29 September 2026 against npm latest dist-tags, engines and peerDependencies (raw evidence in dependency-research.json).

- next: 16.3.6
- react: 19.3.0
- react-dom: 19.3.0
- tailwindcss: 4.3.3
- @tailwindcss/postcss: 4.3.3
- typescript: 7.0.2
- zod: 4.6.5
- motion: 13.4.5 — researched; deferred until needed
- @mdx-js/mdx: 3.1.1
- @mdx-js/react: 3.1.1 — researched; deferred until needed
- gray-matter: 4.0.3
- next-themes: 0.4.6
- @base-ui/react: 1.8.0
- shadcn: 4.21.0 — researched; deferred until needed
- eslint: 10.11.0
- eslint-config-next: 16.3.6
- prettier: 3.9.9
- vitest: 5.0.2
- @playwright/test: 1.63.0
- @types/node: 26.6.3
- @types/react: 19.3.0
- @types/react-dom: 19.3.0
- @types/mdx: 2.0.14
- geist: 1.7.2
- pnpm: 12.6.0

Runtime available for verification: Node 24.19.0 (LTS major). Official Node page lists 24.21.0 as current LTS patch; use latest 24.x locally/Vercel. Next requires >=20.9; selected React pair has matching versions. Base UI supports React 19; shadcn now defaults to Base UI. Vendored primitive is styled in components/ui; CLI need not be a runtime dependency. MDX uses direct compiler rather than unnecessary adapter.

Sources:

- https://nextjs.org/docs/app/getting-started/installation
- https://nodejs.org/en/download
- https://react.dev/versions
- https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default
- https://registry.npmjs.org/

The lockfile is authoritative for installed packages. No unstable/canary versions are selected. Compatibility claims must also be backed by install, typecheck and production build; see PHASE_REPORT.md.

## Final versions and compatibility correction after real install

Latest ESLint 10 and TypeScript 7 are incompatible with peer ranges of the current Next lint plugins. Pin the newest compatible ESLint 9 and TypeScript 6.0 releases instead. Node type definitions match runtime major 24.
{
"eslint@9": "9.39.5",
"typescript@6.0": "6.0.3",
"@types/node@24": "24.19.0",
"server-only": "0.0.1"
}

ESLint 9.39.5 emits an upstream deprecation warning. It is retained only as development tooling because the current Next lint plugins do not accept ESLint 10; upgrade once their peer ranges support it. This is a known tooling limitation, not a silent claim of full latest-version support.
