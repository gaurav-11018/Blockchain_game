const container=document.querySelector(".container")

let playerLetspace=50
let startingPoint=150
let playerbottomspace=startingPoint


const player=document.getElementsByClassName("player")[0]

function createPlayer(){
  
    player.classList.add("player") 
    player.style.bottom=playerbottomspace + "px"
    player.style.left=ground[0].left
    container.appendChild(player)
    console.log("aa")
}

class Ground{
    constructor(newGroundBottom) {
        this.bottom=newGroundBottom
        this.left=Math.random()*425
        this.visual=document.createElement("div")

        const visual=this.visual
        visual.classList.add("ground")
        visual.style.left=this.left + "px"
        visual.style.bottom=this.bottom +"px"
        container.appendChild(visual)
    }
}

let groundCount =5
let grounds =[]
function createGround(){
    for(let i=0;i<groundCount;i++){
        let groundGap=700/groundCount
        let newGroundBottom=100 +i*groundGap 
        let ground =new Ground(newGroundBottom)
        grounds.push(ground)
    }
}

function moveGrounds(){
    if(playLeftSpace>200){
        grounds.forEach(ground =>{ground.bottom -= 5 
        let visual =ground.visual
        visual.style.bottom=ground.bottom + "px"
        
        if(ground.bottom<10){
            let groundOne= grounds[0].visual
            groundOne.classList.remove("ground")
            grounds.shift()
            console.log(grounds)
            let newGround=new Ground(700)
            grounds.push(newGround)
        }
     })
    }
}

let upTimerId
let downTimerId


function jump(){
    clearInterval(downTimerId)
    isJumping=true
    upTimerId=setInterval(()=>{
        playerbottomspace +=20
        player.style.bottom=playerbottomspace+"px"
        if(playerbottomspace>startingPoint+200){
            fall()
        }
    },30);
    if(playerbottomspace<=0){
        endTheGame()
    }
    if(
        (playerbottomspace>=ground.bottom)&&
        (playerbottomspace<=ground.bottom+15)&&
        ((playerLetspace+50)>=ground.left)&&
        (playerLetspace<=(ground.left+75))&&
        (!isJumping)

    ) {
        jump()
        startingPoint=playerbottomspace
    }
}


let isGameOver =false
function startGame(){
    if(!isGameOver) {
        createPlayer()
        createGround()
        setInterval(moveGrounds(),30);
        jump()
        document.addEventListener("keyup",onKeyPress)
    }
}

function endTheGame(){
    isGameOver=true
    clearInterval(upTimerId)
    clearInterval(downTimerId)
}

function onKeyPress(event){
    if(event.key =="ArrowLeft"){
    moveLeft()
} else if(event.key =="ArrowRight"){
    moveRight()
} else if(event.key =="ArrowUp"){
    stopMoving()
  }
}

function stopMoving(){
    isGoingLeft=false
    isGoingRight=false
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
}

let isGoingLeft
let isGoingRight
let leftTimerId
let rightTimerId

function moveLeft(){
    if(isGoingRight){
        clearInterval(rightTimerId)
        isGoingRight=false
    }
    isGoingLeft=true
    leftTimerId=setInterval(()=>{
        if(playerLetspace>=0){
            playerLetspace-=5
            player.style.left=playerLetspace +"px"
        }
    },30);
}


function moveRight(){
    if(isGoingLeft){
        clearInterval(leftTimerId)
        isGoingLeft=false
    }
    isGoingRight=true
    rightTimerId=setInterval(()=>{
        if(playerLetspace<=450){
            playerLetspace+=5
            player.style.left=playerLetspace +"px"
        } else{
            moveLeft()
        }
    },30);
}

startGame()