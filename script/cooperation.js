let cards = document.querySelectorAll('.container');
function showCard (row) {

 }
for (let card of cards){
    card.onmouseover = function (){
        card.style.height = '100%'
    }
    card.onmouseout = function (){
        for (let card of cards){
            card.style.height = '60px'
        }
    }
}