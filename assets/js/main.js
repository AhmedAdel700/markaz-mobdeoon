// 🟢 Training Fields Swiper
const trainingSwiper = new Swiper('.training-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    grabCursor: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
    },
});

// 🟢 Swipers for each tab
function initSwipers() {
    const swipers = document.querySelectorAll(".swiper");
    swipers.forEach((swiperEl) => {
        new Swiper(swiperEl, {
            slidesPerView: 1.2,
            spaceBetween: 16,
            grabCursor: true,
            pagination: {
                el: swiperEl.querySelector(".swiper-pagination"),
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
        });
    });
}
initSwipers();

// Re-init when tab changes
document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
    tab.addEventListener("shown.bs.tab", () => initSwipers());
});

