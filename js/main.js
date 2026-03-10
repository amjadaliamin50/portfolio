// ========================================
// Three.js 3D Background
// ========================================
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create geometric network mesh
    const networkGroup = new THREE.Group();

    // Create icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(3, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x0E47CB,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    networkGroup.add(icosahedron);

    // Create inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.1
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    networkGroup.add(glowSphere);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xFFCC00,
        transparent: true,
        opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    networkGroup.add(particlesMesh);

    // Create connecting lines
    const linesGroup = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x3B82F6,
        transparent: true,
        opacity: 0.15
    });

    // Generate random points for lines
    const linePoints = [];
    for (let i = 0; i < 50; i++) {
        const point1 = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        const point2 = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        linesGroup.add(line);
    }
    networkGroup.add(linesGroup);

    scene.add(networkGroup);

    camera.position.z = 8;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.3;
        targetY = mouseY * 0.3;

        // Rotate main group
        networkGroup.rotation.x += 0.002 + (targetY - networkGroup.rotation.x) * 0.02;
        networkGroup.rotation.y += 0.003 + (targetX - networkGroup.rotation.y) * 0.02;

        // Rotate individual elements
        icosahedron.rotation.x += 0.004;
        icosahedron.rotation.y += 0.006;

        glowSphere.rotation.x -= 0.002;
        glowSphere.rotation.y -= 0.003;

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ========================================
// PDF Download Functionality
// ========================================
function initPDFDownload() {
    const downloadBtn = document.querySelector('.download-btn');

    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Show loading state
        const originalContent = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i>';
        downloadBtn.style.pointerEvents = 'none';

        try {
            // Get the CV card content
            const cvCard = document.querySelector('.cv-card');

            // Create PDF using html2pdf
            const opt = {
                margin: 0,
                filename: 'Alexandra_Mueller_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    logging: false
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            };

            // Import html2pdf dynamically
            await html2pdf().set(opt).from(cvCard).save();

            // Restore button
            downloadBtn.innerHTML = originalContent;
            downloadBtn.style.pointerEvents = 'auto';

        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
            downloadBtn.innerHTML = originalContent;
            downloadBtn.style.pointerEvents = 'auto';
        }
    });
}

// ========================================
// Smooth Scroll Navigation
// ========================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offset = 100;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Scroll Reveal Animation
// ========================================
function initScrollReveal() {
    const sections = document.querySelectorAll('.cv-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ========================================
// Animate Skill Bars
// ========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ========================================
// Navbar Background on Scroll
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.cv-navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 17, 32, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(11, 17, 32, 0.85)';
        }
    });
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initSmoothScroll();
    initScrollReveal();
    initSkillBars();
    initNavbarScroll();
    initPDFDownload();
});
