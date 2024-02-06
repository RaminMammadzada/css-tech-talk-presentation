// homepage.js
document.addEventListener("DOMContentLoaded", function () {
    const presentationHeader = document.getElementById("presentation-header");
    const linksContainer = document.getElementById("links-container");
    const slideContainer = document.getElementById("slide-container");
    slideContainer.style.display = "none";

    const slidesData = [];
    fetch('slides.json')
    .then(response => response.json())
    .then(data => {
        slidesData.push(...data);
        return slidesData;
    })
    .then(slides => {
        // Dynamically populate links
        slides.forEach((slide, index) => {
            const link = document.createElement("a");
            link.href = "#";
            link.classList.add("slide-link");
            link.textContent = slide.title;

            link.addEventListener("click", function () {
                currentSlideIndex = index;
                displaySlide(index);
                linksContainer.style.display = "none";
                presentationHeader.style.display = "none";
                toggleViewHomepageButton();
                slideContainer.style.display = "flex";
            });

            linksContainer.appendChild(link);
        });
    });

    toggleViewHomepageButton();

    function toggleViewHomepageButton() {
        const homepageButton = document.getElementById("homepage-button");
        const redirectionButtons = document.getElementById("redirection-buttons");
        // if homepagebutton style is not set to none, set it to none
        if (homepageButton.style.display !== "none") {
            homepageButton.style.display = "none";
            redirectionButtons.style.display = "none";
        } else {
            homepageButton.style.display = "block";
            redirectionButtons.style.display = "block";
        }
    }

    const styleElement = document.createElement('style');

    // Function to display slide content
    async function displaySlide(index) {
        const slide = slidesData[index];
        
        // Fetch the content of slide_template.html
        const response = await fetch('slide_template.html');
        const templateContent = await response.text();

        // Update the slide container with HTML content
        slideContainer.innerHTML = templateContent
            .replace('{{html-title}}', slide.title)
            .replace('{{html}}', slide.html)
            .replace('{{inhalt}}', slide.inhalt)
            .replace('{{css}}', slide.css)
            .replace('{{script}}', slide.script);

        const scriptElementForPrism = document.createElement('script');
        scriptElementForPrism.type = 'text/prism-html-markup';
        scriptElementForPrism.textContent = slide.html
        const htmlCodeTag = document.getElementById("html-code");
        htmlCodeTag.appendChild(scriptElementForPrism);

        var script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js";
        document.head.appendChild(script);

        styleElement.textContent = `
            .html-result > div {
                padding: 5px 20px;
                background-color: #F4F2F0;
            ${slide.css}
          }
        `;
        document.head.appendChild(styleElement);
        
    }

    // Additional code for slide navigation
    let currentSlideIndex = 0;

    function changeSlide(offset) {
        const newSlideIndex = currentSlideIndex + offset;

        // Ensure the new index is within the bounds of the slides array
        if (newSlideIndex >= 0 && newSlideIndex < slidesData.length) {
            removeStyling();
            currentSlideIndex = newSlideIndex;
            displaySlide(currentSlideIndex).then(() => {
                addEventListenerToToogleCoverButton();
            });

            // Enable or disable buttons based on the current slide index
            updateButtonState();
        }
    }

    function removeStyling() {
        const headElement = document.head;
        if (headElement.contains(styleElement)) {
            headElement.removeChild(styleElement);
        }
    }

    function updateButtonState() {
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        // Disable "Previous" button on the first slide
        prevBtn.disabled = currentSlideIndex === 0;

        // Disable "Next" button on the last slide
        nextBtn.disabled = currentSlideIndex === slidesData.length - 1;
    }

    // Attach event listeners for previous and next buttons
    document.getElementById("prevBtn").addEventListener("click", function () {
        changeSlide(-1);
    });

    document.getElementById("nextBtn").addEventListener("click", function () {
        changeSlide(1);
    });

    document.onkeydown = (e) => {
        e = e || window.event;
        if (e.keyCode === 37) {
            changeSlide(-1);
        } else if (e.keyCode === 39) {
          changeSlide(1);
        }
      }
    
    // Initial button state setup
    updateButtonState();

    const toggleButton = document.getElementById('cover-toggle-button');
    const codeElement = document.getElementById('code');
    
    // function addEventListenerToToogleCoverButton() {
    //     toggleButton.addEventListener('click', function () {
    //         codeElement.classList.toggle('covered');
    //         // displaySlide(currentSlideIndex);
    //     });
    // }
});
