export default class WaitingRoom extends Phaser.Scene{
    constructor(){
        super({key:"WaitingRoom"});
    }
    create(){
        this.socket=io();
        this.socket.on("getNumOfPlayers",(numOfPlayersConnected)=>{
            if(this.playersConnected==null)this.playersConnected=this.add.text(this.cameras.main.displayWidth/2-135,this.cameras.main.displayHeight/2-30,"Players: "+numOfPlayersConnected+"/4",{font:"50px Arial",fill:"white",stroke:"black",strokeThickness:5});
            else this.playersConnected.setText("Players: "+numOfPlayersConnected+"/4");
        });
        this.socket.on("fullRoom",(players)=>{
            delay(500).then(()=>{
                this.game.scene.start("MainSceneMult",{socket:this.socket,playersId:players});
                this.scene.sleep();
            });
        });
        this.backToMenu=this.add.rectangle(70,this.cameras.main.displayHeight-55,100,50,"black","0.8");
        this.backToMenu.scrollFactorX=0;
        this.backToMenu.scrollFactorY=0;
        this.backToMenu.setStrokeStyle(2,0x808080);
        this.backToMenuText=this.add.text(this.backToMenu.getCenter().x-42,this.backToMenu.getCenter().y-17,"BACK",{font:"30px Arial",fill:"lightgray",stroke:"gray",strokeThickness:2});
        this.backToMenuText.scrollFactorX=0;
        this.backToMenuText.scrollFactorY=0;
        console.log(this.backToMenuText.width);
        this.backToMenu.setInteractive();
        this.backToMenu.on("pointerdown",()=>{          
            this.game.scene.run("MainMenu");
            this.socket.disconnect();  
            this.game.scene.sleep("WaitingRoom");
        });
        this.backToMenu.on("pointerover",()=>{            
            this.backToMenu.setFillStyle(0x262626,0.9);
        });
        this.backToMenu.on("pointerout",()=>{
            this.backToMenu.setFillStyle(0x000000,0.8);
        });        
    }
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}