Clery Action
============

SPECFICATIONS
-------------

### World layout

 * Each map is divided into squares
   * The squares are approximately the same size as the character
   * Collision and pathfinding work on a per square basis
   * Click based movement
   * Need simple path finding AI
 * Clicking/right clicking will be used to talk to people, pick up items, interact with scenery etc. (raycasting)

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

FILE HIERARCHY
-------------

 * levels
 * maps
 * tiles
 * objects
 * items
 * models
 * audio
 * src
   * loader.js
   * loadprogress.js
   * begin.js
   * ui.js
   * startlevel.js
   * save.js
   * index.html
   * three.js
   * style.css
 * index.html
 * main.js
 * style.css
 * game.json
 * compile.js
 * README.md
	
SKILLS
------

 * Health
 * HealthXP:
 * Speed
 * SpeedXP:
 * Accuracy
 * AccuracyXP:
 * Strength
 * StrengthXP:

GLOBAL OBJECTS
--------------

 * User

GLOBAL FUNCTION CALLS
---------------------

 * guid() --generates guid

 * print(STRING) print out string to user’s chat window
 * giveItem(ITEMNAME)
 * removeItem(ITEMNAME)
 * checkNumOfItem(ITEMNAME)
 * getSkillBonused(SKILLNAME)
 * getSkill(SKILLNAME)
 * getSkillXP(SKILLNAME)
 * startCombat(OBJECTNAME)
 * startChat(OBJECTNAME)
 * addObject(OBJECTNAME,LOCATION,ORIENTATION)
 * removeObject(UID)
 * placeItem(ITEMNAME,LOCATION)
 * die()
 * nextLevel()
 * playAudio(AUDIOFILENAME)

GLOBAL EVENTS
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

Game.js example
---------------

      {
      	levelOrder:[level1.json,level2.json,level3.json]
      }

ITEM FORMAT
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
      Pizza.prototype.onAttack=function(){}
      Pizza.prototype.onDefend=function(){}

MOVE FORMAT
-----------

      {
      	name:’Scissor Kick’,
      	type:’slash’,
      	baseDamage:10,
      	speed:3,
      	stdDev:7,
      	baseAccuracy:.2,
      	recurringDamage:true,
      }

EXAMPLE OBJECT
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


LEVEL FORMAT
------------

      {
      	map:’thevarsity.json’,
      	//Level specific objects
      	startingLocation:[15,5],
      	objectList:[{name:’objectname.json’,location:[2,2],orientation:0}],
      	begcleryReport:”At 1:05 am Tuesday morning...”,
      	endCleryReport:”Both victims escaped...”,
      	collisionList=[]
      }

MAP FORMAT
----------

      {
      	width:20,
      	height:20,
      	tileArray:[
      	grass.png,grass.png,grass.png,sidewalkr.png,
      sidewalk.png,sidewalkl.png,grass.png,grass.png...
      ]
      collisionList=[[2,3],[5,10]]
      //objects common to all maps
      objectList:[{name:objectname.json,location:[2,2],orientation:0,options:{}}]
      }

TILE FORMAT
-----------

Tiles are just 100x100 png images

