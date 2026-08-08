/* LetterBot RU — main.js v4 · «Тёплый операторский пульт» */
(function () {
  'use strict';

  var lb = window.LB || {};

  /* ── год ── */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ── подстановка ссылок из config.js ── */
  var links = {
    github: lb.github,
    releases: lb.releases,
    issues: lb.issues,
    telegram: lb.telegram,
    boosty: lb.boosty,
    cloudtips: lb.cloudtips,
    changelog: lb.changelog,
    en: lb.siteEn
  };
  Object.keys(links).forEach(function (key) {
    if (!links[key]) return;
    var attr = key === 'en' ? 'data-lb-en' : 'data-lb-' + key;
    document.querySelectorAll('[' + attr + ']').forEach(function (el) {
      el.href = links[key];
      el.target = '_blank';
      el.rel = 'noopener';
    });
  });
  document.querySelectorAll('[data-lb-email]').forEach(function (el) {
    el.href = 'mailto:' + (lb.email || '');
    el.textContent = lb.email || '';
  });
  document.querySelectorAll('[data-lb-ver]').forEach(function (el) {
    el.textContent = 'v' + (lb.version || '');
  });
  document.querySelectorAll('[data-lb-updated]').forEach(function (el) {
    el.textContent = lb.updated || '';
  });

  /* ── мобильное меню ── */
  var burger = document.getElementById('nav-burger');
  var nav = document.getElementById('site-nav');
  if (burger && nav) {
    function setNav(open) {
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    }
    burger.addEventListener('click', function () {
      setNav(document.body.classList.contains('nav-open') === false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ── hero: конвейер (одноразовая анимация при загрузке) ── */
  var pipeline = document.getElementById('pipeline');
  if (pipeline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pipeline.classList.add('anim');
  }

  /* ── FAQ: поиск (страница faq.html) ── */
  var searchInput = document.getElementById('faq-search');
  if (searchInput) {
    var items = document.querySelectorAll('.faq-item');
    var sectionLabels = document.querySelectorAll('.faq-section-label');
    var empty = document.getElementById('faq-empty');

    function escapeReg(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function highlight(text, term) {
      if (!term) return text;
      var re = new RegExp('(' + escapeReg(term) + ')', 'gi');
      return text.replace(re, '<mark class="faq-match">$1</mark>');
    }
    function doSearch(val) {
      var q = val.trim().toLowerCase();
      var visible = 0;
      items.forEach(function (item) {
        var qEl = item.querySelector('.faq-q-text');
        var bEl = item.querySelector('.faq-body-text');
        var qText = qEl ? qEl.textContent.toLowerCase() : '';
        var bText = bEl ? bEl.textContent.toLowerCase() : '';
        var match = !q || qText.indexOf(q) !== -1 || bText.indexOf(q) !== -1;
        item.toggleAttribute('data-hidden', !match);
        if (!match) return;
        visible++;
        if (qEl && qEl.dataset.orig) qEl.innerHTML = highlight(qEl.dataset.orig, q);
        if (bEl && bEl.dataset.orig) bEl.innerHTML = highlight(bEl.dataset.orig, q);
        if (q && item.tagName === 'DETAILS') item.open = true;
      });
      sectionLabels.forEach(function (lbl) {
        var sec = lbl.dataset.section;
        var anyVisible = Array.prototype.some.call(items, function (i) {
          return i.dataset.sec === sec && !i.hasAttribute('data-hidden');
        });
        lbl.style.display = anyVisible ? '' : 'none';
      });
      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    }
    searchInput.addEventListener('input', function (e) { doSearch(e.target.value); });
    searchInput.addEventListener('search', function (e) { doSearch(e.target.value); });
  }

  /* ── параметр ?q= для поиска на странице FAQ ── */
  var m = /[?&]q=([^&]+)/.exec(location.search);
  if (m && searchInput) {
    searchInput.value = decodeURIComponent(m[1].replace(/\+/g, ' '));
    doSearch(searchInput.value);
  }
})();
