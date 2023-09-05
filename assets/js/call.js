// Function to load a JavaScript file
function loadScript(src, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

// Load jQuery
loadScript('https://code.jquery.com/jquery-3.5.1.slim.min.js', function () {
  // Load Popper.js
  loadScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.4/dist/umd/popper.min.js', function () {
    // Load Bootstrap
    loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js', function () {
      // Load other scripts
      loadScript('assets/vendor/purecounter/purecounter_vanilla.js', function () {
        loadScript('assets/vendor/bootstrap/js/bootstrap.bundle.min.js', function () {
          loadScript('assets/vendor/glightbox/js/glightbox.min.js', function () {
            loadScript('assets/vendor/swiper/swiper-bundle.min.js', function () {
              loadScript('assets/vendor/typed.js/typed.min.js', function () {
                loadScript('assets/vendor/php-email-form/validate.js', function () {
                  // Load template-specific scripts
                  loadScript('assets/js/main.js', function () {
                    loadScript('assets/js/darkmode.js', function () {
                      loadScript('assets/js/readmore.js', function () {
                        // All scripts have been loaded
                        console.log('All scripts have been loaded.');
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
