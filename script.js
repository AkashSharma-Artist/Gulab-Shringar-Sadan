  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  const closeNav = document.getElementById('closeNav');
  function openNav(){ mobileNav.classList.add('open'); overlay.classList.add('show'); }
  function shutNav(){ mobileNav.classList.remove('open'); overlay.classList.remove('show'); }
  burger.addEventListener('click', openNav);
  closeNav.addEventListener('click', shutNav);
  overlay.addEventListener('click', shutNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', shutNav));

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Back to top
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  });
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Contact form -> WhatsApp handoff
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const phone = data.get('phone').trim();
    const interest = data.get('interest');
    const message = data.get('message').trim();
    const text = `Hi, I'm ${name} (${phone}). I'm interested in: ${interest}. ${message}`;
    const waLink = `https://wa.me/918878259025?text=${encodeURIComponent(text)}`;
    success.style.display = 'block';
    window.open(waLink, '_blank');
    form.reset();
    setTimeout(() => { success.style.display = 'none'; }, 6000);
  });
