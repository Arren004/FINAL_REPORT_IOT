// khoi tao cac thong so
let btn1 = document.querySelector('#btn1');
let img1 = document.querySelector('#img');
let btn2 = document.querySelector('#btn2');
// functions nut bam
// const database=firebase.database();
// const deviceRef=database.ref('quan1');

btn1.addEventListener('click', ()=>{
    img1.src = 'image/door (1).png'; 
    firebase.database().ref("thietbi1").set({dienthoai: 1})
})
btn2.addEventListener('click', ()=>{
    img1.src = 'image/door.png';
    firebase.database().ref("thietbi1").set({dienthoai: 0})
})

// khoi tao cac thong so
let btn3 = document.querySelector('#btn3');
let img2 = document.querySelector('#den');
let btn4 = document.querySelector('#btn4');
// functions nut bam
btn3.addEventListener('click', ()=>{
    img2.src = 'image/denon1.gif'; 
    firebase.database().ref("thietbi2").set({den1:1})
})

btn4.addEventListener('click', ()=>{
    img2.src = 'image/den1.png';
    firebase.database().ref("thietbi2").set({den1:0})
})



// khoi tao cac thong s
let btn5 = document.querySelector('#btn5');
let img3 = document.querySelector('#loa');
let btn6 = document.querySelector('#btn6');

// functions nut bam
btn5.addEventListener('click', ()=>{
     img3.src = 'image/air-conditioning.png' ;
     firebase.database().ref("thietbi3").set({loa:1})

})
btn6.addEventListener('click', ()=>{
    img3.src = 'image/air-conditioner.png';
    firebase.database().ref("thietbi3").set({loa: 0})

})
function showError() {
    alert(" Đang phát triễn chờ tý");
    // hoặc
    // alert("Lỗi: Vui lòng thử lại sau!");
}
function showError1() {
    alert("Ngân hàng: Sacombank\nSTK: 070119749105\nHai con sư tử thì có Web🦁");

    // hoặc
    // alert("Lỗi: Vui lòng thử lại sau!");
}
