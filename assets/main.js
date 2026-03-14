/* LetterBot RU — main.js v3 */
(function () {
  'use strict';

  /* ── year ── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── fill LB links ── */
  const lb = window.LB || {};
  document.querySelectorAll('[data-lb-github]').forEach(el => { el.href = lb.github || '#'; });
  document.querySelectorAll('[data-lb-releases]').forEach(el => { el.href = lb.releases || '#'; });
  document.querySelectorAll('[data-lb-telegram]').forEach(el => { el.href = lb.telegram || '#'; });
  document.querySelectorAll('[data-lb-boosty]').forEach(el => { el.href = lb.boosty || '#'; });
  document.querySelectorAll('[data-lb-email]').forEach(el => {
    el.href = 'mailto:' + (lb.email || '');
    el.textContent = lb.email || '';
  });
  document.querySelectorAll('[data-lb-ver]').forEach(el => { el.textContent = lb.version || ''; });
  document.querySelectorAll('[data-lb-updated]').forEach(el => { el.textContent = lb.updated || ''; });
  document.querySelectorAll('[data-lb-en]').forEach(el => { el.href = lb.siteEn || '#'; });

  /* ── mobile nav ── */
  const mobBtn = document.getElementById('mob-toggle');
  const mobNav = document.getElementById('mob-nav');
  if (mobBtn && mobNav) {
    mobBtn.addEventListener('click', () => {
      const open = mobNav.classList.toggle('open');
      mobBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ── faq accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // close all in same group
      item.closest('.faq-list, .faq-group, main')
        .querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
  // open first item on faq page
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq && document.querySelector('#faq-search')) firstFaq.classList.add('open');

  /* ── faq search ── */
  const searchInput = document.getElementById('faq-search');
  if (searchInput) {
    const items = document.querySelectorAll('.faq-item[data-faq]');
    const sectionLabels = document.querySelectorAll('.faq-section-label[data-section]');
    const empty = document.getElementById('faq-empty');

    function highlight(text, term) {
      if (!term) return text;
      const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return text.replace(re, '<mark class="faq-match">$1</mark>');
    }

    function doSearch(val) {
      const q = val.trim().toLowerCase();
      let visible = 0;
      items.forEach(item => {
        const qText = item.querySelector('.faq-q') ? item.querySelector('.faq-q').textContent.toLowerCase() : '';
        const bText = item.querySelector('.faq-body') ? item.querySelector('.faq-body').textContent.toLowerCase() : '';
        const match = !q || qText.includes(q) || bText.includes(q);
        item.toggleAttribute('data-hidden', !match);
        if (match) {
          visible++;
          // highlight
          const ql = item.querySelector('.faq-q-text');
          const bl = item.querySelector('.faq-body-text');
          if (ql) ql.innerHTML = highlight(ql.dataset.orig || ql.textContent, q);
          if (bl) bl.innerHTML = highlight(bl.dataset.orig || bl.textContent, q);
          if (q) item.classList.add('open');
        }
      });
      // hide empty section labels
      if (sectionLabels.length) {
        sectionLabels.forEach(lbl => {
          const sec = lbl.dataset.section;
          const anyVisible = [...items].some(i =>
            i.dataset.sec === sec && !i.hasAttribute('data-hidden')
          );
          lbl.style.display = anyVisible ? '' : 'none';
        });
      }
      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', e => doSearch(e.target.value));
    searchInput.addEventListener('search', e => doSearch(e.target.value));
  }

  /* ── smooth in on scroll (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll('.fcard, .arch-card, .metric-box, .faq-item');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      obs.observe(el);
    });
  }

})();
