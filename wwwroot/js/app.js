// Navigation
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

const scrollFn = () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }

  progressBarFn();
};

document.addEventListener("scroll", scrollFn);

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});
// End of Navigation


// Mouse Circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`);

  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};
// End of Mouse Circle




let hoveredElPosition = [];

const stickyElement = (x, y, hoveredEl) => {
  // Sticky Element
  if (hoveredEl.classList.contains("sticky")) {
    hoveredElPosition.length < 1 &&
      (hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]);

    hoveredEl.style.cssText = `top: ${y}px; left: ${x}px`;

    if (
      hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
      hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
      hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
      hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
    ) {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    }

    hoveredEl.onmouseleave = () => {
      hoveredEl.style.cssText = "";
      hoveredElPosition = [];
    };
  }
  // End of Sticky Element
};

// Mouse Circle Transform
const mouseCircleTransform = (hoveredEl) => {
    if (hoveredEl.classList.contains("pointer-enter")) {
      hoveredEl.onmousemove = () => {
        mouseCircleBool = false;
        mouseCircle.style.cssText = `
        width: ${hoveredEl.getBoundingClientRect().width}px;
        height: ${hoveredEl.getBoundingClientRect().height}px;
        top: ${hoveredEl.getBoundingClientRect().top}px;
        left: ${hoveredEl.getBoundingClientRect().left}px;
        opacity: 1;
        transform: translate(0, 0);
        animation: none;
        border-radius: ${getComputedStyle(hoveredEl).borderBottomLeftRadius};
        transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;
        `;
      };
  
      hoveredEl.onmouseleave = () => {
        mouseCircleBool = true;
      };
  
      document.onscroll = () => {
        if (!mouseCircleBool) {
          mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
        }
      };
    }
  };
  // End of Mouse Circle Transform
  
  document.body.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
  
    mouseCircleFn(x, y);
    // animateCircles(e, x, y);
  
    const hoveredEl = document.elementFromPoint(x, y);
  
    stickyElement(x, y, hoveredEl);
  
    mouseCircleTransform(hoveredEl);
  });
  
  document.body.addEventListener("mouseleave", () => {
    mouseCircle.style.opacity = "0";
    mouseDot.style.opacity = "0";
  });

// Main Button
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    console.log("hi");
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// End of Main Button
  // Progress Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progress-bar");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelector(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");

let scrolledPortion = 0;
let scrollBool = false;
let imageWrapper = false;

const progressBarFn = (bigImgWrapper) => {
  imageWrapper = bigImgWrapper;
  let pageHeight = 0;
  const pageViewportHeight = window.innerHeight;

  if (!imageWrapper) {
    pageHeight = document.documentElement.scrollHeight;
    scrolledPortion = window.pageYOffset;
  } else {
    pageHeight = imageWrapper.firstElementChild.scrollHeight;
    scrolledPortion = imageWrapper.scrollTop;
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)
`;

    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCircleTop.style.opacity = "0";
    } else {
      halfCircleTop.style.opacity = "1";
    }
  });

  scrollBool = scrolledPortion + pageViewportHeight === pageHeight;

  // Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0)";
  }
  // End of Arrow Rotation
};

// Progress Bar Click
progressBar.addEventListener("click", (e) => {
  e.preventDefault();

  if (!imageWrapper) {
    const sectionPositions = Array.from(sections).map(
      (section) => scrolledPortion + section.getBoundingClientRect().top
    );

    const position = sectionPositions.find((sectionPosition) => {
      return sectionPosition > scrolledPortion;
    });

    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
  } else {
    scrollBool
      ? imageWrapper.scrollTo(0, 0)
      : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
  }
});
// End of Progress Bar Click

progressBarFn();

// End of Progress Bar

// About Me Text
const aboutMeText = document.querySelector(".pitch_text");
const aboutMeTextContent =
  "CRAFTING DIGITAL STAGES FOR ENTERTAINMENT CREATIVES AND BUSINESS TO SHOWCASE THEIR TALENTS.";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});
// End of About Me Text


// Projects
const container = document.querySelector(".wrapper");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big Project Image
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.setAttribute("src", `${imgPath}-big.png`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";

    document.removeEventListener("scroll", scrollFn);

    mouseCircle.style.opacity = 0;

    progressBarFn(bigImgWrapper);

    bigImgWrapper.onscroll = () => {
      progressBarFn(bigImgWrapper);
    };

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";

      document.addEventListener("scroll", scrollFn);

      progressBarFn();
    };
  });
  // End of Big Project Image

  i >= 6 && (project.style.cssText = "display: none; opacity: 0");
});

// Section 4 Talents
document.querySelectorAll(".talent_btn").forEach((talent) => {
  talent.addEventListener("click", (e) => {
    e.preventDefault();

    const talentText = talent.nextElementSibling;
    talentText.classList.toggle("change");

    const rightPosition = talentText.classList.contains("change") ? `calc(100% - ${getComputedStyle(talent.firstElementChild).width})` : 0;

    talent.firstElementChild.style.right = rightPosition;
  });
});


// End of Section 4

// Section 5
// Form
const formHeading = document.querySelector(".form_heading");
const formInputs = document.querySelectorAll(".contact_form__input, select");

formInputs.forEach((input) => {
  if (input.tagName === 'SELECT') {
    input.addEventListener("focus", () => {
      formHeading.style.opacity = "0";
      setTimeout(() => {
        formHeading.textContent = `Your ${input.name}`;
        formHeading.style.opacity = "1";
      }, 300);
    });
  } else {
    input.addEventListener("focus", () => {
      formHeading.style.opacity = "0";
      setTimeout(() => {
        if (input.tagName === 'TEXTAREA') {
          formHeading.textContent = `${input.placeholder}`;
        } else {
          
        
        formHeading.textContent = `Your ${input.placeholder}`;
        formHeading.style.opacity = "1";
        
      }}, 300);
    });
  }
 

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Lets Collaborate";
      formHeading.style.opacity = "1";
    }, 300);
  });
});
// End of Form


