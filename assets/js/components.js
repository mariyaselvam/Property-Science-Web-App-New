// Function to load a single component and return a promise
function loadComponent(selector, file) {
  return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (!element) {
          // Skip loading if the element doesn't exist
          resolve();
          return;
      }

      fetch(file)
          .then((response) => response.text())
          .then((data) => {
              element.innerHTML = data;
              resolve(); // Resolve the promise after loading
          })
          .catch((error) => {
              console.error(`Error loading ${file}:`, error);
              reject(error);
          });
  });
}

// Load components in sequence
document.addEventListener("DOMContentLoaded", async () => {
  try {
      // Step 1: Load `#header` first (contains CSS files)
      await loadComponent("#header", "assets/components/header.html");
      console.log("✅ #header loaded.");

      // Step 2: Load the rest of the components in parallel after `#header` has loaded
      const components = [
          ["#nav", "assets/components/nav.html"],
          ["#home-banner-sec", "assets/components/Home/Banner.html"],
          ["#HomeGridSec", "assets/components/Home/HomeGridSec.html"],
          ["#HouseHuntSec", "assets/components/Home/HouseHunt.html"],
          ["#DesktopValuationSec", "assets/components/Home/DesktopValuationSec.html"],
          ["#InvestibleScoreReportSec", "assets/components/Home/InvestibleScoreReportSec.html"],
          ["#SpeakToAnExpert", "assets/components/Home/SpeakToAnExpert.html"],
          ["#UniquescalesofEvaluation", "assets/components/Home/Unique-scales-Evaluation.html"],
          ["#WhychooseUs", "assets/components/Home/Why-choose-us-sec.html"],
          ["#IndiaOldestLargestRepository", "assets/components/Home/India-Oldest-largest-repository.html"],
          ["#HomeTabSystem", "assets/components/Home/Home-Tab-system.html"],
          ["#Whatourclientsays", "assets/components/Home/What-our-client-says-sec.html"],
          ["#HomeUseCasesSec", "assets/components/Home/home-Use-Cases-sec.html"],
          ["#HomeGetTouchwithUs", "assets/components/Home/HomeGetTouchwithUs.html"],
          ["#footer", "assets/components/footer.html"],
          ["#OnboardingbreadcrumbSec", "assets/components/Landing-page-Onboarding/breadcrumb.html"],
          ["#InvestibleScoreSec", "assets/components/Landing-page-Onboarding/InvestibleScoreCardSec.html"],
          ["#FuturePriceProjectionFPP", "assets/components/Landing-page-Onboarding/FuturePriceProjectionFPP.html"],
          ["#ExecutionRiskSec", "assets/components/Landing-page-Onboarding/ExecutionRiskSec.html"],
      ];

      // Load all other components in parallel after `#header` is done
      await Promise.all(components.map(([selector, file]) => loadComponent(selector, file)));

      console.log("✅ All components loaded successfully.");
  } catch (error) {
      console.error("❌ Error loading components:", error);
  }
});
