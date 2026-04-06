const APP_VERSION = '2.0.0';

const BANNER_ASCII = String.raw`
 █████╗ ██████╗ ██╗   ██╗ █████╗ ██╗████████╗    ██╗  ██╗███████╗██╗  ██╗██╗██████╗ ███████╗ █████╗  ██████╗  █████╗ ██████╗ 
██╔══██╗██╔══██╗██║   ██║██╔══██╗██║╚══██╔══╝    ██║ ██╔╝██╔════╝██║  ██║██║██╔══██╗██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔══██╗
███████║██║  ██║██║   ██║███████║██║   ██║       █████╔╝ ███████╗███████║██║██████╔╝███████╗███████║██║  ███╗███████║██████╔╝
██╔══██║██║  ██║╚██╗ ██╔╝██╔══██║██║   ██║       ██╔═██╗ ╚════██║██╔══██║██║██╔══██╗╚════██║██╔══██║██║   ██║██╔══██║██╔══██╗
██║  ██║██████╔╝ ╚████╔╝ ██║  ██║██║   ██║       ██║  ██╗███████║██║  ██║██║██║  ██║███████║██║  ██║╚██████╔╝██║  ██║██║  ██║
╚═╝  ╚═╝╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝       ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                                                                                                                             
                                                                         
                                                                         
`;

const CYBERSIGIL_ASCII = String.raw`
             ⠀
             
             
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠄⠀⠀⠀⠀⢀⡲⢷⠷⢧⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⠜⠁⠀⠀⠀⠀⠀⢠⣣⡓⡉⣧⠎⠋⢖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠈⠉⢰⣻⣷⡦⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣔⠦⣤⣇⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠸⣙⣯⣡⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠀⠀⢹⣧⣢⠀⠀⠀⠀⡇⠀⠀⠀⣤⠂⡟⡟⣈⡳⡀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠛⠸⣻⡘⠀⡀⡀⣜⣇⡄⠀⠀⣧⡧⣿⣿⣿⣻⣇⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀
⠐⠂⠐⢓⣶⢾⡿⣵⣖⡓⣒⢈⠛⣁⣞⣭⣏⣿⣿⣿⣦⣿⡕⣘⣥⡀⢠⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠸⠂⠑⠋⠉⣳⣭⣿⡋⡹⠉⠠⠷⣿⣿⣶⣲⠓⣿⡟⠛⠛⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠿⠀⠟⣞⡌⠗⠀⢺⣞⢯⡇⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⣋⣂⣀⠀⠰⢷⠿⠁⠀⠀⣤⢺⢋⣁⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⠛⠉⠀⣔⠛⣶⡟⡲⠀⠀⠀⢈⠸⣿⠃⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⠂⠀⠀⠀⡨⢭⢿⠋⡱⣀⡀⠀⢸⠀⡿⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠸⠀⠀⠀⠀⠉⠀⢳⣧⡛⠉⠉⠳⡘⠀⡽⠈⡄⠀⡀⠀⢀⣇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠐⠜⢼⡤⠀⣠⠰⠳⠠⣸⢀⠃⠀⠀⠀⢏⣗⡑⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣀⠀⢸⠀⠀⢸⠔⢄⡀⠀⠀⡇⡻⠋⠀⠀⠉⠉⢹⣋⠇⢀⢀⠀⠀⠀
⠐⠂⠒⠒⠒⠒⠒⠛⠓⢫⠛⢻⡱⠛⠫⣺⢽⣧⡧⢾⠈⡈⠈⠉⢻⢸⢵⣈⠺⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠰⡄⠀⠀⠸⣲⡌⢿⣾⡰⡃⢀⡤⠼⣽⣮⢣⠅⠤⠄⢀⠆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠘⠥⡍⣿⠟⠱⣒⣬⣤⡃⠼⣥⡤⠄⠊⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⡿⠁⠀⠚⠀⠀⠈⢻⠂⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⣻⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⡟⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡧⣾⠄⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⣗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣗⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡷⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣵⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

const COMMANDS = {
    help: 'Show all commands',
    welcome: 'Print intro and banner',
    about: 'About me',
    projects: 'Current project list',
    skills: 'Core tech stack',
    contact: 'Contact links',
    gui: 'Open GUI portfolio tab (placeholder)',
    themes: 'List available themes',
    'theme <name>': 'Apply a theme',
    resetboot: 'Reset boot flag and rerun POST on next reload',
    design: 'Explain design approach and anti-design hobby',
    date: 'Show local date and time',
    clear: 'Clear terminal output'
};

const THEME_PRESETS = {
    mono: { label: 'High Contrast Mono' },
    amber: { label: 'Amber CRT' },
    matrix: { label: 'Matrix Green' },
    ice: { label: 'Ice Blue' }
};

const BOOT_SESSION_KEY = 'advait_terminal_boot_done_session';
const GUI_PORTFOLIO_PLACEHOLDER_URL = 'https://example.com/portfolio';

const PROFILE = {
    name: 'Advait Kshirsagar',
    role: '2nd Year B.Tech Student | Developer | Mathematics Enthusiast',
    about: [
        "I'm a passionate computer science student currently in my second year, pursuing a Bachelor's degree in Computer Science.",
        'My journey in tech began with a fascination for how software works, from building early websites to developing practical applications.',
        'Currently focused on software development, algorithms, and machine learning, with emphasis on clean and efficient code.'
    ],
    stats: {
        year: '2nd Year Student',
        projectsCompleted: '8 Projects Completed',
        internships: '1 Internship'
    },
    email: 'advaitkshirsagar228@gmail.com',
    location: 'Institute of Engineering and Technology (DAVV), Indore, India',
    github: 'https://github.com/finoyes'
};

const WAVEFORM_FRAMES = [
    String.raw`clk   : _/\/\_/\/\_/\/\_
data  : xxxx<he><bo><ta>xxxx
req   : |____|____|____|__`,
    String.raw`clk   : __/\/\_/\/\_/\/\_
data  : xxxx<he><bo><ta>xxxx
req   : _|___|____|____|___`,
    String.raw`clk   : _/\/\__/\/\__/\/\_
data  : xxxx<he><bo><ta>xxxx
req   : |_____|___|____|____`,
    String.raw`clk   : _/\/\_/\/\__/\/\__
data  : xxxx<he><bo><ta>xxxx
req   : |____|_____|___|___`
];

const SKILL_GROUPS = {
    languages: ['Python', 'JavaScript', 'Dart', 'C / C++'],
    technologies: ['Flutter', 'Node.js / Express', 'SQL / MongoDB', 'Git / GitHub'],
    softSkills: ['Problem Solving', 'Team Collaboration', 'Technical Writing', 'Project Management']
};

const PROJECTS = [
    {
        name: 'Coldmail Similarity',
        stack: 'C++ | Algorithms',
        description: 'Analyze and compare cold email content using similarity algorithms.',
        github: 'https://github.com/finoyes/coldmail-similarity_CPP'
    },
    {
        name: 'YouTube to PDF',
        stack: 'Python | AI',
        description: 'Convert YouTube videos into PDF study guides with AI summaries and optional screenshots.',
        github: 'https://github.com/finoyes/yuotubetoPDF'
    },
    {
        name: 'README Generator',
        stack: 'Python | CLI',
        description: 'AI-powered CLI tool that generates professional README files from short project descriptions.',
        github: 'https://github.com/finoyes/readme_generator'
    },
    {
        name: 'Niche Trends Predictor',
        stack: 'Python | ML',
        description: 'Predict price trends for niche items using Linear Regression and scikit-learn.',
        github: 'https://github.com/finoyes/nichetrends'
    },
    {
        name: 'Dripup',
        stack: 'Mobile App',
        description: 'Lifestyle and productivity oriented mobile application project.',
        github: 'https://github.com/finoyes/Dripup'
    },
    {
        name: 'Eye Tracker',
        stack: 'Flutter | ML Kit',
        description: 'Real-time eye tracking app using Google ML Kit Face Detection.',
        github: 'https://github.com/finoyes/eyetracker'
    }
];

class TerminalApp {
    constructor() {
        this.outputEl = document.getElementById('terminal-output');
        this.inputEl = document.getElementById('terminal-input');
        this.promptEl = document.querySelector('.prompt');
        this.sideSigilEl = document.getElementById('side-sigil');
        this.sigilWaveformEl = document.getElementById('sigil-waveform');
        this.designAudio = new Audio(encodeURI('05. I Really Want to Stay at Your House.flac'));
        this.designAudio.preload = 'auto';
        this.designAudio.loop = false;
        this.waveformTimer = null;
        this.waveformFrameIndex = 0;

        this.history = [];
        this.historyIndex = -1;
        this.activeTheme = 'mono';
        this.isBooting = true;

        this.bindEvents();
        this.renderSideSigil();
        this.bindAudioEvents();
        this.boot();
    }

    renderSideSigil() {
        if (!this.sideSigilEl) return;
        this.sideSigilEl.textContent = CYBERSIGIL_ASCII.trimEnd();
    }

    bindAudioEvents() {
        this.designAudio.addEventListener('playing', () => this.startWaveformAnimation());
        this.designAudio.addEventListener('pause', () => this.stopWaveformAnimation());
        this.designAudio.addEventListener('ended', () => this.stopWaveformAnimation());
    }

    setWaveformPlaying(isPlaying) {
        if (!this.sigilWaveformEl) return;
        this.sigilWaveformEl.classList.toggle('is-active', isPlaying);
    }

    renderWaveformFrame() {
        if (!this.sigilWaveformEl) return;
        const frame = WAVEFORM_FRAMES[this.waveformFrameIndex % WAVEFORM_FRAMES.length];
        this.sigilWaveformEl.textContent = frame;
        this.waveformFrameIndex = (this.waveformFrameIndex + 1) % WAVEFORM_FRAMES.length;
    }

    startWaveformAnimation() {
        if (!this.sigilWaveformEl) return;

        this.stopWaveformAnimation();
        this.setWaveformPlaying(true);
        this.renderWaveformFrame();
        this.waveformTimer = window.setInterval(() => this.renderWaveformFrame(), 180);
    }

    stopWaveformAnimation() {
        if (this.waveformTimer !== null) {
            window.clearInterval(this.waveformTimer);
            this.waveformTimer = null;
        }

        this.setWaveformPlaying(false);

        if (this.sigilWaveformEl) {
            this.sigilWaveformEl.textContent = WAVEFORM_FRAMES[0];
        }
        this.waveformFrameIndex = 0;
    }

    bindEvents() {
        this.inputEl.addEventListener('input', () => this.updateInputWidth());
        this.inputEl.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('click', () => {
            this.inputEl.focus();
        });
    }

    async boot() {
        this.applyTheme(this.activeTheme, false);

        const shouldRunBootSequence = this.shouldRunBootSequence();

        if (!shouldRunBootSequence) {
            this.renderWelcomeScreen();

            this.isBooting = false;
            this.inputEl.disabled = false;
            this.inputEl.placeholder = '';
            this.updateInputWidth();
            this.inputEl.focus();
            return;
        }

        this.inputEl.disabled = true;
        this.inputEl.placeholder = 'boot sequence running...';

        const bootLines = [
            'AWARD MODULAR BIOS v4.51PG, An Energy Star Ally',
            'CPU: Intel(R) Pentium(R) III Processor at 866MHz',
            'Memory Test: 65536K OK',
            'Primary Master: ST3200822A',
            'Primary Slave: None',
            'Detecting IDE Drives... [OK]',
            'Initializing USB Controllers... [OK]',
            'Checking NVRAM... [OK]',
            'Boot Device: HDD-0',
            'Loading ADVAIT_TERMINAL.SYS... [OK]',
            'Starting shell...'
        ];

        this.printBlock([
            this.makeLine('Power On Self Test (POST)', 'text-orange'),
            this.makeLine('--------------------------------', 'text-comment')
        ]);

        for (const line of bootLines) {
            this.printBlock([this.makeLine(line, 'text-comment')]);
            await this.wait(180);
        }

        await this.wait(220);

        // After POST completes, clear boot log and show clean terminal welcome screen.
        this.outputEl.innerHTML = '';
        this.renderWelcomeScreen();

        this.isBooting = false;
        this.inputEl.disabled = false;
        this.inputEl.placeholder = '';
        this.updateInputWidth();
        this.inputEl.focus();
        this.markBootSequenceDone();
    }

    renderWelcomeScreen() {
        this.printBlock([
            this.makeScrollingPre(BANNER_ASCII, 'ascii-banner'),
            this.makeLine(`${PROFILE.name} terminal portfolio initialized.`, 'text-green'),
            this.makeLine(PROFILE.role, 'text-cyan'),
            this.makeLine(`Version ${APP_VERSION} | For a list of available commands, type 'help'.`, 'text-comment')
        ]);
    }

    shouldRunBootSequence() {
        try {
            return sessionStorage.getItem(BOOT_SESSION_KEY) !== 'true';
        } catch {
            // If storage is unavailable, keep current behavior and run sequence.
            return true;
        }
    }

    markBootSequenceDone() {
        try {
            sessionStorage.setItem(BOOT_SESSION_KEY, 'true');
        } catch {
            // Ignore storage failures.
        }
    }

    resetBootSequence() {
        try {
            sessionStorage.removeItem(BOOT_SESSION_KEY);
        } catch {
            // Ignore storage failures.
        }

        this.printBlock([
            this.makeLine('Boot sequence reset for this tab session.', 'text-green'),
            this.makeLine('Reload the page to run POST again.', 'text-comment')
        ]);
    }

    wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    updateInputWidth() {
        const value = this.inputEl.value || '';
        const nextWidth = Math.max(1, value.length + 1);
        this.inputEl.style.width = `${nextWidth}ch`;
    }

    handleKeyDown(event) {
        if (this.isBooting) {
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter') {
            const raw = this.inputEl.value;
            const command = raw.trim();

            this.echoCommand(raw);

            if (command) {
                this.history.unshift(command);
            }
            this.historyIndex = -1;
            this.inputEl.value = '';
            this.updateInputWidth();

            this.runCommand(command);
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!this.history.length) return;
            this.historyIndex = Math.min(this.historyIndex + 1, this.history.length - 1);
            this.inputEl.value = this.history[this.historyIndex] || '';
            this.updateInputWidth();
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!this.history.length) return;
            this.historyIndex = Math.max(this.historyIndex - 1, -1);
            this.inputEl.value = this.historyIndex === -1 ? '' : this.history[this.historyIndex] || '';
            this.updateInputWidth();
            return;
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            const partial = this.inputEl.value.trim().toLowerCase();
            if (!partial) return;

            const matches = Object.keys(COMMANDS).filter((cmd) => cmd.startsWith(partial));
            if (matches.length === 1) {
                this.inputEl.value = matches[0];
                this.updateInputWidth();
            } else if (matches.length > 1) {
                this.printBlock([
                    this.makeLine('Matches: ' + matches.join(', '), 'text-comment')
                ]);
            }
        }
    }

    echoCommand(rawInput) {
        const escaped = this.escapeHTML(rawInput);
        this.printRaw(`<span class="prompt">${this.promptEl.innerHTML}</span> ${escaped}`);
    }

    runCommand(command) {
        const cmd = (command || '').toLowerCase();
        const [baseCmd, ...args] = cmd.split(/\s+/).filter(Boolean);
        const argText = args.join(' ');

        if (!baseCmd) {
            this.printBlock([this.makeLine('Type help to explore commands.', 'text-comment')]);
            return;
        }

        switch (baseCmd) {
            case 'help':
                this.printHelp();
                break;
            case 'welcome':
                this.printWelcome();
                break;
            case 'about':
                this.printAbout();
                break;
            case 'projects':
                this.printProjects();
                break;
            case 'skills':
                this.printSkills();
                break;
            case 'contact':
                this.printContact();
                break;
            case 'gui':
                this.openGuiPortfolio();
                break;
            case 'themes':
                this.printThemes();
                break;
            case 'theme':
                this.applyTheme(argText);
                break;
            case 'resetboot':
                this.resetBootSequence();
                break;
            case 'design':
                this.printDesign();
                break;
            case 'date':
                this.printDate();
                break;
            case 'clear':
                this.outputEl.innerHTML = '';
                break;
            default:
                this.printBlock([
                    this.makeLine(`Command not found: ${cmd}`, 'text-red'),
                    this.makeLine('Type help for available commands.', 'text-comment')
                ]);
                break;
        }
    }

    printThemes() {
        const lines = [
            this.makeLine('Available Themes', 'text-orange')
        ];

        Object.entries(THEME_PRESETS).forEach(([key, theme]) => {
            const suffix = this.activeTheme === key ? ' [active]' : '';
            lines.push(this.makeLine(`${key.padEnd(10, ' ')} - ${theme.label}${suffix}`, 'text-cyan'));
        });

        lines.push(this.makeLine('Use: theme <name>', 'text-comment'));
        this.printBlock(lines);
    }

    applyTheme(themeName, printFeedback = true) {
        const selected = (themeName || '').trim().toLowerCase();

        if (!selected) {
            this.printBlock([
                this.makeLine('Usage: theme <name>', 'text-yellow'),
                this.makeLine(`Try one of: ${Object.keys(THEME_PRESETS).join(', ')}`, 'text-comment')
            ]);
            return;
        }

        if (!THEME_PRESETS[selected]) {
            this.printBlock([
                this.makeLine(`Unknown theme: ${selected}`, 'text-red'),
                this.makeLine(`Available: ${Object.keys(THEME_PRESETS).join(', ')}`, 'text-comment')
            ]);
            return;
        }

        document.documentElement.setAttribute('data-theme', selected);
        this.activeTheme = selected;

        if (printFeedback) {
            this.printBlock([
                this.makeLine(`Theme applied: ${selected} (${THEME_PRESETS[selected].label})`, 'text-green')
            ]);
        }
    }

    printHelp() {
        const lines = [this.makeLine('Available Commands', 'text-orange')];
        Object.entries(COMMANDS).forEach(([cmd, description]) => {
            lines.push(this.makeLine(`${cmd.padEnd(10, ' ')} - ${description}`, 'text-cyan'));
        });
        this.printBlock(lines);
    }

    printWelcome() {
        this.printBlock([
            this.makeScrollingPre(BANNER_ASCII, 'ascii-banner'),
            this.makeLine('Welcome to the Aerminal .', 'text-green'),
        ]);
    }

    printAbout() {
        this.printBlock([
            this.makeLine(PROFILE.name, 'text-orange'),
            this.makeLine(PROFILE.role, 'text-cyan'),
            this.makeLine(PROFILE.about[0], 'text-comment'),
            this.makeLine(PROFILE.about[1], 'text-comment'),
            this.makeLine(PROFILE.about[2], 'text-comment'),
            this.makeLine(`Stats -> ${PROFILE.stats.year} | ${PROFILE.stats.projectsCompleted} | ${PROFILE.stats.internships}`, 'text-green')
        ]);
    }

    printProjects() {
        const lines = [this.makeLine('Projects', 'text-orange')];
        PROJECTS.forEach((project, index) => {
            lines.push(this.makeLine(`${index + 1}. ${project.name} [${project.stack}]`, 'text-cyan'));
            lines.push(this.makeLine(`   ${project.description}`, 'text-comment'));
            lines.push(this.makeLine(`   ${project.github}`, 'text-green'));
        });
        this.printBlock(lines);
    }

    printSkills() {
        this.printBlock([
            this.makeLine('Skills', 'text-orange'),
            this.makeLine(`Languages    -> ${SKILL_GROUPS.languages.join(', ')}`, 'text-cyan'),
            this.makeLine(`Technologies -> ${SKILL_GROUPS.technologies.join(', ')}`, 'text-cyan'),
            this.makeLine(`Soft Skills  -> ${SKILL_GROUPS.softSkills.join(', ')}`, 'text-cyan')
        ]);
    }

    printContact() {
        this.printRaw(`Email: <a class="terminal-link" href="mailto:${PROFILE.email}">${PROFILE.email}</a>`);
        this.printRaw(`Location: ${this.escapeHTML(PROFILE.location)}`);
        this.printRaw(`GitHub: <a class="terminal-link" href="${PROFILE.github}" target="_blank" rel="noreferrer">${PROFILE.github}</a>`);
        this.printRaw('LinkedIn: listed on source portfolio');
        this.printRaw('Instagram: listed on source portfolio');
    }

    openGuiPortfolio() {
        const openedTab = window.open(GUI_PORTFOLIO_PLACEHOLDER_URL, '_blank', 'noopener,noreferrer');

        if (openedTab) {
            this.printBlock([
                this.makeLine('Opening GUI portfolio tab (placeholder)...', 'text-green'),
                this.makeLine(GUI_PORTFOLIO_PLACEHOLDER_URL, 'text-comment')
            ]);
            return;
        }

        this.printBlock([
            this.makeLine('Popup blocked. Allow popups to open the GUI tab.', 'text-yellow'),
            this.makeLine(`Placeholder URL: ${GUI_PORTFOLIO_PLACEHOLDER_URL}`, 'text-comment')
        ]);
    }

    printDesign() {
        this.printBlock([
            this.makeLine('Design Notes', 'text-orange'),
            this.makeLine('1. Monospace-first typography with precise spacing', 'text-cyan'),
            this.makeLine('2. Dark console palette with warm accent for hierarchy', 'text-cyan'),
            this.makeLine('3. Low-noise chrome and command-driven interaction', 'text-cyan'),
            this.makeLine('4. Subtle CRT-like texture and atmospheric gradients', 'text-cyan'),
            this.makeLine('5. Persistent side cybersigil as ambient ornament', 'text-cyan'),
            this.makeLine('Hobby: Anti-design experiments -> intentionally breaking neat grids, embracing raw/odd visual rhythm, and using controlled chaos as expression.', 'text-comment')
        ]);

        this.printRaw('<img class="design-image" src="105.png" alt="Design reference image" loading="lazy" draggable="false" oncontextmenu="return false">');

        const image = this.outputEl.lastElementChild?.querySelector('.design-image');
        if (!image) return;

        image.addEventListener('mouseenter', () => this.playDesignAudio());
        image.addEventListener('mouseleave', () => this.stopDesignAudio());
        image.addEventListener('dragstart', (event) => event.preventDefault());
        image.addEventListener('copy', (event) => event.preventDefault());
    }

    playDesignAudio() {
        this.designAudio.pause();
        this.designAudio.currentTime = 0;
        const playback = this.designAudio.play();

        if (playback && typeof playback.catch === 'function') {
            playback.catch(() => {
                this.stopWaveformAnimation();
                // Ignore autoplay and codec failures.
            });
        }
    }

    stopDesignAudio() {
        this.designAudio.pause();
        this.designAudio.currentTime = 0;
        this.stopWaveformAnimation();
    }

    printDate() {
        const now = new Date();
        this.printBlock([
            this.makeLine(now.toLocaleString(), 'text-green')
        ]);
    }

    makeLine(text, className = '') {
        const safe = this.escapeHTML(text);
        return `<span class="output-line ${className}">${safe}</span>`;
    }

    makePre(text, className = '') {
        const safe = this.escapeHTML(text);
        return `<pre class="output-pre ${className}">${safe}</pre>`;
    }

    makeScrollingPre(text, className = '') {
        const safe = this.escapeHTML(text);
        return `<div class="ascii-scroll-wrap"><div class="ascii-scroll-lane"><pre class="output-pre ascii-scroll-track ${className}">${safe}</pre><pre class="output-pre ascii-scroll-track ${className}" aria-hidden="true">${safe}</pre></div></div>`;
    }

    printRaw(html) {
        const block = document.createElement('div');
        block.className = 'output-block';
        block.innerHTML = html;
        this.outputEl.appendChild(block);
        this.scrollToBottom();
    }

    printBlock(lines) {
        const block = document.createElement('div');
        block.className = 'output-block';
        block.innerHTML = lines.join('');
        this.outputEl.appendChild(block);
        this.scrollToBottom();
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    escapeHTML(text) {
        return text
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new TerminalApp();
});
