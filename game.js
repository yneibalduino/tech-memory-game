let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'],

    cards: [],

    createCardsFromTechs: function (techs){
        game.cards = []
    
        techs.forEach((tech) => { // pega cada tech das techs
            game.cards.push(game.createPairFromTech(tech))
        })
        game.cards = game.cards.flatMap(pair => pair)
        console.log(game.cards)
    },
    
    createPairFromTech: function (tech){
        return [{
            id: game.createIdWithTech(tech),
            icon: tech,
            flipped: false
        },{
            id: game.createIdWithTech(tech),
            icon: tech,
            flipped: false 
        }]
    },
    
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random() * 1000)
    },

    shuffleCards: function (cards){
        let currentIndex = game.cards.length
        let randomIndex = 0
    
        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [game.cards[randomIndex], game.cards[currentIndex]] = [game.cards[currentIndex], game.cards[randomIndex]] /*
            essa é uma das maneiras de inverter valores no JS */
        }
    },

    setCard: function (id){
        let card = game.cards.find(card => card.id === id)
        console.log(card)
        if(game.lockMode || card.flipped || card.id === game.firstCard?.id || card.id === game.secondCard?.id){
            return false
        }
        if(!game.firstCard){
            game.firstCard = card
            return true
        } else {
            game.secondCard = card
            game.lockMode = true
            return true
        }
    },

    cardMatch: function(){
        return game.firstCard.icon === game.secondCard?.icon
    },

    clearCards: function(){
        game.firstCard = null
        game.secondCard = null
        game.lockMode = false
    },
    checkGameOver(){
        return game.cards.filter(card=>!card.flipped).length == 0
    }
}