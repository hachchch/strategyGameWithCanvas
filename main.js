const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const mouse = {x: null,y: null}
var tiles=[];
var units=[];
var buildings=[];
var popTexts=[];
var food=[5,5];
var foodPt=[1,1];
var basicResources=[2,2];
var bRPt=[1,1];
var culture=[10,10];
var culturePt=[2,2];
var parts=[0,0];
var partsPt=[0,0];
var level=[1,1];
var P=0;
var turn=1;
var selectedTile=-1;
canvas.addEventListener('mousemove', (evt) => {
    mouse.x = evt.offsetX;
    mouse.y = evt.offsetY;
});
canvas.style.border = "3px solid";
ctx.font = "22px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
let isFirst=0;
function translate(){
    document.querySelector(".t0").innerHTML="ターン"+Math.floor((turn+1)/2)+",プレイヤー"+P;
    document.querySelector(".t1").innerHTML=food[P]+"(+"+foodPt[P]+")";
    document.querySelector(".t2").innerHTML=basicResources[P]+"(+"+bRPt[P]+")";
    document.querySelector(".t3").innerHTML=culture[P]+"(+"+culturePt[P]+")";
    if(partsPt[P]>0){
    document.querySelector(".t4").innerHTML="部品:"+parts[P]+"(+"+partsPt[P]+")";
        }else{
        document.querySelector(".t4").innerHTML="";
        }
    isFirst++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    let hexX=100;
    let hexY=10;
    let k=0;
    let k2=0;
    while(hexX<canvas.width){
    ctx.moveTo(hexX,hexY);
    ctx.fillStyle="#ffffff";
    for(let i=1; i<=6; ++i){
    hexX=hexX+60*Math.cos((i/2)*(2*Math.PI/3));
    hexY=hexY+60*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(hexX,hexY);
    }
    if(isFirst<=1){
    tiles.push({id:k2,centroid:{x:hexX-30,y:hexY+60*Math.sin(2*Math.PI/3)}});
    k2++;
    }
    if(hexY+240*Math.sin(2*Math.PI/3)>=canvas.height){
        k++;
        if(k>2){
            k=1;
            }
        hexX=hexX+120+60*Math.cos(2*Math.PI/3);
        hexY=10+60*Math.sin(2*Math.PI/3)*(1-Math.floor(k/2));
    }else{
        hexY=hexY+120*Math.sin(2*Math.PI/3);
    }
    }
    ctx.fillStyle="#000000";
    selectedTile=-1;
    for(const t of tiles){
        if(Math.abs(t.centroid.x-mouse.x)<45 && Math.abs(t.centroid.y-mouse.y)<52){
    let tHexX=t.centroid.x+27.5;
    let tHexY=t.centroid.y-55*Math.sin(2*Math.PI/3);
    ctx.moveTo(tHexX,tHexY);
    for(let i=1; i<=6; ++i){
    tHexX=tHexX+55*Math.cos((i/2)*(2*Math.PI/3));
    tHexY=tHexY+55*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(tHexX,tHexY);
    }
        selectedTile=t.id;
        }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    /*建物系*/
    for(const b of buildings){
        if(b.type!="🌾" && b.name!="鉱山"){
        rect(b.x,b.y-10,60,b.color);
        }
        ctx.fillStyle=b.color;
        if(b.type=="🏘"){
            if(b.level==1){
        ctx.fillText("🏕"+b.str,b.x,b.y-10);
            }else if(b.level>3){
        ctx.fillText("🏬"+b.str,b.x,b.y-10);
            }else{
        ctx.fillText(b.type+b.str,b.x,b.y-10);
            }
        }else{
        ctx.fillText(b.type+b.str,b.x,b.y-10);
        }
        ctx.fillText(b.hp+"%",b.x,b.y+40);
        ctx.fill();
    }
    ctx.closePath();
    ctx.fillStyle="#000000";
    /*ユニット系*/
    for(const u of units){
    if(u.status=="移動"){
        let rad=Math.atan2(tiles[u.assign].centroid.y-u.y,tiles[u.assign].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.assign].centroid.x)<2 && Math.abs(u.y-tiles[u.assign].centroid.y)<2){
            u.move--;
            if(u.move<=0){
            u.status="行動終了";
            u.color="#cccccc";
                }else{
                u.status="待機";
                u.color="#000000";
                }
            }
        }
    if((u.type=="🛩" || u.type=="✈" || u.type=="🚀") && u.status=="哨戒"){
        let rad=Math.atan2(tiles[u.assign].centroid.y-u.y,tiles[u.assign].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.assign].centroid.x)<2*u.mp && Math.abs(u.y-tiles[u.assign].centroid.y)<2*u.mp){
            /*u.status="行動終了";
            u.color="#cccccc";*/
                u.status="撤退";
                u.color="#000000";
            let enemy=units.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner);
                if(enemy!=-1){
                    let power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    let powerEnemy=(units[enemy].str*(units[enemy].hp/100)*(Math.random()*0.25+1));
                    if((u.range<=units[enemy].range || units[enemy].name=="地対空ミサイルランチャー") && units[enemy].type!="⚒"){
                        let damageEnemy=Math.ceil(25*(powerEnemy/power));
                    u.hp=u.hp-damageEnemy;
                    popTexts.push({value:"-"+damageEnemy,x:u.x,y:u.y-25,interval:0,color:"#ff0000"});
                        }
                    if(units[enemy].type=="⚒"){
                        deleteObject("units",units[enemy].assign);
                        }else{
                        let damage=Math.ceil(25*(power/powerEnemy));
                        units[enemy].hp=units[enemy].hp-damage;
                        popTexts.push({value:"-"+damage,x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                        }
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                bomber2();
                }else{
            bomber1();
                }
                    u.assign=u.assignCamp;
                    if(units[enemy].hp<=0){
                        deleteObject("units",units[enemy].assign);
                        }
                    if(u.hp<=0){
                        deleteObject("units",u.assign);
                        }
                    }else if(buildings.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner)!=-1){
                    let enemyBuilding=buildings.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner);
                    let power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    let damage=0;
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                bomber2();
                }else{
            bomber1();
                }
                    if(buildings[enemyBuilding].type=="🏘"){
                        damage=Math.ceil(12.5*(power/(buildings[enemyBuilding].hp/10)));
                    buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }else{
                        damage=Math.ceil(33*(power/(buildings[enemyBuilding].hp/10)));
                        buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }
                    popTexts.push({value:"-"+damage,x:buildings[enemyBuilding].x,y:buildings[enemyBuilding].y-25,interval:0,color:"#ff0000"});
                    if(buildings[enemyBuilding].hp<=0){
                        if(buildings[enemyBuilding].type=="🏘" || buildings[enemyBuilding].type=="🏠"){
                        buildings[enemyBuilding].hp=1;
                            }else{
                            deleteObject("buildings",buildings[enemyBuilding].assign);
                            }
                        }
                    u.assign=u.assignCamp;
                    }
            if(u.type=="🚀"){
                deleteObject("units",u.assign);
                }
            }
    }else if((u.type=="🛩" || u.type=="✈" || u.type=="🚀") && u.status=="撤退"){
        let rad=Math.atan2(tiles[u.assignCamp].centroid.y-u.y,tiles[u.assignCamp].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.assignCamp].centroid.x)<2 && Math.abs(u.y-tiles[u.assignCamp].centroid.y)<2){
            /*u.status="行動終了";
            u.color="#cccccc";*/
                u.status="行動終了";
                u.color="#cccccc";
            }
    }
    ctx.strokeStyle=u.color;
    ctx.beginPath();
    ctx.arc(u.x,u.y,10,0,2*Math.PI);
    ctx.fillText(u.hp+"%",u.x,u.y-25);
        if(u.name=="炎のドラゴン" || u.name=="闇のドラゴン" || u.name=="光のドラゴン"){
    ctx.fillText("🐲"+u.str,u.x,u.y+25);
            }else{
            ctx.fillText(u.type+u.str,u.x,u.y+25);
            }
    ctx.stroke();
    }
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
    ctx.strokeStyle="#000000";
    requestAnimationFrame(translate);
}
translate();

canvas.addEventListener("click",(evt)=>{
    for(const b of buildings){
        if(b.owner==P && Math.abs(mouse.x-b.x)<45 && Math.abs(mouse.y-b.y)<52 && units.findIndex((elem)=>elem.assign==b.assign)==-1){
if(b.status!="選択中"){
if(b.status=="待機"){
    b.color="#003be3";
    b.status="選択中";
}
}else{
if(b.status=="選択中"){
                b.status="待機";
                b.color="#000000";
                    }
    }
}else if(b.owner==P){
    b.status="待機";
    b.color="#000000";
}
}
for(const u of units){
    if(u.owner==P){
        if(u.status=="待機" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
    u.color="#003be3";
    u.status="選択中";
    }else{
                if(Math.abs(mouse.x-u.x)<45 && Math.abs(mouse.y-u.y)<52 && u.status=="選択中"){
                u.status="待機";
                u.color="#000000";
                    }
        }
    if(u.status=="選択中"){
            if(selectedTile!=-1){
            if(Math.abs(tiles[selectedTile].centroid.x-mouse.x)<45 && Math.abs(tiles[selectedTile].centroid.y-mouse.y)<52 && (Math.abs(tiles[selectedTile].centroid.x-u.x)>=2 || Math.abs(tiles[selectedTile].centroid.y-u.y)>=2) && units.findIndex((elem)=>selectedTile==elem.assign && elem.owner==P)==-1){
            if((Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*u.range+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*u.range+2) || (!(u.fly===false || !u.fly) && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀"))) && selectedTile!=u.assign){
                if((u.type=="🛩" || u.type=="✈" || u.type=="🚀") && (units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1 || buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1)){
                    u.assignCamp=u.assign;
                    u.assign=selectedTile;
                    u.status="哨戒";
                    if(u.name=="炎のドラゴン" || u.name=="闇のドラゴン" || u.name=="光のドラゴン"){
                        horseRun();
                    }else if(u.type=="🛩"){
                    flight();
                    }else if(u.type=="✈"){
                    jet();
                    }else{
                    sam();
                    }
                }
                if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)==-1 && buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)==-1 && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                    if(buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].type=="🛡" && u.type!="⚒"){
                        u.str=u.str-buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].str;
                        }
                        }
                    if(u.fly===false || !u.fly){
                    if(Math.abs(u.x-tiles[selectedTile].centroid.x)<(92) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(106)){
            u.assign=selectedTile;
            u.status="移動";
                        if(u.move==u.mp && (u.type=="🐴⚔" || u.type=="🐴🏹")){
                horseRun();
                }
                        }
                        }else{
                        if(Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*6+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*6+2)){
                        u.assign=selectedTile;
                        u.status="移動";
                            if(level[P]<5){
                        flight();
                            }else{
                            jet();
                            }
                            u.fly=false;
                            }
                        }
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                    if(buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].type=="🛡" && u.type!="⚒"){
                        u.str=u.str+buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].str;
                        }else if(buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].type=="🛬"){
                        u.fly=true;
                        }
                        }
                    }else if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1 && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
                    if(u.type=="⚔" || u.type=="🐴⚔"){
                        SwordAttack();
                    }else if(u.type=="💣" || u.type=="🚛⚔" || u.type=="🚗⚔" || u.type=="🚗🛰"){
                        cannon();
                    }else if(u.type=="🚗🚀"){
                        sam();
                    }else if(u.type=="🔫⚔" || u.type=="🔫" || u.type=="🔫🚛"){
                        rifleFire();
                    }else if(u.type=="🧨"){
                        gunFire();
                    }else if(u.type=="🔫🚗" || u.type=="🔫✩"){
                        machinegunFire();
                    }else if(u.type=="☄"){
                        beam();
                    }else if(u.type=="🧙🔥"){
                        fireball();
                    }else{
                        RangedAttack();
                    }
                    let enemy=units.findIndex((elem)=>elem.assign==selectedTile && elem.owner!=P);
                    let power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    let powerEnemy=(units[enemy].str*(units[enemy].hp/100)*(Math.random()*0.25+1));
                    let damage=Math.ceil(25*(power/powerEnemy));
                    units[enemy].hp=units[enemy].hp-damage;
                    if(u.range<=units[enemy].range && units[enemy].type!="⚒"){
                    let damageEnemy=Math.ceil(25*(powerEnemy/power));
                    u.hp=u.hp-damageEnemy;
                    popTexts.push({value:"-"+damageEnemy,x:u.x,y:u.y-25,interval:0,color:"#ff0000"});
                        }
                    if(units[enemy].type!="⚒"){
                        popTexts.push({value:"-"+damage,x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                        }
                    if(units[enemy].type=="⚒"){
                        if(buildings.findIndex((elem)=>elem.name=="自由の女神" && elem.owner!=P)!=-1){
                            if(Math.round()*100>=75){
                                deleteObject("units",units[enemy].assign);
                                }
                            }else{
                        deleteObject("units",units[enemy].assign);
                            }
                        }
                    if(units[enemy].hp<=0){
                        if(u.type=="🧙😖"){
                            train(units[enemy].name,units[enemy].type,units[enemy].str,units[enemy].range,units[enemy].mp,units[enemy].assign,[0,0,0],u.owner,(units[enemy].hp*-1));
                        }
                        deleteObject("units",units[enemy].assign);
                        }
                    if(u.hp<=0){
                        deleteObject("units",u.assign);
                        }
                    u.move=0;
                    u.status="行動終了";
                    u.color="#bbbbbb";
                    }else if(!(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
                    if(u.type=="⚔" || u.type=="🐴⚔"){
                        SwordAttack();
                    }else if(u.type=="💣" || u.type=="🚛⚔" || u.type=="🚗⚔" || u.type=="🚗🛰"){
                        cannon();
                    }else if(u.type=="🚗🚀"){
                        sam();
                    }else if(u.type=="🔫⚔" || u.type=="🔫" || u.type=="🔫🚛"){
                        rifleFire();
                    }else if(u.type=="🧨"){
                        gunFire();
                    }else if(u.type=="🔫🚗" || u.type=="🔫✩"){
                        machinegunFire();
                    }else if(u.type=="☄"){
                        beam();
                    }else if(u.type=="🧙🔥"){
                        fireball();
                    }else{
                        RangedAttack();
                    }
                    let enemyBuilding=buildings.findIndex((elem)=>elem.assign==selectedTile && elem.owner!=P && !(u.type=="🛩" || u.type=="✈"));
                    let power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    let damage=0;
                    if(buildings[enemyBuilding].type=="🏘"){
                        damage=Math.ceil(12.5*(power/(buildings[enemyBuilding].hp/10)));
                    buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }else{
                        damage=Math.ceil(33*(power/(buildings[enemyBuilding].hp/10)));
                        buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }
                    popTexts.push({value:"-"+damage,x:buildings[enemyBuilding].x,y:buildings[enemyBuilding].y-25,interval:0,color:"#ff0000"});
                    if(buildings[enemyBuilding].hp<=0){
                        deleteObject("buildings",buildings[enemyBuilding].assign);
                        }
                    u.move=0;
                    u.status="行動終了";
                    u.color="#bbbbbb";
                    }
                }
                }else if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner==P && elem.assign!=u.assign)!=-1 && u.type=="🧙❤"){
                    let selectedUnits=units.findIndex((elem)=>elem.assign==selectedTile && elem.owner==P);
                    if(units[selectedUnits].hp<100){
                        heal();
                        units[selectedUnits].hp+=u.str;
                        popTexts.push({value:"+"+u.str,x:units[selectedUnits].x,y:units[selectedUnits].y-25,interval:0,color:"#00ee00"});
                        if(units[selectedUnits].hp>=100){
                            units[selectedUnits].hp=100;
                        }
                        u.move=0;
                        u.status="行動終了";
                        u.color="#bbbbbb";
                    }
                    }
            }
                }
    }
    if(u.status=="選択中" && units.findIndex((elem)=>elem.status=="選択中" && elem.assign!=u.assign)!=-1){
    u.status="待機";
    u.color="#000000";
        }
    }
});
let randomCity=[Math.round(Math.random()*71),Math.round(Math.random()*71)];
units.push({name:"労働者",type:"⚒",str:"",hp:0,range:1,move:2,mp:2,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],owner:0});
buildings.push({name:"首都",type:"🏘",str:"",hp:100,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],level:1,owner:0});
buildings.push({name:"首都",type:"🏘",str:"",hp:100,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1});
while(Math.abs(buildings[0].x-buildings[1].x)<500 && Math.abs(buildings[0].y-buildings[1].y)<500){
    deleteObject("buildings",parseInt(randomCity[1]));
    randomCity=[randomCity[0],Math.round(Math.random()*71)];
buildings.push({name:"首都",type:"🏘",str:"",hp:100,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1});
    }
units.push({name:"労働者",type:"⚒",str:"",hp:0,range:1,move:2,mp:2,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],owner:1});

function nextTurn(){
    food[P]=parseInt(food[P])+parseInt(foodPt[P]);
    basicResources[P]=parseInt(basicResources[P])+parseInt(bRPt[P]);
    culture[P]=parseInt(culture[P])+parseInt(culturePt[P]);
    parts[P]=parseInt(parts[P])+parseInt(partsPt[P]);
    for(const u of units){
        u.move=u.mp;
        if(u.status!="建設中" && u.status!="強化中" && u.status!="哨戒" && u.status!="撤退"){
        u.status="待機";
        u.color="#000000";
            }
        if(!(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
        u.x=tiles[u.assign].centroid.x;
        u.y=tiles[u.assign].centroid.y;
            }
        if(u.type!="⚒"){
        if(u.hp<100){
        u.hp=u.hp+Math.round(Math.random()*3);
            if(buildings.findIndex((elem)=>elem.assign==u.assign && elem.type=="❤")!=-1 && u.hp<=100){
                u.hp+=buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].str;
                }
            if(u.hp>100){
                u.hp=100;
                }
            }
        }else{
            if(u.hp<100 && u.status=="建設中"){
                if(buildings.findIndex((elem)=>elem.name=="ビッグベン" && elem.owner==u.b.owner)!=-1){
                u.hp=u.hp+Math.round(Math.random()*50);
                    }else{
        u.hp=u.hp+Math.round(Math.random()*33);
                    }
            if(u.hp>=100){
                if(buildings.findIndex((elem)=>elem.name=="ピラミッド" && elem.owner==u.b.owner)!=-1 && u.str=="農場"){
                    u.b.str++;
                }
                if(buildings.findIndex((elem)=>elem.name=="ストーンヘンジ" && elem.owner==u.b.owner)!=-1 && u.str=="鉱山"){
                    u.b.str++;
                }
                if(buildings.findIndex((elem)=>elem.name=="スマートシティ" && elem.owner==u.b.owner)!=-1 && (u.b.type=="🌾" || u.b.type=="📖" || u.b.type=="🏭" || u.b.type=="⚙")){
                    u.b.str+=6;
                }
              buildings.push({name:u.str,type:u.b.type,str:u.b.str,hp:100,x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,color:"#000000",status:u.b.status,assign:u.assign,level:1,owner:u.b.owner});
                if(u.b.type=="🌾"){
                foodPt[u.b.owner]+=u.b.str;
                }else if(u.b.type=="⚙"){
                bRPt[u.b.owner]+=u.b.str;
                }else if(u.b.type=="📖"){
                culturePt[u.b.owner]+=u.b.str;
                }else if(u.b.type=="🏭"){
                partsPt[u.b.owner]+=u.b.str;
                }
                u.hp=0;
                u.str="";
                u.status="待機";
                u.color="#000000";
                }
            }else  if(u.hp<100 && u.status=="強化中"){
                if(buildings.findIndex((elem)=>elem.name=="ビッグベン" && elem.owner==u.b[5])!=-1){
                u.hp=u.hp+Math.round(Math.random()*75);
                    }else{
                u.hp=u.hp+Math.round(Math.random()*50);
                    }
            if(u.hp>=100){
              deleteObject("buildings",u.assign);
              buildings.push({name:u.b[0],type:u.b[1],str:u.b[2],hp:100*(1+0.25*(u.b[3]-1)),x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,color:"#000000",status:u.b[4],assign:u.assign,level:u.b[3],owner:u.b[5]});
                if(u.b[1]=="🌾"){
                foodPt[u.b[5]]+=u.b[2];
                }else if(u.b[1]=="⚙"){
                bRPt[u.b[5]]+=u.b[2];
                }else if(u.b[1]=="📖"){
                culturePt[u.b[5]]+=u.b[2];
                }else if(u.b[1]=="🏭"){
                partsPt[u.b[5]]+=u.b[2];
                }else if(u.b[1]=="🏘"){
                    fanfTrigger();
                    level[u.b[5]]=parseInt(level[u.b[5]])+1;
                }
                u.hp=0;
                u.str="";
                u.status="待機";
                u.color="#bbbbbb";
                }
            }
            }
        if(u.owner==P){
            u.color="#ff0000";
        }else if(u.status=="建設中" || u.status=="強化中"){
            u.color="#bbbbbb";
            }
        }
    for(const b of buildings){
        b.color="#000000";
        if(b.status=="選択中"){
        b.status="待機";
        }
        if(b.hp<100*(1+0.25*(b.level-1))){
        b.hp=b.hp+Math.round(Math.random()*10);
        }else if(b.hp>100*(1+0.25*(b.level-1))){
            b.hp=100*(1+0.25*(b.level-1));
        }
        if(b.owner==P){
            b.color="#ff0000";
        }
    }
    P=Math.round((1/2)*Math.sin((2*turn-1)*(Math.PI/2))+(1/2));
    turn++;
}

function construction(name,type,str,status,cultureCost){
    if(!cultureCost){
        cultureCost=0;
        }
    if(culture[P]>=cultureCost){
    culture[P]=culture[P]-cultureCost;
    for(const u of units){
        if(u.type=="⚒" && u.status=="選択中"){
            if(buildings.findIndex((elem)=>elem.assign==u.assign)==-1){
                BuildUp();
            u.str=name;
            let owner=u.owner;
            u.b={type,str,status,owner};
            u.status="建設中";
            u.color="#bbbbbb";
                }
        }
    }
    }
}
function train(name,type,str,range,mp,assign,resources,instantOwner,instantHp){
    if(!instantOwner && !instantHp){
    if(units.findIndex((elem)=>elem.assign==assign)==-1 && resources[0]<=food[P] && resources[1]<=basicResources[P] && resources[2]<=parts[P]){
        food[P]=food[P]-resources[0];
        basicResources[P]=basicResources[P]-resources[1];
        parts[P]=parts[P]-resources[2];
        if(type=="⚒"){
            units.push({name:name,type:type,str:str,hp:0,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P});
            }else{
    units.push({name:name,type:type,str:str,hp:100,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P});
            }
        }
        }else{
        if(!instantHp){
            instantHp=100;
            }
        food[P]=food[P]-resources[0];
        basicResources[P]=basicResources[P]-resources[1];
        parts[P]=parts[P]-resources[2];
        if(type=="⚒"){
            units.push({name:name,type:type,str:str,hp:0,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:instantOwner});
            }else{
    units.push({name:name,type:type,str:str,hp:instantHp,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:instantOwner});
            }
        }
}
function upgrade(assign,cultureCost){
    if(cultureCost<=culture[P]){
    for(const u of units){
        if(u.assign==assign){
            BuildUp();
            let upgradeOn=buildings.findIndex((elem)=>elem.assign==assign);
            u.str=buildings[upgradeOn].name+"レベル"+(buildings[upgradeOn].level+1);
            let uStr=Math.round(buildings[upgradeOn].str*1.25)+1;
            if(buildings[upgradeOn].type=="🏘" || buildings[upgradeOn].type=="🏠" || buildings[upgradeOn].type=="🛬"){
                uStr="";
                }
            u.b=[buildings[upgradeOn].name,buildings[upgradeOn].type,uStr,buildings[upgradeOn].level+1,buildings[upgradeOn].status,u.owner];
            u.status="強化中";
            u.color="#bbbbbb";
        }
    }
    culture[P]=culture[P]-cultureCost;
    }
}
function rect(ax,ay,r,color){
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.fillRect(ax-(r/2),ay-(r/2),r,r);
    ctx.clearRect(ax-(r/2)+1,ay-(r/2)+1,r-2,r-2);
}
function deleteObject(objects,assign){
    let syntax=`
let index=`+objects+`.findIndex((elem)=>elem.assign==`+assign+`);
let objectOwner=`+objects+`[index].owner;
if(`+objects+`[index].type=='🌾'){
    foodPt[objectOwner]=foodPt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='⚙'){
    bRPt[objectOwner]=bRPt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='📖'){
    culturePt[objectOwner]=culturePt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='🏭'){
    partsPt[objectOwner]=partsPt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='⚒'){
    death();
}
`+objects+`.push("dammy");
`+objects+`.length=`+objects+`.copyWithin(index,`+objects+`.length-1).length-1;
`+objects+`.length=`+objects+`.copyWithin(index,index+1).length-1;`;
    eval(syntax);
}
canvas.addEventListener("click",(evt)=>{
    document.querySelector("#information").innerHTML="";
    for(const u of units){
    for(const b of buildings){
    if(u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)==-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
                document.querySelector("#information").innerHTML=`建築<br>
        レベルI
        <input type="button" value="農場" onclick="construction(this.value,'🌾',2,'栽培中')" />
        <input type="button" value="見張台" onclick="construction(this.value,'🛡',3,'稼働中')" />
        <input type="button" value="鉱山" onclick="construction(this.value,'⚙',2,'稼働中')" /><br>`;
                if(level[P]>1){
                    document.querySelector("#information").innerHTML+=`
        レベルII
        <input type="button" value="都市" onclick="construction(this.value,'🏠','','待機')" />
        <input type="button" value="大学" onclick="construction(this.value,'📖',2,'稼働中')" />
        <input type="button" value="城塞" onclick="construction(this.value,'🛡',12,'稼働中')" /><br>`;
            }
                if(level[P]>2){
                    document.querySelector("#information").innerHTML+=`
        レベルIII
        <input type="button" value="神殿" onclick="construction(this.value,'❤',6,'稼働中')" />
        <input type="button" value="市場" onclick="construction(this.value,'⚖','','稼働中')" />
        <input type="button" value="演劇場" onclick="construction(this.value,'📖',5,'稼働中')" /><br>`;
                    }
                if(level[P]>3){
                    document.querySelector("#information").innerHTML+=`
        レベルIV
        <input type="button" value="穀倉地帯" onclick="construction(this.value,'🌾',8,'栽培中')" />
        <input type="button" value="工場" onclick="construction(this.value,'⚙',12,'稼働中')" />
        <input type="button" value="精製プラント" onclick="construction(this.value,'🏭',2,'稼働中')" />
        <input type="button" value="空港" onclick="construction(this.value,'🛬','','待機')" />
        <input type="button" value="軍事基地" onclick="construction(this.value,'🛡',36,'稼働中')" /><br>`;
                    }
                if(level[P]>4){
                    document.querySelector("#information").innerHTML+=`
        レベルV
        <input type="button" value="病院" onclick="construction(this.value,'❤',12,'稼働中')" />
        <input type="button" value="テレビ局" onclick="construction(this.value,'📖',12,'稼働中')" />
        <input type="button" value="原子力発電所" onclick="construction(this.value,'🏭',14,'稼働中')" />
        <input type="button" value="ミサイルポッド" onclick="construction(this.value,'🚀','','待機')" /><br>`;
                    }
                if(level[P]>5){
                    document.querySelector("#information").innerHTML+=`
        レベルVI
        <input type="button" value="宇宙基地" onclick="construction(this.value,'🛰','','稼働中')" /><br>`;
                    }
        if(level[P]==1){
            if(buildings.findIndex((elem)=>elem.name=="ストーンヘンジ")==-1 || buildings.findIndex((elem)=>elem.name=="ピラミッド")==-1){
                    document.querySelector("#information").innerHTML+=`
                    遺産<br>`;
                    }
            if(buildings.findIndex((elem)=>elem.name=="ストーンヘンジ")==-1 && units.findIndex((elem)=>elem.str=="ストーンヘンジ")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化10]効果：この遺産が建設されてから建てられる鉱山の生産が1増加<input type="button" value="ストーンヘンジ" onclick="construction(this.value,'🗿','','稼働中',10)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="ピラミッド")==-1 && units.findIndex((elem)=>elem.str=="ピラミッド")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化10]効果：この遺産が建設されてから建てられる農場の生産が1増加<input type="button" value="ピラミッド" onclick="construction(this.value,'▲','','稼働中',10)" /><br>`;
                }
                    }
        if(level[P]==2){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="ドラゴンの巣")==-1 && units.findIndex((elem)=>elem.str=="ドラゴンの巣")==-1){
            document.querySelector("#information").innerHTML+=`コスト[文化25]効果：ドラゴンが生産できるようになる<input type="button" value="ドラゴンの巣" onclick="construction(this.value,'🥚','','稼働中',25)" /><br>`;
                }
                    }
        if(level[P]==3){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="魔法使いの塔")==-1 && units.findIndex((elem)=>elem.str=="魔法使いの塔")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化100]効果：魔法使いが生産できるようになる<input type="button" value="魔法使いの塔" onclick="construction(this.value,'🏰','','稼働中',100)" /><br>`;
                }
                    }
        if(level[P]==4){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="ビッグベン")==-1 && units.findIndex((elem)=>elem.str=="ビッグベン")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化225]効果：労働者の作業時間が短縮される<input type="button" value="ビッグベン" onclick="construction(this.value,'⌚','','稼働中',225)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="自由の女神")==-1 && units.findIndex((elem)=>elem.str=="自由の女神")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化225]効果：労働者が75%の確率で攻撃を生き延びる<input type="button" value="自由の女神" onclick="construction(this.value,'🧍','','稼働中',225)" /><br>`;
                }
                    }
        if(level[P]==5){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="スマートシティ")==-1 && units.findIndex((elem)=>elem.str=="スマートシティ")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化500]効果：この遺産が建設されてから建てられる全ての建物からの生産が6増加<input type="button" value="スマートシティ" onclick="construction(this.value,'🏠','','待機',500)" /><br>`;
                }
                    }
        if(level[P]>5){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="火星植民地化")==-1 && units.findIndex((elem)=>elem.str=="火星植民地化")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化1000]効果：科学勝利<input type="button" value="火星植民地化" onclick="construction(this.value,'🌐',プレイヤー'`+P+`の科学勝利！','稼働中',1000)" /><br>`;
                }
                    }
                    }else if(u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)!=-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
                    let cost=100;
                    let assignning=buildings.findIndex((elem)=>elem.assign==u.assign);
                    if(buildings[assignning].name=="首都"){
                            cost=Math.round(25*(buildings[assignning].level**1.75));
                    }else{
                        cost=Math.round(10*(buildings[assignning].level**1.5));
                    }
                    document.querySelector("#information").innerHTML=`コスト[文化`+cost+`]<input type="button" value="アップグレード" onclick="upgrade(`+u.assign+`,`+cost+`)" /><br><br><input type="button" value="破壊" onclick="deleteObject('buildings',`+u.assign+`);" /><br><input type="button" value="解雇" onclick="deleteObject('units',`+u.assign+`); food[P]=food[P]+3" /><br>`;
                    }else if(u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="体力"+u.hp+"<br>戦闘力"+u.str+"<br>状態:"+u.status+"<br><br><input type='button' value='解雇' onclick='deleteObject(\"units\","+u.assign+")'>";
        }else if(b.status=="選択中" && (b.type=="🏘" || b.type=="🏠") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML=`必要[食料8]<input type="button" value="労働者" onclick="train(this.value,'⚒','',1,2,`+b.assign+`,[8,0,0])" /><br>`;
        if(level[P]==1){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資1]<input type="button" value="戦士" onclick="train(this.value,'⚔',5,1,2,`+b.assign+`,[3,1,0])" />攻撃力5<br>
        必要[食料3,物資2]<input type="button" value="投石" onclick="train(this.value,'🏹',4,2,2,`+b.assign+`,[3,2,0])" />攻撃力4射程2<br>`;
            }else if(level[P]==2){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資3]<input type="button" value="槍兵" onclick="train(this.value,'⚔',9,1,2,`+b.assign+`,[3,3,0])" />攻撃力9<br>
        必要[食料4,物資9]<input type="button" value="重装歩兵" onclick="train(this.value,'⚔',11,1,2,`+b.assign+`,[4,9,0])" />攻撃力11<br>
        必要[食料10,物資18]<input type="button" value="戦車弓兵" onclick="train(this.value,'🐴🏹',8,2,3,`+b.assign+`,[10,18,0])" />攻撃力8移動力3射程2<br>
        必要[食料10,物資6]<input type="button" value="騎兵" onclick="train(this.value,'🐴⚔',9,1,3,`+b.assign+`,[10,6,0])" />攻撃力9移動力3<br>
        必要[食料3,物資7]<input type="button" value="弓兵" onclick="train(this.value,'🏹',8,2,2,`+b.assign+`,[3,7,0])" />攻撃力8射程2<br>`;
            }else if(level[P]==3){
        document.querySelector("#information").innerHTML+=`
        必要[食料6,物資7]<input type="button" value="長槍兵" onclick="train(this.value,'⚔',12,1,2,`+b.assign+`,[6,7,0])" />攻撃力12<br>
        必要[食料8,物資10]<input type="button" value="剣士" onclick="train(this.value,'⚔',18,1,2,`+b.assign+`,[8,10,0])" />攻撃力18<br>
        必要[食料6,物資8]<input type="button" value="弩兵" onclick="train(this.value,'🏹',17,2,2,`+b.assign+`,[6,8,0])" />攻撃力17射程2<br>
        必要[食料13,物資14]<input type="button" value="騎士" onclick="train(this.value,'🐴⚔',21,1,3,`+b.assign+`,[13,14,0])" />攻撃力21移動力3<br>
        必要[食料10,物資12]<input type="button" value="戦列歩兵" onclick="train(this.value,'🔫⚔',24,2,1,`+b.assign+`,[10,8,0])" />攻撃力24射程2移動力1<br>
        必要[食料7,物資32]<input type="button" value="野戦砲" onclick="train(this.value,'💣',22,3,1,`+b.assign+`,[7,32,0])" />攻撃力22射程3移動力1<br>`;
            }else if(level[P]==4){
        document.querySelector("#information").innerHTML+=`
        必要[食料24,物資28]<input type="button" value="歩兵" onclick="train(this.value,'🔫',32,2,2,`+b.assign+`,[24,28,0])" />攻撃力32<br>
        必要[食料24,物資50,部品2]<input type="button" value="自動車化歩兵" onclick="train(this.value,'🔫🚛',32,1,4,`+b.assign+`,[24,50,2])" />攻撃力32移動力4<br>
        必要[食料16,物資75,部品10]<input type="button" value="歩兵戦車" onclick="train(this.value,'🚛⚔',50,1,4,`+b.assign+`,[16,75,10])" />攻撃力50移動力4<br>
        必要[食料16,物資45,部品5]<input type="button" value="砲兵" onclick="train(this.value,'🧨',28,4,2,`+b.assign+`,[16,45,5])" />攻撃力28射程4<br>`;
            }else if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[食料32,物資30,部品8]<input type="button" value="機械化歩兵" onclick="train(this.value,'🔫🚗',65,1,4,`+b.assign+`,[32,30,8])" />攻撃力65移動力4<br>
        必要[食料32,物資45,部品12]<input type="button" value="特殊部隊" onclick="train(this.value,'🔫✩',72,1,2,`+b.assign+`,[32,45,12])" />攻撃力72<br>
        必要[食料24,物資90,部品25]<input type="button" value="主力戦車" onclick="train(this.value,'🚗⚔',95,1,5,`+b.assign+`,[24,90,25])" />攻撃力95移動力5<br>
        必要[食料24,物資80,部品20]<input type="button" value="地対空ミサイルランチャー" onclick="train(this.value,'🚗🚀',100,5,4,`+b.assign+`,[24,80,20])" />攻撃力100射程5移動力4飛行機を迎撃できる<br>
        必要[物資15,部品35]<input type="button" value="戦闘用ドローン" onclick="train(this.value,'🛩⚔',55,4,2,`+b.assign+`,[0,15,35])" />攻撃力55射程4<br>`;
            }else if(level[P]>=6){
        document.querySelector("#information").innerHTML+=`
        必要[物資20,部品45]<input type="button" value="戦闘用アンドロイド" onclick="train(this.value,'🔫🤖',150,1,5,`+b.assign+`,[0,20,45])" />攻撃力150移動力5<br>
        必要[食料30,物資100,部品45]<input type="button" value="ホバー戦車" onclick="train(this.value,'🚗🛰',225,1,6,`+b.assign+`,[30,100,30])" />攻撃力225移動力6<br>
        必要[食料30,物資95,部品160]<input type="button" value="レーザーキャノン" onclick="train(this.value,'☄',325,6,3,`+b.assign+`,[30,95,160])" />攻撃力325射程6移動力3<br>`;
            }
        }else if(b.status=="選択中" && (b.type=="🛬") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        if(level[P]==4){
        document.querySelector("#information").innerHTML+=`
        必要[物資35,部品2]<input type="button" value="三葉戦闘機" onclick="train(this.value,'🛩',24,6,4,`+b.assign+`,[0,35,2])" />攻撃力24射程6<br>
        必要[物資50,部品5]<input type="button" value="戦闘機" onclick="train(this.value,'🛩',32,7,5,`+b.assign+`,[0,50,5])" />攻撃力32射程7<br>
        必要[物資65,部品5]<input type="button" value="爆撃機" onclick="train(this.value,'🛩',36,8,6,`+b.assign+`,[0,65,5])" />攻撃力36射程8<br>
        必要[物資80,部品25]<input type="button" value="戦略爆撃機" onclick="train(this.value,'🛩',50,9,6,`+b.assign+`,[0,80,25])" />攻撃力50射程9<br>`;
            }
        if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[物資50,部品24]<input type="button" value="攻撃ヘリ" onclick="train(this.value,'🛩',65,10,5,`+b.assign+`,[0,50,24])" />攻撃力65射程10<br>
        必要[物資75,部品32]<input type="button" value="ジェット戦闘機" onclick="train(this.value,'✈',80,12,7,`+b.assign+`,[0,75,32])" />攻撃力80射程12<br>`;
            }
        if(level[P]==6){
        document.querySelector("#information").innerHTML+=`
        必要[物資25,部品100]<input type="button" value="ステルス爆撃機" onclick="train(this.value,'✈',135,100,10,`+b.assign+`,[0,25,100])" />攻撃力135<br>`;
            }
        }else if(b.status=="選択中" && (b.type=="🚀") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[部品35]<input type="button" value="巡航ミサイル" onclick="train(this.value,'🚀',150,12,8,`+b.assign+`,[0,0,35])" />攻撃力150射程12<br>
        必要[部品70]<input type="button" value="大陸間弾道ミサイル" onclick="train(this.value,'🚀',160,24,8,`+b.assign+`,[0,0,70])" />攻撃力160射程24<br>
        必要[部品200]<input type="button" value="核弾頭搭載ICBM" onclick="train(this.value,'🚀',300,24,8,`+b.assign+`,[0,0,200])" />攻撃力300射程24<br>
        必要[部品300]<input type="button" value="核融合弾頭搭載ICBM" onclick="train(this.value,'🚀',500,24,8,`+b.assign+`,[0,0,300])" />攻撃力500射程24<br>`;
            }
        if(level[P]>5){
        document.querySelector("#information").innerHTML+=`
        必要[部品112]<input type="button" value="戦術核ミサイル" onclick="train(this.value,'🚀',300,36,8,`+b.assign+`,[0,0,112])" />攻撃力300射程36<br>
        必要[部品500]<input type="button" value="反物質爆弾" onclick="train(this.value,'🚀',1000,100,8,`+b.assign+`,[0,0,500])" />攻撃力1000射程100<br>
        必要[部品800]<input type="button" value="地球破壊爆弾" onclick="train(this.value,'🚀',2400,100,8,`+b.assign+`,[0,0,800])" />攻撃力2400射程100<br>`;
            }
        }else if(b.status=="選択中" && (b.type=="🥚") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[なし]攻撃力8,射程3<input type="button" value="炎のドラゴン" onclick="train(this.value,'🛩',8,3,4,`+b.assign+`,[0,0,0])" />
        必要[食糧100]攻撃力12,射程3<input type="button" value="闇のドラゴン" onclick="train(this.value,'🛩',12,3,4,`+b.assign+`,[100,0,0])" />
        必要[食糧150]攻撃力16,射程6<input type="button" value="光のドラゴン" onclick="train(this.value,'🛩',16,6,4,`+b.assign+`,[150,0,0])" />`;
        }else if(b.status=="選択中" && (b.type=="🏰") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[食糧20,物資12]攻撃力20,射程2<input type="button" value="黒魔術師" onclick="train(this.value,'🧙🔥',20,2,2,`+b.assign+`,[20,12,0])" />
        必要[食糧20,物資12]攻撃力15,射程1<input type="button" value="洗脳術師" onclick="train(this.value,'🧙😖',15,1,2,`+b.assign+`,[20,12,0])" />
        必要[食糧20,物資12]攻撃力15,射程2<input type="button" value="白魔術師" onclick="train(this.value,'🧙❤',15,2,2,`+b.assign+`,[20,12,0])" />`;
        }else if(Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52 && units.findIndex((elem)=>elem.assign==b.assign)==-1){
        document.querySelector("#information").innerHTML="体力"+b.hp+"<br>生産:"+b.type+b.str;
        }
        }
        }
});
for(const u of units){
    if(u.owner==1){
            u.color="#ff0000";
        }else if(u.status=="建設中" || u.status=="強化中"){
            u.color="#bbbbbb";
            }
}
for(const b of buildings){
    if(b.owner==1){
            b.color="#ff0000";
        }
}
function cheat12(lv){
    food=[1000,1000];
    basicResources=[1000,1000];
    culture=[1000,1000];
    level=[lv,lv];
    parts=[1000,1000];
}
