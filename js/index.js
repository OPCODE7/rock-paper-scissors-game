const d = document;
const $openRulesBtn = d.querySelector(".btn-open-rules"),
    $closeRulesBtn = d.querySelector("#close-modal-rules"),
    $modalRules = d.querySelector(".rules"),
    $imgYourObject = d.querySelector("#set-your-object"),
    $imgHouseObject = d.getElementById("set-house-object"),
    $stepOne = d.querySelector(".step-1"),
    $stepTwo = d.querySelector(".step-2"),
    $resultText = d.querySelector(".who-whin"),
    $containerResults = d.querySelector(".results"),
    $score = d.querySelector("#score"),
    $btnChangeGameVersion = d.querySelector(".v2"),
    $stepOneV2 = d.querySelector(".step-1-v2");

const srcImgObjects = ["images/icon-paper.svg", "images/icon-scissors.svg", "images/icon-rock.svg"];
const objGradients = {
    "images/icon-paper.svg": "paper-gradient",
    "images/icon-scissors.svg": "scissors-gradient",
    "images/icon-rock.svg": "rock-gradient"
}

let score = 0;

d.addEventListener("DOMContentLoaded", e => {
    $score.textContent = localStorage.getItem("score");
});

d.addEventListener("click", e => {
    if (e.target === $openRulesBtn) {
        $modalRules.classList.remove("d-none");
    }

    if (e.target === $closeRulesBtn) {
        $modalRules.classList.add("d-none");
    }

    if (e.target.matches("#option-to-pick")) {
        $imgYourObject.src = e.target.firstElementChild.getAttribute("src");
        $stepTwo.classList.remove("d-none");
        $stepOne.classList.add("d-none");
        automaticSelection();
        $imgYourObject.parentElement.classList.add(objGradients[$imgYourObject.getAttribute("src")]);
    }

    if (e.target.matches("#option-to-pick > *")) {
        $imgYourObject.src = e.target.getAttribute("src");
        $stepTwo.classList.remove("d-none");
        $stepOne.classList.add("d-none");
        automaticSelection();
        $imgYourObject.parentElement.classList.add(objGradients[$imgYourObject.getAttribute("src")]);
    }

    if (e.target.matches("#play-again")) {
        $containerResults.classList.add("d-none");
        $stepTwo.classList.add("d-none");
        $stepOne.classList.remove("d-none");


        if ($imgHouseObject.parentElement.classList.contains("winner-shadow")) {
            $imgHouseObject.parentElement.classList.remove("winner-shadow");
        } else if ($imgYourObject.parentElement.classList.contains("winner-shadow")) {
            $imgYourObject.parentElement.classList.remove("winner-shadow");
        }

        for (const key in objGradients) {
            if ($imgYourObject.parentElement.classList.contains(objGradients[key])) {
                $imgYourObject.parentElement.classList.remove(objGradients[key]);
            }

            if ($imgHouseObject.parentElement.classList.contains(objGradients[key])) {
                $imgHouseObject.parentElement.classList.remove(objGradients[key]);
            }


        }
    }

    if (e.target === $btnChangeGameVersion) {
        if (e.target.id === "game-v2") {
            e.target.textContent = "PROBAR V2";
            $stepOne.classList.remove("d-none");
            $stepOneV2.classList.add("d-none");
            e.target.id= "game-v1";
        } else if (e.target.id==="game-v1") {
            e.target.textContent = "ORIGINAL VERSION";
            $stepOne.classList.add("d-none");
            $stepOneV2.classList.remove("d-none");
            e.target.id= "game-v2";
        }
    }
});

function automaticSelection() {
    let currentGradient = "";
    let randomIndex = Math.floor(Math.random() * 3);
    let iterator = -1;
    let interval = setInterval(() => {
        iterator++;
        if (iterator == 3) iterator = 0;
        $imgHouseObject.src = srcImgObjects[iterator];
        currentGradient = objGradients[$imgHouseObject.getAttribute("src")];

        $imgHouseObject.parentElement.setAttribute("class", `picked-img control-default-desing ${currentGradient}`);

    }, 300);

    setTimeout(() => {
        clearInterval(interval);

        $imgHouseObject.src = srcImgObjects[randomIndex];
        $imgHouseObject.parentElement.classList.remove(currentGradient);
        $imgHouseObject.parentElement.classList.add(objGradients[$imgHouseObject.getAttribute("src")]);
        let result = whoWin($imgYourObject.parentElement.getAttribute("class").split(' ').pop(), $imgHouseObject.parentElement.getAttribute("class").split(' ').pop());
        $containerResults.classList.remove("d-none");
        $resultText.textContent = result;
        if (result === "YOU WIN") {
            $imgYourObject.parentElement.classList.add("winner-shadow");
        } else if (result === "HOUSE WIN") {
            $imgHouseObject.parentElement.classList.add("winner-shadow");
        }

        localStorage.setItem("score", score);
        $score.textContent = localStorage.getItem("score");
    }, 4000);
}

function whoWin(yourSelection, houseSelection) {
    let result = "";
    if (yourSelection === houseSelection) {
        result = "DRAW";
    } else if ((yourSelection === "scissors-gradient" && houseSelection === "paper-gradient") ||
        (yourSelection === "paper-gradient" && houseSelection === "rock-gradient") || (yourSelection === "rock-gradient" && houseSelection === "scissors-gradient")) {
        result = "YOU WIN";
        score++;
    } else if ((houseSelection === "scissors-gradient" && yourSelection === "paper-gradient") ||
        (houseSelection === "paper-gradient" && yourSelection === "rock-gradient") || (houseSelection === "rock-gradient" && yourSelection === "scissors-gradient")) {
        result = "HOUSE WIN";
        if (score > 0) score--;
    }

    return result;
}
