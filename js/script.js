document.addEventListener('DOMContentLoaded',function(){
  var navbar=document.getElementById('navbar'),navToggle=document.getElementById('navToggle'),navMenu=document.getElementById('nav-menu');

  function handleNavScroll(){ if(!navbar) return; navbar.classList.toggle('scrolled', window.scrollY>30); }
  window.addEventListener('scroll', handleNavScroll, {passive:true}); handleNavScroll();

  var navLinks=document.querySelectorAll('.nav-menu a'), sections=document.querySelectorAll('section[id]');
  function updateActiveLink(){ if(!sections.length||!navLinks.length) return; var c=''; sections.forEach(function(s){ if(window.scrollY>=s.offsetTop-120) c=s.id; }); navLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href')==='#'+c); }); }
  window.addEventListener('scroll', updateActiveLink, {passive:true}); updateActiveLink();

  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(e){
      var h=link.getAttribute('href'); if(!h||h==='#') return; var t=document.querySelector(h); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); if(navMenu&&navMenu.classList.contains('open')){ navMenu.classList.remove('open'); navToggle&&navToggle.setAttribute('aria-expanded','false'); document.body.style.overflow=''; } }
    });
  });

  if(navToggle&&navMenu){
    var openNav=function(){ navMenu.classList.add('open'); navToggle.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; };
    var closeNav=function(){ navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
    try{ navToggle.style.zIndex='11001'; navMenu.style.zIndex='10999'; }catch(e){}
    var lastToggleTime=0;
    navToggle.addEventListener('pointerdown',function(e){ if(e.pointerType==='touch'||e.pointerType==='pen'||e.pointerType==='mouse'){ e.preventDefault(); e.stopPropagation(); navMenu.classList.contains('open')?closeNav():openNav(); lastToggleTime=Date.now(); } },{passive:false});
    navToggle.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); if(Date.now()-lastToggleTime<600) return; navMenu.classList.contains('open')?closeNav():openNav(); lastToggleTime=Date.now(); });
    document.addEventListener('pointerdown',function(e){ if(!navMenu.classList.contains('open')) return; if(!navMenu.contains(e.target)&&!navToggle.contains(e.target)) closeNav(); },{passive:true});
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&navMenu.classList.contains('open')) closeNav(); });
    navMenu.addEventListener('pointerdown',function(e){ e.stopPropagation(); });
  }

  var revealEls=document.querySelectorAll('.reveal');
  if(revealEls.length){
    var io=new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting) entry.target.classList.add('visible'); }); },{threshold:0.1});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
  }

  var heroLogoWrap=document.querySelector('.hero-logo-wrap'); if(heroLogoWrap) window.addEventListener('scroll',function(){ var s=window.scrollY; if(s<window.innerHeight) heroLogoWrap.style.transform='translate(-50%, calc(-62% + '+(s*0.18)+'px))'; },{passive:true});

  document.querySelectorAll('.team-card-inner').forEach(function(card){ card.addEventListener('mousemove',function(e){ var r=card.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2, dx=(e.clientX-cx)/(r.width/2), dy=(e.clientY-cy)/(r.height/2), tiltX=dy*-5, tiltY=dx*5; card.style.transform='translateY(-6px) perspective(600px) rotateX('+tiltX+'deg) rotateY('+tiltY+'deg)'; }); card.addEventListener('mouseleave',function(){ card.style.transform=''; }); });

  document.querySelectorAll('.service-card').forEach(function(card){ card.addEventListener('mousemove',function(e){ var r=card.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2, dx=(e.clientX-cx)/(r.width/2), dy=(e.clientY-cy)/(r.height/2); card.style.transform='translateY(-6px) perspective(600px) rotateX('+dy*-4+'deg) rotateY('+dx*4+'deg)'; }); card.addEventListener('mouseleave',function(){ card.style.transform=''; }); });

  var marqueeTrack=document.querySelector('.marquee-track'), marqueeStrip=document.querySelector('.marquee-strip'); if(marqueeTrack&&marqueeStrip){ marqueeStrip.addEventListener('mouseenter',function(){ marqueeTrack.style.animationPlayState='paused'; }); marqueeStrip.addEventListener('mouseleave',function(){ marqueeTrack.style.animationPlayState='running'; }); }

  var heroReveal=document.querySelector('.hero .reveal'); if(heroReveal) setTimeout(function(){ heroReveal.classList.add('visible'); },180);

});
