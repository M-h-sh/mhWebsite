function loadCSS(url, callback) {
  var link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";

  link.onload = function () {
    // The CSS file has finished loading, so we can call the callback function
    if (typeof callback === "function") {
      callback();
    }
  };

  document.head.appendChild(link);
}

// Load the CSS files with callbacks
loadCSS("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css", function () {
  // This function will be called after the first CSS file has loaded
  loadCSS("assets/vendor/bootstrap-icons/bootstrap-icons.css", function () {
    // This function will be called after the second CSS file has loaded
    loadCSS("assets/vendor/glightbox/css/glightbox.min.css", function () {
      // Continue loading other CSS files here...
      loadCSS("assets/vendor/swiper/swiper-bundle.min.css", function () {
        loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css", function () {
          loadCSS("assets/vendor/bootstrap/css/bootstrap.min.css", function () {
            loadCSS("assets/css/style.css", function () {
              // All CSS files have finished loading
              // You can now call the function or perform actions
              // that depend on the CSS being loaded.
            });
          });
        });
      });
    });
  });
});
