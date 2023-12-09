const d= document;
const $openRulesBtn= d.querySelector(".btn-open-rules"),
 $closeRulesBtn= d.querySelector("#close-modal-rules"),
 $modalRules= d.querySelector(".rules");


d.addEventListener("click", e => {
    if(e.target===$openRulesBtn){
        $modalRules.classList.remove("d-none");
    }
    
    if(e.target===$closeRulesBtn){
        $modalRules.classList.add("d-none");
    }
});

