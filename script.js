const loadingScreen =
  document.getElementById(
    "loading-screen"
  );

const app =
  document.getElementById(
    "app"
  );

const submitTab =
  document.getElementById(
    "submitTab"
  );

const logTab =
  document.getElementById(
    "logTab"
  );

const submitPage =
  document.getElementById(
    "submitPage"
  );

const logPage =
  document.getElementById(
    "logPage"
  );

const attendanceForm =
  document.getElementById(
    "attendanceForm"
  );

const logList =
  document.getElementById(
    "logList"
  );

const clickSound =
  document.getElementById(
    "clickSound"
  );

const successSound =
  document.getElementById(
    "successSound"
  );

const errorSound =
  document.getElementById(
    "errorSound"
  );

const liveClock =
  document.getElementById(
    "liveClock"
  );

const miniPopup =
  document.getElementById(
    "miniPopup"
  );

const miniPopupIcon =
  document.getElementById(
    "miniPopupIcon"
  );

const miniPopupText =
  document.getElementById(
    "miniPopupText"
  );

let selectedJob =
  "Office";

/* =========================
   LOADING SCREEN
========================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      loadingScreen.style.display =
        "none";

      app.classList.remove(
        "hidden"
      );

    }, 1800);

  }
);

/* =========================
   AUTO DATE TODAY
========================= */

document.getElementById(
  "date"
).value =
  new Date()
  .toISOString()
  .split("T")[0];

/* =========================
   SOUND
========================= */

function playClick() {

  if (!clickSound) return;

  clickSound.currentTime = 0;

  clickSound.play().catch(
    () => {}
  );

}

function playSuccess() {

  if (!successSound) return;

  successSound.currentTime = 0;

  successSound.play().catch(
    () => {}
  );

}

function playError() {

  if (!errorSound) return;

  errorSound.currentTime = 0;

  errorSound.play().catch(
    () => {}
  );

}

/* =========================
   MINI POPUP
========================= */

function showMiniPopup(
  type = "success",
  message = "Success!"
) {

  miniPopup.classList.remove(
    "hidden",
    "success",
    "error"
  );

  if (type === "success") {

    miniPopup.classList.add(
      "success"
    );

    miniPopupIcon.innerText =
      "✅";

    miniPopupText.innerText =
      message;

    playSuccess();

  } else {

    miniPopup.classList.add(
      "error"
    );

    miniPopupIcon.innerText =
      "❌";

    miniPopupText.innerText =
      message;

    playError();

  }

  miniPopup.classList.add(
    "show"
  );

  setTimeout(() => {

    miniPopup.classList.remove(
      "show"
    );

    setTimeout(() => {

      miniPopup.classList.add(
        "hidden"
      );

    }, 300);

  }, 2200);

}

/* =========================
   TAB SWITCH
========================= */

submitTab.addEventListener(
  "click",
  () => {

    playClick();

    submitTab.classList.add(
      "active"
    );

    logTab.classList.remove(
      "active"
    );

    submitPage.classList.remove(
      "hidden"
    );

    logPage.classList.add(
      "hidden"
    );

  }
);

logTab.addEventListener(
  "click",
  () => {

    playClick();

    logTab.classList.add(
      "active"
    );

    submitTab.classList.remove(
      "active"
    );

    logPage.classList.remove(
      "hidden"
    );

    submitPage.classList.add(
      "hidden"
    );

  }
);

/* =========================
   JOB TOGGLE
========================= */

const toggleButtons =
  document.querySelectorAll(
    ".toggle-btn"
  );

toggleButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        playClick();

        toggleButtons.forEach(
          (btn) => {

            btn.classList.remove(
              "active"
            );

          }
        );

        button.classList.add(
          "active"
        );

        selectedJob =
          button.dataset.job;

        document.getElementById(
          "job"
        ).value =
          selectedJob;

      }
    );

  }
);

/* =========================
   FORMAT DATE
========================= */

function formatDate(
  dateString
) {

  if (!dateString)
    return "-";

  const date =
    new Date(dateString);

  return date.toLocaleDateString(
    "en-GB",
    {

      day: "numeric",

      month: "short",

      year: "numeric"

    }
  );

}

/* =========================
   SUBMIT FORM
========================= */

attendanceForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    playClick();

    const driver =
      document
      .getElementById(
        "driver"
      )
      .value
      .trim();

    const date =
      document
      .getElementById(
        "date"
      )
      .value;

    const unit =
      document
      .getElementById(
        "unit"
      )
      .value
      .trim();

    const po =
      document
      .getElementById(
        "po"
      )
      .value
      .trim();

    const user =
      document
      .getElementById(
        "user"
      )
      .value
      .trim();

    const destination =
      document
      .getElementById(
        "destination"
      )
      .value
      .trim();

    const duration =
      document
      .getElementById(
        "duration"
      )
      .value
      .trim();

    const notes =
      document
      .getElementById(
        "notes"
      )
      .value
      .trim();

    if (
      !driver ||
      !date ||
      !unit ||
      !po ||
      !user ||
      !destination ||
      !duration
    ) {

      showMiniPopup(
        "error",
        "Please fill all fields!"
      );

      return;

    }

    const data = {

      timestamp:
        new Date().toISOString(),

      driver,

      date,

      unit,

      job:
        selectedJob,

      po,

      user,

      destination,

      duration,

      notes

    };

    try {

      await window.firebaseAddDoc(

        window.firebaseCollection(
          window.firebaseDB,
          "attendance"
        ),

        data

      );

      showMiniPopup(
        "success",
        "Success Submit!"
      );

      attendanceForm.reset();

      document.getElementById(
        "date"
      ).value =
        new Date()
        .toISOString()
        .split("T")[0];

      selectedJob =
        "Office";

      document.getElementById(
        "job"
      ).value =
        "Office";

      toggleButtons.forEach(
        (btn) => {

          btn.classList.remove(
            "active"
          );

        }
      );

      document
        .querySelector(
          '[data-job="Office"]'
        )
        .classList.add(
          "active"
        );

    } catch (error) {

      console.error(
        "Firebase Submit Error:",
        error
      );

      showMiniPopup(
        "error",
        "Submit Failed!"
      );

    }

  }
);

/* =========================
   SKELETON LOADING
========================= */

logList.innerHTML = `

  <div class="skeleton"></div>

  <div class="skeleton"></div>

  <div class="skeleton"></div>

`;

/* =========================
   FIREBASE REALTIME LOG
========================= */

window.addEventListener(
  "load",
  () => {

    try {

      const q =
        window.firebaseQuery(

          window.firebaseCollection(
            window.firebaseDB,
            "attendance"
          ),

          window.firebaseOrderBy(
            "timestamp",
            "desc"
          ),

          window.firebaseLimit(
            20
          )

        );

      window.firebaseOnSnapshot(
        q,
        (snapshot) => {

          logList.innerHTML = "";

          snapshot.forEach(
            (doc) => {

              const data =
                doc.data();

              const item =
                document.createElement(
                  "div"
                );

              item.className =
                "log-item";

              item.innerHTML = `

                <div class="driver-wrap">

                  <div class="driver-avatar">

                    ${
                      data.driver
                        ? data.driver
                            .charAt(0)
                            .toUpperCase()
                        : "?"
                    }

                  </div>

                  <span>
                    ${
                      data.driver || "-"
                    }
                  </span>

                </div>

                <span>
                  ${
                    formatDate(
                      data.date
                    )
                  }
                </span>

                <span>
                  ${
                    data.unit || "-"
                  }
                </span>

                <span>✅</span>

              `;

              logList.appendChild(
                item
              );

            }
          );

          updateTotalEntry();

        }
      );

    } catch (error) {

      console.error(
        "Firebase Realtime Error:",
        error
      );

      showMiniPopup(
        "error",
        "Firebase Error!"
      );

    }

  }
);

/* =========================
   LIVE CLOCK
========================= */

function updateClock() {

  const now =
    new Date();

  liveClock.innerText =
    now.toLocaleTimeString(
      "en-GB"
    );

}

setInterval(
  updateClock,
  1000
);

updateClock();

/* =========================
   TOTAL ENTRY
========================= */

function updateTotalEntry() {

  const total =
    document.querySelectorAll(
      ".log-item"
    ).length;

  document.getElementById(
    "totalEntry"
  ).innerText =
    total;

}

/* =========================
   RIPPLE EFFECT
========================= */

const rippleButtons =
  document.querySelectorAll(
    ".tab-btn, .toggle-btn, .submit-btn"
  );

rippleButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      function(e) {

        const ripple =
          document.createElement(
            "span"
          );

        ripple.classList.add(
          "ripple"
        );

        const rect =
          button.getBoundingClientRect();

        const size =
          Math.max(
            rect.width,
            rect.height
          );

        ripple.style.width =
          ripple.style.height =
          size + "px";

        ripple.style.left =
          e.clientX -
          rect.left -
          size / 2 + "px";

        ripple.style.top =
          e.clientY -
          rect.top -
          size / 2 + "px";

        button.appendChild(
          ripple
        );

        setTimeout(() => {

          ripple.remove();

        }, 600);

      }
    );

  }
);