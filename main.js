const h=new hachchchctx();
const playerName=document.getElementById("playerName");
var chat="";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const mouse = {x: null,y: null};
const buttons=[];
var techList=[];
var techs=[];
var tiles=[];
var units=[];
var mapPlanet=["テイア","テイア"];
var players=[{
    name:"1",
    discoveredPlanets:["テイア"]
},{
    name:"2",
    discoveredPlanets:["テイア"]
}];
var planetNameList=["水星","金星","地球","火星","フォボス","セレス","ベスタ","オベロン","冥王星","月","ハウメア","エリス","マケマケ","エンケラドス","ケレス","グリーゼ","ケプラー","ケンタウリ","コルサント","ナブー","タトゥイーン","キャッシーク","ニビル"];
var planets=[{
    name:"テイア",
    id:0,
    status:"表示中",
    atm:100,
    bio:100,
    water:100,
    x:Math.random()*1485+7.5,
    y:Math.random()*485+7.5,
    radius:15,
    size:[1500,550]
}];
for(let k=0; k<5; ++k){
let x=3000;
let y=0;
let radius=0;
let seed=0;
while(planets.findIndex((e)=>Math.abs(e.x-x)<200 && Math.abs(e.y-y)<200)!=-1 || x+radius>1500 || x-radius<0 || y+radius>500 || y-radius<0 || planets.findIndex((e)=>e.name==planetNameList[seed])!=-1){
x=Math.random()*1500;
y=Math.random()*500;
radius=Math.round(Math.random()*10)+5;
seed=Math.round(Math.random()*(planetNameList.length-1));
}
planets.push({
    name:planetNameList[seed],
    id:planets.length,
    status:"表示中",
    atm:100,
    bio:100,
    water:100,
    x:x,
    y:y,
    radius:radius,
    size:[radius*100,Math.round(radius*100/3)+50]
});
}
//heightは100pxの余白分追加される。
var displayMode="ワールドマップ";//備考 技術ツリー、宗教ツリー、宇宙空間
var buildings=[];
var popTexts=[];
var science=[4,4];
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
let prod=0;
for(const p of planets){
makeTile(p.name);
p.tiles=tiles.length-prod;
prod=tiles.length;
}

buttons.push({
    label:"技術ツリー",
    display:"ワールドマップ",
    status:"待機",
    interval:-1,
    x:10,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"ワールドマップ",
    display:"技術ツリー",
    status:"待機",
    interval:-1,
    x:10,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"技術ツリー",
    display:"宇宙空間",
    status:"待機",
    interval:-1,
    x:10,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"ワールドマップ",
    display:"宇宙空間",
    status:"待機",
    interval:-1,
    x:170,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"宇宙空間",
    display:"技術ツリー",
    status:"待機",
    interval:-1,
    x:170,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"宇宙空間",
    display:"ワールドマップ",
    status:"待機",
    interval:-1,
    x:170,
    y:canvas.height-90,
    w:150,
    h:80
});
techList.push({
    name:"石器",
    require:0,
    description:"労働者が建物を建てられる様になる。"
});
techList.push({
    name:"狩り",
    require:3,
    description:"動物を倒すと食糧が手に入るようになる。"
});
techList.push({
    name:"火おこし",
    require:5,
    description:"狩りでさらに多くの食糧が手に入るようになる。"
});
techList.push({
    name:"埋葬",
    require:7,
    description:"遺産が建築できるようになる。"
});
techList.push({
    name:"農業",
    require:10,
    description:"農地が作れるようになる。首都レベル2のアップグレードに必要"
});
techList.push({
    name:"冶金",
    require:10,
    description:"鉱山が作れるようになる。首都レベル2のアップグレードに必要"
});
techList.push({
    name:"哲学",
    require:13,
    description:"大学が作れるようになる。"
});
techList.push({
    name:"車輪",
    require:12,
    description:"労働者の速さが1増加"
});
techList.push({
    name:"文字",
    require:10,
    description:"アレクサンドリア図書館が建てられるようになる。"
});
techList.push({
    name:"畜産",
    require:10,
    description:"馬に乗った兵士が作れるようになる。"
});
techList.push({
    name:"算術",
    require:32,
    description:"弓兵が作れるようになる。首都レベル3のアップグレードに必要"
});
techList.push({
    name:"政府",
    require:50,
    description:"都市が作れるようになる。首都レベル3のアップグレードに必要"
});
techList.push({
    name:"工学",
    require:75,
    description:"弩兵が作れるようになる。"
});
techList.push({
    name:"印刷技術",
    require:80,
    description:"演劇場が作れるようになる。"
});
techList.push({
    name:"火薬",
    require:150,
    description:"姫路城と火薬関連のユニットが作れるようになる。"
});
techList.push({
    name:"力学",
    require:165,
    description:"野戦砲が作れるようになる。首都レベル4のアップグレードに必要"
});
techList.push({
    name:"経済学",
    require:180,
    description:"市場が作れるようになる。首都レベル4のアップグレードに必要"
});
techList.push({
    name:"蒸気機関",
    require:190,
    description:"工場が作れるようになる。"
});
techList.push({
    name:"電子工学",
    require:195,
    description:"精製プラントが作れるようになる。"
});
techList.push({
    name:"飛行機",
    require:250,
    description:"空港が作れるようになる。"
});
techList.push({
    name:"化学肥料",
    require:262,
    description:"穀倉地帯が作れるようになる。"
});
techList.push({
    name:"ダイナマイト",
    require:220,
    description:"爆撃機、戦略爆撃機が作れるようになる。首都レベル5のアップグレードに必要"
});
techList.push({
    name:"レーダー",
    require:350,
    description:"戦闘機が作れるようになる。"
});
techList.push({
    name:"軍事学",
    require:215,
    description:"軍事基地が作れるようになる。"
});
techList.push({
    name:"弾道学",
    require:320,
    description:"砲兵が作れるようになる。"
});
techList.push({
    name:"エンジン",
    require:300,
    description:"自動車化歩兵、歩兵戦車が作れるようになる。労働者の移動力が+1。首都レベル5のアップグレードに必要"
});
techList.push({
    name:"情報通信",
    require:450,
    description:"ヘリコプターが作れるようになる。首都レベル6のアップグレードに必要"
});
techList.push({
    name:"液体推進剤",
    require:750,
    description:"ミサイルポッド、地対空ミサイルランチャーが作れるようになる。"
});
techList.push({
    name:"人工衛星",
    require:1005,
    description:"ハッブル宇宙望遠鏡が作れるようになる。首都レベル6のアップグレードに必要"
});
techList.push({
    name:"マスメディア",
    require:580,
    description:"テレビ局が作れるようになる。"
});
techList.push({
    name:"プラスチック",
    require:520,
    description:"特殊部隊、病院が作れるようになる。"
});
techList.push({
    name:"核分裂反応",
    require:1240,
    description:"原子力発電所、核爆弾が作れるようになる。首都レベル6のアップグレードに必要"
});
techList.push({
    name:"ロボティクス",
    require:785,
    description:"戦闘用ドローンが作れるようになる。"
});
techList.push({
    name:"宇宙旅行",
    require:2000,
    description:"宇宙基地が作れるようになる。"
});
techList.push({
    name:"ホバリング",
    require:3000,
    description:"ホバー戦車が作れるようになる。"
});
techList.push({
    name:"量子工学",
    require:5000,
    description:"レーザーキャノンが作れるようになる。"
});
techList.push({
    name:"シンギュラリティ",
    require:8000,
    description:"首都が無限にアップグレードできるようになる。このゲームにおける最後のテクノロジー"
});
function discovery(techName,assign){
    let index=techList.findIndex((e)=>e.name==techName);
    techs.push({
        name:techList[index].name,
        status:"未発見",
        require:techList[index].require,
        assign:assign,
        progress:0,
        status2:"待機",
        description:techList[index].description,
        x:0,
        y:0
    });
}
function discovered(techName,owner){
    let index=techs.findIndex((e)=>e.name==techName && e.assign==owner);
    techs[index].status="発見済";
    if(techName=="石器"){
        discovery("狩り",owner);
    }
    if(techName=="狩り"){
        discovery("火おこし",owner);
    }
    if(techName=="火おこし"){
        discovery("埋葬",owner);
    }
    if(techName=="火おこし"){
        discovery("農業",owner);
    }
    if(techName=="火おこし"){
        discovery("冶金",owner);
    }
    if(techName=="文字"){
        discovery("哲学",owner);
    }
    if(techName=="畜産"){
        discovery("車輪",owner);
    }
    if(techName=="哲学"){
        discovery("政府",owner);
    }
    if(techName=="車輪"){
        discovery("算術",owner);
    }
    if(techName=="工学"){
        discovery("印刷技術",owner);
        discovery("火薬",owner);
    }
    if(techName=="印刷技術"){
        discovery("経済学",owner);
    }
    if(techName=="火薬"){
        discovery("力学",owner);
    }
    if(techName=="化学肥料"){
        discovery("軍事学",owner);
        discovery("ダイナマイト",owner);
    }
    if(techName=="軍事学"){
        discovery("弾道学",owner);
    }
    if(techName=="蒸気機関"){
        discovery("エンジン",owner);
        discovery("電子工学",owner);
    }
    if(techName=="エンジン"){
        discovery("飛行機",owner);
    }
    if(techName=="飛行機"){
        discovery("レーダー",owner);
    }
    if(techName=="情報通信"){
        discovery("マスメディア",owner);
        discovery("人工衛星",owner);
    }
    if(techName=="プラスチック"){
        discovery("ロボティクス",owner);
        discovery("液体推進剤",owner);
    }
    if(techName=="液体推進剤"){
        discovery("核分裂反応",owner);
    }
    if(techName=="量子工学"){
        discovery("シンギュラリティ",owner);
    }
}
function hasTech(techName){
    if(techs.findIndex((e)=>e.assign==P && e.status=="発見済" && e.name==techName)!=-1){
    return true;
    }else{
    return false;
    }
}
function translate(){
    if(buildings.findIndex((elem)=>elem.name=="クレムリン" && elem.owner==P)!=-1){
    science[P]=culturePt[P]*3;
    }else{
    science[P]=culturePt[P]*2;
    }
    document.querySelector(".t0").innerHTML="ターン"+Math.floor((turn+1)/2)+",プレイヤー"+P+",科学力"+science[P];
    document.querySelector(".t1").innerHTML=food[P]+"(+"+foodPt[P]+")";
    document.querySelector(".t2").innerHTML=basicResources[P]+"(+"+bRPt[P]+")";
    document.querySelector(".t3").innerHTML=culture[P]+"(+"+culturePt[P]+")";
    if(partsPt[P]>0){
    document.querySelector(".t4").innerHTML="部品:"+parts[P]+"(+"+partsPt[P]+")";
        }else{
        document.querySelector(".t4").innerHTML="";
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
    if(displayMode=="ワールドマップ"){
    ctx.fillStyle="#000000";
    selectedTile=-1;
        /*タイル系*/
    for(const t of tiles){
        if(t.planet==mapPlanet[P]){
    ctx.beginPath();
    ctx.moveTo(t.hexX,t.hexY);
    for(let i=1; i<=6; ++i){
    t.hexX=t.hexX+60*Math.cos((i/2)*(2*Math.PI/3));
    t.hexY=t.hexY+60*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(t.hexX,t.hexY);
    }
    if(t.type=="Land"){
    ctx.fillStyle="#ffffff";
    }else if(t.type=="Water"){
    ctx.fillStyle="#8FCCFD";
    }
    if(t.type!="Water"){
    ctx.stroke();
    }
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    if(Math.abs(t.centroid.x-mouse.x)<45 && Math.abs(t.centroid.y-mouse.y)<52){
    selectedTile=t.id;
    let tHexX=t.centroid.x+27.5;
    let tHexY=t.centroid.y-55*Math.sin(2*Math.PI/3);
    ctx.moveTo(tHexX,tHexY);
    for(let i=1; i<=6; ++i){
    tHexX=tHexX+55*Math.cos((i/2)*(2*Math.PI/3));
    tHexY=tHexY+55*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(tHexX,tHexY);
    }
        }
    ctx.stroke();
    ctx.closePath();
    }
        }
    }
    ctx.closePath();
    ctx.beginPath();
    /*ボタン系*/
    for(const b of buttons){
        if(displayMode==b.display){
        if(b.label!="宇宙空間" || buildings.findIndex((e)=>e.owner==P && e.name=="宇宙基地")!=-1){
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
            }
        }
        if(b.interval>0){
            b.interval--;
            }else if(b.interval==0){
            if(b.label=="技術ツリー"){
                displayMode="技術ツリー";
            }
            if(b.label=="ワールドマップ"){
                displayMode="ワールドマップ";
            }
            if(b.label=="宇宙空間"){
                displayMode="宇宙空間";
            }
            b.status="待機";
            b.interval=-1;
        }
    }
    /*建物系*/
    if(displayMode=="ワールドマップ"){
    for(const b of buildings){
        if(b.planet==mapPlanet[P]){
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
        }else if(b.name=="アレクサンドリア図書館"){
        ctx.fillText("📚"+b.str,b.x,b.y-10);
        }else if(b.name=="姫路城"){
        ctx.fillText("🏯"+b.str,b.x,b.y-10);
        }else if(b.name=="システィーナ礼拝堂"){
        ctx.fillText("🕍"+b.str,b.x,b.y-10);
        }else{
        ctx.fillText(b.type+b.str,b.x,b.y-10);
        }
        ctx.fillText(b.hp+"%",b.x,b.y+40);
        ctx.fill();
            }
    }
    ctx.closePath();
    ctx.fillStyle="#000000";
    /*ユニット系*/
    for(const u of units){
        if(u.planet==mapPlanet[P]){
    if(u.status=="移動"){
        let rad=Math.atan2(tiles[u.assign].centroid.y-u.y,tiles[u.assign].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.assign].centroid.x)<2 && Math.abs(u.y-tiles[u.assign].centroid.y)<2){
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
                    if(u.name=="三葉戦闘機" || u.name=="戦闘機"){
                        machinegunFire();
                        }else{
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                bomber2();
                }else{
            bomber1();
                }
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
                    if(u.name=="三葉戦闘機" || u.name=="戦闘機"){
                        machinegunFire();
                        }else{
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                bomber2();
                }else{
                        bomber1();
                }
                        }
                    if(buildings[enemyBuilding].type=="🏘"){
                        damage=Math.ceil(12.5*(power/(buildings[enemyBuilding].hp/10)));
                    buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }else{
                        damage=Math.ceil(25*(power/(buildings[enemyBuilding].hp/10)));
                        buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }
                    popTexts.push({value:"-"+damage,x:buildings[enemyBuilding].x,y:buildings[enemyBuilding].y-25,interval:0,color:"#ff0000"});
                    if(buildings[enemyBuilding].hp<=0){
                        //if(buildings[enemyBuilding].type=="🏘" || buildings[enemyBuilding].type=="🏠"){
                        buildings[enemyBuilding].hp=1;
                            ///}else{
                            //deleteObject("buildings",buildings[enemyBuilding].assign);
                            //}
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
    if(popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-52)!=-1){
    ctx.fillStyle=popTexts[popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-52)].color;
    ctx.fill();
    }
    ctx.fillStyle="#000000";
    ctx.fillText(u.hp+"%",u.x,u.y-25);
        if(u.name=="炎のドラゴン" || u.name=="闇のドラゴン" || u.name=="光のドラゴン"){
    ctx.fillText("🐲"+u.str,u.x,u.y+25);
            }else{
            ctx.fillText(u.type+u.str,u.x,u.y+25);
            }
    ctx.stroke();
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
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fill();
        if(p.name==mapPlanet[P]){
        ctx.fillText("現在地:"+p.name,p.x+p.radius/2,p.y+p.radius+10);
            }else{
        ctx.fillText(p.name,p.x+p.radius/2,p.y+p.radius+10);
            }
        ctx.closePath();
    }
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
    if(displayMode=="宇宙空間"){
        for(const p of planets){
            if(h.collisionRect(p.x-p.radius-50,p.y-p.radius-50,p.radius*2+100,p.radius*2+100,mouse.x,mouse.y)){
                mapPlanet[P]=p.name;
            }
        }
    }
    if(displayMode=="技術ツリー"){
    for(const t of techs){
        if(h.collisionRect(t.x,t.y,150,100,mouse.x,mouse.y) && t.assign==P){
            document.querySelector("#description").innerHTML=`${t.description}`;
            if(techs.findIndex((e)=>e.assign==P && e.status2=="選択中")!=-1){
                techs[techs.findIndex((e)=>e.assign==P && e.status2=="選択中")].status2="待機";
            }
            if(t.status!="発見済"){
            t.status2="選択中";
            }
        }
    }
        }
    for(const b of buttons){
        if(h.collisionRect(b.x,b.y,b.w,b.h,mouse.x,mouse.y) && b.display==displayMode){
            document.querySelector("#description").innerHTML="";
            b.status="選択中";
            b.interval=3;
        }
    }
    for(const b of buildings){
        if(b.planet==mapPlanet[P]){
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
}
for(const u of units){
    if(u.planet==mapPlanet[P]){
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
            if((Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*u.range+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*u.range+2) || (!(u.fly===false || !u.fly) && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀"))) && selectedTile!=u.assign && (units.findIndex((e)=>e.owner!=P && e.assign==selectedTile)!=-1 || buildings.findIndex((e)=>e.owner!=P && e.assign==selectedTile)!=-1)){
                if((units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1) && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
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
                        if(units[enemy].type=="🐾"){
                            if(hasTech("狩り")){
                                if(hasTech("火おこし")){
                            food[P]+=units[enemy].str;
                                    }else{
                                food[P]+=Math.ceil(units[enemy].str/2);
                                    }
                                }
                        }
                        deleteObject("units",units[enemy].assign);
                        }
                    if(u.hp<=0){
                        deleteObject("units",u.assign);
                        }
                    u.move=0;
                    u.status="行動終了";
                    u.color="#bbbbbb";
                    }else if(buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1 && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
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
                        damage=Math.ceil(25*(power/(buildings[enemyBuilding].hp/10)));
                        buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        }
                    popTexts.push({value:"-"+damage,x:buildings[enemyBuilding].x,y:buildings[enemyBuilding].y-25,interval:0,color:"#ff0000"});
                    if(buildings[enemyBuilding].hp<=0){
                        if(buildings.findIndex((elem)=>elem.name=="クレムリン" && elem.owner==P)!=-1){
                            if(buildings[enemyBuilding].type=="🌾"){
                                food[P]+=buildings[enemyBuilding].str*10;
                            }
                            if(buildings[enemyBuilding].type=="⚙"){
                                basicResources[P]+=buildings[enemyBuilding].str*10;
                            }
                            if(buildings[enemyBuilding].type=="📖"){
                                culture[P]+=buildings[enemyBuilding].str*10;
                            }
                            if(buildings[enemyBuilding].type=="🏭"){
                                parts[P]+=buildings[enemyBuilding].str*10;
                            }
                        }
                        deleteObject("buildings",buildings[enemyBuilding].assign);
                        }
                    u.move=0;
                    u.status="行動終了";
                    u.color="#bbbbbb";
                    }
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
                }else if(((Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*(u.move)+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*(u.move)+2)) || (!(u.fly===false || !u.fly) && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀"))) && selectedTile!=u.assign){
                if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)==-1 && buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)==-1 && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                    if(buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].type=="🛡" && u.type!="⚒"){
                        u.str=u.str-buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].str;
                        }
                        }
                    if(u.fly===false || !u.fly){
                    if(tiles[selectedTile].type!="Water" || u.name=="戦闘用ドローン"){
                        let tileMoved=1;
                        while((Math.abs(tiles[u.assign].centroid.x-tiles[selectedTile].centroid.x)<(90*tileMoved+2) && Math.abs(tiles[u.assign].centroid.y-tiles[selectedTile].centroid.y)<(104*tileMoved+2))===false){
                                tileMoved++;
                        }
                        if(u.move==u.mp && (u.type=="🐴⚔" || u.type=="🐴🏹")){
                horseRun();
                }
            u.move-=tileMoved;
            u.assign=selectedTile;
            u.status="移動";
                        }
                        }else{
                        if(Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*6+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*6+2) && tiles[selectedTile].type!="Water"){
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
    }
});
let seed1=Math.round(Math.random()*71);
let seed2=Math.round(Math.random()*71);
while(tiles[seed1].type=="Water"){
    seed1=Math.round(Math.random()*71);
}
while(tiles[seed2].type=="Water"){
    seed2=Math.round(Math.random()*71);
}
let randomCity=[seed1,seed2];
units.push({name:"首長",type:"⚔",str:8,hp:100,range:1,move:2,mp:2,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],owner:0,planet:"テイア"});
buildings.push({name:"首都",type:"🏘",str:"",hp:100,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],level:1,owner:0,planet:"テイア"});
buildings.push({name:"首都",type:"🏘",str:"",hp:100,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1,planet:"テイア"});
while((Math.abs(buildings[0].x-buildings[1].x)<500 && Math.abs(buildings[0].y-buildings[1].y)<500) || tiles[randomCity[1]].type=="Water"){
    deleteObject("buildings",parseInt(randomCity[1]));
    randomCity=[randomCity[0],Math.round(Math.random()*71)];
buildings.push({name:"首都",type:"🏘",str:"",hp:100,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1,planet:"テイア"});
    }
units.push({name:"首長",type:"⚔",str:8,hp:100,range:1,move:2,mp:2,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],owner:1,planet:"テイア"});

function nextTurn(){
    food[P]=parseInt(food[P])+parseInt(foodPt[P]);
    basicResources[P]=parseInt(basicResources[P])+parseInt(bRPt[P]);
    culture[P]=parseInt(culture[P])+parseInt(culturePt[P]);
    parts[P]=parseInt(parts[P])+parseInt(partsPt[P]);
    if(techs.findIndex((e)=>e.assign==P && e.tag=="event")!=-1){
        techs[techs.findIndex((e)=>e.assign==P && e.tag=="event")].tag="";
    }
    if(techs.findIndex((e)=>e.assign==P && e.status2=="選択中")!=-1){
        let index=techs.findIndex((e)=>e.assign==P && e.status2=="選択中");
        techs[index].progress+=science[P];
        if(techs[index].require<=techs[index].progress){
            techs[index].tag="event";
            discovered(techs[index].name,P);
        }
    }
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
                buildings.push({name:u.str,type:u.b.type,str:u.b.str,hp:100,x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,color:"#000000",status:u.b.status,assign:u.assign,level:1,owner:u.b.owner,planet:u.planet});
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
                if(u.b[0]=="首都"){
                    if(u.b[3]==2){
                        discovery("文字",u.b[5]);
                        discovery("畜産",u.b[5]);
                    }
                    if(u.b[3]==3){
                        discovery("工学",u.b[5]);
                    }
                    if(u.b[3]==4){
                        discovery("蒸気機関",u.b[5]);
                        discovery("化学肥料",u.b[5]);
                    }
                    if(u.b[3]==5){
                        discovery("情報通信",u.b[5]);
                        discovery("プラスチック",u.b[5]);
                    }
                    if(u.b[3]==6){
                        discovery("宇宙旅行",u.b[5]);
                        discovery("ホバリング",u.b[5]);
                        discovery("量子工学",u.b[5]);
                    }
                }
              deleteObject("buildings",u.assign);
              buildings.push({name:u.b[0],type:u.b[1],str:u.b[2],hp:100*(1+0.25*(u.b[3]-1)),x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,color:"#000000",status:u.b[4],assign:u.assign,level:u.b[3],owner:u.b[5],planet:u.planet});
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
        b.hp=b.hp+Math.round(Math.random()*10*b.level);
        }
        if(b.hp>100*(1+0.25*(b.level-1))){
            b.hp=100*(1+0.25*(b.level-1));
        }
        if(b.owner==P){
            b.color="#ff0000";
        }
    }
    P=Math.round((1/2)*Math.sin((2*turn-1)*(Math.PI/2))+(1/2));
    turn++;
    if(techs.findIndex((e)=>e.assign==P && e.tag=="event")!=-1){
        let bi=buttons.findIndex((e)=>e.label=="技術ツリー");
        popTexts.push({value:`${techs[techs.findIndex((e)=>e.assign==P && e.tag=="event")].name}の研究が完了！`,x:buttons[bi].x+buttons[bi].w/2+100,y:buttons[bi].y-10,interval:0,color:"#000000"});
        techs[techs.findIndex((e)=>e.assign==P && e.tag=="event")].status2="待機";
    }
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
                if(connection!=""){
                connection.send("送信:タイル"+u.assign+"でプレイヤー"+u.owner+"の"+u.name+"が"+u.str+"を建設中");
                    }
                }
        }
    }
    }
}
function train(name,type,str,range,mp,assign,resources,instantOwner,instantHp,planet){
    if(!planet){
        planet=mapPlanet[P];
    }
    if(!instantOwner && !instantHp){
    if(units.findIndex((elem)=>elem.assign==assign)==-1 && resources[0]<=food[P] && resources[1]<=basicResources[P] && resources[2]<=parts[P]){
        food[P]=food[P]-resources[0];
        basicResources[P]=basicResources[P]-resources[1];
        parts[P]=parts[P]-resources[2];
        if(type=="⚒"){
            units.push({name:name,type:type,str:str,hp:0,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet});
            }else{
    units.push({name:name,type:type,str:str,hp:100,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet});
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
            units.push({name:name,type:type,str:str,hp:0,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet});
            }else{
    units.push({name:name,type:type,str:str,hp:instantHp,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet});
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
//owner100を資源等のwildernessとする。
function generate(value){
    for(let k=0; k<value; ++k){
        let seed=Math.random()*100;
        let assign=-1;
        let whileloop=0;
        while(assign==-1 || units.findIndex((elem)=>elem.assign==assign)!=-1 || buildings.findIndex((elem)=>elem.assign==assign)!=-1 || tiles[assign].type=="Water" || assign>71){
            assign=Math.round(Math.random()*(tiles.length-1));
            whileloop++;
            if(whileloop>10000){
                assign=10000;
                console.log("数が多すぎます！");
            }
        }
        if(assign!=10000){
        if(seed>66){
            train("熊","🐾",9,1,2,assign,[0,0,0],100);
        }else if(seed>33){
            train("鹿","🐾",3,1,2,assign,[0,0,0],100);
        }else{
            train("狼","🐾",5,1,2,assign,[0,0,0],100);
        }
        }else{
            k=value;
        }
    }
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
        //if(u.planet==mapPlanet[P]){
    for(const b of buildings){
        //if(b.planet==mapPlanet[P]){
    if(buildings.findIndex((e)=>e.assign==u.assign && e.name=="宇宙基地")!=-1 &&Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[部品500]<input type="button" value="このユニットをランダムな星へ送る" onclick="transport('${u.planet}',${u.assign})" />
        `;
    }else if(u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)==-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
                document.querySelector("#information").innerHTML=`建築<br>レベルI`;
        if(hasTech("農業")){
                document.querySelector("#information").innerHTML+=`<input type="button" value="農場" onclick="construction(this.value,'🌾',2,'栽培中')" />`;
            }
                document.querySelector("#information").innerHTML+=`<input type="button" value="見張台" onclick="construction(this.value,'🛡',3,'稼働中')" />`;
        if(hasTech("冶金")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="鉱山" onclick="construction(this.value,'⚙',2,'稼働中')" /><br>`;
            }
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
        if(hasTech("埋葬")){
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
            if(buildings.findIndex((elem)=>elem.name=="アレクサンドリア図書館")==-1 && units.findIndex((elem)=>elem.str=="アレクサンドリア図書館")==-1){
            document.querySelector("#information").innerHTML+=`コスト[文化25]効果：文化+8<input type="button" value="アレクサンドリア図書館" onclick="construction(this.value,'📖',8,'稼働中',25)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="兵馬俑")==-1 && units.findIndex((elem)=>elem.str=="兵馬俑")==-1){
            document.querySelector("#information").innerHTML+=`コスト[文化25]効果：食糧を消費しない特殊な兵士を作れる。<input type="button" value="兵馬俑" onclick="construction(this.value,'','','稼働中',25)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="アルテミス神殿")==-1 && units.findIndex((elem)=>elem.str=="アルテミス神殿")==-1){
            document.querySelector("#information").innerHTML+=`コスト[文化25]効果：文化生産の科学力への変換が1.5倍になる。<input type="button" value="アルテミス神殿" onclick="construction(this.value,'🏛️','','稼働中',25)" /><br>`;
                }
                    }
        if(level[P]==3){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="システィーナ礼拝堂")==-1 && units.findIndex((elem)=>elem.str=="システィーナ礼拝堂")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化100]効果：この建物の上で回復+12<input type="button" value="システィーナ礼拝堂" onclick="construction(this.value,'❤',12,'稼働中',100)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="姫路城")==-1 && units.findIndex((elem)=>elem.str=="姫路城")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化100]効果：この建物の上で戦闘力+24<input type="button" value="姫路城" onclick="construction(this.value,'🛡',24,'稼働中',100)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="クレムリン")==-1 && units.findIndex((elem)=>elem.str=="クレムリン")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化100]効果：敵の生産施設を壊す時、生産力の10倍の資源を略奪する。<input type="button" value="クレムリン" onclick="construction(this.value,'⛪️','','稼働中',100)" /><br>`;
                }
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
        document.querySelector("#information").innerHTML+=`コスト[文化225]効果：労働者が75%の確率で攻撃を生き延びる<input type="button" value="自由の女神" onclick="construction(this.value,'🗽','','稼働中',225)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="タージ・マハル")==-1 && units.findIndex((elem)=>elem.str=="タージ・マハル")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化225]効果：市場の利益が倍になる。<input type="button" value="タージ・マハル" onclick="construction(this.value,'🕌','','稼働中',225)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="紫禁城")==-1 && units.findIndex((elem)=>elem.str=="紫禁城")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化225]効果：アップグレードのコストを25%下げる。<input type="button" value="紫禁城" onclick="construction(this.value,'🏛️','','稼働中',225)" /><br>`;
                    }
                }
        if(level[P]==5){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="スマートシティ")==-1 && units.findIndex((elem)=>elem.str=="スマートシティ")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化500]効果：この遺産が建設されてから建てられる全ての建物からの生産が6増加<input type="button" value="スマートシティ" onclick="construction(this.value,'🏠️','','待機',500)" /><br>`;
                }
            if(buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡")==-1 && units.findIndex((elem)=>elem.str=="ハッブル宇宙望遠鏡")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化500]効果：全ての惑星の情報がわかる。<input type="button" value="ハッブル宇宙望遠鏡" onclick="construction(this.value,'🔭','','待機',500)" /><br>`;
                }
            /*if(buildings.findIndex((elem)=>elem.name=="ジェームズウェッブ宇宙望遠鏡")==-1 && units.findIndex((elem)=>elem.str=="ジェームズウェッブ宇宙望遠鏡")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化500]効果：全ての惑星の情報がわかる。<input type="button" value="ジェームズウェッブ宇宙望遠鏡" onclick="construction(this.value,'🔭','','待機',500)" /><br>`;
                }*/
                    }
        if(level[P]>5){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            if(buildings.findIndex((elem)=>elem.name=="火星植民地化")==-1 && units.findIndex((elem)=>elem.str=="火星植民地化")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化1000]効果：科学勝利<input type="button" value="火星植民地化" onclick="construction(this.value,'🌐',プレイヤー'`+P+`の科学勝利！','稼働中',1000)" /><br>`;
                }
                    }
            }
                    }else if(u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)!=-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
                    let display=false;
                    let cost=100;
                    let assignning=buildings.findIndex((elem)=>elem.assign==u.assign);
                    if(buildings[assignning].name=="首都"){
                            cost=Math.round(25*(buildings[assignning].level**1.75));
                    }else{
                        cost=Math.round(10*(buildings[assignning].level**1.5));
                    }
                    if(buildings.findIndex((elem)=>elem.name=="紫禁城" && elem.owner==P)!=-1){
                        cost=Math.floor(cost*0.75);
                    }
                    if(buildings[assignning].name=="首都"){
                        if(buildings[assignning].level==1){
                        if(hasTech("埋葬") && hasTech("農業") && hasTech("冶金")){
                        display=true;
                        }
                            }else if(buildings[assignning].level==2){
                        if(hasTech("算術") && hasTech("政府")){
                        display=true;
                        }
                            }else if(buildings[assignning].level==3){
                        if(hasTech("力学") && hasTech("経済学")){
                        display=true;
                        }
                            }else if(buildings[assignning].level==4){
                        if(hasTech("ダイナマイト") && hasTech("エンジン")){
                        display=true;
                        }
                            }else if(buildings[assignning].level==5){
                        if(hasTech("人工衛星") && hasTech("核分裂反応")){
                        display=true;
                        }
                            }else if(hasTech("シンギュラリティ")){
                            display=true;
                            }
                    }else{
                        display=true;
                    }
        if(display===true){
                    document.querySelector("#information").innerHTML=`コスト[文化`+cost+`]<input type="button" value="アップグレード" onclick="upgrade(`+u.assign+`,`+cost+`)" /><br><br><input type="button" value="破壊" onclick="deleteObject('buildings',`+u.assign+`);" /><br><input type="button" value="解雇" onclick="deleteObject('units',`+u.assign+`); food[P]=food[P]+3" /><br>`;
            }
                    }else if(u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
        document.querySelector("#information").innerHTML=u.name+"<br>体力"+u.hp+"<br>戦闘力"+u.str+"<br>状態:"+u.status+"<br><br><input type='button' value='解雇' onclick='deleteObject(\"units\","+u.assign+")'>";
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
        if(level[P]>5){
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
        }else if(b.status=="選択中" && (b.type=="⚖") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        let amount=10;
        if(buildings.findIndex((elem)=>elem.name=="タージ・マハル" && elem.owner==P)!=-1){
            amount+=amount;
        }
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        犠牲[1つ分の食糧の生産]<input type="button" value="食糧+${amount}" onclick="trade("foodPt","food",${b.owner},${amount})" /><br>
        犠牲[1つ分の物資の生産]<input type="button" value="物資+${amount}" onclick="trade("bRPt","basicResources",${b.owner},${amount})" /><br>
        犠牲[1つ分の部品の生産]<input type="button" value="部品+${amount}" onclick="trade("partsPt","parts",${b.owner},${amount})" />
        `;
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
        }else if(Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52 && b.assign==selectedTile && units.findIndex((elem)=>elem.assign==b.assign)==-1){
        document.querySelector("#information").innerHTML=b.name+"<br>体力"+b.hp+"<br>生産:"+b.type+b.str;
        }else if(u.type!="⚒" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52 && u.assign==selectedTile){
        document.querySelector("#information").innerHTML=u.name+"<br>体力"+u.hp+"<br>戦闘力"+u.str+"<br>状態:"+u.status;
        }
        //}
        //}
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
var connection="";
function websocketConnection(url){
connection = new WebSocket(url);
document.querySelector(".local").innerHTML=`
<input type="text" id="chatmsg" /><input type="button" value="送信" onclick="sendChatmsg()" /><br>
<t id="chat"></t>
`;
chatmsg=document.getElementById("chatmsg");
//document.getElementById("webs").disabled=true;
//document.getElementById("serverUrl").disabled=true;
//playerName.disabled=true;
connection.addEventListener('open',function(e){
    connection.send("接続:"+playerName.value);
    connection.send(playerName.value+"から新たな接続があります！");
});
connection.addEventListener("message", (event) => {
    if(event.data.indexOf("送信:")==0){
        document.getElementById("chat").innerHTML=event.data.replace("送信:","")+"<br>"+document.getElementById("chat").innerHTML;
        }
    });
}
document.addEventListener('DOMContentLoaded',function(e){
            document.getElementById('next').addEventListener('click',function(e){
                if(connection!=""){
                connection.send('ターン'+Math.floor((turn+1)/2)+"プレイヤー"+P);
                    }
    });
});
function sendChatmsg(){
    connection.send("送信:"+playerName.value+":"+chatmsg.value);
    chatmsg.value="";
}
generate(12);
function trade(type,type2,owner,benefit){
    if(eval(type)[owner]>0){
    changeStats(type,owner,-1);
    changeStats(type2,owner,benefit);
    };
}
function changeStats(type,owner,value){
    eval(`if(${type}[${owner}]+value>=0){
    ${type}[${owner}]+=value;
    }`);
}
discovery("石器",0);
discovery("石器",1);
discovered("石器",0);
discovered("石器",1);
function makeTile(planet){
    let k=0;
    let hexX=100;
    let hexY=10;
    while(hexX<planets[planets.findIndex((e)=>e.name==planet)].size[0]){
        let t="";
        if(Math.round(Math.random()*5)!=0){
            t="Land";
        }else{
            t="Water"
            }
    tiles.push({id:tiles.length,hexX:hexX,hexY:hexY,centroid:{x:hexX-30,y:hexY+60*Math.sin(2*Math.PI/3)},type:t,status:"待機",planet:planet});
    if(hexY+240*Math.sin(2*Math.PI/3)>=planets[planets.findIndex((e)=>e.name==planet)].size[1]){
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
}
function transport(planet,assign){
    let index=units.findIndex((e)=>e.planet==planet && e.assign==assign);
    let arrival="";
    while(arrival=="" || planets[arrival].name==planet){
        arrival=Math.round(Math.random()*(planets.length-1));
    }
    let min=tiles.findIndex((e)=>e.planet==planets[arrival].name)+1;
    units[index].planet=planets[arrival].name;
    units[index].assign=Math.round(Math.random(planets[arrival].tiles)*+min);
}
