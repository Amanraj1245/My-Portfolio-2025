$(document).ready(function() {

  // 🌟 Sticky header on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    updateActiveSection();
  });

  // 🌟 Smooth scroll navigation
  $(".header ul li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // 🌟 Scroll reveal animations
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // 🌟 Old Google Sheet Contact Form
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const oldForm = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  if (oldForm) {
    oldForm.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(oldForm) })
        .then(response => {
          msg.innerHTML = "✅ Message sent successfully!";
          setTimeout(() => { msg.innerHTML = ""; }, 5000);
          oldForm.reset();
        })
        .catch(error => console.error('Error!', error.message));
    });
  }

  // 🌟 Premium Formspree Contact Form
  const premiumForm = document.getElementById('contact-form');
  const statusEl = document.getElementById('status');

  if (premiumForm) {
    premiumForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      statusEl.textContent = "⏳ Sending your message...";
      const data = new FormData(premiumForm);

      try {
        const response = await fetch(premiumForm.action, {
          method: premiumForm.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusEl.textContent = "✅ Message sent successfully!";
          premiumForm.reset();
        } else {
          statusEl.textContent = "❌ Oops! Something went wrong. Try again.";
        }

      } catch (error) {
        console.error('Error!', error);
        statusEl.textContent = "❌ Network error. Try again.";
      }

      // Smooth fade-out after 5s
      setTimeout(() => { statusEl.textContent = ""; }, 5000);
    });
  }

}); // end document ready

// 🌟 Active Section Updater
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5,
}));

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 215, 0, 0.6)";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();
