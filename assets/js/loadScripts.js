function loadScripts(scripts, callback) {
    let loadedScripts = 0;

    scripts.forEach((script) => {
        let scriptTag = document.createElement("script");
        scriptTag.src = script;
        scriptTag.defer = true;

        scriptTag.onload = () => {
            loadedScripts++;
            if (loadedScripts === scripts.length) {
                if (typeof callback === "function") {
                    callback(); // Run callback after all scripts load
                }
            }
        };

        document.body.appendChild(scriptTag);
    });
}

// List of JS files to load
const scriptsToLoad = [
    "assets/js/script.js",
    "assets/js/bootstrap.js",
    "assets/js/components.js", // Ensure components are loaded first
    "assets/js/swiper.js"
];

// Load scripts and then initialize Swiper
document.addEventListener("DOMContentLoaded", () => {
    loadScripts(scriptsToLoad, () => {
        console.log("All scripts loaded, now initializing Swiper...");
        initSwipers();
    });
});

// Wait for elements before initializing Swiper
function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutations, obs) => {
        if (document.querySelector(selector)) {
            obs.disconnect();
            callback();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// Ensure Swiper initializes after elements exist
function initSwipers() {
    console.log("Initializing Swiper...");

    if (typeof Swiper === "undefined") {
        console.error("Swiper not loaded!");
        return;
    }

    // Initialize Swiper 1
    waitForElement("#swiper1", () => {
        new Swiper("#swiper1", {
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        });
        console.log("Swiper1 initialized.");
    });

    // Initialize Swiper 2
    waitForElement("#swiper2", () => {
        new Swiper("#swiper2", {
            slidesPerView: 4,
            breakpoints: {
                280: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1224: { slidesPerView: 3 },
            },
            spaceBetween: 30,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        });
        console.log("Swiper2 initialized.");
    });
}
