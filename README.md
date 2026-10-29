# SOL100 historical research — incomplete frozen snapshot

Phanes enrichment r2: all 145 exact-CA unique source events match 151 one-month Phanes entries (6 later entries excluded). Authorized commands `/lb 1d` 391→392, `/dapp` 393→394, `/elb 1mo` 395→396; XLSX document from verified bot 7178305557, DM 1575807. The DApp supplied a complete 151-row API response through its normal UI; pagination is presentation only. Public-safe provenance/hashes are in the evidence manifest; private bearer link remains outside this repository.

Supplementary `data/phanes-cohort.csv`, the all-event MC chart and fee/tip-aware target-only scenario use `peak MC / scanner total_supply / scanner signal USD price`, NOT the provider multiple. Supply was explicit for 143 events; 2 legacy values were inferred from rounded scanner MC. Stable supply and consistent provider MC methodology are unverified assumptions; mint-off snapshot evidence is not a supply audit. Two Phanes joins delayed >60 seconds are flagged. All peaks were retrieved later than the frozen cutoff and have no exact peak timestamp; rounded time-to-ATH is retained only as provider metadata. These observations never modify candles, frozen TP status or primary PnL. No whole-cohort PnL is claimed. All original cutoff coverage below remains unchanged.

Public report: https://ramonhitramon.github.io/sol100-history/

Independent static historical artifact. It does not replace or write to the live gmgn_100kmcap dashboard.

Frozen cohort: 145 delivered Solana calls through 2026-10-29T15:29:49Z. Cached GMGN evidence: 54 pages, 2,657 eligible post-call five-minute bars across 21 calls. 124 calls have no bars; zero calls have complete coverage to cutoff. All ATH values are observed lower bounds, not complete lifetime or post-call ATH. Unknown is not zero or a loss.

The x4/x5 strategies each sell 100% at their own threshold on the first eligible candle touch. A touch is not an executable fill. TP-only profits are NOT whole-cohort profits. Stale marked subsets and zero-remainder stress cases are separate; full-cohort current PnL is unknown.

Every fee, tip, priority, network, slippage and ticket input is a modeling assumption, not paid transaction evidence. USD token ratios are translated into SOL-equivalent using constant SOL/USD within each trade, NOT historical native SOL PnL. No wallet activity, trading, credentials or receipts are included.

`data/calls-default.csv`: 290 strategy rows = 145 calls × two alternatives, not 290 separate calls. Current filtered CSV can also be generated in the UI. `data/evidence-manifest.json` contains hashes and provenance references, not the private source archive. Source Telegram links point to the independently read-back channel and may require channel membership; the report itself is anonymously accessible.

Quota rechecked 2026-10-29 15:41 UTC: old provider cooldown expired, maintenance false, live gate busy. Supported analytical kline remains deferred by default and opted-in bulk collection is off-peak only. No new upstream history requests were sent and no live scanners/schedules/filters changed. A previous HTTP429 is not asserted to be a permanent ban.
