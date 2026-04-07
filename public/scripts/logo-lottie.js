window.addEventListener("load", function () {
    const logoOverlay = document.getElementById("logo-overlay");
    if (!logoOverlay) return;

    const fromGrid = sessionStorage.getItem("fromGrid");
    const logoAnim = lottie.loadAnimation({
        container: logoOverlay,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/assets/logo.json",
    });

    logoAnim.addEventListener("data_ready", () => {
        if (fromGrid === "true") {
            sessionStorage.removeItem("fromGrid");
            const end = logoAnim.totalFrames;
            const start = end - 85;

            for (let i = start - 3; i < start; i++) {
                setTimeout(() => {
                    logoAnim.goToAndStop(i, true);
                }, 0);
            }

            setTimeout(() => {
                logoAnim.playSegments([start, end], true);
            }, 100);
        } else {
            setTimeout(() => {
                logoAnim.goToAndPlay(0, true);
            }, 400);
        }
    });
});