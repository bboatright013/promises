const $get_card = $(".get-deck button");
const $cards = $(".cards");
// promises
// let deck_id;
// $( document ).ready(get_a_deck().then(function(data){
//     deck_id= data.data.deck_id;
//     console.log(deck_id);
// })
// .catch(function(data){
//     console.log(data);
// }));

// function get_a_deck(){
//     return new Promise((resolve, reject) => {
//         const result = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
//         console.log(result);
//         resolve(result);
//         reject(result);
//     })
// }

// $get_card.on('click', function(e){
//     e.preventDefault();
//     draw_card(deck_id, 1).then(function(data){
//         console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
//         $cards.append(post_card(data.data.cards[0].image));
//     }).catch(error => console.log(error));
// });

// // $get_card.on('click', function(e){
// //     e.preventDefault();
// //     draw_card(deck_id, 2).then(function(data){
// //         console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit} & ${data.data.cards[1].value} of ${data.data.cards[1].suit}`);
// //     }).catch(error => console.log(error));
// // });

// function draw_card(deck_id, num){
//     return new Promise((resolve, reject) => {
//         const result = axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`);
//         console.log(result);
//         resolve(result);
//         reject(result);
//     })
// }

// function post_card(url){
//     let html = 
//     `
//     <img src='${url}'>
//     `;
//     return html;
// }
// Asynchronous
//deck class to handle the deck-id card draw and html build of a card
class Deck {
    constructor(id) {
        this.id = id;
    }
    async draw_card(){
        const result = await axios.get(`https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=1`);
        return result;
    }
    post_card(url){
        let html = 
        `
        <img src='${url}'>
        `;
        return html;
    }
}
// function to initialize the deck of cards since we cant await in a constructor
async function get_a_deck(){
    try{
        const result = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        let id = result.data.deck_id;
        deck = new Deck(id);
    }catch(e){
            console.log(e)
        }
}
//gets the new deck on page load
$( document ).ready(get_a_deck());

// user event to trigger card draw
$get_card.on('click', async function(e){
    e.preventDefault();
    let card = await deck.draw_card();
    console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
    $cards.append(deck.post_card(`${card.data.cards[0].image}`));
});

