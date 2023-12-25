const d = document;
const $openRulesBtn = d.querySelector(".btn-open-rules"),
    $closeRulesBtn = d.querySelector("#close-modal-rules"),
    $modalRules = d.querySelector(".rules"),
    $imgYourObject = d.querySelector("#set-your-object"),
    $imgHouseObject = d.getElementById("set-house-object"),
    $stepOne = d.querySelector(".step-1"),
    $stepTwo = d.querySelector(".step-2");

const srcImgObjects = ["images/icon-paper.svg", "images/icon-scissors.svg", "images/icon-rock.svg"];
const objGradients = {
    "images/icon-paper.svg": "paper-gradient",
    "images/icon-scissors.svg": "scissors-gradient",
    "images/icon-rock.svg": "rock-gradient"
}


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
});


function automaticSelection() {
    $imgHouseObject.parentElement.classList.remove("shadow-bg-picked");
    $imgHouseObject.parentElement.classList.add("control-default-desing");
    let randomIndex = Math.floor(Math.random() * 3);
    let iterator = -1;
    let interval = setInterval(() => {
        iterator++;
        if (iterator == 3) iterator = 0;
        $imgHouseObject.src = srcImgObjects[iterator];
        let currentGradient= objGradients[$imgHouseObject.getAttribute("src")];

        $imgHouseObject.parentElement.setAttribute("class",`picked-img control-default-desing ${currentGradient}`);
        
    }, 300);

    setTimeout(() => {
        clearInterval(interval);
        $imgHouseObject.src = srcImgObjects[randomIndex];
        $imgHouseObject.parentElement.classList.add(objGradients[$imgHouseObject.getAttribute("src")]);
    }, 4000);
}

function whoWin(yourSelection, houseSelection) {

}
