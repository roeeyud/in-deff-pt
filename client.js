$(document).ready(function () {
    var originalLater = 4000;
    var now = 0;
    var later = originalLater;
    var current = 800;
    var userId;


    function getQueryStringValue (key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    function nowClick() {
        later = current;
        current = Math.round((current + now)/2);
        printQuestion();
        calcEnd(Math.abs(later - current));
    }

    function laterClick() {
        now = current;
        current = Math.round((current + later)/2);
        printQuestion();
        calcEnd(Math.abs(now - current));
    }

    function calcEnd(diff) {
        if (diff <= 1) {
            document.getElementById('the-body').className = 'show-step-2';
            $.post('/result', {id: userId, result: current});
        }
    }

    function printQuestion() {
        document.getElementById("questionPar").innerHTML =
          "האם תעדיף לקבל " + current + " ש״ח היום, או לקבל " + originalLater + " ש״ח בעוד חצי שנה ?" ;
        document.getElementById("later").innerHTML = originalLater + ' ש״ח עוד חצי שנה';
        document.getElementById("now").innerHTML = current + ' ש״ח עכשיו';
    }

    function enterUserId() {
        userId = document.getElementById( "userId").value;
        if (!userId || !userId.length) {
            return;
        }

        document.getElementById('the-body').className = 'show-step-1';
    }


    function userKeyPress(e) {
        if (e.keyCode == 13) {
            enterUserId();
            return false;
        }
    }

    var $userId = $('#userId');
    $userId.keypress(function (ev) {
        return userKeyPress(ev);
    });

    var $submit = $('#submitUserID');

    $submit.click(enterUserId);

    $('#now').click(nowClick);
    $('#later').click(laterClick);

    var id = getQueryStringValue("id");
    printQuestion();

    document.getElementById('the-body').className = 'show-step-0';
});
