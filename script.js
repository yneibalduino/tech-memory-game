const FRONT = "card_front"
const BACK = "card_back"
const CARD = 'card'
const ICON = 'icon'

function startGame(game){
    game.createCardsFromTechs(game.techs)
    game.shuffleCards(game.cards)
    initializeCards(game.cards)
}

startGame(game)

function restart(){
    game.clearCards()
    startGame(game)
    let gameOverLayer = document.getElementById('gameOver')
    gameOverLayer.style.display = 'none'
}

function initializeCards(cards){
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''

    cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id // cada carta tem um ID randomico
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon
        createCardContent(card, cardElement)
        cardElement.addEventListener('click', () => flipCard(cardElement))

        gameBoard.appendChild(cardElement) // coloca a carta no tabuleiro
    })
}

function flipCard(cardElement){
    if(game.setCard(cardElement.id)){
        cardElement.classList.add('flip')
        if(game.cardMatch()){
            game.firstCard.flipped = true
            game.secondCard.flipped = true
            game.clearCards()
            if(game.checkGameOver()){
                let gameOverLayer = document.getElementById('gameOver')
                gameOverLayer.style.display = 'flex'
            }
        }else if(game.secondCard){
            setTimeout(()=>{
            game.firstCard.flipped = false
            game.secondCard.flipped = false
            let firstCardView = document.getElementById(game.firstCard.id)
            let secondCardView = document.getElementById(game.secondCard.id)

            firstCardView.classList.remove('flip')
            secondCardView.classList.remove('flip')
            game.clearCards()
            
            }, 1000)
        }
    }
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if(face === FRONT){
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "imagens/" + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}