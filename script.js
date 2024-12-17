const questions = [];
let currentQuestionIndex = 0; // Menyimpan indeks soal saat ini
let score = 0; // Menyimpan skor pengguna

// Ambil elemen input
const questionInput = document.getElementById("question");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const correctAnswer = document.getElementById("correctAnswer");
const addQuestionBtn = document.getElementById("add-question");
const startQuizBtn = document.getElementById("start-quiz");

// Tambahkan container untuk ujian
const container = document.querySelector('.container');

// Fungsi untuk menambah soal
addQuestionBtn.addEventListener("click", () => {
    if (
        questionInput.value &&
        optionA.value &&
        optionB.value &&
        optionC.value &&
        optionD.value
    ) {
        const newQuestion = {
            question: questionInput.value,
            a: optionA.value,
            b: optionB.value,
            c: optionC.value,
            d: optionD.value,
            correct: correctAnswer.value,
        };
        questions.push(newQuestion);
        alert("Soal berhasil ditambahkan!");
        clearInputs();
    } else {
        alert("Harap isi semua kolom!");
    }
});

// Fungsi untuk membersihkan input
function clearInputs() {
    questionInput.value = "";
    optionA.value = "";
    optionB.value = "";
    optionC.value = "";
    optionD.value = "";
    correctAnswer.value = "a";
}

// Logika untuk memulai ujian
startQuizBtn.addEventListener("click", () => {
    if (questions.length === 0) {
        alert("Harap tambahkan minimal satu soal sebelum memulai ujian!");
    } else {
        startQuiz();
    }
});

// Fungsi memulai ujian
function startQuiz() {
    container.innerHTML = `
        <h2 id="quiz-question"></h2>
        <ul id="quiz-options">
            <li><input type="radio" name="answer" id="a"><label for="a"></label></li>
            <li><input type="radio" name="answer" id="b"><label for="b"></label></li>
            <li><input type="radio" name="answer" id="c"><label for="c"></label></li>
            <li><input type="radio" name="answer" id="d"><label for="d"></label></li>
        </ul>
        <button id="submit-answer">Submit Jawaban</button>
    `;
    loadQuestion();
}

// Fungsi memuat soal
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = currentQuestion.question;
    document.querySelector('label[for="a"]').innerText = currentQuestion.a;
    document.querySelector('label[for="b"]').innerText = currentQuestion.b;
    document.querySelector('label[for="c"]').innerText = currentQuestion.c;
    document.querySelector('label[for="d"]').innerText = currentQuestion.d;

    // Event untuk tombol submit jawaban
    document.getElementById("submit-answer").onclick = checkAnswer;
}

// Fungsi mengecek jawaban
function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
        alert("Pilih jawaban terlebih dahulu!");
        return;
    }

    if (selectedAnswer.id === currentQuestion.correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Fungsi menampilkan hasil
function showResult() {
    container.innerHTML = `
        <h2>Hasil Ujian</h2>
        <p>Skor Anda: ${score} dari ${questions.length}</p>
        <button onclick="location.reload()">Ulangi Ujian</button>
    `;
}
function startQuiz() {
    container.innerHTML = `
        <div class="quiz-container">
            <h2 id="quiz-question"></h2>
            <ul id="quiz-options">
                <li>
                    <input type="radio" name="answer" id="a">
                    <label for="a"></label>
                </li>
                <li>
                    <input type="radio" name="answer" id="b">
                    <label for="b"></label>
                </li>
                <li>
                    <input type="radio" name="answer" id="c">
                    <label for="c"></label>
                </li>
                <li>
                    <input type="radio" name="answer" id="d">
                    <label for="d"></label>
                </li>
            </ul>
            <button id="submit-answer">Submit Jawaban</button>
        </div>
    `;
    loadQuestion();
}
