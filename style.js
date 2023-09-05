function loadCSS(url) {
    var link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

// Load the CSS files
loadCSS("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
loadCSS("assets/vendor/bootstrap-icons/bootstrap-icons.css");
loadCSS("assets/vendor/glightbox/css/glightbox.min.css");
loadCSS("assets/vendor/swiper/swiper-bundle.min.css");
loadCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
loadCSS("assets/vendor/bootstrap/css/bootstrap.min.css");
loadCSS("assets/css/style.css");
