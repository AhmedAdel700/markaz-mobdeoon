// 🟢 Training Fields Swiper
const trainingSwiper = new Swiper('.training-swiper', {
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

// 🟢 Testimonials Swiper
const testimonialsSwiper = new Swiper('.testimonlia.soiwper', {
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

// 🟢 Learning Trips Swiper
const learningTripsSwiper = new Swiper('.learning-trips-swiper', {
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

// 🟢 Blogs Swiper
const blogsSwiper = new Swiper('.blogs-swiper', {
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

// 🟢 Partners Swiper
const partnersSwiper = new Swiper('.partners-swiper', {
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




