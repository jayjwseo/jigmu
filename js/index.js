// A quick re-direct to board page
document.querySelector(".cta-button").onclick = function () {
  location.href = "board-page.html";
};

// CTA bar is top sticky detector
const ctaBar = document.querySelector(".ctaBar");

const observer = new IntersectionObserver(
  //As long as the target element is not in full view, add .isSticky
  ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
  //As soon as even 1px is not visible, run callback
  { threshold: [1] }
);

observer.observe(ctaBar);
