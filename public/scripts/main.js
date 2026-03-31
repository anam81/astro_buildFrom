document.body.classList.add("is-loaded");

// Thumbnail Click + Fade
document.addEventListener("click", (e) => {
    const link = e.target.closest("a.thumb");
    if (!link) return;

    e.preventDefault();
    sessionStorage.setItem("fromGrid", "true");

    const img = link.querySelector("img");
    if (img) {
        img.style.transition = "opacity 0.3s ease";
        img.style.opacity = "0.2";
    }

    window.location.href = link.href;
});

// Scroll speichern
window.addEventListener("pagehide", () => {
    sessionStorage.setItem("scrollY", window.scrollY);
});

// Scroll-Logik + Load
const wrapper = document.querySelector(".video-wrapper");
const fromGrid = sessionStorage.getItem("fromGrid");
const savedScrollY = sessionStorage.getItem("scrollY");

if (savedScrollY !== null && fromGrid) {
    window.scrollTo(0, parseInt(savedScrollY, 10));
}

if (wrapper && fromGrid) {
    const rect = wrapper.getBoundingClientRect();

    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        window.scrollTo({
            top: rect.top + window.pageYOffset - 20,
            behavior: "smooth",
        });
    }
}

// Ratio
if (wrapper) {
    const ratio = wrapper.dataset.ratio;

    wrapper.classList.remove(
        "video-16-10",
        "video-4-3",
        "video-1-1",
        "video-235-100",
    );

    if (ratio && ratio !== "16/9") {
        wrapper.classList.add("video-" + ratio.replace("/", "-"));
    }
}

window.addEventListener("load", () => {
    sessionStorage.removeItem("fromGrid");
});