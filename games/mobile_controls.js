(function () {
    // Determine if we should show mobile controls
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Allow testing via ?mobile=1 in URL, otherwise require touch/mobile characteristics
    if (!isTouch && !isMobileUA && !location.search.includes('mobile=1')) {
        return;
    }

    // --- PointerLock Polyfill for Mobile ---
    let lockedEl = null;
    Element.prototype.requestPointerLock = function () {
        lockedEl = this;
        document.dispatchEvent(new Event('pointerlockchange'));
    };
    document.exitPointerLock = function () {
        lockedEl = null;
        document.dispatchEvent(new Event('pointerlockchange'));
    };
    try {
        Object.defineProperty(document, 'pointerLockElement', {
            get: function () { return lockedEl; },
            configurable: true
        });
    } catch (e) { }

    // --- Prevent default touch actions (e.g. pinch zoom, scroll) on document ---
    document.addEventListener('touchmove', function (e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
        }
    }, { passive: false });

    // --- Inject Styles ---
    const style = document.createElement('style');
    style.innerHTML = `
        #mobile-controls {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999999;
            touch-action: none;
            user-select: none;
            -webkit-user-select: none;
        }
        .mc-btn {
            position: absolute;
            background: rgba(255, 255, 255, 0.15);
            border: 2px solid rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(255,255,255,0.8);
            font-size: 20px;
            font-family: sans-serif;
            font-weight: bold;
            pointer-events: auto;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        .mc-btn:active { background: rgba(255, 255, 255, 0.4); }
        #mc-dpad {
            bottom: 30px;
            left: 30px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255,255,255,0.2);
            position: absolute;
            pointer-events: auto;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        #mc-stick {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: absolute;
            top: 35px;
            left: 35px;
            pointer-events: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: transform 0.05s ease;
        }
        #mc-a { bottom: 40px; right: 30px; width: 60px; height: 60px; }
        #mc-b { bottom: 120px; right: 60px; width: 60px; height: 60px; }
        #mc-touch-zone {
            position: absolute;
            top: 0; right: 0; width: 60vw; height: 100vh;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);

    // --- Inject DOM ---
    const cont = document.createElement('div');
    cont.id = 'mobile-controls';
    cont.innerHTML = `
        <div id="mc-touch-zone"></div>
        <div id="mc-dpad"><div id="mc-stick"></div></div>
        <div class="mc-btn" id="mc-a" aria-label="A Button">A</div>
        <div class="mc-btn" id="mc-b" aria-label="B Button">B</div>
    `;
    document.body.appendChild(cont);

    // --- Input Simulation ---
    const simulateKey = (code, key, type) => {
        // Map codes to legacy keyCodes for maximum compatibility
        let keyCode = 0;
        switch (code) {
            case 'Space': keyCode = 32; break;
            case 'Enter': keyCode = 13; break;
            case 'ArrowLeft': keyCode = 37; break;
            case 'ArrowUp': keyCode = 38; break;
            case 'ArrowRight': keyCode = 39; break;
            case 'ArrowDown': keyCode = 40; break;
            case 'KeyW': keyCode = 87; break;
            case 'KeyA': keyCode = 65; break;
            case 'KeyS': keyCode = 83; break;
            case 'KeyD': keyCode = 68; break;
            case 'KeyR': keyCode = 82; break;
            case 'ShiftLeft': keyCode = 16; break;
        }

        const ev = new KeyboardEvent(type, {
            code: code,
            key: key,
            bubbles: true,
            cancelable: true
        });

        // Polyfill legacy properties
        Object.defineProperty(ev, 'keyCode', { get: () => keyCode });
        Object.defineProperty(ev, 'which', { get: () => keyCode });

        document.dispatchEvent(ev);
    };

    // --- D-Pad Logic ---
    const dpad = document.getElementById('mc-dpad');
    const stick = document.getElementById('mc-stick');
    let dpadId = null;
    let currentKeys = { up: false, down: false, left: false, right: false };

    const updateStick = (x, y) => {
        const rect = dpad.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let dx = x - centerX;
        let dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = rect.width / 2 - 25;

        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
        }
        stick.style.transform = `translate(${dx}px, ${dy}px)`;

        const threshold = 15;
        const newKeys = {
            up: dy < -threshold,
            down: dy > threshold,
            left: dx < -threshold,
            right: dx > threshold
        };

        ['up', 'down', 'left', 'right'].forEach(dir => {
            if (newKeys[dir] !== currentKeys[dir]) {
                const isDown = newKeys[dir];
                const type = isDown ? 'keydown' : 'keyup';
                let code, key, code2, key2;
                if (dir === 'up') { code = 'ArrowUp'; key = 'ArrowUp'; code2 = 'KeyW'; key2 = 'w'; }
                if (dir === 'down') { code = 'ArrowDown'; key = 'ArrowDown'; code2 = 'KeyS'; key2 = 's'; }
                if (dir === 'left') { code = 'ArrowLeft'; key = 'ArrowLeft'; code2 = 'KeyA'; key2 = 'a'; }
                if (dir === 'right') { code = 'ArrowRight'; key = 'ArrowRight'; code2 = 'KeyD'; key2 = 'd'; }

                simulateKey(code, key, type);
                simulateKey(code2, key2, type);
            }
        });
        currentKeys = newKeys;
    };

    const resetStick = () => {
        dpadId = null;
        stick.style.transform = 'translate(0px, 0px)';
        ['up', 'down', 'left', 'right'].forEach(dir => {
            if (currentKeys[dir]) {
                let code, key, code2, key2;
                if (dir === 'up') { code = 'ArrowUp'; key = 'ArrowUp'; code2 = 'KeyW'; key2 = 'w'; }
                if (dir === 'down') { code = 'ArrowDown'; key = 'ArrowDown'; code2 = 'KeyS'; key2 = 's'; }
                if (dir === 'left') { code = 'ArrowLeft'; key = 'ArrowLeft'; code2 = 'KeyA'; key2 = 'a'; }
                if (dir === 'right') { code = 'ArrowRight'; key = 'ArrowRight'; code2 = 'KeyD'; key2 = 'd'; }
                simulateKey(code, key, 'keyup');
                simulateKey(code2, key2, 'keyup');
            }
        });
        currentKeys = { up: false, down: false, left: false, right: false };
    };

    dpad.addEventListener('touchstart', (e) => {
        e.preventDefault(); e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (dpadId === null) {
                dpadId = e.changedTouches[i].identifier;
                updateStick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                break;
            }
        }
    });
    dpad.addEventListener('touchmove', (e) => {
        e.preventDefault(); e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === dpadId) {
                updateStick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                break;
            }
        }
    });
    const handleDpadEnd = (e) => {
        e.preventDefault(); e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === dpadId) {
                resetStick();
                break;
            }
        }
    };
    dpad.addEventListener('touchend', handleDpadEnd);
    dpad.addEventListener('touchcancel', handleDpadEnd);

    // --- Buttons ---
    const btnA = document.getElementById('mc-a');
    const btnB = document.getElementById('mc-b');

    btnA.addEventListener('touchstart', (e) => {
        e.preventDefault(); e.stopPropagation();
        btnA.style.background = 'rgba(255, 255, 255, 0.4)';
        simulateKey('Space', ' ', 'keydown');
        simulateKey('Enter', 'Enter', 'keydown');

        // Canvas click dispatch for target shooting etc.
        const ev = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window });
        const evC = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        Object.defineProperty(evC, 'isTrusted', { get: () => true }); // try to fake trusted if configurable

        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.dispatchEvent(ev);
            canvas.dispatchEvent(evC);
        }
    });
    btnA.addEventListener('touchend', (e) => {
        e.preventDefault(); e.stopPropagation();
        btnA.style.background = 'rgba(255, 255, 255, 0.15)';
        simulateKey('Space', ' ', 'keyup');
        simulateKey('Enter', 'Enter', 'keyup');

        const ev = new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window });
        const canvas = document.querySelector('canvas');
        if (canvas) canvas.dispatchEvent(ev);
    });
    btnA.addEventListener('touchcancel', (e) => {
        e.preventDefault(); e.stopPropagation();
        btnA.style.background = 'rgba(255, 255, 255, 0.15)';
        simulateKey('Space', ' ', 'keyup');
        simulateKey('Enter', 'Enter', 'keyup');
    });

    btnB.addEventListener('touchstart', (e) => {
        e.preventDefault(); e.stopPropagation();
        btnB.style.background = 'rgba(255, 255, 255, 0.4)';
        simulateKey('KeyR', 'r', 'keydown');
        simulateKey('ShiftLeft', 'Shift', 'keydown');
    });
    btnB.addEventListener('touchend', (e) => {
        e.preventDefault(); e.stopPropagation();
        btnB.style.background = 'rgba(255, 255, 255, 0.15)';
        simulateKey('KeyR', 'r', 'keyup');
        simulateKey('ShiftLeft', 'Shift', 'keyup');
    });
    btnB.addEventListener('touchcancel', (e) => {
        e.preventDefault(); e.stopPropagation();
        btnB.style.background = 'rgba(255, 255, 255, 0.15)';
        simulateKey('KeyR', 'r', 'keyup');
        simulateKey('ShiftLeft', 'Shift', 'keyup');
    });

    // --- Touch Zone for Camera/Mouse ---
    const touchZone = document.getElementById('mc-touch-zone');
    let touchZoneId = null;
    let lastZ = { x: 0, y: 0 };

    touchZone.addEventListener('touchstart', (e) => {
        e.preventDefault(); e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (touchZoneId === null) {
                touchZoneId = e.changedTouches[i].identifier;
                lastZ.x = e.changedTouches[i].clientX;
                lastZ.y = e.changedTouches[i].clientY;

                // Mousedown
                const ev = new MouseEvent('mousedown', { bubbles: true, clientX: lastZ.x, clientY: lastZ.y });
                const canvas = document.querySelector('canvas');
                if (canvas) canvas.dispatchEvent(ev);

                // Mousedown also implies a click for some games
                const evClick = new MouseEvent('click', { bubbles: true, clientX: lastZ.x, clientY: lastZ.y });
                if (canvas) canvas.dispatchEvent(evClick);

                break;
            }
        }
    });

    touchZone.addEventListener('touchmove', (e) => {
        e.preventDefault(); e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === touchZoneId) {
                const touch = e.changedTouches[i];
                const dx = touch.clientX - lastZ.x;
                const dy = touch.clientY - lastZ.y;
                lastZ.x = touch.clientX;
                lastZ.y = touch.clientY;

                const ev = new MouseEvent('mousemove', {
                    bubbles: true,
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });

                // Strictly proxy movementX/Y for 3D games
                Object.defineProperty(ev, 'movementX', { get: () => dx });
                Object.defineProperty(ev, 'movementY', { get: () => dy });

                document.dispatchEvent(ev);
                break;
            }
        }
    });

    const handleZoneEnd = (e) => {
        e.preventDefault(); e.stopPropagation();
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === touchZoneId) {
                touchZoneId = null;
                const ev = new MouseEvent('mouseup', { bubbles: true, clientX: lastZ.x, clientY: lastZ.y });
                const canvas = document.querySelector('canvas');
                if (canvas) canvas.dispatchEvent(ev);
                break;
            }
        }
    };

    touchZone.addEventListener('touchend', handleZoneEnd);
    touchZone.addEventListener('touchcancel', handleZoneEnd);

})();
