import {SceneObject} from '../SceneObject'
import {AnimatedSpriteType} from './AnimatedSpriteType'
import {Behavior} from './Behavior'
import { SceneGraph } from '../SceneGraph';
import { BugBehavior1 } from './BugBehavior1';
import { BugBehavior2 } from './BugBehavior2';
import { BugBehavior3 } from './BugBehavior3';

export class AnimatedSprite extends SceneObject {
    private spriteType : AnimatedSpriteType;
    private state : string;
    private animationFrameIndex : number;
    private frameCounter : number;
    private behavior: Behavior;
    private player : Boolean;
    //direction 0 = Up, 1 = right, 2 = down, 3 = left
    private direction : number;
    
    public constructor(initSpriteType : AnimatedSpriteType, initState : string) {
        super();
        this.spriteType = initSpriteType;
        
        // START RESET
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
        this.player = false;
        this.direction = 0;
        this.behavior = null;
    }

    public setPlayer() : void{
        this.player = true;
    }

    public getPlayer() : AnimatedSprite{
        if (this.player){
            return this;
        }
        return null;
    }

    public getAnimationFrameIndex() : number {
        return this.animationFrameIndex;
    }

    public getFrameCounter() : number {
        return this.frameCounter;
    }

    public getSpriteType() : AnimatedSpriteType {
        return this.spriteType;
    }

    public getState() : string {
        return this.state;
    }
    
    public setState(initState : string) : void {
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
    }

    public getDirection() : number{
        return this.direction;
    }

    public getBehavior() : Behavior{
        return this.behavior;
    }

    public setDirection(direction : number) : void{
        this.direction = direction;
    }

    public addBehavior(state : number, scene : SceneGraph, worldWidth : number, worldHeight : number) : void{
        if (state == 1){
            this.behavior = new BugBehavior1(state, scene, worldWidth, worldHeight);
        }else{
            this.behavior = new BugBehavior3(state, scene, worldWidth, worldHeight);
        }
    }

    public addBehavior2(state : number, scene : SceneGraph, worldWidth : number, worldHeight : number, player : AnimatedSprite) : void{
            this.behavior = new BugBehavior2(state, scene, worldWidth, worldHeight, player);
    }
    
    public update(delta : number) : void {
        //dont forget to change animation state
        if (this.behavior != null){
            //If ant dead
            if (this.behavior.getState() == -1){
                if (this.behavior.think(this.getPosition().getX(), this.getPosition().getY()) == -5){
                    this.setState("DEAD");
                }
            }
            //Ant behavior
            if (this.behavior.getState() == 1){
                if (this.getState() == "IDLE"){
                    this.setState("WALK");
                }
                let temp = 0;
                temp = this.behavior.think(this.getPosition().getX(), this.getPosition().getY());

                switch(temp){
                    case -3:
                        this.setDirection(3);
                        break;
                    case -2:
                        this.setDirection(2);
                        break;
                    case -1:
                        this.setDirection(1);
                        break;
                    case 0:
                        this.setDirection(0);
                        break;
                    case 1:
                        break;
                    case 2:
                        switch(this.direction){
                            case 0:
                                if (this.getPosition().getY() - 5 <= 0){
                                    this.getPosition().setY(0);
                                }else{
                                    this.getPosition().setY(this.getPosition().getY() - 5);
                                }break;
                            case 1:
                                if (this.getPosition().getX() + 5 >= this.behavior.getWidth()){
                                    this.getPosition().setX(this.behavior.getWidth());
                                }else{
                                    this.getPosition().setX(this.getPosition().getX() + 5);
                                }break;
                            case 2:
                                if (this.getPosition().getY() + 5 >= this.behavior.getHeight()){
                                    this.getPosition().setY(this.behavior.getHeight());
                                }else{
                                    this.getPosition().setY(this.getPosition().getY() + 5);
                                }break;
                            case 3:
                                if (this.getPosition().getX() - 5 <= 0){
                                    this.getPosition().setX(0);
                                }else{
                                    this.getPosition().setX(this.getPosition().getX() - 5);
                                }break;
                        }
                        break;
                }
            }
            //Bed bug behavior
            else if (this.behavior.getState() == 2){
                let temp = 0;
                temp = this.behavior.think(this.getPosition().getX(), this.getPosition().getY());

                if (this.behavior.getRunning()){
                    switch(temp){
                        case -3:
                            this.setDirection(3);
                            break;
                        case -2:
                            this.setDirection(2);
                            break;
                        case -1:
                            this.setDirection(1);
                            break;
                        case 0:
                            this.setDirection(0);
                            break;
                    }
                    switch(this.direction){
                        case 0:
                            if (this.getPosition().getY() - 5 <= 0){
                                this.getPosition().setY(0);
                            }else{
                                this.getPosition().setY(this.getPosition().getY() - 5);
                            }break;
                        case 1:
                            if (this.getPosition().getX() + 5 >= this.behavior.getWidth()){
                                this.getPosition().setX(this.behavior.getWidth());
                            }else{
                                this.getPosition().setX(this.getPosition().getX() + 5);
                            }break;
                        case 2:
                            if (this.getPosition().getY() + 5 >= this.behavior.getHeight()){
                                this.getPosition().setY(this.behavior.getHeight());
                            }else{
                                this.getPosition().setY(this.getPosition().getY() + 5);
                            }break;
                        case 3:
                            if (this.getPosition().getX() - 5 <= 0){
                                this.getPosition().setX(0);
                            }else{
                                this.getPosition().setX(this.getPosition().getX() - 5);
                            }break;
                    }
                }else{
                    switch(temp){
                        case -3:
                            this.setDirection(3);
                            break;
                        case -2:
                            this.setDirection(2);
                            break;
                        case -1:
                            this.setDirection(1);
                            break;
                        case 0:
                            this.setDirection(0);
                            break;
                        case 1:
                            if (this.getState() == "WALK"){
                                this.setState("IDLE");
                            }
                            break;
                        case 2:
                            if (this.getState() == "IDLE"){
                                this.setState("WALK");
                            }
                            switch(this.direction){
                                case 0:
                                    if (this.getPosition().getY() - 5 <= 0){
                                        this.getPosition().setY(0);
                                    }else{
                                        this.getPosition().setY(this.getPosition().getY() - 5);
                                    }break;
                                case 1:
                                    if (this.getPosition().getX() + 5 >= this.behavior.getWidth()){
                                        this.getPosition().setX(this.behavior.getWidth());
                                    }else{
                                        this.getPosition().setX(this.getPosition().getX() + 5);
                                    }break;
                                case 2:
                                    if (this.getPosition().getY() + 5 >= this.behavior.getHeight()){
                                        this.getPosition().setY(this.behavior.getHeight());
                                    }else{
                                        this.getPosition().setY(this.getPosition().getY() + 5);
                                    }break;
                                case 3:
                                    if (this.getPosition().getX() - 5 <= 0){
                                        this.getPosition().setX(0);
                                    }else{
                                        this.getPosition().setX(this.getPosition().getX() - 5);
                                    }break;
                            }
                            break;  
                    }
                }
            }
            //Player behavior
            else{ 
                let temp : Array<number>;
                temp = this.behavior.think3(this.getPosition().getX(), this.getPosition().getY());
                if (temp != null){
                    if (this.behavior.getState() == 10){
                        if (this.getState() == "IDLE"){
                            this.setState("WALK");
                        }
                        if (this.getPosition().getX() + (temp[0] * 5) >= this.behavior.getWidth()){
                            this.getPosition().setX(this.behavior.getWidth());
                        }else if (this.getPosition().getX() + (temp[0] * 5) <= 0){
                            this.getPosition().setX(0);
                        }else{
                            this.getPosition().setX(this.getPosition().getX() + (temp[0] * 5));
                        }
                        if (this.getPosition().getY() + (temp[1] * 5) >= this.behavior.getHeight()){
                            this.getPosition().setY(this.behavior.getHeight());
                        }else if (this.getPosition().getY() + (temp[1] * 5) <= 0){
                            this.getPosition().setY(0);
                        }else{
                            this.getPosition().setY(this.getPosition().getY() + (temp[1] * 5));
                        }
                    }else{
                        if (this.getState() == "IDLE"){
                            this.setState("WALK");
                        }
                        if (this.getPosition().getX() - (temp[0] * 5) >= this.behavior.getWidth()){
                            this.getPosition().setX(this.behavior.getWidth());
                        }else{
                            this.getPosition().setX(this.getPosition().getX() - (temp[0] * 5));
                        }
                        if (this.getPosition().getY() - (temp[1] * 5) >= this.behavior.getHeight()){
                            this.getPosition().setY(this.behavior.getHeight());
                        }else{
                            this.getPosition().setY(this.getPosition().getY() - (temp[1] * 5));
                        }
                    }
                }else{
                    if (this.getState() == "WALK" && this.getBehavior().getState() != 10){
                        this.setState("IDLE");
                    }
                }
            }
        }

        this.frameCounter++;
        
        // HAVE WE GONE PAST THE LAST FRAME IN THE ANIMATION?
        var currentAnimation = this.spriteType.getAnimation(this.state);
        var currentFrame = currentAnimation[this.animationFrameIndex];
        if (this.frameCounter > (currentFrame.duration)) {
            this.animationFrameIndex++;
            if (this.animationFrameIndex >= currentAnimation.length) {
                this.animationFrameIndex = 0;
            }
            this.frameCounter = 0;
        }
    }

    public contains(pointX : number, pointY : number) : boolean {
        let spriteWidth = this.getSpriteType().getSpriteWidth();
        let spriteHeight = this.getSpriteType().getSpriteHeight();
        let spriteLeft = this.getPosition().getX();
        let spriteRight = this.getPosition().getX() + spriteWidth;
        let spriteTop = this.getPosition().getY();
        let spriteBottom = this.getPosition().getY() + spriteHeight;
        if (    (pointX < spriteLeft)
            ||  (spriteRight < pointX)
            ||  (pointY < spriteTop)
            ||  (spriteBottom < pointY)) {
                return false;
        }
        else {
            return true;
        }
    }
    
    /**RENAME THIS METHOD SO IT DENOTES PIXEL LOCATION IN TEXTURE */
    public getLeft() : number {
        return this.spriteType.getLeft(this.state, this.animationFrameIndex);
    }
    
    public getTop() : number {
        return this.spriteType.getTop(this.state, this.animationFrameIndex);
    }

    public toString() : string {
        let summary : string =  "{ position: ("
                            +   this.getPosition().getX() + ", " + this.getPosition().getY() + ") "
                            +   "(state: " + this.getState() + ") "
                            +   "(animationFrameIndex: " + this.getAnimationFrameIndex() + ") "
                            +   "(frameCounter: " + this.getFrameCounter() + ") ";
        return summary;
    }
}