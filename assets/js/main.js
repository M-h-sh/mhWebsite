document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    var options = {
        strings: ["The Software Engineer", "IT Multimedia Graduate", "Microsoft 365 Certified", " and the Innovative Problem Solver"],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    };
    var typed = new Typed("#typed", options);

    // Initialize Chart.js
    const ctx = $('#skillsChart');
    const skillsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Software Development', 'Website Design', 'Graphic Design', 'Game Development', 'Mobile App Development', 'Video Editing'],
            datasets: [{
                data: [25, 20, 15, 10, 15, 15],
                backgroundColor: [
                    '#1464c0',
                    '#920b0d',
                    '#c00407',
                    '#333333',
                    '#d8d6d6',
                    '#8abdf7'
                ],
                borderColor: [
                    '#1464c0',
                    '#920b0d',
                    '#c00407',
                    '#333333',
                    '#d8d6d6',
                    '#8abdf7'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Update year dynamically
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Go to Top Button functionality
let goTopBtn = document.getElementById("goTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goTopBtn.style.display = "block";
    } else {
        goTopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

var cards_per_page;
var current_page = 1;
var total_cards = $('.certificate-card').length;
var total_pages;

function updatecards_per_page() {
    if ($(window).width() < 992) {
        cards_per_page = 1;
    } else {
        cards_per_page = 4;
    }
}

function updatePagination() {
    var start_index = (current_page - 1) * cards_per_page;
    var end_index = start_index + cards_per_page;
    updatecards_per_page();
    total_pages = Math.ceil(total_cards / cards_per_page);
    $('.certificate-card').hide();
    $('.certificate-card').slice(start_index, end_index).removeClass('d-none').show();
    $('#prev-btn').toggleClass('d-none', current_page === 1);
    $('#next-btn').toggleClass('d-none', current_page === total_pages);
}

updatecards_per_page();
updatePagination();

$('#prev-btn').on('click', function(event) {
    event.preventDefault();
    if (current_page > 1) {
        current_page--;
        updatePagination();
    }
});

$('#next-btn').on('click', function(event) {
    event.preventDefault();
    if (current_page < total_pages) {
        current_page++;
        updatePagination();
    }
});

// Handle resize event
$(window).on('resize', function() {
    updatecards_per_page();
    updatePagination();
});

// Clean up on page unload
$(window).on('beforeunload', function() {
    $(window).off('resize');
});

$(document).ready(function() {
    const toggleButton = $('#darkModeToggle');
    const body = $('body');

    // Check the saved preference and apply it
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.addClass('dark-mode');
        toggleButton.text('Light Mode');
    }

    toggleButton.on('click', function() {
        if (body.toggleClass('dark-mode').hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.text('Light Mode');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.text('Dark Mode');
        }
    });
});