document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    new Typed("#typed", {
        strings: ["The Software Engineer", "IT Multimedia Graduate", "Microsoft 365 Certified", " UX/UI Designer"],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });

    $(window).on('load', function () {
        const $preloader = $('#preloader');
        $preloader.css({
            'opacity': '0',
            'visibility': 'hidden',
            'transition': 'opacity 0.3s ease, visibility 0.3s ease'
        });
    });
    
    // Update year dynamically
    $('#year').text(new Date().getFullYear());
});
// Initialize AOS (Animate On Scroll) library
function aosInit() {
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
    });
}
$(window).on('load', aosInit);

$(document).ready(function () {
    const pcVideo = $("#preloader-video-pc");
    const mobileVideo = $("#preloader-video-mobile");

    // Function to set video visibility based on screen size
    const setVideoVisibility = () => {
        if (window.innerWidth <= 768) {
            mobileVideo.removeClass("d-none");
            pcVideo.addClass("d-none");
        } else {
            pcVideo.removeClass("d-none");
            mobileVideo.addClass("d-none");
        }
    };

    // Hide the preloader
    const hidePreloader = () => {
        $("#preloader").fadeOut(500, function () {
            $(this).remove(); // Remove preloader from DOM
        });
    };

    // Set video visibility on page load
    setVideoVisibility();

    // Automatically hide preloader after 3 seconds
    setTimeout(hidePreloader, 3000);

    // Update video visibility on window resize
    $(window).on("resize", setVideoVisibility);
});

// Function to open the modal and play the video
function playVideo(event) {
    event.preventDefault(); // Prevent default link behavior
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    
    modal.setAttribute("aria-hidden", "false");
    video.play();
}

// Function to close the modal and stop the video
function closeModal() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    
    modal.setAttribute("aria-hidden", "true");
    video.pause();
    video.currentTime = 0; // Reset video playback
}

// Close modal when clicking outside the content
window.addEventListener("click", (event) => {
    const modal = document.getElementById("videoModal");
    if (event.target === modal) {
        closeModal();
    }
});

const glightbox = GLightbox({
    selector: '.glightbox'
  });


// Go to Top Button functionality
const goTopBtn = $('#goTopBtn');

$(window).on('scroll', function() {
    if ($(this).scrollTop() > 20) {
        goTopBtn.show();
    } else {
        goTopBtn.hide();
    }
});

goTopBtn.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'smooth');
});

const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  $(document).ready(function () {
    const toggleButton = $('#darkModeToggle');
    const body = $('body');
    const $lightImage = $("#mockup-image-light");
    const $darkImage = $("#mockup-image-dark");

    // Function to update the image visibility
    const updateImageVisibility = () => {
        if (body.hasClass('dark-mode')) {
            $lightImage.addClass('d-none');
            $darkImage.removeClass('d-none');
        } else {
            $darkImage.addClass('d-none');
            $lightImage.removeClass('d-none');
        }
    };

    // Check the saved preference and apply it
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.addClass('dark-mode');
        toggleButton.text('Light Mode');
    }
    updateImageVisibility(); // Ensure images are updated on page load

    // Toggle button click event
    toggleButton.on('click', function () {
        if (body.toggleClass('dark-mode').hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.text('Light Mode');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.text('Dark Mode');
        }
        updateImageVisibility(); // Update images on mode change
    });
});


