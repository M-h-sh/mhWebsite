document.addEventListener("DOMContentLoaded", function () {
    const collapseContent = document.getElementById("collapseContent");
    const readMoreLink = document.querySelector(".read-more-link");

    readMoreLink.addEventListener("click", function (event) {
      event.preventDefault();
      if (collapseContent.classList.contains("show")) {
        // Collapse is open, so we close it
        collapseContent.classList.remove("show");
        readMoreLink.innerHTML = 'Read More <i class="ms-5 fas fa-chevron-down"></i>';
      } else {
        // Collapse is closed, so we open it
        collapseContent.classList.add("show");
        readMoreLink.innerHTML = 'Read Less <i class="ms-5 fas fa-chevron-up"></i>';
      }
    });
  });