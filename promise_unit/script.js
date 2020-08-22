const $number_form_button = $(".number-form button");
const $favorite_number = $("#favorite-number");
const $number_box = $(".number-box");

//promises
// let numPromises = [];

// $number_form_button.on('click', function(e){
//     e.preventDefault();
//     let fave_num = $favorite_number[0].value;
//     for(let i = 0; i < 5; i++){
//         let res = get_number(parseInt(fave_num));
//         numPromises.push(res);
//     }
//     Promise.all(numPromises)
//     .then(numArr => (
//         numArr.forEach(data => $number_box.append(add_number_fact(data.data)))
//       ))
//     .catch(error => console.log(error))

// })


// function get_number(number){
//     return new Promise((resolve, reject) => {
//         let response = axios.get(`http://numbersapi.com/${number}?JSON`);
//         resolve(response);
//         reject(response);
//     });
// }



// function add_number_fact(data){
//     let html = 
//     `
//     <p class="number-fact">${data}</p>
//     `;
//     return html
// }

//asynchronous

$number_form_button.on('click', async function(e){
    e.preventDefault();
    let fave_num = $favorite_number[0].value;
    let fact = await get_number(fave_num);
    $number_box.append(add_number_fact(fact.data));

})

async function get_number(number){
    let response = await axios.get(`http://numbersapi.com/${number}?JSON`);
    console.log(response);
    return response;
};

function add_number_fact(data){
    let html = 
    `
    <p class="number-fact">${data}</p>
    `;
    return html
}