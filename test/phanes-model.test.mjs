import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULTS} from '../model.mjs';
import {phanesScenario} from '../phanes.mjs';
test('conditional MC scenario uses scanner-derived ratio, fees and tips, never provider multiple or frozen TP',()=>{
 const data={calls:[{phanes:{conditionalScannerMultiple:4.2,providerMultiple:99}},{phanes:{conditionalScannerMultiple:3.9,providerMultiple:100}},{phanes:null}]};
 const r=phanesScenario(data,{...DEFAULTS},4);
 assert.equal(r.conditionalTouches,1);assert.equal(r.unknown,1);assert.equal(r.confirmedFrozenTouches,0);
 assert.equal(r.wholeCohortPnl,null);
 const expected=((DEFAULTS.ticket-.002005)/(1+.0069))/(1+.01)*4*(1-.01)*(1-.0069)-.002005-DEFAULTS.ticket;
 assert.ok(Math.abs(r.targetOnlyNet-expected)<1e-12);
 const z=phanesScenario(data,Object.fromEntries(Object.entries(DEFAULTS).map(([k,v])=>[k,k==='ticket'?v:0])),4);
 assert.ok(Math.abs(z.targetOnlyNet-.6)<1e-12);
 assert.equal(phanesScenario(data,DEFAULTS,5).conditionalTouches,0);
});
