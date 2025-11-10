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

