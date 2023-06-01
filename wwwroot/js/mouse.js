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
    animateCircles(e, x, y);
  
    const hoveredEl = document.elementFromPoint(x, y);
  
    stickyElement(x, y, hoveredEl);
  
    mouseCircleTransform(hoveredEl);
  });
  
  document.body.addEventListener("mouseleave", () => {
    mouseCircle.style.opacity = "0";
    mouseDot.style.opacity = "0";
  });