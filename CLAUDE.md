# goldtrader

Guide for Claude (interactive sessions and the factory workflow).

## Stack
Next.js + Prisma + Radix/shadcn UI.

## Before you change things, read
- README.md
- SENTIMENT_SETUP.md

## Protected code (already in place - follow it)
This repo uses the `protect-working-code` rule: files listed in `docs/WORKING_SURFACES.md` are certified.
- Don't change their behaviour without the breaking-change checklist in that file.
- The pre-commit hook isn't installed in CI, so run the certified check yourself before every commit.
- Never set `CERTIFIED_OVERRIDE`. If a certified file must change, stop at the spec stage and ask the owner.

## Sensitive areas
Trading logic, price data and anything that places or simulates orders.

## Commands
```sh
# install
npm ci && npx prisma generate
# checks (run all before every PR)
npm run lint
npm run build
npm run check:certified
# run
npm run dev  # http://localhost:3000
```

## Factory
Issues labelled `factory` run through `.claude/factory/BLUEPRINT.md` (triage -> spec -> implement -> verify -> merge risk -> PR).
Skills: `.claude/skills/factory-triage`, `verify-with-proof`, `merge-risk`. Use them in interactive sessions too.

## Verification gotchas
<!-- Append one line per lesson learned while verifying (ports, env vars, logins, flaky selectors). -->
