document.addEventListener('DOMContentLoaded', function() {
  // Initialize Typed.js
  new Typed("#typed", {
      strings: ["Founder & Creative Director at MH Web & Graphic Design Services", "The Software Engineer", "IT Multimedia Graduate", "Microsoft 365 Certified", " UX/UI Designer"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
  });

  $(window).on('load', function() {
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

$(document).ready(function() {
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
      $("#preloader").fadeOut(500, function() {
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
  $('html, body').animate({
      scrollTop: 0
  }, 'smooth');
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

$(document).ready(function() {
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
  toggleButton.on('click', function() {
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
  // Initialize EmailJS
  emailjs.init("22HaJEji68SqzNdt9");

  // Cookie clearing function
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
        }
        d.shift();
      }
    }
  }

  // Clear form if returned after submission
  if (localStorage.getItem('formSubmitted') === 'true') {
    $('#serviceRequestForm')[0].reset();
    $('#other-service').hide();
    localStorage.removeItem('formSubmitted');
    clearAllCookies();
  }

  // Toggle Other Service field
  $('#other').on('change', function() {
    if ($(this).is(':checked')) {
      $('#other-service').show();
      $('#other-service-details').attr('required', 'required');
    } else {
      $('#other-service').hide();
      $('#other-service-details').removeAttr('required');
    }
  });

  // Initialize social icons
  function initSocialIcons() {
    const $socialIcons = $('<div>').addClass('d-flex gap-4 mt-3');
    
    const socialMedia = [
      {
        url: 'https://youtube.com/@mhhlatshwayo?si=ZLe-hpXrE_9TYvPL',
        icon: 'bi-youtube',
        label: 'YouTube'
      },
      {
        url: 'https://www.instagram.com/mh_hlatshwayo/',
        icon: 'bi-instagram',
        label: 'Instagram'
      },
      {
        url: 'https://web.facebook.com/mthokozisi.hector.5/',
        icon: 'bi-facebook',
        label: 'Facebook'
      },
      {
        url: 'https://x.com/Mthovistor',
        icon: 'bi-twitter-x',
        label: 'Twitter'
      },
      {
        url: 'https://www.linkedin.com/in/mh-hlatshwayo/',
        icon: 'bi-linkedin',
        label: 'LinkedIn'
      }
    ];

    socialMedia.forEach(social => {
      const $link = $('<a>')
        .attr({
          href: social.url,
          target: '_blank',
          'aria-label': social.label
        })
        .addClass('text-decoration-none social-icon');
      
      const $icon = $('<i>')
        .addClass(`bi ${social.icon}`)
        .css({
          'font-size': '24px',
          'background': 'linear-gradient(90deg, rgb(255, 25, 0), rgb(253, 72, 72), red)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'display': 'inline-block'
        });
      
      $link.append($icon);
      $socialIcons.append($link);
    });

    $('#social-icons-container').append($socialIcons);
  }

  // Form submission handler
  $('#serviceRequestForm').on('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Reset error states
    $('.text-danger').hide();
    $('.is-invalid').removeClass('is-invalid');

    // Get form values
    const name = $('#client-name').val().trim();
    const phone = $('#client-phone').val().trim();
    const email = $('#client-email').val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate fields
    if (name === '') {
      $('#name-error').show();
      $('#client-name').addClass('is-invalid');
      isValid = false;
    }

    if (phone === '' || phone.length < 8) {
      $('#phone-error').show();
      $('#client-phone').addClass('is-invalid');
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      $('#email-error').show();
      $('#client-email').addClass('is-invalid');
      isValid = false;
    }

    // Check service selection
    if ($('.service-checkbox:checked').length === 0) {
      $('#service-error').show();
      isValid = false;
    }

    // Validate "Other" service details if selected
    if ($('#other').is(':checked')) {
      const otherDetails = $('#other-service-details').val().trim();
      if (otherDetails === '') {
        $('#other-service-details').addClass('is-invalid');
        isValid = false;
      }
    }

    if (isValid) {
      // Prepare loading state
      const submitBtn = $('#submit-btn');
      submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');
      submitBtn.prop('disabled', true);

      // Collect selected services
      let selectedServices = [];
      $('.service-checkbox:checked').each(function() {
        if ($(this).val().toLowerCase() !== 'other') {
          selectedServices.push($(this).val());
        }
      });

      // Add "Other" service details if provided
      const otherService = $('#other-service-details').val().trim();
      if ($('#other').is(':checked') && otherService) {
        selectedServices.push(otherService);
      }

      // Build message content
      let message = 'Thank you for reaching out to MH Web & Graphic Design Services through our website (mh-web.netlify.app/services). We truly appreciate your interest and look forward to collaborating with you.\n\n';

      selectedServices.forEach(function(service) {
        switch (service.toLowerCase()) {
          case 'logo design':
            message += 'Logo Design (R200 – R800):\n';
            message += 'To get started, please send us your brand name, a brief overview of your business or niche, and any design preferences or inspiration you have in mind to mthova.hp@gmail.com.\n\n';
            break;
          case 'web design':
            message += 'Web Design (R1000 – R3500):\n';
            message += 'To proceed, kindly share your preferred design style, color palette, number of pages, and any reference websites to mthova.hp@gmail.com.\n\n';
            break;
          case 'web development':
            message += 'Web Development (R3500 – R9000):\n';
            message += 'Please let us know the features or functionality you\'d like included by emailing mthova.hp@gmail.com.\n\n';
            break;
          case 'cv revamp':
            message += 'CV Revamp (R50 – R200):\n';
            message += 'Kindly attach your current CV and send it to mthova.hp@gmail.com.\n\n';
            break;
          case 'video editing':
            message += 'Video Editing (R350 – R1200):\n';
            message += 'Please send your raw video footage along with a brief description of your vision to mthova.hp@gmail.com.\n\n';
            break;
          case 'other':
            message += 'Custom Request:\n';
            message += 'Kindly provide specific details regarding the service you require.\n\n';
            break;
          default:
            message += service + ':\n';
            message += 'Our team will follow up shortly with more information.\n\n';
            break;
        }
      });

      message += 'If you have any references, samples, or ideas to share, feel free to include them in your reply.';

      // Format current date and time
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const currentDate = now.toLocaleDateString('en-US', options);

      // Prepare email parameters with HTML template
      const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        requested_services: selectedServices.join(', '),
        user_message: message,
        current_date: currentDate,
        banner_image: 'https://raw.githubusercontent.com/M-h-sh/mhWebsite/refs/heads/main/assets/images/mh-email-banner.webp',
        logo_image: 'https://mh-web.netlify.app/assets/images/MH.png',
        full_name: 'Mthokozisi Hector Hlatshwayo',
        company_name: 'MH Web',
        service_type: 'Graphic Design',
        map_link: 'https://www.google.com/maps?q=Soweto,+Johannesburg,+1862',
        address: 'Soweto, Johannesburg, 1862',
        website_url: 'https://mh-web.netlify.app/services',
        website_display: 'mh-web.netlify.app/services',
        youtube_url: 'https://youtube.com/@mhhlatshwayo?si=ZLe-hpXrE_9TYvPL',
        instagram_url: 'https://www.instagram.com/mh_hlatshwayo/',
        facebook_url: 'https://web.facebook.com/mthokozisi.hector.5/',
        twitter_url: 'https://x.com/Mthovistor',
        linkedin_url: 'https://www.linkedin.com/in/mh-hlatshwayo/',
        footer_message: 'This is an automated message.'
      };

      // Send email with HTML template
      emailjs.send('service_wdtdc0o', 'template_fqlnxw6', templateParams)
        .then(function(response) {
          window.location.href = 'thank-you.html';
        }, function(error) {
          submitBtn.html('Submit');
          submitBtn.prop('disabled', false);
          alert('There was an error submitting your form. Please try again or contact us directly at mthova.hp@gmail.com');
        });
    }
  });

  // Real-time validation
  $('#client-name').on('input', function() {
    $('#name-error').hide();
    $(this).removeClass('is-invalid');
  });

  $('#client-phone').on('input', function() {
    if ($(this).val().trim().length >= 8) {
      $('#phone-error').hide();
      $(this).removeClass('is-invalid');
    }
  });

  $('#client-email').on('input', function() {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($(this).val().trim())) {
      $('#email-error').hide();
      $(this).removeClass('is-invalid');
    }
  });

  $('.service-checkbox').on('change', function() {
    if ($('.service-checkbox:checked').length > 0) {
      $('#service-error').hide();
    }
  });

  // Stats animation
  function animateStats() {
    $('.stat-item h3').each(function() {
      const $this = $(this);
      const target = parseInt($this.data('count'));
      const duration = 2000;
      let start = 0;
      const increment = target / (duration / 16);
      
      let current = start;
      const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        $this.text(Math.floor(current));
      }, 16);
    });
  }

  // Feature card hover effects
  function setupFeatureCards() {
    $('.feature-card').hover(
      function() {
        $(this).find('.feature-icon').css('transform', 'scale(1.2)');
      },
      function() {
        $(this).find('.feature-icon').css('transform', 'scale(1)');
      }
    );
  }

  // Initialize all components
  initSocialIcons();
  animateStats();
  setupFeatureCards();
});
$('#current-year').text(new Date().getFullYear());