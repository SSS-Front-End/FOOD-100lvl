// let user = {
//     name: "Санджар",
//     surname: "Султанов",
//     get fullName () {
//         return `${this.name} ${this.surname}`
//     },
//     set fullName (a) {
//         let arr = a.split(" ");
//         this.name = arr[0];
//         this.surname = arr[1];
//     }
// }

// console.log(user);

// user.fullName = "Амаль Султанов"
// console.log(user.fullName);
// console.log(user);

const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get totalKcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get totalKcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get totalKcall() {
            return this.kcall * this.amount;
        }
    }
}

// product.plainBurger.amount = 5
// console.log(product.plainBurger.totalKcall);

const ingredient = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    }
}

const btn = document.querySelectorAll('.main__product-btn');
// console.log(btn);
for (let i = 0; i < btn.length; i++) {
    const element = btn[i];
    element.addEventListener("click", function () { 
        addProduct(this)
     })
}

function addProduct(button) {
    let parent = button.closest(".main__product");
    // elem.getAttribute(name) -возвращает значение атрибута
    // elem.setAttribute(name, value) - добавляет атрибут со значением
    // elem.hasAttribute(name, value) - проверяет наличие атрибута
    // elem.removeAttribute(name, value) - удаляет атрибут
    let parentId = parent.getAttribute("id")
    let buttonData = button.getAttribute("data-symbol")
    if (buttonData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (product[parentId].amount > 0 && buttonData == "-") {
        product[parentId].amount--;
    }
    let num = parent.querySelector('.main__product-num');
    let price = parent.querySelector(".main__product-price span");
    let kcall = parent.querySelector('.main__product-kcall span');
    num.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].summ;
    kcall.innerHTML = product[parentId].totalKcall;
}

let chek = document.querySelectorAll('.main__product-checkbox');

for (let i = 0; i < chek.length; i++) {
    const element = chek[i];
    element.addEventListener("click", function () {
        addIngr(this)
    })
}

function addIngr(checkbox) {
    let parent = checkbox.closest(".main__product");
    let parentId = parent.getAttribute("id");
    let checkAttr = checkbox.getAttribute("data-extra");
    product[parentId][checkAttr] = checkbox.checked;
    if (product[parentId][checkAttr]) {
        product[parentId].price += ingredient[checkAttr].price;
        product[parentId].kcall += ingredient[checkAttr].kcall;
    } else {
        product[parentId].price -= ingredient[checkAttr].price;
        product[parentId].kcall -= ingredient[checkAttr].kcall;
    }
    let price = parent.querySelector(".main__product-price span");
    let kcall = parent.querySelector('.main__product-kcall span');
    price.innerHTML = product[parentId].summ;
    kcall.innerHTML = product[parentId].totalKcall;
}

let addCart = document.querySelector('.addCart');
let receipt = document.querySelector('.receipt');
let receipt__window = document.querySelector('.receipt__window');
let receipt__windowOut = document.querySelector('.receipt__window-out');
let receipt__windowBtn = document.querySelector('.receipt__window-btn'); 

let arrProd = [];
let resultText = "";
let resultKcall = 0;
let resultPrice = 0;

addCart.addEventListener("click", function () {
    for (const key in product) {
        let objProd = product[key];
        if (objProd.amount > 0) {
            arrProd.push(objProd);
            objProd.name += ` <b>x${objProd.amount}</b>`;
            for (const y in objProd) {
                if (objProd[y] === true) {
                    // "\n" - перенос на следующую строку (символ коретки)
                    objProd.name += "\n" + ingredient[y].name;
                }
            }
        }
    }
    console.log(arrProd);
    for (let i = 0; i < arrProd.length; i++) {
        const element = arrProd[i];
        resultText += `\n${element.name}\n`;
        resultPrice += element.summ;
        resultKcall += element.totalKcall;
    }

    receipt__windowOut.innerHTML = `Вы купили: \n ${resultText} \n Каллорийность: ${resultKcall} \n Стоимость покупки: ${resultPrice} сумм`;

    receipt.style.display = "flex";
    setTimeout(() => {
        receipt.style.opacity = 1;
        receipt__window.style.top = 0;
    }, 10);

    document.body.style.overflow = "hidden";
    let allProduct = document.querySelectorAll('.main__product-num');
    let price = document.querySelectorAll('.main__product-price span');
    let allCall = document.querySelectorAll('.main__product-kcall span');

    for (let i = 0; i < allProduct.length; i++) {
        allProduct[i].innerHTML = 0;
        price[i].innerHTML = 0;
        allCall[i].innerHTML = 0;
    }

  })

  receipt__windowBtn.addEventListener("click", function () {
    window.location.reload();
})
  console.log(window);

// LOGO =============================================//

const lvl = document.querySelector(".header__timer-extra");
let speed = 20 ;

function rec(i=0) {
    lvl.innerHTML = i;
    i++;
    if (i > 50 && i < 75) {
        speed = 50;
    } else if(i >= 75 && i < 85) {
        speed = 80;
    } else if(i >= 85 && i < 95) {
        speed = 120;
    } else if(i >= 95) {
        speed = 170;
    } 

    if (i <= 100) {
        setTimeout(() => {
            rec(i);
        }, speed);
    }

}

rec()

// Модальное окно

const view = document.querySelector('.view');
const viewClose = document.querySelector('.view__close');
const viewImg = view.querySelector('img');
const productImg = document.querySelectorAll('.main__product-info');

for (let i = 0; i < productImg.length; i++) {
    const element = productImg[i];
    element.addEventListener("dblclick", function () {
        view.classList.add("active");
        const img = this.querySelector("img").getAttribute("src");
        viewImg.setAttribute("src", img)
    })
}

viewClose.addEventListener("click", function () {
    view.classList.remove("active")
  })