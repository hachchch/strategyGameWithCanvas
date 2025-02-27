function translate(){
    let gc="";
    if(players[P].calendar.years!=globalCalender){
        gc=`(${globalCalender}年)`;
    }
    let year=players[P].calendar.years;
    if(Math.sign(year)==-1){
        year=`紀元前${-year}`;
    }
    cal.innerHTML=`${players[P].calendar.name}歴${year}年${gc}`;
    frames++;
    if(buildings.findIndex((elem)=>elem.name=="アルテミス神殿" && elem.owner==P)!=-1){
    science[P]=culturePt[P]*3;
    }else{
    science[P]=culturePt[P]*2;
    }
    if(displayMode!="スタート前"){
    document.querySelector(".t0").innerHTML="ターン"+turn+",プレイヤー"+(P+1)+",科学力"+science[P]+"労働意欲"+opinions[P].morale;
    document.querySelector(".t1").innerHTML=food[P]+"(+"+foodPt[P]+")";
    document.querySelector(".t2").innerHTML=basicResources[P]+"(+"+bRPt[P]+")";
    document.querySelector(".t3").innerHTML=culture[P]+"(+"+culturePt[P]+")";
    if(partsPt[P]>0){
    document.querySelector(".t4").innerHTML="部品:"+parts[P]+"(+"+partsPt[P]+")";
        }else{
        document.querySelector(".t4").innerHTML="";
        }
    if(keyInt>0){
    keyInt--;
        if(keyInt<0){
            keyInt=0;
        }
    }
    diplomacyButtons.innerHTML="";
        if(players[P].name!=selectedPlayers.value){
    if(players[P].war.indexOf(selectedPlayers.value)!=-1){
    diplomacyButtons.innerHTML+=`<input type="button" onclick="demandPeace(P,${players.findIndex((e)=>e.name==selectedPlayers.value)});" value="和平交渉" />`;
        }else{
    diplomacyButtons.innerHTML+=`<input type="button" onclick="declareWar(P,${players.findIndex((e)=>e.name==selectedPlayers.value)});" value="宣戦布告" />`;
        }
        }else{
            diplomacyButtons.innerHTML+="あなた";
            }
        }
    if(displayMode=="ワールドマップ"){
    ctx.fillStyle="#8FCCFD";
    }
    if(displayMode=="技術ツリー"){
    ctx.fillStyle="#003a76";
    }
    if(displayMode=="宇宙空間"){
    ctx.fillStyle="#000000";
    }
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(historical){
        ctx.drawImage(imgEarth,earthposition[0],earthposition[1],earthposition[2],earthposition[3],earthposition[4],earthposition[5],earthposition[6],earthposition[7]);
    }
    ctx.beginPath();
    ctx.moveTo(0,canvas.height-98);
    ctx.lineTo(canvas.width,canvas.height-98);
    ctx.lineTo(canvas.width,canvas.height-102);
    ctx.lineTo(0,canvas.height-102);
    ctx.lineTo(0,canvas.height-98);
    ctx.fillStyle="#000000";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,canvas.height-100,canvas.width,canvas.height);
    if(!historical && (displayMode=="スタート前" || displayMode=="宇宙空間")){
        ctx.fillStyle="#ffffff";
        if(displayMode=="スタート前"){
            let index=planets.findIndex((e)=>e.name==planets[0].name);
            ctx.beginPath();
            if(index!=-1){
            ctx.arc(canvas.width/2+50,(canvas.height-100)/2-110+20*Math.cos(frames/40),planets[index].radius,0,Math.PI*2);
            ctx.fill();
                }
            ctx.closePath();
            ctx.fillText(worldName,canvas.width/2+50,(canvas.height-100)/2-140+20*Math.cos(frames/40));
            //地球
            ctx.beginPath();
            ctx.arc(canvas.width/2-350,(canvas.height-100)/2-110+20*Math.cos(frames/40),planets[index].radius,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
            ctx.fillText("地球",canvas.width/2-350,(canvas.height-100)/2-140+20*Math.cos(frames/40));
        }
        for(const p of particles){
            ctx.fillRect(p.x-2,p.y-2,4,4);
            p.x-=2;
            p.y+=2;
            if(p.x<0){
                p.x=canvas.width;
            }
            if(p.y>canvas.height-100){
                p.y=0;
            }
        }
        ctx.fillStyle="#000000";
    }
    //歴史モード
    campaign.innerHTML="";
    if(historical && displayMode=="スタート前"){
        for(const s of stages){
            campaign.innerHTML+=`
            ${s.name}<input type="button" value="表示" onclick="moveEarth(${s.x},${s.y})" /><input type="button" value="開始" onclick="loadcampaign(${s.id})" /><br>
            `
        }
    }
    if(displayMode=="ワールドマップ"){
    ctx.fillStyle="#000000";
        /*タイル系*/
    for(const t of tiles){
    ctx.strokeStyle="#000000";
        if(t.planet==mapPlanet[P]){
    ctx.beginPath();
    ctx.moveTo(t.hexX,t.hexY);
    for(let i=1; i<=6; ++i){
    t.hexX=t.hexX+hexSize*Math.cos((i/2)*(2*Math.PI/3));
    t.hexY=t.hexY+hexSize*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(t.hexX,t.hexY);
    }
    if(t.type=="Land"){
        if(worldMapDisplay=="州"){
            ctx.fillStyle=regions[tilesRegion(t.id)][2];
        }else if(worldMapDisplay=="軍事"){
            let id=territory(tilesRegion(t.id));
            if(id!=100){
            ctx.fillStyle=players[id].color;
            }else{
            ctx.fillStyle="#ffffff";
            }
        }else{
        ctx.fillStyle="#ffffff";
        }
    }else if(t.type=="Water"){
    ctx.fillStyle="#8FCCFD";
    }
    if(t.type!="Water"){
    ctx.stroke();
    }
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    if(h.collisionHex(t.hexX-hexSize*1.5,t.hexY,hexSize,mouse.x,mouse.y) || (editar===true && t.id==selectedTile) || (t.status=="移動可能" || t.status=="攻撃可能")){
        if(!infoScreen && editar===false && h.collisionHex(t.hexX-hexSize*1.5,t.hexY,hexSize,mouse.x,mouse.y)){
    //selectedTile=t.id;
        }
    let offset=hexSize/12;
    let tHexX=t.centroid.x+((hexSize-offset)/2);
    let tHexY=t.centroid.y-(hexSize-offset)*Math.sin(2*Math.PI/3);
    ctx.moveTo(tHexX,tHexY);
    for(let i=1; i<=6; ++i){
    tHexX=tHexX+(hexSize-offset)*Math.cos((i/2)*(2*Math.PI/3));
    tHexY=tHexY+(hexSize-offset)*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(tHexX,tHexY);
    }
        }
    if(units.findIndex((e)=>e.assign==t.id && isEnemy(P,e.owner) && P!=e.owner)!=-1){
    ctx.strokeStyle="#ff0000";
    }else if(units.findIndex((e)=>e.assign==t.id && !isEnemy(P,e.owner) && P!=e.owner)!=-1){
    ctx.strokeStyle=players[units[units.findIndex((e)=>e.assign==t.id && !isEnemy(P,e.owner) && P!=e.owner)].owner].color;
    }else if((units.findIndex((e)=>e.status=="選択中" && e.assign==t.id)!=-1) || (editar===true && t.id==selectedTile)){
    ctx.strokeStyle="#0000ff";
    }else if(units.findIndex((e)=>e.status=="行動終了" && e.assign==t.id)!=-1){
    ctx.strokeStyle="#bbbbbb";
    }else if(h.collisionHex(t.hexX-90,t.hexY,60,mouse.x,mouse.y)){
    ctx.strokeStyle="#000000";
    }else if(t.status=="攻撃可能"){
        ctx.strokeStyle="#ff0000";
    }else if(t.status=="移動可能" && units.findIndex((u)=>u.status=="選択中" && hasEffect(u.seed,"軍用航空機"))==-1){
        if(units.findIndex((e)=>e.assign==t.id)!=-1){
        ctx.strokeStyle="#bbbbbb";
        }else{
        ctx.strokeStyle="#41a1fc";
        }
    }
    ctx.stroke();
    ctx.closePath();
    }
        }//tiles終了
        //Features
    for(const t of tiles){
        if(t.feature=="Forest" && t.planet==mapPlanet[P]){
            if(units.findIndex((u)=>u.assign==t.id)!=-1 || buildings.findIndex((u)=>u.assign==t.id)!=-1 || worldMapDisplay!="なし"){
                if(worldMapDisplay!="なし"){
                    ctx.globalAlpha=0.2;
                }else{
                    ctx.globalAlpha=0.3;
                }
            }else{
                ctx.globalAlpha=1;
            }
            ctx.drawImage(imgForest,t.centroid.x-0.9*hexSize,t.centroid.y-0.9*hexSize-0.25*hexSize,1.8*hexSize,1.8*hexSize);
        }
    }
    }
    ctx.closePath();
    ctx.globalAlpha=1;
    ctx.beginPath();
    /*ボタン系*/
    for(const b of buttons){
        if(b.display=="エディタ"){
            if(editar===true){
                ctx.fillStyle="#ffffff";
        ctx.fillRect(b.x,b.y,b.w,b.h);
        if(b.status=="待機"){
        ctx.strokeStyle="#000000";
            }else{
            ctx.strokeStyle="#003a76";
            }
        ctx.strokeRect(b.x,b.y,b.w,b.h);
        ctx.fillStyle="#000000";
        ctx.fillText(b.label,b.x+b.w/2,b.y+b.h/2);
        if(b.interval>0){
            //console.log(b.interval);
            }else if(b.interval==0){
                if(b.label=="ユニットモード"){
                    buildMode=0;
                }
                if(b.label=="ビルドモード"){
                    buildMode=1;
                }
                if(b.label=="強化モード"){
                    buildMode=2;
                }
                if(b.label=="地形モード"){
                    buildMode=4;
                }
            if(b.label=="リージョンモード"){
                    buildMode=6;
                }
            if(b.label=="首都変更"){
                    buildMode=5;
                }
            if(b.label=="削除モード"){
                    buildMode=3;
                }
            if(b.label=="プレイヤー変更"){
                    P++;
                if(P>=players.length){
                    P=0;
                    }
                }
            }
                }
            }
        if((displayMode==b.display && !(b.display=="スタート前" && historical)) || (b.display=="地図" && historical)){
        if(b.label!="宇宙空間" || buildings.findIndex((e)=>e.owner==P && e.name=="宇宙基地")!=-1 || buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡" && elem.owner==P)!=-1 || players[P].discoveredPlanets.length>1){
        ctx.fillStyle="#ffffff";
        ctx.fillRect(b.x,b.y,b.w,b.h);
        if(b.status=="待機"){
        ctx.strokeStyle="#000000";
            }else{
            ctx.strokeStyle="#003a76";
            }
        ctx.strokeRect(b.x,b.y,b.w,b.h);
        ctx.fillStyle="#000000";
            if(b.label=="技術ツリー" && techs.findIndex((e)=>e.status2=="選択中" && e.assign==P)!=-1){
                let index=techs.findIndex((e)=>e.status2=="選択中" && e.assign==P);
                ctx.fillText(`${techs[index].name}`,b.x+b.w/2,b.y+b.h/2-11);
                ctx.fillText(`${techs[index].progress}/${techs[index].require}`,b.x+b.w/2,b.y+b.h/2+11);
                }else{
                ctx.fillText(b.label,b.x+b.w/2,b.y+b.h/2);
                }
            }
        }
        if(b.interval>0){
            b.interval--;
            }else if(b.interval==0){
            if(b.label=="技術ツリー"){
                displayMode="技術ツリー";
            }
            if(b.label=="地図モード変更"){
                if(worldMapDisplay=="なし"){
                worldMapDisplay="州";
                }else if(worldMapDisplay=="州"){
                worldMapDisplay="軍事";
                }else if(worldMapDisplay=="軍事"){
                worldMapDisplay="なし";
                }
            }
            if(b.label=="政府"){
                displayMode="政府";
            }
            if(b.label=="情報"){
                if(infoScreen){
                infoScreen=false;
                }else if(selectedTile!=-1){
                infoScreen=true;
                }
            }
            if(b.label=="ワールドマップ"){
                displayMode="ワールドマップ";
            }
            if(b.label=="宇宙空間"){
                displayMode="宇宙空間";
            }
            if(b.label=="ゲーム開始！"){
                //<input type="button" value="再生成" onclick="regenerateMap(parseInt(document.getElementById('hexLength').value))" />
                if(newGame===true){
                regenerateMap(parseInt(document.getElementById("hexLength").value));
                let era=document.querySelector("#eras").value;
                if(era=="石器時代"){
                    startLevel(1);
                }
                if(era=="古代"){
                    startLevel(2);
                }
                if(era=="中世"){
                    startLevel(3);
                }
                if(era=="産業時代"){
                    startLevel(4);
                }
                if(era=="情報化時代"){
                    startLevel(5);
                }
                if(era=="未来"){
                    startLevel(6);
                }
                    }
                document.querySelector("#control").innerHTML=`
                <input type="button" id="next" value="次のターン" onclick="nextTurn()" /><br>
        資源<br>
        <t class="t0"></t><br>食料:<t class="t1"></t>,物資:<t class="t2"></t>,文化:<t class="t3"></t><t class="t4"></t>`;
                let playerOptions="";
                for(let k=0; k<players.length; ++k){
                    playerOptions+="<option>"
                    playerOptions+=players[k].name;
                    playerOptions+="</option>"
                }
                document.getElementById("diplomacy").innerHTML=`
                <hr>
        外交<br>
        相手<select id="selectedPlayers">
        ${playerOptions}
        </select>`;
                selectedPlayers=document.getElementById("selectedPlayers");
                displayMode="ワールドマップ";
                document.addEventListener('DOMContentLoaded',function(e){
            document.getElementById('next').addEventListener('click',function(e){
                if(connection!=""){
                connection.send('ターン'+Math.floor((turn+1)/2)+"プレイヤー"+P);
                    }
    });
});
            }
            if(b.label=="歴史モード"){
                historical=true;
            }
            if(b.label=="戻る"){
                historical=false;
            }
            b.status="待機";
            b.interval=-1;
        }
    }
    /*建物系*/
    if(displayMode=="ワールドマップ"){
    for(const b of buildings){
        if(b.planet==mapPlanet[P]){
            let capitalVer2=false;
            if(b.name=="首都"){
                if(level[b.owner]==1){
                    ctx.drawImage(imgCity1,b.x-2*hexSize/3,b.y-2*hexSize/3,4*hexSize/3,4*hexSize/3);
                    capitalVer2=true;
                }
                if(level[b.owner]==2){
                    ctx.drawImage(imgCity2,b.x-5*hexSize/6,b.y-50,100,100);
                    capitalVer2=true;
                }
                if(level[b.owner]==4){
                    ctx.drawImage(imgCity4,b.x-5*hexSize/6,b.y-5*hexSize/6,5*hexSize/3,5*hexSize/3);
                    capitalVer2=true;
                }
            }
            if(b.name=="農場"){
                ctx.drawImage(imgFarm,b.x-5*hexSize/6,b.y-5*hexSize/6,5*hexSize/3,5*hexSize/3);
                capitalVer2=true;
            }
            if(b.name=="鉱山"){
                ctx.drawImage(imgMine,b.x-4*hexSize/6,b.y-4*hexSize/6,4*hexSize/3,4*hexSize/3);
                capitalVer2=true;
                
            }
        if(b.type!="🌾" && b.name!="鉱山" && b.name!="塹壕" && b.name!="有刺鉄線" && capitalVer2===false){
        rect(b.x,b.y-hexSize/6,hexSize,b.color);
        }
            if(b.delay==0 || b.owner!=P){
                if(b.owner!=P){
                if(isEnemy(P,b.owner)){
                ctx.fillStyle="#ff0000";
                    }else{
                    ctx.fillStyle=players[b.owner].color;
                    }
                }else{
                    ctx.fillStyle=b.color;
                }
            }else{
                ctx.fillStyle="#cccccc";
            }
        if(b.type=="🏘" && capitalVer2===false){
            if(b.level==1){
        ctx.fillText("🏕",b.x,b.y-hexSize/60);
            }else if(b.level>3){
        ctx.fillText("🏬",b.x,b.y-hexSize/60);
            }else{
        ctx.fillText(b.type,b.x,b.y-hexSize/60);
            }
        }else if(b.name=="アレクサンドリア図書館"){
        ctx.fillText("📚"+b.str,b.x,b.y-hexSize/60);
        }else if(b.name=="姫路城"){
        ctx.fillText("🏯"+b.str,b.x,b.y-hexSize/60);
        }else if(b.name=="システィーナ礼拝堂"){
        ctx.fillText("🕍"+b.str,b.x,b.y-hexSize/60);
        }else if(capitalVer2===false){
            if(b.name=="都市"){
        ctx.fillText(b.type,b.x,b.y-hexSize/60);
                }else{
        ctx.fillText(b.type+b.str,b.x,b.y-hexSize/60);
                }
        }
            if(b.name=="首都" || b.name=="都市"){
                ctx.fillText(b.str,b.x,b.y-5*hexSize/12);
            }
        if(b.owner!=100){
        ctx.fillText(b.hp,b.x,b.y+2*hexSize/3);
        }
        ctx.fill();
            }
    }
    ctx.closePath();
    ctx.fillStyle="#000000";
    /*ユニット系*/
    for(const u of units){
        if(u.death===undefined){
            u.death=false;
        }
        if(u.animation===undefined){
            u.animation={
                interval:0,
                stop:100,
                key:0,
                keyList:[0,1],
                keyIndex:0,
                changeInterval:0,
                changeIntMax:10,
                mode:"",
                global:""
            }
        }
        if(u.animation.mode!=""){
                u.animation.interval++;
                u.animation.changeInterval++;
                //keyInterval
                if(u.animation.changeInterval>=u.animation.changeIntMax){
                    u.animation.keyIndex++;
                    if(u.animation.keyIndex>=u.animation.keyList.length){
                        u.animation.keyIndex=0;
                    }
                    u.animation.key=u.animation.keyList[u.animation.keyIndex];
                    u.animation.changeInterval=0;
                }
                //mainInterval
                if(u.animation.interval>=u.animation.stop && u.animation.stop!=-1){
                    if(u.animation.mode!="死亡"){
                    const lastMode=u.animation.mode;
                    u.animation.mode="";
                    u.animation.interval=0;
                    u.animation.changeInterval=0;
                    if(u.death){
                        playDeathAnimation(unitId(u.seed));
                    }else if(lastMode=="射撃"){
                        playSelectAnimation(unitId(u.seed));
                    }
                    }else{
                        deleteObject("units",u.assign);
                    }
                }
        }
        if(u.death && u.animation.mode==""){
            deleteObject("units",u.assign);
        }
        if(u.planet==mapPlanet[P]){
            if(u.owner!=P && hasEffect(u.seed,"ミサイルランチャー") && !u.embarked){
                if(u.status!="行動終了" && u.status!="防衛終了"){
                if(units.findIndex((e)=>Math.abs(e.x-u.x)<=300 && Math.abs(e.y-u.y)<=300 && u.owner!=e.owner && e.type=="🚀" && e.status=="哨戒")!=-1){
                units.push({
                    name:"地対空ミサイル",
                    type:"🚀",
                    effect:[],
                    str:75,
                    hp:100,
                    range:1,
                    move:units.findIndex((e)=>Math.abs(e.x-u.x)<=300 && Math.abs(e.y-u.y)<=300 && u.owner!=e.owner && e.type=="🚀"),
                    mp:12,
                    fly:true,
                    x:u.x,
                    y:u.y,
                    color:"#000000",status:"迎撃",assign:u.assign,
                    owner:u.owner,planet:u.planet,seed:Math.round(Math.random()*999999)});
                sam();
                u.status="行動終了";
                    }
                    }else if(u.status!="防衛終了" && units.findIndex((e)=>Math.abs(e.x-u.x)<=300 && Math.abs(e.y-u.y)<=300 && u.owner!=e.owner && (e.name=="反物質爆弾" || e.name=="核融合弾頭搭載ICBM" || e.name=="核弾頭搭載ICBM") && e.status=="哨戒")!=-1){
                    units.push({
                    name:"地対空ミサイル",
                    effect:[],
                    type:"🚀",
                    str:75,
                    hp:100,
                    range:1,
                    move:units.findIndex((e)=>Math.abs(e.x-u.x)<=300 && Math.abs(e.y-u.y)<=300 && u.owner!=e.owner && (e.name=="反物質爆弾" || e.name=="核融合弾頭搭載ICBM" || e.name=="核弾頭搭載ICBM") && e.status=="哨戒"),
                    mp:12,
                    fly:true,
                    x:u.x,
                    y:u.y,
                    color:"#000000",status:"迎撃",assign:u.assign,
                    owner:u.owner,planet:u.planet,seed:Math.round(Math.random()*999999)});
                sam();
                u.status="防衛終了";
                    }
            }
           if(u.name=="地対空ミサイル"){
                if(units.findIndex((e)=>Math.abs(e.x-u.x)<=350 && Math.abs(e.y-u.y)<=350 && u.owner!=e.owner && e.type=="🚀" && e.status=="哨戒")!=-1){
                let rad=Math.atan2(units[u.move].y-u.y,units[u.move].x-u.x);
                u.x=u.x+u.mp*Math.cos(rad);
                u.y=u.y+u.mp*Math.sin(rad);
                    }else{
                    let index=units.findIndex((e)=>e.seed==u.seed);
                    units.push("dammy");
                    units.length=units.copyWithin(index,units.length-1).length-1;
                    units.length=units.copyWithin(index,index+1).length-1;
                    }
            }
    if(u.status=="移動"){
        if(u.path.length>0){
        let rad=Math.atan2(tiles[u.path[0]].centroid.y-u.y,tiles[u.path[0]].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.path[0]].centroid.x)<u.mp+2 && Math.abs(u.y-tiles[u.path[0]].centroid.y)<u.mp+2){
            u.x=tiles[u.path[0]].centroid.x;
            u.y=tiles[u.path[0]].centroid.y;
            let destroyId=buildings.findIndex((b)=>b.assign==u.path[0] && b.name=="有刺鉄線" && isEnemy(u.owner,b.owner));
            if(destroyId!=-1){
                bomber2();
                h.deleteObject("buildings",destroyId);
            }
            u.path=u.path.slice(1,u.path.length);
        }
            }else{
            if(u.move<=0){
            u.animation.stop=0;
            u.status="行動終了";
            u.color="#cccccc";
                }else{
                u.animation.stop=0;
                u.status="待機";
                u.color="#000000";
                }
            }
        }
    if((u.type=="🛩" || u.type=="✈" || u.type=="🚀") && u.status=="哨戒"){
        let id=units.findIndex((e)=>e.seed==u.seed);
        let rad=Math.atan2(tiles[u.assign].centroid.y-u.y,tiles[u.assign].centroid.x-u.x);
        /*航空ユニットの移動*/
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(!hasEffect(u.seed,"ミサイル")){
            let antiAir=units.findIndex((e)=>e.status=="待機" && isEnemy(u.owner,e.owner) && !e.embarked && Math.abs(e.x-u.x)<=200 && Math.abs(e.y-u.y)<=200 && hasEffect(e.seed,"対空機銃"));
            if(antiAir!=-1){
                units[antiAir].status="行動終了";
                gatlingFire();
                let strength=34+Math.round(Math.random()*5-Math.random()*5);
                u.hp-=strength;
                popTexts.push({value:"-"+strength,x:u.x,y:u.y-25,interval:0,color:"#ff0000"});
                if(u.hp<=0){
                    bomber1();
                    h.deleteObject("units",units.findIndex((e)=>e.seed==u.seed));
                }
            }
        }
        if(hasEffect(u.seed,"ミサイル")){
            let antiMissile=units.findIndex((e)=>Math.abs(e.x-u.x)<=10 && Math.abs(e.y-u.y)<=10 && e.name=="地対空ミサイル");
        if(antiMissile!=-1){
            bomber1();
            u.assign=u.assignCamp;
            let index=units.findIndex((e)=>e.seed==u.seed);
                units.push("dammy");
units.length=units.copyWithin(index,units.length-1).length-1;
units.length=units.copyWithin(index,index+1).length-1;
                units.push("dammy");
units.length=units.copyWithin(antiMissile,units.length-1).length-1;
units.length=units.copyWithin(antiMissile,antiMissile+1).length-1;
        }
        }
        if(Math.abs(u.x-tiles[u.assign].centroid.x)<2*u.mp && Math.abs(u.y-tiles[u.assign].centroid.y)<2*u.mp){
            /*u.status="行動終了";
            u.color="#cccccc";*/
                u.status="撤退";
                u.color="#000000";
            if(!hasEffect(u.seed,"ミサイル")){
            let enemy=units.findIndex((elem)=>elem.assign==u.assign && elem.seed!=u.seed);
                if(enemy!=-1){
                    airAttackToUnits(id,enemy);
                    }else if(buildings.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner)!=-1){
                    let enemyBuilding=buildings.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner);
                    airAttackToBuildings(id,enemyBuilding);
                    }
            }else{
                if(hasEffect(u.seed,"大量破壊兵器")){
                explosion(units[id].seed);
                }else{
                    airAttack(id,u.assign);
                }
                u.assign=u.assignCamp;
                //deleteObject("units",u.assign);
                let index=units.findIndex((e)=>e.seed==u.seed);
                units.push("dammy");
units.length=units.copyWithin(index,units.length-1).length-1;
units.length=units.copyWithin(index,index+1).length-1;
                }
        }
    }else if((u.type=="🛩" || u.type=="✈") && u.status=="撤退"){
        let rad=Math.atan2(tiles[u.assignCamp].centroid.y-u.y,tiles[u.assignCamp].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.assignCamp].centroid.x)<2 && Math.abs(u.y-tiles[u.assignCamp].centroid.y)<2){
            /*u.status="行動終了";
            u.color="#cccccc";*/
            if(u.name=="艦上攻撃機"){
                h.deleteObject("units",units.findIndex((e)=>e.seed==u.seed));
            }
                u.status="行動終了";
                u.color="#cccccc";
            }
    }
    ctx.strokeStyle=u.color;
    ctx.beginPath();
    let skin=false;
    if(u.name=="戦士"){
    ctx.drawImage(imgWarrior,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
        skin=true;
    }
            if(u.name=="長槍兵"){
    ctx.drawImage(imgPike,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="戦列歩兵"){
    ctx.drawImage(imgLineInfantry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="歩兵"){
    ctx.drawImage(imgInfantry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="新式歩兵"){
    ctx.drawImage(imgNewInfantry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="騎兵"){
    ctx.drawImage(imgCavalry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="槍兵"){
    ctx.drawImage(imgSpearman,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="弓兵"){
    ctx.drawImage(imgBowman,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="長剣士"){
    ctx.drawImage(imgLongSwordman,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="剣士"){
    ctx.drawImage(imgSwordman,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="弩兵"){
    ctx.drawImage(imgCrossbowman,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="現代歩兵"){
    ctx.drawImage(imgModernInfantry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="短機関銃兵"){
                if(u.animation.mode=="射撃"){
                    if(u.animation.key==0){
    ctx.drawImage(imgSubmachinegun_fire1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }else{
    ctx.drawImage(imgSubmachinegun_fire2,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
    }else if(u.animation.mode=="死亡"){
                    if(u.animation.key==4){
                        ctx.drawImage(imgSubmachinegun_death1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                    if(u.animation.key==2){
                        ctx.drawImage(imgSubmachinegun_death2,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                    if(u.animation.key==3){
                        ctx.drawImage(imgSubmachinegun_death3,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                    }else if(u.animation.mode=="移動"){
                    if(u.animation.key==0){
    ctx.drawImage(imgSubmachinegun_death1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }else{
    ctx.drawImage(imgSubmachinegun_death1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                    }else{
                    //その他
                    if(u.status=="選択中"){
                        if(u.animation.mode=="選択"){
                            if(u.animation.key==0){
                                ctx.drawImage(imgSubmachinegun_walk1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                            }else{
                                ctx.drawImage(imgSubmachinegun_walk2,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                            }
                        }else{
                        ctx.drawImage(imgSubmachinegun,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                        }
                    }else{
                        if(u.animation.mode=="選択"){
                            if(u.animation.key==0){
                                ctx.drawImage(imgSubmachinegun_walk2,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                            }else{
                                ctx.drawImage(imgSubmachinegun_walk1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                            }
                        }else{
                        ctx.drawImage(imgSubmachinegun_wait,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                        }
                    }
                }
                skin=true;
    }
            if(u.name=="火炎放射兵"){
    ctx.drawImage(imgFlamethrower,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="騎士"){
    ctx.drawImage(imgKnight,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="重機関銃兵"){
    ctx.drawImage(imgMaximGun,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="胸甲騎兵"){
    ctx.drawImage(imgCuirassier,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="竜騎兵"){
    ctx.drawImage(imgDragoon,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="装甲車"){
    ctx.drawImage(imgArmoredCar,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="戦車弓兵"){
    ctx.drawImage(imgBowCavalry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="軽火砲"){
    ctx.drawImage(imgLightArtillery,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="重装歩兵"){
    ctx.drawImage(imgHoplite,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="突撃歩兵"){
    ctx.drawImage(imgMotorizedInfantry,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="榴弾砲"){
    ctx.drawImage(imgHowitzer,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="特殊部隊"){
    ctx.drawImage(imgSpecial,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="主力戦車"){
    ctx.drawImage(imgModernTank,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="歩兵戦車"){
    ctx.drawImage(imgTank,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="投石"){
    ctx.drawImage(imgBaller,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="ガレー船"){
    ctx.drawImage(imgGalley,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="戦闘機"){
    ctx.drawImage(imgFighter,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="爆撃機" || u.name=="艦上攻撃機"){
    ctx.drawImage(imgBomber,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="三葉戦闘機"){
    ctx.drawImage(imgTriplane,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="三段櫂船"){
    ctx.drawImage(imgTrireme,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="戦艦"){
    ctx.drawImage(imgBattleship,u.x-(4*hexSize/3),u.y-(4*hexSize/3),(8*hexSize/3),(8*hexSize/3));
                skin=true;
    }
            if(u.name=="私掠船"){
    ctx.drawImage(imgPrivateer,u.x-hexSize,u.y-hexSize,2*hexSize,2*hexSize);
                skin=true;
    }
            if(u.name=="蒸気船"){
    ctx.drawImage(imgSteamboat,u.x-(4*hexSize/3),u.y-(4*hexSize/3),(8*hexSize/3),(8*hexSize/3));
                skin=true;
    }
            if(u.name=="駆逐艦"){
    ctx.drawImage(imgDestroyer,u.x-(4*hexSize/3),u.y-(4*hexSize/3),(8*hexSize/3),(8*hexSize/3));
                skin=true;
    }
            if(u.name=="巡洋艦"){
    ctx.drawImage(imgCruiser,u.x-(4*hexSize/3),u.y-(4*hexSize/3),(8*hexSize/3),(8*hexSize/3));
                skin=true;
    }
            if(u.name=="ミサイル巡洋艦"){
    ctx.drawImage(imgMissileCruiser,u.x-(4*hexSize/3),u.y-(4*hexSize/3),(8*hexSize/3),(8*hexSize/3));
                skin=true;
    }
            if(u.name=="航空母艦"){
    ctx.drawImage(imgAircraftCarrior,u.x-(4*hexSize/3),u.y-(4*hexSize/3),(8*hexSize/3),(8*hexSize/3));
                skin=true;
    }
            if(u.name=="潜水艦"){
    ctx.drawImage(imgSubmarine,u.x-hexSize,u.y-hexSize,2*hexSize,2*hexSize);
                skin=true;
    }
            if(u.name=="首長"){
    ctx.drawImage(imgSettler,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                skin=true;
    }
            if(u.name=="労働者"){
                skin=true;
                if(level[u.owner]==1){
    ctx.drawImage(imgWorker1,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                if(level[u.owner]==2){
    ctx.drawImage(imgWorker2,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                if(level[u.owner]==3){
    ctx.drawImage(imgWorker3,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                if(level[u.owner]==4){
    ctx.drawImage(imgWorker4,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
                if(level[u.owner]>=5){
    ctx.drawImage(imgWorker5,u.x-(2*hexSize/3),u.y-(2*hexSize/3),4*hexSize/3,4*hexSize/3);
                    }
    }
            if(u.embarked){
                if(level[u.owner]<4){
    ctx.drawImage(imgLandingShip,u.x-hexSize/2,u.y-hexSize/2,4*hexSize/3,4*hexSize/3);
                }else{
    ctx.drawImage(imgLandingCraft,u.x-hexSize/2,u.y-hexSize/2,4*hexSize/3,4*hexSize/3);
                }
            skin=true;
    }
    if(!skin){
    ctx.arc(u.x,u.y,hexSize/6,0,2*Math.PI);
    }
    if(popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-hexSize*Math.sqrt(3)/2)!=-1){
    ctx.fillStyle=popTexts[popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-hexSize*Math.sqrt(3)/2)].color;
    ctx.fill();
    }
            if(!u.death){
            if(u.name=="労働者"){
                if(u.status=="建設中" || u.status=="強化中"){
                ctx.fillStyle="#777777";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(2*hexSize/3),5*hexSize/6,hexSize/12);
            ctx.fillStyle="#cccccc";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(2*hexSize/3),u.hp*(5*hexSize/6)/100,hexSize/12);
                    }
            }else{
        ctx.fillStyle="#ff0000";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(2*hexSize/3),5*hexSize/6,hexSize/12);
            ctx.fillStyle="#cccccc";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(2*hexSize/3),u.hp*(5*hexSize/6)/100,hexSize/12);
                if(u.armor>0){
                if(u.armorLevel==1){
                ctx.fillStyle="#4f2d00";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(47*hexSize/60),5*hexSize/6,hexSize/12);
                ctx.fillStyle="#fdc18b";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(47*hexSize/60),u.armor*(5*hexSize/6)/u.armorMax,hexSize/12);
                }
                if(u.armorLevel==2){
                ctx.fillStyle="#555555";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(47*hexSize/60),5*hexSize/6,hexSize/12);
                ctx.fillStyle="#cfcfcf";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(47*hexSize/60),u.armor*(5*hexSize/6)/u.armorMax,hexSize/12);
                }
                if(u.armorLevel==3){
                ctx.fillStyle="#7a7500";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(47*hexSize/60),5*hexSize/6,hexSize/12);
                ctx.fillStyle="#f1fab6";
            ctx.fillRect(u.x-(5*hexSize/12),u.y-(47*hexSize/60),u.armor*(5*hexSize/6)/u.armorMax,hexSize/12);
                }
                }
                }
                }
        if(u.owner==P){
    if(u.status=="選択中"){
    ctx.fillStyle="#0000ff";
        }else if(u.status=="行動終了"){
    ctx.fillStyle="#cccccc";
        }else{
    ctx.fillStyle="#000000";
        }
    }else{
            if(isEnemy(P,u.owner)){
    ctx.fillStyle="#ff0000";
                }else{
    ctx.fillStyle=players[u.owner].color;
    ctx.strokeStyle=players[u.owner].color;
                }
    }
        if(u.name=="炎のドラゴン" || u.name=="闇のドラゴン" || u.name=="光のドラゴン"){
    ctx.fillText("🐲"+u.str,u.x,u.y+25);
            }else{
            if(u.embarked){
                if(level[u.owner]<4){
            ctx.fillText("🛶"+u.type+u.embstr,u.x,u.y+25);
                }else{
            ctx.fillText("🛥️"+u.type+u.embstr,u.x,u.y+25);
                }
            }else{
            ctx.fillText(u.type+u.str,u.x,u.y+25);
            }
            }
    if(!skin){
    ctx.stroke();
        }
        }
    }
    }
    /*技術ツリーについて*/
    if(displayMode=="技術ツリー"){
        let a=0;
        for(const t of techs){
            if(t.assign==P){
                t.x=10+160*a-(160*9)*Math.floor(a/9);
                t.y=10+110*Math.floor(a/9);
            if(t.status=="未発見"){
                if(t.status2=="待機"){
            ctx.fillStyle="#b9fbef";
                }else{
                    ctx.fillStyle="#9da8ff";
                }
                }else{
            ctx.fillStyle="#f0fdcb";
                }
            ctx.fillRect(t.x,t.y,150,100);
            ctx.strokeStyle="#002b36";
            ctx.strokeText(t.name,t.x+75,t.y+25);
            if(t.status=="未発見"){
                if(t.progress==0){
            ctx.strokeText(`未発見`,t.x+75,t.y+50);
            ctx.strokeText(`研究コスト${t.require}`,t.x+75,t.y+75);
                    }else{
            ctx.strokeText(`研究中${t.progress}/${t.require}`,t.x+75,t.y+50);
                    }
            }else{
                ctx.strokeText(`発見済`,t.x+75,t.y+50);
            }
                a++;
            }
        }
    }
    /*宇宙空間*/
    if(displayMode=="宇宙空間"){
    for(const p of planets){
        ctx.beginPath();
        ctx.fillStyle="#ffffff";
        if(players[P].discoveredPlanets.indexOf(p.name)!=-1){
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fill();
        if(p.name==mapPlanet[P]){
        ctx.fillText("現在地:"+p.name,p.x+p.radius/2,p.y+p.radius+10);
            }else{
        ctx.fillText(p.name,p.x+p.radius/2,p.y+p.radius+10);
            }
            }
        ctx.closePath();
    }
        }
    /*州*/
    for(const r of regions){
        if(r[0]==mapPlanet[P] && displayMode=="ワールドマップ"){
        if(worldMapDisplay=="州"){
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#ffffff";
        vector=regionCentral(r[3]);
            ctx.font = "33px serif";
        ctx.strokeText(r[3],vector.x,vector.y);
        ctx.fillText(r[3],vector.x,vector.y);
        }
        }
    }
    if(worldMapDisplay=="軍事" && displayMode=="ワールドマップ"){
        let politicalRegions=[];
        for(const p of players){
            politicalRegions.push([]);
        }
        for(const r of regions){
            if(territory(regions.findIndex((e)=>e[1]==r[1]))!=100){
                for(const r1 of r[1]){
            politicalRegions[territory(regions.findIndex((e)=>e[1]==r[1]))].push(r1);
                }
            }
        }
        //console.log(politicalRegions);
        for(let k=0; k<politicalRegions.length; ++k){
            let x=0;
            let y=0;
            for(let i=0; i<politicalRegions[k].length; ++i){
                if(politicalRegions[k][i]){
                x+=tiles[politicalRegions[k][i]].centroid.x;
                y+=tiles[politicalRegions[k][i]].centroid.y;
                }
            }
            x=x/politicalRegions[k].length;
            y=y/politicalRegions[k].length;
            ctx.fillStyle="#000000";
            ctx.strokeStyle="#ffffff";
            ctx.font = "33px serif";
            ctx.strokeText(players[k].name,x,y);
            ctx.fillText(players[k].name,x,y);
        }
    }
    ctx.font = "22px serif";
    /*ダメージ等のテキストのUI*/
    for(const p of popTexts){
        ctx.beginPath();
        if(!p.colorA){
            p.colorA="ff";
            }
        ctx.fillStyle=p.color+p.colorA;
        ctx.fillText(p.value,p.x,p.y);
        ctx.fill();
        if(p.interval<=30){
        p.y+=-Math.cos((p.interval/60)*Math.PI);
            }else{
            p.colorA=(255-(p.interval-30)*4).toString(16);
            }
        p.interval++;
        if(p.interval>90){
            let index=popTexts.findIndex((elem)=>elem.interval>p.interval);
            popTexts.push("dammy");
            popTexts.length=popTexts.copyWithin(index,popTexts.length-1).length-1;
            popTexts.length=popTexts.copyWithin(index,index+1).length-1;
            }
    }
    /*info*/
    if(infoScreen){
    infoDraw();
    }
    ctx.strokeStyle="#000000";
    requestAnimationFrame(translate);
}