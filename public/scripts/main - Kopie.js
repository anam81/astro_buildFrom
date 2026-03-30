// Thumbnail Click + Fade
document.querySelectorAll("a.thumb").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        sessionStorage.setItem("fromGrid", "true");

        const img = link.querySelector("img");
        if (!img) return;

        img.style.transition = "opacity 0.3s ease";
        img.style.opacity = "0.2";

        window.location.href = link.href;
    });
});

// Scroll speichern
window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollY", window.scrollY);
});

// Scroll-Logik + Load
window.addEventListener("load", () => {
    const wrapper = document.querySelector(".video-wrapper");
    const fromGrid = sessionStorage.getItem("fromGrid");
    const savedScrollY = sessionStorage.getItem("scrollY");

    if (!fromGrid) {
        window.scrollTo(0, 0);
    }

    if (savedScrollY !== null && fromGrid) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(savedScrollY, 10));
            });
        });
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (wrapper) {
                const rect = wrapper.getBoundingClientRect();
                const isVisible =
                    rect.top >= 0 && rect.bottom <= window.innerHeight;

                if (!isVisible && fromGrid) {
                    const offset = 20;

                    const top =
                        rect.top + window.pageYOffset - offset;

                    window.scrollTo({
                        top,
                        behavior: "smooth",
                    });
                }
            }

            document.body.classList.add("is-loaded");
            sessionStorage.removeItem("fromGrid");
        });
    });

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
});