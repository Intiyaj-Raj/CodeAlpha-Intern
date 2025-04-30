// variable for testimonials
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

// header typing
let typingEffect = new Typed("#text", {
    strings: ["Intiyaj", "Student", "Coder"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000
})

// About Me skills, education ...
var tablinks = document.getElementsByClassName("tabLinks");
var tabcontents = document.getElementsByClassName("tabContents");

function opentab(tabname) {
    for (tablink of tablinks) {
        // its remove active classname
        tablink.classList.remove("activeLink");

    }
    for (tabcontent of tabcontents) {
        // its remove active classname
        tabcontent.classList.remove("active-tab");
    }

    // show active color
    event.currentTarget.classList.add("activeLink");
    // show content in skills education.....
    document.getElementById(tabname).classList.add("active-tab");
}

// for menu bar
var sidebar = document.getElementById("sidemenu");

function openmenu() {
    sidebar.style.right = "0";
}
function closemenu() {
    sidebar.style.right = "-150px";
}

let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Keep Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 2000);


// add data to google sheet 
const scriptURL = 'https://script.google.com/macros/s/AKfycbwuZUK7kHp8OVOQfKflO-4KR7qJvruvlP7_P58QWjmShkxIYLozBRZXdn_RY7k9_YMSsw/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            // use for form reset after 1s
            setTimeout(function () {
                msg.innerHTML = ""
            }, 1000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})

