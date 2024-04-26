const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function girarCarta() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if(!hasFlippedCard) {
        // Primeiro Clique
  
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
        //Segundo Clique
        hasFlippedCard = false;
        secondCard = this;

        checarIguais();
    }
      
    function checarIguais(){
         //As cartas são iguais?
         let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

         isMatch ? desativarCartas() : desvirarCartas();
    }

    function desativarCartas(){
        firstCard.removeEventListener('click', flipcard);
        secondCard.removeEventListener('click', flipcard);

        resetarCarta();
    }

    function desvirarCartas(){
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetarCarta();
        }, 1500);       
    }
    
    function resetarCarta(){
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function misturar(){
        cards.forEach(card =>{
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();


cards.forEach(card => card.addEventListener('click', girarCarta))