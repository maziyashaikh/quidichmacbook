document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
  
    const header = document.getElementById("header");

    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollTop) {
            header.classList.add("header-hidden"); 
        } else {
            header.classList.remove("header-hidden");
        }

        if (scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        lastScrollTop = scrollY <= 0 ? 0 : scrollY; 
    });
    
    const menuTimeline = gsap.timeline({ paused: true });
    const menuToggle = document.getElementById("menuToggle");
    const hamburgerIcon = document.querySelector(".hamburger");

    menuToggle.addEventListener('click', function () {
        hamburgerIcon.classList.toggle('close');

        if (menuTimeline.reversed()) {
            menuTimeline.play();
        } else {
            menuTimeline.reverse();
        }
    });

    menuTimeline.to('.fullpage-menu', {
        duration: 0,
        display: "block",
        ease: 'Expo.easeInOut',
    }).from('.main-menu li a', {
        duration: 1.5,
        y: "100%",
        opacity: 0,
        stagger: 0.2,
        ease: 'Expo.easeInOut'
    }, "-=0.5").from('.small-menu a', {
        duration: 1.5,
        y: "100%",
        opacity: 0,
        stagger: 0.2,
        ease: 'Expo.easeInOut'
    }, "-=0.5").from('.social-links li', {
        duration: 1,
        y: "-100%",
        opacity: 0,
        stagger: 0.1,
        ease: 'Expo.easeInOut'
    }, "-=0.5");

    menuTimeline.reverse();

    const smallCircle = document.querySelector('.small-circle');
    const bigCircle = document.querySelector('.big-circle');
    const circleSliderSection = document.getElementById('main');

    function hideCircles() {
        bigCircle.style.display = 'none';
        smallCircle.style.display = 'none';
    }

    function showCircles() {
        bigCircle.style.display = 'block';
        smallCircle.style.display = 'block';
    }

    circleSliderSection.addEventListener('mouseenter', hideCircles);
    circleSliderSection.addEventListener('mouseleave', showCircles);

    document.addEventListener('mousemove', function (e) {
        smallCircle.style.left = e.pageX + 'px';
        smallCircle.style.top = e.pageY + 'px';
        bigCircle.style.left = e.pageX + 'px';
        bigCircle.style.top = e.pageY + 'px';
    });

    const clickableElements = document.querySelectorAll('a, iframe, button, .menu-toggle');
    clickableElements.forEach(element => {
        element.style.cursor = 'none';
    });

    const videoIframe = document.querySelector('.video-container iframe');
    function enableDefaultCursor() {
        smallCircle.style.display = 'none';
        bigCircle.style.display = 'none';
        videoIframe.style.cursor = 'default';
    }
    function disableDefaultCursor() {
        smallCircle.style.display = 'block';
        bigCircle.style.display = 'block';
        videoIframe.style.cursor = 'none';
    }

    videoIframe.addEventListener('mouseenter', enableDefaultCursor);
    videoIframe.addEventListener('mouseleave', disableDefaultCursor);

    const magneticBtn = document.querySelector(".menu-toggle");
    magneticBtn.addEventListener("mousemove", function (event) {
        const { left, top, width, height } = magneticBtn.getBoundingClientRect();
        const magnetStrength = 0.25;
        const dx = event.clientX - (left + width / 2);
        const dy = event.clientY - (top + height / 2);
        const maxOffset = 15;
        gsap.to(magneticBtn, {
            x: Math.max(-maxOffset, Math.min(dx * magnetStrength, maxOffset)),
            y: Math.max(-maxOffset, Math.min(dy * magnetStrength, maxOffset)),
            duration: 0.3,
            ease: "power4.out"
        });
        gsap.to(bigCircle, {
            scale: 1.8,
            ease: "power4.out",
            duration: 0.3
        });
    });

    magneticBtn.addEventListener("mouseleave", function () {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        gsap.to(bigCircle, { scale: 1, duration: 0.3, ease: "power4.out" });
    });

    const hoverElements = document.querySelectorAll('a, button, .menu-toggle, iframe');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(bigCircle, {
                scale: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.8)',
                duration: 0.3,
                ease: "power4.out"
            });
        });
        element.addEventListener('mouseleave', () => {
            gsap.to(bigCircle, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: '#fff',
                duration: 0.3,
                ease: "power4.out"
            });
        });
    });

    const items = document.querySelectorAll('.fly-in-text li');
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.text-section',
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
        }
    });

    tl.fromTo(items, {
        opacity: 0,
        scale: 3,
        x: () => gsap.utils.random(-500, 500),
        y: () => gsap.utils.random(-300, 300),
    }, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        stagger: {
            amount: 1,
            from: "random"
        },
        ease: "power3.out"
    });

    tl.eventCallback("onComplete", () => {
        items.forEach(item => {
            item.classList.add('normal-size');
        });
    });

    function animateCounter(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    ScrollTrigger.create({
        trigger: '.counter-section',
        start: 'top 80%',
        onEnter: () => {
            animateCounter("counter1", 0, 5, 2000);
            animateCounter("counter2", 0, 10, 2000);
            animateCounter("counter3", 0, 15, 2000);
        },
        once: true
    });

    gsap.to("#scroll-text.reveal-type", {
        color: "white",
        duration: 2,
        scrollTrigger: {
            trigger: "#scroll-text",
            start: "top 70%",
            end: "top 10%",
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
        }
    });

    gsap.fromTo(".main-heading", {
        color: "rgba(255, 255, 255, 0.5)",
    }, {
        color: "white",
        duration: 2,
        scrollTrigger: {
            trigger: "#section2",
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
        }
    });

    function createStarfield(selector, options) {
        var element = document.querySelector(selector);
        if (element) {
            new Starfield(element, options).start();
        }
    }

    createStarfield('.starfield', {
        starColor: "rgba(255,255,255,0.5)",
        bgColor: "rgba(0,0,0,0.8)",
        mouseMove: true,
        quantity: 200,
        speed: 1,
        ratio: 256
    });

    const splitTypes = document.querySelectorAll('.reveal-type');
    splitTypes.forEach((char) => {
        char.style.color = "rgb(48 46 46)";
    });

    splitTypes.forEach((char) => {
        const text = new SplitType(char, { types: 'chars' });
        gsap.fromTo(text.chars,
            {
                color: "rgb(48 46 46)",
            },
            {
                color: "#f3f3f3",
                duration: 0.1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: char,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                    toggleActions: 'play play reverse reverse',
                }
            }
        );
    });

    let active = 0;
    const sec = document.querySelectorAll(".stripe");
    const sideImages = [
        'assets/stadium-1.png',
        'assets/stadiumtwo.png',
        'assets/stadium-2.png',
        'assets/stadium-1.png',
        'assets/stadiumtwo.png',
        'assets/stadium-2.png'
    ];

    function updateBackgroundAndSideImage(index) {
        document.getElementById('sideImage').style.backgroundImage = `url(${sideImages[index]})`;
    }

    sec[active].classList.add('active');

    ScrollTrigger.create({
        trigger: "#main",
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 2,
        onUpdate: (self) => {
            const index = Math.floor(self.progress * sec.length);
            if (active !== index) {
                active = index;
                rotateCircle(active);
            }
        }
    });

    function rotateCircle(index) {
        gsap.to("#circle", {
            rotate: -(index * 15),
            ease: "power3.out",
            duration: 1.8
        });

        greyOut();
        sec[index].classList.add('active');
        updateBackgroundAndSideImage(index);
    }

    function greyOut() {
        sec.forEach(el => {
            el.classList.remove('active');
            el.querySelector('.number-circle').style.opacity = '1';
        });
    }

    sec.forEach((section, idx) => {
        section.addEventListener('scroll', () => {
            if (idx === active) {
                section.querySelector('.number-circle').style.opacity = '1';
            }
        });
    });

    gsap.to("#circle", { rotate: 0, ease: Expo.easeInOut, duration: 2 });


    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const sliderContainer = document.querySelector('.slider-container');

    function moveSlides(n) {
        currentSlide = (currentSlide + n + slides.length) % slides.length;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    function autoSlide() {
        moveSlides(1);
    }

    setInterval(autoSlide, 3000);
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    if (prevButton) {
        prevButton.addEventListener('click', function () {
            moveSlides(-1);
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            moveSlides(1);
        });
    }

    const cursorElements = document.querySelectorAll('.prev, .next');
    cursorElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.querySelector('.small-circle').style.display = 'none';
            document.querySelector('.big-circle').style.display = 'none';
            el.style.cursor = 'pointer';
            el.style.pointerEvents = 'auto';
        });

        el.addEventListener('mouseleave', () => {
            document.querySelector('.small-circle').style.display = 'block';
            document.querySelector('.big-circle').style.display = 'block';
            el.style.cursor = 'none';
            el.style.pointerEvents = 'none';
        });
    });

    setInterval(autoSlide, 3000);
    moveSlides(0);
    const proPlayButtons = document.querySelectorAll('.proplay-button');
    const promodalOverlay = document.getElementById('promodalOverlay');
    const promodalContentIframe = promodalOverlay.querySelector('iframe');
    const proCloseModalButton = document.querySelector('.proclose-modal');

    proPlayButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal();
        });
    });

    function openModal() {
        promodalOverlay.classList.add('active');
        promodalContentIframe.src = "https://player.vimeo.com/video/477323798?autoplay=1";
    }

    function closeModal() {
        promodalOverlay.classList.remove('active');
        promodalContentIframe.src = "";
    }

    proCloseModalButton.addEventListener('click', closeModal);
});


document.addEventListener("DOMContentLoaded", function () {
    const sliderMobile = document.querySelector('.mobile-slider-unique');
    
    if (sliderMobile) {
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.mobile-slider-unique .mobile-slide-unique');
        const dots = document.querySelectorAll('.navigation-unique .dot');
        const totalSlides = slides.length;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        function moveToSlide(index) {
            currentSlideIndex = index;
            sliderMobile.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            updateActiveDot();
        }
        function updateActiveDot() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlideIndex);
            });
        }
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => moveToSlide(index));
        });
        updateActiveDot();
        sliderMobile.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        sliderMobile.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        sliderMobile.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) { 
                if (diff > 0) {
                    moveToSlide((currentSlideIndex + 1) % totalSlides);
                } else {
                    moveToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides);
                }
            }
            isDragging = false;
        });
    }
});