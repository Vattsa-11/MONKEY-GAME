var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(450,300);
  
  FoodGroup  = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(50,240,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(400,290,500,10);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  ground.scale =2;
  ground.shapeColor = ("green");
  
}


function draw() {
  background("white");
  
   monkey.collide(ground);
   monkey.velocityY = monkey.velocityY + 0.7;
   monkey.setCollider("rectangle",0,0,220,610,35);
   if(ground.x < 0 ){
    ground.x = 250;
    ground.x = ground.width/2;
  }
  
  if(gameState === PLAY){
   spawnFood();
   spawnObstacles();
   score = 0+Math.round(frameCount/50);
  
  if(keyDown("space")&&  monkey.y >=100 ){
    monkey.velocityY = -10;
  }
      
  if(monkey.isTouching(obstacleGroup)){
    monkey.velocityX = 0; 
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    gameState = END;
  }
  
  monkey.bounceOff(obstacleGroup);
  obstacleGroup.collide(ground);
    
} else if(gameState === END){
  FoodGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  fill("black");
  text("Press R To Restart",180,15);
  
  if(keyDown("r")){
    reset();
  }
}   
  
  drawSprites();
   
  fill("black");
  text("surviving time   " + score, 70,70);
  
}

function spawnFood (){ 
  if (frameCount % 80 === 0){
     banana = createSprite(450,Math.round(random(120,200)),10,10);
     banana.velocityX = -3;
     banana.addImage(bananaImage); 
     banana.lifetime = 150;
     banana.scale = 0.10;
     monkey.depth = banana.depth+1;
     FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300 === 0){
  obstacle = createSprite(450,260,10,10);
  obstacle.addImage(obstacleImage);  
  obstacle.velocityX = -4 ; 
  obstacle.lifetime = 150 ;
  obstacle.scale = 0.12;
  obstacle.setCollider("rectangle",0,0,400,400,0);  
  //obstacle.debug = true;
    
  obstacleGroup.add(obstacle);  
  }
}
function reset(){
  gameState = PLAY;
  monkey.x = 50;
  monkey.velocityX = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
}