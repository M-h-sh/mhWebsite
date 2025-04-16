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

    $(document).ready(function() {
        function clearAllCookies() {
            const cookies = document.cookie.split("; ");
            for (let c = 0; c < cookies.length; c++) {
                const d = window.location.hostname.split(".");
                while (d.length > 0) {
                    const cookieBase = encodeURIComponent(cookies[c].split("=")[0]) +
                        "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
                        d.join('.') + " ;path=";
                    const paths = location.pathname.split('/');
                    document.cookie = cookieBase + "/";
                    while (paths.length > 0) {
                        document.cookie = cookieBase + paths.join('/');
                        paths.pop();
                    };
                    d.shift();
                }
            }
        }
    
        // Clear form if returned after submission
        if(localStorage.getItem('formSubmitted') === 'true') {
            $('#serviceRequestForm')[0].reset();
            $('#other-service').hide();
            localStorage.removeItem('formSubmitted');
            clearAllCookies();
        }
    
        // Toggle Other Service field
        $('#other').change(function() {
            if($(this).is(':checked')) {
                $('#other-service').show();
                $('#other-service-details').attr('required', 'required');
            } else {
                $('#other-service').hide();
                $('#other-service-details').removeAttr('required');
            }
        });
    
        // Form validation
        $('#serviceRequestForm').submit(function(e) {
            e.preventDefault();
            let isValid = true;
    
            $('.text-danger').hide();
            $('.is-invalid').removeClass('is-invalid');
    
            const name = $('#client-name').val().trim();
            const phone = $('#client-phone').val().trim();
            const email = $('#client-email').val().trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if(name === '') {
                $('#name-error').show(); isValid = false;
            }
    
            if(phone === '' || phone.length < 8) {
                $('#phone-error').show(); isValid = false;
            }
    
            if(!emailRegex.test(email)) {
                $('#email-error').show(); isValid = false;
            }
    
            if($('.service-checkbox:checked').length === 0) {
                $('#service-error').show(); isValid = false;
            }
    
            if($('#other').is(':checked')) {
                const otherDetails = $('#other-service-details').val().trim();
                if(otherDetails === '') {
                    $('#other-service-details').addClass('is-invalid');
                    isValid = false;
                }
            }
    
            if(isValid) {
                localStorage.setItem('formSubmitted', 'true');
                const submitBtn = $('#submit-btn');
                submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');
                submitBtn.prop('disabled', true);
                this.submit();
            }
        });
    
        // Real-time validation
        $('#client-name').on('input', () => $('#name-error').hide());
        $('#client-phone').on('input', () => {
            if($('#client-phone').val().trim().length >= 8) $('#phone-error').hide();
        });
        $('#client-email').on('input', () => {
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#client-email').val().trim())) $('#email-error').hide();
        });
        $('.service-checkbox').change(() => {
            if($('.service-checkbox:checked').length > 0) $('#service-error').hide();
        });
    });

    (function () {
        emailjs.init("La-Uzd96atILQr2lO"); // Replace with your actual PUBLIC KEY
      })();
      
      $(document).ready(function () {
        $('#serviceRequestForm').submit(function (e) {
          e.preventDefault();
      
          const name = $('#client-name').val().trim();
          const email = $('#client-email').val().trim();
          const phone = $('#client-phone').val().trim();
      
          // Collect selected services
          let selectedServices = [];
          $('.service-checkbox:checked').each(function () {
            selectedServices.push($(this).val());
          });
      
          // Filter out "Other"
          selectedServices = selectedServices.filter(service => service.toLowerCase() !== 'other');
      
          // Add custom value if "Other" is checked and has input
          const otherService = $('#other-service-details').val().trim();
          if ($('#other').is(':checked') && otherService) {
            selectedServices.push(otherService);
          }
      
          // Generate a dynamic message
          let message = `Thank you for reaching out to MH Web & Graphic Design Services through our website (mh-web.netlify.app/services).\n\n`;

          selectedServices.forEach(service => {
            switch (service.toLowerCase()) {
              case 'cv revamp':
                message += `For your *CV Revamp* request: Kindly reply to this email with your current CV attached. Our team will review it and proceed with enhancing its quality and presentation.\n\n`;
                break;
              case 'portfolio website':
                message += `For your *Portfolio Website* request: Please share any references, preferred styles, or specific features you'd like included. This will help us tailor a professional online presence for you.\n\n`;
                break;
              case 'logo design':
                message += `For your *Logo Design* request: Feel free to provide any ideas, brand values, or inspirations that could help guide the creative direction of your logo.\n\n`;
                break;
              case 'social media kit':
                message += `For your *Social Media Kit* request: Kindly include your brand name, niche, and any existing social media links to help us create a cohesive and professional kit.\n\n`;
                break;
              default:
                message += `For your *${service}* request: Our team will be in touch shortly to gather further details. Should you have any specific requirements, please feel free to share them.\n\n`;
                break;
            }
          });
          
          message += `We appreciate your interest in our services and look forward to assisting you further.`;
          
      
          if (name && email && phone && selectedServices.length > 0) {
            const templateParams = {
              user_name: name,
              user_email: email,
              user_phone: phone,
              requested_services: selectedServices.join(', '),
              user_message: message
            };
      
            emailjs.send('service_ety9jyl', 'template_70xa4y9', templateParams)
              .then(function (response) {
                alert('Thanks! We will get in touch with you shortly.');
                $('#serviceRequestForm')[0].reset();
                $('#other-service').hide(); // Reset "Other" field
              }, function (error) {
                alert('Oops! Something went wrong. Please try again.');
                console.error(error);
              });
          } else {
            if (selectedServices.length === 0) {
              $('#service-error').show();
            } else {
              $('#service-error').hide();
            }
            if (!name) {
              $('#name-error').show();
            } else {
              $('#name-error').hide();
            }
            if (!email) {
              $('#email-error').show();
            } else {
              $('#email-error').hide();
            }
            if (!phone) {
              $('#phone-error').show();
            } else {
              $('#phone-error').hide();
            }
          }
        });
      
        // Show/hide other service field
        $('#other').change(function () {
          if ($(this).is(':checked')) {
            $('#other-service').slideDown();
          } else {
            $('#other-service').slideUp();
            $('#other-service-details').val('');
          }
        });
      });
      
      
    

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

$('#current-year').text(new Date().getFullYear());

$('#other').on('change', function() {
    if ($(this).is(':checked')) {
      $('#other-service').slideDown();
    } else {
      $('#other-service').slideUp();
    }
  });
  