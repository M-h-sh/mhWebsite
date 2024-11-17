document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    new Typed("#typed", {
        strings: ["The Software Engineer", "IT Multimedia Graduate", "Microsoft 365 Certified", " and UX/UI Designer"],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });

    // Initialize Chart.js
    const ctx = $('#skillsChart');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Software Development', 'Website Design', 'Graphic Design', 'Game Development', 'Mobile App Development', 'Video Editing'],
            datasets: [{
                data: [25, 20, 15, 10, 15, 15],
                backgroundColor: ['#1464c0', '#920b0d', '#c00407', '#333333', '#d8d6d6', '#8abdf7'],
                borderColor: ['#1464c0', '#920b0d', '#c00407', '#333333', '#d8d6d6', '#8abdf7'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white' // Change legend label color here
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                },
            }
        }
    });

    // Update year dynamically
    $('#year').text(new Date().getFullYear());
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

// Pagination for certificate cards
let cardsPerPage;
let currentPage = 1;
const totalCards = $('.certificate-card').length;
let totalPages;

function updateCardsPerPage() {
    cardsPerPage = $(window).width() < 992 ? 1 : 4;
}

function updatePagination() {
    updateCardsPerPage();
    totalPages = Math.ceil(totalCards / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    $('.certificate-card').hide().slice(startIndex, endIndex).show();
    $('#prev-btn').toggleClass('d-none', currentPage === 1);
    $('#next-btn').toggleClass('d-none', currentPage === totalPages);
}

updateCardsPerPage();
updatePagination();

$('#prev-btn').on('click', function(event) {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});

$('#next-btn').on('click', function(event) {
    event.preventDefault();
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
});

$(window).on('resize', function() {
    updateCardsPerPage();
    updatePagination();
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


