export const DEFAULTS=Object.freeze({ticket:0.2,buyFee:0.69,sellFee:0.69,buySlip:1,sellSlip:1,tipBuy:0.001,tipSell:0.001,priorityBuy:0.001,prioritySell:0.001,networkBuy:0.000005,networkSell:0.000005});
const sum=(rows,k)=>rows.reduce((n,r)=>n+(r[k]??0),0);
export function runModel(data,overrides={}){
 const c={...DEFAULTS,...overrides};
 for(const k of Object.keys(DEFAULTS)) if(!Number.isFinite(c[k])||c[k]<0||(/Fee|Slip/.test(k)&&c[k]>=100))throw new RangeError('Неверное значение: '+k);
 const fixedBuy=c.tipBuy+c.priorityBuy+c.networkBuy,fixedSell=c.tipSell+c.prioritySell+c.networkSell;
 if(c.ticket<=fixedBuy)throw new RangeError('Чек должен превышать расходы входа');
 return {config:c,strategies:[4,5].map(target=>{
 const rows=data.calls.map(call=>{
  const bars=call.candles.filter(b=>b.t>=call.signalAt && b.t+300<=data.cutoff).sort((a,b)=>a.t-b.t);
  const hit=bars.find(b=>b.high>=call.signalPrice*target),last=bars.at(-1);
  const exitRaw=hit?call.signalPrice*target:null,markRaw=hit?null:(last?.close??null),raw=exitRaw??markRaw;
  const notional=(c.ticket-fixedBuy)/(1+c.buyFee/100),entryExecution=call.signalPrice*(1+c.buySlip/100),quantity=notional/entryExecution,entryFee=notional*c.buyFee/100,entrySlip=quantity*(entryExecution-call.signalPrice);
  const exitSlip=raw===null?null:quantity*raw*c.sellSlip/100,exitNotional=raw===null?null:quantity*raw*(1-c.sellSlip/100),exitFee=raw===null?null:exitNotional*c.sellFee/100;
  // If fixed exit expenses exceed the holding's value, liquidation can consume extra SOL; do not clamp this away.
  const proceeds=raw===null?null:exitNotional-exitFee-fixedSell;
  const {candles,...identity}=call;
  return {...identity,hit:!!hit,status:hit?'tp':last?(data.cutoff-last.t-300>900?'open_stale':'open_fresh'):'unknown',exitRaw,markRaw,notional,entryExecution,quantity,entryFee,entrySlip,fixedBuy,fixedSell,exitSlip,exitFee,proceeds,
    hitStart:hit?.t??null,hitEnd:hit?hit.t+300:null,markAt:!hit&&last?last.t+300:null,markAge:!hit&&last?data.cutoff-last.t-300:null,
    netPnl:proceeds===null?null:proceeds-c.ticket,grossPnl:raw===null?null:c.ticket*(raw/call.signalPrice-1),costDrag:raw===null?null:c.ticket*(raw/call.signalPrice-1)-(proceeds-c.ticket)};
 });
 const sold=rows.filter(r=>r.hit),held=rows.filter(r=>!r.hit),marked=held.filter(r=>r.markRaw!==null),unknown=held.length-marked.length;
 const realizedPnl=sum(sold,'netPnl'),cashDelta=sum(sold,'proceeds')-rows.length*c.ticket,inventoryNetValue=sum(marked,'proceeds');
 return {target,rows,hits:sold.length,unknown,open:marked.length,unclosed:held.length,stale:marked.filter(r=>r.status==='open_stale').length,fullCohortMtm:unknown||marked.some(r=>r.status==='open_stale')?null:cashDelta+inventoryNetValue,
 realizedPnl,realizedGross:sum(sold,'grossPnl'),cashDelta,inventoryNetValue,knownMtm:cashDelta+inventoryNetValue+unknown*c.ticket,
 knownGross:sum(rows,'grossPnl'),markedSubsetCount:rows.length-unknown,lossSensitivity:cashDelta,lossGross:sold.length*c.ticket*target-rows.length*c.ticket,
 entryFees:sum(rows,'entryFee'),exitFeesClosed:sum(sold,'exitFee'),entryFixed:fixedBuy*rows.length,exitFixedClosed:fixedSell*sold.length,
 slippageClosed:sum(sold,'entrySlip')+sum(sold,'exitSlip'),costDragClosed:sum(sold,'costDrag'),committed:rows.length*c.ticket};
 })};
}
