var coins = 0
// import phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/+esm'
import * as apiControllor from "./api.js";
import { hideable, reAc } from './main.js';
// import 'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js';
// export default coin;

export async function snake(){
    document.getElementById('changeAc').style.display = 'none';
    const s = await apiControllor.getCurrentPlayer();
    var life = s[0].extraHealth;
    var color = 0xff0000;
    const playerColor = await s[0].selectedSkin;
    if(playerColor == "Skin-01"){
        color = 0xFF0080;
    }
    else if(playerColor == "Skin-02"){
        color = 0x00FF80;
    }
    else if(playerColor == "Skin-03"){
        color = 0x8000FF;
    }
    console.log(playerColor)
    let gridspace = 10;
    let gridX = 80;
    let gridY = 60;
    const config = {
        type: Phaser.AUTO,
        width: gridspace*gridX,
        height: gridspace*gridY,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    let player;
    let food;
    let coin;
    let poison;
    let bomb;

    let posX = 0;
    let posY = 0;
    let previousX = 0;
    let previousY = 0;

    let changeD = 0;

    let graphics;
    let graphicsfood;
    let graphicspoison;
    let graphicscoin;
    let graphicsbomb;

    let foodposX;
    let foodposY;
    let poisonposX;
    let poisonposY;
    let coinposX;
    let coinposY;
    let bombposX;
    let bombposY;
    let scoretext;
    let cointext;
    const snakePosition = [[400,300]];
    let length = 16;   // <=== set length here
    let score = 0;
    let isgameover = false;
    let minspeed = 1/16;   // change speed
    let currentspeed = 1/16;
    let Maxspeed = 1;  
    let isinsnake = true;
    let revivetext;
    let inrevivepage;
    let yesreviveButton;
    let noreviveButton;
    let invincible = false;
    let timer = 1000 
    let lifetext;
    let speedthreshold = 10;

    function preload() {
        // Preload assets if any
    }

    function create() {
        function invinciblefn() // invincible frame
        {   
            invincible = true;
            setTimeout(function() {
                invincible = false;
            }, timer);
        }
        // Create graphics object for drawing
        graphics = this.add.graphics({ fillStyle: { color: color } });
        graphicsfood = this.add.graphics({ fillStyle: { color: 0xff00ff } });
        graphicscoin = this.add.graphics({ fillStyle: { color: 0xffff00 } });
        graphicspoison = this.add.graphics({ fillStyle: { color: 0x00ff00 } });
        graphicsbomb = this.add.graphics({ fillStyle: { color: 0xffffff } });

        // Initial player position
        player = new Phaser.Geom.Rectangle(400, 300, gridspace, gridspace);

        foodposX = (Math.floor(Math.random()*gridX))*gridspace;
        foodposY = (Math.floor(Math.random()*gridY))*gridspace;
        food = new Phaser.Geom.Rectangle(foodposX, foodposY, gridspace, gridspace);

        coinposX = (Math.floor(Math.random()*gridX))*gridspace;
        coinposY = (Math.floor(Math.random()*gridY))*gridspace;
        coin = new Phaser.Geom.Rectangle(coinposX, coinposY, gridspace, gridspace);
        
        poisonposX = (Math.floor(Math.random()*gridX))*gridspace;
        poisonposY = (Math.floor(Math.random()*gridY))*gridspace;
        poison = new Phaser.Geom.Rectangle(poisonposX, poisonposY, gridspace, gridspace);

        bombposX = (Math.floor(Math.random()*gridX))*gridspace;
        bombposY = (Math.floor(Math.random()*gridY))*gridspace;
        bomb = new Phaser.Geom.Rectangle(bombposX, bombposY, gridspace, gridspace);

        graphics.fillRectShape(player);
        graphics.fillRect(snakePosition[0][0],snakePosition[0][1],gridspace,gridspace);
        graphicsfood.fillRectShape(food);
        graphicscoin.fillRectShape(coin);
        graphicspoison.fillRectShape(poison);
        graphicsbomb.fillRectShape(bomb);
        console.log(`x: ${foodposY}, y: ${foodposX}`);
        
        scoretext = this.add.text(10,10,'Score : ' + score,{ fontFamily: 'Arial', fontSize: 18, color: '#ff0000' });
        cointext = this.add.text(100,10,'Coin : ' + coin,{ fontFamily: 'Arial', fontSize: 18, color: '#ff0000' });
        lifetext =this.add.text(700,10,"Life : " + life ,{ fontFamily: 'Arial', fontSize: 18, color: '#ff0000' });
        lifetext.setVisible(false);
        revivetext =this.add.text(300,250,"Revive? ",{ fontFamily: 'Arial', fontSize: 60, color: '#ff0000' });
        revivetext.setVisible(false);
        yesreviveButton = this.add.text(500, 350, 'Yes', { fontFamily: 'Arial', fontSize: 20, color: '#ff0000' })
        yesreviveButton.setOrigin(0.5);
        yesreviveButton.setPadding(10);
        yesreviveButton.setStyle({ backgroundColor: '#111' });
        yesreviveButton.setInteractive({ useHandCursor: true });
        yesreviveButton.on('pointerdown', function(){
            //console.log('pointerover');
            if (life >= 1) {
                life -= 1;
                isgameover = false;
                invinciblefn();
                yesreviveButton.setVisible(false);
                noreviveButton.setVisible(false);
                revivetext.setVisible(false);
                lifetext.setVisible(false);
                lifetext.setText("Life : " + life);
            }
        });
        yesreviveButton.setVisible(false);
        yesreviveButton.disableInteractive();

        noreviveButton = this.add.text(300, 350, 'No', { fontFamily: 'Arial', fontSize: 20, color: '#ff0000' })
        noreviveButton.setOrigin(0.5);
        noreviveButton.setPadding(10);
        noreviveButton.setStyle({ backgroundColor: '#111' });
        noreviveButton.setInteractive({ useHandCursor: true });
        noreviveButton.on('pointerdown', function(){
            //console.log('pointerover');
            yesreviveButton.setVisible(false);
            noreviveButton.setVisible(false);
            revivetext.setVisible(false);
            inrevivepage = false;
            lifetext.setVisible(false);
                    
        });
        noreviveButton.setVisible(false);
        noreviveButton.disableInteractive();

        document.addEventListener('keypress', function(e){
            if (e.key == 'w'){
                posX = 0;
                posY = -1 * gridspace;
                changeD = 1;
            }
            if (e.key == 'a'){
                posX = -1 * gridspace;
                posY = 0;
                changeD = 1;
            }
            if (e.key == 's'){
                posX = 0;
                posY = 1 * gridspace;
                changeD = 1;
            }
            if (e.key == 'd'){
                posX = 1 * gridspace;
                posY = 0;
                changeD = 1;
            }
        // console.log(`x: ${posX}, y: ${posY}`);
        } )
        
    }

    async function update() {
        console.log(`${invincible}`);
        if(!isgameover){
            if(changeD == 1){//change direction
                if ((previousX == -1 * gridspace && posX == gridspace) ||(previousX == gridspace && posX == -1 * gridspace)||(previousY == -1 * gridspace && posY == gridspace)||(previousY == gridspace && posY == -1 * gridspace)){
                    posX = previousX;
                    posY = previousY;
                    player.x += posX*currentspeed;      //cant change up-down, left-right 
                    player.y += posY*currentspeed;
                    changeD = 0;
                }
                else if((gridspace - 0.001 < player.x % gridspace || player.x % gridspace <= 0.001) && (gridspace - 0.001 < player.y % gridspace || player.y % gridspace <= 0.001)){
                    player.x += posX*currentspeed;
                    player.y += posY*currentspeed;      //move in grid 
                    changeD = 0;
                }
                else{
                    player.x += previousX*currentspeed;
                    player.y += previousY*currentspeed; 
                }
            }
            else{
                player.x += posX*currentspeed;
                player.y += posY*currentspeed;
                previousX = posX;                       //not change direction
                previousY = posY;
            }
            //console.log(`${player.x}, ${player.y}, ${speed}`);
            //console.log(`${snakePosition}`,snakePosition.length);
            const distancefood = Phaser.Math.Distance.Between(player.x, player.y, food.x, food.y);
            const distancecoin = Phaser.Math.Distance.Between(player.x, player.y, coin.x, coin.y);
            const distancepoison = Phaser.Math.Distance.Between(player.x, player.y, poison.x, poison.y);
            const distancebomb = Phaser.Math.Distance.Between(player.x, player.y, bomb.x, bomb.y);
            snakePosition.push([player.x,player.y]);
            if (snakePosition.length > Math.floor((length/currentspeed)+2) && snakePosition.length > 2){ // set length
                //console.log("dwd");
                snakePosition.shift();
                snakePosition.shift(); //move
            }
            else if(snakePosition.length == Math.floor((length/currentspeed))+1){ 
                snakePosition.shift();
            }
            if (distancefood < 0.01) {//check eat food
                isinsnake = true;
                while (isinsnake){
                    food.x = (Math.floor(Math.random()*gridX))*gridspace;
                    food.y = (Math.floor(Math.random()*gridY))*gridspace;
                    isinsnake = false;
                    for (let index = 0; snakePosition < snakePosition.length; index++) {
                        const element = snakePosition[index];
                        if(Phaser.Math.Distance.Between(element[0], element[1], food.x, food.y) < 0.001 || (food.x == poison.x && food.y == poison.y) || (food.x == coin.x && coin.y == poison.y) || (food.x == bomb.x && food.y == bomb.y)){
                            food.x = (Math.floor(Math.random()*gridX))*gridspace;
                            food.y = (Math.floor(Math.random()*gridY))*gridspace;
                            isinsnake = true;
                            break;
                        }
                    }
                    
                }
                graphicsfood.clear();
                graphicsfood.fillRectShape(food);
                length += 1;
                score += 1;
                isscorechange = true;
            }
            if (distancecoin < 0.01) {//check eat coin
                isinsnake = true;
                while (isinsnake){
                    coin.x = (Math.floor(Math.random()*gridX))*gridspace;
                    coin.y = (Math.floor(Math.random()*gridY))*gridspace;
                    isinsnake = false;
                    for (let index = 0; snakePosition < snakePosition.length; index++) {
                        const element = snakePosition[index];
                        if((Phaser.Math.Distance.Between(element[0], element[1], coin.x, coin.y) < 0.001) || (coin.x == poison.x && coin.y == poison.y)|| (coin.x == food.x && coin.y == food.y) || (coin.x == bomb.x && coin.y == bomb.y)){
                            coin.x = (Math.floor(Math.random()*gridX))*gridspace;
                            coin.y = (Math.floor(Math.random()*gridY))*gridspace;
                            isinsnake = true;
                            break;
                        }
                    }
                }
                graphicscoin.clear();
                graphicscoin.fillRectShape(coin);
                coins++;
            }
            if (distancepoison < 0.01) {//check eat poison
                isinsnake = true;
                while (isinsnake){
                    poison.x = (Math.floor(Math.random()*gridX))*gridspace;
                    poison.y = (Math.floor(Math.random()*gridY))*gridspace;
                    isinsnake = false;
                    for (let index = 0; snakePosition < snakePosition.length; index++) {
                        const element = snakePosition[index];
                        if((Phaser.Math.Distance.Between(element[0], element[1], poison.x, poison.y) < 0.001) || (poison.x == food.x && poison.y == food.y) || (poison.x == coin.x && poison.y == coin.y) || (poison.x == bomb.x && poison.y == bomb.y)){
                            poison.x = (Math.floor(Math.random()*gridX))*gridspace;
                            poison.y = (Math.floor(Math.random()*gridY))*gridspace;
                            isinsnake = true;
                            break;
                        }
                    }
                }
                graphicspoison.clear();
                graphicspoison.fillRectShape(poison);
                score -= 5;
            }

            if (distancebomb < 0.01) {//check eat bomb
                isinsnake = true;
                while (isinsnake){
                    bomb.x = (Math.floor(Math.random()*gridX))*gridspace;
                    bomb.y = (Math.floor(Math.random()*gridY))*gridspace;
                    isinsnake = false;
                    for (let index = 0; snakePosition < snakePosition.length; index++) {
                        const element = snakePosition[index];
                        if((Phaser.Math.Distance.Between(element[0], element[1], bomb.x, bomb.y) < 0.001) || (bomb.x == food.x && bomb.y == food.y) || (bomb.x == coin.x && bomb.y == coin.y) || (bomb.x == poison.x && bomb.y == poison.y)){
                            bomb.x = (Math.floor(Math.random()*gridX))*gridspace;
                            bomb.y = (Math.floor(Math.random()*gridY))*gridspace;
                            isinsnake = true;
                            break;
                        }
                    }
                }
                isgameover = true;
                inrevivepage = true;
                graphicsbomb.clear();
                graphicsbomb.fillRectShape(bomb);
            }

            for (let index = 0; index < snakePosition.length-1; index++) {//check hit snake
                if(posX != 0 || posY != 0){
                    if (Phaser.Math.Distance.Between(player.x, player.y, snakePosition[index][0], snakePosition[index][1]) < 0.001){
                        console.log(`Game over`);
                        isgameover = true;
                        inrevivepage = true;
                    }
                }
            }
            if (player.x < 0 || player.x >= 800 || player.y < 0 || player.y >= 600){//check hit wall
                console.log(`Game over`);
                isgameover = true;
                inrevivepage = true;
            }
            if(currentspeed < Maxspeed){
                currentspeed = Math.pow(2, Math.floor((length-2)/speedthreshold))*minspeed;// set speed depend on lenght
            }
        }

        isgameover = !invincible && isgameover; //invincible logic
        scoretext.destroy();
        cointext.destroy();
        scoretext = this.add.text(10,10,'Score : ' + score,{ fontFamily: 'Arial', fontSize: 12, color: '#ff0000' });
        cointext = this.add.text(100,10,'Coin : ' + coins,{ fontFamily: 'Arial', fontSize: 12, color: '#ff0000' });
        graphics.clear();
        
        for (let index = 0; index < snakePosition.length; index++) {
            graphics.fillRect(snakePosition[index][0], snakePosition[index][1], gridspace, gridspace);
        }
        graphics.fillRectShape(player);
        if(isgameover){
            if (inrevivepage){
                //console.log("over")
                revivetext.setVisible(true);
                yesreviveButton.setVisible(true);
                yesreviveButton.setInteractive();
                noreviveButton.setVisible(true);
                noreviveButton.setInteractive();
                lifetext.setVisible(true);
                
            }
            else{
                this.add.text(250,250,"Game Over",{ fontFamily: 'Arial', fontSize: 60, color: '#ff0000' });
                let restartButton = this.add.text(500, 350, 'Restart', { fontFamily: 'Arial', fontSize: 20, color: '#ff0000' })
                restartButton.setOrigin(0.5);
                restartButton.setPadding(10);
                restartButton.setStyle({ backgroundColor: '#111' });
                restartButton.setInteractive({ useHandCursor: true });
                restartButton.on('pointerdown', function(){
                    //console.log('pointerover');
                    game.destroy(true);
                    snake();
                    apiControllor.endGame(coins, score);
                    apiControllor.changeExtraHealthInGame(life);
                    coins = 0;
                    reAc();
                });
                let returnButton = this.add.text(300, 350, 'Return', { fontFamily: 'Arial', fontSize: 20, color: '#ff0000' })
                returnButton.setOrigin(0.5);
                returnButton.setPadding(10);
                returnButton.setStyle({ backgroundColor: '#111' });
                returnButton.setInteractive({ useHandCursor: true });
                returnButton.on('pointerdown', function(){
                    //console.log('pointerover');
                    game.destroy(true);
                    for (var i = 0; i < hideable.length; i++) {//return
                        hideable[i].style.display = "block";
                    }
                    apiControllor.endGame(coins, score);
                    document.getElementById('changeAc').style.display = 'inline';
                    coins = 0;
                    apiControllor.changeExtraHealthInGame(life);
                    reAc();
                });
            }
            //restartButton.on('pointerover', () => restartButton.setStyle({ fill: '#ff1200' }))
            //restartButton.on('pointerout', () => restartButton.setStyle({ fill: '#ff0000' }))
        }
    }


    let game = new Phaser.Game(config);
}
