async function getJSON(url,arg){
const jsonData = await fetch(url);
const json = await jsonData.json();
eval(`${arg}=json`);
techList=json.techList;
effects=json.effects;
buttons=json.buttons;
discovery("石器",0);
discovery("石器",1);
discovered("石器",0);
discovered("石器",1);
translate();
}
var data=0;
getJSON("jsons/original.json","data");
const h=new hachchchctx();
var editar=false;
var hexSize=60;
var buildMode=4;
var newGame=true;
var spaceAge=false;
var selectedPlayers="";
var diplomacyButtons=document.getElementById("diplomacyButtons");
const history=document.getElementById("history");
const res=document.getElementById("result");
let kana=["ア", "イ", "ウ", "エ", "オ", "カ", "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ", "サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ", "タ", "ダ", "チ", "ヂ", "ッ", "ツ", "ヅ", "テ", "デ", "ト", "ド", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ", "マ", "ミ", "ム", "メ", "モ", "ジャ", "ヤ", "ジュ", "ユ", "ジョ","ジャ","ジュ","ジェ","ジョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ン","ー"];
let firstWord=["ニュー","ノース","サウス","ウェスト","イースト","セイント"];
let lastWord=["ブルク","グラード","ポリス"];
function generateName(){
    let result="";
    let seed=Math.round(Math.random()*3+2);
    for(let k=0; k<seed; ++k){
        let add="";
        while(add=="" || (add=="ン" && k==0) || (add=="ッ" && k==0) || (add=="ャ" && k==0) || (add=="ョ" && k==0) || (add=="ュ" && k==0) || (add=="ェ" && k==0) || (add=="ー" && k==0)){
            if(k+1<seed){
            add=kana[Math.round(Math.random()*(kana.length-1))];
            }else{
                let randomSeed=Math.round(Math.random()*7);
                if(randomSeed<=1){
            add="ア";
                }else if(randomSeed==2){
                    add="ー";
                }else if(randomSeed==3){
                    add="ド";
                }else{
                    add=kana[Math.round(Math.random()*(kana.length-1))];
                }
            }
            if(k==0){
                let randomSeed=Math.round(Math.random()*7);
                if(randomSeed==0){
                    add=firstWord[Math.round(Math.random()*(firstWord.length-1))];
                }else{
                    add=kana[Math.round(Math.random()*(kana.length-1))];
                }
            }
        }
        result+=add;
    }
    return result;
}
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
const imgNewInfantry=new Image();
imgNewInfantry.src="./Images/新式歩兵.png";
const imgMaximGun=new Image();
imgMaximGun.src="./Images/重機関銃.png";
const imgArmoredCar=new Image();
imgArmoredCar.src="./Images/装甲車.png";
const imgCuirassier=new Image();
imgCuirassier.src="./Images/胸甲騎兵.png";
const imgDragoon=new Image();
imgDragoon.src="./Images/竜騎兵.png";
const imgKnight=new Image();
imgKnight.src="./Images/騎士.png";
const imgCavalry=new Image();
imgCavalry.src="./Images/騎兵.png";
const imgBowCavalry=new Image();
imgBowCavalry.src="./Images/戦車弓兵.png";
const imgSpearman=new Image();
imgSpearman.src="./Images/槍兵.png";
const imgHoplite=new Image();
imgHoplite.src="./Images/重装歩兵.png";
const imgLightArtillery=new Image();
imgLightArtillery.src="./Images/軽火砲.png";
const imgLandingShip=new Image();
imgLandingShip.src="./Images/上陸船.png";
const imgLandingCraft=new Image();
imgLandingCraft.src="./Images/揚陸艇.png";
const imgFighter=new Image();
imgFighter.src="./Images/戦闘機.png";
const imgBomber=new Image();
imgBomber.src="./Images/爆撃機.png";
const imgTriplane=new Image();
imgTriplane.src="./Images/三葉戦闘機.png";
const imgGalley=new Image();
imgGalley.src="./Images/ガレー船.png";
const imgTrireme=new Image();
imgTrireme.src="./Images/三段櫂船.png";
const imgBattleship=new Image();
imgBattleship.src="./Images/戦艦.png";
const imgPrivateer=new Image();
imgPrivateer.src="./Images/私掠船.png";
const imgSteamboat=new Image();
imgSteamboat.src="./Images/蒸気船.png";
const imgDestroyer=new Image();
imgDestroyer.src="./Images/駆逐艦.png";
const imgCruiser=new Image();
imgCruiser.src="./Images/巡洋艦.png";
const imgSubmarine=new Image();
imgSubmarine.src="./Images/潜水艦.png";
const imgAircraftCarrior=new Image();
imgAircraftCarrior.src="./Images/航空母艦.png";
const imgSettler=new Image();
imgSettler.src="./Images/首長.png";
const playerName=document.getElementById("playerName");
var chat="";
var worldMapDisplay="なし";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let query="";
const dataSet=document.getElementById("dataSet");
const mouse = {x: null,y: null};
var buttons=data.buttons;
console.log(buttons);
var opinions=[];
var techList=data.techList;
var localGame=false;
var worldName="テイア";
var techs=[];
var tiles=[];
var units=[];
var religions=[];
var regions=[];
var mapPlanet=["テイア","テイア"];
var players=[{
    name:"プレイヤー1",
    discoveredPlanets:["テイア"],
    war:["プレイヤー2"],
    color:randomColor(255)
},{
    name:"プレイヤー2",
    discoveredPlanets:["テイア"],
    war:["プレイヤー1"],
    color:randomColor(255)
}];
var generals=[];
async function generalsJSONLoad(){
  const requestURL =
    "./jsons/generals.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const generalsJSON = await response.json();
    /*for(let k=0; k<cardsJSON.cards.length; ++k){
  cardsCreate(cardsJSON.cards[k]);
        }*/
    console.log(generalsJSON);
}
var planetNameList=["水星","金星","地球","火星","フォボス","セレス","ベスタ","オベロン","冥王星","月","ハウメア","エリス","マケマケ","エンケラドス","ケレス","グリーゼ","ケプラー","ケンタウリ","コルサント","ナブー","タトゥイーン","キャッシーク","ニビル"];
for(let k=0; k<30; ++k){
    planetNameList.push(generateName());
}
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
let planetGenerateSize=[radius*100,Math.round(radius*100/3)+50];
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
    size:[1500,550]
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
var effects=data.effects;
function hasTech(techName){
    if(techs.findIndex((e)=>e.assign==P && e.status=="発見済" && e.name==techName)!=-1){
    return true;
    }else{
    return false;
    }
}
function hasEffect(unitSeed,effectName){
    let i=units.findIndex((e)=>e.seed==unitSeed);
    if(i==-1){
        return false;
    }
    return units[i].effect.indexOf(effectName)!=-1;
}
makeRegion();
var editingRegion=regions[Math.floor(Math.random()*regions.length)][3];
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
    if(h.collisionHex(t.hexX-hexSize*1.5,t.hexY,hexSize,mouse.x,mouse.y) || (editar===true && t.id==selectedTile) || (t.status=="移動可能")){
        if(editar===false && h.collisionHex(t.hexX-hexSize*1.5,t.hexY,hexSize,mouse.x,mouse.y)){
    selectedTile=t.id;
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
    if(units.findIndex((e)=>e.owner!=P && e.assign==t.id)!=-1){
    ctx.strokeStyle="#ff0000";
    }else if((units.findIndex((e)=>e.status=="選択中" && e.assign==t.id)!=-1) || (editar===true && t.id==selectedTile)){
    ctx.strokeStyle="#0000ff";
    }else if(units.findIndex((e)=>e.status=="行動終了" && e.assign==t.id)!=-1){
    ctx.strokeStyle="#bbbbbb";
    }else if(h.collisionHex(t.hexX-90,t.hexY,60,mouse.x,mouse.y)){
    ctx.strokeStyle="#000000";
    }else if(t.status=="移動可能"){
        if(units.findIndex((e)=>e.assign==t.id)!=-1){
        ctx.strokeStyle="#bbbbbb";
        }else{
        ctx.strokeStyle="#41a1fc";
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
        if(displayMode==b.display){
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
        if(b.type!="🌾" && b.name!="鉱山" && b.name!="塹壕" && b.name!="有刺鉄線" && capitalVer2===false){
        rect(b.x,b.y-hexSize/6,hexSize,b.color);
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
        ctx.fillText(b.hp+"%",b.x,b.y+2*hexSize/3);
        }
        ctx.fill();
            }
    }
    ctx.closePath();
    ctx.fillStyle="#000000";
    /*ユニット系*/
    for(const u of units){
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
    ctx.drawImage(imgWarrior,u.x-40,u.y-40,80,80);
        skin=true;
    }
            if(u.name=="長槍兵"){
    ctx.drawImage(imgPike,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="戦列歩兵"){
    ctx.drawImage(imgLineInfantry,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="歩兵"){
    ctx.drawImage(imgInfantry,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="新式歩兵"){
    ctx.drawImage(imgNewInfantry,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="騎兵"){
    ctx.drawImage(imgCavalry,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="槍兵"){
    ctx.drawImage(imgSpearman,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="騎士"){
    ctx.drawImage(imgKnight,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="重機関銃兵"){
    ctx.drawImage(imgMaximGun,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="胸甲騎兵"){
    ctx.drawImage(imgCuirassier,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="竜騎兵"){
    ctx.drawImage(imgDragoon,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="装甲車"){
    ctx.drawImage(imgArmoredCar,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="戦車弓兵"){
    ctx.drawImage(imgBowCavalry,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="軽火砲"){
    ctx.drawImage(imgLightArtillery,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="重装歩兵"){
    ctx.drawImage(imgHoplite,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="突撃歩兵"){
    ctx.drawImage(imgMotorizedInfantry,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="榴弾砲"){
    ctx.drawImage(imgHowitzer,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="特殊部隊"){
    ctx.drawImage(imgSpecial,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="主力戦車"){
    ctx.drawImage(imgModernTank,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="歩兵戦車"){
    ctx.drawImage(imgTank,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="投石"){
    ctx.drawImage(imgBaller,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="ガレー船"){
    ctx.drawImage(imgGalley,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="戦闘機"){
    ctx.drawImage(imgFighter,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="爆撃機" || u.name=="艦上攻撃機"){
    ctx.drawImage(imgBomber,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="三葉戦闘機"){
    ctx.drawImage(imgTriplane,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="三段櫂船"){
    ctx.drawImage(imgTrireme,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="戦艦"){
    ctx.drawImage(imgBattleship,u.x-80,u.y-80,160,160);
                skin=true;
    }
            if(u.name=="私掠船"){
    ctx.drawImage(imgPrivateer,u.x-60,u.y-60,120,120);
                skin=true;
    }
            if(u.name=="蒸気船"){
    ctx.drawImage(imgSteamboat,u.x-80,u.y-80,160,160);
                skin=true;
    }
            if(u.name=="駆逐艦"){
    ctx.drawImage(imgDestroyer,u.x-80,u.y-80,160,160);
                skin=true;
    }
            if(u.name=="巡洋艦"){
    ctx.drawImage(imgCruiser,u.x-80,u.y-80,160,160);
                skin=true;
    }
            if(u.name=="航空母艦"){
    ctx.drawImage(imgAircraftCarrior,u.x-80,u.y-80,160,160);
                skin=true;
    }
            if(u.name=="潜水艦"){
    ctx.drawImage(imgSubmarine,u.x-60,u.y-60,120,120);
                skin=true;
    }
            if(u.name=="首長"){
    ctx.drawImage(imgSettler,u.x-40,u.y-40,80,80);
                skin=true;
    }
            if(u.name=="労働者"){
                skin=true;
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
            if(u.embarked){
                if(level[u.owner]<4){
    ctx.drawImage(imgLandingShip,u.x-30,u.y-30,80,80);
                }else{
    ctx.drawImage(imgLandingCraft,u.x-30,u.y-30,80,80);
                }
            skin=true;
    }
    ctx.arc(u.x,u.y,hexSize/6,0,2*Math.PI);
    if(popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-hexSize*Math.sqrt(3)/2)!=-1){
    ctx.fillStyle=popTexts[popTexts.findIndex((elem)=>u.x==elem.x && elem.y-u.y<=0 && elem.y-u.y>=-hexSize*Math.sqrt(3)/2)].color;
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
                if(u.armor>0){
                if(u.armorLevel==1){
                ctx.fillStyle="#4f2d00";
            ctx.fillRect(u.x-25,u.y-47,50,5);
                ctx.fillStyle="#fdc18b";
            ctx.fillRect(u.x-25,u.y-47,u.armor*50/u.armorMax,5);
                }
                if(u.armorLevel==2){
                ctx.fillStyle="#555555";
            ctx.fillRect(u.x-25,u.y-47,50,5);
                ctx.fillStyle="#cfcfcf";
            ctx.fillRect(u.x-25,u.y-47,u.armor*50/u.armorMax,5);
                }
                if(u.armorLevel==3){
                ctx.fillStyle="#7a7500";
            ctx.fillRect(u.x-25,u.y-47,50,5);
                ctx.fillStyle="#f1fab6";
            ctx.fillRect(u.x-25,u.y-47,u.armor*50/u.armorMax,5);
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
    ctx.fillStyle="#00dddd";
    ctx.strokeStyle="#00dddd";
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
    ctx.strokeStyle="#000000";
    requestAnimationFrame(translate);
}

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
                        discovery("バイオテクノロジー",buildings[index].owner);
                        discovery("サイバネティクス",buildings[index].owner);
                        discovery("ナノテクノロジー",buildings[index].owner);
                        discovery("核融合反応",buildings[index].owner);
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
                if(buildMode==6){
                    let r=regions[tilesRegion(t.id)][1];
                    let rd=r.slice(0,r.indexOf(t.id));
                    let dr=r.slice(r.indexOf(t.id)+1,r.length);
                    let res="[";
                    res+=rd.join();
                        res+=",";
                    res+=dr.join();
                    res+="]";
                    regions[tilesRegion(t.id)][1]=eval(res);
                    console.log(res);
                    let id=regions.findIndex((r)=>r[3]==editingRegion);
                    regions[id][1].push(t.id);
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
            if((b.label!="宇宙空間" || buildings.findIndex((e)=>e.owner==P && e.name=="宇宙基地")!=-1 || buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡" && elem.owner==P)!=-1 || players[P].discoveredPlanets.length>1) || (b.label!="政府" || hasEffect("政府"))){
            document.querySelector("#description").innerHTML="";
            b.status="選択中";
            b.interval=3;
                }
        }
    }
    for(const b of buildings){
        if(b.planet==mapPlanet[P]){
        if(b.owner==P && Math.abs(mouse.x-b.x)<hexSize*0.75 && Math.abs(mouse.y-b.y)<hexSize*Math.sqrt(3)/2 && units.findIndex((elem)=>elem.assign==b.assign)==-1){
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
        if(u.status=="待機" && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2){
            for(const U of units){
                if(U.status=="選択中"){
                U.status="待機";
                for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                U.color="#000000";
                    }
            }
    u.color="#003be3";
    u.status="選択中";
    if(!hasEffect(u.seed,"軍用航空機")){
            let pathableTile=tryPath(u.assign,selectedTile,u.move,u,true);
            //console.log(pathableTile)
                for(const t of tiles){
                    if(pathableTile.findIndex((e)=>e.indexOf(t.id)!=-1)!=-1){
                        t.status="移動可能";
                    }
                }
        }
    }else{
                if(Math.abs(mouse.x-u.x)<hexSize*0.75 && Math.abs(mouse.y-u.y)<hexSize*Math.sqrt(3)/2 && u.status=="選択中"){
                u.status="待機";
                    for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                u.color="#000000";
                    }
        }
    if(u.status=="選択中"){
        if(!hasEffect(u.seed,"軍用航空機")){
            let pathableTile=tryPath(u.assign,selectedTile,u.move,u,true);
            //console.log(pathableTile)
                for(const t of tiles){
                    if(pathableTile.findIndex((e)=>e.indexOf(t.id)!=-1)!=-1){
                        t.status="移動可能";
                    }
                }
        }
            if(selectedTile!=-1){
            if(h.collisionHex(tiles[selectedTile].hexX-hexSize*1.5,tiles[selectedTile].hexY,hexSize,mouse.x,mouse.y) && units.findIndex((elem)=>selectedTile==elem.assign && elem.owner==P)==-1){
                let range=u.range;
                if(u.embarked){
                    range=1;
                }
            if((Math.abs(u.x-tiles[selectedTile].centroid.x)<(hexSize*1.5*range+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<hexSize*Math.sqrt(3)*range+2) && u.fly===false){
                if(hasEffect(u.seed,"空母") && (units.findIndex((elem)=>selectedTile==elem.assign && isEnemy(u.owner,elem.owner))!=-1 || buildings.findIndex((elem)=>selectedTile==elem.assign && isEnemy(u.owner,elem.owner))!=-1)){
                    let str=36;
                    let name="艦上攻撃機";
                    let type="🛩";
                    let effect=['航空機','急降下爆撃'];
                    let range=8;
                    let mp=6;
                    units.push({
                        name:name,type:type,str:str,hp:100,armor:0,armorLevel:0,armorMax:0,effect:effect,range:range,
                        move:mp,mp:mp,x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,fly:false,color:"#000000",status:"哨戒",
                        assign:selectedTile,assignCamp:u.assign,owner:u.owner,planet:u.planet,
                        seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2)});
                    flight();
                    u.move=0;
                    u.status="行動終了";
                }else if(u.type!="🛩" && u.type!="✈" && u.type!="🚀" && ((hasEffect(u.seed,"ミサイルランチャー") && u.embarked) || (!hasEffect(u.seed,"ミサイルランチャー")))){
                if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner)){
                    let indexOfYourUnit=units.findIndex((e)=>e.assign==u.assign && e.owner==u.owner);
                    attackSound(indexOfYourUnit);
                    /*ダメージ計算*/
                    let enemy=units.findIndex((elem)=>elem.assign==selectedTile && elem.owner!=P);
                    let power=0;
                    if(!u.embarked){
                    power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    }else{
                    power=(u.embstr*(u.hp/100)*(Math.random()*0.5+1));
                    }
                    let powerEnemy=0;
                    if(!units[enemy].embarked){
                    powerEnemy=(units[enemy].str*(units[enemy].hp/100)*(Math.random()*0.25+1));
                    }else{
                    powerEnemy=(units[enemy].embstr*(units[enemy].hp/100)*(Math.random()*0.25+1));
                    }
                        //味方の与えるダメージ
                    let damage=Math.ceil(25*(power/powerEnemy));
                        if(hasEffect(u.seed,"機関銃") && hasEffect(units[enemy].seed,"騎兵・動物")){
                            damage=Math.round(damage*1.85);
                        }
                        if(hasEffect(u.seed,"自動小銃") && units[enemy].armor==0){
                            damage=Math.round(damage*1.2);
                        }
                        if(hasEffect(u.seed,"ドライゼ銃") && hasEffect(units[enemy].seed,"騎兵・動物")){
                            damage=Math.round(damage*1.35);
                        }
                        if(hasEffect(u.seed,"槍") && hasEffect(units[enemy].seed,"騎兵・動物")){
                            damage=Math.round(damage*1.2);
                        }
                        if(hasEffect(u.seed,"ライフル銃") && hasEffect(units[enemy].seed,"騎兵・動物")){
                            damage=Math.round(damage*1.35);
                        }
                        if(hasEffect(u.seed,"ソナー") && hasEffect(units[enemy].seed,"潜水")){
                            damage=Math.round(damage*1.50);
                        }
                        if(hasEffect(u.seed,"機関銃") && buildings.findIndex((e)=>e.assign==selectedTile)==-1){
                            damage=Math.round(damage*1.50);
                        }
                        if(hasEffect(u.seed,"機関銃") && hasEffect(units[enemy].seed,"戦車")){
                            damage=Math.round(damage*0.50);
                        }
                        if(u.range>=2 && buildings.findIndex((e)=>e.assign==selectedTile && e.name=="塹壕")!=-1 && !hasEffect(units[enemy].seed,"戦車") && !hasEffect(u.seed,"迫撃砲")){
                            damage=Math.round(damage*0.5);
                        }
                    if(units[enemy].armor==0){
                    units[enemy].hp=units[enemy].hp-damage;
                    popTexts.push({value:"-"+damage,x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                    }else{
                        let armorDamage=0;
                        if(u.embarked){
                        armorDamage=(u.embstr*u.hp/100);
                        }else{
                        armorDamage=(u.str*u.hp/100);
                        }
                        if((hasEffect(u.seed,"大砲") && units[enemy].armorLevel<=3) || (hasEffect(u.seed,"魚雷") && units[enemy].armorLevel<=3) || (hasEffect(u.seed,"剣") && units[enemy].armorLevel<=2) || (hasEffect(u.seed,"石弓") && units[enemy].armorLevel<=1) || (hasEffect(u.seed,"マスケット銃") && units[enemy].armorLevel<=1) || (hasEffect(u.seed,"ミサイル") && units[enemy].armorLevel<=3) || (hasEffect(u.seed,"魚雷") && units[enemy].armorLevel<=3) || (hasEffect(u.seed,"投石") && units[enemy].armorLevel<=2)){
                            units[enemy].hp=units[enemy].hp-Math.ceil(damage/2);
                            popTexts.push({value:"-"+damage,x:units[enemy].x,y:units[enemy].y-30,interval:0,color:"#ff0000"});
                        }
                        if(u.hp>0){
                            if(hasEffect(u.seed,"大砲")){
                                armorDamage=armorDamage*2;
                            }
                            if(hasEffect(u.seed,"急降下爆撃")){
                                armorDamage=armorDamage*2;
                            }
                            if(hasEffect(u.seed,"レールガン") && units[enemy].armorLevel<=3){
                                armorDamage=100;
                            }
                            if(hasEffect(u.seed,"マスケット銃") && units[enemy].armorLevel<=1){
                                armorDamage=100;
                            }
                            if(armorDamage<0){
                                armorDamage=0;
                            }
                        units[enemy].armor=units[enemy].armor-armorDamage;
                            }
                    if(units[enemy].armor<=0){
                    units[enemy].armor=0;
                    popTexts.push({value:"装甲破壊",x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                        }else{
                    popTexts.push({value:"-"+armorDamage,x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#4cd4f5"});
                        }
                    }
                    let erange=units[enemy].range;
                    if(units[enemy].embarked){
                        erange=1;
                    }
                    if((range<=erange && !hasEffect(u.seed,"潜水")) && units[enemy].type!="⚒"){
                    let damageEnemy=Math.ceil(25*(powerEnemy/power));
                        if(hasEffect(units[enemy].seed,"機関銃") && hasEffect(u.seed,"騎兵・動物")){
                            damageEnemy=Math.round(damageEnemy*1.85);
                        }
                        if(hasEffect(units[enemy].seed,"自動小銃") && u.armor==0){
                            damageEnemy=Math.round(damageEnemy*1.2);
                        }
                        if(hasEffect(units[enemy].seed,"ドライゼ銃") && hasEffect(u.seed,"騎兵・動物")){
                            damageEnemy=Math.round(damageEnemy*1.35);
                        }
                        if(hasEffect(units[enemy].seed,"槍") && hasEffect(u.seed,"騎兵・動物")){
                            damageEnemy=Math.round(damageEnemy*1.2);
                        }
                        if(hasEffect(units[enemy].seed,"ライフル銃") && hasEffect(u.seed,"騎兵・動物")){
                            damageEnemy=Math.round(damageEnemy*1.35);
                        }
                        if(hasEffect(units[enemy].seed,"機関銃") && buildings.findIndex((e)=>e.assign==u.assign)==-1){
                            damageEnemy=Math.round(damageEnemy*1.50);
                        }
                        if(hasEffect(u.seed,"戦車") && hasEffect(units[enemy].seed,"機関銃")){
                            damageEnemy=Math.round(damageEnemy*0.50);
                        }
                        if(units[enemy].range>=2 && buildings.findIndex((e)=>e.assign==u.assign && e.name=="塹壕")!=-1 && !hasEffect(u.seed,"戦車") && !hasEffect(units[enemy].seed,"迫撃砲")){
                            damageEnemy=Math.round(damageEnemy*0.5);
                        }
                        if(u.armor==0){
                    u.hp=u.hp-damageEnemy;
                    popTexts.push({value:"-"+damageEnemy,x:u.x,y:u.y-25,interval:0,color:"#ff0000"});
                            }else{
                            let enemyArmorDamage=0;
                            if(units[enemy].embarked){
                            enemyArmorDamage=(units[enemy].embstr*units[enemy].hp/100);
                            }else{
                            enemyArmorDamage=(units[enemy].str*units[enemy].hp/100);
                            }
                            if((hasEffect(units[enemy].seed,"大砲") && u.armorLevel<=3) || (hasEffect(units[enemy].seed,"剣") && u.armorLevel<=2) || (hasEffect(units[enemy].seed,"石弓") && u.armorLevel<=1) || (hasEffect(units[enemy].seed,"マスケット銃") && u.armorLevel<=1) || (hasEffect(units[enemy].seed,"ミサイル") && u.armorLevel<=3) || (hasEffect(units[enemy].seed,"魚雷") && u.armorLevel<=3) || (hasEffect(units[enemy].seed,"投石") && u.armorLevel<=2)){
                                u.hp=u.hp-Math.ceil(damageEnemy/2);
                    popTexts.push({value:"-"+damageEnemy,x:u.x,y:u.y-5*hexSize/12,interval:0,color:"#ff0000"});
                            }
                            if(hasEffect(units[enemy].seed,"大砲")){
                                enemyArmorDamage=enemyArmorDamage*2;
                            }
                            if(hasEffect(units[enemy].seed,"急降下爆撃")){
                                enemyArmorDamage=enemyArmorDamage*2;
                            }
                            if(hasEffect(units[enemy].seed,"レールガン") && u.armorLevel<=3){
                                enemyArmorDamage=100;
                            }
                            if(hasEffect(units[enemy].seed,"マスケット銃") && u.armorLevel<=1){
                                enemyArmorDamage=100;
                            }
                            if(enemyArmorDamage<0){
                                enemyArmorDamage=0;
                            }
                    u.armor=u.armor-enemyArmorDamage;
                    if(u.armor<=0){
                    u.armor=0;
                    popTexts.push({value:"装甲破壊",x:u.x,y:u.y-5*hexSize/12,interval:0,color:"#ff0000"});
                    }else{
                        popTexts.push({value:"-"+enemyArmorDamage,x:u.x,y:u.y-5*hexSize/12,interval:0,color:"#4cd4f5"});
                    }
                            }
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
                            train(units[enemy].name,units[enemy].type,units[enemy].str,units[enemy].range,units[enemy].mp,0,0,units[enemy].effect,units[enemy].assign,[0,0,0],u.owner,(units[enemy].hp*-1));
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
                    /*戦闘中のランダムイベント*/
                    /*if(Math.random()<0.05){
                        let rawLocation=regions[tilesRegion(u.assign)][3];
                        let location=rawLocation.replaceAll("州","");
                        writeHistory(`${rawLocation}で${u.name}部隊とその敵国の${units[enemy].name}部隊が集結し、激しい戦いが巻き起こった。劣悪な天候の中、${location}の戦いが始まった。`);
                    }*/
                    u.move=0;
                    u.status="行動終了";
                    for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                    u.color="#bbbbbb";
                        }
                    }else if(buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P  && elem.owner!=100)!=-1){
                    if(isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
                    let indexOfYourUnit=units.findIndex((e)=>e.assign==u.assign && e.owner==u.owner);
                    attackSound(indexOfYourUnit);
                    let enemyBuilding=buildings.findIndex((elem)=>elem.assign==selectedTile && elem.owner!=P && !(u.type=="🛩" || u.type=="✈"));
                    let power=0;
                    if(u.embarked){
                    power=(u.embstr*(u.hp/100)*(Math.random()*0.5+1));
                    }else{
                    power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    }
                    let damage=0;
                    if(buildings[enemyBuilding].type=="🏘"){
                        damage=Math.ceil(12.5*(power/(buildings[enemyBuilding].hp/10)));
                        }else{
                        damage=Math.ceil(25*(power/(buildings[enemyBuilding].hp/10)));
                        }
                        if(hasEffect(u.seed,"大砲")){
                            damage=Math.round(damage*1.5);
                        }
                        if(hasEffect(u.seed,"投石")){
                            damage=Math.round(damage*1.2);
                        }
                        if(hasEffect(u.seed,"絨毯爆撃")){
                            damage=Math.round(damage*1.5);
                        }
                        if(hasEffect(u.seed,"ミサイル")){
                            damage=Math.round(damage*1.5);
                        }
                        if(hasEffect(u.seed,"大量破壊兵器")){
                            damage=Math.round(damage*2);
                        }
                        if(hasEffect(u.seed,"工兵")){
                            damage=Math.round(damage*1.15);
                        }
                        buildings[enemyBuilding].hp=buildings[enemyBuilding].hp-damage;
                        if(u.range>=3 && buildings[enemyBuilding].hp<=0){
                            buildings[enemyBuilding].hp=1;
                            if(buildings[enemyBuilding].name!="首都"){
                            buildings[enemyBuilding].delay++;
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
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                    u.color="#bbbbbb";
                    }
                    }
                    }else if(hasEffect(u.seed,"ミサイルランチャー") && !u.embarked){
                    if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner)){
                    sam();
                    units.push({
                    name:"地対空ミサイルA",
                    type:"🚀",
                    effect:["ミサイル"],
                    str:75,
                    hp:100,
                    range:1,
                    move:6,
                    mp:10,
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
                        }else if(buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                        if(isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
                        sam();
                    units.push({
                    name:"地対空ミサイルA",
                    type:"🚀",
                    effect:["ミサイル"],
                    str:75,
                    hp:100,
                    range:1,
                    move:6,
                    mp:10,
                    fly:true,
                    x:u.x,
                    y:u.y,
                    color:"#000000",status:"哨戒",assign:selectedTile,
                    assignCamp:u.assign,
                    owner:u.owner,planet:u.planet,seed:Math.round(Math.random()*999999)});

                    u.move=0;
                    u.status="行動終了";
                            for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                    u.color="#bbbbbb";
                            }
                        
                    }
                    }else if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner)){
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
                }else if(buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
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
                if(((Math.abs(u.x-tiles[selectedTile].centroid.x)<(hexSize*1.5*(u.move)+hexSize/30) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(hexSize*Math.sqrt(3)*(u.move)+hexSize/30)) || (!(u.fly===false || !u.fly) && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀"))) && selectedTile!=u.assign){
                if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)==-1 && buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P && elem.owner!=100)==-1 && !(u.type=="🛩" || u.type=="✈" || u.type=="🚀")){
                    if(buildings.findIndex((elem)=>elem.assign==u.assign)!=-1){
                    if(buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].type=="🛡" && u.type!="⚒"){
                        u.str=u.str-buildings[buildings.findIndex((elem)=>elem.assign==u.assign)].str;
                        }
                        }
                    if(u.fly===false || !u.fly){
                        if(!u.embarked && !hasEffect(u.seed,"海軍")){
                    if(tiles[selectedTile].type!="Water" || u.name=="戦闘用ドローン"){
                        if(u.move==u.mp && hasEffect(u.seed,"騎兵・動物")){
                horseRun();
                }
            u.path=tryPath(u.assign,selectedTile,u.move,u);
            u.move-=u.path.length;
            u.assign=selectedTile;
            u.status="移動";
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                        }else if(u.name!="戦闘用ドローン"){
                        u.embarked=true;
                        u.move=0;
                        u.path=[u.assign,selectedTile];
                        u.assign=selectedTile;
                        u.status="移動";
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                        }
                        }
                        }else{
                            if(tiles[selectedTile].type=="Water" || u.name=="戦闘用ドローン"){
            u.path=tryPath(u.assign,selectedTile,u.move,u);
            u.move-=u.path.length;
            u.assign=selectedTile;
            u.status="移動";
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
                        }else if(u.name!="戦闘用ドローン"){
                        if(!hasEffect(u.seed,"海軍")){
                        u.embarked=false;
                        u.move=0;
                        u.path=[u.assign,selectedTile];
                        u.assign=selectedTile;
                        u.status="移動";
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                        }
                        }
                                }
                        }
                        if(Math.abs(u.x-tiles[selectedTile].centroid.x)<(90*6+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<(104*6+2) && tiles[selectedTile].type!="Water" && u.fly){
                        u.path=[u.assign,selectedTile];
                        u.assign=selectedTile;
                        u.status="移動";
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                        }
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
                        popTexts.push({value:"+"+u.str,x:units[selectedUnits].x,y:units[selectedUnits].y-5*hexSize/12,interval:0,color:"#00ee00"});
                        if(units[selectedUnits].hp>=100){
                            units[selectedUnits].hp=100;
                        }
                        u.move=0;
                        u.status="行動終了";
                        for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                            }
                        u.color="#bbbbbb";
                    }
                    }
            }
                }
    }
    }
    }
});
function setup(){
let loop=0;
let seed1=Math.round(Math.random()*planets[0].tiles);
let seed2=Math.round(Math.random()*planets[0].tiles);
while(tiles[seed1].type=="Water"){
    seed1=Math.round(Math.random()*planets[0].tiles);
}
while(tiles[seed2].type=="Water"){
    seed2=Math.round(Math.random()*planets[0].tiles);
}
let randomCity=[seed1,seed2];
units.push({name:"首長",type:"⚔",str:8,hp:100,range:1,move:2,armorMax:0,effect:["剣","歩兵"],mp:2,fly:false,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],owner:0,planet:"テイア",armor:0,armorLevel:0,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:4});
buildings.push({name:"首都",type:"🏘",str:generateName(),hp:100,delay:0,x:tiles[randomCity[0]].centroid.x,y:tiles[randomCity[0]].centroid.y,color:"#000000",status:"待機",assign:randomCity[0],level:1,owner:0,planet:"テイア"});
buildings.push({name:"首都",type:"🏘",str:generateName(),hp:100,delay:0,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1,planet:"テイア"});
while((Math.abs(buildings[0].x-buildings[1].x)<500 && Math.abs(buildings[0].y-buildings[1].y)<500) || tiles[randomCity[1]].type=="Water"){
    deleteObject("buildings",parseInt(randomCity[1]),true);
    randomCity=[randomCity[0],Math.round(Math.random()*planets[0].tiles)];
buildings.push({name:"首都",type:"🏘",str:generateName(),hp:100,delay:0,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],level:1,owner:1,planet:"テイア"});
    loop++;
    if(loop>100){
        break;
    }
    }
units.push({name:"首長",type:"⚔",str:8,effect:["剣","歩兵"],hp:100,range:1,move:2,mp:2,fly:false,x:tiles[randomCity[1]].centroid.x,y:tiles[randomCity[1]].centroid.y,color:"#000000",status:"待機",assign:randomCity[1],owner:1,planet:"テイア",armor:0,armorLevel:0,armorMax:0,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:4});
}
setup();
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
    for(const t of tiles){
        if(t.status=="移動可能"){
            t.status="待機";
        }
    }
    for(const u of units){
        if(u.embarked){
        u.move=3;
        }else{
        u.move=u.mp;
        }
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
                console.log(u.b);
                if(u.b[0]=="農場"){
                foodPt[u.b[4]]+=u.b[2];
                }else if(u.b[0]=="穀倉地帯"){
                foodPt[u.b[4]]+=u.b[2];
                }else if(u.b[0]=="食品研究所"){
                foodPt[u.b[4]]+=u.b[2];
                }else if(u.b[1]=="⚙"){
                bRPt[u.b[4]]+=u.b[2];
                }else if(u.b[1]=="📖"){
                culturePt[u.b[4]]+=u.b[2];
                }else if(u.b[1]=="🏭"){
                partsPt[u.b[4]]+=u.b[2];
                }
                if(u.b[0]=="都市"){
                    writeHistory(`新たな都市が開拓され、${regions[tilesRegion(u.assign)][3]}が${players[u.b[4]].name}の領土に加わった。`);
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
                if(u.b[0]=="農場"){
                foodPt[u.b[5]]+=u.b[2];
                }else if(u.b[0]=="穀倉地帯"){
                    foodPt[u.b[5]]+=u.b[2];
                }else if(u.b[0]=="食品研究所"){
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
                if(b.name=="農場"){
                            foodPt[b.owner]+=b.str;
                        }else if(b.name=="穀倉地帯"){
                    foodPt[b.owner]+=b.str;
                    }else if(b.name=="食品研究所"){
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
    for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
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
function train(name,type,str,range,mp,armor,armorLevel,effect,assign,resources,instantOwner,instantHp,planet){
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
            units.push({name:name,type:type,str:str,hp:0,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,fly:false,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2)});
            }else{
    units.push({name:name,type:type,str:str,hp:100,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,fly:false,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2)});
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
            units.push({name:name,type:type,str:str,hp:0,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,fly:false,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2)});
            }else{
    units.push({name:name,type:type,str:str,hp:instantHp,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,fly:false,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2)});
            }
        }
}
function upgrade(assign,cultureCost){
    for(const t of tiles){
                        if(t.status="移動可能"){
                            t.status="待機";
                        }
                    }
    if(cultureCost<=culture[P]){
    for(const u of units){
        if(u.assign==assign){
            BuildUp();
            let upgradeOn=buildings.findIndex((elem)=>elem.assign==assign);
            u.str=buildings[upgradeOn].name+"レベル"+(buildings[upgradeOn].level+1);
            let uStr=Math.round(buildings[upgradeOn].str*1.25)+1;
            if(buildings[upgradeOn].str==""){
                uStr="";
                }
            if(buildings[upgradeOn].type=="🏘" || buildings[upgradeOn].type=="🏠"){
                uStr=buildings[upgradeOn].str;
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
        while(assign==-1 || units.findIndex((elem)=>elem.assign==assign)!=-1 || buildings.findIndex((elem)=>elem.assign==assign)!=-1 || tiles[assign].type=="Water" || assign>planets[0].tiles){
            assign=Math.round(Math.random()*(planets[0].tiles-1));
            whileloop++;
            if(whileloop>10000){
                assign=10000;
                console.log("数が多すぎます！");
            }
        }
        if(assign!=10000){
        if(seed>66){
            train("熊","🐾",9,1,2,0,0,["騎兵・動物"],assign,[0,0,0],100);
        }else if(seed>33){
            train("鹿","🐾",3,1,2,0,0,["騎兵・動物"],assign,[0,0,0],100);
        }else{
            train("狼","🐾",5,1,2,0,0,["騎兵・動物"],assign,[0,0,0],100);
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
    writeHistory(regions[tilesRegion(buildings[index].assign)][3]+"の"+buildings[index].name+"が破壊された。");
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
    if(buildings.findIndex((e)=>e.assign==u.assign && e.delay==0 && e.name=="宇宙基地")!=-1 && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2){
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
    }else if((u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)==-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2) || (editar===true && buildMode==1)){
        if(!u.embarked){
        if(territory(tilesRegion(u.assign))==u.owner){
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
        if(hasTech("畜産")){
            document.querySelector("#information").innerHTML+=`<input type="button" value="厩舎" onclick="construction(this.value,'🐴','','待機')" />`;
        }
        if(hasTech("哲学")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="大学" onclick="construction(this.value,'📖',2,'稼働中')" />`;
            }
        document.querySelector("#information").innerHTML+=`<input type="button" value="城塞" onclick="construction(this.value,'🛡',12,'稼働中')" />`;
            }
        }
        if(hasTech("政府")){
            if(!isCivilizedRegion(tilesRegion(u.assign))){
        document.querySelector("#information").innerHTML=`<input type="button" value="都市" onclick="construction(this.value,'🏠','${generateName()}','待機')" />`;
                }
            }
        if(territory(tilesRegion(u.assign))==u.owner){
            if(level[P]>1){
        document.querySelector("#information").innerHTML+="<br>";
            }
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
        document.querySelector("#information").innerHTML+=`<input type="button" value="スタジアム" onclick="construction(this.value,'📖',7,'稼働中')" />`;
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
        document.querySelector("#information").innerHTML+=`<input type="button" value="放送塔" onclick="construction(this.value,'📖',12,'稼働中')" />`;
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
        document.querySelector("#information").innerHTML+=`<input type="button" value="反重力フィールド" onclick="construction(this.value,'🛡',100,'栽培中')" />`;
                        }
                    if(hasTech("バイオテクノロジー")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="食品研究所" onclick="construction(this.value,'🌾',18,'栽培中')" />`;
        document.querySelector("#information").innerHTML+=`<input type="button" value="遺伝子研究所" onclick="construction(this.value,'❤',33,'栽培中')" />`;
        }
                    if(hasTech("ナノテクノロジー")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="物質工場" onclick="construction(this.value,'⚙',20,'栽培中')" />`;
        }
                    if(hasTech("核融合反応")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="核融合発電所" onclick="construction(this.value,'🏭',23,'栽培中')" />`;
        }
                    if(hasTech("サイバネティクス")){
        document.querySelector("#information").innerHTML+=`<input type="button" value="データファーム" onclick="construction(this.value,'📖',32,'栽培中')" />`;
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
            }
            }else{
            if(nearLand(u.seed)){
                if(level[P]>=2){
            document.querySelector("#information").innerHTML=`<input type="button" value="湾港" onclick="construction(this.value,'⚓','','待機')" />`;
                    }
                }
            }
                    }else if((u.type=="⚒" && buildings.findIndex((elem)=>elem.assign==u.assign)!=-1 && u.status=="選択中" && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2) || (editar===true && buildMode==3)){
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
        let upgradeText=`コスト[文化`+cost+`]<input type="button" value="アップグレード" onclick="upgrade(`+u.assign+`,`+cost+`)" /><br>`;
        if(buildings[assignning].owner==100){
            upgradeText="";
        }
                    document.querySelector("#information").innerHTML=`${upgradeText}<br><input type="button" value="破壊" onclick="deleteObject('buildings',${u.assign},true);" /><br><input type="button" value="解雇" onclick="deleteObject('units',${u.assign}); food[P]=food[P]+3" /><br>`;
            }
                    }else if(u.status=="選択中" && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        let e="<hr>";
        for(let k=0; k<u.effect.length; ++k){
            let effectId=effects.findIndex((elem)=>elem.name==u.effect[k]);
            if(effectId!=-1){
            e+=`${u.effect[k]}<br>${effects[effectId].note}<br>${effects[effectId].description}<hr>`;
                }
        }
                document.querySelector("#information").innerHTML=`${u.name}<br>体力${u.hp}戦闘力${u.str}<br>残り移動力:${u.move}状態:${u.status}<br>能力${e}<input type="button" value="解雇" onclick="deleteObject('units',`+u.assign+`); food[P]=food[P]+3" /><br>`;
        if(hasEffect(u.seed,"工兵") && buildings.findIndex((e)=>e.assign==u.assign)==-1){
            document.querySelector("#information").innerHTML+=`<input type="button" onclick="if(units[${units.findIndex((e)=>e.seed==u.seed)}].move>0){
            buildings.push({name:'塹壕',type:'🕳️',str:'',hp:100,delay:0,x:tiles[${u.assign}].centroid.x,y:tiles[${u.assign}].centroid.y,color:'#000000',status:'待機',assign:${u.assign},level:1,owner:100,planet:'${u.planet}'});
            }
            units[${units.findIndex((e)=>e.seed==u.seed)}].status='行動終了'; units[${units.findIndex((e)=>e.seed==u.seed)}].move=0" value="塹壕を建設" /><br><input type="button" onclick="if(units[${units.findIndex((e)=>e.seed==u.seed)}].move>0){
            buildings.push({name:'有刺鉄線',type:'⛓️',str:'',hp:200,delay:0,x:tiles[${u.assign}].centroid.x,y:tiles[${u.assign}].centroid.y,color:'#000000',status:'待機',assign:${u.assign},level:5,owner:${u.owner},planet:'${u.planet}'});
            }
            units[${units.findIndex((e)=>e.seed==u.seed)}].status='行動終了'; units[${units.findIndex((e)=>e.seed==u.seed)}].move=0" value="有刺鉄線を建設" />`;
        }
        }else if((b.status=="選択中" && b.delay==0 && (b.name=="首都") && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2) || (editar===true && buildMode==0)){
        document.querySelector("#information").innerHTML=`必要[食料8]<input type="button" value="労働者" onclick="train(this.value,'⚒','',1,2,0,0,['労働者'],`+b.assign+`,[8,0,0])" /><br>`;
        if(level[P]==1){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資1]<input type="button" value="戦士" onclick="train(this.value,'⚔',5,1,2,0,0,['歩兵','剣'],`+b.assign+`,[3,1,0])" />攻撃力5<br>
        必要[食料3,物資2]<input type="button" value="投石" onclick="train(this.value,'🏹',4,2,2,0,0,['歩兵','投石'],`+b.assign+`,[3,2,0])" />攻撃力4射程2<br>`;
            }else if(level[P]==2){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資3]<input type="button" value="槍兵" onclick="train(this.value,'⚔',9,1,2,0,0,['歩兵','槍'],`+b.assign+`,[3,3,0])" />攻撃力9<br>
        必要[食料4,物資9]<input type="button" value="重装歩兵" onclick="train(this.value,'⚔',9,1,2,12,1,['歩兵','装甲','槍'],`+b.assign+`,[4,9,0])" />攻撃力9軽装甲12<br>`;
        if(hasTech("算術")){
        document.querySelector("#information").innerHTML+=`必要[食料3,物資7]<input type="button" value="弓兵" onclick="train(this.value,'🏹',8,2,2,0,0,['歩兵','弓'],`+b.assign+`,[3,7,0])" />攻撃力8射程2<br>`;
            }
            }else if(level[P]==3){
        document.querySelector("#information").innerHTML+=`
        必要[食料6,物資7]<input type="button" value="長槍兵" onclick="train(this.value,'⚔',12,1,2,10,1,['歩兵','槍'],`+b.assign+`,[6,7,0])" />攻撃力12軽装甲10<br>
        必要[食料8,物資10]<input type="button" value="剣士" onclick="train(this.value,'⚔',18,1,2,25,1,['歩兵','剣'],`+b.assign+`,[8,10,0])" />攻撃力18中装甲25<br>`;
            if(hasTech("工学")){
        document.querySelector("#information").innerHTML+=`必要[食料6,物資8]<input type="button" value="弩兵" onclick="train(this.value,'🏹',17,2,2,8,1,['歩兵','石弓'],`+b.assign+`,[6,8,0])" />攻撃力17射程2軽装甲8<br>`;
                }
            if(hasTech("火薬")){
        document.querySelector("#information").innerHTML+=`必要[食料10,物資12]<input type="button" value="戦列歩兵" onclick="train(this.value,'🔫⚔',24,2,1,0,0,['歩兵','マスケット銃'],`+b.assign+`,[10,8,0])" />攻撃力24射程2移動力1<br>`;
                if(hasTech("力学")){
        document.querySelector("#information").innerHTML+=`必要[食料7,物資32]<input type="button" value="野戦砲" onclick="train(this.value,'💣',22,3,1,0,0,['歩兵','大砲'],`+b.assign+`,[7,32,0])" />攻撃力22射程3移動力1<br>`;
                    }
            }
            }else if(level[P]==4){
        document.querySelector("#information").innerHTML+=`
        必要[食料24,物資28]<input type="button" value="歩兵" onclick="train(this.value,'🔫',32,2,2,0,0,['歩兵','ライフル銃'],`+b.assign+`,[24,28,0])" />攻撃力32<br>`;
            document.querySelector("#information").innerHTML+=`必要[食料26,物資35]<input type="button" value="新式歩兵" onclick="train(this.value,'🔫',45,2,2,0,0,['歩兵','ドライゼ銃','工兵'],`+b.assign+`,[26,35,0])" />攻撃力45<br>`;
            if(hasTech("弾道学")){
        document.querySelector("#information").innerHTML+=`必要[食料24,物資50,部品2]<input type="button" value="突撃歩兵" onclick="train(this.value,'🔫',32,1,4,0,0,['歩兵','自動小銃'],`+b.assign+`,[24,50,2])" />攻撃力32移動力4<br>`;
                }
            document.querySelector("#information").innerHTML+=`必要[食料24,物資50]<input type="button" value="重機関銃兵" onclick="train(this.value,'🔫',50,1,2,25,1,['歩兵','機関銃'],`+b.assign+`,[24,50,0])" />攻撃力50軽装甲25<br>`;
            }else if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[食料32,物資15,部品8]<input type="button" value="現代歩兵" onclick="train(this.value,'🔫',65,2,2,0,0,['歩兵','自動小銃','工兵'],`+b.assign+`,[32,15,8])" />攻撃力65射程2移動力2<br>`;
        document.querySelector("#information").innerHTML+=`
        必要[食料32,物資30,部品8]<input type="button" value="機械化歩兵" onclick="train(this.value,'🔫🚗',65,1,4,75,2,['歩兵','装甲','自動小銃'],`+b.assign+`,[32,30,8])" />攻撃力65移動力4中装甲75<br>`;
            if(hasTech("プラスチック")){
        document.querySelector("#information").innerHTML+=`必要[食料32,物資45,部品12]<input type="button" value="特殊部隊" onclick="train(this.value,'🔫✩',72,1,2,0,0,['歩兵','自動小銃','ステルス','工兵'],`+b.assign+`,[32,45,12])" />攻撃力72<br>`;
            }
            if(hasTech("戦闘用ドローン")){
        document.querySelector("#information").innerHTML+=`必要[物資5,部品20]<input type="button" value="戦闘用ドローン" onclick="train(this.value,'🛩⚔',55,1,3,10,1,['装甲','人工知能'],`+b.assign+`,[0,5,20])" />攻撃力55移動力3軽装甲10<br>`;
            }
            }else if(level[P]>=6){
        document.querySelector("#information").innerHTML+=`
        必要[物資20,部品45]<input type="button" value="戦闘用アンドロイド" onclick="train(this.value,'🔫🤖',150,1,5,200,1,['歩兵','装甲','人工知能','自動小銃'],`+b.assign+`,[0,20,45])" />攻撃力150移動力5軽装甲200<br>`;
            }
        document.querySelector("#information").innerHTML+=`<input type="text" value="${b.str}" onchange="buildings[${buildings.findIndex((e)=>e.assign==b.assign)}].str=this.value" />`
        }else if(b.status=="選択中" && (b.name=="都市") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML=`必要[食料8]<input type="button" value="労働者" onclick="train(this.value,'⚒','',1,2,0,0,['労働者'],`+b.assign+`,[8,0,0])" /><br>`;
        if(level[P]==2){
        document.querySelector("#information").innerHTML+=`
        必要[食料3,物資3]<input type="button" value="槍兵" onclick="train(this.value,'⚔',9,1,2,0,0,['歩兵','槍'],`+b.assign+`,[3,3,0])" />攻撃力9<br>`;
        if(hasTech("算術")){
        document.querySelector("#information").innerHTML+=`必要[食料3,物資7]<input type="button" value="弓兵" onclick="train(this.value,'🏹',8,2,2,0,0,['歩兵','弓'],`+b.assign+`,[3,7,0])" />攻撃力8射程2<br>`;
            }
        if(b.level>=2){
        document.querySelector("#information").innerHTML+=`必要[食料4,物資9]<input type="button" value="重装歩兵" onclick="train(this.value,'⚔',9,1,2,12,1,['歩兵','装甲','槍'],`+b.assign+`,[4,9,0])" />攻撃力9軽装甲12<br>`;
            }else{
        document.querySelector("#information").innerHTML+=`必要[都市レベル2,食料4,物資9]<input type="button" value="重装歩兵" onclick="train(this.value,'⚔',9,1,2,12,1,['歩兵','装甲','槍'],`+b.assign+`,[4,9,0])" disabled />攻撃力9軽装甲12<br>`;
            }
            }else if(level[P]==3){
        document.querySelector("#information").innerHTML+=`
        必要[食料6,物資7]<input type="button" value="長槍兵" onclick="train(this.value,'⚔',12,1,2,10,1,['歩兵','槍'],`+b.assign+`,[6,7,0])" />攻撃力12軽装甲10<br>`;
        document.querySelector("#information").innerHTML+=`必要[食料8,物資10]<input type="button" value="剣士" onclick="train(this.value,'⚔',18,1,2,25,1,['歩兵','剣'],`+b.assign+`,[8,10,0])" />攻撃力18中装甲25<br>`;
            if(hasTech("工学")){
        document.querySelector("#information").innerHTML+=`必要[食料6,物資8]<input type="button" value="弩兵" onclick="train(this.value,'🏹',17,2,2,8,1,['歩兵','石弓'],`+b.assign+`,[6,8,0])" />攻撃力17射程2軽装甲8<br>`;
                }
            if(b.level>=2){
            if(hasTech("火薬")){
        document.querySelector("#information").innerHTML+=`必要[食料10,物資12]<input type="button" value="戦列歩兵" onclick="train(this.value,'🔫⚔',24,2,1,0,0,['歩兵','マスケット銃'],`+b.assign+`,[10,8,0])" />攻撃力24射程2移動力1<br>`;
                if(hasTech("力学")){
        document.querySelector("#information").innerHTML+=`必要[食料7,物資32]<input type="button" value="野戦砲" onclick="train(this.value,'💣',22,3,1,0,0,['歩兵','大砲'],`+b.assign+`,[7,32,0])" />攻撃力22射程3移動力1<br>`;
                    }
            }
                }else{
                if(hasTech("火薬")){
        document.querySelector("#information").innerHTML+=`必要[都市レベル2,食料10,物資12]<input type="button" value="戦列歩兵" onclick="train(this.value,'🔫⚔',24,2,1,0,0,['歩兵','マスケット銃'],`+b.assign+`,[10,8,0])" disabled />攻撃力24射程2移動力1<br>`;
                if(hasTech("力学")){
        document.querySelector("#information").innerHTML+=`必要[都市レベル2,食料7,物資32]<input type="button" value="野戦砲" onclick="train(this.value,'💣',22,3,1,0,0,['歩兵','大砲'],`+b.assign+`,[7,32,0])" disabled />攻撃力22射程3移動力1<br>`;
                    }
            }
                }
            }else if(level[P]==4){
            document.querySelector("#information").innerHTML+=`
        必要[食料24,物資28]<input type="button" value="歩兵" onclick="train(this.value,'🔫',32,2,2,0,0,['歩兵','ライフル銃'],`+b.assign+`,[24,28,0])" />攻撃力32<br>`;
            if(b.level>=2){
            document.querySelector("#information").innerHTML+=`必要[食料26,物資35]<input type="button" value="新式歩兵" onclick="train(this.value,'🔫',45,2,2,0,0,['歩兵','ドライゼ銃','工兵'],`+b.assign+`,[26,35,0])" />攻撃力45<br>`;
            if(hasTech("弾道学")){
        document.querySelector("#information").innerHTML+=`必要[食料24,物資50,部品2]<input type="button" value="突撃歩兵" onclick="train(this.value,'🔫',52,1,2,0,0,['歩兵','自動小銃'],`+b.assign+`,[24,50,2])" />攻撃力52<br>`;
                }
            }else{
                document.querySelector("#information").innerHTML+=`必要[都市レベル2,食料26,物資35]<input type="button" value="新式歩兵" onclick="train(this.value,'🔫',45,2,2,0,0,['歩兵','ドライゼ銃','工兵'],`+b.assign+`,[26,35,0])" disabled />攻撃力45<br>`;
                if(hasTech("弾道学")){
        document.querySelector("#information").innerHTML+=`必要[都市レベル2,食料24,物資50,部品2]<input type="button" value="突撃歩兵" onclick="train(this.value,'🔫',52,1,2,0,0,['歩兵','自動小銃'],`+b.assign+`,[24,50,2])" disabled />攻撃力52<br>`;
                }
            }
            if(b.level>=3){
            document.querySelector("#information").innerHTML+=`必要[食料24,物資50]<input type="button" value="重機関銃兵" onclick="train(this.value,'🔫',50,1,2,25,1,['歩兵','機関銃'],`+b.assign+`,[24,50,0])" />攻撃力50軽装甲25<br>`;
            }else{
                document.querySelector("#information").innerHTML+=`必要[都市レベル3,食料24,物資50]<input type="button" value="重機関銃兵" onclick="train(this.value,'🔫',50,1,2,25,1,['歩兵','機関銃'],`+b.assign+`,[24,50,0])" disabled />攻撃力50軽装甲25<br>`;
            }
            }else if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[食料32,物資15,部品8]<input type="button" value="現代歩兵" onclick="train(this.value,'🔫',65,2,2,0,0,['歩兵','自動小銃','工兵'],`+b.assign+`,[32,15,8])" />攻撃力65射程2移動力2<br>`;
            if(b.level>=2){
        document.querySelector("#information").innerHTML+=`
        必要[食料32,物資30,部品8]<input type="button" value="機械化歩兵" onclick="train(this.value,'🔫🚗',65,1,4,75,2,['歩兵','装甲','自動小銃'],`+b.assign+`,[32,30,8])" />攻撃力65移動力4中装甲75<br>`;
            }else{
                document.querySelector("#information").innerHTML+=`
        必要[都市レベル2,食料32,物資30,部品8]<input type="button" value="機械化歩兵" onclick="train(this.value,'🔫🚗',65,1,4,75,2,['歩兵','装甲','自動小銃'],`+b.assign+`,[32,30,8])" disabled />攻撃力65移動力4中装甲75<br>`;
            }
            if(b.level>=3){
            if(hasTech("プラスチック")){
        document.querySelector("#information").innerHTML+=`必要[食料32,物資45,部品12]<input type="button" value="特殊部隊" onclick="train(this.value,'🔫✩',72,1,2,0,0,['歩兵','自動小銃','ステルス','工兵'],`+b.assign+`,[32,45,12])" />攻撃力72<br>`;
            }
            if(hasTech("戦闘用ドローン")){
        document.querySelector("#information").innerHTML+=`必要[物資5,部品20]<input type="button" value="戦闘用ドローン" onclick="train(this.value,'🛩⚔',55,1,3,10,1,['装甲','人工知能'],`+b.assign+`,[0,5,20])" />攻撃力55移動力3軽装甲10<br>`;
            }
                }else{
                if(hasTech("プラスチック")){
        document.querySelector("#information").innerHTML+=`必要[都市レベル3,食料32,物資45,部品12]<input type="button" value="特殊部隊" onclick="train(this.value,'🔫✩',72,1,2,0,0,['歩兵','自動小銃','ステルス','工兵'],`+b.assign+`,[32,45,12])" disabled />攻撃力72<br>`;
            }
            if(hasTech("戦闘用ドローン")){
        document.querySelector("#information").innerHTML+=`必要[都市レベル3,物資5,部品20]<input type="button" value="戦闘用ドローン" onclick="train(this.value,'🛩⚔',55,1,3,10,1,['装甲','人工知能'],`+b.assign+`,[0,5,20])" disabled />攻撃力55移動力3軽装甲10<br>`;
            }
                }
            }else if(level[P]>=6){
        document.querySelector("#information").innerHTML+=`
        必要[物資20,部品45]<input type="button" value="戦闘用アンドロイド" onclick="train(this.value,'🔫🤖',150,1,5,200,1,['歩兵','装甲','人工知能','自動小銃'],`+b.assign+`,[0,20,45])" />攻撃力150移動力5軽装甲200<br>`;
            }
        document.querySelector("#information").innerHTML+=`<input type="text" value="${b.str}" onchange="buildings[${buildings.findIndex((e)=>e.assign==b.assign)}].str=this.value" />`;
        }else if(b.status=="選択中" && (b.name=="工場" || b.name=="物質工場") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML="";
        if(level[P]==4){
            document.querySelector("#information").innerHTML+=`必要[食料16,物資25]<input type="button" value="軽火砲" onclick="train(this.value,'🧨',28,2,2,30,2,['歩兵','大砲'],`+b.assign+`,[16,25,0])" />攻撃力28射程2中装甲30<br>`;
            if(b.level>=2){
            if(hasTech("弾道学")){
            document.querySelector("#information").innerHTML+=`必要[食料16,物資45,部品5]<input type="button" value="榴弾砲" onclick="train(this.value,'🧨',32,3,2,90,2,['歩兵','大砲'],`+b.assign+`,[16,45,5])" />攻撃力32射程3中装甲90<br>`;
            }
            if(hasTech("エンジン")){
        document.querySelector("#information").innerHTML+=`必要[食料16,物資50,部品1]<input type="button" value="装甲車" onclick="train(this.value,'🚛⚔',40,1,4,75,3,['車両','装甲','機関銃'],`+b.assign+`,[16,50,1])" />攻撃力40移動力4重装甲75<br>`;
            }
            }else{
                if(hasTech("弾道学")){
            document.querySelector("#information").innerHTML+=`必要[工場レベル2,食料16,物資45,部品5]<input type="button" value="榴弾砲" onclick="train(this.value,'🧨',32,3,2,90,2,['歩兵','大砲'],`+b.assign+`,[16,45,5])" disabled />攻撃力32射程3中装甲90<br>`;
            }
            if(hasTech("エンジン")){
        document.querySelector("#information").innerHTML+=`必要[工場レベル2,食料16,物資50,部品1]<input type="button" value="装甲車" onclick="train(this.value,'🚛⚔',40,1,4,75,3,['車両','装甲','機関銃'],`+b.assign+`,[16,50,1])" disabled />攻撃力40移動力4重装甲75<br>`;
                }
            }
            if(b.level>=3){
            if(hasTech("エンジン")){
        document.querySelector("#information").innerHTML+=`必要[食料16,物資75,部品10]<input type="button" value="歩兵戦車" onclick="train(this.value,'🚛⚔',30,1,4,150,3,['車両','装甲','大砲','戦車'],`+b.assign+`,[16,75,10])" />攻撃力30移動力4重装甲150<br>`;
                }
            }else{
                if(hasTech("エンジン")){
        document.querySelector("#information").innerHTML+=`必要[工場レベル3,食料16,物資75,部品10]<input type="button" value="歩兵戦車" onclick="train(this.value,'🚛⚔',30,1,4,150,3,['車両','装甲','大砲','戦車'],`+b.assign+`,[16,75,10])" disabled />攻撃力30移動力4重装甲150<br>`;
                }
            }
        }
        if(level[P]==5){
            document.querySelector("#information").innerHTML+=`必要[食料24,物資90,部品25]<input type="button" value="主力戦車" onclick="train(this.value,'🚗⚔',95,1,5,180,3,['車両','装甲','大砲','戦車'],`+b.assign+`,[24,90,25])" />攻撃力95移動力5重装甲180<br>`;
            if(hasTech("液体推進剤")){
            if(b.level>=2){
        document.querySelector("#information").innerHTML+=`必要[食料24,物資80,部品20]<input type="button" value="地対空ミサイルランチャー" onclick="train(this.value,'🚗🚀',75,5,4,80,2,['歩兵','装甲','ミサイルランチャー'],`+b.assign+`,[24,80,20])" />攻撃力75射程5移動力4中装甲80、敵のミサイルを破壊する。<br>`;
                }else{
                document.querySelector("#information").innerHTML+=`必要[工場レベル2,食料24,物資80,部品20]<input type="button" value="地対空ミサイルランチャー" onclick="train(this.value,'🚗🚀',75,5,4,80,2,['歩兵','装甲','ミサイルランチャー'],`+b.assign+`,[24,80,20])" disabled />攻撃力75射程5移動力4中装甲80、敵のミサイルを破壊する。<br>`;
                }
                }
        }
        if(level[P]>=6){
            document.querySelector("#information").innerHTML+=`必要[食料24,物資80,部品20]<input type="button" value="地対空ミサイルランチャー" onclick="train(this.value,'🛰🚀',75,10,4,160,2,['歩兵','装甲','ミサイルランチャー'],`+b.assign+`,[24,80,20])" />攻撃力75射程10移動力5中装甲160、敵のミサイルを破壊する。<br>`;
            if(hasTech("ホバリング")){
                if(b.level>=2){
        document.querySelector("#information").innerHTML+=`必要[食料30,物資100,部品45]<input type="button" value="ホバー戦車" onclick="train(this.value,'🚗🛰',125,1,6,500,3,['車両','装甲','大砲','戦車'],`+b.assign+`,[30,100,30])" />攻撃力125移動力6重装甲500<br>`;
                }else{
                    document.querySelector("#information").innerHTML+=`必要[工場レベル2,食料30,物資100,部品45]<input type="button" value="ホバー戦車" onclick="train(this.value,'🚗🛰',125,1,6,500,3,['車両','装甲','大砲','戦車'],`+b.assign+`,[30,100,30])" disabled />攻撃力125移動力6重装甲500<br>`;
                }
            }
            if(hasTech("量子工学")){
                if(b.level>=3){
        document.querySelector("#information").innerHTML+=`必要[食料30,物資95,部品160]<input type="button" value="レーザーキャノン" onclick="train(this.value,'☄',125,6,3,120,2,['歩兵','装甲','レールガン'],`+b.assign+`,[30,95,160])" />攻撃力125射程6移動力3中装甲120<br>`;
                }else{
                    document.querySelector("#information").innerHTML+=`必要[工場レベル3,食料30,物資95,部品160]<input type="button" value="レーザーキャノン" onclick="train(this.value,'☄',125,6,3,120,2,['歩兵','装甲','レールガン'],`+b.assign+`,[30,95,160])" disabled />攻撃力125射程6移動力3中装甲120<br>`;
                }
            }
        }
        }else if(b.status=="選択中" && (b.name=="厩舎") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML="";
        if(b.level>=1){
            if(level[P]==2){
                if(hasTech("畜産")){
                    document.querySelector("#information").innerHTML+=`必要[食料10,物資6]<input type="button" value="騎兵" onclick="train(this.value,'🐴⚔',9,1,3,0,0,['騎兵・動物・動物','槍'],`+b.assign+`,[10,6,0])" />攻撃力9移動力3<br>`;
                }
            }
            if(level[P]==3){
                document.querySelector("#information").innerHTML+=`必要[食料10,物資7]<input type="button" value="軽騎兵" onclick="train(this.value,'🐴⚔',17,1,3,18,1,['騎兵・動物','槍'],`+b.assign+`,[10,7,0])" />攻撃力17移動力3軽装甲18<br>`;
            }
            if(level[P]==4){
            document.querySelector("#information").innerHTML+=`攻撃力32移動3<br>必要[食料32,物資10]<input type="button" value="竜騎兵" onclick="train(this.value,'🐴🔫',32,2,3,0,0,['騎兵・動物','装甲','ライフル銃'],`+b.assign+`,[32,10,0])" />`;
            }
        }
        if(b.level>=2){
            if(level[P]==2){
                if(hasTech("算術")){
                    document.querySelector("#information").innerHTML+=`必要[食料10,物資18]<input type="button" value="戦車弓兵" onclick="train(this.value,'🐴🏹',8,2,3,0,0,['騎兵・動物','弓'],`+b.assign+`,[10,18,0])" />攻撃力8移動力3射程2<br>`;
                    }
            }
            if(level[P]==3){
                document.querySelector("#information").innerHTML+=`必要[食料10,物資10]<input type="button" value="槍騎兵" onclick="train(this.value,'🐴⚔',20,1,3,25,1,['騎兵・動物','槍'],`+b.assign+`,[10,10,0])" />攻撃力20移動力3軽装甲25<br>`;
            }
        }else{
            if(level[P]==2){
                if(hasTech("算術")){
                    document.querySelector("#information").innerHTML+=`必要[厩舎レベル2,食料10,物資18]<input type="button" value="戦車弓兵" onclick="train(this.value,'🐴🏹',8,2,3,0,0,['騎兵・動物','弓'],`+b.assign+`,[10,18,0])" disabled />攻撃力8移動力3射程2<br>`;
                    }
            }
            if(level[P]==3){
                document.querySelector("#information").innerHTML+=`必要[厩舎レベル2,食料10,物資10]<input type="button" value="槍騎兵" onclick="train(this.value,'🐴⚔',20,1,3,25,1,['騎兵・動物','槍'],`+b.assign+`,[10,10,0])" disabled />攻撃力20移動力3軽装甲25<br>`;
            }
        }
        if(b.level>=3){
            if(level[P]==3){
                document.querySelector("#information").innerHTML+=`必要[食料13,物資14]<input type="button" value="騎士" onclick="train(this.value,'🐴⚔',21,1,3,34,2,['騎兵・動物','剣'],`+b.assign+`,[13,14,0])" />攻撃力21移動力3中装甲34<br>`;
            }
            if(level[P]==4){
            document.querySelector("#information").innerHTML+=`攻撃力36移動3中装甲50<br>必要[食料32,物資40]<input type="button" value="胸甲騎兵" onclick="train(this.value,'🐴⚔️',36,1,3,50,2,['騎兵・動物','装甲','剣'],`+b.assign+`,[32,40,0])" />`;
            }
        }else{
            if(level[P]==3){
                document.querySelector("#information").innerHTML+=`必要[厩舎レベル3,食料13,物資14]<input type="button" value="騎士" onclick="train(this.value,'🐴⚔',21,1,3,34,2,['騎兵・動物','剣'],`+b.assign+`,[13,14,0])" disabled />攻撃力21移動力3中装甲34<br>`;
            }
            if(level[P]==4){
            document.querySelector("#information").innerHTML+=`必要[厩舎レベル3,食料32,物資40]<input type="button" value="胸甲騎兵" onclick="train(this.value,'🐴⚔️',36,1,3,50,2,['騎兵・動物','装甲','剣'],`+b.assign+`,[32,40,0])" disabled />攻撃力36移動3中装甲50<br>`;
            }
        }
        }else if(b.status=="選択中" && (b.name=="空港") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML="";
        if(level[P]==4){
        document.querySelector("#information").innerHTML+=`
        必要[物資35,部品2]<input type="button" value="三葉戦闘機" onclick="train(this.value,'🛩',24,6,4,0,0,['航空機','偵察'],`+b.assign+`,[0,35,2])" />攻撃力24射程6<br>`;
            if(hasTech("レーダー")){
        document.querySelector("#information").innerHTML+=`必要[物資50,部品5]<input type="button" value="戦闘機" onclick="train(this.value,'🛩',37,7,5,0,0,['航空機','偵察','機関銃'],`+b.assign+`,[0,50,5])" />攻撃力37射程7<br>`;
                }
            if(hasTech("ダイナマイト")){
        document.querySelector("#information").innerHTML+=`必要[物資65,部品5]<input type="button" value="爆撃機" onclick="train(this.value,'🛩',36,8,6,0,0,['航空機','急降下爆撃'],`+b.assign+`,[0,65,5])" />攻撃力36射程8<br>`;
                if(b.level>=3){
        document.querySelector("#information").innerHTML+=`必要[物資80,部品25]<input type="button" value="戦略爆撃機" onclick="train(this.value,'🛩',50,9,6,0,0,['航空機','絨毯爆撃'],`+b.assign+`,[0,80,25])" />攻撃力50射程9<br>`;
                }else{
                    document.querySelector("#information").innerHTML+=`必要[空港レベル3,物資80,部品25]<input type="button" value="戦略爆撃機" onclick="train(this.value,'🛩',50,9,6,0,0,['航空機','絨毯爆撃'],`+b.assign+`,[0,80,25])" disabled />攻撃力50射程9<br>`;
                }
                }
            }
        if(level[P]==5){
            if(hasTech("情報通信")){
        document.querySelector("#information").innerHTML+=`
        必要[物資30,部品24]<input type="button" value="攻撃ヘリ" onclick="train(this.value,'🛩',65,10,5,0,0,['航空機','偵察','機関銃'],`+b.assign+`,[0,30,24])" />攻撃力65射程10<br>`;
                }
        if(b.level>=3){
        document.querySelector("#information").innerHTML+=`必要[物資75,部品32]<input type="button" value="ジェット戦闘機" onclick="train(this.value,'✈',80,12,7,0,0,['航空機','偵察','機関銃'],`+b.assign+`,[0,75,32])" />攻撃力80射程12<br>`;
            }else{
        document.querySelector("#information").innerHTML+=`必要[空港レベル3,物資75,部品32]<input type="button" value="ジェット戦闘機" onclick="train(this.value,'✈',80,12,7,0,0,['航空機','偵察','機関銃'],`+b.assign+`,[0,75,32])" disabled />攻撃力80射程12<br>`;
            }
            }
        if(level[P]>5){
        document.querySelector("#information").innerHTML+=`
        必要[物資25,部品100]<input type="button" value="ステルス爆撃機" onclick="train(this.value,'✈',135,100,10,0,0,['航空機','絨毯爆撃','ステルス'],`+b.assign+`,[0,25,100])" />攻撃力135<br>`;
            }
        }else if(b.status=="選択中" && (b.type=="🚀") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML="";
        if(level[P]==5){
        document.querySelector("#information").innerHTML+=`
        必要[部品50]<input type="button" value="巡航ミサイル" onclick="train(this.value,'🚀',130,12,8,0,0,['ミサイル'],`+b.assign+`,[0,0,50])" />攻撃力130射程12<br>`;
        if(b.level>=2){
        document.querySelector("#information").innerHTML+=`必要[部品70]<input type="button" value="大陸間弾道ミサイル" onclick="train(this.value,'🚀',160,24,8,0,0,['ミサイル'],`+b.assign+`,[0,0,70])" />攻撃力160射程24<br>`;
        }else{
            document.querySelector("#information").innerHTML+=`必要[ミサイルポッドレベル2,部品70]<input type="button" value="大陸間弾道ミサイル" onclick="train(this.value,'🚀',160,24,8,0,0,['ミサイル'],`+b.assign+`,[0,0,70])" disabled />攻撃力160射程24<br>`;
        }
            if(hasTech("核分裂反応")){
            if(b.level>=3){
        document.querySelector("#information").innerHTML+=`必要[部品200]<input type="button" value="核弾頭搭載ICBM" onclick="train(this.value,'🚀',300,24,8,0,0,['ミサイル','大量破壊兵器'],`+b.assign+`,[0,0,200])" />攻撃力300射程24<br>
        必要[部品300]<input type="button" value="核融合弾頭搭載ICBM" onclick="train(this.value,'🚀',500,24,8,`+b.assign+`,[0,0,300])" />攻撃力500射程24<br>`;
            }else{
            document.querySelector("#information").innerHTML+=`必要[ミサイルポッドレベル3,部品200]<input type="button" value="核弾頭搭載ICBM" onclick="train(this.value,'🚀',300,24,8,0,0,['ミサイル','大量破壊兵器'],`+b.assign+`,[0,0,200])" disabled />攻撃力300射程24<br>
        必要[ミサイルポッドレベル3,部品300]<input type="button" value="核融合弾頭搭載ICBM" onclick="train(this.value,'🚀',500,24,8,`+b.assign+`,[0,0,300])" disabled />攻撃力500射程24<br>`;
            }
                }
            }
        if(level[P]>5){
        document.querySelector("#information").innerHTML+=`必要[部品50]<input type="button" value="超音速ミサイル" onclick="train(this.value,'🚀',300,36,16,0,0,['ミサイル'],`+b.assign+`,[0,0,50])" />攻撃力100射程36<br>`;
        if(b.level>=2){
        document.querySelector("#information").innerHTML+=`
        必要[部品500]<input type="button" value="純粋水素爆弾" onclick="train(this.value,'🚀',300,36,8,0,0,['ミサイル','大量破壊兵器'],`+b.assign+`,[0,0,500])" />攻撃力300射程36<br>`;
        }else{
            document.querySelector("#information").innerHTML+=`
        必要[ミサイルポッドレベル2,部品500]<input type="button" value="純粋水素爆弾" onclick="train(this.value,'🚀',300,36,8,0,0,['ミサイル','大量破壊兵器'],`+b.assign+`,[0,0,500])" disabled />攻撃力300射程36<br>`;
        }
        if(b.level>=3){
        document.querySelector("#information").innerHTML+=`必要[部品2000]<input type="button" value="反物質爆弾" onclick="train(this.value,'🚀',1000,100,8,0,0,['ミサイル','大量破壊兵器'],`+b.assign+`,[0,0,2000])" />攻撃力1000射程100<br>`;
            }else{
        document.querySelector("#information").innerHTML+=`必要[ミサイルポッドレベル3,部品2000]<input type="button" value="反物質爆弾" onclick="train(this.value,'🚀',1000,100,8,0,0,['ミサイル','大量破壊兵器'],`+b.assign+`,[0,0,2000])" disabled />攻撃力1000射程100<br>`;
            }
        }
        }else if(b.status=="選択中" && (b.name=="湾港") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        //港
        document.querySelector("#information").innerHTML="";
        if(level[P]==2){
            document.querySelector("#information").innerHTML+=`必要[食料8,物資18]<input type="button" value="三段櫂船" onclick="train(this.value,'⛵️',12,2,3,0,0,['海軍','弓'],`+b.assign+`,[8,18,0])" />攻撃力12射程2移動3<br>`;
        }
        if(level[P]==3){
            document.querySelector("#information").innerHTML+=`必要[食料10,物資18]<input type="button" value="ガレー船" onclick="train(this.value,'⛵️',18,2,3,0,0,['海軍','弓'],`+b.assign+`,[10,18,0])" />攻撃力18射程2移動3<br>`;
            if(b.level>=2){
            document.querySelector("#information").innerHTML+=`必要[食料20,物資32]<input type="button" value="私掠船" onclick="train(this.value,'⛵️',26,2,3,0,0,['海軍','大砲'],`+b.assign+`,[20,32,0])" />攻撃力26射程2移動3<br>`;
            }else{
            document.querySelector("#information").innerHTML+=`必要[湾港レベル2,食料20,物資32]<input type="button" value="私掠船" onclick="train(this.value,'⛵️',26,2,3,0,0,['海軍','大砲'],`+b.assign+`,[20,32,0])" disabled />攻撃力26射程2移動3<br>`;
            }
            if(b.level>=3){
            document.querySelector("#information").innerHTML+=`必要[食料32,物資45]<input type="button" value="戦艦" onclick="train(this.value,'⛵️',32,3,3,0,0,['海軍','大砲'],`+b.assign+`,[32,45,0])" />攻撃力32射程3移動3<br>`;
                }else{
            document.querySelector("#information").innerHTML+=`必要[湾港レベル3,食料32,物資45]<input type="button" value="戦艦" onclick="train(this.value,'⛵️',32,2,3,0,0,['海軍','大砲'],`+b.assign+`,[32,45,0])" disabled />攻撃力32射程2移動3<br>`;
                }
        }
        if(level[P]==4){
            document.querySelector("#information").innerHTML+=`必要[食料25,物資50]<input type="button" value="蒸気船" onclick="train(this.value,'🚢',45,2,3,100,3,['海軍','装甲','大砲'],`+b.assign+`,[25,50,0])" />攻撃力45射程2移動3重装甲100<br>`;
            document.querySelector("#information").innerHTML+=`必要[食料10,物資50,部品5]<input type="button" value="潜水艦" onclick="train(this.value,'🐟️',40,1,2,50,2,['海軍','潜水','魚雷'],`+b.assign+`,[10,50,5])" />攻撃力40中装甲50,飛行機から攻撃を受けず、敵から反撃を受けない<br>`;
            if(b.level>=2){
            document.querySelector("#information").innerHTML+=`必要[食料32,物資65]<input type="button" value="駆逐艦" onclick="train(this.value,'🚢',50,2,3,175,3,['海軍','装甲','大砲','ソナー','対空機銃'],`+b.assign+`,[32,65,0])" />攻撃力50射程2移動3重装甲175<br>`;
            }else{
            document.querySelector("#information").innerHTML+=`必要[湾港レベル2,食料32,物資65]<input type="button" value="駆逐艦" onclick="train(this.value,'🚢',50,2,3,175,3,['海軍','装甲','大砲','ソナー','対空機銃'],`+b.assign+`,[32,65,0])" disabled />攻撃力50射程2移動3重装甲175<br>`;
            }
            if(b.level>=3){
            document.querySelector("#information").innerHTML+=`必要[食料180,物資180,部品10]<input type="button" value="巡洋艦" onclick="train(this.value,'🚢',75,2,2,245,3,['海軍','装甲','大砲','対空機銃'],`+b.assign+`,[180,180,10])" />攻撃力75射程2重装甲245<br>`;
            }else{
            document.querySelector("#information").innerHTML+=`必要[湾港レベル3,食料180,物資180,部品10]<input type="button" value="巡洋艦" onclick="train(this.value,'🚢',75,2,2,245,3,['海軍','装甲','大砲','対空機銃'],`+b.assign+`,[180,180,10])" disabled />攻撃力75射程2重装甲245<br>`;
            }
            if(b.level>=4){
            document.querySelector("#information").innerHTML+=`必要[食料200,物資240,部品15]<input type="button" value="航空母艦" onclick="train(this.value,'🚢',36,8,2,300,3,['海軍','装甲','空母','対空機銃'],`+b.assign+`,[200,240,15])" />射程2移動3重装甲300,爆撃機で攻撃する<br>`;
            }else{
            document.querySelector("#information").innerHTML+=`必要[湾港レベル4,食料200,物資240,部品15]<input type="button" value="航空母艦" onclick="train(this.value,'🚢',36,8,2,300,3,['海軍','装甲','空母','対空機銃'],`+b.assign+`,[200,240,15])" disabled />射程2移動3重装甲300,爆撃機で攻撃する<br>`;
            }
            }
        if(level[P]==5){
            document.querySelector("#information").innerHTML+=`必要[食料30,物資95]<input type="button" value="コルベット" onclick="train(this.value,'🚢',35,2,4,0,0,['海軍','装甲','機関銃','対空機銃'],`+b.assign+`,[30,95,0])" />攻撃力35移動4<br>`;
            document.querySelector("#information").innerHTML+=`必要[食料50,物資275,部品20]<input type="button" value="フリゲート艦" onclick="train(this.value,'🚢',75,2,3,300,3,['海軍','装甲','大砲','対空機銃'],`+b.assign+`,[50,275,20])" />攻撃力75移動3重装甲300<br>`;
            if(b.level>=2){
            document.querySelector("#information").innerHTML+=`必要[食料100,物資350,部品80]<input type="button" value="ミサイル巡洋艦" onclick="train(this.value,'🚢',65,5,2,300,3,['海軍','装甲','ソナー','ミサイルランチャー'],`+b.assign+`,[100,350,80])" />攻撃力65重装甲300,ミサイルで攻撃する。<br>`;
            }else{
                document.querySelector("#information").innerHTML+=`必要[湾港レベル2,食料100,物資350,部品80]<input type="button" value="ミサイル巡洋艦" onclick="train(this.value,'🚢',65,5,2,300,3,['海軍','装甲','ソナー','ミサイルランチャー'],`+b.assign+`,[100,350,80])" disabled />攻撃力65重装甲300,ミサイルで攻撃する。<br>`;
            }
            if(b.level>=3){
            document.querySelector("#information").innerHTML+=`必要[食料10,物資500,部品120]<input type="button" value="原子力潜水艦" onclick="train(this.value,'🐟️',65,5,4,250,3,['海軍','潜水','魚雷','ミサイルランチャー'],`+b.assign+`,[10,500,120])" />攻撃力65移動4重装甲250,ミサイルで攻撃する。<br>`;
            }else{
            document.querySelector("#information").innerHTML+=`必要[湾港レベル3,食料10,物資500,部品120]<input type="button" value="原子力潜水艦" onclick="train(this.value,'🐟️',65,5,4,250,3,['海軍','潜水','魚雷','ミサイルランチャー'],`+b.assign+`,[10,500,120])" disabled />攻撃力65移動4重装甲250,ミサイルで攻撃する。<br>`;
            }
            if(b.level>=4){
            document.querySelector("#information").innerHTML+=`必要[食料300,物資300,部品105]<input type="button" value="原子力空母" onclick="train(this.value,'🚢',50,6,4,600,3,['海軍','装甲','空母','対空機銃'],`+b.assign+`,[300,300,105])" />射程6移動4重装甲600,ジェット機で攻撃する<br>`;
            }else{
                document.querySelector("#information").innerHTML+=`必要[湾港レベル4,食料300,物資300,部品105]<input type="button" value="原子力空母" onclick="train(this.value,'🚢',50,6,4,600,3,['海軍','装甲','空母','対空機銃'],`+b.assign+`,[300,300,105])" disabled />射程6移動4重装甲600,ジェット機で攻撃する<br>`;
            }
        }
        if(level[P]>=6){
            document.querySelector("#information").innerHTML+=`必要[物資150,部品150]<input type="button" value="AIフリゲート艦" onclick="train(this.value,'🚢',132,2,4,500,3,['海軍','装甲','大砲','対空機銃'],`+b.assign+`,[0,150,150])" />攻撃力132移動4重装甲500<br>`;
            if(b.level>=2){
            document.querySelector("#information").innerHTML+=`必要[食料320,物資100,部品500]<input type="button" value="レーザー巡洋艦" onclick="train(this.value,'🚢',125,6,4,1000,3,['海軍','装甲','レールガン'],`+b.assign+`,[320,100,500])" />攻撃力125移動4射程6重装甲1000<br>`;
            }else{
                document.querySelector("#information").innerHTML+=`必要[湾港レベル2,食料320,物資100,部品500]<input type="button" value="レーザー巡洋艦" onclick="train(this.value,'🚢',125,6,4,1000,3,['海軍','装甲','レールガン'],`+b.assign+`,[320,100,500])" disabled />攻撃力125移動4射程6重装甲1000<br>`;
            }
        }
        }else if(b.status=="選択中" && (b.name=="市場") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
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
        }else if(b.status=="選択中" && (b.type=="🥚") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[なし]攻撃力8,射程3<input type="button" value="炎のドラゴン" onclick="train(this.value,'🛩',8,3,4,0,0,[],`+b.assign+`,[0,0,0])" />
        必要[食糧100]攻撃力12,射程3<input type="button" value="闇のドラゴン" onclick="train(this.value,'🛩',12,3,4,0,0,[],`+b.assign+`,[100,0,0])" />
        必要[食糧150]攻撃力16,射程6<input type="button" value="光のドラゴン" onclick="train(this.value,'🛩',16,6,4,0,0,[],`+b.assign+`,[150,0,0])" />`;
        }else if(b.status=="選択中" && (b.type=="🏰") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
        document.querySelector("#information").innerHTML="";
        document.querySelector("#information").innerHTML+=`
        必要[食糧20,物資12]攻撃力20,射程2<input type="button" value="黒魔術師" onclick="train(this.value,'🧙🔥',20,2,2,0,0,[],`+b.assign+`,[20,12,0])" />
        必要[食糧20,物資12]攻撃力15,射程1<input type="button" value="洗脳術師" onclick="train(this.value,'🧙😖',15,1,2,0,0,[],`+b.assign+`,[20,12,0])" />
        必要[食糧20,物資12]攻撃力15,射程2<input type="button" value="白魔術師" onclick="train(this.value,'🧙❤',15,2,2,0,0,[],`+b.assign+`,[20,12,0])" />`;
        }else if(Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2 && b.assign==selectedTile && units.findIndex((elem)=>elem.assign==b.assign)==-1){
        document.querySelector("#information").innerHTML=b.name+"<br>体力"+b.hp+"<br>生産:"+b.type+b.str;
        }else if(u.type!="⚒" && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2 && u.assign==selectedTile){
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
        discovery("バイオテクノロジー",k);
        discovery("サイバネティクス",k);
        discovery("ナノテクノロジー",k);
        discovery("核融合反応",k);
        discovery("ホバリング",k);
        discovery("量子工学",k);
    }
    if(lv>6){
        discovered("バイオテクノロジー",k);
        discovered("サイバネティクス",k);
        discovered("ナノテクノロジー",k);
        discovered("核融合反応",k);
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
/*行けるかの判定　パターンの総数は等差数列の6倍*/
function pathable(path,pathId,before,movement,maxMovement,clear,ignore,unit){
    if(ignore.indexOf(tileId(1,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(1,pathId) && b[2]==movement)==-1 && tileId(1,pathId)!=-1 && clear.indexOf(tileId(1,pathId))==-1){
        if(((!unit.embarked && !hasEffect(unit.seed,"海軍")) && tiles[tileId(1,pathId)].type=="Water") || ((unit.embarked || hasEffect(unit.seed,"海軍")) && tiles[tileId(1,pathId)].type=="Land") || units.findIndex((u)=>u.owner!=unit.owner && u.assign==tileId(1,pathId))!=-1 || (buildings.findIndex((u)=>u.owner!=unit.owner && u.owner!=100 && u.assign==tileId(1,pathId))!=-1 && !hasEffect(unit.seed,"戦車"))){
            before.push([pathId,tileId(1,pathId),movement]);
            clear.push(tileId(1,pathId));
            return ["end",clear];
        }
        if(movement==maxMovement){
            before.push([pathId,tileId(1,pathId),movement]);
        }
        return [tileId(1,pathId),clear];
    }else if(ignore.indexOf(tileId(2,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(2,pathId) && b[2]==movement)==-1 && tileId(2,pathId)!=-1 && clear.indexOf(tileId(2,pathId))==-1){
        if(((!unit.embarked && !hasEffect(unit.seed,"海軍")) && tiles[tileId(2,pathId)].type=="Water") || ((hasEffect(unit.seed,"海軍") || unit.embarked) && tiles[tileId(2,pathId)].type=="Land") || units.findIndex((u)=>u.owner!=unit.owner && u.assign==tileId(2,pathId))!=-1 || (buildings.findIndex((u)=>u.owner!=unit.owner && u.owner!=100 && u.assign==tileId(2,pathId))!=-1 && !hasEffect(unit.seed,"戦車"))){
            before.push([pathId,tileId(2,pathId),movement]);
            clear.push(tileId(2,pathId));
            return ["end",clear];
        }
        if(movement==maxMovement){
            before.push([pathId,tileId(2,pathId),movement]);
        }
        return [tileId(2,pathId),clear];
    }else if(ignore.indexOf(tileId(3,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(3,pathId) && b[2]==movement)==-1 && tileId(3,pathId)!=-1 && clear.indexOf(tileId(3,pathId))==-1){
        if(((!unit.embarked && !hasEffect(unit.seed,"海軍")) && tiles[tileId(3,pathId)].type=="Water") || ((hasEffect(unit.seed,"海軍") || unit.embarked) && tiles[tileId(3,pathId)].type=="Land") || units.findIndex((u)=>u.owner!=unit.owner && u.assign==tileId(3,pathId))!=-1 || (buildings.findIndex((u)=>u.owner!=unit.owner && u.owner!=100 && u.assign==tileId(3,pathId))!=-1 && !hasEffect(unit.seed,"戦車"))){
            before.push([pathId,tileId(3,pathId),movement]);
            clear.push(tileId(3,pathId));
            return ["end",clear];
        }
        if(movement==maxMovement){
            before.push([pathId,tileId(3,pathId),movement]);
        }
        return [tileId(3,pathId),clear];
    }else if(ignore.indexOf(tileId(4,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(4,pathId) && b[2]==movement)==-1 && tileId(4,pathId)!=-1 && clear.indexOf(tileId(4,pathId))==-1){
        if(((!unit.embarked && !hasEffect(unit.seed,"海軍")) && tiles[tileId(4,pathId)].type=="Water") || ((hasEffect(unit.seed,"海軍") || unit.embarked) && tiles[tileId(4,pathId)].type=="Land") || units.findIndex((u)=>u.owner!=unit.owner && u.assign==tileId(4,pathId))!=-1 || (buildings.findIndex((u)=>u.owner!=unit.owner && u.owner!=100 && u.assign==tileId(4,pathId))!=-1 && !hasEffect(unit.seed,"戦車"))){
            before.push([pathId,tileId(4,pathId),movement]);
            clear.push(tileId(4,pathId));
            return ["end",clear];
        }
        if(movement==maxMovement){
          before.push([pathId,tileId(4,pathId),movement]);
        }
        return [tileId(4,pathId),clear];
    }else if(ignore.indexOf(tileId(5,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(5,pathId) && b[2]==movement)==-1 && tileId(5,pathId)!=-1 && clear.indexOf(tileId(5,pathId))==-1){
        if(((!unit.embarked && !hasEffect(unit.seed,"海軍")) && tiles[tileId(5,pathId)].type=="Water") || ((hasEffect(unit.seed,"海軍") || unit.embarked) && tiles[tileId(5,pathId)].type=="Land") || units.findIndex((u)=>u.owner!=unit.owner && u.assign==tileId(5,pathId))!=-1 || (buildings.findIndex((u)=>u.owner!=unit.owner && u.owner!=100 && u.assign==tileId(5,pathId))!=-1 && !hasEffect(unit.seed,"戦車"))){
            before.push([pathId,tileId(5,pathId),movement]);
            clear.push(tileId(5,pathId));
            return ["end",clear];
        }
        //if(movement==1){
        //console.log("worked",path.length)
        //}
        if(movement==maxMovement){
            before.push([pathId,tileId(5,pathId),movement]);
        }
        return [tileId(5,pathId),clear];
    }else if(ignore.indexOf(tileId(6,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(6,pathId) && b[2]==movement)==-1 && tileId(6,pathId)!=-1 && clear.indexOf(tileId(6,pathId))==-1){
        if(((!unit.embarked && !hasEffect(unit.seed,"海軍")) && tiles[tileId(6,pathId)].type=="Water") || ((hasEffect(unit.seed,"海軍") || unit.embarked) && tiles[tileId(6,pathId)].type=="Land") || units.findIndex((u)=>u.owner!=unit.owner && u.assign==tileId(6,pathId))!=-1 || (buildings.findIndex((u)=>u.owner!=unit.owner && u.owner!=100 && u.assign==tileId(6,pathId))!=-1 && !hasEffect(unit.seed,"戦車"))){
            before.push([pathId,tileId(6,pathId),movement]);
            clear.push(tileId(6,pathId));
            return ["end",clear];
        }
        if(movement==maxMovement){
            before.push([pathId,tileId(6,pathId),movement]);
        }
        return [tileId(6,pathId),clear];
    }else{
        if(!ignore[ignore.length-2]){
        before.push(["end",pathId,movement-1]);
        }else{
        before.push([ignore[ignore.length-2],pathId,movement-1]);
        }
        return ["end",clear]
    }
}
function tileId(m,id){
    if(id!=-1){
    if(m==1){
    return tilesCentroid(tiles[id].centroid.x,tiles[id].centroid.y-hexSize*Math.sqrt(3),tiles[id].planet);
    }
    if(m==2){
    return tilesCentroid(tiles[id].centroid.x+hexSize*1.5,tiles[id].centroid.y-hexSize*0.5*Math.sqrt(3),tiles[id].planet);
    }
    if(m==3){
    return tilesCentroid(tiles[id].centroid.x+hexSize*1.5,tiles[id].centroid.y+hexSize*0.5*Math.sqrt(3),tiles[id].planet);
    }
    if(m==4){
    return tilesCentroid(tiles[id].centroid.x,tiles[id].centroid.y+hexSize*Math.sqrt(3),tiles[id].planet);
    }
    if(m==5){
    return tilesCentroid(tiles[id].centroid.x-hexSize*1.5,tiles[id].centroid.y+hexSize*0.5*Math.sqrt(3),tiles[id].planet);
    }
    if(m==6){
    return tilesCentroid(tiles[id].centroid.x-hexSize*1.5,tiles[id].centroid.y-hexSize*0.5*Math.sqrt(3),tiles[id].planet);
    }
    }else{
        console.error(`入力された値は不適切です！`)
        return -1;
    }
}
/*
ほぼ完全
仕組みの詳細はノートにある
*/
function tryPath(assign,arrive,movement,unit,bool){
    let path=[];
    let clear=[];
    let before=[[assign,assign,0]];
    let ignore=[assign];
    let id=0;
        while(before[before.length-1][0]!="end"){
            path.push([]);
            ignore=[assign]
        for(let k=0; k<movement; ++k){
            /*一歩一歩更新*/
            let nextPath=pathable(path,ignore[ignore.length-1],before,k+1,movement,clear,ignore,unit);
            if(before[before.length-1][0]=="end"){
                break;
            }
            //clear=nextPath[1];
            if(nextPath[0]=="end"){
                break;
            }else{
            path[id].push(nextPath[0]);
            }
            ignore.push(nextPath[0]);
        }
            id++;
        }
    //console.log(path,ignore,before,clear)
    if(bool){
        return path;
    }
    let result=[];
    for(const p of path){
        if(p.indexOf(arrive)!=-1){
            result.push(p.slice(0,p.indexOf(arrive)+1));
        }
    }
    let resultLength=[];
    for(const r of result){
        resultLength.push(r.length);
    }
    return result[resultLength.indexOf(eval(`Math.min(${resultLength.join()})`))];
}
function tilesPath(assign,range){
    let path=[];
    let clear=[];
    let before=[[assign,assign,0]];
    let ignore=[assign];
    let id=0;
        while(before[before.length-1][0]!="end"){
            path.push([]);
            ignore=[assign]
        for(let k=0; k<range; ++k){
            /*一歩一歩更新*/
            let nextPath=pathableTiles(path,ignore[ignore.length-1],before,k+1,range,clear,ignore);
            if(before[before.length-1][0]=="end"){
                break;
            }
            //clear=nextPath[1];
            if(nextPath[0]=="end"){
                break;
            }else{
            path[id].push(nextPath[0]);
            }
            ignore.push(nextPath[0]);
        }
            id++;
        }
    return path;
}
function pathableTiles(path,pathId,before,movement,maxMovement,clear,ignore){
    if(ignore.indexOf(tileId(1,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(1,pathId) && b[2]==movement)==-1 && tileId(1,pathId)!=-1 && clear.indexOf(tileId(1,pathId))==-1){
        if(movement==maxMovement){
            before.push([pathId,tileId(1,pathId),movement]);
        }
        return [tileId(1,pathId),clear];
    }else if(ignore.indexOf(tileId(2,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(2,pathId) && b[2]==movement)==-1 && tileId(2,pathId)!=-1 && clear.indexOf(tileId(2,pathId))==-1){
        if(movement==maxMovement){
            before.push([pathId,tileId(2,pathId),movement]);
        }
        return [tileId(2,pathId),clear];
    }else if(ignore.indexOf(tileId(3,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(3,pathId) && b[2]==movement)==-1 && tileId(3,pathId)!=-1 && clear.indexOf(tileId(3,pathId))==-1){
        if(movement==maxMovement){
            before.push([pathId,tileId(3,pathId),movement]);
        }
        return [tileId(3,pathId),clear];
    }else if(ignore.indexOf(tileId(4,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(4,pathId) && b[2]==movement)==-1 && tileId(4,pathId)!=-1 && clear.indexOf(tileId(4,pathId))==-1){
        if(movement==maxMovement){
          before.push([pathId,tileId(4,pathId),movement]);
        }
        return [tileId(4,pathId),clear];
    }else if(ignore.indexOf(tileId(5,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(5,pathId) && b[2]==movement)==-1 && tileId(5,pathId)!=-1 && clear.indexOf(tileId(5,pathId))==-1){
        if(movement==maxMovement){
            before.push([pathId,tileId(5,pathId),movement]);
        }
        return [tileId(5,pathId),clear];
    }else if(ignore.indexOf(tileId(6,pathId))==-1 && before.findIndex((b)=>b[0]==pathId && b[1]==tileId(6,pathId) && b[2]==movement)==-1 && tileId(6,pathId)!=-1 && clear.indexOf(tileId(6,pathId))==-1){
        if(movement==maxMovement){
            before.push([pathId,tileId(6,pathId),movement]);
        }
        return [tileId(6,pathId),clear];
    }else{
        if(!ignore[ignore.length-2]){
        before.push(["end",pathId,movement-1]);
        }else{
        before.push([ignore[ignore.length-2],pathId,movement-1]);
        }
        return ["end",clear]
    }
}
function makeTile(planet){
    let tilesGenerated=0;
    let k=0;
    let hexX=hexSize*5/3;
    let hexY=hexSize/6;
    while(hexX<planets[planets.findIndex((e)=>e.name==planet)].size[0]){
        let t="";
        if(Math.round(Math.random()*5)!=0){
            t="Land";
        }else{
            t="Water"
            }
    if(hexX+hexSize*0.5>planets[planets.findIndex((e)=>e.name==planet)].size[0]){
        break;
    }
    tiles.push({id:tiles.length,hexX:hexX,hexY:hexY,centroid:{x:hexX-hexSize*0.5,y:hexY+hexSize*Math.sin(2*Math.PI/3)},type:t,status:"待機",planet:planet});
    tilesGenerated++;
    if(hexY+hexSize*4*Math.sin(2*Math.PI/3)>=planets[planets.findIndex((e)=>e.name==planet)].size[1]){
        k++;
        if(k>2){
            k=1;
            }
    hexX=hexX+hexSize*2+hexSize*Math.cos(2*Math.PI/3);
    hexY=hexSize/6+hexSize*Math.sin(2*Math.PI/3)*(1-Math.floor(k/2));
        }else{
    hexY=hexY+hexSize*2*Math.sin(2*Math.PI/3);
        }
    }
    planets[planets.findIndex((e)=>e.name==planet)].tiles=tilesGenerated;
}
function rgb(r,g,b){
    let rgb=[eval(r).toString(16),eval(g).toString(16),eval(b).toString(16)];
    for(let k=0; k<3; ++k){
        if(rgb[k].length==1){
            rgb[k]="0"+rgb[k];
        }
    }
    rgb=rgb[0]+rgb[1]+rgb[2];
    return "#"+rgb;
}
function randomColor(range){
    return rgb(Math.round(Math.random()*range),Math.round(Math.random()*range),Math.round(Math.random()*range));
}
function makeRegion(){
    for(const p of planets){
        let assigned=0;
        while(assigned<p.tiles){
            let ocean=false;
            if(p.name=="テイア"){
                if(regions.length==2 || regions.length==4){
                ocean=true;
                }
                if(hexSize<60){
                    if(Math.random()<0.4){
                    ocean=true;
                    }
                }
            }else{
            }
            if(ocean){
                regions.push([p.name,[],randomColor(255),generateName()+"海"]);
            }else{
            regions.push([p.name,[],randomColor(255),generateName()+"州"]);
            }
            let tileNotRegion=-1;
            let bo=false;
            for(const t of tiles){
                if(t.planet==p.name){
                    if(regions.findIndex((r)=>r[1].indexOf(t.id)!=-1)==-1){
                        tileNotRegion=t.id;
                        bo=true;
                }
                    }
            }
            if(!bo){
                regions.length--;
                break;
            }
            document.getElementById("states").innerHTML+=`<input type="text" value="${regions[regions.length-1][3]}" onclick="editingRegion=this.value" onchange="changeRegionName(this.value,${regions.length-1})"><input type="color" value="${regions[regions.length-1][2]}" onchange="regions[${regions.length-1}][2]=this.value"><br>`;
            regions[regions.length-1][1].push(tileNotRegion);
            regionalTiles=tilesPath(tileNotRegion,Math.ceil(Math.random()*5));
            getTiles=[];
            for(const r of regionalTiles){
                if(getTiles.indexOf(r[r.length-1])==-1){
                getTiles.push(r[r.length-1]);
                }
            }
            for(const g of getTiles){
                let detect=false;
                for(const r of regions){
                    if(r[1].indexOf(g)!=-1){
                        detect=true;
                    }
                }
                if(!detect){
                    if(ocean){
                        //島にならない確率5%
                        if(Math.random()<0.95){
                        tiles[g].type="Water";
                        }
                    }
                    regions[regions.length-1][1].push(g);
                    assigned++;
                    //console.log(assigned);
                }
            }
    }
}
    return regions
}
function regionCentral(regionName){
    let regionId=regions.findIndex((e)=>e[3]==regionName);
    let x=0;
    let y=0;
    let div=0;
    for(const r of regions[regionId][1]){
        if(Number.isInteger(r)){
        x+=tiles[r].centroid.x;
        y+=tiles[r].centroid.y;
        div++;
        }
    }
    return {x:x/div,y:y/div};
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
        let tilesArrival=buildings.findIndex((e)=>e.planet==planets[arrival].name && e.name=="宇宙基地" && e.owner==P);
        if(tilesArrival!=-1 || units.findIndex((e)=>e.assign==buildings[tilesArrival].assign)==-1){
            assign=buildings[tilesArrival].assign;
            }else{
    while(assign==-1 || buildings.findIndex((e)=>e.assign==assign && e.owner!=P)!=-1 || units.findIndex((e)=>e.assign==assign)!=-1 || tiles[assign].type=="Water"){
        loop++;
        assign=Math.round(Math.random()*planets[arrival].tiles+min);
        if(loop>5000){
            return;
        }
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
        let effect="[";
        for(let i=0; i<units[k].effect.length; ++i){
            effect+=`"${units[k].effect[i]}"`;
            if(i+1<units[k].effect.length){
                effect+=",";
            }
        }
        effect+="]";
        if(units[k].name=="労働者"){
            if(units[k].status!="建設中" && units[k].status!="強化中"){
        res+=`{name:"${units[k].name}",type:"${units[k].type}",color:"${units[k].color}",hp:0,armor:${units[k].armor},armorLevel:${units[k].armorLevel},armorMax:${units[k].armorMax},effect:${effect},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",status:"${units[k].status}",seed:${units[k].seed},fly:${units[k].fly},mp:${units[k].mp},move:${units[k].move},range:${units[k].range},movePath:[],embarked:${units[k].embarked},embstr:${units[k].embstr}}`;
            }else if(units[k].status=="建設中"){
                let str=units[k].b[2];
                if(Number.isInteger(str)===true){
                res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}",${str},"${units[k].b[3]}",${units[k].b[4]}],color:"${units[k].color}",hp:${units[k].hp},armor:${units[k].armor},armorLevel:${units[k].armorLevel},armorMax:${units[k].armorMax},effect:${effect},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},fly:${units[k].fly},status:"${units[k].status}",mp:${units[k].mp},move:${units[k].move},range:${units[k].range},movePath:[],embarked:${units[k].embarked},embstr:${units[k].embstr}}`;
                    }else{
                    res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}","${str}","${units[k].b[3]}",${units[k].b[4]}],color:"${units[k].color}",hp:${units[k].hp},armor:${units[k].armor},armorLevel:${units[k].armorLevel},armorMax:${units[k].armorMax},effect:${effect},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},status:"${units[k].status}",fly:${units[k].fly},mp:${units[k].mp},move:${units[k].move},range:${units[k].range},movePath:[],embarked:${units[k].embarked},embstr:${units[k].embstr}}`;
                    }
            }else if(units[k].status=="強化中"){
                let str=units[k].b[2];
                if(Number.isInteger(str)===true){
                res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}",${str},${units[k].b[3]},"${units[k].b[4]}",${units[k].b[5]}],color:"${units[k].color}",hp:${units[k].hp},armor:${units[k].armor},armorLevel:${units[k].armorLevel},armorMax:${units[k].armorMax},effect:${effect},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},fly:${units[k].fly},status:"${units[k].status}",mp:${units[k].mp},move:${units[k].move},range:${units[k].range},movePath:[],embarked:${units[k].embarked},embstr:${units[k].embstr}}`;
                    }else{
                    res+=`{name:"${units[k].name}",type:"${units[k].type}",b:["${units[k].b[0]}","${units[k].b[1]}","${str}",${units[k].b[3]},"${units[k].b[4]}",${units[k].b[5]}],color:"${units[k].color}",hp:${units[k].hp},armor:${units[k].armor},armorLevel:${units[k].armorLevel},armorMax:${units[k].armorMax},effect:${effect},owner:${units[k].owner},str:"${units[k].str}",assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",seed:${units[k].seed},status:"${units[k].status}",fly:${units[k].fly},mp:${units[k].mp},move:${units[k].move},range:${units[k].range},movePath:[],embarked:${units[k].embarked},embstr:${units[k].embstr}}`;
                    }
            }
            }else{
            res+=`{name:"${units[k].name}",type:"${units[k].type}",color:"${units[k].color}",hp:${units[k].hp},armor:${units[k].armor},armorLevel:${units[k].armorLevel},armorMax:${units[k].armorMax},effect:${effect},owner:${units[k].owner},str:${units[k].str},assign:${units[k].assign},x:${units[k].x},y:${units[k].y},planet:"${units[k].planet}",status:"${units[k].status}",mp:${units[k].mp},seed:${units[k].seed},move:${units[k].move},fly:${units[k].fly},range:${units[k].range},movePath:[],embarked:${units[k].embarked},embstr:${units[k].embstr}}`;
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
function stringRegions(){
    let res="[";
    for(let k=0; k<regions.length; ++k){
        res+=`["${regions[k][0]}",[${regions[k][1].join()}],"${regions[k][2]}","${regions[k][3]}"]`;
        if(k+1<regions.length){
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
        res+=`{name:"${players[k].name}",discoveredPlanets:[${discoveredPlanets}],war:[${war}],color:"${players[k].color}"}`;
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
    string+=stringRegions();
    string+="_13_";
    string+=hexSize;
    string+="_14_";
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
        for(const u of units){
            if(!u.effect){
                u.effect=[];
                if(u.name=="歩兵"){
                    u.effect=["ライフル銃"];
                }
            }
            if(!u.armor){
                u.armor=0;
            }
            if(!u.armorMax){
                u.armorMax=0;
            }
            if(!u.armorLevel){
                u.armorLevel=0;
            }
        }
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
    if(!players[0].color){
        for(const p of players){
            p.color=randomColor(255);
        }
    }
    if(data.indexOf("_13_")!=-1){
    regions=eval(data.substring(data.indexOf("_12_")+4,data.indexOf("_13_")));
    document.getElementById("states").innerHTML="";
    for(const r of regions){
    document.getElementById("states").innerHTML+=`<input type="text" value="${r[3]}" onclick="editingRegion=this.value" onchange="changeRegionName(this.value,${regions.findIndex((e)=>e[1]==r[1])})"><input type="color" value="${r[2]}" onchange="regions[${regions.findIndex((e)=>e[1]==r[1])}][2]=this.value"><br>`;
    }
        }
    if(data.indexOf("_14_")!=-1){
    hexSize=eval(data.substring(data.indexOf("_13_")+4,data.indexOf("_14_")));
    }
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
        let haveSound=false;
    /*効果音の再生*/
                    if(units[i].name=="剣士" || units[i].name=="槍兵" || units[i].name=="重装歩兵" || units[i].name=="胸甲騎兵" || units[i].name=="長槍兵"|| units[i].name=="長剣士" || units[i].name=="騎兵" || units[i].name=="騎士" || units[i].name=="軽騎兵" || units[i].name=="槍騎兵"){
                        SwordAttack();
                        haveSound=true;
                    }
                    if(units[i].name=="野戦砲" || units[i].name=="歩兵戦車" || units[i].name=="主力戦車" || units[i].name=="ホバー戦車" || (hasEffect(units[i].seed,"海軍") && hasEffect(units[i].seed,"大砲"))){
                        cannon();
                        haveSound=true;
                    }
                    if(units[i].name=="地対空ミサイルランチャー"){
                        sam();
                        haveSound=true;
                    }
                    if(units[i].name=="戦列歩兵"){
                        rifleFire();
                        haveSound=true;
                    }
                    if(hasEffect(units[i].seed,"ライフル銃")){
                        musketFire();
                        haveSound=true;
                    }
                    if(units[i].name=="新式歩兵"){
                        rifleFire2();
                        haveSound=true;
                    }
                    if(units[i].name=="軽火砲" || units[i].name=="榴弾砲"){
                        gunFire();
                        haveSound=true;
                    }
                    if(hasEffect(units[i].seed,"自動小銃")){
                        machinegunFire();
                        haveSound=true;
                    }
                    if(hasEffect(units[i].seed,"機関銃")){
                        gatlingFire();
                        haveSound=true;
                    }
                    if(units[i].type=="☄"){
                        beam();
                        haveSound=true;
                    }else if(units[i].type=="🧙🔥"){
                        fireball();
                        haveSound=true;
                    }
        if(!haveSound){
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
                        if(units[enemy].armor==0){
                        units[enemy].hp=units[enemy].hp-damage;
                        popTexts.push({value:"-"+damage,x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                        }else if((units[you].str*units[you].hp/100)>0){
                            units[enemy].armor=units[enemy].armor-(units[you].str*units[you].hp/100);
                            if(units[enemy].armor<=0){
                            units[enemy].armor=0;
                            popTexts.push({value:"装甲破壊",x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#ff0000"});
                            }else{
                            popTexts.push({value:"-"+(units[you].str*units[you].hp/100),x:units[enemy].x,y:units[enemy].y-25,interval:0,color:"#4cd4f5"});
                            }
                        }
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
                        h.deleteObject("units",units.findIndex((e)=>e.seed==units[you].seed));
                        if(you<enemy){
                            enemy--;
                        }
                        }
        }
    if(enemy!=-1 && enemy<units.length){
                    if(units[enemy].hp<=0){
                        h.deleteObject("units",units.findIndex((e)=>e.seed==units[enemy].seed));
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
    airAttack(you,tilesCentroid(x,y+hexSize*Math.sqrt(3),tiles[units[you].assign].planet));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x,y-hexSize*Math.sqrt(3),tiles[units[you].assign].planet));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x+hexSize*1.5,y+hexSize*0.5*Math.sqrt(3),tiles[units[you].assign].planet));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x+hexSize*1.5,y-hexSize*0.5*Math.sqrt(3),tiles[units[you].assign].planet));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x-hexSize*1.5,y+hexSize*0.5*Math.sqrt(3),tiles[units[you].assign].planet));
    you=units.findIndex((e)=>e.seed==seed);
    airAttack(you,tilesCentroid(x-hexSize*1.5,y-hexSize*0.5*Math.sqrt(3),tiles[units[you].assign].planet));
}
function tilesCentroid(x,y,planet){
    if(!planet){
        planet=="テイア";
    }
    return tiles.findIndex((e)=>Math.abs(e.centroid.x-x)<=1 && Math.abs(e.centroid.y-y)<=1 && e.planet==planet);
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
function tilesRegion(id){
    return regions.findIndex((r)=>r[1].indexOf(id)!=-1);
}
function signature(you){
    if(players[you].war.indexOf(players[P].name)!=-1){
        peace(you,P);
    }
}
function changeRegionName(value,id){
    editingRegion=value;
    regions[id][3]=value;
}
function nearLand(seed){
    let id=units.findIndex((e)=>e.seed==seed);
    for(let k=1; k<=6; ++k){
        if(tileId(k,units[id].assign)!=-1){
        if(tiles[tileId(k,units[id].assign)].type=="Land"){
            return true;
        }
        }
    }
    return false;
}
function declareWar(you,them){
    players[you].war.push(players[them].name);
    players[them].war.push(players[you].name);
    writeHistory(`${players[you].name}が${players[them].name}に宣戦布告`);
}
function isCivilizedRegion(id){
    for(const i of regions[id][1]){
        if(buildings.findIndex((b)=>b.assign==i && (b.name=="都市" || b.name=="首都"))!=-1){
            return true;
        }
    }
    return false;
}
function territory(id){
    for(const i of regions[id][1]){
        if(buildings.findIndex((b)=>b.assign==i && (b.name=="都市" || b.name=="首都"))!=-1){
            return buildings[buildings.findIndex((b)=>b.assign==i && (b.name=="都市" || b.name=="首都"))].owner;
        }
    }
    return 100;
}
generate(12);
function regenerateMap(s){
    console.log("再生成開始");
    const stT=Date.now();
    let stt=stT;
    if(s){
        hexSize=s;
    }
    tiles=[];
    regions=[];
    units=[];
    buildings=[];
    for(const p of planets){
    let mstt=Date.now();
    makeTile(p.name);
    console.log(`${p.name}生成(${Date.now()-mstt}ミリ秒)`);
    }
    console.log(`タイル生成終了(${Date.now()-stt}ミリ秒)`);
    stt=Date.now();
    makeRegion();
    console.log(`州生成終了(${Date.now()-stt}ミリ秒)`);
    stt=Date.now();
    setup();
    console.log(`セットアップ終了(${Date.now()-stt}ミリ秒)`);
    stt=Date.now();
    generate(Math.round(60*12/s));
    console.log(`資源生成終了(${Date.now()-stt}ミリ秒)`);
    console.log(`再生成終了(合計${Date.now()-stT}ミリ秒)`);
}
