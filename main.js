// - global -------------------------------------------------------------------
var screenCanvas, info,info2;
var run = true;
var fps=1000/60;
var mouse = new Point();
var ctx; // canvas2d �R���e�L�X�g�i�[�p
var fire = false;
var score = 0;
var counter = 0;
var message = '';
var sound;
var SE,SE2;
var radian = new Array();
var life=20;
// - const --------------------------------------------------------------------
var CHARA_COLOR = 'rgba(0, 0, 255, 0.01)';
var CHARA_SHOT_COLOR = 'rgba(255, 255, 0, 0.01)';
var CHARA_SHOT_MAX_COUNT = 20;
var ENEMY_COLOR = 'rgba(255, 0, 0, 0.01)';
var ENEMY_MAX_COUNT = 20;
var ENEMY_SHOT_COLOR = 'rgba(255, 255, 0, 1.0)';
var ENEMY_SHOT_MAX_COUNT = 100;
// - main ---------------------------------------------------------------------
window.onload = function go(){

	var i,j,a;
	var p = new Point();
    // �X�N���[���̏�����
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 587;
    screenCanvas.height = 453;
	// ���@�̏����ʒu���C��
	mouse.x = screenCanvas.width / 2;
	mouse.y = screenCanvas.height - 20;
    // 2d�R���e�L�X�g
    ctx = screenCanvas.getContext('2d');

	//�C�x���g�̓o�^
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('mousedown', mouseDown, true);
	window.addEventListener('keydown', keyDown, true);
	
   // ���̑��̃G�������g�֘A
	info = document.getElementById('info');
 	sound = document.getElementById("sound");
	sound2 = document.getElementById("sound2");
	SE = document.getElementById("SE");
	SE2 = document.getElementById("SE2");
	SE3 = document.getElementById("SE3");
	var lifeBar = document.getElementById('lifeBar');

    // ���@������
  	 var chara = new Character();
  	 chara.init(10);
	//���@�V���b�g������
	var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
  	  charaShot[i] = new CharacterShot();
	}

    // �G�l�~�[������
	var enemy = new Array(ENEMY_MAX_COUNT);
	for(i = 0; i < ENEMY_MAX_COUNT; i++){
	    enemy[i] = new Enemy();
	}
	// �G�l�~�[�V���b�g������
	var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
	for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
	    enemyShot[i] = new EnemyShot();
	}
	
    // �����_�����O�������Ăяo��
    (function(){
	
	counter++;
	
	document.getElementById("sound").play();
        // screen�N���A 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
	var img = new Image();    //�摜�I�u�W�F�N�g�쐬
  	img.src = "ha.jpg"//�w�i
	ctx.drawImage(img, 0, 0) ;
        // �p�X�̐ݒ���J�n
        ctx.beginPath();
	//
	chara.position.x = mouse.x;
	chara.position.y = mouse.y;

	ctx.arc(chara.position.x+3, chara.position.y, 18, 0, Math.PI * 2, false);
        // �~�̐F��ݒ肷��
        ctx.fillStyle = CHARA_COLOR;
        var img = new Image();    //�摜�I�u�W�F�N�g�쐬
  	img.src = "2.png"//���@
	ctx.drawImage(img, chara.position.x-20, chara.position.y-24,45,50) ;

        // �~��`��
       ctx.fill();
	// fire�t���O�̒l�ɂ�蕪��
	if(fire){
	    // ���ׂĂ̎��@�V���b�g�𒲍�����	
	    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        // ���@�V���b�g�����ɔ��˂���Ă��邩�`�F�b�N
        	if(!charaShot[i].alive){
            	// ���@�V���b�g��V�K�ɃZ�b�g
            	charaShot[i].set(chara.position, 3, 5);

           	 // ���[�v�𔲂���
           	 break;
       		 }
	    }
    		// �t���O���~�낵�Ă���
   		 fire = false;
	}

       // ���@�V���b�g --------------------------------------------------
	// �p�X�̐ݒ���J�n
	ctx.beginPath();

	// ���ׂĂ̎��@�V���b�g�𒲍�����
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
  	  // ���@�V���b�g�����ɔ��˂���Ă��邩�`�F�b�N
    	if(charaShot[i].alive){
    	    // ���@�V���b�g�𓮂���
    	   	 charaShot[i].move();
	
        	// ���@�V���b�g��`���p�X��ݒ�
        	ctx.arc(
            	charaShot[i].position.x,
           	 charaShot[i].position.y,
            	10,
           	 0, Math.PI * 2, false
       		 );
		var img = new Image();    //�摜�I�u�W�F�N�g�쐬
		img.src = "fire.png"//���̖��@����
		ctx.drawImage(img,charaShot[i].position.x-15, charaShot[i].position.y-30,30,50) ;
		    // �p�X�������������
	        // �p�X�������������
		
        	ctx.closePath();
    		}
	}

	// ���@�V���b�g�̐F��ݒ肷��
	ctx.fillStyle = CHARA_SHOT_COLOR;

	// ���@�V���b�g��`��
	ctx.fill();

	// �G�l�~�[�̏o���Ǘ� -------------------------------------------------
// 100 �t���[���Ɉ�x�o��������
	if(counter % 100 === 0){
	    // ���ׂẴG�l�~�[�𒲍�����
 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
 	       // �G�l�~�[�̐����t���O���`�F�b�N
	       if(!enemy[i].alive){
 	           // �^�C�v�����肷��p�����[�^���Z�o
  	          j = (counter % 200) / 100;
  	          // �^�C�v�ɉ����ď����ʒu�����߂�
  	          var enemySize = 20;
   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
  	          p.y = screenCanvas.height-270 ;
	
  	          // �G�l�~�[��V�K�ɃZ�b�g
  	          enemy[i].set(p, enemySize, j);
	
  	          // 1�̏o���������̂Ń��[�v�𔲂���
   	         break;
   	     }
 	   }
	}
	if(score>9){

		if(counter % 200 === 0){
		    // ���ׂẴG�l�~�[�𒲍�����
	 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
	 	       // �G�l�~�[�̐����t���O���`�F�b�N
		       if(!enemy[i].alive){
	 	           // �^�C�v�����肷��p�����[�^���Z�o
	  	          j = (counter % 200) / 100;
	  	          // �^�C�v�ɉ����ď����ʒu�����߂�
	  	          var enemySize = 15;
	   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
	  	          p.y = screenCanvas.height-320 ;
		
	  	          // �G�l�~�[��V�K�ɃZ�b�g
	  	          enemy[i].set(p, enemySize, j);
		
	  	          // 1�̏o���������̂Ń��[�v�𔲂���
	   	         break;
	   	     }
	 	   }
		}
      }
	if(score>19){
	if(counter % 200 === 0){
		    // ���ׂẴG�l�~�[�𒲍�����
	 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
	 	       // �G�l�~�[�̐����t���O���`�F�b�N
		       if(!enemy[i].alive){
	 	           // �^�C�v�����肷��p�����[�^���Z�o
	  	          j = (counter % 200) / 100;
	  	          // �^�C�v�ɉ����ď����ʒu�����߂�
	  	          var enemySize = 10;
	   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
	  	          p.y = screenCanvas.height-380 ;
		
	  	          // �G�l�~�[��V�K�ɃZ�b�g
	  	          enemy[i].set(p, enemySize, j);
		
	  	          // 1�̏o���������̂Ń��[�v�𔲂���
	   	         break;
	   	     }
	 	   }
		}
	}
	if(score>29){
	if(counter % 100 === 0){
		    // ���ׂẴG�l�~�[�𒲍�����
	 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
	 	       // �G�l�~�[�̐����t���O���`�F�b�N
		       if(!enemy[i].alive){
	 	           // �^�C�v�����肷��p�����[�^���Z�o
	  	          j = (counter % 200) / 100;
	  	          // �^�C�v�ɉ����ď����ʒu�����߂�
	  	          var enemySize = 10;
	   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
	  	          p.y = screenCanvas.height-420 ;
		
	  	          // �G�l�~�[��V�K�ɃZ�b�g
	  	          enemy[i].set(p, enemySize, j);
		
	  	          // 1�̏o���������̂Ń��[�v�𔲂���
	   	         break;
	   	     }
	 	   }
		}
	}






			// �J�E���^�[�̒l�ɂ���ăV�[������
		switch(true){
		    // �J�E���^�[��70��菬����
		    case counter < 70:
		        message = 'READY...';
		        break;

		    // �J�E���^�[��100��菬����
		    case counter < 100:
		        message = 'GO!!';
		        break;

		    // �J�E���^�[��100�ȏ�
		    default:
		        message = '';

        // �ȉ�����������
        // �G�l�~�[ -----------------------------------------------------------
        // �p�X�̐ݒ���J�n
		ctx.beginPath();
		
		  // ���ׂẴG�l�~�[�𒲍�����
		for(i = 0; i < ENEMY_MAX_COUNT; i++){
			// �G�l�~�[�𓮂���
			if(enemy[i].alive){
				  // �G�l�~�[�𓮂���
				enemy[i].move();
				
			// �G�l�~�[��`���p�X��ݒ�
				ctx.arc(
					enemy[i].position.x,
					enemy[i].position.y,
					enemy[i].size,
					0, Math.PI * 2, false
				);
				        var img = new Image();    //�摜�I�u�W�F�N�g�쐬
  					img.src = "4.png"
					ctx.drawImage(img, enemy[i].position.x-25, enemy[i].position.y-25,50,50) ;
				i
 				// �V���b�g��ł��ǂ����p�����[�^�̒l����`�F�b�N
				if(enemy[i].param % 80 === 0){
			            // �G�l�~�[�V���b�g�𒲍�����
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // �G�l�~�[�V���b�g��V�K�ɃZ�b�g����
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1�o���������̂Ń��[�v�𔲂���
			                    break;
			                }
			            }
				}
			if(score>9){
			 				// �V���b�g��ł��ǂ����p�����[�^�̒l����`�F�b�N
				if(enemy[i].param % 70 === 0){
			            // �G�l�~�[�V���b�g�𒲍�����
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // �G�l�~�[�V���b�g��V�K�ɃZ�b�g����
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1�o���������̂Ń��[�v�𔲂���
			                    break;
			                }
			            }
				}
			}
			if(score>19){
			 				// �V���b�g��ł��ǂ����p�����[�^�̒l����`�F�b�N
				if(enemy[i].param % 50 === 0){
			            // �G�l�~�[�V���b�g�𒲍�����
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // �G�l�~�[�V���b�g��V�K�ɃZ�b�g����
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1�o���������̂Ń��[�v�𔲂���
			                    break;
			                }
			            }
				}
			}

				if(score>29){
			 				// �V���b�g��ł��ǂ����p�����[�^�̒l����`�F�b�N
				if(enemy[i].param % 20 === 0){
			            // �G�l�~�[�V���b�g�𒲍�����
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // �G�l�~�[�V���b�g��V�K�ɃZ�b�g����
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1�o���������̂Ń��[�v�𔲂���
			                    break;
			                }
			            }
				}
			}




				    // �p�X�������������
				ctx.closePath();
			}
		}
	// �G�l�~�[�̐F��ݒ肷��
		ctx.fillStyle = ENEMY_COLOR;
		
     // �G�l�~�[��`��
		ctx.fill();



	   // �p�X�̐ݒ���J�n
		ctx.beginPath();

		  // ���ׂẴG�l�~�[�V���b�g�𒲍�����
		for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
		 // �G�l�~�[�V���b�g�����ɔ��˂���Ă��邩�`�F�b�N
			if(enemyShot[i].alive){
			 // �G�l�~�[�V���b�g�𓮂���
				enemyShot[i].move();
				
		      // �G�l�~�[�V���b�g��`���p�X��ݒ�
				ctx.arc(
					enemyShot[i].position.x,
					enemyShot[i].position.y,
					enemyShot[i].size,
					0, Math.PI * 2, false
				);

				ctx.closePath();
			}
		}
		
 		 // �G�l�~�[�V���b�g�̐F��ݒ肷��
		ctx.fillStyle = ENEMY_SHOT_COLOR;
		
        // �G�l�~�[�V���b�g��`��
		ctx.fill();
        // �Փ˔��� -----------------------------------------------------------
        // ���ׂĂ̎��@�V���b�g�𒲍�����
        for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
            // ���@�V���b�g�̐����t���O���`�F�b�N
            if(charaShot[i].alive){
                // ���@�V���b�g�ƃG�l�~�[�Ƃ̏Փ˔���
                for(j = 0; j < ENEMY_MAX_COUNT; j++){
                    // �G�l�~�[�̐����t���O���`�F�b�N
                    if(enemy[j].alive){
                        // �G�l�~�[�Ǝ��@�V���b�g�Ƃ̋������v��
                        p = enemy[j].position.distance(charaShot[i].position);
                        if(p.length() < enemy[j].size){
                            // �Փ˂��Ă����琶���t���O���~�낷
                            enemy[j].alive = false;
                            charaShot[i].alive = false;
				SE3.play();
                   	 // �X�R�A���X�V���邽�߂ɃC���N�������g
                   	 	score++;
				
                            // �Փ˂��������̂Ń��[�v�𔲂���
                            break;
                        }
                    }
                }
            }
        }

	// ���@�ƃG�l�~�[�V���b�g�Ƃ̏Փ˔���
	for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
	    // �G�l�~�[�V���b�g�̐����t���O���`�F�b�N
	    if(enemyShot[i].alive){
	        // ���@�ƃG�l�~�[�V���b�g�Ƃ̋������v��
	        p = chara.position.distance(enemyShot[i].position);
	        if(p.length() < chara.size){

		life=life-1;
		lifeBar.value--;
		SE2.play();
		message = '�C�^�C...\n';
		if(life==0){
		

	            // �Փ˂��Ă����琶���t���O���~�낷
	            chara.alive = false;

	            // �Փ˂��������̂Ńp�����[�^��ύX���ă��[�v�𔲂���
	            run = false;
		    document.getElementById("sound2").pause();
		document.getElementById("sound").pause();
	            message = '�������`���b�^��...GAME OVER !!\n';
	            break;
			}
	        }
	    }
	}



	break;
}

	// HTML���X�V
	info.innerHTML = 'SCORE:  ' + (score * 100) +' �c��HP:  '+life+' ' + message;

        // �t���O�ɂ��ċA�Ăяo��
        if(run){setTimeout(arguments.callee, fps);}
    })();
};
       

// - event --------------------------------------------------------------------
function mouseMove(event){
    // �}�E�X�J�[�\�����W�̍X�V
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    // �L�[�R�[�h���擾
    var ck = event.keyCode;

    // Esc�L�[��������Ă�����t���O���~�낷
    if(ck === 27){run = false;}
}
function mouseDown(event){
    // �t���O�𗧂Ă�
    fire = true;
	SE.play();
	
}