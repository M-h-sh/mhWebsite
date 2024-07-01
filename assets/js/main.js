$(document).ready(function() {
    // Initialize Typed.js
    var options = {
        strings: ["The Software Engineer", "IT Multimedia Graduate", "Microsoft 365 Certified", " and the Innovative Problem Solver"],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    };
    var typed = new Typed("#typed", options);

    // Initialize Chart.js
    const skillsChart = new Chart($('#skillsChart'), {
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
    $('#year').text(new Date().getFullYear());

    // Go to Top Button functionality
    let goTopBtn = $('#goTopBtn');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            goTopBtn.show();
        } else {
            goTopBtn.hide();
        }
    });

    goTopBtn.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });

    // Pagination for certificate cards
    var cardsPerPage;
    var currentPage = 1;
    var totalCards = $('.certificate-card').length;
    var totalPages;

    function updatePagination() {
        var start = (currentPage - 1) * cardsPerPage;
        var end = start + cardsPerPage;
        $('.certificate-card').hide().slice(start, end).removeClass('d-none').show();
        $('#prev-btn').toggleClass('d-none', currentPage === 1);
        $('#next-btn').toggleClass('d-none', currentPage === totalPages);
    }

    function updateCardsPerPage() {
        cardsPerPage = $(window).width() < 992 ? 1 : 4;
    }

    updateCardsPerPage();
    totalPages = Math.ceil(totalCards / cardsPerPage);
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

    // Handle resize event
    $(window).on('resize', function() {
        updateCardsPerPage();
        totalPages = Math.ceil(totalCards / cardsPerPage);
        currentPage = 1;
        updatePagination();
    });

    // Clean up on page unload
    $(window).on('beforeunload', function() {
        $(window).off('resize');
    });
});
