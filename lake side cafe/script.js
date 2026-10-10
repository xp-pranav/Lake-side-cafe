(() => {
    'use strict';

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const siteBar = $('#siteBar');
    const hero = $('.hero');
    if (siteBar && hero) {
        const observer = new IntersectionObserver(([entry]) => {
            siteBar.classList.toggle('on', !entry.isIntersecting);
        }, { threshold: 0.08 });
        observer.observe(hero);
    }

    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = href === '#top' ? document.body : $(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        });
    });

    const navLinks = $$('.site-bar .nav a, .nav--hero a');
    const sections = $$('section[id]');
    if (sections.length) {
        const activeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(section => activeObserver.observe(section));
    }

    const heroPosters = $('#heroPosters');
    if (heroPosters && !reduceMotion) {
        heroPosters.addEventListener('pointermove', event => {
            const rect = heroPosters.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            $$('.poster', heroPosters).forEach((poster, index) => {
                const shift = Number(poster.dataset.shift || 10) + index * 3;
                poster.style.transform = `translate(${x * shift}px, ${y * shift}px) rotate(var(--rot))`;
            });
        });
        heroPosters.addEventListener('pointerleave', () => {
            $$('.poster', heroPosters).forEach(poster => {
                poster.style.transform = 'rotate(var(--rot))';
            });
        });
    }

    if (!reduceMotion) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(34px) scale(.98)', filter: 'blur(8px)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
                ], {
                    duration: 720,
                    easing: 'cubic-bezier(.2,.8,.2,1)',
                    fill: 'both'
                });
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.14 });
        $$('.reveal').forEach(el => revealObserver.observe(el));
    }

    const sheet = $('#menuSheet');
    const openMenu = $('#openMenu');
    const closeMenu = $('#closeMenu');
    const openSheet = () => {
        if (!sheet) return;
        if (typeof sheet.showModal === 'function') sheet.showModal();
        else sheet.setAttribute('open', '');
        document.documentElement.style.overflow = 'hidden';
    };
    const closeSheet = () => {
        if (!sheet) return;
        if (sheet.open && typeof sheet.close === 'function') sheet.close();
        else sheet.removeAttribute('open');
    };
    if (openMenu) openMenu.addEventListener('click', openSheet);
    if (closeMenu) closeMenu.addEventListener('click', closeSheet);
    if (sheet) {
        sheet.addEventListener('click', event => {
            if (event.target === sheet) closeSheet();
        });
        sheet.addEventListener('close', () => {
            document.documentElement.style.overflow = '';
            if (openMenu) openMenu.focus();
        });
    }

    const toast = $('#toast');
    let toastTimer = 0;
    const showToast = message => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('on');
        clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove('on'), 1800);
    };

    $$('.copy').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.copy || '';
            const fallback = () => {
                const text = button.previousElementSibling;
                if (!text) return showToast('Copy this detail manually');
                const range = document.createRange();
                range.selectNodeContents(text);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                showToast('Selected. Press Ctrl/Cmd+C');
            };
            try {
                navigator.clipboard.writeText(value).then(() => showToast(`Copied ${value}`), fallback);
            } catch (error) {
                fallback();
            }
        });
    });

    const dayInfo = $('#dayInfo');
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = (() => {
        const jsDay = new Date().getDay();
        return jsDay === 0 ? 6 : jsDay - 1;
    })();
    $$('#week button').forEach(button => {
        const day = Number(button.dataset.day);
        if (day === today) button.classList.add('today');
        button.addEventListener('click', () => {
            $$('#week button').forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
            if (dayInfo) {
                const label = day === today ? 'Today' : dayNames[day];
                dayInfo.innerHTML = `<b>${label}:</b> open 8am – 9pm. Breakfast till noon, lunch after 11, evening snacks from 5.`;
            }
        });
    });

    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    const status = $('#openStatus');
    const statusPills = $$('.pill--live');
    const updateStatus = () => {
        const now = new Date();
        const mins = now.getHours() * 60 + now.getMinutes();
        const open = mins >= 480 && mins < 1260;
        const text = open ? 'Open now · till 9pm' : (mins < 480 ? 'Closed · opens 8am' : 'Closed · opens tomorrow 8am');
        if (status) status.textContent = text;
        statusPills.forEach(pill => pill.classList.toggle('is-closed', !open));
    };
    updateStatus();
    window.setInterval(updateStatus, 30000);
})();
