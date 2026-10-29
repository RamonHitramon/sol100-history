import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const d=JSON.parse(readFileSync(new URL('../data/report.json',import.meta.url),'utf8'));
test('Phanes enrichment joins all frozen events without rewriting candle evidence',()=>{
 assert.equal(d.phanes.matchedCalls,145);
 assert.equal(d.phanes.providerRows,151);
 assert.equal(d.phanes.excludedNonCohort,6);
 assert.ok(d.phanes.retrievedAt>d.cutoff);
 assert.deepEqual([d.coverage.withBars,d.coverage.completeToCutoff],[21,0]);
 for(const c of d.calls){
  const p=c.phanes;
  assert.equal(p.address,c.address);
  assert.equal(p.eventId,c.eventId);
  assert.ok(p.calledAt>=c.signalAt && p.calledAt-c.signalAt<420);
  assert.equal(p.cutoffPeakVerified,false);
  assert.equal(p.supplyStabilityVerified,false);
  assert.ok(Math.abs(p.conditionalPeakPrice-p.peakMc/p.scannerSupply)<1e-12);
  assert.ok(Math.abs(p.conditionalScannerMultiple-p.conditionalPeakPrice/c.signalPrice)<1e-9);
 }
});
