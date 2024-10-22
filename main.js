const h=new hachchchctx();
var editar=false;
var buildMode=4;
var newGame=true;
var spaceAge=false;
var selectedPlayers="";
var diplomacyButtons=document.getElementById("diplomacyButtons");
const history=document.getElementById("history");
/*画像読み込み*/
const imgCity1=new Image();
imgCity1.src="./Images/石器時代首都.png";
const imgCity2=new Image();
imgCity2.src="./Images/古代首都.png";
const imgCity4=new Image();
imgCity4.src="./Images/工業首都.png";
const imgWarrior=new Image();
imgWarrior.src="./Images/戦士.png";
const imgBaller=new Image();
imgBaller.src="./Images/投石部隊.png";
const imgWorker1=new Image();
imgWorker1.src="./Images/木こり.png";
const imgWorker2=new Image();
imgWorker2.src="./Images/奴隷.png";
const imgWorker3=new Image();
imgWorker3.src="./Images/市民.png";
const imgWorker4=new Image();
imgWorker4.src="./Images/労働者.png";
const imgWorker5=new Image();
imgWorker5.src="./Images/トラック.png";
const imgPike=new Image();
imgPike.src="./Images/長槍兵.png";
const imgLineInfantry=new Image();
imgLineInfantry.src="./Images/戦列歩兵.png";
const imgInfantry=new Image();
imgInfantry.src="./Images/歩兵.png";
const imgMotorizedInfantry=new Image();
imgMotorizedInfantry.src="./Images/自動車化歩兵.png";
const imgHowitzer=new Image();
imgHowitzer.src="./Images/榴弾砲.png";
const imgSpecial=new Image();
const imgTank=new Image();
imgTank.src="./Images/歩兵戦車.png";
imgSpecial.src="./Images/特殊部隊.png";
const imgModernTank=new Image();
imgModernTank.src="./Images/主力戦車.png";
const playerName=document.getElementById("playerName");
var chat="";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let query="";
const dataSet=document.getElementById("dataSet");
const mouse = {x: null,y: null};
const buttons=[];
var opinions=[];
var techList=[];
var localGame=false;
var worldName="テイア";
var techs=[];
var tiles=[];
var units=[];
var mapPlanet=["テイア","テイア"];
var players=[{
    name:"プレイヤー1",
    discoveredPlanets:["テイア"],
    war:["プレイヤー2"]
},{
    name:"プレイヤー2",
    discoveredPlanets:["テイア"],
    war:["プレイヤー1"]
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
var displayMode="スタート前";//備考 技術ツリー、宗教ツリー、宇宙空間
var buildings=[];
var popTexts=[];
var particles=[];
var science=[4,4];
var food=[5,5];
let frames=0;
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
for(let k=0; k<100; ++k){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height-100
    });
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
    label:"ゲーム開始！",
    display:"スタート前",
    status:"待機",
    interval:-1,
    x:canvas.width/2-75,
    y:canvas.height/2-200,
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
buttons.push({
    label:"ユニットモード",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:330,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"ビルドモード",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:490,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"強化モード",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:650,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"地形モード",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:810,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"首都変更",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:970,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"削除モード",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:1130,
    y:canvas.height-90,
    w:150,
    h:80
});
buttons.push({
    label:"プレイヤー変更",
    display:"エディタ",
    status:"待機",
    interval:-1,
    x:1290,
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
    description:"工場が作れるようになる。労働者の移動力が+1"
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
    description:"自動車化歩兵、歩兵戦車が作れるようになる。首都レベル5のアップグレードに必要"
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
for(let k=0; k<players.length; ++k){
    opinions.push({
        policy:{democracy:5,fascism:5},
        diplomacy:{warmonger:5,pacifisist:5},
        economy:{capitalism:5,socialism:5},
        morale:30
    });
}
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
    if(techName!="石器" && techs.findIndex((e)=>e.name==techName && e.assign!=owner && e.status=="発見済")==-1){
        writeHistory(`${players[owner].name}が${techName}を発見！`);
    }
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
    frames++;
    if(buildings.findIndex((elem)=>elem.name=="アルテミス神殿" && elem.owner==P)!=-1){
    science[P]=culturePt[P]*3;
    }else{
    science[P]=culturePt[P]*2;
    }
    if(displayMode!="スタート前"){
    document.querySelector(".t0").innerHTML="ターン"+Math.floor((turn+1)/2)+",プレイヤー"+(P+1)+",科学力"+science[P]+"労働意欲"+opinions[P].morale;
    document.querySelector(".t1").innerHTML=food[P]+"(+"+foodPt[P]+")";
    document.querySelector(".t2").innerHTML=basicResources[P]+"(+"+bRPt[P]+")";
    document.querySelector(".t3").innerHTML=culture[P]+"(+"+culturePt[P]+")";
    if(partsPt[P]>0){
    document.querySelector(".t4").innerHTML="部品:"+parts[P]+"(+"+partsPt[P]+")";
        }else{
        document.querySelector(".t4").innerHTML="";
        }
        }
    if(displayMode!="スタート前"){
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
    if(displayMode=="スタート前" || displayMode=="宇宙空間"){
        ctx.fillStyle="#ffffff";
        if(displayMode=="スタート前"){
            let index=planets.findIndex((e)=>e.name=="テイア");
            ctx.beginPath();
            if(index!=-1){
            ctx.arc(canvas.width/2-150,(canvas.height-100)/2-110+20*Math.cos(frames/40),planets[index].radius,0,Math.PI*2);
            ctx.fill();
                }
            ctx.closePath();
            ctx.fillText(worldName,canvas.width/2-150,(canvas.height-100)/2-140+20*Math.cos(frames/40));
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
    if(displayMode=="ワールドマップ"){
    ctx.fillStyle="#000000";
        /*タイル系*/
    for(const t of tiles){
    ctx.strokeStyle="#000000";
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
    if(h.collisionHex(t.hexX-90,t.hexY,60,mouse.x,mouse.y) || (editar===true && t.id==selectedTile)){
        if(editar===false){
    selectedTile=t.id;
        }
    let tHexX=t.centroid.x+27.5;
    let tHexY=t.centroid.y-55*Math.sin(2*Math.PI/3);
    ctx.moveTo(tHexX,tHexY);
    for(let i=1; i<=6; ++i){
    tHexX=tHexX+55*Math.cos((i/2)*(2*Math.PI/3));
    tHexY=tHexY+55*Math.sin((i/2)*(2*Math.PI/3));
    ctx.lineTo(tHexX,tHexY);
    }
        }
    if(units.findIndex((e)=>e.owner!=P && e.assign==t.id)!=-1){
    ctx.strokeStyle="#ff0000";
    }else if((units.findIndex((e)=>e.status=="選択中" && e.assign==t.id)!=-1) || (editar===true && t.id==selectedTile)){
    ctx.strokeStyle="#0000ff";
    }else if(units.findIndex((e)=>e.status=="行動終了" && e.assign==t.id)!=-1){
    ctx.strokeStyle="#bbbbbb";
    }else{
    ctx.strokeStyle="#000000";
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
        if(displayMode==b.display){
        if(b.label!="宇宙空間" || buildings.findIndex((e)=>e.owner==P && e.name=="宇宙基地")!=-1 || buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡" && elem.owner==P)!=-1){
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
            if(b.label=="ワールドマップ"){
                displayMode="ワールドマップ";
            }
            if(b.label=="宇宙空間"){
                displayMode="宇宙空間";
            }
            if(b.label=="ゲーム開始！"){
                if(newGame===true){
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
                    ctx.drawImage(imgCity1,b.x-40,b.y-40,80,80);
                    capitalVer2=true;
                }
                if(level[b.owner]==2){
                    ctx.drawImage(imgCity2,b.x-50,b.y-50,100,100);
                    capitalVer2=true;
                }
                if(level[b.owner]==4){
                    ctx.drawImage(imgCity4,b.x-50,b.y-60,100,100);
                    capitalVer2=true;
                }
            }
        if(b.type!="🌾" && b.name!="鉱山" && capitalVer2===false){
        rect(b.x,b.y-10,60,b.color);
        }
            if(b.delay==0 || b.owner!=P){
                if(b.owner!=P){
                if(isEnemy(P,b.owner)){
                ctx.fillStyle="#ff0000";
                    }else{
                    ctx.fillStyle="#00dddd";
                    }
                }else{
                    ctx.fillStyle=b.color;
                }
            }else{
                ctx.fillStyle="#cccccc";
            }
        if(b.type=="🏘" && capitalVer2===false){
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
        }else if(capitalVer2===false){
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
            if(u.owner!=P && u.name=="地対空ミサイルランチャー"){
                if(u.status!="行動終了" && u.status!="防衛終了"){
                if(units.findIndex((e)=>Math.abs(e.x-u.x)<=300 && Math.abs(e.y-u.y)<=300 && u.owner!=e.owner && e.type=="🚀" && e.status=="哨戒")!=-1){
                units.push({
                    name:"地対空ミサイル",
                    type:"🚀",
                    str:8,
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
                    type:"🚀",
                    str:8,
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
        let rad=Math.atan2(tiles[u.assign].centroid.y-u.y,tiles[u.assign].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(Math.abs(u.x-tiles[u.assign].centroid.x)<u.mp+2 && Math.abs(u.y-tiles[u.assign].centroid.y)<u.mp+2){
            u.x=tiles[u.assign].centroid.x;
            u.y=tiles[u.assign].centroid.y;
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
        let id=units.findIndex((e)=>e.seed==u.seed);
        let rad=Math.atan2(tiles[u.assign].centroid.y-u.y,tiles[u.assign].centroid.x-u.x);
        u.x=u.x+u.mp*Math.cos(rad);
        u.y=u.y+u.mp*Math.sin(rad);
        if(u.type=="🚀"){
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
            if(u.type!="🚀"){
            let enemy=units.findIndex((elem)=>elem.assign==u.assign && elem.seed!=u.seed);
                if(enemy!=-1){
                    airAttackToUnits(id,enemy);
                    }else if(buildings.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner)!=-1){
                    let enemyBuilding=buildings.findIndex((elem)=>elem.assign==u.assign && elem.owner!=u.owner);
                    airAttackToBuildings(id,enemyBuilding);
                    }
            }else{
                if(u.name=="反物質爆弾" || u.name=="核融合弾頭搭載ICBM" || u.name=="核弾頭搭載ICBM"){
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
    if(u.name=="戦士"){
    ctx.drawImage(imgWarrior,u.x-40,u.y-40,80,80);
    }
            if(u.name=="長槍兵"){
    ctx.drawImage(imgPike,u.x-40,u.y-40,80,80);
    }
            if(u.name=="戦列歩兵"){
    ctx.drawImage(imgLineInfantry,u.x-40,u.y-40,80,80);
    }
            if(u.name=="歩兵"){
    ctx.drawImage(imgInfantry,u.x-40,u.y-40,80,80);
    }
            if(u.name=="自動車化歩兵"){
    ctx.drawImage(imgMotorizedInfantry,u.x-40,u.y-40,80,80);
    }
            if(u.name=="榴弾砲"){
    ctx.drawImage(imgHowitzer,u.x-40,u.y-40,80,80);
    }
            if(u.name=="特殊部隊"){
    ctx.drawImage(imgSpecial,u.x-40,u.y-40,80,80);
    }
            if(u.name=="主力戦車"){
    ctx.drawImage(imgModernTank,u.x-40,u.y-40,80,80);
    }
            if(u.name=="歩兵戦車"){
    ctx.drawImage(imgTank,u.x-40,u.y-40,80,80);
    }
            if(u.name=="投石"){
    ctx.drawImage(imgBaller,u.x-40,u.y-40,80,80);
    }
            if(u.name=="労働者"){
                if(level[u.owner]==1){
    ctx.drawImage(imgWorker1,u.x-40,u.y-40,80,80);
                    }
                if(level[u.owner]==2){
    ctx.drawImage(imgWorker2,u.x-40,u.y-40,80,80);
                    }
                if(level[u.owner]==3){
    ctx.drawImage(imgWorker3,u.x-40,u.y-40,80,80);
                    }
                if(level[u.owner]==4){
    ctx.drawImage(imgWorker4,u.x-40,u.y-40,80,80);
                    }
                if(level[u.owner]>=5){
    ctx.drawImage(imgWorker5,u.x-40,u.y-40,80,80);
                    }
    }
    ctx.arc(u.x,u.y,10,0,2*Math.PI);
    if(popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-52)!=-1){
    ctx.fillStyle=popTexts[popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-52)].color;
    ctx.fill();
    }
            if(u.name=="労働者"){
                if(u.status=="建設中" || u.status=="強化中"){
                ctx.fillStyle="#777777";
            ctx.fillRect(u.x-25,u.y-40,50,5);
            ctx.fillStyle="#cccccc";
            ctx.fillRect(u.x-25,u.y-40,u.hp/2,5);
                    }
            }else{
        ctx.fillStyle="#ff0000";
            ctx.fillRect(u.x-25,u.y-40,50,5);
            ctx.fillStyle="#cccccc";
            ctx.fillRect(u.x-25,u.y-40,u.hp/2,5);
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
    ctx.fillStyle="#00dddd";
    ctx.strokeStyle="#00dddd";
                }
    }
        if(u.name=="炎のドラゴン" || u.name=="闇のドラゴン" || u.name=="光のドラゴン"){
    ctx.fillText("🐲"+u.str,u.x,u.y+25);
            }else{
            ctx.fillText(u.type+u.str,u.x,u.y+25);
            }
    if(u.name!="戦士" && u.name!="長槍兵" && u.name!="戦列歩兵" && u.name!="歩兵" && u.name!="自動車化歩兵" && u.name!="榴弾砲" && u.name!="特殊部隊" && u.name!="主力戦車" && u.name!="歩兵戦車" && u.name!="労働者" && u.name!="投石"){
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
    if(editar===true){
        for(const t of tiles){
            if(h.collisionHex(t.hexX-90,t.hexY,60,mouse.x,mouse.y) && mapPlanet[P]==t.planet){
                selectedTile=t.id;
                if(buildMode==2){
                    if(buildings.findIndex((e)=>e.assign==selectedTile)!=-1){
                        let index=buildings.findIndex((e)=>e.assign==selectedTile);
                        level[buildings[index].owner]++;
                        buildings[index].level++;
                        buildings[index].hp=75+25*buildings[index].level;
                        if(buildings[index].name=="首都"){
                            if(buildings[index].level==2){
                        discovery("文字",buildings[index].owner);
                        discovery("畜産",buildings[index].owner);
                    }
                    if(buildings[index].level==3){
                        discovery("工学",buildings[index].owner);
                    }
                    if(buildings[index].level==4){
                        discovery("蒸気機関",buildings[index].owner);
                        discovery("化学肥料",buildings[index].owner);
                    }
                    if(buildings[index].level==5){
                        discovery("情報通信",buildings[index].owner);
                        discovery("プラスチック",buildings[index].owner);
                    }
                    if(buildings[index].level==6){
                        discovery("宇宙旅行",buildings[index].owner);
                        discovery("ホバリング",buildings[index].owner);
                        discovery("量子工学",buildings[index].owner);
                    }
                        }
                    }
                }
                if(buildMode==3){
                    if(units.findIndex((e)=>e.assign==selectedTile)!=-1){
                        if(units.length>1){
                        deleteObject("units",selectedTile);
                            }
                    }else if(buildings.findIndex((e)=>e.assign==selectedTile && e.name!="首都")!=-1){
                        deleteObject("buildings",selectedTile);
                    }
                }
                if(buildMode==5){
                    if(buildings.findIndex((e)=>e.assign==selectedTile)==-1){
                    let index=buildings.findIndex((e)=>e.name=="首都" && e.owner==P);
                    buildings[index].assign=selectedTile;
                    buildings[index].x=tiles[selectedTile].centroid.x;
                    buildings[index].y=tiles[selectedTile].centroid.y;
                        }
                }
            }
        }
        if(mouse.y>canvas.height-100){
            selectedTile=-1;
            }
    }
    if(editar===true && selectedTile!=-1 && buildMode==4){
        if(tiles[selectedTile].type=="Water"){
            tiles[selectedTile].type="Land";
        }else{
            tiles[selectedTile].type="Water";
        }
    }
    if(displayMode=="宇宙空間"){
        for(const p of planets){
            if(players[P].discoveredPlanets.indexOf(p.name)!=-1){
            if(h.collisionRect(p.x-p.radius-50,p.y-p.radius-50,p.radius*2+100,p.radius*2+100,mouse.x,mouse.y)){
                mapPlanet[P]=p.name;
            }
                }
        }
    }
    if(displayMode=="技術ツリー"){
    for(const t of techs){
        if(h.collisionRect(t.x,t.y,150,100,mouse.x,mouse.y) && t.assign==P){
            if(editar===true){
                discovered(t.name,t.assign);
            }else{
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
        }
    for(const b of buttons){
        if((h.collisionRect(b.x,b.y,b.w,b.h,mouse.x,mouse.y) && b.display==displayMode) || (h.collisionRect(b.x,b.y,b.w,b.h,mouse.x,mouse.y) && editar===true && b.display=="エディタ")){
            if(b.label!="宇宙空間" || buildings.findIndex((e)=>e.owner==P && e.name=="宇宙基地")!=-1 || buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡" && elem.owner==P)!=-1){
            document.querySelector("#description").innerHTML="";
            b.status="選択中";
            b.interval=3;
                }
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
            for(const U of units){
                if(U.status=="選択中"){
                U.status="待機";
                U.color="#000000";
                    }
            }
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
            if(h.collisionHex(tiles[selectedTile].hexX-90,tiles[selectedTile].hexY,60,mouse.x,mouse.y) && units.findIndex((elem)=>selectedTile==elem.assign && elem.owner==P)==-1){
            if((Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*u.range+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<104*u.range+2) && u.fly===false){
                if(u.type!="🛩" && u.type!="✈" && u.type!="🚀" && u.name!="地対空ミサイルランチャー"){
                if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner)){
                    let indexOfYourUnit=units.findIndex((e)=>e.assign==u.assign && e.owner==u.owner);
                    attackSound(indexOfYourUnit);
                    /*ダメージ計算*/
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
                        }
                    }else if(buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
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
                        if(u.range>=3 && buildings[enemyBuilding].hp<=0){
                            buildings[enemyBuilding].hp=1;
                            }
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
                    }
                    }else if(u.name=="地対空ミサイルランチャー" && (units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1 || buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1)){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner) || isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
                    sam();
                    units.push({
                    name:"地対空ミサイルA",
                    type:"🚀",
                    str:75,
                    hp:100,
                    range:1,
                    move:6,
                    mp:12,
                    fly:true,
                    x:u.x,
                    y:u.y,
                    color:"#000000",status:"哨戒",assign:selectedTile,
                    assignCamp:u.assign,
                    owner:u.owner,planet:u.planet,seed:Math.round(Math.random()*999999)});

                    u.move=0;
                    u.status="行動終了";
                    u.color="#bbbbbb";
                    }
                    }else if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1 || buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner) || isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
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
                }
                }
                if(((Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*(u.move)+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*(u.move)+2)) || (!(u.fly===false || !u.fly) && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀"))) && selectedTile!=u.assign){
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
units.push({name:"首長",type:"⚔",str:8,hp:100,range:1,move:2,mp:2,fly:false,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],owner:0,planet:"テイア",seed:Math.round(Math.random()*999999)});
buildings.push({name:"首都",type:"🏘",str:"",hp:100,delay:0,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],level:1,owner:0,planet:"テイア"});
buildings.push({name:"首都",type:"🏘",str:"",hp:100,delay:0,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1,planet:"テイア"});
while((Math.abs(buildings[0].x-buildings[1].x)<500 && Math.abs(buildings[0].y-buildings[1].y)<500) || tiles[randomCity[1]].type=="Water"){
    deleteObject("buildings",parseInt(randomCity[1]));
    randomCity=[randomCity[0],Math.round(Math.random()*71)];
buildings.push({name:"首都",type:"🏘",str:"",hp:100,delay:0,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1,planet:"テイア"});
    }
units.push({name:"首長",type:"⚔",str:8,hp:100,range:1,move:2,mp:2,fly:false,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],owner:1,planet:"テイア",seed:Math.round(Math.random()*999999)});

    opinions[1].morale=30;
function nextTurn(){
    selectedTile=-1;
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
        if(u.name!="労働者"){
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
                u.hp=u.hp+Math.round(Math.random()*Math.floor(opinions[u.owner].morale*1.5));
                    }else{
        u.hp=u.hp+Math.round(Math.random()*opinions[u.owner].morale);
                    }
            if(u.hp>=100){
                if(buildings.findIndex((elem)=>elem.name=="ピラミッド" && elem.owner==u.b[4])!=-1 && u.str=="農場"){
                    u.b[2]++;
                }
                if(buildings.findIndex((elem)=>elem.name=="ストーンヘンジ" && elem.owner==u.b[4])!=-1 && u.str=="鉱山"){
                    u.b[2]++;
                }
                if(buildings.findIndex((elem)=>elem.name=="スマートシティ" && elem.owner==u.b[4])!=-1 && (u.b[1]=="🌾" || u.b[1]=="📖" || u.b[1]=="🏭" || u.b[1]=="⚙")){
                    u.b[2]+=6;
                }
                opinions[u.owner].morale++;
                buildings.push({name:u.b[0],type:u.b[1],str:u.b[2],hp:100,delay:0,x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,color:"#000000",status:u.b[3],assign:u.assign,level:1,owner:u.b[4],planet:u.planet});
                if(u.b.type=="🌾"){
                foodPt[u.b[4]]+=u.b[2];
                }else if(u.b[1]=="⚙"){
                bRPt[u.b[4]]+=u.b[2];
                }else if(u.b[1]=="📖"){
                culturePt[u.b[4]]+=u.b[2];
                }else if(u.b[1]=="🏭"){
                partsPt[u.b[4]]+=u.b[2];
                }
                if(u.b[0]=="ストーンヘンジ"){
                    writeHistory(`ストーンヘンジが完成した。`);
                }
                if(u.b[0]=="ピラミッド"){
                    writeHistory(`ピラミッドが完成した。`);
                }
                if(u.b[0]=="ハッブル宇宙望遠鏡"){
                    for(let k=0; k<planets.length; ++k){
                        if(players[u.b[4]].discoveredPlanets.indexOf(planets[k].name)==-1){
                            players[u.b[4]].discoveredPlanets.push(planets[k].name);
                        }
                    }
                    writeHistory(`ハッブル宇宙望遠鏡が完成した。`);
                }
                u.hp=0;
                u.str="";
                u.status="待機";
                u.color="#000000";
                }
            }else  if(u.hp<100 && u.status=="強化中"){
                if(buildings.findIndex((elem)=>elem.name=="ビッグベン" && elem.owner==u.b[5])!=-1){
                u.hp=u.hp+Math.round(Math.random()*Math.floor(opinions[u.owner].morale*2.5));
                    }else{
                u.hp=u.hp+Math.round(Math.random()*opinions[u.owner].morale*2);
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
              deleteObject("buildings",u.assign,true);
              buildings.push({name:u.b[0],type:u.b[1],str:u.b[2],hp:100*(1+0.25*(u.b[3]-1)),x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,delay:0,color:"#000000",status:u.b[4],assign:u.assign,level:u.b[3],owner:u.b[5],planet:u.planet});
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
                    if(level[u.b[5]]==2){
                        writeHistory(`${players[u.b[5]].name}が文明を築き上げた。`);
                    }
                    if(level[u.b[5]]==3){
                        writeHistory(`${players[u.b[5]].name}の文明は中世に突入した。`);
                    }
                    if(level[u.b[5]]==4){
                        writeHistory(`${players[u.b[5]].name}の国は産業革命に突入。科学技術は目まぐるしい進歩を遂げ、庶民の生活水準を向上させている。`);
                    }
                    if(level[u.b[5]]==5){
                        writeHistory(`${players[u.b[5]].name}の国は現代に突入。`);
                    }
                    if(level[u.b[5]]==6){
                        writeHistory(`${players[u.b[5]].name}の国は未来に突入。宇宙開発が進み、ついに宇宙旅行が可能になる。`);
                    }
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
        if(b.owner==P){
        if(b.delay>0){
            b.delay--;
            if(b.delay==0){
                if(b.type=="🌾"){
                            foodPt[b.owner]+=b.str;
                        }else if(b.type=="📖"){
                            culturePt[b.owner]+=b.str;
                        }else if(b.type=="🏭"){
                            partsPt[b.owner]+=b.str;
                        }else if(b.type=="⚙"){
                            bRPt[b.owner]+=b.str;
                        }
            }
        }
        }
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
    if(hasTech("車輪")){
        for(const u of units){
            if(u.owner==P && u.type=="⚒"){
                u.mp=3;
            }
        }
    }
    if(hasTech("蒸気機関")){
        for(const u of units){
            if(u.owner==P && u.type=="⚒"){
                u.mp=4;
            }
        }
    }
}
function construction(name,type,str,status,cultureCost){
    if(editar===false){
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
            u.b=[name,type,str,status,owner];
            u.status="建設中";
            u.color="#bbbbbb";
                if(connection!=""){
                connection.send("送信:タイル"+u.assign+"でプレイヤー"+u.owner+"の"+u.name+"が"+u.str+"を建設中");
                    }
                }
        }
    }
    }
    }else{
        if(buildings.findIndex((elem)=>elem.name=="ピラミッド" && elem.owner==P)!=-1 && name=="農場"){
                    str++;
                }
                if(buildings.findIndex((elem)=>elem.name=="ストーンヘンジ" && elem.owner==P)!=-1 && name=="鉱山"){
                    str++;
                }
                if(buildings.findIndex((elem)=>elem.name=="スマートシティ" && elem.owner==P)!=-1 && (type=="🌾" || type=="📖" || type=="🏭" || type=="⚙")){
                    str+=6;
                }
                buildings.push({name:name,type:type,str:str,hp:100,x:tiles[selectedTile].centroid.x,y:tiles[selectedTile].centroid.y,color:"#000000",status:status,assign:selectedTile,level:1,owner:P,planet:tiles[selectedTile].planet,delay:0});
                if(type=="🌾"){
                foodPt[P]+=str;
                }else if(type=="⚙"){
                bRPt[P]+=str;
                }else if(type=="📖"){
                culturePt[P]+=str;
                }else if(type=="🏭"){
                partsPt[P]+=str;
                }
    }
}
function train(name,type,str,range,mp,assign,resources,instantOwner,instantHp,planet){
    if(editar===true){
        assign=selectedTile;
    }
    if(!planet){
        planet=mapPlanet[P];
    }
    if(!instantOwner && !instantHp){
    if(units.findIndex((elem)=>elem.assign==assign)==-1 && ((resources[0]<=food[P] && resources[1]<=basicResources[P] && resources[2]<=parts[P]) || (editar===true))){
        if(editar===false){
        food[P]=food[P]-resources[0];
        basicResources[P]=basicResources[P]-resources[1];
        parts[P]=parts[P]-resources[2];
            }
        if(type=="⚒"){
            if(hasTech("車輪")){
                mp++;
            }
            if(hasTech("蒸気機関")){
                mp++;
            }
            units.push({name:name,type:type,str:str,hp:0,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,fly:false,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet,seed:Math.round(Math.random()*999999)});
            }else{
    units.push({name:name,type:type,str:str,hp:100,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,fly:false,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet,seed:Math.round(Math.random()*999999)});
            }
        }
        }else{
        if(!instantHp){
            instantHp=100;
            }
        if(editar===false){
        food[P]=food[P]-resources[0];
        basicResources[P]=basicResources[P]-resources[1];
        parts[P]=parts[P]-resources[2];
            }
        if(type=="⚒"){
            units.push({name:name,type:type,str:str,hp:0,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,fly:false,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet,seed:Math.round(Math.random()*999999)});
            }else{
    units.push({name:name,type:type,str:str,hp:instantHp,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,fly:false,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet,seed:Math.round(Math.random()*999999)});
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
function deleteObject(objects,assign,mode){
    if(!mode){
        mode=false;
    }
    let syntax=`
let index=`+objects+`.findIndex((elem)=>elem.assign==`+assign+`);
let objectOwner=`+objects+`[index].owner;
if("${objects}"=="buildings" && ${mode}===false){
    opinions[${objects}[index].owner].morale--;
}else if(`+objects+`[index].type=='🌾' && ${objects}[index].delay==0){
    foodPt[objectOwner]=foodPt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='⚙' && ${objects}[index].delay==0){
    bRPt[objectOwner]=bRPt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='📖' && ${objects}[index].delay==0){
    culturePt[objectOwner]=culturePt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='🏭' && ${objects}[index].delay==0){
    partsPt[objectOwner]=partsPt[objectOwner]-`+objects+`[index].str;
}else if(`+objects+`[index].type=='⚒'){
    opinions[${objects}[index].owner].morale--;
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
    if(buildings.findIndex((e)=>e.assign==u.assign && e.delay==0 && e.name=="宇宙基地")!=-1 && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52){
        let planetLocations="";
        for(let k=0; k<players[P].discoveredPlanets.length; ++k){
            planetLocations+=`<option>${players[P].discoveredPlanets[k]}</option>`;
        }
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[部品500]<input type="button" value="このユニットをランダムな惑星へ送る" onclick="transport('${u.planet}',${u.assign})" /><br>
        必要[部品50]<input type="button" value="このユニットを既知の惑星へ送る" onclick="transportLocation(${u.assign},query.value)" /><br>
        <select id="planetSelect">
        ${planetLocations}
        </select>
        `;
        query=document.querySelector("#planetSelect");
    }else if((u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)==-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52) || (editar===true && buildMode==1)){
                document.querySelector("#information").innerHTML=`建築<br>レベルI`;
        if(hasTech("農業")){
                document.querySelector("#information").innerHTML+=`<input type="button" value="農場" onclick="construction(this.value,'🌾',2,'栽培中')" />`;
            }
                document.querySelector("#information").innerHTML+=`<input type="button" value="見張台" onclick="construction(this.value,'🛡',3,'稼働中')" />`;
        if(hasTech("冶金")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="鉱山" onclick="construction(this.value,'⚙',2,'稼働中')" />`;
            }
        document.querySelector("#information").innerHTML+="<br>";
                if(level[P]>1){
                    document.querySelector("#information").innerHTML+=`レベルII`;
        if(hasTech("政府")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="都市" onclick="construction(this.value,'🏠','','待機')" />`;
            }
        if(hasTech("哲学")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="大学" onclick="construction(this.value,'📖',2,'稼働中')" />`;
            }
        document.querySelector("#information").innerHTML+=`<input type="button" value="城塞" onclick="construction(this.value,'🛡',12,'稼働中')" />`;
            }
        document.querySelector("#information").innerHTML+="<br>";
                if(level[P]>2){
                    document.querySelector("#information").innerHTML+=`レベルIII`;
        document.querySelector("#information").innerHTML+=`<input type="button" value="神殿" onclick="construction(this.value,'❤',6,'稼働中')" />`;
                    if(hasTech("経済学")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="市場" onclick="construction(this.value,'⚖','','稼働中')" />`;
                        }
                    if(hasTech("印刷技術")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="演劇場" onclick="construction(this.value,'📖',5,'稼働中')" />`;
                        }
                    document.querySelector("#information").innerHTML+="<br>";
                    }
                if(level[P]>3){
                    document.querySelector("#information").innerHTML+=`レベルIV`;
                    if(hasTech("化学肥料")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="穀倉地帯" onclick="construction(this.value,'🌾',8,'栽培中')" />`;
        }
                    if(hasTech("蒸気機関")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="工場" onclick="construction(this.value,'⚙',12,'稼働中')" />`;
                        }
                    if(hasTech("電子工学")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="精製プラント" onclick="construction(this.value,'🏭',2,'稼働中')" />`;
                        }
                    if(hasTech("飛行機")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="空港" onclick="construction(this.value,'🛬','','待機')" />`;
                        }
                    if(hasTech("軍事学")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="軍事基地" onclick="construction(this.value,'🛡',36,'稼働中')" />`;
                        }
                    document.querySelector("#information").innerHTML+="<br>";
                    }
                if(level[P]>4){
                    document.querySelector("#information").innerHTML+=`レベルV`;
                    if(hasTech("プラスチック")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="病院" onclick="construction(this.value,'❤',12,'稼働中')" />`;
                        }
                    if(hasTech("マスメディア")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="テレビ局" onclick="construction(this.value,'📖',12,'稼働中')" />`;
                        }
                    if(hasTech("核分裂反応")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="原子力発電所" onclick="construction(this.value,'🏭',14,'稼働中')" />`;
                        }
                    if(hasTech("液体推進剤")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="ミサイルポッド" onclick="construction(this.value,'🚀','','待機')" />`;
                        }
                    document.querySelector("#information").innerHTML+="<br>";
                    }
                if(level[P]>5){
                    document.querySelector("#information").innerHTML+=`レベルVI`;
                    if(hasTech("宇宙旅行")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="宇宙基地" onclick="construction(this.value,'🛰','','稼働中')" />`;
                        }
        document.querySelector("#information").innerHTML+="<br>";
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
            if(hasTech("文字")){
            if(buildings.findIndex((elem)=>elem.name=="アレクサンドリア図書館")==-1 && units.findIndex((elem)=>elem.str=="アレクサンドリア図書館")==-1){
            document.querySelector("#information").innerHTML+=`コスト[文化25]効果：文化+8<input type="button" value="アレクサンドリア図書館" onclick="construction(this.value,'📖',8,'稼働中',25)" /><br>`;
                }
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
            if(hasTech("火薬")){
            if(buildings.findIndex((elem)=>elem.name=="姫路城")==-1 && units.findIndex((elem)=>elem.str=="姫路城")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化100]効果：この建物の上で戦闘力+24<input type="button" value="姫路城" onclick="construction(this.value,'🛡',24,'稼働中',100)" /><br>`;
                }
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
            if(hasTech("人工衛星")){
            if(buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡")==-1 && units.findIndex((elem)=>elem.str=="ハッブル宇宙望遠鏡")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化500]効果：全ての惑星の情報がわかる。<input type="button" value="ハッブル宇宙望遠鏡" onclick="construction(this.value,'🔭','','待機',500)" /><br>`;
                }
                }
            /*if(buildings.findIndex((elem)=>elem.name=="ジェームズウェッブ宇宙望遠鏡")==-1 && units.findIndex((elem)=>elem.str=="ジェームズウェッブ宇宙望遠鏡")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化500]効果：全ての惑星の情報がわかる。<input type="button" value="ジェームズウェッブ宇宙望遠鏡" onclick="construction(this.value,'🔭','','待機',500)" /><br>`;
                }*/
                    }
        if(level[P]>5){
                    document.querySelector("#information").innerHTML+=`遺産<br>`;
            /*if(buildings.findIndex((elem)=>elem.name=="火星植民地化")==-1 && units.findIndex((elem)=>elem.str=="火星植民地化")==-1){
        document.querySelector("#information").innerHTML+=`コスト[文化1000]効果：科学勝利<input type="button" value="火星植民地化" onclick="construction(this.value,'🌐',プレイヤー'`+P+`の科学勝利！','稼働中',1000)" /><br>`;
                }*/
                    }
            }
                    }else if((u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)!=-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<45 && Math.abs(u.y-mouse.y)<52) || (editar===true && buildMode==3)){
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
        }else if((b.status=="選択中" && b.delay==0 && (b.type=="🏘" || b.type=="🏠") && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52) || (editar===true && buildMode==0)){
        document.querySelector("#information").innerHTML=`必要[食料8]<input type="button" value="労働者" onclick="train(this.value,'⚒','',1,2,`+b.assign+`,[8,0,0])" /><br>`;
        if(level[P]==1){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資1]<input type="button" value="戦士" onclick="train(this.value,'⚔',5,1,2,`+b.assign+`,[3,1,0])" />攻撃力5<br>
        必要[食料3,物資2]<input type="button" value="投石" onclick="train(this.value,'🏹',4,2,2,`+b.assign+`,[3,2,0])" />攻撃力4射程2<br>`;
            }else if(level[P]==2){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資3]<input type="button" value="槍兵" onclick="train(this.value,'⚔',9,1,2,`+b.assign+`,[3,3,0])" />攻撃力9<br>
        必要[食料4,物資9]<input type="button" value="重装歩兵" onclick="train(this.value,'⚔',11,1,2,`+b.assign+`,[4,9,0])" />攻撃力11<br>`;
            if(hasTech("畜産")){
        document.querySelector("#information").innerHTML+=`必要[食料10,物資18]<input type="button" value="戦車弓兵" onclick="train(this.value,'🐴🏹',8,2,3,`+b.assign+`,[10,18,0])" />攻撃力8移動力3射程2<br>
        必要[食料10,物資6]<input type="button" value="騎兵" onclick="train(this.value,'🐴⚔',9,1,3,`+b.assign+`,[10,6,0])" />攻撃力9移動力3<br>`;
            }
        if(hasTech("算術")){
        document.querySelector("#information").innerHTML+=`必要[食料3,物資7]<input type="button" value="弓兵" onclick="train(this.value,'🏹',8,2,2,`+b.assign+`,[3,7,0])" />攻撃力8射程2<br>`;
            }
            }else if(level[P]==3){
        document.querySelector("#information").innerHTML+=`
        必要[食料6,物資7]<input type="button" value="長槍兵" onclick="train(this.value,'⚔',12,1,2,`+b.assign+`,[6,7,0])" />攻撃力12<br>
        必要[食料8,物資10]<input type="button" value="剣士" onclick="train(this.value,'⚔',18,1,2,`+b.assign+`,[8,10,0])" />攻撃力18<br>`;
            if(hasTech("工学")){
        document.querySelector("#information").innerHTML+=`必要[食料6,物資8]<input type="button" value="弩兵" onclick="train(this.value,'🏹',17,2,2,`+b.assign+`,[6,8,0])" />攻撃力17射程2<br>`;
                }
        document.querySelector("#information").innerHTML+=`必要[食料13,物資14]<input type="button" value="騎士" onclick="train(this.value,'🐴⚔',21,1,3,`+b.assign+`,[13,14,0])" />攻撃力21移動力3<br>`;
            if(hasTech("火薬")){
        document.querySelector("#information").innerHTML+=`必要[食料10,物資12]<input type="button" value="戦列歩兵" onclick="train(this.value,'🔫⚔',24,2,1,`+b.assign+`,[10,8,0])" />攻撃力24射程2移動力1<br>`;
                if(hasTech("力学")){
        document.querySelector("#information").innerHTML+=`必要[食料7,物資32]<input type="button" value="野戦砲" onclick="train(this.value,'💣',22,3,1,`+b.assign+`,[7,32,0])" />攻撃力22射程3移動力1<br>`;
                    }
            }
            }else if(level[P]==4){
        document.querySelector("#information").innerHTML+=`
        必要[食料24,物資28]<input type="button" value="歩兵" onclick="train(this.value,'🔫',32,2,2,`+b.assign+`,[24,28,0])" />攻撃力32<br>`;
            if(hasTech("エンジン")){
        document.querySelector("#information").innerHTML+=`必要[食料24,物資50,部品2]<input type="button" value="自動車化歩兵" onclick="train(this.value,'🔫🚛',32,1,4,`+b.assign+`,[24,50,2])" />攻撃力32移動力4<br>
        必要[食料16,物資75,部品10]<input type="button" value="歩兵戦車" onclick="train(this.value,'🚛⚔',50,1,4,`+b.assign+`,[16,75,10])" />攻撃力50移動力4<br>`;
                }
            if(hasTech("弾道学")){
        document.querySelector("#information").innerHTML+=`必要[食料16,物資45,部品5]<input type="button" value="榴弾砲" onclick="train(this.value,'🧨',28,4,2,`+b.assign+`,[16,45,5])" />攻撃力28射程4<br>`;
                }
            }else if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[食料32,物資30,部品8]<input type="button" value="機械化歩兵" onclick="train(this.value,'🔫🚗',65,1,4,`+b.assign+`,[32,30,8])" />攻撃力65移動力4<br>`;
            if(hasTech("プラスチック")){
        document.querySelector("#information").innerHTML+=`必要[食料32,物資45,部品12]<input type="button" value="特殊部隊" onclick="train(this.value,'🔫✩',72,1,2,`+b.assign+`,[32,45,12])" />攻撃力72<br>`;
            }
        document.querySelector("#information").innerHTML+=`必要[食料24,物資90,部品25]<input type="button" value="主力戦車" onclick="train(this.value,'🚗⚔',95,1,5,`+b.assign+`,[24,90,25])" />攻撃力95移動力5<br>`;
            if(hasTech("液体推進剤")){
        document.querySelector("#information").innerHTML+=`必要[食料24,物資80,部品20]<input type="button" value="地対空ミサイルランチャー" onclick="train(this.value,'🚗🚀',75,5,4,`+b.assign+`,[24,80,20])" />攻撃力75射程5移動力4飛行機を迎撃し、ミサイルを破壊する。<br>`;
                }
            if(hasTech("戦闘用ドローン")){
        document.querySelector("#information").innerHTML+=`必要[物資15,部品35]<input type="button" value="戦闘用ドローン" onclick="train(this.value,'🛩⚔',55,4,2,`+b.assign+`,[0,15,35])" />攻撃力55射程4<br>`;
            }
            }else if(level[P]>=6){
        document.querySelector("#information").innerHTML+=`
        必要[物資20,部品45]<input type="button" value="戦闘用アンドロイド" onclick="train(this.value,'🔫🤖',150,1,5,`+b.assign+`,[0,20,45])" />攻撃力150移動力5<br>`;
            if(hasTech("ホバリング")){
        document.querySelector("#information").innerHTML+=`必要[食料30,物資100,部品45]<input type="button" value="ホバー戦車" onclick="train(this.value,'🚗🛰',225,1,6,`+b.assign+`,[30,100,30])" />攻撃力225移動力6<br>`;
                }
            if(hasTech("量子工学")){
        document.querySelector("#information").innerHTML+=`必要[食料30,物資95,部品160]<input type="button" value="レーザーキャノン" onclick="train(this.value,'☄',325,6,3,`+b.assign+`,[30,95,160])" />攻撃力325射程6移動力3<br>`;
                }
            }
        }else if(b.status=="選択中" && (b.type=="🛬") && b.delay==0 && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        if(level[P]==4){
        document.querySelector("#information").innerHTML+=`
        必要[物資35,部品2]<input type="button" value="三葉戦闘機" onclick="train(this.value,'🛩',24,6,4,`+b.assign+`,[0,35,2])" />攻撃力24射程6<br>`;
            if(hasTech("レーダー")){
        document.querySelector("#information").innerHTML+=`必要[物資50,部品5]<input type="button" value="戦闘機" onclick="train(this.value,'🛩',37,7,5,`+b.assign+`,[0,50,5])" />攻撃力37射程7<br>`;
                }
            if(hasTech("ダイナマイト")){
        document.querySelector("#information").innerHTML+=`必要[物資65,部品5]<input type="button" value="爆撃機" onclick="train(this.value,'🛩',36,8,6,`+b.assign+`,[0,65,5])" />攻撃力36射程8<br>
        必要[物資80,部品25]<input type="button" value="戦略爆撃機" onclick="train(this.value,'🛩',50,9,6,`+b.assign+`,[0,80,25])" />攻撃力50射程9<br>`;
                }
            }
        if(level[P]==5){
            if(hasTech("情報通信")){
        document.querySelector("#information").innerHTML+=`
        必要[物資30,部品24]<input type="button" value="攻撃ヘリ" onclick="train(this.value,'🛩',65,10,5,`+b.assign+`,[0,30,24])" />攻撃力65射程10<br>`;
                }
        document.querySelector("#information").innerHTML+=`必要[物資75,部品32]<input type="button" value="ジェット戦闘機" onclick="train(this.value,'✈',80,12,7,`+b.assign+`,[0,75,32])" />攻撃力80射程12<br>`;
            }
        if(level[P]>5){
        document.querySelector("#information").innerHTML+=`
        必要[物資25,部品100]<input type="button" value="ステルス爆撃機" onclick="train(this.value,'✈',135,100,10,`+b.assign+`,[0,25,100])" />攻撃力135<br>`;
            }
        }else if(b.status=="選択中" && (b.type=="🚀") && b.delay==0 && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[部品35]<input type="button" value="巡航ミサイル" onclick="train(this.value,'🚀',130,12,8,`+b.assign+`,[0,0,35])" />攻撃力130射程12<br>
        必要[部品70]<input type="button" value="大陸間弾道ミサイル" onclick="train(this.value,'🚀',160,24,8,`+b.assign+`,[0,0,70])" />攻撃力160射程24<br>`;
            if(hasTech("核分裂反応")){
        document.querySelector("#information").innerHTML+=`必要[部品200]<input type="button" value="核弾頭搭載ICBM" onclick="train(this.value,'🚀',300,24,8,`+b.assign+`,[0,0,200])" />攻撃力300射程24<br>
        必要[部品300]<input type="button" value="核融合弾頭搭載ICBM" onclick="train(this.value,'🚀',500,24,8,`+b.assign+`,[0,0,300])" />攻撃力500射程24<br>`;
                }
            }
        if(level[P]>5){
        document.querySelector("#information").innerHTML+=`
        必要[部品112]<input type="button" value="戦術核ミサイル" onclick="train(this.value,'🚀',300,36,8,`+b.assign+`,[0,0,112])" />攻撃力300射程36<br>
        必要[部品500]<input type="button" value="反物質爆弾" onclick="train(this.value,'🚀',1000,100,8,`+b.assign+`,[0,0,500])" />攻撃力1000射程100<br>
        必要[部品800]<input type="button" value="地球破壊爆弾" onclick="train(this.value,'🚀',2400,100,8,`+b.assign+`,[0,0,800])" />攻撃力2400射程100<br>`;
            }
        }else if(b.status=="選択中" && (b.type=="⚖") && b.delay==0 && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        let amount=10;
        if(buildings.findIndex((elem)=>elem.name=="タージ・マハル" && elem.owner==P)!=-1){
            amount+=amount;
        }
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        犠牲[1つ分の食糧の生産]<input type="button" value="食糧+${amount}" onclick="trade('foodPt','food',${b.owner},${amount})" /><br>
        犠牲[1つ分の物資の生産]<input type="button" value="物資+${amount}" onclick="trade('bRPt','basicResources',${b.owner},${amount})" /><br>
        犠牲[1つ分の部品の生産]<input type="button" value="部品+${amount}" onclick="trade('partsPt','parts',${b.owner},${amount})" />
        `;
        }else if(b.status=="選択中" && (b.type=="🥚") && b.delay==0 && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[なし]攻撃力8,射程3<input type="button" value="炎のドラゴン" onclick="train(this.value,'🛩',8,3,4,`+b.assign+`,[0,0,0])" />
        必要[食糧100]攻撃力12,射程3<input type="button" value="闇のドラゴン" onclick="train(this.value,'🛩',12,3,4,`+b.assign+`,[100,0,0])" />
        必要[食糧150]攻撃力16,射程6<input type="button" value="光のドラゴン" onclick="train(this.value,'🛩',16,6,4,`+b.assign+`,[150,0,0])" />`;
        }else if(b.status=="選択中" && (b.type=="🏰") && b.delay==0 && Math.abs(b.x-mouse.x)<45 && Math.abs(b.y-mouse.y)<52){
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
    parts=[1000,1000];
    startLevel(lv);
}
function startLevel(lv){
    level=[lv,lv];
    for(const b of buildings){
        b.level=lv;
    }
    for(let k=0; k<players.length;++k){
    if(lv>1){
        discovered("狩り",k);
        discovered("火おこし",k);
        discovered("埋葬",k);
        discovered("農業",k);
        discovered("冶金",k);
        discovery("文字",k);
        discovery("畜産",k);
    }
    if(lv>2){
        discovered("文字",k);
        discovered("畜産",k);
        discovered("車輪",k);
        discovered("哲学",k);
        discovered("算術",k);
        discovered("政府",k);
        discovery("工学",k);
    }
    if(lv>3){
        discovered("工学",k);
        discovered("火薬",k);
        discovered("印刷技術",k);
        discovered("経済学",k);
        discovered("力学",k);
        discovery("蒸気機関",k);
        discovery("化学肥料",k);
    }
    if(lv>4){
        discovered("蒸気機関",k);
        discovered("電子工学",k);
        discovered("化学肥料",k);
        discovered("エンジン",k);
        discovered("軍事学",k);
        discovered("ダイナマイト",k);
        discovered("飛行機",k);
        discovered("レーダー",k);
        discovered("弾道学",k);
        discovery("情報通信",k);
        discovery("プラスチック",k);
    }
    if(lv>5){
        discovered("情報通信",k);
        discovered("マスメディア",k);
        discovered("プラスチック",k);
        discovered("ロボティクス",k);
        discovered("液体推進剤",k);
        discovered("人工衛星",k);
        discovered("核分裂反応",k);
        discovery("宇宙旅行",k);
        discovery("ホバリング",k);
        discovery("量子工学",k);
    }
    if(lv>6){
        discovered("宇宙旅行",k);
        discovered("ホバリング",k);
        discovered("量子工学",k);
        discovered("シンギュラリティ",k);
    }
    }
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
function transport(planet,a){
    if(spaceAge===false){
    writeHistory(`人類は初めて外惑星への有人飛行に成功した！${players[P].name}の国は科学の集大成とも言える偉業を成し遂げたのである。<br>この宇宙に資源は無尽蔵にある。この狭い星の限られた資源に縛られないよう、宇宙の植民地化に専念しよう！`);
    spaceAge=true;
    }
    let basement=buildings.findIndex((e)=>e.assign==a);
    buildings[basement].delay=1;
    if(parts[P]>=500){
    let index=units.findIndex((e)=>e.planet==planet && e.assign==a);
    let arrival="";
    while(arrival=="" || planets[arrival].name==planet){
        arrival=Math.round(Math.random()*(planets.length-1));
    }
    let min=tiles.findIndex((e)=>e.planet==planets[arrival].name)+1;
    let assign=-1;
    let loop=0;
    while(assign==-1 || buildings.findIndex((e)=>e.assign==assign && e.owner!=P)!=-1 || units.findIndex((e)=>e.assign==assign)!=-1 || tiles[assign].type=="Water"){
        loop++;
        assign=Math.round(Math.random()*planets[arrival].tiles+min);
        if(loop>5000){
            return;
        }
    }
    units[index].planet=planets[arrival].name;
    units[index].assign=assign;
    units[index].x=tiles[units[index].assign].centroid.x;
    units[index].y=tiles[units[index].assign].centroid.y;
        parts[P]-=500;
        if(players[P].discoveredPlanets.indexOf(planets[arrival].name)==-1){
            players[P].discoveredPlanets.push(planets[arrival].name);
            writeHistory(`${players[P].name}が初めて${planets[arrival].name}に到達！着陸点${units[index].assign.toString(16)}`);
        }
    }
}
function transportLocation(a,arrival){
    let basement=buildings.findIndex((e)=>e.assign==a);
    buildings[basement].delay=1;
    if(parts[P]>=50){
    arrival=planets.findIndex((e)=>e.name==arrival);
    let index=units.findIndex((e)=>e.assign==a);
    if(arrival==units[index].planet){
        return;
    }
    let min=tiles.findIndex((e)=>e.planet==planets[arrival].name)+1;
    let assign=-1;
    let loop=0;
    while(assign==-1 || buildings.findIndex((e)=>e.assign==assign && e.owner!=P)!=-1 || units.findIndex((e)=>e.assign==assign)!=-1 || tiles[assign].type=="Water"){
        loop++;
        assign=Math.round(Math.random()*planets[arrival].tiles+min);
        if(loop>5000){
            return;
        }
    }
    units[index].planet=planets[arrival].name;
    units[index].assign=assign;
    units[index].x=tiles[units[index].assign].centroid.x;
    units[index].y=tiles[units[index].assign].centroid.y;
        parts[P]-=50;
    }
}
function stringTiles(){
    let res="[";
    for(let k=0; k<tiles.length; ++k){
        res+=`{id:${tiles[k].id},hexX:${tiles[k].hexX},hexY:${tiles[k].hexY},planet:"${tiles[k].planet}",status:"${tiles[k].status}",type:"${tiles[k].type}",centroid:{x:${tiles[k].centroid.x},y:${tiles[k].centroid.y}}}`;
        if(k+1<tiles.length){
            res+=",";
        }
    }
    res+="]";
    return res;
}
function stringBuildings(){
    let res="[";
    for(let k=0; k<buildings.length; ++k){
        if(Number.isInteger(buildings[k].str)){
        res+=`{name:"${buildings[k].name}",type:"${buildings[k].type}",color:"${buildings[k].color}",hp:${buildings[k].hp},delay:${buildings[k].delay},owner:${buildings[k].owner},str:${buildings[k].str},assign:${buildings[k].assign},x:${buildings[k].x},y:${buildings[k].y},planet:"${buildings[k].planet}",status:"${buildings[k].status}",level:${buildings[k].level}}`;
            }else{
            res+=`{name:"${buildings[k].name}",type:"${buildings[k].type}",color:"${buildings[k].color}",hp:${buildings[k].hp},owner:${buildings[k].owner},delay:${buildings[k].delay},str:"${buildings[k].str}",assign:${buildings[k].assign},x:${buildings[k].x},y:${buildings[k].y},planet:"${buildings[k].planet}",status:"${buildings[k].status}",level:${buildings[k].level}}`;
            }
        if(k+1<buildings.length){
            res+=",";
        }
    }
    res+="]";
    return res;
}
function stringUnits(){
    let res="[";
    for(let k=0; k<units.length; ++k){
        if(units[k].name=="労働者"){
            if(units[k].status!="建設中" && units[k].status!="強化中"){
        res+=`{name:"${units[k].name}",type:"${units[k].type}",color:"${units[k].color}",hp:0,owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",status:"${units[k].status}",seed:${units[k].seed},fly:${units[k].fly},mp:${units[k].mp},move:${units[k].move},range:${units[k].range}}`;
            }else if(units[k].status=="建設中"){
                let str=units[k].b[2];
                if(Number.isInteger(str)===true){
                res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}",${str},"${units[k].b[3]}",${units[k].b[4]}],color:"${units[k].color}",hp:${units[k].hp},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},fly:${units[k].fly},status:"${units[k].status}",mp:${units[k].mp},move:${units[k].move},range:${units[k].range}}`;
                    }else{
                    res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}","${str}","${units[k].b[3]}",${units[k].b[4]}],color:"${units[k].color}",hp:${units[k].hp},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},status:"${units[k].status}",fly:${units[k].fly},mp:${units[k].mp},move:${units[k].move},range:${units[k].range}}`;
                    }
            }else if(units[k].status=="強化中"){
                let str=units[k].b[2];
                if(Number.isInteger(str)===true){
                res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}",${str},${units[k].b[3]},"${units[k].b[4]}",${units[k].b[5]}],color:"${units[k].color}",hp:${units[k].hp},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},fly:${units[k].fly},status:"${units[k].status}",mp:${units[k].mp},move:${units[k].move},range:${units[k].range}}`;
                    }else{
                    res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}","${str}",${units[k].b[3]},"${units[k].b[4]}",${units[k].b[5]}],color:"${units[k].color}",hp:${units[k].hp},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},status:"${units[k].status}",fly:${units[k].fly},mp:${units[k].mp},move:${units[k].move},range:${units[k].range}}`;
                    }
            }
            }else{
            res+=`{name:"${units[k].name}",type:"${units[k].type}",color:"${units[k].color}",hp:${units[k].hp},owner:${units[k].owner},str:${units[k].str},assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",status:"${units[k].status}",mp:${units[k].mp},seed:${units[k].seed},move:${units[k].move},fly:${units[k].fly},range:${units[k].range}}`;
            }
        if(k+1<units.length){
            res+=",";
        }
    }
    res+="]";
    return res;
}
function stringTechs(){
    let res="[";
    for(let k=0; k<techs.length; ++k){
        res+=`{name:"${techs[k].name}",description:"${techs[k].description}",progress:${techs[k].progress},assign:${techs[k].assign},require:${techs[k].require},status2:"${techs[k].status2}",x:${techs[k].x},y:${techs[k].y},status:"${techs[k].status}"}`;
        if(k+1<techs.length){
            res+=",";
        }
    }
    res+="]";
    return res;
}
function stringPlanets(){
    let res="[";
    for(let k=0; k<planets.length; ++k){
res+=`{name:"${planets[k].name}",atm:${planets[k].atm},bio:${planets[k].bio},radius:${planets[k].radius},id:${planets[k].id},tiles:${planets[k].tiles},water:${planets[k].water},size:[${planets[k].size[0]},${planets[k].size[1]}],x:${planets[k].x},y:${planets[k].y},status:"${planets[k].status}"}`;
        if(k+1<planets.length){
            res+=",";
        }
    }
    res+="]";
    return res;
}
function stringStats(){
    let res="[";
    for(let k=0; k<players.length; ++k){
        res+=`${food[k]},${basicResources[k]},${parts[k]},${culture[k]},${foodPt[k]},${bRPt[k]},${partsPt[k]},${culturePt[k]},${level[k]}`
        if(k+1<players.length){
        res+=",";
        }
    }
    res+="]";
    return res;
}
function stringOpinions(){
    let res="[";
    for(let k=0; k<opinions.length; ++k){
        res+=`{diplomacy:{warmonger:${opinions[k].diplomacy.warmonger},pacifisist:${opinions[k].diplomacy.pacifisist}},economy:{capitalism:${opinions[k].economy.capitalism},socialism:${opinions[k].economy.socialism}},policy:{democracy:${opinions[k].policy.democracy},fascism:${opinions[k].policy.fascism}},morale:${opinions[k].morale}}`
        if(k+1<opinions.length){
        res+=",";
        }
    }
    res+="]";
    return res;
}
function stringPlayers(){
    let res="[";
    for(let k=0; k<players.length; ++k){
        let discoveredPlanets="";
        for(let i=0; i<players[k].discoveredPlanets.length; ++i){
            discoveredPlanets+=`"${players[k].discoveredPlanets[i]}"`;
            if(i+1<players[k].discoveredPlanets.length){
                discoveredPlanets+=",";
            }
        }
        let war="";
        for(let i=0; i<players[k].war.length; ++i){
            war+=`"${players[k].war[i]}"`;
            if(i+1<players[k].war.length){
                war+=",";
            }
        }
        res+=`{name:"${players[k].name}",discoveredPlanets:[${discoveredPlanets}],war:[${war}]}`;
        if(k+1<players.length){
            res+=",";
        }
    }
    res+="]";
    return res;
}
function save(){
    let string="";
    string+=stringTiles();
    string+="_1_";
    string+=stringBuildings();
    string+="_2_";
    string+=stringUnits();
    string+="_3_";
    string+=stringTechs();
    string+="_4_";
    string+=stringPlanets();
    string+="_5_";
    string+=`プレイヤー${P}`;
    string+="_6_";
    string+=`ターン${turn}`;
    string+="_7_";
    string+=stringStats();
    string+="_8_";
    if(document.querySelector("#saveName").value==""){
        document.querySelector("#saveName").value=(mapPlanet[P]+Date());
        }
    string+=`セーブタイトル"${document.querySelector("#saveName").value}"`;
    string+="_9_";
    string+=stringOpinions();
    string+="_10_";
    string+=history.innerHTML;
    string+="_11_";
    string+=stringPlayers();
    string+="_12_";
    navigator.clipboard.writeText(string).then(()=>{
        console.log("コピー成功");
    },()=>{
      console.log("コピー失敗");
        alert("セーブ失敗");
      });
}
async function load(data){
    if(data!=""){
    /*let savedata=document.getElementById("saveDataFile");
    if(!data){
        fd.append('uploadfile', savedata.files[0]);
        const res=await fetch("regist.php", {method: 'POST',body:fd});
        console.log(await res);
    }*/
    newGame=false;
    tiles=eval(data.substring(0,data.indexOf("_1_")));
    buildings=eval(data.substring(data.indexOf("_1_")+3,data.indexOf("_2_")));
    units=eval(data.substring(data.indexOf("_2_")+3,data.indexOf("_3_")));
    techs=eval(data.substring(data.indexOf("_3_")+3,data.indexOf("_4_")));
    planets=eval(data.substring(data.indexOf("_4_")+3,data.indexOf("_5_")));
    P=eval(data.substring(data.indexOf("_5_")+8,data.indexOf("_6_")));
    turn=eval(data.substring(data.indexOf("_6_")+6,data.indexOf("_7_")));
    let stats=eval(data.substring(data.indexOf("_7_")+3,data.indexOf("_8_")));
    for(let k=0; k<players.length; ++k){
        food[k]=stats[9*k];
        basicResources[k]=stats[1+9*k];
        parts[k]=stats[2+9*k];
        culture[k]=stats[3+9*k];
        foodPt[k]=stats[4+9*k];
        bRPt[k]=stats[5+9*k];
        partsPt[k]=stats[6+9*k];
        culturePt[k]=stats[7+9*k];
        level[k]=stats[8+9*k];
    }
    worldName=eval(data.substring(data.indexOf("_8_")+10,data.indexOf("_9_")));
    opinions=eval(data.substring(data.indexOf("_9_")+3,data.indexOf("_10_")));
    writeHistory(data.substring(data.indexOf("_10_")+4,data.indexOf("_11_")));
    players=eval(data.substring(data.indexOf("_11_")+4,data.indexOf("_12_")));
    /*let index=buttons.findIndex((e)=>e.label=="ゲーム開始！");
    buttons[index].status="選択中";
    buttons[index].interval=3;*/
        }else{
        alert("読み込むセーブデータを貼り付けてください！");
        }
}
function mapEditar(){
    if(editar===true){
        editar=false;
    }else{
        editar=true;
    }
}
function localGameCheckbox(){ 
    if(localGame===true){
        localGame=false;
        document.querySelector(".local").innerHTML=``;
    }else{
        localGame=true;
        document.querySelector(".local").innerHTML=`
        <input type="text" id="playerName"><br>
        <input type="text" id="serverUrl" value="" /><input type="button" value="接続" onclick="websocketConnection(document.getElementById('serverUrl').value)" id="webs" />`;
    }
}
function attackSound(i){
    if(units[i].attacksound){
    eval(`${units[i].attacksound}()`);
        }else{
    /*効果音の再生*/
                    if(units[i].type=="⚔" || units[i].type=="🐴⚔"){
                        SwordAttack();
                    }else if(units[i].type=="💣" || units[i].type=="🚛⚔" || units[i].type=="🚗⚔" || units[i].type=="🚗🛰"){
                        cannon();
                    }else if(units[i].type=="🚗🚀"){
                        sam();
                    }else if(units[i].type=="🔫⚔" || units[i].type=="🔫"){
                        rifleFire();
                    }else if(units[i].type=="🧨"){
                        gunFire();
                    }else if(units[i].type=="🔫🚗" || units[i].type=="🔫✩" || units[i].type=="🔫🚛"){
                        machinegunFire();
                    }else if(units[i].type=="☄"){
                        beam();
                    }else if(units[i].type=="🧙🔥"){
                        fireball();
                    }else{
                        RangedAttack();
                    }
        }
}
function airAttackToUnits(you,enemy){
    let power=(units[you].str*(units[you].hp/100)*(Math.random()*0.5+1));
                    let powerEnemy=(units[enemy].str*(units[enemy].hp/100)*(Math.random()*0.25+1));
                    if((units[you].range<=units[enemy].range || units[enemy].name=="地対空ミサイルランチャー") && units[enemy].type!="⚒"){
                        let damageEnemy=Math.ceil(25*(powerEnemy/power));
                    units[you].hp=units[you].hp-damageEnemy;
                    popTexts.push({value:"-"+damageEnemy,x:units[you].x,y:units[you].y-25,interval:0,color:"#ff0000"});
                        }
                    if(units[enemy].type=="⚒"){
                        units[enemy].hp=units[enemy].hp-Math.ceil(Math.random()*30+20);
                        if(units[enemy].hp<0){
                            units[enemy].hp=0;
                        }
                        }else{
                        let damage=Math.ceil(25*(power/powerEnemy));
                        units[enemy].hp=units[enemy].hp-damage;
                        popTexts.push({value:"-"+damage,x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                        }
                    if(units[you].name=="三葉戦闘機" || units[you].name=="戦闘機"){
                        machinegunFire();
                        }else{
                    if(buildings.findIndex((elem)=>elem.assign==units[you].assign)!=-1){
                bomber2();
                }else{
            bomber1();
                }
                        }
    if(units[you].type!="🚀"){
    units[you].assign=units[you].assignCamp;
                    if(units[you].hp<=0){
                        deleteObject("units",units[you].assign);
                        if(you<enemy){
                            enemy--;
                        }
                        }
        }
    if(enemy!=-1 && enemy<units.length){
                    if(units[enemy].hp<=0){
                        deleteObject("units",units[enemy].assign);
                        }
    }
}
function airAttackToBuildings(you,enemyBuilding){
    let power=(units[you].str*(units[you].hp/100)*(Math.random()*0.5+1));
                    let damage=0;
                    if(units[you].name=="三葉戦闘機" || units[you].name=="戦闘機"){
                        machinegunFire();
                        }else{
                    if(buildings.findIndex((elem)=>elem.assign==units[you].assign)!=-1){
                bomber2();
                }else{
                        bomber1();
                }
                        }
                    if(units[you].name=="反物質爆弾" || units[you].name=="核融合弾頭搭載ICBM" || units[you].name=="核弾頭搭載ICBM"){
                        buildings[enemyBuilding].delay=2;
                        if(buildings[enemyBuilding].type=="🌾"){
                            foodPt[buildings[enemyBuilding].owner]-=buildings[enemyBuilding].str;
                        }else if(buildings[enemyBuilding].type=="📖"){
                            culturePt[buildings[enemyBuilding].owner]-=buildings[enemyBuilding].str;
                        }else if(buildings[enemyBuilding].type=="🏭"){
                            partsPt[buildings[enemyBuilding].owner]-=buildings[enemyBuilding].str;
                        }else if(buildings[enemyBuilding].type=="⚙"){
                            bRPt[buildings[enemyBuilding].owner]-=buildings[enemyBuilding].str;
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
                    if(units[you].type!="🚀"){
                    units[you].assign=units[you].assignCamp;
                        }
}
function explosion(seed){
    let you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,units[you].assign);
    you=units.findIndex((e)=>e.seed==seed);
    let x=tiles[units[you].assign].centroid.x;
    let y=tiles[units[you].assign].centroid.y;
    units[you].str=Math.ceil(units[you].str/2);
    airAttack(you,tilesCentroid(x,y+60*Math.sqrt(3)));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x,y-60*Math.sqrt(3)));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x+90,y+30*Math.sqrt(3)));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x+90,y-30*Math.sqrt(3)));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x-90,y+30*Math.sqrt(3)));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x-90,y-30*Math.sqrt(3)));
}
function tilesCentroid(x,y){
    return tiles.findIndex((e)=>Math.abs(e.centroid.x-x)<=1 && Math.abs(e.centroid.y-y)<=1);
}
function airAttack(you,assign){
    if(assign!=-1){
    let eu=units.findIndex((e)=>e.assign==assign && e.seed!=units[you].seed);
    let eb=buildings.findIndex((e)=>e.assign==assign);
    if(eu!=-1){
        airAttackToUnits(you,eu);
    }else if(eb!=-1){
        airAttackToBuildings(you,eb);
    }
        }
}
function writeHistory(string){
    history.innerHTML=`ターン${turn}:${string}<br>${history.innerHTML}`;
}
function isEnemy(you,enemy){
    if(enemy==100){
        return true;
    }else{
    return players[you].war.indexOf(players[enemy].name)!=-1;
        }
}
function peace(you,them){
    let index=players[you].war.indexOf(players[them].name);
    players[you].war.push("dammy");
    players[you].war.length=players[you].war.copyWithin(index,players[you].war.length-1).length-1;
    players[you].war.length=players[you].war.copyWithin(index,index+1).length-1;
    index=players[them].war.indexOf(players[you].name);
    players[them].war.push("dammy");
    players[them].war.length=players[them].war.copyWithin(index,players[them].war.length-1).length-1;
    players[them].war.length=players[them].war.copyWithin(index,index+1).length-1;
    writeHistory(`${players[you].name}と${players[them].name}の戦争が終結`);
}
function demandPeace(you,them){
    writeHistory(`${players[them].name}が平和条約を求めている<input type="button" value="署名する" onclick="signature(${you})" />`);
}
function signature(you){
    if(players[you].war.indexOf(players[P].name)!=-1){
        peace(you,P);
    }
}
function declareWar(you,them){
    players[you].war.push(players[them].name);
    players[them].war.push(players[you].name);
    writeHistory(`${players[you].name}が${players[them].name}に宣戦布告`);
}
