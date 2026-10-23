const QUESTIONS = [
  {
    category: "YOUR 4 PM RESET", icon: "✿",
    question: "It's 4 pm and the day has other plans. What saves you?",
    hint: "Choose the moment that sounds most like you.",
    answers: [
      { type: "zing", text: "Loud playlist, fast walk, back in ten", quip: "Fast and focused. Noted." },
      { type: "sunny", text: "A colleague who just happens to have snacks", quip: "Everyone needs that person." },
      { type: "mellow", text: "Chai by the window, notifications off", quip: "Peace, protected." }
    ]
  },
  {
    category: "YOUR GUMMY MOOD", icon: "❋",
    question: "Which bite sounds best right now?",
    hint: "Go with the texture and flavour you would enjoy.",
    answers: [
      { type: "mellow", text: "Soft and slow, it melts as you chew", quip: "Take your time." },
      { type: "zing", text: "Sour first, sweet after, squint included", quip: "The squint is the review." },
      { type: "sunny", text: "Chewy, fruity, big enough to share", quip: "Generous. We like it." }
    ]
  },
  {
    category: "YOUR PERFECT SUNDAY", icon: "❀",
    question: "Describe your perfect Sunday.",
    hint: "Picture a day off with no obligations.",
    answers: [
      { type: "sunny", text: "Everyone's invited, the more the louder", quip: "The group chat is already buzzing." },
      { type: "mellow", text: "Late breakfast, a book, a proper nap", quip: "Nap first, plans later." },
      { type: "zing", text: "Sunrise trek, rooftop dinner, repeat", quip: "Do you ever sit down?" }
    ]
  },
  {
    category: "GUMMY RITUALS", icon: "♡",
    question: "How do you eat a gummy?",
    hint: "There is no wrong way—pick your natural instinct.",
    answers: [
      { type: "sunny", text: "Pass the pack around first", quip: "A true host." },
      { type: "zing", text: "Straight in, no ceremony", quip: "Efficient." },
      { type: "mellow", text: "One colour at a time, in order", quip: "There is a system, and it works." }
    ]
  },
  {
    category: "ONE LAST PICK", icon: "✧",
    question: "Last one. Pick a shape.",
    hint: "Which one feels most like your vibe?",
    answers: [
      { type: "zing", text: "The Spark", sub: "Quick, bright, a little sharp", quip: "Pointed choice." },
      { type: "sunny", text: "The Bead", sub: "Round, friendly, goes with everything", quip: "A classic." },
      { type: "mellow", text: "The Pillow", sub: "Soft, steady, no rush", quip: "Comfort chosen." }
    ]
  }
];

const TYPES = {
  zing: { name: "The Zing", color: "#C6E26E", shape: "zing", tagline: "Quick on your feet and first to say yes to the plan. You like a gummy with a bite.", pick: "the tangy, bold pick", code: "SOH-ZING", url: "" },
  mellow: { name: "The Mellow", color: "#F0A87A", shape: "mellow", tagline: "Calm company and the best listener in the room. You like a gummy you can take slowly.", pick: "the soft, slow-melt pick", code: "SOH-MELLOW", url: "" },
  sunny: { name: "The Sunny", color: "#F4CB55", shape: "sunny", tagline: "You bring the snacks and keep the group chat alive. You like a gummy that goes around the table.", pick: "the fruity, share-the-pack pick", code: "SOH-SUNNY", url: "" }
};
const SHOP_URL = "https://sakeofhealth.in";
const $ = (id) => document.getElementById(id);
const screens = { welcome: $("welcome-screen"), quiz: $("quiz-screen"), results: $("results-screen") };
let current = 0, selected = null, answers = [], startedAt = 0, endedAt = 0;
let soundEnabled = false, toastTimer;

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    const active = key === name;
    el.hidden = !active;
    el.classList.toggle("active", active);
  });
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
function startQuiz() {
  current = 0; selected = null; answers = []; startedAt = Date.now(); endedAt = 0;
  hideCelebration(); showScreen("quiz"); renderQuestion();
}
function renderQuestion() {
  selected = null;
  const q = QUESTIONS[current];
  const questionMain = document.querySelector(".question-main");
  questionMain.classList.remove("question-enter"); void questionMain.offsetWidth; questionMain.classList.add("question-enter");
  $("question-counter").innerHTML = `QUESTION ${String(current + 1).padStart(2, "0")} <span>/ ${String(QUESTIONS.length).padStart(2, "0")}</span>`;
  $("progress-fill").style.width = `${(current / QUESTIONS.length) * 100}%`;
  $("progress-bar").setAttribute("aria-valuenow", String(current));
  $("progress-bar").setAttribute("aria-valuemax", String(QUESTIONS.length));
  $("progress-label").textContent = `${Math.round((current / QUESTIONS.length) * 100)}% complete`;
  $("category-icon").textContent = q.icon;
  $("category-label").textContent = q.category;
  $("question-title").textContent = q.question;
  $("question-hint").textContent = q.hint;
  $("answers").innerHTML = "";
  $("feedback").hidden = true; $("feedback").className = "feedback";
  $("submit-btn").hidden = false; $("submit-btn").disabled = true;
  $("next-btn").hidden = true;
  $("answered-count").textContent = `${answers.length} of ${QUESTIONS.length} answered`;
  $("streak-number").textContent = String(answers.length);
  q.answers.forEach((answer, i) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "answer-option";
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + i)}</span><span class="answer-text"></span><span class="answer-trailing" aria-hidden="true">✓</span>`;
    button.querySelector(".answer-text").textContent = answer.text;
    if (answer.sub) {
      const sub = document.createElement("small"); sub.className = "answer-sub"; sub.textContent = answer.sub;
      button.querySelector(".answer-text").appendChild(sub);
    }
    button.addEventListener("click", () => selectAnswer(i));
    $("answers").appendChild(button);
  });
}
function selectAnswer(index) {
  // Selection only marks the choice. It never records or advances the answer.
  if (answers[current] !== undefined) return;
  selected = index;
  [...$("answers").children].forEach((button, i) => {
    button.classList.toggle("selected", i === index);
    button.setAttribute("aria-pressed", String(i === index));
  });
  $("submit-btn").disabled = false;
}
function submitAnswer() {
  // The user must explicitly press Check answer before this answer is saved.
  if (selected === null || answers[current] !== undefined) return;
  const q = QUESTIONS[current], choice = q.answers[selected];
  answers[current] = { selected, type: choice.type };
  [...$("answers").children].forEach((button, i) => {
    button.disabled = true;
    button.classList.remove("selected");
    button.classList.toggle("correct", i === selected);
    button.classList.toggle("dimmed", i !== selected);
    button.setAttribute("aria-pressed", String(i === selected));
  });
  $("submit-btn").hidden = true;
  $("next-btn").hidden = false;
  $("next-btn").innerHTML = current === QUESTIONS.length - 1 ? 'See my gummy match <span class="btn-arrow">→</span>' : 'Next question <span class="btn-arrow">→</span>';
  const feedback = $("feedback");
  feedback.hidden = false; feedback.className = "feedback good";
  feedback.innerHTML = `<span class="feedback-icon">♡</span><div><strong></strong><p></p></div>`;
  feedback.querySelector("strong").textContent = choice.quip;
  feedback.querySelector("p").textContent = "Answer saved. Continue when you're ready.";
  playTone();
  $("answered-count").textContent = `${answers.length} of ${QUESTIONS.length} answered`;
  $("progress-fill").style.width = `${(answers.length / QUESTIONS.length) * 100}%`;
  $("progress-bar").setAttribute("aria-valuenow", String(answers.length));
  $("progress-label").textContent = `${Math.round((answers.length / QUESTIONS.length) * 100)}% complete`;
  $("streak-number").textContent = String(answers.length);
}
function nextQuestion() {
  hideCelebration();
  if (answers[current] === undefined) return;
  if (current < QUESTIONS.length - 1) { current += 1; renderQuestion(); }
  else { endedAt = Date.now(); renderResults(); showScreen("results"); }
}
function pickWinner() {
  const counts = { zing: 0, mellow: 0, sunny: 0 };
  answers.forEach(a => { if (a) counts[a.type] += 1; });
  const max = Math.max(counts.zing, counts.mellow, counts.sunny);
  const tied = Object.keys(counts).filter(type => counts[type] === max);
  let winner = tied[0];
  if (tied.length > 1) {
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i] && tied.includes(answers[i].type)) { winner = answers[i].type; break; }
    }
  }
  return { winner, counts };
}
function renderResults() {
  const result = pickWinner(), type = TYPES[result.winner];
  const elapsed = Math.max(0, Math.floor(((endedAt || Date.now()) - startedAt) / 1000));
  const minutes = Math.floor(elapsed / 60), seconds = String(elapsed % 60).padStart(2, "0");
  $("results-title").innerHTML = `Your gummy match is <em>${type.name}.</em>`;
  $("score-value").textContent = result.winner.toUpperCase();
  $("score-ring").style.background = `conic-gradient(${type.color} 360deg, #e3e8d7 0deg)`;
  $("achievement").textContent = "YOUR GUMMY PERSONALITY";
  $("achievement-message").textContent = type.tagline;
  $("accuracy-value").textContent = `${result.counts[result.winner]}/5`;
  $("time-value").textContent = `${minutes}:${seconds}`;
  $("best-streak-value").textContent = "5";
  $("correct-count").textContent = String(result.counts.zing);
  $("wrong-count").textContent = String(result.counts.mellow);
  $("review-score-chip").textContent = `${result.counts.sunny} Sunny picks`;
  document.querySelector(".score-label").textContent = "YOUR GUMMY MATCH";
  document.querySelector(".score-ring-inner span").textContent = "your vibe";
  document.querySelector(".score-mini-stats > div:nth-child(1) span").textContent = "Top match picks";
  document.querySelector(".score-mini-stats > div:nth-child(2) span").textContent = "Time taken";
  document.querySelector(".score-mini-stats > div:nth-child(3) span").textContent = "Questions answered";
  document.querySelector(".metric-correct span:last-child").textContent = "Zing picks";
  document.querySelector(".metric-wrong span:last-child").textContent = "Mellow picks";
  document.querySelector(".dashboard-heading h3").textContent = "Your flavour profile";
  document.querySelector(".dashboard-progress-title span").textContent = "Sunny picks";
  document.querySelector(".dashboard-progress-title strong").textContent = `${result.counts.sunny}/5`;
  document.querySelector(".result-progress span").style.width = `${result.counts.sunny / QUESTIONS.length * 100}%`;
  document.querySelector(".result-note p").innerHTML = `<strong>Your match:</strong> ${type.pick}. ${type.tagline}`;
  $("review-list").innerHTML = "";
  QUESTIONS.forEach((q, i) => {
    const response = answers[i], choice = q.answers[response.selected];
    const card = document.createElement("article"); card.className = "review-item";
    const top = document.createElement("div"); top.className = "review-item-top";
    top.innerHTML = `<span class="review-num">QUESTION ${String(i + 1).padStart(2, "0")}</span><span class="review-status good">♡ ${typeLabel(response.type)}</span>`;
    const title = document.createElement("h4"); title.textContent = q.question;
    const your = document.createElement("p"); your.className = "review-answer";
    your.innerHTML = "<strong>Your answer:</strong> "; your.appendChild(document.createTextNode(choice.text));
    const explanation = document.createElement("p"); explanation.className = "review-explanation"; explanation.textContent = choice.quip;
    card.append(top, title, your, explanation); $("review-list").appendChild(card);
  });
  $("share-btn").setAttribute("aria-label", "Share my gummy match");
}
function typeLabel(type) { return TYPES[type].name; }
function showCelebration() {}
function hideCelebration() {
  const layer = $("celebration-layer");
  if (layer) { layer.classList.remove("show"); layer.setAttribute("aria-hidden", "true"); }
}
function playTone() {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx(), oscillator = ctx.createOscillator(), gain = ctx.createGain();
    oscillator.connect(gain); gain.connect(ctx.destination); oscillator.type = "sine";
    oscillator.frequency.value = 520; gain.gain.setValueAtTime(.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.04, ctx.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .15);
    oscillator.start(); oscillator.stop(ctx.currentTime + .16); oscillator.onended = () => ctx.close();
  } catch (_) {}
}
function showToast(message) {
  $("toast").textContent = message; $("toast").classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2500);
}
async function shareResult() {
  const result = pickWinner(), type = TYPES[result.winner];
  const text = `My Sake of Health gummy match is ${type.name}! ${type.tagline}`;
  if (navigator.share) {
    try { await navigator.share({ title: "My Sake of Health gummy match", text, url: "https://sakeofhealth.in/" }); }
    catch (err) { if (err && err.name !== "AbortError") showToast("Sharing isn’t available right now."); }
  } else if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); showToast("Your result message is copied!"); }
    catch (_) { showToast(text); }
  } else showToast(text);
}
$("start-btn").addEventListener("click", startQuiz);
$("submit-btn").addEventListener("click", submitAnswer);
$("next-btn").addEventListener("click", nextQuestion);
$("replay-btn").addEventListener("click", startQuiz);
$("share-btn").addEventListener("click", shareResult);
$("quit-btn").addEventListener("click", () => {
  if (answers.length && answers.length < QUESTIONS.length && !window.confirm("Exit the quiz? Your current progress will be lost.")) return;
  hideCelebration(); showScreen("welcome");
});
$("sound-toggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  $("sound-toggle").setAttribute("aria-pressed", String(soundEnabled));
  $("sound-toggle").title = soundEnabled ? "Turn sound effects off" : "Turn sound effects on";
  $("sound-icon").style.opacity = soundEnabled ? "1" : ".55";
  showToast(soundEnabled ? "Sound effects on" : "Sound effects off");
});
$("celebration-layer").addEventListener("click", (event) => {
  if (event.target === $("celebration-layer")) hideCelebration();
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") hideCelebration(); });
