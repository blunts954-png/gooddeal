/* =========================================================
   A & M PUMPING — MAIN JAVASCRIPT ENGINE
   SEO/AEO/GEO Optimized | AI Chatbot | Booking | Animations
   ========================================================= */

'use strict';

// ===== UTILITY =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

// ===== HEADER SCROLL BEHAVIOR =====
(function initHeader() {
    const header = $('#header');
    const bar = $('#emergency-bar');
    if (!header) return;

    const onScroll = () => {
        const scrolled = window.scrollY > 40;
        header.classList.toggle('scrolled', scrolled);

        // Hide bar after scroll
        if (bar) {
            const barHidden = window.scrollY > 100;
            bar.style.transform = barHidden ? 'translateY(-100%)' : '';
            bar.style.transition = 'transform 0.3s ease';
            header.classList.toggle('bar-hidden', barHidden);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== MOBILE NAV =====
(function initMobileNav() {
    const toggle = $('#nav-toggle');
    const navLinks = $('#nav-links');
    if (!toggle || !navLinks) return;

    on(toggle, 'click', () => {
        const open = toggle.classList.toggle('open');
        navLinks.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    $$('.nav-link', navLinks).forEach(link => {
        on(link, 'click', () => {
            toggle.classList.remove('open');
            navLinks.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    on(document, 'click', (e) => {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !toggle.contains(e.target)) {
            toggle.classList.remove('open');
            navLinks.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
})();

// ===== HERO PARTICLES =====
(function initParticles() {
    const container = $('#hero-particles');
    if (!container) return;

    const COUNT = 18;
    for (let i = 0; i < COUNT; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * duration;
        const tx = (Math.random() - 0.5) * 200;
        const ty = -(Math.random() * 400 + 100);

        Object.assign(p.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            bottom: `-${size}px`,
            opacity: Math.random() * 0.7 + 0.2,
            animationDuration: `${duration}s`,
            animationDelay: `-${delay}s`,
            '--tx': `${tx}px`,
            '--ty': `${ty}px`,
        });

        // Vary particle color
        const colors = [
            'rgba(21, 101, 192, 0.6)',
            'rgba(41, 182, 246, 0.5)',
            'rgba(123, 97, 255, 0.4)',
            'rgba(255, 255, 255, 0.2)',
        ];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(p);
    }
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
    const observe = () => {
        const items = $$('.reveal');
        if (!items.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });

        items.forEach(el => observer.observe(el));

        // Failsafe: force-reveal anything still hidden after 2s
        setTimeout(() => {
            $$('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
        }, 2000);
    };

    // Run after autoReveal adds classes
    setTimeout(observe, 50);
})();

// ===== AUTO-ADD REVEAL CLASS TO SECTIONS (below-fold only) =====
(function autoReveal() {
    const foldLine = window.innerHeight * 1.2;
    const selectors = [
        '.service-card', '.why-item', '.faq-item',
        '.nearby-card', '.section-header',
        '.why-content', '.area-content', '.location-article h2',
        '.location-article p'
    ];
    selectors.forEach(sel => {
        $$(sel).forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            // Only animate elements that start below the fold
            if (rect.top > foldLine) {
                el.classList.add('reveal');
                if (i % 4 === 1) el.classList.add('reveal-delay-1');
                if (i % 4 === 2) el.classList.add('reveal-delay-2');
                if (i % 4 === 3) el.classList.add('reveal-delay-3');
            }
        });
    });
})();

// ===== REVIEWS WALL =====
(function initReviews() {
    const track = $('#reviews-track');
    if (!track) return;

    const reviews = [
        {
            name: 'Carlos M.',
            date: '2 weeks ago',
            text: 'Called at 8pm on a Friday — septic backup was inches from my kitchen floor. A&M had someone out within 45 minutes. Absolute lifesavers. Will not call anyone else.',
            rating: 5,
            source: 'Google',
            avatar: 'CM',
            color: '#1565C0',
        },
        {
            name: 'Jennifer R.',
            date: '1 month ago',
            text: 'Been using A&M for 4 years now. Never had a single issue. Prices are fair, they show up on time, and they always explain what they found. You can\'t ask for more.',
            rating: 5,
            source: 'Google',
            avatar: 'JR',
            color: '#7B1FA2',
        },
        {
            name: 'Martinez Family Restaurant',
            date: '3 weeks ago',
            text: 'They handle all our grease trap cleaning and maintenance. Scheduling is easy, manifests are always provided same day, and we\'ve passed every health inspection. Highly recommend for any restaurant in Bakersfield.',
            rating: 5,
            source: 'BBB',
            avatar: 'MF',
            color: '#2E7D32',
        },
        {
            name: 'Dave K.',
            date: '1 month ago',
            text: 'Honest, transparent pricing. Got quotes from 3 companies — A&M was the clearest about what they\'d charge and why. No weird surprise fees. That alone earned my business.',
            rating: 5,
            source: 'Google',
            avatar: 'DK',
            color: '#E65100',
        },
        {
            name: 'Sarah T.',
            date: '6 weeks ago',
            text: 'We were selling our house and needed a septic inspection with a 3-day turnaround. Got the certified report the same day. The inspector was professional and thorough. Closed the deal because of that report.',
            rating: 5,
            source: 'Google',
            avatar: 'ST',
            color: '#00695C',
        },
        {
            name: 'Robert & Linda H.',
            date: '2 months ago',
            text: 'Our leach field was a disaster — standing water, awful smell. A&M diagnosed the problem, explained every option, and restored it without recommending a full replacement like other companies suggested. Saved us $8,000.',
            rating: 5,
            source: 'Google',
            avatar: 'RH',
            color: '#BF360C',
        },
        {
            name: 'Oildale Property Mgmt.',
            date: '3 months ago',
            text: 'Manage 12 rental properties in Oildale. A&M handles all of them on a maintenance contract. Responsive, professional, and they track everything. Makes our job so much easier.',
            rating: 5,
            source: 'Google',
            avatar: 'OP',
            color: '#283593',
        },
        {
            name: 'Tanya B.',
            date: '5 days ago',
            text: 'Used the online booking — incredibly easy. Selected a 2-hour window, got a confirmation text, they showed up at the start of that window. Revolutionary for a service company. 5 stars without question.',
            rating: 5,
            source: 'Google',
            avatar: 'TB',
            color: '#558B2F',
        },
    ];

    // Create review cards and duplicate for infinite scroll
    const allReviews = [...reviews, ...reviews]; // duplicate
    allReviews.forEach(r => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.setAttribute('aria-label', `Review by ${r.name}`);
        card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar" style="background: ${r.color};">${r.avatar}</div>
        <div class="review-meta">
          <div class="review-name">${r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
        <span class="review-source">${r.source}</span>
      </div>
      <div class="review-stars">${'★'.repeat(r.rating)}</div>
      <p class="review-text">${r.text}</p>
    `;
        track.appendChild(card);
    });
})();

// ===== FAQ ACCORDION =====
(function initFAQ() {
    $$('.faq-question').forEach(btn => {
        on(btn, 'click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const answerId = btn.getAttribute('aria-controls');
            const answer = $(`#${answerId}`);

            // Close all others
            $$('.faq-question').forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherId = other.getAttribute('aria-controls');
                    const otherAnswer = $(`#${otherId}`);
                    if (otherAnswer) otherAnswer.classList.remove('open');
                }
            });

            // Toggle current
            btn.setAttribute('aria-expanded', !expanded ? 'true' : 'false');
            if (answer) answer.classList.toggle('open', !expanded);
        });
    });
})();

// ===== AI CHATBOT ENGINE =====
(function initChatbot() {
    const launcher = $('#chatbot-launcher');
    const toggle = $('#chatbot-toggle');
    const window_ = $('#chatbot-window');
    const closeBtn = $('#chatbot-close');
    const messagesEl = $('#chatbot-messages');
    const inputEl = $('#chatbot-input');
    const sendBtn = $('#chatbot-send');
    const quickRepliesEl = $('#chatbot-quick-replies');
    const badge = $('.chatbot-badge');

    if (!launcher || !toggle || !window_) return;

    let isOpen = false;
    let conversationState = 'greeting';
    let leadData = {};
    let typing = false;

    // Open/close chatbot
    const openChat = () => {
        isOpen = true;
        window_.classList.add('open');
        window_.setAttribute('aria-hidden', 'false');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        if (badge) badge.style.display = 'none';

        // Greet on first open
        if (!messagesEl.children.length) {
            setTimeout(() => botType('👋 Hey there! I\'m the A&M Assistant. Are you dealing with a septic emergency right now?', 'bot', null, getGreetingReplies()), 400);
        }
    };

    const closeChat = () => {
        isOpen = false;
        window_.classList.remove('open');
        window_.setAttribute('aria-hidden', 'true');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    on(toggle, 'click', () => isOpen ? closeChat() : openChat());
    on(closeBtn, 'click', closeChat);

    // Quick reply sections by state
    function getGreetingReplies() {
        return [
            { label: '🚨 YES — Emergency!', value: 'emergency' },
            { label: 'No, I need a regular service', value: 'regular' },
            { label: 'I have a question', value: 'question' },
            { label: 'Get a quote', value: 'quote' },
        ];
    }

    function getServiceReplies() {
        return [
            { label: 'Septic Pumping', value: 'septic_pumping' },
            { label: 'Grease Trap Cleaning', value: 'grease_trap' },
            { label: 'Septic Repair', value: 'septic_repair' },
            { label: 'Septic Inspection', value: 'inspection' },
            { label: 'Maintenance Plan', value: 'maintenance' },
        ];
    }

    function getScheduleReplies() {
        return [
            { label: 'Book Online', value: 'book_online' },
            { label: 'Call Us Instead', value: 'call' },
        ];
    }

    // Detect emergency keywords
    const EMERGENCY_KEYWORDS = ['overflow', 'backup', 'sewage', 'smell', 'backing up',
        'gurgling', 'leaking', 'flooding', 'emergency', 'urgent', 'overflowing',
        'stink', 'stinking', 'wet yard', 'puddle', 'bubbling', 'slow drain'];

    function isEmergency(text) {
        return EMERGENCY_KEYWORDS.some(kw => text.toLowerCase().includes(kw));
    }

    // Add a message bubble
    function addMessage(text, type, extra = '') {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${type}`;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msg.innerHTML = `
      <div class="chat-bubble">${text}${extra}</div>
      <div class="chat-time">${timeStr}</div>
    `;
        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return msg;
    }

    // Typing indicator
    function showTyping() {
        typing = true;
        const el = document.createElement('div');
        el.className = 'chat-msg bot typing-el';
        el.innerHTML = '<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>';
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return el;
    }

    function removeTyping(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
        typing = false;
    }

    // Bot types a response with delay
    function botType(text, type = 'bot', cssClass = null, quickReplies = null, delay = 1200) {
        const typingEl = showTyping();
        return new Promise(resolve => {
            setTimeout(() => {
                removeTyping(typingEl);
                const msg = addMessage(text, cssClass || type);
                if (quickReplies) setQuickReplies(quickReplies);
                resolve(msg);
            }, delay);
        });
    }

    // Render quick reply chips
    function setQuickReplies(replies) {
        if (!quickRepliesEl) return;
        quickRepliesEl.innerHTML = '';
        replies.forEach(r => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = r.label;
            btn.setAttribute('data-value', r.value);
            on(btn, 'click', () => {
                addMessage(r.label, 'user');
                quickRepliesEl.innerHTML = '';
                processInput(r.value, r.label);
            });
            quickRepliesEl.appendChild(btn);
        });
    }

    // Core conversation logic
    async function processInput(value, displayText) {
        const lower = (value || '').toLowerCase();

        // Always check for emergency first regardless of state
        if (isEmergency(lower) || value === 'emergency') {
            conversationState = 'emergency_triage';
            await botType(
                '🚨 <strong>This sounds like an emergency.</strong> Hang tight — our crew is on standby 24/7.',
                'bot', 'emergency-alert', null, 600
            );
            await botType(
                'The fastest path to help is calling us directly. Our dispatcher will send a truck to your location immediately.',
                'bot', null, null, 800
            );
            await botType(
                '📞 <strong><a href="tel:+16614310752" style="color:#29B6F6;">(661) 431-0752</a></strong> — Call now, or tell me your address and we\'ll have dispatch contact you.',
                'bot', null, [
                { label: '📞 Call Now', value: 'call' },
                { label: 'Give My Address', value: 'give_address' },
            ], 900
            );
            return;
        }

        if (value === 'call') {
            window.location.href = 'tel:+16614310752';
            return;
        }

        if (value === 'book_online') {
            await botType('Redirecting you to our online booking page... 📅', 'bot', null, null, 400);
            setTimeout(() => { window.location.href = 'booking.html'; }, 800);
            return;
        }

        if (value === 'give_address') {
            conversationState = 'collect_address';
            await botType('Please type your full address and we\'ll have a dispatcher call you right back. Your location stays private and is only used for dispatch.', 'bot', null, null, 800);
            return;
        }

        if (conversationState === 'collect_address') {
            leadData.address = displayText;
            conversationState = 'collect_phone';
            await botType('Got it! And what\'s the best number to reach you? We\'ll call within 5 minutes.', 'bot', null, null, 800);
            return;
        }

        if (conversationState === 'collect_phone' && /[\d\-\(\)\s]{7,}/.test(displayText)) {
            leadData.phone = displayText;
            conversationState = 'dispatching';
            await botType('✅ <strong>Received.</strong> Dispatching now. Expect a call from our team in under 5 minutes!', 'bot', null, null, 800);
            await botType('While you wait — is there anything else I should know? (odor level, any sewage visible, number of people in home?)', 'bot', null, [
                { label: 'Strong odor', value: 'odor_info' },
                { label: 'Sewage visible', value: 'sewage_visible' },
                { label: 'No, just waiting', value: 'waiting' },
            ], 1000);
            // In production: send leadData to backend/Zapier/SMS gateway
            console.log('[LEAD]', leadData);
            return;
        }

        if (value === 'regular') {
            conversationState = 'service_select';
            await botType('Great! What service can we help you with today?', 'bot', null, getServiceReplies(), 800);
            return;
        }

        if (value === 'septic_pumping') {
            leadData.service = 'Septic Pumping';
            conversationState = 'qualify_pumping';
            await botType('For septic pumping — a couple quick questions to get you the right crew and equipment. When was your last pump?', 'bot', null, [
                { label: 'Never / Don\'t know', value: 'pump_unknown' },
                { label: '1-2 years ago', value: 'pump_recent' },
                { label: '3+ years ago', value: 'pump_overdue' },
            ], 800);
            return;
        }

        if (['pump_unknown', 'pump_recent', 'pump_overdue'].includes(value)) {
            leadData.lastPump = value;
            await botType('And roughly how large is your tank? (helps us send the right truck)', 'bot', null, [
                { label: '750 gallons', value: 'tank_750' },
                { label: '1,000 gallons', value: 'tank_1000' },
                { label: '1,500+ gallons', value: 'tank_1500' },
                { label: 'Not sure', value: 'tank_unknown' },
            ], 800);
            conversationState = 'qualify_tank';
            return;
        }

        if (['tank_750', 'tank_1000', 'tank_1500', 'tank_unknown'].includes(value)) {
            leadData.tankSize = value;
            conversationState = 'schedule';
            await botType('Perfect — we\'re all set! Would you like to book online with a guaranteed 2-hour arrival window, or call to speak with our dispatcher directly?', 'bot', null, getScheduleReplies(), 800);
            return;
        }

        if (value === 'grease_trap') {
            leadData.service = 'Grease Trap Cleaning';
            await botType('We service all types of commercial grease traps across Bakersfield. Do you need a scheduled recurring service or a one-time clean?', 'bot', null, [
                { label: 'Recurring maintenance', value: 'grease_recurring' },
                { label: 'One-time service', value: 'grease_onetime' },
                { label: 'It\'s urgent / overflowing', value: 'emergency' },
            ], 800);
            return;
        }

        if (['grease_recurring', 'grease_onetime'].includes(value)) {
            await botType('Got it! Our commercial grease team will get in touch to schedule. Ready to book a time?', 'bot', null, getScheduleReplies(), 800);
            return;
        }

        if (value === 'septic_repair') {
            leadData.service = 'Septic Repair';
            await botType('Repair jobs start with a diagnostic inspection. We use video inspection technology to pinpoint the exact problem before quoting — no guesswork. Want to schedule an inspection?', 'bot', null, getScheduleReplies(), 1000);
            return;
        }

        if (value === 'inspection') {
            leadData.service = 'Septic Inspection';
            await botType('We offer same-day certified septic inspections for real estate transactions and general peace of mind. Certified report included. Ready to book?', 'bot', null, getScheduleReplies(), 1000);
            return;
        }

        if (value === 'maintenance') {
            leadData.service = 'Maintenance Plan';
            await botType('Our maintenance plans include annual pumping, priority service, and inspection discounts. Starting at just $299/year. Want details emailed to you or ready to talk to someone?', 'bot', null, [
                { label: 'Email me details', value: 'email_details' },
                { label: 'Call to discuss', value: 'call' },
                { label: 'Book now', value: 'book_online' },
            ], 1000);
            return;
        }

        if (value === 'email_details') {
            conversationState = 'collect_email';
            await botType('What\'s your email address? We\'ll send the maintenance plan info right over.', 'bot', null, null, 800);
            return;
        }

        if (conversationState === 'collect_email' && /@/.test(displayText)) {
            leadData.email = displayText;
            await botType(`✅ Done! Check your inbox at <strong>${displayText}</strong> in the next few minutes. Anything else I can help with?`, 'bot', null, getGreetingReplies(), 800);
            conversationState = 'greeting';
            return;
        }

        if (value === 'question') {
            await botType('Of course! Ask me anything about septic systems, grease traps, or our services. I can also direct you to our <a href="faq.html" style="color:#29B6F6;">FAQ page</a> for detailed answers.', 'bot', null, [
                { label: 'Cost of pumping?', value: 'q_cost' },
                { label: 'How often to pump?', value: 'q_frequency' },
                { label: 'Emergency availability?', value: 'q_emergency' },
                { label: 'Do you serve [my area]?', value: 'q_area' },
            ], 800);
            return;
        }

        if (value === 'q_cost') {
            await botType('Standard septic pumping in Bakersfield ranges from <strong>$275–$450</strong> depending on tank size. Emergency service has an additional dispatch fee. We always give you a firm quote before starting any work — no surprises.', 'bot', null, [
                { label: 'Book Now', value: 'book_online' },
                { label: 'Call for exact quote', value: 'call' },
            ], 800);
            return;
        }

        if (value === 'q_frequency') {
            await botType('In Bakersfield\'s clay-heavy soil, we recommend pumping every <strong>2-3 years</strong> for most households. Larger families (4+ people) or those with garbage disposals should pump every 1-2 years.', 'bot', null, [
                { label: 'Schedule pump', value: 'septic_pumping' },
                { label: 'More questions', value: 'question' },
            ], 800);
            return;
        }

        if (value === 'q_emergency') {
            await botType('Yes — we\'re available <strong>24/7/365</strong> for emergencies. We prioritize Bakersfield emergencies and move as quickly as scheduling allows. Call our emergency line anytime.', 'bot', null, [
                { label: '📞 Call Emergency Line', value: 'call' },
            ], 800);
            return;
        }

        if (value === 'q_area') {
            await botType('We serve all of Kern County including Bakersfield, Oildale, Rosedale, Greenacres, Seven Oaks, Tehachapi, Taft, Shafter, Wasco, Delano, and more. Check our <a href="service-areas.html" style="color:#29B6F6;">Service Areas page</a> for a full list.', 'bot', null, [
                { label: 'Book a service', value: 'regular' },
                { label: 'Ask another question', value: 'question' },
            ], 800);
            return;
        }

        if (value === 'quote') {
            await botType('I can help get you an estimate! What service do you need?', 'bot', null, getServiceReplies(), 800);
            return;
        }

        if (['odor_info', 'sewage_visible', 'waiting'].includes(value)) {
            await botType('Noted. Our dispatcher has that info. Stay safe and away from any visible sewage. Help is coming! 🚚', 'bot', null, null, 600);
            return;
        }

        // Default fallback — try to detect intent from free text
        if (isEmergency(lower)) {
            processInput('emergency', displayText);
            return;
        }

        if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment')) {
            processInput('regular', displayText);
            return;
        }

        if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('$')) {
            processInput('q_cost', displayText);
            return;
        }

        if (lower.includes('area') || lower.includes('serve') || lower.includes('location') || lower.includes('oildale') || lower.includes('rosedale')) {
            processInput('q_area', displayText);
            return;
        }

        // Generic unknown
        await botType('I want to make sure I get you to the right team. Would you like to call us directly, or let me walk you through booking?', 'bot', null, [
            { label: '📞 Call (661) 431-0752', value: 'call' },
            { label: 'Book Online', value: 'book_online' },
            { label: 'Ask a Question', value: 'question' },
        ], 800);
    }

    // Send message
    function sendMessage() {
        const text = inputEl.value.trim();
        if (!text || typing) return;
        inputEl.value = '';
        quickRepliesEl.innerHTML = '';
        addMessage(text, 'user');
        processInput(text, text);
    }

    on(sendBtn, 'click', sendMessage);
    on(inputEl, 'keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
})();

// ===== BOOKING FORM (booking.html only) =====
(function initBookingForm() {
    const form = $('#booking-form');
    if (!form) return;

    let currentStep = 1;
    const totalSteps = 3;

    const steps = $$('.form-step');
    const indicators = $$('.step-indicator');
    const prevBtn = $('#prev-step');
    const nextBtn = $('#next-step');
    const submitBtn = $('#submit-booking');
    const successScreen = $('#booking-success');

    function updateStepUI() {
        steps.forEach((el, i) => {
            el.classList.toggle('active', i + 1 === currentStep);
        });
        indicators.forEach((el, i) => {
            el.classList.toggle('active', i + 1 === currentStep);
            el.classList.toggle('done', i + 1 < currentStep);
        });

        if (prevBtn) prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
        if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';

        updateSummary();
    }

    function validateStep(step) {
        if (step === 1) {
            const service = document.querySelector('input[name="service"]:checked');
            const urgency = document.querySelector('input[name="urgency"]:checked');
            const date = $('#service-date')?.value;
            const time = document.querySelector('input[name="time"]:checked');
            if (!service) { alert('Please select a service type.'); return false; }
            if (!urgency) { alert('Please select urgency level.'); return false; }
            if (!date) { alert('Please select a date.'); return false; }
            if (!time) { alert('Please select a time window.'); return false; }
        }
        if (step === 2) {
            const name = $('#customer-name')?.value;
            const phone = $('#customer-phone')?.value;
            const address = $('#service-address')?.value;
            if (!name?.trim()) { alert('Please enter your name.'); return false; }
            if (!phone?.trim()) { alert('Please enter your phone number.'); return false; }
            if (!address?.trim()) { alert('Please enter your service address.'); return false; }
        }
        return true;
    }

    on(nextBtn, 'click', () => {
        if (!validateStep(currentStep)) return;
        if (currentStep < totalSteps) { currentStep++; updateStepUI(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });

    on(prevBtn, 'click', () => {
        if (currentStep > 1) { currentStep--; updateStepUI(); }
    });

    on(submitBtn, 'click', () => {
        if (!validateStep(currentStep)) return;

        // Show success screen
        form.style.display = 'none';
        if (successScreen) {
            successScreen.classList.add('show');
            const ref = 'AM' + Date.now().toString().slice(-6);
            const refEl = successScreen.querySelector('.booking-ref');
            if (refEl) refEl.textContent = `Confirmation: #${ref}`;
        }
    });

    function updateSummary() {
        const service = document.querySelector('input[name="service"]:checked');
        const date = $('#service-date')?.value;
        const time = document.querySelector('input[name="time"]:checked');
        const name = $('#customer-name')?.value;

        const setVal = (id, val) => {
            const el = $(`#summary-${id}`);
            if (!el) return;
            el.textContent = val || '—';
            el.className = val ? 'bs-value' : 'bs-value empty';
        };

        if (service) {
            const label = service.closest('.service-option')?.querySelector('.service-opt-name')?.textContent;
            setVal('service', label);
        } else { setVal('service', ''); }

        setVal('date', date ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '');

        if (time) {
            const label = time.closest('.time-slot')?.querySelector('label')?.textContent;
            setVal('time', label?.trim());
        } else { setVal('time', ''); }

        setVal('name', name);
    }

    // Listen to form changes for summary
    on(form, 'input', updateSummary);
    on(form, 'change', updateSummary);

    // Set min date to today
    const dateInput = $('#service-date');
    if (dateInput) {
        const today = new Date();
        dateInput.min = today.toISOString().split('T')[0];
        dateInput.value = today.toISOString().split('T')[0];
    }

    updateStepUI();
})();

// ===== PHONE FORMATTING =====
(function formatPhones() {
    $$('input[type="tel"]').forEach(input => {
        on(input, 'input', function () {
            let v = this.value.replace(/\D/g, '');
            if (v.length >= 10) {
                v = `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6, 10)}`;
            }
            this.value = v;
        });
    });
})();

// ===== SMOOTH LINK HANDLING =====
(function initSmoothLinks() {
    $$('a[href^="#"]').forEach(link => {
        on(link, 'click', (e) => {
            const target = $(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();

// ===== ACTIVE NAV LINK =====
(function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    $$('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === path);
    });
})();

// ===== PAGE ENTER ANIMATION =====
document.body.classList.add('page-enter');

// ===== LOG =====
console.log('%c A & M Pumping — Digital Ecosystem v1.0 ', 'background:#1565C0;color:#fff;font-size:12px;padding:4px 8px;border-radius:4px;');
