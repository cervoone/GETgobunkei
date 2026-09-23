// ============================================================
// 5文型マスターアプリ - 問題データ
// ============================================================
//
// ★問題を追加するときの書き方★
//
// ■ 定義タイプ（「〜って何？」型）
// {
//   id: 一意の数字（他とかぶらない番号。増やすだけでOK）,
//   pattern: 0〜5（0=キホンのキ、1〜5=第1〜5文型）,
//   type: 'definition',
//   question: '問題文',
//   answer: '答え',
//   explanation: '解説文（解説ページに表示される）'
// }
//
// ■ 4択タイプ
// {
//   id: 一意の数字,
//   pattern: 0〜5,
//   type: 'choice',
//   question: '問題文',
//   choices: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
//   correctIndex: 正解が choices の何番目か（0始まり）,
//   explanation: '解説文'
// }
//
// ※ choices の並び順はアプリを開くたびに自動でシャッフルされるので、
//    ここでは正解をどこに書いても大丈夫です（correctIndexで指定する番号と
//    実際に書いた場所さえ合っていればOK）。
//
// ※ id は全体を通してユニークであれば数字が飛んでいても構いません。
//    新しい問題を足すときは、末尾に追加していくだけでOKです。
// ============================================================

const QUIZ_DATA = [

  // ---------------- pattern 0：5文型のキホンの「キ」 ----------------
 
   {
    id: 1, pattern: 0, type: 'choice',
    question: '「文の（主）要素」って何個？',
    choices: ['3つ', '4つ', '5つ', '6つ'],
    correctIndex: 1,
    explanation: '「文の（主）要素」の組み合わせで文型が決まる。文の要素はS（主語）,V（動詞）,O（目的語）,C（補語）の４つ。'
  },
  
    
  {
    id: 2, pattern: 0, type: 'definition',
    question: '英文法で「S」は何を表す記号？',
    answer: '主語（Subject）',
    explanation: 'S・V・O・Cは英文の要素を表す記号。Sはsubject（主語）の頭文字で、「〜は」「〜が」にあたる部分。'
  },
  {
    id: 3, pattern: 0, type: 'definition',
    question: '英文法で「M」は何を表す記号？',
    answer: '修飾語（Modifier）',
    explanation: 'MはModifier（修飾語）の頭文字。時・場所・様態などを表す語句で、文型そのものを決める要素にはならない。例：I live in Tokyo.のin Tokyoの部分。'
  },
  {
    id: 4, pattern: 0, type: 'choice',
    question: '英語の文型は全部でいくつに分類される？',
    choices: ['3つ', '4つ', '5つ', '6つ'],
    correctIndex: 2,
    explanation: '英語の文はS・V・O・Cの組み合わせによって第1文型〜第5文型の5種類に分類される。これは動詞の性質（自動詞か他動詞か、補語をとるかなど）による分類。'
  },
  {
    id: 5, pattern: 0, type: 'choice',
    question: '文型を決める一番の決め手は何？',
    choices: ['文の長さ', '動詞の種類', '主語の人称', '時制'],
    correctIndex: 1,
    explanation: '文型を決めるのは動詞の種類（自動詞か他動詞か、補語を要求するかなど）。同じ動詞でも使い方によって文型が変わることもある（例：look＝第1文型 look at / 第2文型 look + C）。'
  },

  // ---------------- pattern 1：第1文型（SV） ----------------
  {
    id: 11, pattern: 1, type: 'definition',
    question: '第1文型（SV）とは、どのような文？',
    answer: '主語(S)と動詞(V)だけで意味が成り立つ文。例：Birds fly.（鳥は飛ぶ。）',
    explanation: '第1文型はS+Vのみで完結する文型。動詞は「完全自動詞」と呼ばれ、目的語も補語も必要としない。live, go, happen, arriveなどが代表的。'
  },
  {
    id: 12, pattern: 1, type: 'definition',
    question: '第1文型の文で使われる「M（修飾語）」の役割は？',
    answer: '文型には含まれないが、場所や時などの情報を補う。',
    explanation: '例えばI live in Tokyo.は第1文型（S+V）で、in Tokyoは場所を説明するM（修飾語）。Mがなくても文型自体は変わらない。'
  },
  {
    id: 13, pattern: 1, type: 'choice',
    question: '次のうち第1文型の文はどれ？',
    choices: ['She is a teacher.', 'Birds fly.', 'He gave me a book.', 'I found it interesting.'],
    correctIndex: 1,
    explanation: 'Birds fly.はS(Birds)+V(fly)だけで意味が成り立つ第1文型。他の選択肢はそれぞれ補語や目的語を伴う第2〜5文型の例。'
  },
  {
    id: 14, pattern: 1, type: 'choice',
    question: '第1文型の文型記号として正しいものは？',
    choices: ['S+V', 'S+V+C', 'S+V+O', 'S+V+O+O'],
    correctIndex: 0,
    explanation: '第1文型はS+Vのみ。補語(C)や目的語(O)を伴わない、最もシンプルな文型。'
  },

  // ---------------- pattern 2：第2文型（SVC） ----------------
  {
    id: 21, pattern: 2, type: 'definition',
    question: '第2文型（SVC）とは、どのような文？',
    answer: '主語(S)＋動詞(V)＋補語(C)からなり、S＝Cの関係が成り立つ文。例：She is a teacher.（彼女は先生だ。）',
    explanation: '第2文型はbe動詞やbecome, look, seem, taste などの「連結動詞（不完全自動詞）」を使い、主語の状態や性質をCで説明する。S＝Cが成り立つのが特徴。'
  },
  {
    id: 22, pattern: 2, type: 'definition',
    question: '第2文型で使われる「C」とは何のこと？',
    answer: '補語（Complement）。主語の性質・状態を説明する語句。',
    explanation: 'CはComplement（補語）の頭文字。第2文型ではS＝C、第5文型ではO＝Cの関係になる。'
  },
  {
    id: 23, pattern: 2, type: 'choice',
    question: '次のうち第2文型の文はどれ？',
    choices: ['He runs fast.', 'This cake tastes sweet.', 'I bought a car.', 'He made her happy.'],
    correctIndex: 1,
    explanation: 'This cake tastes sweet.はThis cake（S）＝ sweet（C）の関係が成り立つ第2文型。tasteは「〜の味がする」という意味の連結動詞。'
  },
  {
    id: 24, pattern: 2, type: 'choice',
    question: '第2文型の公式として正しいものは？',
    choices: ['S＝O', 'S＝C', 'O＝C', 'S+V+O'],
    correctIndex: 1,
    explanation: '第2文型のポイントは「主語＝補語」の等式関係。これが成り立つかどうかで第2文型かどうか見分けられる。'
  },

  // ---------------- pattern 3：第3文型（SVO） ----------------
  {
    id: 31, pattern: 3, type: 'definition',
    question: '第3文型（SVO）とは、どのような文？',
    answer: '主語(S)＋動詞(V)＋目的語(O)からなる文。例：I like music.（私は音楽が好きだ。）',
    explanation: '第3文型は最も出現頻度が高い文型。動詞は「完全他動詞」で、動作や状態の対象となるO（目的語）を1つとる。'
  },
  {
    id: 32, pattern: 3, type: 'definition',
    question: '第3文型の「O」とは何のこと？',
    answer: '目的語（Object）。動詞の動作の対象となる語句。',
    explanation: 'OはObject（目的語）の頭文字。「〜を」「〜に」にあたる部分で、動詞の動作が向かう対象を表す。'
  },
  {
    id: 33, pattern: 3, type: 'choice',
    question: '次のうち第3文型の文はどれ？',
    choices: ['He is kind.', 'I play soccer.', 'She looks tired.', 'They named him John.'],
    correctIndex: 1,
    explanation: 'I play soccer.はS(I)+V(play)+O(soccer)の第3文型。soccerはplayの動作の対象（目的語）。'
  },
  {
    id: 34, pattern: 3, type: 'choice',
    question: '第3文型の公式として正しいものは？',
    choices: ['S+V', 'S+V+C', 'S+V+O', 'S+V+O+C'],
    correctIndex: 2,
    explanation: '第3文型はS+V+O。SとOの間にイコール関係はなく、Oは単に動作の対象。'
  },

  // ---------------- pattern 4：第4文型（SVOO） ----------------
  {
    id: 41, pattern: 4, type: 'definition',
    question: '第4文型（SVOO）とは、どのような文？',
    answer: '主語(S)＋動詞(V)＋目的語(O)＋目的語(O)からなり、「（人）に（物）を〜する」という意味を表す文。例：I gave him a present.（私は彼にプレゼントをあげた。）',
    explanation: '第4文型はgive, tell, show, teachなど「授与動詞」でよく使われる。目的語を2つとるのが特徴で、SVOO文型とも呼ばれる。'
  },
  {
    id: 42, pattern: 4, type: 'definition',
    question: '第4文型の2つの目的語は、それぞれ何を表す？',
    answer: '最初のOは「人（〜に）」、2番目のOは「物（〜を）」を表す。',
    explanation: '例：I gave him(人) a present(物).のように、「人に物を」の語順が基本。第3文型に書き換えるとI gave a present to him.となる。'
  },
  {
    id: 43, pattern: 4, type: 'choice',
    question: '次のうち第4文型の文はどれ？',
    choices: ['I gave him a present.', 'He is a doctor.', 'She sings well.', 'We call him Bob.'],
    correctIndex: 0,
    explanation: 'I gave him a present.はS+V+O(him)+O(a present)の第4文型。himとa presentの間にイコール関係はない点が第5文型との違い。'
  },
  {
    id: 44, pattern: 4, type: 'choice',
    question: '第4文型の公式として正しいものは？',
    choices: ['S+V+O', 'S+V+O+O', 'S+V+O+C', 'S+V+C'],
    correctIndex: 1,
    explanation: '第4文型はS+V+O+O。目的語を2つとる点が最大の特徴。'
  },

  // ---------------- pattern 5：第5文型（SVOC） ----------------
  {
    id: 51, pattern: 5, type: 'definition',
    question: '第5文型（SVOC）とは、どのような文？',
    answer: '主語(S)＋動詞(V)＋目的語(O)＋補語(C)からなり、O＝Cの関係が成り立つ文。例：We call him Bob.（私たちは彼をボブと呼ぶ。）',
    explanation: '第5文型はcall, make, name, keepなどの動詞でよく使われる。OとCがイコールの関係になる点が第4文型との大きな違い。'
  },
  {
    id: 52, pattern: 5, type: 'definition',
    question: '第5文型と第4文型の見分け方は？',
    answer: '1つ目のOと2つ目の要素がイコールの関係なら第5文型（O＝C）、単に「人」と「物」の関係なら第4文型。',
    explanation: '例：We call him Bob.（him＝Bob、第5文型） vs I gave him a present.（him≠a present、第4文型）。イコールが成り立つかどうかがポイント。'
  },
  {
    id: 53, pattern: 5, type: 'choice',
    question: '次のうち第5文型の文はどれ？',
    choices: ['I gave her a book.', 'They made her happy.', 'He runs every morning.', 'She is kind.'],
    correctIndex: 1,
    explanation: 'They made her happy.はher(O)＝happy(C)の関係が成り立つ第5文型。madeは「〜を…にする」という意味。'
  },
  {
    id: 54, pattern: 5, type: 'choice',
    question: '第5文型の公式として正しいものは？',
    choices: ['S+V+O+O', 'S+V+O+C', 'S+V+C', 'S+V+O'],
    correctIndex: 1,
    explanation: '第5文型はS+V+O+C。O＝Cの等式関係が成り立つのが最大の特徴で、第2文型（S＝C）の目的語版とイメージすると分かりやすい。'
  }

];

// ============================================================
// レベル（トップ画面のバナー）の定義
// patterns に含まれる pattern番号の問題が、そのレベルで出題される
// ============================================================
const LEVELS = [
  { key: 'kihon',   label: '5文型のキホンの「キ」', patterns: [0] },
  { key: 'p12',     label: '第1-2文型',             patterns: [1, 2] },
  { key: 'p23',     label: '第2-3文型',             patterns: [2, 3] },
  { key: 'p123',    label: '第1-2-3文型',           patterns: [1, 2, 3] },
  { key: 'p45',     label: '第4-5文型',             patterns: [4, 5] },
  { key: 'p12345',  label: '5文型全部',             patterns: [1, 2, 3, 4, 5] },
  { key: 'all',     label: '全問題',                patterns: [0, 1, 2, 3, 4, 5] }
];
