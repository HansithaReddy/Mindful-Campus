const servicesData = [
  {
    icon: "workshop.jpg",
    title: "Mindfulness Workshops",
    content:
      "Join our mindfulness workshops to reduce stress and improve focus.",
    link: "services.html"
  },

  {
    icon: "service.jpg",
    title: "Counseling Services",
    content:
      "Access our professional counseling services for mental well-being.",
    link: "services.html"
  },

  {
    icon: "programs.jpg",
    title: "Community Engagement Programs",
    content:
      "Get involved in volunteer opportunities, community education, environmental initiatives, and social impact projects.",
    link: "services.html"
  },

  {
    icon: "wellness.jpg",
    title: "Wellness Programs",
    content: "Participate in wellness programs designed to enhance overall health.",
    link: "services.html"
  },
];
  const servicesContainer = document.querySelector(".services-container");
  const cardsContainer = document.querySelector("#blog .cards-container");
  
  // Display services
  
  const displayServices = () => {
    servicesData.forEach((s) => {
      const HTML = `<a href="${s.link}">
          <div data-aos="flip-left" class="icon">
            <img src="${s.icon}" alt="${s.title}" />
          </div>
        </a>
  
        <div data-aos="fade-in" class="service-content">
          <h3>${s.title}</h3>
          <p>${s.content}</p>
        </div>`;
  
      const service = document.createElement("div");
      service.classList.add("service");
      service.innerHTML = HTML;
      servicesContainer.appendChild(service);
    });
  };
  
  displayServices();
  
  
  // Animation for navbar
  
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
  
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
  
  // Mobile Menu
  
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const mobileMenuItems = document.querySelector(".mobile-menu-items");
  
  menuIcon.addEventListener("click", () => {
    mobileMenuItems.classList.add("active");
  });
  
  closeIcon.addEventListener("click", () => {
    mobileMenuItems.classList.remove("active");
  });