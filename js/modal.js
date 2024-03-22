
function toggleModelOn(score, total) {
    $('#quizCompleted').modal('show');
    $('#quizModalBody').html(`<p>Final Score: ${score} / ${total}</p>`);
}

function toggleModelOff() {
    $('#quizCompleted').modal('hide');

    $('#quizModalBody').html("");
}

document.querySelector("#quizCompleted").addEventListener("click", (e) => {
    const action = e.target.dataset.click;

    if (action == "closeModal") {
        toggleModelOff();
        document.querySelector("#resetContainer")
            .innerHTML = `<button type="button" class="btn btn-dark text-light" data-click="resetQuiz">Reset</button>`;
    }
});