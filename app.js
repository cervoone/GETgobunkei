// ============================================================
// 英語のねっこ！5文型マスターアプリ - アプリ本体
// ============================================================

const PATTERN_LABELS = {
  0: '5文型のキホンの「キ」',
  1: '第1文型',
  2: '第2文型',
  3: '第3文型',
  4: '第4文型',
  5: '第5文型'
};

// ---------- 画面要素 ----------
const screenHome = document.getElementById('screen-home');
const screenSettings = document.getElementById('screen-settings');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const ALL_SCREENS = [screenHome, screenSettings, screenQuiz, screenResult];

const levelListEl = document.getElementById('level-list');

const settingsTitleEl = document.getElementById('settings-title');
const totalCountEl = document.getElementById('total-count');
const startNumberInput = document.getElementById('start-number');
const numQuestionsInput = document.getElementById('num-questions');
const shuffleOrderInput = document.getElementById('shuffle-order');
const settingsError = document.getElementById('settings-error');
const btnStart = document.getElementById('btn-start');
const btnSettingsBack = document.getElementById('btn-settings-back');

const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const progressBar = document.getElementById('progress-bar');
const patternLabelEl = document.getElementById('pattern-label');
const patternNoEl = document.getElementById('pattern-no');
const questionTextEl = document.getElementById('question-text');
const answerTextEl = document.getElementById('answer-text');
const choiceListEl = document.getElementById('choice-list');
const btnReveal = document.getElementById('btn-reveal');
const judgeRow = document.getElementById('judge-row');
const btnCorrect = document.getElementById('btn-correct');
const btnWrong = document.getElementById('btn-wrong');
const btnPrevQuestion = document.getElementById('btn-prev-question');
const btnNextQuestion = document.getElementById('btn-next-question');
const btnPrevAnswer = document.getElementById('btn-prev-answer');
const btnNextAnswer = document.getElementById('btn-next-answer');
const btnQuit = document.getElementById('btn-quit');

// ---------- 解説（∨ 解説 インライン展開） ----------
const explainWrap = document.getElementById('explain-wrap');
const btnExplainToggle = document.getElementById('btn-explain-toggle');
const explainBox = document.getElementById('explain-box');
const explainText = document.getElementById('explain-text');
const btnExplainClose = document.getElementById('btn-explain-close');

const resultCorrectEl = document.getElementById('result-correct');
const resultTotalEl = document.getElementById('result-total');
const resultPercentEl = document.getElementById('result-percent');
const reviewWrap = document.getElementById('review-wrap');
const reviewList = document.getElementById('review-list');
const btnRestart = document.getElementById('btn-restart');
const btnResultHome = document.getElementById('btn-result-home');

// ---------- 状態 ----------
let currentLevel = null;
let currentPool = []; // 選んだレベルに含まれる全問題（元の並び順）
let quizItems = []; // 今回のセッションで出題する問題
let currentIndex = 0;
let itemResults = []; // quizItemsと同じ長さ。true / false / null（未回答）
let choiceOrder = []; // 4択問題のシャッフル済み選択肢キャッシュ
let chosenPos = []; // 4択問題でユーザーが選んだ位置（シャッフル後のindex）

function showScreen(el) {
  ALL_SCREENS.forEach(s => s.classList.add('hidden'));
  el.classList.remove('hidden');
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================
// ① ホーム画面
// ============================================================
function renderHome() {
  levelListEl.innerHTML = '';
  LEVELS.forEach(level => {
    const count = QUIZ_DATA.filter(item => level.patterns.includes(item.pattern)).length;
    const btn = document.createElement('button');
    btn.className = 'level-banner';
    btn.innerHTML =
      `<span>${level.label}</span><span class="level-count">${count}問</span>`;
    btn.addEventListener('click', () => openSettings(level));
    levelListEl.appendChild(btn);
  });
}

// ============================================================
// ② 設定画面
// ============================================================
function openSettings(level) {
  currentLevel = level;
  currentPool = QUIZ_DATA.filter(item => level.patterns.includes(item.pattern));
  settingsTitleEl.textContent = level.label;
  totalCountEl.textContent = currentPool.length;
  startNumberInput.value = 1;
  startNumberInput.max = currentPool.length;
  numQuestionsInput.value = Math.min(10, currentPool.length);
  settingsError.textContent = '';
  showScreen(screenSettings);
}

btnStart.addEventListener('click', () => {
  const total = currentPool.length;
  const startNumber = parseInt(startNumberInput.value, 10);
  const n = parseInt(numQuestionsInput.value, 10);

  if (!startNumber || startNumber < 1 || startNumber > total) {
    settingsError.textContent = `開始番号は 1〜${total} の範囲で入力してください。`;
    return;
  }
  if (!n || n < 1) {
    settingsError.textContent = '出題数は 1 以上で入力してください。';
    return;
  }
  const endNumber = startNumber + n - 1;
  if (endNumber > total) {
    settingsError.textContent =
      `No.${startNumber} から ${n} 個だと No.${endNumber} まで必要です。No.${total} 以内になるようにしてください。`;
    return;
  }
  settingsError.textContent = '';

  let pool = currentPool.slice(startNumber - 1, startNumber - 1 + n);
  if (shuffleOrderInput.checked) {
    pool = shuffle(pool);
  }

  quizItems = pool;
  currentIndex = 0;
  itemResults = new Array(quizItems.length).fill(null);
  choiceOrder = new Array(quizItems.length).fill(null);
  chosenPos = new Array(quizItems.length).fill(null);

  showScreen(screenQuiz);
  renderQuestion('question');
});

btnSettingsBack.addEventListener('click', () => {
  showScreen(screenHome);
});

// ============================================================
// ③ クイズ画面
// ============================================================
function correctCount() {
  return itemResults.filter(v => v === true).length;
}

function buildChoiceOrder(index) {
  if (choiceOrder[index]) return choiceOrder[index];
  const item = quizItems[index];
  const order = shuffle(item.choices.map((text, i) => ({ text, isCorrect: i === item.correctIndex })));
  choiceOrder[index] = order;
  return order;
}

function isAnsweredState(mode, item) {
  return mode === 'answer' || itemResults[currentIndex] !== null;
}

function renderQuestion(mode) {
  const item = quizItems[currentIndex];
  const answered = isAnsweredState(mode, item);

  patternLabelEl.textContent = PATTERN_LABELS[item.pattern];
  patternNoEl.textContent = item.type === 'choice'
    ? `${currentIndex + 1}（選択問題）`
    : currentIndex + 1;
  progressText.textContent = `${currentIndex + 1} / ${quizItems.length}`;
  scoreText.textContent = `正解 ${correctCount()}`;
  progressBar.style.width = `${(currentIndex / quizItems.length) * 100}%`;

  questionTextEl.textContent = item.question;
  answerTextEl.textContent = item.type === 'definition' ? item.answer : '';

  if (item.type === 'definition') {
    choiceListEl.classList.add('hidden');
    choiceListEl.innerHTML = '';

    if (answered) {
      answerTextEl.classList.remove('hidden');
      judgeRow.classList.remove('hidden');
      btnReveal.classList.add('hidden');
    } else {
      answerTextEl.classList.add('hidden');
      judgeRow.classList.add('hidden');
      btnReveal.classList.remove('hidden');
    }
  } else {
    // 4択問題
    judgeRow.classList.add('hidden');
    answerTextEl.classList.add('hidden');
    choiceListEl.classList.remove('hidden');
    choiceListEl.innerHTML = '';

    if (answered) {
      btnReveal.classList.add('hidden');
    } else {
      btnReveal.classList.remove('hidden');
    }

    const order = buildChoiceOrder(currentIndex);
    order.forEach((opt, pos) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'choice-btn';
      b.textContent = opt.text;
      if (answered) {
        b.disabled = true;
        if (opt.isCorrect) {
          b.classList.add('is-correct');
        } else if (chosenPos[currentIndex] === pos) {
          b.classList.add('is-wrong');
        }
      } else {
        b.addEventListener('click', () => selectChoice(pos));
      }
      choiceListEl.appendChild(b);
    });
  }

  // 解説トグル（∨ 解説）：回答済みのときだけ表示し、開閉状態は毎回閉じた状態に戻す
  if (answered) {
    explainWrap.classList.remove('hidden');
    explainText.textContent = item.explanation || '';
  } else {
    explainWrap.classList.add('hidden');
  }
  explainBox.classList.add('hidden');
  btnExplainToggle.classList.remove('hidden');

  // ナビゲーション（問題）
  btnPrevQuestion.disabled = currentIndex === 0;
  const isLast = currentIndex === quizItems.length - 1;
  if (isLast && answered) {
    btnNextQuestion.textContent = '結果を見る';
    btnNextQuestion.disabled = false;
  } else {
    btnNextQuestion.textContent = '次の問題 →';
    btnNextQuestion.disabled = isLast;
  }

  // ナビゲーション（解答）：回答済み状態のときだけ表示
  if (answered) {
    btnPrevAnswer.classList.remove('hidden');
    btnNextAnswer.classList.remove('hidden');
    btnPrevAnswer.disabled = currentIndex === 0;
    btnNextAnswer.disabled = currentIndex === quizItems.length - 1;
  } else {
    btnPrevAnswer.classList.add('hidden');
    btnNextAnswer.classList.add('hidden');
  }
}

btnReveal.addEventListener('click', () => {
  renderQuestion('answer');
});

function judge(wasCorrect) {
  itemResults[currentIndex] = wasCorrect;
  renderQuestion('answer');
}

btnCorrect.addEventListener('click', () => judge(true));
btnWrong.addEventListener('click', () => judge(false));

function selectChoice(pos) {
  const order = choiceOrder[currentIndex];
  itemResults[currentIndex] = order[pos].isCorrect;
  chosenPos[currentIndex] = pos;
  renderQuestion('answer');
}

// ---- 解説の開閉 ----
btnExplainToggle.addEventListener('click', () => {
  explainBox.classList.remove('hidden');
  btnExplainToggle.classList.add('hidden');
});

btnExplainClose.addEventListener('click', () => {
  explainBox.classList.add('hidden');
  btnExplainToggle.classList.remove('hidden');
});

// ---- 問題そのものを行き来する「前の問題／次の問題」 ----
btnPrevQuestion.addEventListener('click', () => {
  if (currentIndex === 0) return;
  currentIndex--;
  renderQuestion('question');
});

btnNextQuestion.addEventListener('click', () => {
  if (currentIndex === quizItems.length - 1) {
    if (itemResults[currentIndex] !== null) {
      finishQuiz();
    }
    return;
  }
  currentIndex++;
  renderQuestion('question');
});

// ---- 解答を見た状態のまま行き来する「前の解答／次の解答」 ----
btnPrevAnswer.addEventListener('click', () => {
  if (currentIndex === 0) return;
  currentIndex--;
  renderQuestion('answer');
});

btnNextAnswer.addEventListener('click', () => {
  if (currentIndex === quizItems.length - 1) return;
  currentIndex++;
  renderQuestion('answer');
});

btnQuit.addEventListener('click', () => {
  showScreen(screenHome);
});

// ============================================================
// ④ 結果画面
// ============================================================
function finishQuiz() {
  progressBar.style.width = '100%';

  const total = quizItems.length;
  const correct = correctCount();
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  resultCorrectEl.textContent = correct;
  resultTotalEl.textContent = total;
  resultPercentEl.textContent = `正答率 ${percent}%`;

  const wrongItems = quizItems.filter((item, i) => itemResults[i] === false);
  if (wrongItems.length > 0) {
    reviewWrap.classList.remove('hidden');
    reviewList.innerHTML = '';
    wrongItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `【${PATTERN_LABELS[item.pattern]}】${item.question}`;
      reviewList.appendChild(li);
    });
  } else {
    reviewWrap.classList.add('hidden');
  }

  showScreen(screenResult);
}

btnRestart.addEventListener('click', () => {
  openSettings(currentLevel);
});

btnResultHome.addEventListener('click', () => {
  showScreen(screenHome);
});

// ============================================================
// 起動
// ============================================================
renderHome();
showScreen(screenHome);
