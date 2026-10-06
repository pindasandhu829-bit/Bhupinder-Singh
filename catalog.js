(function(){
  var WA='919086328594', TEL='+919086328594';
  var D=[
   ['💻','Electronics & IT',['Laptops','Desktops','Monitors','Printers','Scanners','Copiers','CCTV Surveillance System','LED TV','Display Panels','UPS','Inverters','Batteries','Networking Devices']],
   ['🪑','Office Furniture',['Office Chairs','Executive Tables','Workstations','Modular Furniture','Filing Cabinets','Steel Almirah','Conference Tables']],
   ['🏫','School & Institutional Furniture',['School Desks','School Benches','Teacher Tables','Teacher Chairs','Library Furniture','Laboratory Furniture','Auditorium Furniture','Hostel Furniture']],
   ['🏠','Home Furniture',['Beds','Mattresses','Sofa Sets','Dining Tables','Wardrobes','Study Tables','Storage Units']],
   ['💡','Electrical Items',['LED Lights','LED Panels','Fans','Exhaust Fans','Switches','Sockets','Cables','Electrical Accessories']],
   ['📹','CCTV & Networking',['CCTV Cameras','DVR','NVR','Routers','Network Switches','Structured Cabling']],
   ['📁','Stationery & Consumables',['Stationery Items','Printer Papers','Toners','Cartridges','Files & Folders','Binders']],
   ['🧯','Safety & Industrial',['Safety Shoes','Safety Helmets','Safety Gloves','Fire Extinguishers','Safety Signs','Tools & Equipment','Cleaning Materials']],
   ['🏗️','Construction Supplies',['Building Materials','Hardware Supplies','Plumbing Items','Sanitary Items','Paints','Chemicals']],
   ['⚙️','Services',['Works Contract Services','Maintenance Services & AMC','Manpower Supply','Technical Support Services']]
  ];
  var DEF=D.map(function(c){return {ic:c[0],name:c[1],items:c[2].map(function(n){return {n:n,img:'',p:''}})}});
  var slug=function(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
  var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
  var css='#cat-wrap{max-width:1100px;margin:28px auto 0}'
  +'#cat-search{width:100%;padding:13px 16px;border:1.5px solid rgba(201,148,10,.4);border-radius:10px;font:14px "DM Sans",sans-serif;outline:none;margin-bottom:14px}'
  +'.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:14px}'
  +'.chip{flex-shrink:0;padding:7px 14px;border-radius:20px;border:1px solid rgba(15,30,53,.15);background:#fff;font-size:12px;font-weight:600;cursor:pointer;color:#0f1e35}'
  +'.chip.on{background:#c9940a;color:#fff;border-color:#c9940a}'
  +'.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}'
  +'.pc{background:#fff;border:1px solid rgba(15,30,53,.1);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:.25s}'
  +'.pc:hover{box-shadow:0 10px 26px rgba(15,30,53,.12);transform:translateY(-3px)}'
  +'.pc-img{height:150px;background:#faf7f0;display:flex;align-items:center;justify-content:center;font-size:54px;position:relative}'
  +'.pc-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}'
  +'.pc-b{padding:12px;display:flex;flex-direction:column;gap:6px;flex:1}'
  +'.pc-t{font-size:11px;color:#6b7a8d}.pc-n{font-size:14px;font-weight:700;color:#0f1e35;line-height:1.3}'
  +'.pc-p{font-size:12px;color:#1a4a2e;font-weight:600}'
  +'.pc-btns{display:flex;gap:6px;margin-top:auto;padding-top:8px}'
  +'.pc-btns a{flex:1;text-align:center;font-size:12px;font-weight:600;padding:9px 4px;border-radius:7px;text-decoration:none}'
  +'.b-wa{background:#25d366;color:#fff}.b-call{background:#fff;color:#0f1e35;border:1px solid #0f1e35}'
  +'#cat-none{display:none;text-align:center;padding:30px;color:#6b7a8d;font-size:14px}';
  document.head.insertAdjacentHTML('beforeend','<style>'+css+'</style>');
  var old=document.querySelector('#sandhu .grid3'); if(!old) return;
  var wrap=document.createElement('div'); wrap.id='cat-wrap';
  wrap.innerHTML='<h3 style="font-family:Playfair Display,serif;font-size:26px;margin:40px 0 14px;color:#0f1e35">Product Catalog</h3><div id="cat-body"></div>';
  old.parentNode.insertBefore(wrap,old.nextSibling);
  var API=window.CATALOG={def:DEF,data:null,slug:slug};
  API.render=function(data){
    API.data=data;
    var h='<input id="cat-search" placeholder="🔍 Search product (laptop, chair, CCTV...)"><div class="chips"><div class="chip on" data-c="all">All</div>';
    data.forEach(function(c,i){h+='<div class="chip" data-c="'+i+'">'+c.ic+' '+esc(c.name)+'</div>'});
    h+='</div><div class="pgrid">';
    data.forEach(function(c,i){c.items.forEach(function(it){
      var msg=encodeURIComponent('Namaste, mainu "'+it.n+'" da best price chahida hai. Quantity: ___ (Sandhu Enterprises)');
      var src=(it.img||('img/products/'+slug(it.n)+'.jpg'))+(it.v?'?v='+it.v:'');
      h+='<div class="pc" data-c="'+i+'" data-n="'+esc(it.n.toLowerCase())+'">'
       +'<div class="pc-img">'+c.ic+'<img src="'+esc(src)+'" alt="'+esc(it.n)+'" loading="lazy" onerror="this.remove()"></div>'
       +'<div class="pc-b"><div class="pc-t">'+esc(c.name)+'</div><div class="pc-n">'+esc(it.n)+'</div><div class="pc-p">'+(it.p?'₹ '+esc(it.p):'Price on Request')+'</div>'
       +'<div class="pc-btns"><a class="b-wa" target="_blank" href="https://wa.me/'+WA+'?text='+msg+'">💬 Get Best Price</a><a class="b-call" href="tel:'+TEL+'">📞 Call</a></div></div></div>';
    })});
    h+='</div><div id="cat-none">Product nahi mila. WhatsApp te apni requirement bhejo — asi arrange kar dewange.</div>';
    var body=document.getElementById('cat-body'); body.innerHTML=h;
    var cur='all',q=document.getElementById('cat-search');
    function f(){var n=0;body.querySelectorAll('.pc').forEach(function(e){
      var ok=(cur==='all'||e.dataset.c===cur)&&e.dataset.n.indexOf(q.value.toLowerCase().trim())>-1;
      e.style.display=ok?'':'none'; if(ok)n++});
      document.getElementById('cat-none').style.display=n?'none':'block'}
    q.oninput=f;
    body.querySelectorAll('.chip').forEach(function(c){c.onclick=function(){
      body.querySelectorAll('.chip').forEach(function(x){x.classList.remove('on')});
      c.classList.add('on');cur=c.dataset.c;f()}});
  };
  API.render(DEF);
  fetch('products.json?v='+Date.now()).then(function(r){return r.ok?r.json():null}).then(function(j){
    if(j&&j.length)API.render(j)}).catch(function(){});
})();
