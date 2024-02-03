// homepage.js
document.addEventListener("DOMContentLoaded", function () {
    const linksContainer = document.getElementById("links-container");
    const slideContainer = document.getElementById("slide-container");

    fetch('slides.json')
    .then(response => response.json())
    .then(slides => {
        // Dynamically populate links
        slides.forEach((slide, index) => {
            const link = document.createElement("a");
            link.href = "#";
            link.classList.add("slide-link");
            link.textContent = slide.title;

            link.addEventListener("click", function () {
                displaySlide(index);
                linksContainer.style.display = "none";
                toggleViewHomepageButton();
            });

            linksContainer.appendChild(link);
        });
    });

    // Sample data for slides
    const slidesData = [
        { title: "Slide 1",
        html: `
                <div class="container">
                <h2>Welcome to Slide 2</h2>
                <p>This is a modern HTML structure with multiple lines for Slide 2. 
                It's now extended to make it approximately three times longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                    <li>Item 6</li>
                    <li>Item 7</li>
                    <li>Item 8</li>
                    <li>Item 9</li>
                    <li>Item 10</li>
                </ul>
                <div class="nested-container">
                    <p>Another nested section in Slide 2.</p>
                    <img src="image.jpg" alt="Image">
                    <span>This section is also extended to make the HTML content longer.</span>
                    <p>Adding more content to meet the requirement for three times longer HTML.</p>
                </div>
            </div>
        `,
        css: `
            ul li {
                color: red;
            }
        `,
        js: ""
    },
        { title: "Slide 2",
        html: `
        <div>
            <h1>hello</h1>
            <h2>Welcome to Slide 2</h2>
        </div>`,
        css: "body { background-color: #aaaa; }",
        js: "" },
    ];

    toggleViewHomepageButton();

    function toggleViewHomepageButton() {
        const homepageButton = document.getElementById("homepage");
        // if homepagebutton style is not set to none, set it to none
        if (homepageButton.style.display !== "none") {
            homepageButton.style.display = "none";
        } else {
            homepageButton.style.display = "block";
        }
    }

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
            .replace('{{css}}', slide.css);

        const scriptElementForPrism = document.createElement('script');
        scriptElementForPrism.type = 'text/prism-html-markup';
        scriptElementForPrism.textContent = slide.html
        const htmlCodeTag = document.getElementById("html-code");
        htmlCodeTag.appendChild(scriptElementForPrism);

        var script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js";
        document.head.appendChild(script);

        const styleElement = document.createElement('style');
        styleElement.textContent = slide.css;
        document.head.appendChild(styleElement);
    }
});
