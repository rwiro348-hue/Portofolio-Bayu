/**
 * Bayu Andriana - Modern Editorial Swiss Portfolio
 * Interactive Functionality & Modal Handling
 */

// Project Data Store
const projectData = {
  1: {
    title: "AI Trainer & Model Evaluation",
    tag: "AI & LLM Training",
    year: "2024",
    image: "assets/project_ai.jpg",
    summary: "Evaluated and benchmarked cutting-edge generative AI responses, ensuring instruction-following precision, logical reasoning, and domain safety.",
    details: [
      "Evaluated and improved AI-generated responses for complex instruction following and factual accuracy.",
      "Reviewed datasets and strictly adhered to multi-dimensional quality guidelines across diverse AI training domains.",
      "Identified edge-case errors, hallucinations, and taxonomy inconsistencies, providing structured analytical feedback for model RLHF fine-tuning.",
      "Maintained 100% QA consistency across high-throughput prompt evaluation batches.",
      "Collaborated with cross-functional AI data annotation pipelines to advance state-of-the-art model capabilities."
    ],
    skills: ["AI Evaluation", "Prompt Engineering", "Data Annotation", "Quality Assurance", "Error Taxonomy", "RLHF Feedback"]
  },
  2: {
    title: "Public Relations Intern - West Java Water Resources Agency",
    tag: "Public Relations",
    year: "2023",
    image: "assets/project_pr.jpg",
    summary: "Led institutional digital media initiatives, transforming technical water infrastructure data into engaging, accessible citizen communications.",
    details: [
      "Completed an intensive 45-day internship in the Public Relations Division of the West Java Provincial Water Resources Agency.",
      "Designed and published informative Instagram content feeds, stories, and official agency bulletins.",
      "Drafted accessible, citizen-oriented announcements explaining complex water resource initiatives and conservation projects.",
      "Assisted in coordinating public relations coverage and media documentation for official agency activities.",
      "Applied communication science theory to evaluate citizen engagement and public reception."
    ],
    skills: ["Public Relations", "Digital Media Strategy", "Content Creation", "Institutional Communication", "Stakeholder Engagement"]
  },
  3: {
    title: "Document Contributor - StudyDrive Platform",
    tag: "Academic Knowledge",
    year: "2023 - 2024",
    image: "assets/project_studydrive.jpg",
    summary: "Curated and authored comprehensive university-level academic resources, study guides, and subject matter summaries for thousands of students.",
    details: [
      "Researched, authored, and curated high-quality academic study guides, exam summaries, and lecture notes across multiple disciplines.",
      "Verified academic references and ensured structural clarity, concise summaries, and logical layout for optimal student comprehension.",
      "Helped thousands of students prepare for university exams and coursework through structured educational repositories.",
      "Maintained meticulous attention to accuracy, grammatical precision, and formatting standards.",
      "Earned top peer reviews for material clarity and pedagogical value."
    ],
    skills: ["Research Methods", "Educational Curation", "Written Communication", "Academic Quality Control", "Analytical Thinking"]
  }
};

// ==========================================
// DOM Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupNavbarScroll();
  setupMobileNav();
  setupScrollSpy();
});

// Navbar background blur effect on scroll
function setupNavbarScroll() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Mobile Hamburger Toggle
function setupMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close when clicking any link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }
}

// Active navigation link tracking on scroll
function setupScrollSpy() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

// ==========================================
// Project Modal Logic
// ==========================================
function openProjectModal(id) {
  const project = projectData[id];
  if (!project) return;

  const content = document.getElementById("projectModalContent");
  content.innerHTML = `
    <span class="modal-tag">${project.tag} &bull; ${project.year}</span>
    <h2 class="modal-title">${project.title}</h2>
    <img src="${project.image}" alt="${project.title}" class="modal-img-preview">
    <p class="modal-desc" style="font-weight: 500; font-size: 1.02rem; color: var(--color-black); margin-bottom: 20px;">
      ${project.summary}
    </p>
    <h4 class="modal-list-title">Key Responsibilities & Outcomes:</h4>
    <ul class="modal-list">
      ${project.details.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <h4 class="modal-list-title">Competencies Applied:</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
      ${project.skills.map(s => `<span class="edu-tag" style="background: var(--color-primary-light); color: var(--color-primary); border-color: rgba(0,82,255,0.2); font-weight: 700;">${s}</span>`).join("")}
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--color-gray-200); padding-top: 20px;">
      <button class="btn-download-resume" style="margin-top: 0; padding: 10px 20px;" onclick="closeProjectModal()">Close</button>
      <button class="btn-talk-nav" style="border-radius: var(--radius-xs); padding: 10px 20px;" onclick="closeProjectModal(); openContactModal();">
        Inquire About This <span class="arrow-up-right">&#8599;</span>
      </button>
    </div>
  `;

  const modal = document.getElementById("projectModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==========================================
// CV Modal Logic
// ==========================================
function openCVModal() {
  const modal = document.getElementById("cvModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCVModal() {
  const modal = document.getElementById("cvModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==========================================
// Contact Modal Logic
// ==========================================
function openContactModal() {
  const modal = document.getElementById("contactModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modals when clicking backdrop
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close modals on Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
    document.body.style.overflow = "auto";
  }
});

// ==========================================
// Contact Form Submission
// ==========================================
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const subject = document.getElementById("contactSubject").value;
  const message = document.getElementById("contactMessage").value;

  // Prepare mailto link as backup
  const mailtoLink = `mailto:bayuandriana15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

  // Show Toast Feedback
  showToast(`Thank you, ${name}! Opening mail client...`);

  // Reset form and close modal
  document.getElementById("contactForm").reset();
  setTimeout(() => {
    closeContactModal();
    window.location.href = mailtoLink;
  }, 1000);
}

// Toast notification helper
function showToast(msg) {
  const toast = document.getElementById("toastMsg");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
