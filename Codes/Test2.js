var difficultyLevel = 1; // Başlangıç zorluk seviyesi
var maxBasicOperatorLevel = 3; // Temel işlemler (toplama, çıkarma) seviye sınırı
var divisionOnlyThreshold = 5; // Belirtilen süre sonrası sadece bölme işlemleri
var correctAnswerCount = 0; // Doğru cevap sayısı
var successThreshold = 3; // Başarı eşiği (örneğin, 3 doğru cevap)
var autoIncreaseDifficultyInterval = 5; // Otomatik zorluk artışı süresi (örneğin, her 5 saniyede bir)

var questionContainer = document.getElementById('questionContainer');
var resultMessage = document.getElementById('resultMessage');
var answerInput = document.getElementById('answerInput');

function generateQuestion() {
  var num1, num2, operator;

  if (difficultyLevel <= maxBasicOperatorLevel) {
    num1 = Math.floor(Math.random() * (10 * difficultyLevel)) + 1;
    num2 = Math.floor(Math.random() * (10 * difficultyLevel)) + 1;
    operator = Math.random() < 0.5 ? '+' : '-';
  } else if (difficultyLevel <= maxBasicOperatorLevel + 1) {
    // Çarpma işlemi
    num1 = Math.floor(Math.random() * (5 * difficultyLevel)) + 1;
    num2 = Math.floor(Math.random() * (5 * difficultyLevel)) + 1;
    operator = '*';
  } else if (difficultyLevel <= maxBasicOperatorLevel + 2) {
    // Bölme işlemi
    num2 = Math.floor(Math.random() * (3 * difficultyLevel)) + 1;
    num1 = num2 * (Math.floor(Math.random() * (5 * difficultyLevel)) + 1);
    operator = '/';
  } else {
    // Lise seviyesinde bir denklem
    num1 = Math.floor(Math.random() * (5 * difficultyLevel)) + 1;
    num2 = Math.floor(Math.random() * (5 * difficultyLevel)) + 1;
    operator = '+';
  }

  questionContainer.textContent = num1 + ' ' + operator + ' ' + num2;
}

function increaseDifficulty() {
  difficultyLevel++; // Zorluk seviyesini artır
}

function decreaseDifficulty() {
  difficultyLevel = 1; // Zorluk seviyesini sıfıra düşür
}

function checkAnswer() {
  if (answerInput.value.trim() === '') {
    resultMessage.textContent = 'Lütfen bir cevap girin!';
    return;
  }

  var userAnswer = parseFloat(answerInput.value);
  var num1 = parseFloat(questionContainer.textContent.split(' ')[0]);
  var num2 = parseFloat(questionContainer.textContent.split(' ')[2]);
  var operator = questionContainer.textContent.split(' ')[1];
  var correctAnswer;

  if (operator === '+') {
    correctAnswer = num1 + num2;
  } else if (operator === '-') {
    correctAnswer = num1 - num2;
  } else if (operator === '*') {
    correctAnswer = num1 * num2;
  } else if (operator === '/') {
    correctAnswer = num1 / num2;
  }

  if (userAnswer === correctAnswer) {
    resultMessage.textContent = 'Tebrikler, doğru cevap!';
    correctAnswerCount++;
    if (correctAnswerCount >= successThreshold) {
      resultMessage.textContent += ' Harika, başarı eşiğini geçtin!';
      correctAnswerCount = 0; // Başarı eşiğine ulaşıldığında sayacı sıfırla
      increaseDifficulty(); // Başarı eşiğine ulaşıldığında zorluk seviyesini artır
    }
  } else {
    var insults = [
      'Ahaha, gerçekten mi? Bu kadar basit bir soruya mı takıldın?',
      'Matematikteki becerilerin gerçekten çok özel.',
      'Bu soruyu yanlış yapmak sana özgü bir yetenek gibi görünüyor.',
      'Matematik de senin güçlü yönün gibi durmuyor.',
      'Bu soruyu kaçırdın mı, yoksa zorluk seviyesi senin için çok mu yüksek?'
    ];
    var insult = insults[Math.floor(Math.random() * insults.length)];
    resultMessage.textContent = 'Yanlış cevap! ' + insult;
    decreaseDifficulty(); // Yanlış cevap verildiğinde zorluk seviyesini düşür
  }

  // Yeni bir soru üret
  generateQuestion();
  // Cevap alanını temizle
  answerInput.value = '';
}

// Sayfa yüklendiğinde ilk soruyu oluştur
generateQuestion();

// Otomatik zorluk artışını başlat
setInterval(function () {
  increaseDifficulty();
}, autoIncreaseDifficultyInterval * 1000); // Saniye cinsinden ayarlanmış süre
