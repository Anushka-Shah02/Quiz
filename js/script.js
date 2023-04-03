function ischecked(){
    if(document.getElementById('agree').checked){
        alert("Start the quiz");
    }
    else{
        alert("Please agree with T&C");
    }
}

const start_btn=document.querySelector(".start_btn button");
const info_box=document.querySelector(".container3");
const exit_btn=info_box.querySelector(".buttons .quit");
const continue_btn=info_box.querySelector(".start");
const quiz_box=document.querySelector(".quiz_box");
const option_list=document.querySelector(".option_list");
 
// const analysis_box = quiz_box.querySelector(".container5");

start_btn.onclick = () => {
    // start_btn.classList.remove("activeStart");
     info_box.classList.add("activeInfo");
}

start_btn.addEventListener("click",function(e){
    start_btn.remove();
});

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
}


let que_count=0;
let userScore=0;
// let userPercent=0;

const next_btn=quiz_box.querySelector(".next");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// const analysis_quiz = analysis_box.querySelector(".analyze");

restart_quiz.onclick = () =>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count=0;
    let userScore=0;
    showQuestions(que_count);
    next_btn.style.display="none";

}

quit_quiz.onclick= () =>{
    window.location.reload();
} 


next_btn.onclick=()=>{

    if(que_count < questions.length -1){
        que_count++;
        showQuestions(que_count);
        next_btn.style.display="none";
    }else{
        console.log("Questions completed");
        showResultBox();
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag= '<span>' + questions[index].question +'</span>';
    let option_tag='<div class="option">'+questions[index].options[0]+'<span></span></div>'
                  +'<div class="option">'+questions[index].options[1]+'<span></span></div>'
                  +'<div class="option">'+questions[index].options[2]+'<span></span></div>'
                  +'<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for(let i=0; i < option.length ; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div> ';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

   
    if(userAns == correctAns){
        userScore += 1;
        // userPercent += 5;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML('beforeend',tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML('beforeend',crossIcon);

        for(let i=0; i < allOptions ; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }
   
    for(let i=0 ; i < allOptions ; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");   
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag=' <p>Your Result is <span>: '+ (userScore *10) + '</span> % </p>';
        scoreText.innerHTML=scoreTag;

    const med_display=document.querySelector(".med_percent");
    let median = ((userScore + 1)/2)*10;
    let medianScore='<p>Your Median score is: <span>'+median +'</span>%</p>';
    med_display.innerHTML=medianScore;

    const correct_answer=document.querySelector(".correctans");
    let correctScore = '<p>Total correct answer :<span>'+userScore+ '</span></p>';
    correct_answer.innerHTML=correctScore;

    const wrong_answer=document.querySelector(".wrongans");
    let wrong=10-userScore;
    let wrongScore = '<p>Total wrong answer :<span>'+wrong+ '</span></p>';
    wrong_answer.innerHTML=wrongScore;

    const upps = document.querySelector(".comment");

    if(userScore > 7){
        let commentTag='<span>Congrats !! Keep it up.</span>';
        upps.innerHTML=commentTag;
    }

    else if(userScore > 4){
        let commentTag='<span>Can do better !! You need More Improvement</span>';
        upps.innerHTML=commentTag;
    }

    else{
        let commentTag='<span>Upsss !! You need Serious Improvement</span>';
        upps.innerHTML=commentTag;
    }
}
