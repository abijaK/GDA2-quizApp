/*
HOME-INTERFACE
*/

// Header elements
const mainHeader = document.querySelector('.section-1')
const mainQuestion = document.querySelector('.section-2')
const mainOutput = document.querySelector('.section-3')

// Form connexion elements
const form = document.querySelector('.home-form');
// const input = document.querySelectorAll('input');
const username = document.querySelector('#name');
const nameError = document.querySelector('#warningName');
const email = document.querySelector('#email');
const emailError = document.querySelector('#warningEmail');

const startBtn = document.querySelector('#start-btn');

/* 
ELEMENT OF ALL QUESTIONS UI
*/
// Selections of containers
const questionTitle = document.querySelector('.question-title h4');
const questionNumber = document.querySelector('#question-num');
const selectedQuestionNum = document.querySelector('#leftNumber');
const totalQuestionNum = document.querySelector('#rightNumber');
const maxDelay = document.querySelector('#delay-counter');
const backDecreaseBar = document.querySelector('.back-unprogress-bar');
const decreaseBar = document.querySelector('.unprogress-bar');
const answerCover = document.querySelector('.response');
const questionAssertions = document.querySelectorAll('.response .radio-input');
const questionAssertLabel = document.querySelectorAll('.response .response-value');

const exitBtn = document.querySelector('#Exit-btn');
const nextBtn =  document.querySelector('#Next-btn');

/* Quiz-results UI */
const customerName = document.querySelector('#customer-name');
const customerEmail = document.querySelector('#customer-email');
const resultIconContainer = document.querySelector('.icon-check-result');
const checkedIcon = document.querySelector('.checked-result');
const crossedIcon = document.querySelector('.crossed-result');

let resultMaX = document.querySelector('#resultNumber');
const accueilBtn = document.querySelector('#accueil');

/*
INITIALISATION OF THE CONSTRUCTOR OF QUESTIONS
 */

class Question {
    constructor(question, answer, corrector){
        this.question = question;
        this.answer = answer;
        this.corrector = corrector;
    }
}

 const questionBank = [
    new Question(`Dans quel balise HTML plaçons-nous le code JavaScript?`, [`La balise js`,`La balise javascript`,`La balise script`,`La balise rel`],2),
    new Question(`Comment faire appelle à une fonction nommée « sum »?`, [`sum()`,`call function sum()`,`call sum()`,`aucune bonne reponse`],0),
    new Question(`Quelle est la balise pour integrer une image sur une page web ?`,[`img`,`em`,`br`,`Toutes les réponses sont vrais`],0),
    new Question(`A quoi sert la methode isNan ?`, [`Tester si la valeur est une chaine de caractères`,`Tester si la valeur est un nombre`,`Tester si la valeur est un objet`,`Tester si la valeur est un tableau`],1),
    new Question(`Comment écrivez-vous « Hello World » dans une boîte d’alerte?`,[`msg("Hello World");`,`alert("Hello World");`,`msgBox("Hello World");`,`alertBox("Hello World");`],1),
    new Question(`Comment écrire une condition IF en JavaScript?`, [`if a = 2 then`,`if a = 2`,`if a == 2 else`, `if (a == 2)`],3),
    new Question(`Comment écrire une condition IF pour vérifier si « a » n’est PAS égal à 2?`, [`if a <> 2`,`if (a != 2)`,`if a =! 2 then`,`if (a <> 2)`],1),
    new Question(`Comment créer une fonction en JavaScript?`, [`function f()`,`function = f()`,`function:f()`,`Aucune de ces réponses n’est vraie`],0),
    new Question(`Quelle est la syntaxe correcte pour vérifier la valeur de « c » ?`, [`if (c == "XYZ") then { } else { }`,`if (c = "XYZ") then { } else { }`,`if (c == "XYZ") { } else { }`,`if (c = "XYZ") { } else { }`],2),
    new Question(`Quelle est la syntaxe pour cree une constante en javascript ?`, [`tar`,`constante`,`constan`,`const`],3),
    new Question(`Dans quelle balise Html est conseillé de placer le chemin du script?`, [`html`,`head`,`body`,`footer`],2),
    new Question (`Pourquoi on met le script en bas dans la balyse body?`, [`Pour qu\'il soit lu en dernier`,`Pour le design`,`Pour le style`,`Pour la forme`],0),
    new Question(`N\'est pas une methode d\'objet en js ?`, [`compile()`,`exec()`,`test()`,`var`],3),
    new Question(`Comment declarer une expression reguliere en Js ?`, [`let regex = /expression/`,`let regex = expression`,`let regex new = expression`,`let regex = "expression"`],2),
    new Question(`Quelle est la syntaxe utiliser pour déclarer une fonction en JavaScript?`, [`define`,`function`,`def`,`fonction`],1)
 ]

/* 
INITIALISATION OF FUNCTIONS 
*/
// Username validation
const nameValidator = () => {
    let regex = /^([a-z A-Z]{4,50})$/;
    let message = 'N\’oubliez pas de renseigner votre nom avant de commencer le Quiz.';
    
    const fullName = username.value.trim();
    if (!regex.test(fullName)) {
        nameError.textContent = message;
        nameError.style.color = 'red';
        username.style.border = '1px solid red';
    }else {
        username.style.border = '1px solid none';
        nameError.textContent = '';
        return true;
    }
}

// Email validation
const emailValidator = () => {
    let regex = /^([a-zA-Z\._\-0-9]{4,250})@([a-zA-Z0-9]{3,50})\.([a-zA-Z]{2,5})$/g;
    let message = 'N\’oubliez pas de renseigner votre Email avant de commencer le Quiz.';

    const fullEmail = email.value.trim();
    if (!regex.test(fullEmail)) {
        emailError.textContent = message;
        emailError.style.color = 'red';
        email.style.border = '1px solid red';
    } else {
        email.style.border = '1px solid none';
        emailError.textContent = '';
        return true;
    }
}

/*
CHECK IF NAME & EMAIL BOTH ARE VALID TO RUN QUESTIONS OF THE QUIZ
 */ 

// store & score initialisation for questions
let store = -1;
let score = 0;
const onRunningQuestion = () => {
    if (nameValidator() && emailValidator()) {
        mainHeader.style.display = 'none';
        mainQuestion.style.display = 'block';
        nextQuestion();
    } else {
        mainHeader.style.display = 'block';
        mainQuestion.style.display = 'none';
    }
}

// GO TO THE NEXT QUESTION
const nextQuestion = () => {
    store++;
    if (store < 15) {
        selectedQuestionNum.textContent = store + 1;
        showResultOutputIcon.textContent = score;
        questionTitle.textContent = questionBank[store].question;
        questionAssertLabel.forEach((element, index) => {
        element.textContent = questionBank[store].answer[index];
        });
    }else if (store == 15) {
        mainOutput.style.display = 'block';
        mainQuestion.style.display = 'none';
        customerName.textContent = username.value;
        customerEmail.textContent = email.value;
        showResultOutputIcon(this);
        incrementScore(this);
    }
    
}

const showResultOutputIcon = () => {
    if (score < 8) {
        checkedIcon.style.display = 'none';
    } else if (score >=8) {
        crossedIcon.style.display = 'none';
    }
}

const isPressedExitBtn = () => {
    mainOutput.style.display = 'block';
    mainQuestion.style.display = 'none';
    customerName.textContent = username.value;
    customerEmail.textContent = email.value;
}

/* 
ADD A TIMER FUNCTION FOR BAR PROGRESSION
*/
let timerWidth = 100;
let startTime = 60;

counter = () => {
    if (startTime > 0) {
        questionNumber.textContent = `${startTime}`;
        timerWidth = timerWidth - (100 / 60);
        decreaseBar.style.width = `${timerWidth}%`;
        startTime--;
    } else if (startTime == 0) {
        nextQuestion();
        startTime = 60;
        timerWidth = 100;
    }
}

/* Functions to disable the button next if input are empty,
            then nextQuestion() won't be runned             */
const disabledNextBtn = () => {
    nextBtn.style.backDecreaseBar = '#028A3D';
    nextBtn.style.cursor = 'not-allowed';
}

const confirmNextQuestion = () => {
    for (let i = 0; i < questionAssertions.length; i++) {
        if (questionAssertions[i].checked) {
            nextQuestion();
            startTime = 60;
            timerWidth = 100;
        }    
    }
}

// Add function to increment the score
const incrementScore = () => {
    questionAssertions.forEach((element, index) => {
        if (element.checked && questionBank[store -1].corrector  == index) {
            store++;
            console.log(store);
        }
        element.checked = false;
    });
}

// Add function to return Home Page
const returnHomePage = () => {
    mainOutput.style.display = 'none';
    mainHeader.style.display = 'block';
}

/* 
FUNCTION FOR LISTENING EVENTS
*/
// Add Listeners for the Login Page on .section-1
username.addEventListener('input', () => {
    nameValidator(this);
});

email.addEventListener('input', () => {
    emailValidator(this);
});

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    onRunningQuestion(this);
    setInterval(counter, 1000);
    decreaseBar.style.display = 'block';
});

// Add Listeners for Question asssertions on .section-2
answerCover.addEventListener('click', () => {
    nextBtn.style.backGroundColor = 'rgb(0, 221, 255)';
    nextBtn.style.cursor = 'pointer';
});

exitBtn.addEventListener('click', () => {
    isPressedExitBtn(this);
    showResultOutputIcon(this);
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    confirmNextQuestion();
    disabledNextBtn();
    incrementScore(this);
});

// Add Listerner for Output on .section-3
accueilBtn.addEventListener('click', () => {
    returnHomePage(this);
    location.reload();
});


// form.addEventListener('click', (e) => {
//     validateInputs();
//     e.preventDefault();
// });

// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('#errorName');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('errorName');
//     inputControl.classList.remove('success')
// }


// const setSuccess = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('#errorName');

//     console.log(errorDisplay);
//     errorDisplay.innerText = message;
//     inputControl.classList.add('success');
//     inputControl.classList.remove('errorName');
// };

// const isValidEmail = email => {
//     const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/g;
//     return emailRegex.test(String(email).toLowerCase());
// }

// const validateInputs = () => {
//     const usernameValue = username.value.trim();
//     const emailValue = email.value.trim();

//     if (usernameValue === '') {
//         setError(username, 'N’oubliez pas de renseigner votre nom avant de commencer le Quiz');
//     }else if (usernameValue.length < 3) {
//         setError(username, 'Le nom doit contenir au moins 3 caractères !')
//     }else {
//         setSuccess(username, '');
//     }

//     if (emailValue === '') {
//         setError(email, 'N’oubliez pas de renseigner votre email avant de commencer le Quiz')
//     }else {
//         setSuccess(email, '');
//     }
// }

