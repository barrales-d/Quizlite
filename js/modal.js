
function toggleModelOn(score, total, answerList) {
    $('#quizCompleted').modal('show');
    let text_style = "h3";

    let questions = `<p class="${text_style}">Final Score: <span class="text-info">${score} / ${total}</span></p>`;
    questions += "<div class='overflow-y-auto overflow-x-hidden' style='max-height: 300px;'>";
    questions += "<ol class='list-group mx-2'>";
    answerList.forEach((ans, index) => {
        let color = ans.isCorrect ? "success" : "danger";
        questions += `<li class="list-group-item">
            <h6 class="mt-2">${index + 1}. ${ans.question}</h6>
            <p class="py-1 text-${color} border border-${color} rounded">${ans.selectedAnswer}</p>
        </li>`
    });
    questions += "</ol>";
    questions += "</div>";

    $('#quizModalBody').html(questions);
}

function toggleModelOff() {
    $('#quizCompleted').modal('hide');
    $('#quizModalBody').html("");
}

$(document).ready(function () {

    document.querySelector("#quizCompleted").addEventListener("click", (e) => {
        const action = e.target.dataset.click;

        if (action == "closeModal") {
            toggleModelOff();
        }
    });

    $('#quizCompleted').on('hide.bs.modal', function (e) {
        document.querySelector("#resetContainer")
            .innerHTML = `<button type="button" class="btn btn-outline-light mb-2 w-100" data-click="resetQuiz">Reset</button>`;
    });
});