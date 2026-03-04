function switchTab(btn, id) {
    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Show correct content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    // Move slider
    const slider = document.querySelector('.tab-slider');
    slider.style.width = btn.offsetWidth + 'px';
    slider.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
}

// Init slider position on load
window.addEventListener('DOMContentLoaded', () => {
    const active = document.querySelector('.tab.active');
    const slider = document.querySelector('.tab-slider');
    slider.style.width = active.offsetWidth + 'px';
    slider.style.transform = `translateX(${active.offsetLeft - 4}px)`;
});