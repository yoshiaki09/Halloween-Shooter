function Character(){
	this.position = new Point();
	this.size = 0;

}

Character.prototype.init = function(size){
	this.size = size;
};




function CharacterShot(){
    this.position = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

CharacterShot.prototype.set = function(p, size, speed){
    // À•W‚ğƒZƒbƒg
    this.position.x = p.x;
    this.position.y = p.y;

    // ƒTƒCƒYAƒXƒs[ƒh‚ğƒZƒbƒg
    this.size = size;
    this.speed = speed;

    // ¶‘¶ƒtƒ‰ƒO‚ğ—§‚Ä‚é
    this.alive = true;
};

CharacterShot.prototype.move = function(){
    // À•W‚ğ^ã‚Éspeed•ª‚¾‚¯ˆÚ“®‚³‚¹‚é
    this.position.y -= this.speed;

    // ˆê’èˆÈã‚ÌÀ•W‚É“’B‚µ‚Ä‚¢‚½‚ç¶‘¶ƒtƒ‰ƒO‚ğ~‚ë‚·
    if(this.position.y < -this.size){
        this.alive = false;
    }
};
function Enemy(){
    this.position = new Point();
    this.size = 0;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

Enemy.prototype.set = function(p, size, type){
    // À•W‚ğƒZƒbƒg
    this.position.x = p.x;
    this.position.y = p.y;

    // ƒTƒCƒYAƒ^ƒCƒv‚ğƒZƒbƒg
    this.size = size;
    this.type = type;

    // ƒpƒ‰ƒ[ƒ^‚ğƒŠƒZƒbƒg
    this.param = 0;

    // ¶‘¶ƒtƒ‰ƒO‚ğ—§‚Ä‚é
    this.alive = true;
};

Enemy.prototype.move = function(){
    // ƒpƒ‰ƒ[ƒ^‚ğƒCƒ“ƒNƒŠƒƒ“ƒg
    this.param++;

    // ƒ^ƒCƒv‚É‰‚¶‚Ä•ªŠò
    switch(this.type){
        case 0:
            // X •ûŒü‚Ö‚Ü‚Á‚·‚®i‚Ş
            this.position.x += 2;

            // ƒXƒNƒŠ[ƒ“‚Ì‰E’[‚æ‚è‰œ‚É“’B‚µ‚½‚ç¶‘¶ƒtƒ‰ƒO‚ğ~‚ë‚·
            if(this.position.x > this.size + screenCanvas.width){
                this.alive = false;
            }
            break;
        case 1:
            // ƒ}ƒCƒiƒX X •ûŒü‚Ö‚Ü‚Á‚·‚®i‚Ş
            this.position.x -= 2;

            // ƒXƒNƒŠ[ƒ“‚Ì¶’[‚æ‚è‰œ‚É“’B‚µ‚½‚ç¶‘¶ƒtƒ‰ƒO‚ğ~‚ë‚·
            if(this.position.x < -this.size){
                this.alive = false;
            }
        	break;
	case 2:
			
			// X æ–¹å‘ã¸ã¾ã£ã™ãé€²ã‚€
			this.position.x += 4;
			
			// Y è»¸ã¯ä¸Šã«å‘ã‹ã?
			this.position.y -= radian[this.param % 360] * 1.5;
			
			// ã‚¹ã‚¯ãƒªãƒ¼ãƒ³ã®å³ç«¯ã‚ˆã‚Šå¥¥ã«åˆ°é”ã—ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
			if(this.position.x > this.size + screenCanvas.width){
				this.alive = false;
			}
			break;
	
    }
};
function EnemyShot(){
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

EnemyShot.prototype.set = function(p, vector, size, speed){
    // À•WAƒxƒNƒgƒ‹‚ğƒZƒbƒg
    this.position.x = p.x;
    this.position.y = p.y;
    this.vector.x = vector.x;
    this.vector.y = vector.y;

    // ƒTƒCƒYAƒXƒs[ƒh‚ğƒZƒbƒg
    this.size = size;
    this.speed = speed;

    // ¶‘¶ƒtƒ‰ƒO‚ğ—§‚Ä‚é
    this.alive = true;
};

EnemyShot.prototype.move = function(){
    // À•W‚ğƒxƒNƒgƒ‹‚É‰‚¶‚Äspeed•ª‚¾‚¯ˆÚ“®‚³‚¹‚é
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    // ˆê’èˆÈã‚ÌÀ•W‚É“’B‚µ‚Ä‚¢‚½‚ç¶‘¶ƒtƒ‰ƒO‚ğ~‚ë‚·
    if(
       this.position.x < -this.size ||
       this.position.y < -this.size ||
       this.position.x > this.size + screenCanvas.width ||
       this.position.y > this.size + screenCanvas.height
    ){
        this.alive = false;
    }
};