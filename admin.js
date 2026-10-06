(function(){
  var OWNER='pindasandhu829-bit',REPO='Bhupinder-Singh',BR='main';
  var data=null,pend={},prev={},ov=null,msg='';
  var tok=function(){try{return localStorage.getItem('ghtok')||''}catch(e){return ''}};
  var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
  var u8=function(s){return btoa(unescape(encodeURIComponent(s)))};
  var d8=function(b){return decodeURIComponent(escape(atob(b.replace(/\n/g,''))))};
  function api(path,method,body){
    var url='https://api.github.com/repos/'+OWNER+'/'+REPO+'/contents/'+path+(method?'':'?ref='+BR+'&t='+Date.now());
    return fetch(url,{method:method||'GET',headers:{Authorization:'Bearer '+tok(),Accept:'application/vnd.github+json'},body:body?JSON.stringify(body):undefined})
      .then(function(r){return r.json().then(function(j){if(!r.ok){var e=new Error(j.message||r.status);e.status=r.status;throw e}return j})});
  }
  function put(path,b64,m){
    return api(path).catch(function(e){if(e.status===404)return {};throw e})
      .then(function(j){return api(path,'PUT',{message:m,content:b64,branch:BR,sha:j.sha})});
  }
  var css='#adm{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:10000;overflow-y:auto;padding:14px;font-family:"DM Sans",sans-serif;color:#fff}'
  +'#adm .bx{max-width:720px;margin:30px auto;background:#0d1b2a;border:1px solid rgba(201,148,10,.4);border-radius:14px;padding:18px}'
  +'#adm h2{color:#f0b429;font-size:19px;margin-bottom:12px;display:flex;justify-content:space-between}'
  +'#adm h4{color:#f0b429;margin:16px 0 8px;font-size:14px}'
  +'#adm input,#adm select{padding:9px;border-radius:7px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:#fff;font-size:13px;min-width:0}'
  +'#adm select option{background:#0d1b2a}'
  +'#adm .ar{display:flex;gap:6px;align-items:center;margin-bottom:6px}'
  +'#adm .an{flex:1}#adm .ap{width:80px}'
  +'#adm .th{width:42px;height:42px;border-radius:6px;object-fit:cover;background:#1a2f4e;flex-shrink:0}'
  +'#adm .ab,#adm button{background:#2d6e46;color:#fff;border:none;border-radius:7px;padding:9px 11px;font-size:13px;font-weight:600;cursor:pointer}'
  +'#adm .ad{background:rgba(255,0,0,.2)}#adm .sv{width:100%;margin-top:14px;padding:13px;background:#c9940a;font-size:15px}'
  +'#adm .ms{margin-top:10px;font-size:13px;color:#6ddb96;white-space:pre-wrap}#adm p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.6;margin-bottom:10px}';
  document.head.insertAdjacentHTML('beforeend','<style>'+css+'</style>');
  function draw(){
    var h='<div class="bx"><h2>⚙️ Admin Panel <span id="x" style="cursor:pointer">✕</span></h2>';
    if(!tok()){
      h+='<p>GitHub Token paste karo (sirf ik vaar). Eh sirf tuhade phone ch save rehnda aa.</p><input id="tk" type="password" placeholder="github_pat_..." style="width:100%;margin-bottom:10px"><button id="tks" style="width:100%">Save Token</button>';
    }else if(!data){h+='<p>Loading...</p>';}
    else{
      data.forEach(function(c,ci){
        h+='<h4>'+c.ic+' '+esc(c.name)+'</h4>';
        c.items.forEach(function(it,ii){
          var path=it.img||('img/products/'+window.CATALOG.slug(it.n)+'.jpg');
          h+='<div class="ar"><img class="th" src="'+esc(prev[path]||path)+'" onerror="this.style.visibility=\'hidden\'">'
           +'<input class="an" value="'+esc(it.n)+'" data-ci="'+ci+'" data-ii="'+ii+'">'
           +'<input class="ap" placeholder="₹ price" value="'+esc(it.p)+'" data-ci="'+ci+'" data-ii="'+ii+'">'
           +'<label class="ab">📷<input type="file" accept="image/*" hidden data-ci="'+ci+'" data-ii="'+ii+'"></label>'
           +'<button class="ad" data-ci="'+ci+'" data-ii="'+ii+'">🗑</button></div>';
        });
      });
      h+='<h4>➕ Naya Product</h4><div class="ar"><select id="ac">';
      data.forEach(function(c,ci){h+='<option value="'+ci+'">'+esc(c.name)+'</option>'});
      h+='</select><input id="ann" class="an" placeholder="Product da naam"><button id="add">Add</button></div>'
       +'<button class="sv" id="save">💾 Save (Website te lagao)</button>'
       +'<p style="margin-top:12px"><span id="lo" style="cursor:pointer;text-decoration:underline">Token hatao</span></p>';
    }
    h+='<div class="ms" id="ms">'+esc(msg)+'</div></div>';
    ov.innerHTML=h;
  }
  function load(){
    api('products.json').then(function(j){data=JSON.parse(d8(j.content))}).catch(function(e){
      if(e.status===404)data=JSON.parse(JSON.stringify(window.CATALOG.def));
      else{msg='Error: '+e.message+(e.status===401?' (Token galat/expire)':'');}
    }).then(draw);
  }
  function shrink(file,cb){
    var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){
      var s=Math.min(1,800/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
      cb(c.toDataURL('image/jpeg',.82))};im.src=r.result};r.readAsDataURL(file);
  }
  function build(){
    ov=document.createElement('div');ov.id='adm';document.body.appendChild(ov);
    ov.addEventListener('input',function(e){var t=e.target,it=t.dataset.ci!=null&&data[t.dataset.ci].items[t.dataset.ii];
      if(!it)return; if(t.classList.contains('an'))it.n=t.value; if(t.classList.contains('ap'))it.p=t.value});
    ov.addEventListener('change',function(e){var t=e.target;if(t.type!=='file'||!t.files[0])return;
      var it=data[t.dataset.ci].items[t.dataset.ii];
      shrink(t.files[0],function(url){var p='img/products/'+window.CATALOG.slug(it.n)+'.jpg';
        pend[p]=url.split(',')[1];prev[p]=url;it.img=p;it.v=Date.now();msg='Photo chuni gayi. Save dabao.';draw()});
    });
    ov.addEventListener('click',function(e){var t=e.target;
      if(t.id==='x'){ov.style.display='none';return}
      if(t.id==='tks'){var v=document.getElementById('tk').value.trim();if(v){localStorage.setItem('ghtok',v);msg='';load()}return}
      if(t.id==='lo'){localStorage.removeItem('ghtok');data=null;draw();return}
      if(t.classList.contains('ad')){var it=data[t.dataset.ci].items;if(confirm('Delete "'+it[t.dataset.ii].n+'"?')){it.splice(t.dataset.ii,1);draw()}return}
      if(t.id==='add'){var n=document.getElementById('ann').value.trim();if(n){data[document.getElementById('ac').value].items.push({n:n,img:'',p:''});msg='Added. Photo layi 📷 dabao.';draw()}return}
      if(t.id==='save'){save()}
    });
  }
  function save(){
    var ms=document.getElementById('ms'),paths=Object.keys(pend),i=0;
    ms.textContent='Save ho riha aa...';
    (function next(){
      if(i<paths.length){var p=paths[i++];ms.textContent='Photo upload '+i+'/'+paths.length+'...';
        return put(p,pend[p],'Add product image').then(next)}
      return put('products.json',u8(JSON.stringify(data,null,1)),'Update products').then(function(){
        pend={};window.CATALOG.render(data);
        msg='✅ Save ho gaya! 1-2 minute baad site te sab nu dikhega.';draw();
      });
    })().catch(function(e){ms.style.color='#ff6b6b';ms.textContent='Error: '+e.message+(e.status===401||e.status===403?' (Token check karo: Contents Read & write)':'')});
  }
  window.toggleAdmin=function(){
    if(!ov){build();load()}else if(ov.style.display==='none'){ov.style.display='block';if(!data)load()}
    else ov.style.display='none';
  };
})();
<button onclick="toggleAdmin()">⚙️ Admin Settings</button>
