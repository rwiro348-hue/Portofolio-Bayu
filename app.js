/**
 * Bayu Andriana - Modern Editorial Swiss Portfolio
 * Interactive Functionality & Modal Handling
 */

// Work Experience & Project Data Store (Ordered according to LinkedIn Profile)
const projectData = {
  1: {
    title: "AI Data Annotator",
    company: "DataAnnotation",
    type: "Paruh Waktu",
    status: "Saat ini",
    tag: "Data Annotation & ML Datasets",
    year: "Okt 2026 - Saat ini · 1 bln",
    location: "Jarak jauh (Remote)",
    image: "assets/exp_dataannotation.jpg",
    summary: "Labeled and annotated bilingual data sets for machine learning models, exceeding project deadlines with exceptional accuracy and attention to detail.",
    details: [
      "Labeled and annotated bilingual data sets for machine learning models across complex conversational and linguistic structures.",
      "Exceeded deadlines for data annotation projects maintaining a high level of accuracy and attention to detail.",
      "Performed granular classification, bounding/segmentation annotations, and structured attribute labeling for advanced AI training pipelines.",
      "Adhered strictly to rigorous data schema guidelines, ensuring zero data contamination and exceptional inter-annotator agreement (IAA).",
      "Provided structured QA feedback to continuously optimize labeling taxonomies and throughput."
    ],
    skills: ["Data Annotation", "Bilingual Datasets", "Machine Learning", "Quality Assurance", "Data Validation", "Taxonomy Guidelines"]
  },
  2: {
    title: "User Experience Researcher",
    company: "Mercor",
    type: "Kontrak",
    status: "Saat ini",
    tag: "UX Research & Prompt Evaluation",
    year: "Jun 2026 - Saat ini · 5 bln",
    location: "Amerika Serikat · Jarak jauh",
    image: "assets/exp_mercor.jpg",
    summary: "Prompt Evaluator contracted with Mercor, focusing on AI-supported workflows, prompt design, content assessment, and large language model (LLM) enhancement.",
    details: [
      "Contracted as Prompt Evaluator focusing on AI-supported workflows, prompt design, content assessment, and large language model (LLM) enhancement.",
      "Utilized prompt evaluation frameworks and benchmark metrics to assess output accuracy, logical consistency, tone, and user task completion.",
      "Conducted heuristic evaluations and structured user experience analyses on model responses across diverse real-world domain scenarios.",
      "Designed systematic prompt variations to stress-test model reasoning, identify edge cases, and ensure strict instruction compliance.",
      "Collaborated with cross-functional AI teams to synthesize qualitative and quantitative evaluation data for iterative LLM fine-tuning."
    ],
    skills: ["Prompt Design", "UX Research", "LLM Enhancement", "AI Workflows", "Content Assessment", "Model Benchmarking"]
  },
  3: {
    title: "AI Data Trainer",
    company: "Outlier",
    type: "Paruh Waktu",
    status: "Selesai",
    tag: "AI Model Evaluation & RLHF",
    year: "Mei 2026 - Sep 2026 · 5 bln",
    location: "Amerika Serikat · Jarak jauh",
    image: "assets/exp_outlier.jpg",
    summary: "Evaluated AI-generated responses to user prompts, meticulously comparing and analyzing various outputs to assess the performance, truthfulness, and safety of state-of-the-art AI models.",
    details: [
      "Evaluated AI-generated responses to user prompts, meticulously comparing and analyzing various outputs to assess the performance of AI models.",
      "Conducted rigorous pairwise comparisons, ranking model completions based on truthfulness, helpfulness, and instruction compliance.",
      "Identified subtle hallucinations, logical fallacies, and safety edge-cases, providing detailed rubric justification for RLHF fine-tuning.",
      "Delivered analytical rationale for each rating to inform reinforcement learning algorithms and alignment standards.",
      "Consistently achieved top-tier QA compliance and accuracy metrics across high-throughput prompt evaluation batches."
    ],
    skills: ["AI Response Evaluation", "RLHF Benchmark", "Pairwise Comparison", "Hallucination Detection", "Quality Assurance", "Error Taxonomy"]
  },
  4: {
    title: "Document Contributor",
    company: "Studydrive",
    type: "Paruh Waktu",
    status: "Selesai",
    tag: "Academic Knowledge & QA",
    year: "2023 - 2024",
    location: "Jarak jauh (Remote)",
    image: "assets/project_studydrive.jpg",
    summary: "Curated and authored comprehensive university-level academic resources, study guides, and subject matter summaries for thousands of students on the Studydrive platform.",
    details: [
      "Researched, authored, and curated high-quality academic study guides, exam summaries, and lecture notes across multiple university disciplines.",
      "Verified academic references and ensured structural clarity, concise summaries, and logical layout for optimal student comprehension.",
      "Helped thousands of students prepare for university exams and coursework through structured educational repositories.",
      "Maintained meticulous attention to accuracy, grammatical precision, and formatting standards.",
      "Earned top peer reviews and high student engagement for material clarity and pedagogical value."
    ],
    skills: ["Educational Curation", "Research Methods", "Written Communication", "Academic Quality Control", "Analytical Thinking"]
  }
};

// ==========================================
// DOM Initialization & Page Preloader
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initPageLoader();
  setupNavbarScroll();
  setupMobileNav();
  setupScrollSpy();
  initExperienceCarousel();
});

// ==========================================
// Page Preloader Controller ( aldianugrah.com Inspired )
// ==========================================
function initPageLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;

  const barFill = document.getElementById("loaderBarFill");
  const percentEl = document.getElementById("loaderPercent");
  const statusEl = document.getElementById("loaderStatusText");
  const skipBtn = document.getElementById("loaderSkipBtn");

  let currentPercent = 0;
  let isFinished = false;
  let animationFrameId = null;

  const statusMessages = [
    { threshold: 0, text: "SYNCING AI PORTFOLIO ASSETS..." },
    { threshold: 28, text: "CURATING MACHINE LEARNING DATASETS..." },
    { threshold: 60, text: "OPTIMIZING NEURAL BENCHMARKS..." },
    { threshold: 86, text: "FINALIZING USER INTERFACE..." },
    { threshold: 100, text: "SYSTEM READY" }
  ];

  function updateStatus(val) {
    if (!statusEl) return;
    for (let i = statusMessages.length - 1; i >= 0; i--) {
      if (val >= statusMessages[i].threshold) {
        if (statusEl.textContent !== statusMessages[i].text) {
          statusEl.textContent = statusMessages[i].text;
        }
        break;
      }
    }
  }

  function render(val) {
    const clamped = Math.min(100, Math.max(0, val));
    if (barFill) barFill.style.width = clamped + "%";
    if (percentEl) percentEl.textContent = Math.round(clamped) + "%";
    updateStatus(clamped);
  }

  function dismissLoader() {
    if (isFinished) return;
    isFinished = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    render(100);
    if (statusEl) statusEl.textContent = "SYSTEM READY";

    setTimeout(() => {
      loader.classList.add("loader-hidden");
      document.body.classList.remove("is-loading");

      setTimeout(() => {
        loader.style.display = "none";
      }, 700);
    }, 180);
  }

  // Smooth realistic increment simulation
  const startTime = performance.now();
  const totalDuration = 2200; // ~2.2 seconds for cinematic feel

  function tick(now) {
    if (isFinished) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);

    // Natural progression curve: brisk start, steady cruise, smooth snap to 100
    let eased;
    if (progress < 0.72) {
      eased = Math.sin((progress / 0.72) * (Math.PI / 2)) * 0.76;
    } else {
      const remaining = (progress - 0.72) / 0.28;
      eased = 0.76 + (1 - Math.pow(1 - remaining, 2)) * 0.24;
    }

    currentPercent = eased * 100;
    render(currentPercent);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(tick);
    } else {
      dismissLoader();
    }
  }

  animationFrameId = requestAnimationFrame(tick);

  // Skip button click handler
  if (skipBtn) {
    skipBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dismissLoader();
    });
  }

  // Escape key listener to skip immediately
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !isFinished) {
      dismissLoader();
    }
  });

  // Replay utility for testing and demonstration
  window.replayLoader = function () {
    isFinished = false;
    currentPercent = 0;
    loader.style.display = "flex";
    loader.classList.remove("loader-hidden");
    document.body.classList.add("is-loading");
    render(0);
    setTimeout(() => {
      initPageLoader();
    }, 50);
  };
}

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
// Project / Experience Modal Logic
// ==========================================
function openProjectModal(id) {
  const project = projectData[id];
  if (!project) return;

  const content = document.getElementById("projectModalContent");
  content.innerHTML = `
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 12px;">
      <span class="modal-tag">${project.company} &bull; ${project.type}</span>
      <span class="edu-tag" style="background: var(--color-primary-light); color: var(--color-primary); border-color: rgba(0,82,255,0.2); font-weight: 700; font-size: 0.75rem;">${project.year}</span>
      <span style="font-size: 0.78rem; color: var(--color-gray-500); font-weight: 600;">📍 ${project.location}</span>
    </div>
    <h2 class="modal-title" style="margin-bottom: 6px;">${project.title}</h2>
    <div style="font-size: 0.88rem; color: var(--color-gray-600); margin-bottom: 18px; font-weight: 600;">
      Bidang / Fokus: <span style="color: var(--color-primary);">${project.tag}</span>
    </div>
    <img src="${project.image}" alt="${project.title}" class="modal-img-preview" style="border-radius: var(--radius-xs); border: 1px solid var(--color-gray-200); margin-bottom: 20px; width: 100%; aspect-ratio: 16/9; object-fit: cover;">
    <p class="modal-desc" style="font-weight: 500; font-size: 1.02rem; color: var(--color-black); margin-bottom: 20px; line-height: 1.6;">
      ${project.summary}
    </p>
    <h4 class="modal-list-title">Tanggung Jawab & Kontribusi Utama:</h4>
    <ul class="modal-list" style="margin-bottom: 24px;">
      ${project.details.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <h4 class="modal-list-title">Keahlian & Kompetensi:</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px;">
      ${project.skills.map(s => `<span class="edu-tag" style="background: var(--color-primary-light); color: var(--color-primary); border-color: rgba(0,82,255,0.2); font-weight: 700;">${s}</span>`).join("")}
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--color-gray-200); padding-top: 20px;">
      <button class="btn-download-resume" style="margin-top: 0; padding: 10px 20px;" onclick="closeProjectModal()">Tutup</button>
      <button class="btn-talk-nav" style="border-radius: var(--radius-xs); padding: 10px 20px;" onclick="closeProjectModal(); openContactModal();">
        Hubungi Bayu <span class="arrow-up-right">&#8599;</span>
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

// ==========================================
// 3D Cover Flow Work Experience Carousel Controller
// ==========================================
let currentExperienceIndex = 0;
const totalExperienceCards = 4;

function initExperienceCarousel() {
  const stage = document.getElementById("experienceCarouselStage");
  if (!stage) return;

  // Initial update
  updateExperienceCards(currentExperienceIndex);

  // Touch Swipe Handling for Mobile & Tablets
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  stage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const elapsedTime = Date.now() - touchStartTime;

      // Detect deliberate swipe (horizontal greater than vertical)
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && elapsedTime < 800) {
        if (deltaX < 0) {
          nextExperienceCard();
        } else {
          prevExperienceCard();
        }
      }
    },
    { passive: true }
  );

  // Keyboard Arrow Navigation when Work Experience section is active or in viewport
  window.addEventListener("keydown", (e) => {
    // Only intercept if no modal or form input is active
    if (document.querySelector(".modal-overlay.active")) return;
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    const expSection = document.getElementById("experience");
    if (!expSection) return;

    const rect = expSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;

    if (isVisible) {
      if (e.key === "ArrowRight") {
        nextExperienceCard();
      } else if (e.key === "ArrowLeft") {
        prevExperienceCard();
      }
    }
  });
}

function updateExperienceCards(activeIndex) {
  const stage = document.getElementById("experienceCarouselStage");
  if (!stage) return;
  const cards = stage.querySelectorAll(".carousel-3d-card");
  const dots = document.querySelectorAll("#expCarouselDots .carousel-dot");
  if (!cards.length) return;

  cards.forEach((card) => {
    const cardIdx = parseInt(card.getAttribute("data-index"), 10);
    let diff = (cardIdx - activeIndex) % totalExperienceCards;

    // Normalize diff to -1, 0, 1, or 2 (opposite)
    if (diff === -3) diff = 1;
    if (diff === 3) diff = -1;
    if (diff === -2) diff = 2;

    // Reset position classes
    card.classList.remove("card-pos-active", "card-pos-left", "card-pos-right", "card-pos-hidden");

    if (diff === 0) {
      card.classList.add("card-pos-active");
      card.setAttribute("aria-hidden", "false");
    } else if (diff === 1) {
      card.classList.add("card-pos-right");
      card.setAttribute("aria-hidden", "false");
    } else if (diff === -1) {
      card.classList.add("card-pos-left");
      card.setAttribute("aria-hidden", "false");
    } else {
      card.classList.add("card-pos-hidden");
      card.setAttribute("aria-hidden", "true");
    }
  });

  // Update dots
  dots.forEach((dot, idx) => {
    if (idx === activeIndex) {
      dot.classList.add("active");
      dot.setAttribute("aria-selected", "true");
    } else {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", "false");
    }
  });
}

function selectExperienceCard(index) {
  currentExperienceIndex = (index + totalExperienceCards) % totalExperienceCards;
  updateExperienceCards(currentExperienceIndex);
}

function nextExperienceCard() {
  selectExperienceCard(currentExperienceIndex + 1);
}

function prevExperienceCard() {
  selectExperienceCard(currentExperienceIndex - 1);
}

function handleExpCardClick(index) {
  if (currentExperienceIndex === index) {
    // If active center card is clicked, open its detail modal
    openProjectModal(index + 1);
  } else {
    // If side card is clicked, bring it to center
    selectExperienceCard(index);
  }
}

// Expose on window for inline event handlers in HTML
window.selectExperienceCard = selectExperienceCard;
window.nextExperienceCard = nextExperienceCard;
window.prevExperienceCard = prevExperienceCard;
window.handleExpCardClick = handleExpCardClick;
window.initExperienceCarousel = initExperienceCarousel;


