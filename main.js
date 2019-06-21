// - global -------------------------------------------------------------------
var screenCanvas, info,info2;
var run = true;
var fps=1000/60;
var mouse = new Point();
var ctx; // canvas2d コンテキスト格納用
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
    // スクリーンの初期化
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 587;
    screenCanvas.height = 453;
	// 自機の初期位置を修正
	mouse.x = screenCanvas.width / 2;
	mouse.y = screenCanvas.height - 20;
    // 2dコンテキスト
    ctx = screenCanvas.getContext('2d');

	//イベントの登録
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('mousedown', mouseDown, true);
	window.addEventListener('keydown', keyDown, true);
	
   // その他のエレメント関連
	info = document.getElementById('info');
 	sound = document.getElementById("sound");
	sound2 = document.getElementById("sound2");
	SE = document.getElementById("SE");
	SE2 = document.getElementById("SE2");
	SE3 = document.getElementById("SE3");
	var lifeBar = document.getElementById('lifeBar');

    // 自機初期化
  	 var chara = new Character();
  	 chara.init(10);
	//自機ショット初期化
	var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
  	  charaShot[i] = new CharacterShot();
	}

    // エネミー初期化
	var enemy = new Array(ENEMY_MAX_COUNT);
	for(i = 0; i < ENEMY_MAX_COUNT; i++){
	    enemy[i] = new Enemy();
	}
	// エネミーショット初期化
	var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
	for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
	    enemyShot[i] = new EnemyShot();
	}
	
    // レンダリング処理を呼び出す
    (function(){
	
	counter++;
	
	document.getElementById("sound").play();
        // screenクリア 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
	var img = new Image();    //画像オブジェクト作成
  	img.src = "ha.jpg"//背景
	ctx.drawImage(img, 0, 0) ;
        // パスの設定を開始
        ctx.beginPath();
	//
	chara.position.x = mouse.x;
	chara.position.y = mouse.y;

	ctx.arc(chara.position.x+3, chara.position.y, 18, 0, Math.PI * 2, false);
        // 円の色を設定する
        ctx.fillStyle = CHARA_COLOR;
        var img = new Image();    //画像オブジェクト作成
  	img.src = "2.png"//自機
	ctx.drawImage(img, chara.position.x-20, chara.position.y-24,45,50) ;

        // 円を描く
       ctx.fill();
	// fireフラグの値により分岐
	if(fire){
	    // すべての自機ショットを調査する	
	    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        // 自機ショットが既に発射されているかチェック
        	if(!charaShot[i].alive){
            	// 自機ショットを新規にセット
            	charaShot[i].set(chara.position, 3, 5);

           	 // ループを抜ける
           	 break;
       		 }
	    }
    		// フラグを降ろしておく
   		 fire = false;
	}

       // 自機ショット --------------------------------------------------
	// パスの設定を開始
	ctx.beginPath();

	// すべての自機ショットを調査する
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
  	  // 自機ショットが既に発射されているかチェック
    	if(charaShot[i].alive){
    	    // 自機ショットを動かす
    	   	 charaShot[i].move();
	
        	// 自機ショットを描くパスを設定
        	ctx.arc(
            	charaShot[i].position.x,
           	 charaShot[i].position.y,
            	10,
           	 0, Math.PI * 2, false
       		 );
		var img = new Image();    //画像オブジェクト作成
		img.src = "fire.png"//炎の魔法発動
		ctx.drawImage(img,charaShot[i].position.x-15, charaShot[i].position.y-30,30,50) ;
		    // パスをいったん閉じる
	        // パスをいったん閉じる
		
        	ctx.closePath();
    		}
	}

	// 自機ショットの色を設定する
	ctx.fillStyle = CHARA_SHOT_COLOR;

	// 自機ショットを描く
	ctx.fill();

	// エネミーの出現管理 -------------------------------------------------
// 100 フレームに一度出現させる
	if(counter % 100 === 0){
	    // すべてのエネミーを調査する
 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
 	       // エネミーの生存フラグをチェック
	       if(!enemy[i].alive){
 	           // タイプを決定するパラメータを算出
  	          j = (counter % 200) / 100;
  	          // タイプに応じて初期位置を決める
  	          var enemySize = 20;
   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
  	          p.y = screenCanvas.height-270 ;
	
  	          // エネミーを新規にセット
  	          enemy[i].set(p, enemySize, j);
	
  	          // 1体出現させたのでループを抜ける
   	         break;
   	     }
 	   }
	}
	if(score>9){

		if(counter % 200 === 0){
		    // すべてのエネミーを調査する
	 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
	 	       // エネミーの生存フラグをチェック
		       if(!enemy[i].alive){
	 	           // タイプを決定するパラメータを算出
	  	          j = (counter % 200) / 100;
	  	          // タイプに応じて初期位置を決める
	  	          var enemySize = 15;
	   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
	  	          p.y = screenCanvas.height-320 ;
		
	  	          // エネミーを新規にセット
	  	          enemy[i].set(p, enemySize, j);
		
	  	          // 1体出現させたのでループを抜ける
	   	         break;
	   	     }
	 	   }
		}
      }
	if(score>19){
	if(counter % 200 === 0){
		    // すべてのエネミーを調査する
	 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
	 	       // エネミーの生存フラグをチェック
		       if(!enemy[i].alive){
	 	           // タイプを決定するパラメータを算出
	  	          j = (counter % 200) / 100;
	  	          // タイプに応じて初期位置を決める
	  	          var enemySize = 10;
	   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
	  	          p.y = screenCanvas.height-380 ;
		
	  	          // エネミーを新規にセット
	  	          enemy[i].set(p, enemySize, j);
		
	  	          // 1体出現させたのでループを抜ける
	   	         break;
	   	     }
	 	   }
		}
	}
	if(score>29){
	if(counter % 100 === 0){
		    // すべてのエネミーを調査する
	 	   for(i = 0; i < ENEMY_MAX_COUNT; i++){
	 	       // エネミーの生存フラグをチェック
		       if(!enemy[i].alive){
	 	           // タイプを決定するパラメータを算出
	  	          j = (counter % 200) / 100;
	  	          // タイプに応じて初期位置を決める
	  	          var enemySize = 10;
	   	          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
	  	          p.y = screenCanvas.height-420 ;
		
	  	          // エネミーを新規にセット
	  	          enemy[i].set(p, enemySize, j);
		
	  	          // 1体出現させたのでループを抜ける
	   	         break;
	   	     }
	 	   }
		}
	}






			// カウンターの値によってシーン分岐
		switch(true){
		    // カウンターが70より小さい
		    case counter < 70:
		        message = 'READY...';
		        break;

		    // カウンターが100より小さい
		    case counter < 100:
		        message = 'GO!!';
		        break;

		    // カウンターが100以上
		    default:
		        message = '';

        // 以下処理が続く
        // エネミー -----------------------------------------------------------
        // パスの設定を開始
		ctx.beginPath();
		
		  // すべてのエネミーを調査する
		for(i = 0; i < ENEMY_MAX_COUNT; i++){
			// エネミーを動かす
			if(enemy[i].alive){
				  // エネミーを動かす
				enemy[i].move();
				
			// エネミーを描くパスを設定
				ctx.arc(
					enemy[i].position.x,
					enemy[i].position.y,
					enemy[i].size,
					0, Math.PI * 2, false
				);
				        var img = new Image();    //画像オブジェクト作成
  					img.src = "4.png"
					ctx.drawImage(img, enemy[i].position.x-25, enemy[i].position.y-25,50,50) ;
				i
 				// ショットを打つかどうかパラメータの値からチェック
				if(enemy[i].param % 80 === 0){
			            // エネミーショットを調査する
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // エネミーショットを新規にセットする
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1個出現させたのでループを抜ける
			                    break;
			                }
			            }
				}
			if(score>9){
			 				// ショットを打つかどうかパラメータの値からチェック
				if(enemy[i].param % 70 === 0){
			            // エネミーショットを調査する
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // エネミーショットを新規にセットする
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1個出現させたのでループを抜ける
			                    break;
			                }
			            }
				}
			}
			if(score>19){
			 				// ショットを打つかどうかパラメータの値からチェック
				if(enemy[i].param % 50 === 0){
			            // エネミーショットを調査する
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // エネミーショットを新規にセットする
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1個出現させたのでループを抜ける
			                    break;
			                }
			            }
				}
			}

				if(score>29){
			 				// ショットを打つかどうかパラメータの値からチェック
				if(enemy[i].param % 20 === 0){
			            // エネミーショットを調査する
			            for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
			                if(!enemyShot[j].alive){
			                    // エネミーショットを新規にセットする
			                    p = enemy[i].position.distance(chara.position);
			                    p.normalize();

			                    enemyShot[j].set(enemy[i].position, p, 5, 5);

			                    // 1個出現させたのでループを抜ける
			                    break;
			                }
			            }
				}
			}




				    // パスをいったん閉じる
				ctx.closePath();
			}
		}
	// エネミーの色を設定する
		ctx.fillStyle = ENEMY_COLOR;
		
     // エネミーを描く
		ctx.fill();



	   // パスの設定を開始
		ctx.beginPath();

		  // すべてのエネミーショットを調査する
		for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
		 // エネミーショットが既に発射されているかチェック
			if(enemyShot[i].alive){
			 // エネミーショットを動かす
				enemyShot[i].move();
				
		      // エネミーショットを描くパスを設定
				ctx.arc(
					enemyShot[i].position.x,
					enemyShot[i].position.y,
					enemyShot[i].size,
					0, Math.PI * 2, false
				);

				ctx.closePath();
			}
		}
		
 		 // エネミーショットの色を設定する
		ctx.fillStyle = ENEMY_SHOT_COLOR;
		
        // エネミーショットを描く
		ctx.fill();
        // 衝突判定 -----------------------------------------------------------
        // すべての自機ショットを調査する
        for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
            // 自機ショットの生存フラグをチェック
            if(charaShot[i].alive){
                // 自機ショットとエネミーとの衝突判定
                for(j = 0; j < ENEMY_MAX_COUNT; j++){
                    // エネミーの生存フラグをチェック
                    if(enemy[j].alive){
                        // エネミーと自機ショットとの距離を計測
                        p = enemy[j].position.distance(charaShot[i].position);
                        if(p.length() < enemy[j].size){
                            // 衝突していたら生存フラグを降ろす
                            enemy[j].alive = false;
                            charaShot[i].alive = false;
				SE3.play();
                   	 // スコアを更新するためにインクリメント
                   	 	score++;
				
                            // 衝突があったのでループを抜ける
                            break;
                        }
                    }
                }
            }
        }

	// 自機とエネミーショットとの衝突判定
	for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
	    // エネミーショットの生存フラグをチェック
	    if(enemyShot[i].alive){
	        // 自機とエネミーショットとの距離を計測
	        p = chara.position.distance(enemyShot[i].position);
	        if(p.length() < chara.size){

		life=life-1;
		lifeBar.value--;
		SE2.play();
		message = 'イタイ...\n';
		if(life==0){
		

	            // 衝突していたら生存フラグを降ろす
	            chara.alive = false;

	            // 衝突があったのでパラメータを変更してループを抜ける
	            run = false;
		    document.getElementById("sound2").pause();
		document.getElementById("sound").pause();
	            message = 'ヤラレチャッタヨ...GAME OVER !!\n';
	            break;
			}
	        }
	    }
	}



	break;
}

	// HTMLを更新
	info.innerHTML = 'SCORE:  ' + (score * 100) +' 残りHP:  '+life+' ' + message;

        // フラグにより再帰呼び出し
        if(run){setTimeout(arguments.callee, fps);}
    })();
};
       

// - event --------------------------------------------------------------------
function mouseMove(event){
    // マウスカーソル座標の更新
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    // キーコードを取得
    var ck = event.keyCode;

    // Escキーが押されていたらフラグを降ろす
    if(ck === 27){run = false;}
}
function mouseDown(event){
    // フラグを立てる
    fire = true;
	SE.play();
	
}