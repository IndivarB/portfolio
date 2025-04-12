document.addEventListener('DOMContentLoaded', () => {
    // Theme Switching
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Section Observer
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');

                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));

    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');

    const projectOverviews = {
        'online-voting': {
            title: 'Online Voting Platform',
            overview: `
                <h3>Online Voting Platform</h3>
                <p>A secure Django-based web app for efficient election management.</p>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Features:</h4>
                <ul>
                    <li>Admin and voter authentication.</li>
                    <li>Live vote counting and results.</li>
                    <li>Data encryption for security.</li>
                    <li>Cross-device responsive design.</li>
                </ul>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Tech Stack:</h4>
                <ul>
                    <li>Django, Python, SQLite</li>
                    <li>HTML, CSS, JavaScript</li>
                    <li>Bootstrap</li>
                </ul>
            `
        },
        'job-search': {
            title: 'Job Search Portal',
            overview: `
                <h3>Job Search Portal</h3>
                <p>A MERN stack platform for job seekers and employers.</p>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Features:</h4>
                <ul>
                    <li>User profiles for candidates and recruiters.</li>
                    <li>Job search with filters.</li>
                    <li>Application tracking.</li>
                    <li>Real-time notifications.</li>
                </ul>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Tech Stack:</h4>
                <ul>
                    <li>MongoDB, Express.js, React, Node.js</li>
                    <li>Redux</li>
                    <li>Tailwind CSS</li>
                </ul>
            `
        },
        'timetable': {
            title: 'Timetable Creator',
            overview: `
                <h3>Timetable Creator</h3>
                <p>A Java tool for automated, conflict-free timetables.</p>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Features:</h4>
                <ul>
                    <li>Conflict-free scheduling.</li>
                    <li>Custom class and faculty inputs.</li>
                    <li>PDF export option.</li>
                    <li>Database storage.</li>
                </ul>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Tech Stack:</h4>
                <ul>
                    <li>Java, MySQL</li>
                    <li>Swing GUI</li>
                    <li>JDBC</li>
                </ul>
            `
        },
        'constitution': {
            title: 'Constitution Awareness Site',
            overview: `
                <h3>Constitution Awareness Site</h3>
                <p>A Spring Boot app for learning about the Indian Constitution.</p>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Features:</h4>
                <ul>
                    <li>Interactive quizzes.</li>
                    <li>Searchable article database.</li>
                    <li>Educational resources.</li>
                    <li>Responsive UI.</li>
                </ul>
                <h4 class="text-lg font-semibold text-accent mt-4 mb-2">Tech Stack:</h4>
                <ul>
                    <li>Spring Boot, Java</li>
                    <li>Thymeleaf</li>
                    <li>MySQL</li>
                    <li>HTML, CSS, JavaScript</li>
                </ul>
            `
        }
    };

    document.querySelectorAll('.overview-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projectOverviews[projectId];

            if (project) {
                modalContent.innerHTML = project.overview;
                modal.classList.add('show');
                document.body.classList.add('modal-open');
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    });

    // Custom Cursor Movement
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Hide cursor when over interactive elements
    document.querySelectorAll('a, button, .nav-link, #close-modal, .project-btn, .overview-btn, .theme-toggle, .contact-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.opacity = '1';
        });
    });
});
