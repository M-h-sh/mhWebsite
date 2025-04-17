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

            setTimeout(() => {
                location.reload(true); // Force refresh from server (clears cache)
            }, 3000);
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
  
    
      var message = 'Thank you for reaching out to MH Web & Graphic Design Services through our website (mh-web.netlify.app/services). We truly appreciate your interest and look forward to collaborating with you.\n\n';

selectedServices.forEach(function(service) {
  switch (service.toLowerCase()) {
    case 'logo design':
      message += 'Logo Design (R200 – R800):\n';
      message += 'To get started, please send us your brand name, a brief overview of your business or niche, and any design preferences or inspiration you have in mind to mthova.hp@gmail.com. This will help us create a distinctive and impactful logo tailored to your brand identity.\n\n';
      break;

    case 'web design':
      message += 'Web Design (R1000 – R3500):\n';
      message += 'To proceed, kindly share your preferred design style, color palette, number of pages, and any reference websites to mthova.hp@gmail.com. Our team will design a clean, responsive, and visually appealing website that aligns with your brand.\n\n';
      break;

    case 'web development':
      message += 'Web Development (R3500 – R9000):\n';
      message += 'Please let us know the features or functionality you’d like included (e.g., contact forms, e-commerce, blog, CMS) by emailing mthova.hp@gmail.com. We’ll build a fast, fully functional, and scalable website tailored to your needs.\n\n';
      break;

    case 'cv revamp':
      message += 'CV Revamp (R50 – R200):\n';
      message += 'Kindly attach your current CV and send it to mthova.hp@gmail.com. We will redesign and structure it professionally, tailored to your industry and career objectives.\n\n';
      break;

    case 'video editing':
      message += 'Video Editing (R350 – R1200):\n';
      message += 'Please send your raw video footage along with a brief description of your vision to mthova.hp@gmail.com. We’ll enhance your content with smooth transitions, text overlays, background music, and visual effects as needed.\n\n';
      break;

    case 'other':
      message += 'Custom Request:\n';
      message += 'Kindly provide specific details regarding the service you require. We’ll review your request and respond with a custom quote or tailored proposal based on your needs.\n\n';
      break;

    default:
      message += service + ':\n';
      message += 'Our team will follow up shortly with more information or a tailored quote. Feel free to share any additional details that might help us better understand your request.\n\n';
      break;
  }
});

message += 'If you have any references, samples, or ideas to share, feel free to include them in your reply. We’re excited to bring your vision to life with creativity and precision.\n\n';
message += 'Kind regards,\nThe MH Web & Graphic Design Services Team';

      
      // Example usage
      $('#messageContainer').text(message); // Use .text() to render plain text (not HTML)
         
  
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
    $('#serviceRequestForm')[0].reset();
    $('#other-service').hide(); // Hide "Other" field
    location.reload(true); // Force refresh after success
  }, function (error) {
    console.error('Failed to send email:', error);
  });
 } 
      else {
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
  

$('#current-year').text(new Date().getFullYear());

$('#other').on('change', function() {
    if ($(this).is(':checked')) {
      $('#other-service').slideDown();
    } else {
      $('#other-service').slideUp();
    }
  });
  
