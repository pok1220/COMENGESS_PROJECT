var coins = 0
// import phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/+esm'
import * as apiControllor from "./api.js";
import { hideable } from './main.js';
// import 'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js';
export function snake(){
    document.getElementById('changeAc').style.display = "none";
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
    let bomb;

    let posX = 0;
    let posY = 0;
    let previousX = 0;
    let previousY = 0;

    let changeD = 0;

    let graphics;
    let graphicsfood;
    let graphicsbomb;
    let graphicscoin;

    let foodposX;
    let foodposY;
    let bombposX;
    let bombposY;
    let coinposX;
    let coinposY;

    let scoretext;
    let cointext;

    const snakePosition = [[400,300]];
    let length = 2;
    let score = 0;
    let isgameover = false;
    let speed = 1/8;
    let currentspeed = 1/8;
    let Maxspeed = 1;
    let isinsnake = true;
    let iscoinchange;
    let isscorechange;
    let i = 0;

    function preload() {
        // Preload assets if any
    }

    function create() {
        // Create graphics object for drawing
        graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        graphicsfood = this.add.graphics({ fillStyle: { color: 0xff00ff } });
        graphicscoin = this.add.graphics({ fillStyle: { color: 0x00ff00 } });
        graphicsbomb = this.add.graphics({ fillStyle: { color: 0x00ffff } });

        // Initial player position
        player = new Phaser.Geom.Rectangle(400, 300, gridspace, gridspace);

        foodposX = (Math.floor(Math.random()*gridX))*gridspace;
        foodposY = (Math.floor(Math.random()*gridY))*gridspace;
        food = new Phaser.Geom.Rectangle(foodposX, foodposY, gridspace, gridspace);

        coinposX = (Math.floor(Math.random()*gridX))*gridspace;
        coinposY = (Math.floor(Math.random()*gridY))*gridspace;
        coin = new Phaser.Geom.Rectangle(coinposX, coinposY, gridspace, gridspace);
        
        bombposX = (Math.floor(Math.random()*gridX))*gridspace;
        bombposY = (Math.floor(Math.random()*gridY))*gridspace;
        bomb = new Phaser.Geom.Rectangle(bombposX, bombposY, gridspace, gridspace);

        graphics.fillRectShape(player);
        graphics.fillRect(snakePosition[0][0],snakePosition[0][1],gridspace,gridspace);
        graphicsfood.fillRectShape(food);
        graphicscoin.fillRectShape(coin);
        graphicsbomb.fillRectShape(bomb);
        console.log(`x: ${foodposY}, y: ${foodposX}`);
        
        scoretext = this.add.text(10,10,'Score : ' + score,{ fontFamily: 'Arial', fontSize: 12, color: '#ff0000' });
        cointext = this.add.text(100,10,'Coin : ' + coin,{ fontFamily: 'Arial', fontSize: 12, color: '#ff0000' });

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

    function update() {
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
            console.log(`${snakePosition}`,snakePosition.length);
            const distancefood = Phaser.Math.Distance.Between(player.x, player.y, food.x, food.y);
            const distancecoin = Phaser.Math.Distance.Between(player.x, player.y, coin.x, coin.y);
            const distancebomb = Phaser.Math.Distance.Between(player.x, player.y, bomb.x, bomb.y);
            snakePosition.push([player.x,player.y]);
            if (snakePosition.length > Math.floor((length/currentspeed)+2) && snakePosition.length > 2){
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
                        if(Phaser.Math.Distance.Between(element[0], element[1], food.x, food.y) < 0.001 || (food.x == bomb.x && food.y == bomb.y)|| (food.x == coin.x && coin.y == bomb.y)){
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
                isinsnake = true
                while (isinsnake){
                    coin.x = (Math.floor(Math.random()*gridX))*gridspace;
                    coin.y = (Math.floor(Math.random()*gridY))*gridspace;
                    isinsnake = false;
                    for (let index = 0; snakePosition < snakePosition.length; index++) {
                        const element = snakePosition[index];
                        if((Phaser.Math.Distance.Between(element[0], element[1], coin.x, coin.y) < 0.001) || (coin.x == bomb.x && coin.y == bomb.y)|| (coin.x == food.x && coin.y == food.y)){
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
            if (distancebomb < 0.01) {//check eat bomb
                isinsnake = true
                while (isinsnake){
                    bomb.x = (Math.floor(Math.random()*gridX))*gridspace;
                    bomb.y = (Math.floor(Math.random()*gridY))*gridspace;
                    isinsnake = false;
                    for (let index = 0; snakePosition < snakePosition.length; index++) {
                        const element = snakePosition[index];
                        if((Phaser.Math.Distance.Between(element[0], element[1], bomb.x, bomb.y) < 0.001) || (bomb.x == food.x && bomb.y == food.y)|| (bomb.x == coin.x && bomb.y == coin.y)){
                            bomb.x = (Math.floor(Math.random()*gridX))*gridspace;
                            bomb.y = (Math.floor(Math.random()*gridY))*gridspace;
                            isinsnake = true;
                            break;
                        }
                    }
                }
                graphicsbomb.clear();
                graphicsbomb.fillRectShape(bomb);
                score -= 5
            }

            for (let index = 0; index < snakePosition.length-1; index++) {//check hit snake
                if(posX != 0 || posY != 0){
                    if (Phaser.Math.Distance.Between(player.x, player.y, snakePosition[index][0], snakePosition[index][1]) < 0.001){
                        console.log(`Game over`);
                        isgameover = true;
                    }
                }
            }
            if (player.x < 0 || player.x >= 800 || player.y < 0 || player.y >= 600){//check hit wall
                console.log(`Game over`);
                isgameover = true;
            }
            if(currentspeed < Maxspeed){
                currentspeed = Math.pow(2, Math.floor((length-2)/20))*speed;
            }
        }
        
        //scoretext = this.add.text(10,10,'Score : ' + score,{ fontFamily: 'Arial', fontSize: 12, color: '#ff0000' });
        //cointext = this.add.text(100,10,'Coin : ' + coin,{ fontFamily: 'Arial', fontSize: 12, color: '#ff0000' });
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
                coins = 0;
            });

            this.add.text(250,250,"Game Over",{ fontFamily: 'Arial', fontSize: 60, color: '#ff0000' });
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
            });
            //restartButton.on('pointerover', () => restartButton.setStyle({ fill: '#ff1200' }))
            //restartButton.on('pointerout', () => restartButton.setStyle({ fill: '#ff0000' }))
        }
    }


    let game = new Phaser.Game(config);
    // export 
}
// export default coin;