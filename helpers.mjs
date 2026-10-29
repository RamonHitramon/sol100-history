export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function filterRows(rows,query='',state='all') {const q=query.trim().toLowerCase();return rows.filter(r=>(!q||`${r.id} ${r.symbol} ${r.address}`.toLowerCase().includes(q))&&(state==='all'||(state==='known'?r.status!=='unknown':state==='legacy'?r.legacy:state==='open'?r.status.startsWith('open'):r.status===state)));}
export const CSV_KEYS=['id','symbol','address','messageId','sourceUrl','crossing','legacy','snapshotAt','signalAt','signalPrice','peakPrice','peakMultiple','peakAt','barCount','expectedBars','missingBars','completeToCutoff','status','hit','hitStart','hitEnd','exitRaw','markRaw','markAt','markAge','notional','quantity','entryExecution','entryFee','entrySlip','fixedBuy','fixedSell','exitFee','exitSlip','proceeds','grossPnl','netPnl','costDrag'];
export function toCsv(rows,config,target){
 const fields=[...CSV_KEYS,...Object.keys(config).map(k=>'assumption_'+k),'target'];
 const quote=v=>'"'+(typeof v==='string'&&/^[=+@-]/.test(v)?"'"+v:String(v??'')).replaceAll('"','""')+'"';
 return '\ufeff'+[fields.map(quote).join(','),...rows.map(r=>fields.map(k=>quote(k==='target'?target:k.startsWith('assumption_')?config[k.slice(11)]:r[k])).join(',')),''].join('\r\n');
}
