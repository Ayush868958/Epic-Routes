
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const openBookingTop = document.getElementById('openBookingTop');

function showPage(id){
  pages.forEach(p => p.id === id ? p.classList.add('active') : p.classList.remove('active'));
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.page === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
navLinks.forEach(a=>{
  a.addEventListener('click', e => { e.preventDefault(); showPage(a.dataset.page); });
});
openBookingTop && openBookingTop.addEventListener('click', () => showPage('booking'));

/* hero CTA -> nav */
document.querySelectorAll('[data-page-target]').forEach(b => {
  b.addEventListener('click', () => showPage(b.dataset.pageTarget));
});

/* ------------------ Demo data generators ------------------ */
function demoHotels(city='City', maxPrice=null){
  const base = [
    {id:'h1', name:'Horizon Suites', rating:4.5, price:2400, img:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60', partner:'https://www.booking.com'},
    {id:'h2', name:'City Comfort', rating:4.0, price:1700, img:'https://images.unsplash.com/photo-1505691723518-36a1b5b42e91?auto=format&fit=crop&w=800&q=60', partner:'https://in.hotels.com'},
    {id:'h3', name:'Royal Stay', rating:4.6, price:3200, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60', partner:'https://www.expedia.co.in'},
    {id:'h4', name:'Budget Inn', rating:3.9, price:1200, img:'https://images.unsplash.com/photo-1501117716987-c8e2b67f8a0b?auto=format&fit=crop&w=800&q=60', partner:'https://www.airbnb.co.in'}
  ];
  return base.filter(h => !maxPrice || h.price <= maxPrice).map(h => ({...h, city}));
}

function demoRestaurants(city='City', pref='Veg'){
  const all = [
    {id:'r1', name:'Veg Aroma', type:'Veg', img:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60'},
    {id:'r2', name:'Spice Corner', type:'Non-Veg', img:'https://images.unsplash.com/photo-1543352634-81b9b20f0f16?auto=format&fit=crop&w=800&q=60'},
    {id:'r3', name:'Cafe Local', type:'Veg', img:'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=60'}
  ];
  return all.filter(r => r.type === pref).map(r => ({...r, city}));
}

function demoAttractions(city='City'){
  return [
    {id:'a1', name:`${city} Lake`, desc:'Scenic spot with boating.', img:'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=60'},
    {id:'a2', name:`${city} Fort`, desc:'Historic fort and viewpoint.', img:'https://images.unsplash.com/photo-1501117716987-c8e2b67f8a0b?auto=format&fit=crop&w=800&q=60'}
  ];
}

/* generic renderer for tiles */
function renderCards(list, containerId, type){
  const container = document.getElementById(containerId);
  if(!container){ return; }
  container.innerHTML = '';
  if(!list || list.length === 0){ container.innerHTML = '<div class="muted">No results</div>'; return; }
  list.forEach(item => {
    const el = document.createElement('div');
    el.className = type === 'hotel' ? 'hotel-card' : type === 'restaurant' ? 'restaurant-card' : 'destination-card';
    el.dataset.id = item.id || '';
    if(type === 'hotel'){
      el.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="meta"><strong>${item.name}</strong><div>⭐ ${item.rating}</div><div>₹ ${item.price}</div></div>
        <div style="margin-left:auto"><button class="select-btn" data-type="hotel" data-id="${item.id}" data-partner="${item.partner}">Select</button></div>
      `;
    } else if(type === 'restaurant'){
      el.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="meta"><strong>${item.name}</strong><div>Type: ${item.type}</div></div>
      `;
    } else {
      el.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="meta"><strong>${item.name}</strong><div>${item.desc || ''}</div></div>
      `;
    }
    container.appendChild(el);
  });
}

/* ------------------ Hotels page events ------------------ */
const hotelCityEl = document.getElementById('hotelCity');
const maxPriceEl = document.getElementById('maxPrice');

function updateHotels(){
  const city = (hotelCityEl && hotelCityEl.value.trim()) || 'Your City';
  const max = parseInt(maxPriceEl && maxPriceEl.value) || null;
  renderCards(demoHotels(city, max), 'hotelResults', 'hotel');
}
hotelCityEl && hotelCityEl.addEventListener('input', updateHotels);
maxPriceEl && maxPriceEl.addEventListener('input', updateHotels);

/* ------------------ Food page events ------------------ */
const foodCityEl = document.getElementById('foodCity');
function updateFood(){
  const city = (foodCityEl && foodCityEl.value.trim()) || 'Your City';
  const pref = (document.querySelector('input[name="foodPref"]:checked')||{}).value || 'Veg';
  renderCards(demoRestaurants(city, pref), 'foodResults', 'restaurant');
}
foodCityEl && foodCityEl.addEventListener('input', updateFood);
document.querySelectorAll('input[name="foodPref"]').forEach(r => r.addEventListener('change', updateFood));

/* ------------------ Transport samples ------------------ */
function renderTransportSamples(){
  const list = [
    {id:'t1', name:'Uber', info:'~₹350 for 10km', img:'https://images.unsplash.com/photo-1549921296-cb5b43b7a6e2?auto=format&fit=crop&w=800&q=60', partner:'https://www.uber.com'},
    {id:'t2', name:'Ola', info:'~₹320 for 10km', img:'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=60', partner:'https://www.olacabs.com'},
    {id:'t3', name:'RedBus', info:'Bus from ₹200', img:'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=60', partner:'https://www.redbus.in'}
  ];
  const container = document.getElementById('transportResults'); if(!container) return;
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div'); div.className = 'hotel-card';
    div.innerHTML = `<img src="${p.img}" alt="${p.name}"><div class="meta"><strong>${p.name}</strong><div>${p.info}</div></div><div style="margin-left:auto"><button class="select-btn" data-type="transport" data-id="${p.id}" data-partner="${p.partner}">Select</button></div>`;
    container.appendChild(div);
  });
}
renderTransportSamples();

/* ------------------ Booking page ------------------ */
const bookingCityEl = document.getElementById('bookingCity');
const loadBookingBtn = document.getElementById('loadBookingDemo');
const bookingResults = document.getElementById('bookingResults');
const bookBtn = document.getElementById('bookBtn');
let selectedItem = null;

loadBookingBtn && loadBookingBtn.addEventListener('click', () => {
  const city = (bookingCityEl && bookingCityEl.value.trim()) || 'Your City';
  const opts = [...demoHotels(city), {id:'t1', name:'Uber Ride', price:350, img:'https://images.unsplash.com/photo-1549921296-cb5b43b7a6e2?auto=format&fit=crop&w=800&q=60', partner:'https://www.uber.com'}];
  bookingResults.innerHTML = '';
  opts.forEach(opt => {
    const div = document.createElement('div'); div.className = 'hotel-card';
    div.innerHTML = `<img src="${opt.img}" alt="${opt.name}"><div class="meta"><strong>${opt.name}</strong><div>₹ ${opt.price || '-'}</div></div><div style="margin-left:auto"><button class="select-btn" data-id="${opt.id}" data-partner="${opt.partner||'https://www.google.com'}">Select</button></div>`;
    bookingResults.appendChild(div);
  });
});

/* delegate selection buttons */
document.body.addEventListener('click', (e) => {
  const btn = e.target.closest('.select-btn');
  if(!btn) return;
  document.querySelectorAll('.select-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedItem = { id: btn.dataset.id, partner: btn.dataset.partner };
  if(bookBtn) bookBtn.disabled = false;
});

/* book selected (demo: opens partner link) */
bookBtn && bookBtn.addEventListener('click', () => {
  if(!selectedItem) return alert('Select an option first');
  window.open(selectedItem.partner || 'https://www.google.com', '_blank');
});

/* partner quick-links */
document.querySelectorAll('.partner').forEach(btn => {
  btn.addEventListener('click', () => {
    const base = btn.dataset.url;
    const sec = btn.closest('section');
    let query = '';
    if(sec && sec.id === 'food') query = (document.getElementById('foodCity').value || '').trim();
    if(sec && sec.id === 'hotels') query = (document.getElementById('hotelCity').value || '').trim();
    if(!query) query = prompt('Enter city / search term (e.g. Delhi)');
    const url = base + encodeURIComponent(query || '');
    window.open(url, '_blank');
  });
});

/* ------------------ Location / Tracking ------------------ */
let watchId = null;
const startTrack = document.getElementById('startTrack');
const stopTrack = document.getElementById('stopTrack');
const shareLocationBtn = document.getElementById('shareLocationBtn');
const latEl = document.getElementById('lat'), lngEl = document.getElementById('lng'), accEl = document.getElementById('acc'), locStatus = document.getElementById('locStatus');

startTrack && startTrack.addEventListener('click', () => {
  if(!navigator.geolocation) return alert('Geolocation not supported');
  locStatus && (locStatus.textContent = 'Status: Tracking...');
  startTrack.disabled = true; stopTrack.disabled = false;
  watchId = navigator.geolocation.watchPosition(pos => {
    latEl.textContent = pos.coords.latitude.toFixed(6);
    lngEl.textContent = pos.coords.longitude.toFixed(6);
    accEl.textContent = `${Math.round(pos.coords.accuracy)} m`;
  }, err => { alert('GPS error: ' + err.message); locStatus && (locStatus.textContent = 'Status: Error'); }, { enableHighAccuracy:true, maximumAge:3000, timeout:10000 });
});
stopTrack && stopTrack.addEventListener('click', () => {
  if(watchId != null) navigator.geolocation.clearWatch(watchId);
  watchId = null; locStatus && (locStatus.textContent = 'Status: Not tracking'); startTrack.disabled = false; stopTrack.disabled = true;
});
shareLocationBtn && shareLocationBtn.addEventListener('click', async () => {
  if(!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude.toFixed(6), lng = pos.coords.longitude.toFixed(6);
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const text = `My location: ${lat}, ${lng}\n${url}`;
    if(navigator.share){ try{ await navigator.share({ title:'My location', text, url }); alert('Location shared'); } catch(e){ alert('Share canceled'); } }
    else { try{ await navigator.clipboard.writeText(text); alert('Location copied'); } catch(e){ prompt('Copy this:', text); } }
  }, err => alert('Could not get position: ' + err.message), { enableHighAccuracy:true });
});

/* ------------------ Emergency ------------------ */
const emergencyBtn = document.getElementById('emergencyBtn');
const broadcastBtn = document.getElementById('broadcastBtn');

emergencyBtn && emergencyBtn.addEventListener('click', async () => {
  let lat='—', lng='—';
  if(navigator.geolocation){
    try{ const pos = await new Promise((res,rej)=> navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:8000})); lat = pos.coords.latitude.toFixed(6); lng = pos.coords.longitude.toFixed(6); } catch(e) {}
  }
  window.location.href = 'tel:112';
  const text = `EMERGENCY — Location: ${lat},${lng}\nhttps://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  try{ await navigator.clipboard.writeText(text); alert('Emergency location copied to clipboard'); }catch(e){ prompt('Copy:', text); }
});

broadcastBtn && broadcastBtn.addEventListener('click', async () => {
  let lat='—', lng='—';
  if(navigator.geolocation){
    try{ const pos = await new Promise((res,rej)=> navigator.geolocation.getCurrentPosition(res,rej,{enableHighAccuracy:true,timeout:8000})); lat = pos.coords.latitude.toFixed(6); lng = pos.coords.longitude.toFixed(6); }catch(e){} }
  const message = `EMERGENCY ALERT: I need help. Location: ${lat},${lng}\nhttps://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  if(navigator.share){ try{ await navigator.share({ title:'Emergency Alert', text:message }); } catch(e){ alert('Share canceled'); } }
  else { try{ await navigator.clipboard.writeText(message); alert('Alert copied'); } catch(e){ prompt('Copy and send:', message); } }
});

/* ------------------ Initial render ------------------ */
updateFood(); updateHotels();

