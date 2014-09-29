  function Crate(options) {
    this.position=options.position;
    this.orientation=options.orientation
    this.width=1;
    this.height=1;
    this.guid=Global.guid();
    this.collisionList=[[0,0]];
    this.model="crate.js";
    this.talkable=false;
    this.combatable=false;
    this.visibleInteractions=["Examine","Open"];
    this.hiddenInteractions=["Crowbar"];
  }
  Crate.prototype.onAdd = function(){
  }
  Crate.prototype.onRemove = function(){
  }
  Crate.prototype.handleInteraction = function(name,options){
    if(name=="Examine"){
      Global.print("This is a tightly shut crate.");
    }else if(name=="Open"){
      Global.print("This crate is just too tightly shut.");
    }else if(name=="Crowbar"){
      Global.print("You open the crate and find a banana!");
      User.giveItem("Banana");
    }else{
      Global.print("That doesn't seem to do anything.");
    }
  }