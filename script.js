// Interactive Cyber Canvas Background Nodes
const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const nodes = [];
for (let i = 0; i < 45; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1
    });
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nodeColor = isDark ? '#00d2ff' : '#0066cc';
    const lineColor = isDark ? 'rgba(0, 210, 255, ' : 'rgba(0, 102, 204, ';

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            let other = nodes[j];
            let dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = lineColor + (1 - dist / 120) * 0.25 + ')';
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawCanvas);
}
drawCanvas();

// Light / Dark Theme Switching Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('cm_theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cm_theme', newTheme);
});

// Interactive Case Study Modal Popups
const caseStudiesData = {
    1: {
        title: "Zero-Trust Perimeter & Gateway Hardening",
        id: "INCIDENT #089",
        badge: "RESOLVED",
        overview: "Executed a comprehensive zero-trust network audit across multi-cloud infrastructure to eliminate privilege escalation vectors.",
        objective: "Harden network access points and secure API gateways against unauthorized penetration.",
        methodology: [
            "Conducted port scanning and service profiling using Nmap.",
            "Restricted AWS IAM bucket access policies and implemented MFA.",
            "Integrated real-time anomaly logging via automated webhooks."
        ],
        outcome: "Remediated 12 key vulnerability points and reduced exposure risks across cloud endpoints."
    },
    2: {
        title: "Web App SQL Injection & Input Sanitization",
        id: "INCIDENT #104",
        badge: "MITIGATED",
        overview: "Identified and resolved blind SQL injection vulnerabilities within a production user portal.",
        objective: "Prevent raw SQL query concatenations and protect sensitive user database tables.",
        methodology: [
            "Executed DAST dynamic payload tests using Burp Suite Professional.",
            "Converted dynamic database queries to parameterized prepared statements.",
            "Configured custom Web Application Firewall (WAF) blocking rules."
        ],
        outcome: "Completely eliminated SQL injection vectors and enforced strict input sanitization handlers."
    }
};

const modalOverlay = document.getElementById('case-modal');
const modalBody = document.getElementById('modal-body');

function openModal(caseId) {
    const data = caseStudiesData[caseId];
    if (!data) return;

    modalBody.innerHTML = `
        <div class="case-header">
            <span class="case-id">${data.id}</span>
            <span class="case-badge resolved">${data.badge}</span>
        </div>
        <h3>${data.title}</h3>
        <h4>Executive Summary</h4>
        <p>${data.overview}</p>
        <h4>Operational Objective</h4>
        <p>${data.objective}</p>
        <h4>Methodology</h4>
        <ul>${data.methodology.map(item => `<li>${item}</li>`).join('')}</ul>
        <h4>Outcome</h4>
        <p>${data.outcome}</p>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});