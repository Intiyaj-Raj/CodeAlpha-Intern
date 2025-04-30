document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementsByClassName("prev")[0];
    const nextBtn = document.getElementsByClassName("next")[0];
    const galleryItems = document.querySelectorAll(".gallery-item");

    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        modal.style.display = "block";
        modalImg.src = galleryItems[currentIndex].src;
        captionText.textContent = galleryItems[currentIndex].alt;
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        modalImg.src = galleryItems[currentIndex].src;
        captionText.textContent = galleryItems[currentIndex].alt;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImg.src = galleryItems[currentIndex].src;
        captionText.textContent = galleryItems[currentIndex].alt;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => openModal(index));
    });

    closeBtn.addEventListener("click", closeModal);

    nextBtn.addEventListener("click", showNext);

    prevBtn.addEventListener("click", showPrev);

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (event) {
        if (modal.style.display === "block") {
            if (event.key === "ArrowRight") {
                showNext();
            } else if (event.key === "ArrowLeft") {
                showPrev();
            } else if (event.key === "Escape") {
                closeModal();
            }
        }
    });
});
