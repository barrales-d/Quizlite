let currentTab = "";

let currentQuiz = undefined;


function getInnerHTML(jqElement) { return jqElement.html().trim().toUpperCase(); }

// logic to switch to a new quiz 
function setCurrentTab(jqElement) {
    let tab = getInnerHTML(jqElement);
    if (tab === currentTab) {
        return;
    }

    currentTab = tab;

    let title = currentTab.toLowerCase();
    $('#tabTitle').html(title);
    $('#quizTitle').html(title + ' Quiz!');
    // NOTE: We restart the quiz every time you switch tabs;
    currentQuiz?.removeEventListeners();
    document.querySelector("#resetContainer").innerHTML = "";
    document.querySelector("#answerDisplay").innerHTML = "";

    currentQuiz = new Quiz(getQuestions(currentTab));
    currentQuiz.start();
}

$(document).ready(function () {

    // set first tab by default
    setCurrentTab($('#navigationTabs li:first-child a'));

    // event listener for each tab in the drop down menu to switch the quiz
    $('#navigationTabs li a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show');
        $(this).toggleClass('active');
        $(this).toggleClass('show');

        setCurrentTab($(this));
    });

    // event listener on whole document that only fires when the element has a data-click set
    // used to have multiple button have the reset functionality
    $(document).on("click", function (e) {
        const action = e.target.dataset.click;
        if (action == "resetQuiz") {
            currentQuiz.start()
            toggleModelOff()
            document.querySelector("#resetContainer").innerHTML = "";
        }
    });

})