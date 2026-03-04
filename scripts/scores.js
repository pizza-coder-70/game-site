/**
 * Pizza Edition — Centralized Score Saver
 * Usage: PizzaScores.save('Game Name', score, extraInfo?)
 * Saves highscores to localStorage under key 'pizzaScores'
 */
const PizzaScores = (() => {
    const KEY = 'pizzaEditionScores';

    function load() {
        try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
        catch { return {}; }
    }

    function save(gameName, score, extra = '') {
        const all = load();
        const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (!all[gameName]) all[gameName] = { best: 0, history: [] };
        const entry = { score, extra, date: now, ts: Date.now() };
        all[gameName].history.unshift(entry);
        // Keep last 10 runs per game
        if (all[gameName].history.length > 10) all[gameName].history = all[gameName].history.slice(0, 10);
        if (score > all[gameName].best) {
            all[gameName].best = score;
            entry.isNew = true;
        }
        localStorage.setItem(KEY, JSON.stringify(all));
        // Flash a toast notification
        showToast(gameName, score, entry.isNew);
        return entry.isNew;
    }

    function getAll() { return load(); }

    function showToast(gameName, score, isNew) {
        // Remove existing toast
        const old = document.getElementById('pizzaToast');
        if (old) old.remove();

        const toast = document.createElement('div');
        toast.id = 'pizzaToast';
        toast.style.cssText = `
            position:fixed;bottom:24px;right:24px;z-index:99999;
            background:${isNew ? 'linear-gradient(135deg,#7c3aed,#06b6d4)' : 'rgba(13,13,32,0.95)'};
            border:1px solid ${isNew ? '#a78bfa' : '#1e1e3f'};
            color:#fff;padding:14px 20px;border-radius:14px;
            font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:600;
            box-shadow:0 8px 32px rgba(0,0,0,0.5);
            animation:pizzaSlideIn .3s ease;min-width:220px;
            display:flex;flex-direction:column;gap:2px;
        `;
        toast.innerHTML = `
            <span style="font-size:.75rem;opacity:.8;">${isNew ? '🏆 NEW BEST!' : '💾 Score Saved'}</span>
            <span>${gameName} — <b>${score.toLocaleString()}</b></span>
        `;
        // Inject keyframes if not present
        if (!document.getElementById('pizzaToastCSS')) {
            const style = document.createElement('style');
            style.id = 'pizzaToastCSS';
            style.textContent = `
                @keyframes pizzaSlideIn { from{transform:translateX(120%);opacity:0} to{transform:translateX(0);opacity:1} }
                @keyframes pizzaSlideOut { from{transform:translateX(0);opacity:1} to{transform:translateX(120%);opacity:0} }
            `;
            document.head.appendChild(style);
        }
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'pizzaSlideOut .3s ease forwards';
            setTimeout(() => toast.remove(), 320);
        }, 3000);
    }

    return { save, getAll };
})();
