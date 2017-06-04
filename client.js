window.onload = function () {
    var now = 200;
    var later = 1000;

    function getQueryStringValue (key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    function nowClick() {
        now = now/2;
        printQuestion();
    }

    function laterClick() {
        now = now + (later-now)/2
        printQuestion();
    }

    function printQuestion() {
        document.getElementById("questionPar").innerHTML =
          "האם תעדיף לקבל " + now + " ש״ח היום, או לקבל " + later + " ש״ח בעוד חצי שנה ?" ;
    }

    var id = getQueryStringValue("id");
    document.getElementById("idPar").innerHTML = "user id = " + id;
    printQuestion();
 };