const headers = document.querySelectorAll('.header');
const bodies = document.querySelectorAll('.body');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const number = header.dataset.number;

    headers.forEach(h => h.classList.remove('active'));
    bodies.forEach(b => b.classList.remove('active'));

    header.classList.add('active');
    const targetBody = document.querySelector(`.body[data-number="${number}"]`);
    if (targetBody) targetBody.classList.add('active');
  });
});
// =================================slider

let userCount = 500;
let isAnnual = false;


const basePrices = {
  free: 0,
  professional: 150, 
  team: 1250, 
  organizational: 0 
};


const baseLimits = {
  free: {
    events: 10000,
    campaigns: 20,
    workspaces: 2
  },
  professional: {
    events: 30000,
    campaigns: 50,
    retentionDays: 7
  },
  team: {
    events: 100000,
    campaigns: 200,
    workspaces: Infinity
  },
  organizational: {
    events: 5000000,
    workspaces: Infinity
  }
};


function calculatePlanData(userCount) {
  const multiplier = userCount / 1000; 
  
  return {
    free: {
      id: "free",
      title: "رایگان",
      description: "مناسب برای شروع فعالیت‌های بازاریابی دیجیتال",
      buttonText: "شروع رایگان",
      buttonClass: "green",
      getPrice: () => "۰ تومان / " + (isAnnual ? "سالانه" : "ماهانه"),
      getFeatures: () => [
        `مدیریت تا ${toPersianNumber(Math.round(baseLimits.free.events * multiplier))} رویداد در ماه`,
        "ارسال پیام از طریق ایمیل، پیامک",
        `امکان ساخت تا ${toPersianNumber(Math.round(baseLimits.free.campaigns * multiplier))} کمپین یا گردش کار`,
        `${toPersianNumber(baseLimits.free.workspaces)} فضای کاری (تست و اصلی)`,
      ]
    },
    professional: {
      id: "professional",
      title: "حرفه‌ای",
      description: "مناسب برای کسب‌وکارهای مقیاس‌پذیر، برندینگ اختصاصی",
      buttonText: "شروع نسخه آزمایشی",
      buttonClass: "green",
      getPrice: () => {
        const monthlyPrice = basePrices.professional * userCount;
        const annualPrice = monthlyPrice * 12 * 0.9; // 10% discount
        const price = isAnnual ? annualPrice : monthlyPrice;
        return toPersianNumber(Math.round(price)) + " تومان / " + (isAnnual ? "سالانه" : "ماهانه");
      },
      getFeatures: () => [
        `مدیریت تا ${toPersianNumber(Math.round(baseLimits.professional.events * multiplier))} رویداد در ماه`,
        `نگهداری گزارش‌ها تا ${toPersianNumber(baseLimits.professional.retentionDays)} روز`,
        `امکان ساخت تا ${toPersianNumber(Math.round(baseLimits.professional.campaigns * multiplier))} کمپین یا گردش کار`,
        "پشتیبانی اولویت‌دار از طریق چت و تیکت",
      ]
    },
    team: {
      id: "team",
      title: "تیمی",
      description: "راه‌حل جامع برای شرکت‌ها و تیم‌های بازاریابی",
      buttonText: "شروع رایگان",
      buttonClass: "green",
      getPrice: () => {
        const monthlyPrice = basePrices.team * userCount;
        const annualPrice = monthlyPrice * 12 * 0.9; // 10% discount
        const price = isAnnual ? annualPrice : monthlyPrice;
        return toPersianNumber(Math.round(price)) + " تومان / " + (isAnnual ? "سالانه" : "ماهانه");
      },
      getFeatures: () => [
        `مدیریت تا ${toPersianNumber(Math.round(baseLimits.team.events * multiplier))} رویداد در ماه`,
        "ارسال پیام از طریق ایمیل، پیامک",
        `امکان ساخت تا ${toPersianNumber(Math.round(baseLimits.team.campaigns * multiplier))} کمپین یا گردش کار`,
        "فضای کاری نامحدود",
        "مشاوره اختصاصی",
        "SLA تضمین شده",
      ]
    },
    organizational: {
      id: "organizational",
      title: "سازمانی",
      description: "ویژه سازمان‌های بزرگ و برندهایی با نیازهای خاص",
      buttonText: "تماس با ما",
      buttonClass: "gray",
      getPrice: () => "سفارشی / " + (isAnnual ? "سالانه" : "ماهانه"),
      getFeatures: () => [
        `مدیریت بیش از ${toPersianNumber(Math.round(baseLimits.organizational.events * multiplier))} رویداد در ماه`,
        "فضای کاری نامحدود",
        "تنظیم دوره نگهداری داده سفارشی",
        "پشتیبانی اختصاصی و قرارداد SLA",
      ]
    }
  };
}


function toPersianNumber(num) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num
    .toString()
    .replace(/\d/g, (digit) => persianDigits[digit])
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// Update slider fill
function updateSliderFill() {
  let position = 0;
  if (userCount < 1000) position = 0;
  else if (userCount < 1500) position = 25;
  else if (userCount < 2000) position = 50;
  else if (userCount < 2500) position = 75;
  else position = 100;

  document.getElementById("sliderFill").style.width = position + "%";
}

// Set user count
function setUserCount(value) {
  userCount = value;
  document.getElementById("userSlider").value = value;
  updateUserCount();
  updateSliderFill();
  updateMarkerStates();
  renderPricingCards();
}


function updateUserCount() {
  const persianCount = toPersianNumber(userCount);
  document.getElementById("currentUserCount").textContent =
    persianCount + " کاربر";
  document.getElementById(
    "currentUsersText"
  ).textContent = `در حال حاضر، پلتفرم ما بیش از ${persianCount} کاربر فعال دارد!`;
}


function updateMarkerStates() {
  const markers = document.querySelectorAll(".slider-marker");
  markers.forEach((marker) => {
    const value = parseInt(marker.getAttribute("data-value") || "0");
    if (value === 0) {
      marker.classList.toggle("active", userCount < 1000);
    } else {
      marker.classList.toggle("active", userCount >= value);
    }
  });
}


function setPeriod(annual) {
  isAnnual = annual;
  document.getElementById("monthlyBtn").classList.toggle("active", !annual);
  document.getElementById("annualBtn").classList.toggle("active", annual);

  renderPricingCards();
}

function renderPricingCards() {
  const grid = document.getElementById("pricingGrid");
  grid.innerHTML = "";


  const planData = calculatePlanData(userCount);
  const planOrder = ['free', 'professional', 'team', 'organizational'];

  planOrder.forEach((key) => {
    const plan = planData[key];
    const card = document.createElement("div");
    card.className = "pricing-card";

    const price = plan.getPrice();
    const features = plan.getFeatures();

    card.innerHTML = `
    <div class="pricing-header">
      <span class="title">${plan.title}</span>
      <p class="pricing-price">${price}</p>
      <p class="pricing-description">${plan.description}</p>
      <button class="pricing-btn ${plan.buttonClass}" onclick="handlePlanClick('${plan.id}')">
        ${plan.buttonText}
      </button>
      </div>
      <div class="pricing-features">
        ${features
          .map(
            (feature) => `
          <div class="feature-item">
            <i class="fas fa-check"></i>
            <span>${feature}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    grid.appendChild(card);
  });
}


function handlePlanClick(planId) {
  console.log("Plan selected:", planId);
}


function handleQuestionClick() {
  console.log("Question clicked");
}


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("userSlider");
  slider.addEventListener("input", (e) => {
    setUserCount(parseInt(e.target.value));
  });

  updateSliderFill();
  updateMarkerStates();
  renderPricingCards();
});
// =================================slider

