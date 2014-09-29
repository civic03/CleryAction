Clery Action
============

Compiling
---------

1. Install npm and nodejs

      sudo apt-get install npm nodejs

2. Globally install uglify.js

      sudo npm install -g grunt-cli

3. Run the following command to combine files

      uglifyjs src/three.js src/main.js -m -c -o main.js

Specifications
-------------

### World layout

 * Each map is divided into squares
   * The squares are approximately the same size as the character
   * For the purposes of 3d modeling, each square has a side length of 1
   * Collision and pathfinding work on a per square basis
   * Click based movement
   * Need simple path finding AI
 * Clicking/right clicking will be used to talk to people, pick up items, interact with scenery etc.

### Levels	

 * Each map consists of the ground layout plus objects on top of it
 * The objects themselves contain the collision data in a list
 * The objects themselves also contain their own tests for raycasting and interactions
 * Can make global api calls to things like combat, chat, items, and skills
 * Objects can have their own artificial intelligience which plugs into the rest of the game
 * Can dynamically change their collision properties and other things

### Pokemon style combat

 * Can also use items that you have found
 * You can learn new skills/attacks
 * Also have to respond correctly to questions/situations

### Level format

 * Levels should be primarily data driven
 * Each level opens with part of a clery act report
 * Levels can give you an opportunity to train your character and find items
 * When the player is ready or after a certain amount of time, the player will become the victim
 * Each level closes with the actual resolution of the incident

### UI elements

 * Overlaid HTML UI
 * UI element for reading through clery act report
 * Custom UI element for holding your items
 * Custom UI element for displaying your skills/health
 * Need method for showing
   * chat options
   * combat options

### Items
 * items appear in your bag UI element
 * When in the 3d world, they can just appear as extruded bitmaps

### Saving the game
 * Game saves after each level
 * Once you die you have to start over
 * When you open back to the page, you begin where you left off

File Hierarchy
--------------

 * levels
 * maps
 * tiles
 * objects
 * items
 * models
 * audio
 * src
   * main.js
   * index.html
   * three.js
   * style.css
 * index.html
 * main.js
 * style.css
 * game.json
 * compile.js
 * README.md
	
Skills
------

 * Health
 * HealthXP:
 * Speed
 * SpeedXP:
 * Accuracy
 * AccuracyXP:
 * Strength
 * StrengthXP:

Global Functions
----------------

 * Global.guid() --generates guid

 * User.print(STRING) print out string to user’s chat window
 * User.giveItem(ITEMNAME)
 * User.removeItem(ITEMNAME)
 * User.checkNumOfItem(ITEMNAME)
 * User.getSkillBonused(SKILLNAME)
 * User.getSkill(SKILLNAME)
 * User.getSkillXP(SKILLNAME)
 * User.startCombat(OBJECTNAME)
 * User.startChat(OBJECTNAME)
 * Global.addObject(OBJECTNAME,LOCATION,ORIENTATION)
 * Global.removeObject(UID)
 * Global.placeItem(ITEMNAME,LOCATION)
 * User.die()
 * User.winLevel()
 * Global.playAudio(AUDIOFILENAME)

Global Events
-------------

 * onMove
 * onCombatWith(UID)
 * onCombatWith(OBJECTNAME)
 * onItemUse(ITEMNAME)
 * onTalkWith(UID)
 * onTalkWith(OBJECTNAME)
 * onHealthAt(HEALTHTARGET)
 * onHitTaken
 * onHitGiven

Example Game.js File
--------------------

      {
      	"levelOrder":["level1","level2","level3"]
      }

Example Item
-----------

      function Pizza() {
      	this.image=’pizza.png’
      	this.description=’This is food that will health five health’
      }
      Pizza.protoType.onAquire=function(){
      }
      Pizza.prototype.onUse=function(){
      	var event=new CustomEvent(“ItemPizza”)
      	document.dispatchEvent(event); 
      	User.health+=5;
      }
      Pizza.protoType.onDiscard=function(){
      }
      Pizza.prototype.onAttack=function(){
      }
      Pizza.prototype.onDefend=function(){
      }

Example Move
-----------

      {
      	"name":"Scissor Kick",
      	"type":"slash",
      	"baseDamage":10,
      	"speed":3,
      	"stdDev":7,
      	"baseAccuracy":.2,
      	"recurringDamage":true,
      }

Example Object
--------------

      function Fountain(options) {
      	this.width=2;
      	this.height=2;
      	this.guid=guid();
      	this.collisionList=[[0,0],[0,1]]
      	this.model=’fountain.js’
      	this.talkable=true;
      	this.combatable:true;
      	this.combatInfo={health:10,accuracy:12,speed:5,strength:3,items:[‘item1’,’item2’],moves:[‘move1’,’move2’,’move3’],strengths:[‘type1’,’type2’],weaknesses:[‘type3’,’type4’]}
      	this.interactionsList=[‘Examine’,’Drink’,’hidden’];
      	this.emitsEvents=[‘FountainBroken’]
      	this.broken=false;
      }
      Fountain.prototype.onAdd = function(){
      //add event listeners
      this.randomBreakage=setInterval(this.tryToBreak, 3000);
      }
      Fountain.tryToBreak=function(){
      	if(Math.random()>.9){
      		this.broken=true;
      		var event=new CustomEvent(“FountainBroken”,{“guid:”:this.guid})
      		document.dispatchEvent(event);
      		clearInterval(this.randomBreakage);
      }
      }
      Fountain.prototype.onRemove = function(){
      	//remove event listeners
      	clearInterval(this.randomBreakage);
      }
      Fountain.prototype.getTalkOptions = function(state){
      	if(state==0){
        }
      }
      Fountain.prototype.interactions = function(name,options){
      	if(name==’Examine’){
      	}
      }


Example Level
-------------

      {
         "map":"testMap",
         "objectList":[
            {"class":"User","location":[9,5],"orientation":2},
            {"class":"Crate","location":[8,1],"orientation":0}
         ],
         "begcleryReport":"This is a test Clercy Report",
         "endCleryReport":"You beat the level!",
         "collisionList":[]
      }

Example Map
-----------

      {
         "width":10,
         "height":10,
         "tileArray":[
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","grass","grass",
            "river","river","grass","grass","grass","sidewalk","grass","grass","grass","grass",
            "grass","river","river","river","river","sidewalk","grass","grass","grass","grass",
            "grass","grass","grass","grass","river","sidewalk","river","river","river","grass",
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","river","river",
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","grass","grass",
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","grass","grass",
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","grass","grass",
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","grass","grass",
            "grass","grass","grass","grass","grass","sidewalk","grass","grass","grass","grass",
         ],
         "collisionList":[[0,1],[1,1],[1,2],[2,2],[3,2],[4,2],[4,3],[6,3],[7,3],[8,3],[8,4],[9,4]],
         "objectList":[]
      }

Tile Format
-----------

Tiles are just 100x100 png images

