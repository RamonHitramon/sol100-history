// Supplementary conditional scenario only. Never supplies candles or frozen TP evidence.
export function phanesScenario(data,c,target){
 const known=data.calls.filter(x=>Number.isFinite(x.phanes?.conditionalScannerMultiple));
 const touches=known.filter(x=>x.phanes.conditionalScannerMultiple>=target);
 const fixedBuy=c.tipBuy+c.priorityBuy+c.networkBuy,fixedSell=c.tipSell+c.prioritySell+c.networkSell;
 const proceeds=(c.ticket-fixedBuy)/(1+c.buyFee/100)/(1+c.buySlip/100)*target*(1-c.sellSlip/100)*(1-c.sellFee/100)-fixedSell;
 return {target,conditionalTouches:touches.length,unknown:data.calls.length-known.length,confirmedFrozenTouches:0,wholeCohortPnl:null,targetOnlyNet:touches.length*(proceeds-c.ticket),targetOnlyGross:touches.length*c.ticket*(target-1)};
}
