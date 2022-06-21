var inGame = false;
var time = 10;
var timer;
var switchItemsTimer;
const possibleItems = [
    {
        src: "./src/eggs.png",
        price: 32.5,
        good: true,
    },
    {
        src: "./src/beef.png",
        price: 32.5,
        good: true,
    },
    {
        src: "./src/broccoli.png",
        price: 32.5,
        good: true,
    },
    {
        src: "./src/chineseCabbage.png",
        price: 32.5,
        good: true,
    },
    {
        src: "./src/chips.png",
        price: 32.5,
        good: false,
    },
    {
        src: "./src/eggs.png",
        price: 32.5,
        good: true,
    },
    {
        src: "./src/kfc.png",
        price: 32.5,
        good: false,
    },
    {
        src: "./src/mcdonalds.png",
        price: 32.5,
        good: false,
    },
];
const goodBad = {
    "./src/eggs.png": true,
    "./src/beef.png": true,
    "./src/broccoli.png": true,
    "./src/chineseCabbage.png": true,
    "./src/chips.png": false,
    "./src/eggs.png": true,
    "./src/kfc.png": false,
    "./src/mcdonalds.png": false,
}

var moneyUsed = 0;
var itemsBought = [];

const empty_shelfItems = {
    0: {
        src: "",
        price: 0,
        good: true,
    },
    1: {
        src: "",
        price: 0,
        good: true,
    },
    2: {
        src: "",
        price: 0,
        good: true,
    },
    3: {
        src: "",
        price: 0,
        good: true,
    },
    4: {
        src: "",
        price: 0,
        good: true,
    },
    5: {
        src: "",
        price: 0,
        good: true,
    },
}

var shelfItems = structuredClone(empty_shelfItems);

function changeItem(index, src, price, good) {
    document.getElementById("item"+index+"-img").src = src;
    document.getElementById("item"+index+"-img").style.display = 'block';
    document.getElementById("item"+index+"-price").innerText = "$"+(Math.floor(price*100)/100).toFixed(2);

    shelfItems[index] = {
        src: src,
        price: price,
        good: good,
    }
}

function emptyShelf() {
    for (var i = 0; i < 6; i++) {
        changeItem(i, "", 0, true);
    }
}

function clickedItem(index) {
    if (shelfItems[index]["src"] == "") return;
    itemsBought.push(structuredClone(shelfItems[index]));
    moneyUsed += shelfItems[index]["price"];
    changeItem(index, "", 0, true);
    updateMoney();
}

function updateMoney() {
    document.getElementById("moneyUsed").innerText = (Math.floor(moneyUsed*100)/100).toFixed(2);
    document.getElementById("itemsBought").innerText = itemsBought.length;
}

window.onload = function() {
    for (var i = 0; i < 6; i++){
        document.getElementById('item'+i+'-img').ondragstart = function() { return false; };
    }
    if((new Date()).getMonth() + 1 != 6) document.getElementById('fatherCard').style.display = 'none';
}


function start() {
    document.getElementById("pre-game").style.display = "none";

    inGame = true;
    time = 10;
    moneyUsed = 0;
    itemsBought = [];

    emptyShelf();
    updateMoney();

    switchItemsTimer = setInterval(function() {
        if (Math.floor(Math.random() * 100) < 5) {
            var itemIndex = Math.floor(Math.random() * 6);
            var itemi = Math.floor(Math.random() * possibleItems.length);
            var item = possibleItems[itemi];

            changeItem(itemIndex, item["src"], item["price"], item["good"]);
            
            setTimeout(function () {
                changeItem(itemIndex, "", 0, true);
            }, Math.floor(Math.random() * 3000) + 3000);
        }
    }, 50);

    timer = setInterval(function () {
        time--;
        document.getElementById("timer").innerText = time+"s";

        if (time <= 0) {
            clearInterval(timer);
            clearInterval(switchItemsTimer);
            endGame();
        }
    }, 1000);

}


function endGame() {
    numGoodItems = 0;
    numBadItems = 0;
    boughtItemsString = "Items Bought:<br/>"
    
    for (var i = 0; i < itemsBought.length; i++) {
        let item = itemsBought[i];
        console.log(item);
        console.log(item["src"])

        if (item["src"] != "") {
            boughtItemsString += "<span style='float: left;'>"+item["src"].substring(6, item["src"].length-4)+"</span><span style='float: right;'>$"+(Math.floor(item["price"]*100)/100).toFixed(2)+"</span><br/>";
            if (item["good"] == true) {
                numGoodItems++;
            }else {
                numBadItems++;
            }
        }
    }
    
    
    statString = "Money used: $"+(Math.floor(moneyUsed*100)/100).toFixed(2)+"<br/>Number of Health Items: "+numGoodItems+'<br/>Number of Unhealthy Items: '+numBadItems;

    statString += "<br/><br/><br/>"+boughtItemsString;

    document.getElementById("stats").innerHTML = statString;

    document.getElementById("post-game").style.display = "flex";
    inGame = false;
}

function okay() {
    document.getElementById("post-game").style.display = "none";
    document.getElementById("pre-game").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll('img').forEach(function(img){
       img.onerror = function(){this.style.display='none';};
    })
 });