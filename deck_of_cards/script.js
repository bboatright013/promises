const $get_card = $(".get-deck button");
const $cards = $(".cards");

let deck_id;
$( document ).ready(get_a_deck().then(function(data){
    deck_id= data.data.deck_id;
    console.log(deck_id);
})
.catch(function(data){
    console.log(data);
}));

function get_a_deck(){
    return new Promise((resolve, reject) => {
        const result = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        console.log(result);
        resolve(result);
        reject(result);
    })
}

$get_card.on('click', function(e){
    e.preventDefault();
    draw_card(deck_id, 1).then(function(data){
        console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
        $cards.append(post_card(data.data.cards[0].image));
    }).catch(error => console.log(error));
});

// $get_card.on('click', function(e){
//     e.preventDefault();
//     draw_card(deck_id, 2).then(function(data){
//         console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit} & ${data.data.cards[1].value} of ${data.data.cards[1].suit}`);
//     }).catch(error => console.log(error));
// });

function draw_card(deck_id, num){
    return new Promise((resolve, reject) => {
        const result = axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`);
        console.log(result);
        resolve(result);
        reject(result);
    })
}

function post_card(url){
    let html = 
    `
    <img src='${url}'>
    `;
    return html;
}