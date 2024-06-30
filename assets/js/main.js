document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    var options = {
        strings: ["2+ Years Experienced Software Developer", "IT Multimedia Graduate", "Microsoft 365 Certified"],
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
                data: [20, 20, 15, 15, 15, 15],
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