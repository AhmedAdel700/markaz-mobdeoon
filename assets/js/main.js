// 🟢 Training Fields Swiper
(() => {
    const container = document.querySelector('.training-swiper');
    if (!container) return;
    new Swiper(container, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        loop: true,
        breakpoints: {
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
        },
    });
})();

// 🟢 Testimonials Swiper
(() => {
    const container = document.querySelector('.testimonlia.soiwper');
    if (!container) return;
    new Swiper(container, {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3.5 },
        },
    });
})();

// 🟢 Learning Trips Swipers (all tabs)
(() => {
    const containers = document.querySelectorAll('.learning-trips-swiper');
    if (!containers.length) return;
    containers.forEach((container) => {
        new Swiper(container, {
            slidesPerView: 1.2,
            spaceBetween: 16,
            grabCursor: true,
            loop: true,
            breakpoints: {
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            },
        });
    });

    // Ensure swipers recalc when a tab becomes visible
    document.addEventListener('shown.bs.tab', function () {
        containers.forEach((c) => {
            if (c && c.swiper && typeof c.swiper.update === 'function') {
                c.swiper.update();
            }
        });
    });
})();

// 🟢 Blogs Swiper
(() => {
    const container = document.querySelector('.blogs-swiper');
    if (!container) return;
    new Swiper(container, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        loop: true,
        breakpoints: {
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
        },
    });
})();

// 🟢 Partners Swiper
(() => {
    const container = document.querySelector('.partners-swiper');
    if (!container) return;
    new Swiper(container, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
        },
    });
})();

// 🟢 Eye Icon
document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.querySelector("#togglePassword");
    const passwordInput = document.querySelector("#password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function () {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            this.classList.toggle("fa-eye");
            this.classList.toggle("fa-eye-slash");
        });
    }
});

// 🟢 Set Active Link in Header after it's loaded dynamically
(function activateHeaderLinksWhenReady() {
    function toBaseName(path) {
        if (!path) return "index";
        // Strip query/hash
        const clean = path.split("?")[0].split("#")[0];
        // If root
        if (clean === "/") return "index";
        const last = clean.split("/").filter(Boolean).pop() || "index.html";
        // Remove extension
        return last.replace(/\.[^./?#]+$/, "");
    }

    function urlsMatch(linkEl, currentBase) {
        const rawHref = (linkEl.getAttribute("href") || "").trim();
        if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:")) return false;

        // Resolve the href to an absolute URL to compare pathnames reliably
        let resolvedBase = "";
        let resolvedPath = "";
        let hrefFileName = "";
        try {
            const resolved = new URL(rawHref, window.location.href);
            resolvedPath = resolved.pathname;
            resolvedBase = toBaseName(resolved.pathname);
            hrefFileName = (resolved.pathname.split("/").filter(Boolean).pop()) || "";
        } catch (_) {
            resolvedBase = toBaseName(rawHref);
            resolvedPath = rawHref;
            hrefFileName = (rawHref.split("/").filter(Boolean).pop()) || "";
        }

        // Consider index equivalence
        if (currentBase === "" || currentBase === "/") currentBase = "index";
        const currentPath = window.location.pathname;
        const currentFileName = (currentPath.split("/").filter(Boolean).pop()) || "";

        // Primary: basename match
        if (resolvedBase === currentBase) return true;

        // Secondary: exact path match
        if (resolvedPath && currentPath && resolvedPath.replace(/\/index\.[^./?#]+$/, "/") === currentPath.replace(/\/index\.[^./?#]+$/, "/")) return true;

        // Tertiary: filename suffix match (handles subfolders)
        if (hrefFileName && currentPath.endsWith("/" + hrefFileName)) return true;

        return false;
    }

    function setActiveNavLinks() {
        const headerRoot = document.getElementById("header") || document.body;
        const links = headerRoot.querySelectorAll("nav a, .offcanvas-nav a");
        if (!links.length) return false;

        const currentBase = toBaseName(window.location.pathname);
        let matched = false;

        // First remove all active classes
        links.forEach((a) => {
            a.classList.remove("active");
            const parentLi = a.closest("li");
            if (parentLi) parentLi.classList.remove("active");
        });

        links.forEach((a) => {
            if (urlsMatch(a, currentBase)) {
                a.classList.add("active");
                const li = a.closest("li");
                if (li) li.classList.add("active");

                // 🔹 Mark parent dropdown toggle as active if inside a dropdown
                const dropdownParent = a.closest(".dropdown");
                if (dropdownParent) {
                    const toggle = dropdownParent.querySelector(".dropdown-toggle");
                    if (toggle) toggle.classList.add("active");
                    dropdownParent.classList.add("active");
                }

                matched = true;
            }
        });

        // Fallback: mark Home if nothing matched
        if (!matched && (currentBase === "" || currentBase === "index")) {
            const home = Array.from(links).find(
                (a) => (a.getAttribute("href") || "").trim() === "index.html" ||
                    (a.getAttribute("href") || "").trim() === "/"
            );
            if (home) {
                home.classList.add("active");
                const li = home.closest("li");
                if (li) li.classList.add("active");
            }
        }

        return matched;
    }


    // Try immediately (in case header is already in DOM)
    if (setActiveNavLinks()) return;

    // Observe #header until content is injected via jQuery .load
    const headerRoot = document.getElementById("header");
    if (!headerRoot) return;
    const observer = new MutationObserver(() => {
        if (setActiveNavLinks()) {
            observer.disconnect();
        }
    });
    observer.observe(headerRoot, { childList: true, subtree: true });
})();

// Datepicker
$(document).ready(function () {
    // Get direction from HTML element
    const isRTL = $('html').attr('dir') === 'rtl';
    
    // Month names for Arabic and English
    const monthNamesAr = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const monthNamesEn = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthNames = isRTL ? monthNamesAr : monthNamesEn;
    
    // Weekday labels for Arabic and English
    // Arabic: Saturday=ح, Sunday=ن, Monday=ث, Tuesday=ر, Wednesday=خ, Thursday=ج, Friday=س
    // English: Sunday=Su, Monday=Mo, Tuesday=Tu, Wednesday=We, Thursday=Th, Friday=Fr, Saturday=Sa
    const weekDaysAr = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    const weekDaysEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const weekDays = isRTL ? weekDaysAr : weekDaysEn;
    
    // Placeholder text
    const placeholderText = isRTL ? 'اكتب الاسم الأول هنا' : 'Enter birth date';
    
    // Today and Clear button text
    const todayText = isRTL ? 'اليوم' : 'Today';
    const clearText = isRTL ? 'مسح' : 'Clear';
    
    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        $('.datepicker-title').text(`${monthNames[month]} ${year}`);

        // Update arrow directions for RTL/LTR
        if (isRTL) {
            // In RTL, next (forward) appears to go left, prev (backward) appears to go right
            $('.datepicker-nav[data-action="next"]').html('❮');
            $('.datepicker-nav[data-action="prev"]').html('❯');
        } else {
            // In LTR, next (forward) goes right, prev (backward) goes left
            $('.datepicker-nav[data-action="next"]').html('❯');
            $('.datepicker-nav[data-action="prev"]').html('❮');
        }

        // Render weekdays
        const weekdaysHtml = weekDays.map(day =>
            `<div class="datepicker-weekday">${day}</div>`
        ).join('');
        $('.datepicker-weekdays').html(weekdaysHtml);

        // Calculate days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);

        // In JavaScript Date, Sunday = 0, Monday = 1, ..., Saturday = 6
        // For RTL (Arabic), we want Saturday (6) to be the first day
        // For LTR (English), we keep Sunday (0) as the first day
        let firstDayOfWeek = firstDay.getDay();
        if (isRTL) {
            // Convert to Arabic week: Saturday=0, Sunday=1, ..., Friday=6
            firstDayOfWeek = (firstDayOfWeek + 1) % 7;
        }
        
        const lastDateOfMonth = lastDay.getDate();
        const prevLastDate = prevLastDay.getDate();

        let daysHtml = '';

        // Previous month days
        for (let i = firstDayOfWeek; i > 0; i--) {
            daysHtml += `<div class="datepicker-day other-month">${prevLastDate - i + 1}</div>`;
        }

        // Current month days
        const today = new Date();
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dayDate = new Date(year, month, i);
            const isToday = dayDate.toDateString() === today.toDateString();
            const isSelected = selectedDate && dayDate.toDateString() === selectedDate.toDateString();

            let classes = 'datepicker-day';
            if (isToday) classes += ' today';
            if (isSelected) classes += ' selected';

            daysHtml += `<div class="${classes}" data-date="${year}-${month + 1}-${i}">${i}</div>`;
        }

        // Next month days
        const totalCells = Math.ceil((firstDayOfWeek + lastDateOfMonth) / 7) * 7;
        const nextDays = totalCells - (firstDayOfWeek + lastDateOfMonth);
        for (let i = 1; i <= nextDays; i++) {
            daysHtml += `<div class="datepicker-day other-month">${i}</div>`;
        }

        $('.datepicker-days').html(daysHtml);
        
        // Update button texts
        $('.today-btn').text(todayText);
        $('.clear-btn').text(clearText);
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Toggle datepicker
    $('#birthdate').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.datepicker').slideToggle(200);
    });

    // Close datepicker when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.date-input-wrapper').length) {
            $('.datepicker').slideUp(200);
        }
    });

    // Navigation - prevent form submission
    $(document).on('click', '.datepicker-nav', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const action = $(this).data('action');
        if (action === 'prev') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (action === 'next') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        renderCalendar(currentDate);
    });

    // Select day
    $(document).on('click', '.datepicker-day:not(.other-month)', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const dateStr = $(this).data('date');
        if (dateStr) {
            const [year, month, day] = dateStr.split('-');
            selectedDate = new Date(year, month - 1, day);
            $('#birthdate').val(formatDate(selectedDate)).removeClass('placeholder');
            renderCalendar(currentDate);
            $('.datepicker').slideUp(200);
        }
    });

    // Today button - prevent form submission
    $(document).on('click', '.today-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        selectedDate = new Date();
        currentDate = new Date();
        $('#birthdate').val(formatDate(selectedDate)).removeClass('placeholder');
        renderCalendar(currentDate);
        $('.datepicker').slideUp(200);
    });

    // Clear button - prevent form submission
    $(document).on('click', '.clear-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        selectedDate = null;
        $('#birthdate').val(placeholderText).addClass('placeholder');
        renderCalendar(currentDate);
    });

    // Initialize
    renderCalendar(currentDate);
});
