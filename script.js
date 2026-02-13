$(document).ready(function() {
    
    // 1. Init Libraries
    AOS.init({
        duration: 1000,
        once: true
    });

    // 2. Custom Cursor Logic
    var cursor = $(".cursor");
    var cursor2 = $(".cursor2");

    $(document).mousemove(function(e) {
        cursor.css({
            left: e.clientX,
            top: e.clientY
        });
        cursor2.css({
            left: e.clientX,
            top: e.clientY
        });
    });

    // Add Hover Effect to Links & Buttons
    $(".hover-link, a, button").hover(function() {
        cursor.addClass("active");
    }, function() {
        cursor.removeClass("active");
    });

    // 3. Scroll Progress Bar
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scroll / (docHeight - winHeight)) * 100;
        $(".scroll-progress").css("width", scrollPercent + "%");

        // Sticky Navbar
        if (scroll > 20) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        // Stats Counter Animation (Moved inside scroll for better performance check)
        checkStatsCounter();
    });

    // 4. Particles
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#06b6d4" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8 } }
        },
        "retina_detect": true
    });

    // 5. Tilt Effect
    $('.project-card, .tilt-card').tilt({
        max: 12,
        speed: 400,
        glare: true,
        maxGlare: 0.1
    });

    // 6. Typing Effect
    new Typed(".typing-text", {
        strings: ["IT Student", "Web Developer", "Tech Enthusiast"],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true
    });

    // 7. Stats Counter Logic
    let counted = false;
    function checkStatsCounter() {
        const statsSection = $('.stats-section');
        if (statsSection.length && $(window).scrollTop() > statsSection.offset().top - 600 && !counted) {
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = $this.attr('data-target');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                },
                {
                    duration: 2500,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum + "+");
                    }
                });
            });
            counted = true;
        }
    }

    // 8. Mobile Menu
    $('.hamburger').click(function() {
        $('.nav-links').slideToggle();
    });

    // 9. Filter Logic
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        const filter = $(this).attr('data-filter');
        const items = $('.project-card');

        if (filter === 'all') {
            items.fadeIn(400);
        } else {
            items.not('[data-category="' + filter + '"]').fadeOut(200);
            items.filter('[data-category="' + filter + '"]').delay(200).fadeIn(400);
        }
    });

    // 10. Smooth Scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 800);
        if($(window).width() < 768) {
             $('.nav-links').slideUp();
        }
    });

    // 11. Chatbot Logic
    const knowledgeBase = {
        "hello": "Hi! I'm Kiet's AI Assistant. How can I help you today?",
        "who are you": "I am an AI designed to help you navigate Phung Tuan Kiet's portfolio.",
        "who is kiet": "Phung Tuan Kiet is a 3rd-year IT student in class DCIT.14.3 at East Asia University of Technology (EAUT).",
        "goal": "His main goal is to learn and become a professional Fullstack Web Developer.",
        "skills": "He is currently learning and building projects using HTML, CSS, JavaScript, Python, and Android Development.",
        "projects": "Even though he is a student, he has built a Gym Management System, NotionCopy App, and researched AI Models. Check the Projects section!",
        "contact": "You can reach him via Facebook or Email (phungtuankiet11@gmail.com) for studying or collaboration.",
        "default": "I'm still learning! Try asking me about 'who is kiet', 'goal', 'skills', or 'projects'."
    };

    $('#chat-toggle-btn, #open-chat-btn, #chat-close-btn').click(function() {
        $('.chat-window').fadeToggle(300).css('display', 'flex');
    });

    function sendMessage() {
        const userText = $('#chat-input').val().trim();
        if (userText === "") return;

        $('#chat-box').append(`<div class="message user-message">${userText}</div>`);
        $('#chat-input').val('');
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);

        setTimeout(() => {
            let botResponse = knowledgeBase["default"];
            const lowerText = userText.toLowerCase();

            for (const key in knowledgeBase) {
                if (lowerText.includes(key)) {
                    botResponse = knowledgeBase[key];
                    break;
                }
            }

            $('#chat-box').append(`<div class="message bot-message">${botResponse}</div>`);
            $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        }, 500);
    }

    $('#chat-send-btn').click(sendMessage);
    $('#chat-input').keypress(function(e) {
        if (e.which == 13) sendMessage();
    });
});