async function getJSON(url){
const jsonData = await fetch(url);
const json = await jsonData.json();
return json;
}
async function loadJsonFiles(){
    var json;
    json=await getJSON("jsons/original.json");
    techList=json.techList;
    effects=json.effects;
    buttons=json.buttons;
    stages=json.stages;
    json=await getJSON("jsons/units.json");
    unitLists=json;
    json=await getJSON("jsons/buildings.json");
    buildingLists=json;
    json=await getJSON("jsons/generals.json");
    generals=json;
    console.log("jsonsの読み込みが終了。")
    translate();
}
var belowTexts=[];
loadJsonFiles();
const h=new hachchchctx();
var realisticCalendar=true;
var globalCalender=-1000;
var editar=false;
var infoScreen=false;
var hexSize=60;
var buildMode=4;
var newGame=true;
var gain=25;
var spaceAge=false;
var historical=false;
var selectedPlayers="";
var stages=[];
var unitLists=[];
var buildingLists=[];
var diplomacyButtons=document.getElementById("diplomacyButtons");
var campaign=document.getElementById("campaign");
const history=document.getElementById("history");
const res=document.getElementById("result");
const phtml=document.getElementById("playerhtml");
const cal=document.getElementById("reki");
let kana=["ア", "イ", "ウ", "エ", "オ", "カ", "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ", "サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ", "タ", "ダ", "チ", "ヂ", "ッ", "ツ", "ヅ", "テ", "デ", "ト", "ド", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ", "マ", "ミ", "ム", "メ", "モ", "ジャ", "ヤ", "ジュ", "ユ", "ジョ","ジャ","ジュ","ジェ","ジョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ン","ー"];
let firstWord=["ニュー","ノース","サウス","ウェスト","イースト","セイント"];
let lastWord=["ブルク","グラード","ポリス"];
function generateName(type){
    if(!type){
        type=0;
    }
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
                if(randomSeed==0 && type==0){
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
const playerName=document.getElementById("playerName");
var chat="";
var worldMapDisplay="なし";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let query="";
const dataSet=document.getElementById("dataSet");
const mouse = {x: null,y: null};
var buttons;
var opinions=[];
var techList;
var localGame=false;
var worldName="テイア";
var techs=[];
var tiles=[];
var units=[];
var religions=[];
var regions=[];
var mapPlanet=["テイア","テイア"];
let p1n=generateName(1);
let p2n=generateName(1);
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
var players=[{
    name:p1n,
    discoveredPlanets:[planets[0].name],
    war:[],
    population:0,
        growthRate:1,
        maxPopulation:20,
    color:randomColor(255),
    ai:false,
    calendar:{
        name:`${generateName()}`,
        years:0
    }
},{
    name:p2n,
    discoveredPlanets:[planets[0].name],
    war:[],
    population:0,
        growthRate:1,
        maxPopulation:20,
    color:randomColor(255),
    ai:false,
    calendar:{
        name:`${generateName()}`,
        years:0
    }
}];
function playerhtmldisplay(){
    phtml.innerHTML="";
for(let k=0; k<players.length; ++k){
phtml.innerHTML+=`<input type="button" value="🗑️" onclick="h.deleteObject('players',${k}); playerhtmldisplay()" /><input type="text" value="${players[k].name}" onchange="players[${k}].name=this.value" /><input type="color" value="${players[k].color}" onchange="players[${k}].color=this.value" />`;
    if(players[k].ai){
    phtml.innerHTML+=`AI<input type="checkbox" onchange="if(this.value){players[${k}].ai=false}else{players[${k}].ai=true}" checked /><br>`;
    }else{
    phtml.innerHTML+=`AI<input type="checkbox" onchange="if(this.value){players[${k}].ai=false}else{players[${k}].ai=true}" /><br>`;
    }
}
phtml.innerHTML+=`<input type="button" value="➕️" onclick="addPlayer()" />`;
}
function addPlayer(){
    players.push({
        name:generateName(1),
        discoveredPlanets:[planets[0].name],
        war:[],
        population:0,
        growthRate:1,
        maxPopulation:20,
        color:randomColor(255),
        ai:true,
        calendar:{
        name:`${generateName()}`,
        years:0
        }
    });
    playerhtmldisplay();
}
playerhtmldisplay();
var persons=[];
var generals=[];
var planetNameList=["水星","金星","地球","火星","フォボス","セレス","ベスタ","オベロン","冥王星","月","ハウメア","エリス","マケマケ","エンケラドス","ケレス","グリーゼ","ケプラー","ケンタウリ","コルサント","ナブー","タトゥイーン","キャッシーク","ニビル"];
for(let k=0; k<30; ++k){
    planetNameList.push(generateName());
}
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
var science=[];
var food=[];
let frames=0;
var foodPt=[];
var basicResources=[];
var bRPt=[];
var culture=[];
var culturePt=[];
var parts=[];
var partsPt=[];
var level=[];
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
/*for(const p of planets){
makeTile(p.name);
p.tiles=tiles.length-prod;
prod=tiles.length;
}*/
for(let k=0; k<100; ++k){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height-100
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
var effects;
function hasTech(techName){
    if(techs.findIndex((e)=>e.assign==P && e.status=="発見済" && e.name==techName)!=-1){
    return true;
    }else{
    return false;
    }
}
var earthposition=[0,0,1280,512,0,0,canvas.width,canvas.height-100];
function hasEffect(unitSeed,effectName){
    let i=units.findIndex((e)=>e.seed==unitSeed);
    if(i==-1){
        return false;
    }
    return units[i].effect.indexOf(effectName)!=-1;
}
var editingRegion=0;
function nextTurn(){
    infoScreen=false;
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
        if(hasTech("蒸気機関")){
        u.move=3;
        }else{
            u.move=2;
        }
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
                buildings.push({name:u.b[0],type:u.b[1],str:u.b[2],hp:100,delay:0,x:tiles[u.assign].centroid.x,y:tiles[u.assign].centroid.y,color:"#000000",status:u.b[3],assign:u.assign,level:1,owner:u.owner,planet:u.planet});
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
        if(b.hp<100*(1+0.25*(b.level-1)) && b.owner==P){
        b.hp=b.hp+Math.round(Math.random()*10*b.level);
        }
        if(b.hp>100*(1+0.25*(b.level-1))){
            b.hp=100*(1+0.25*(b.level-1));
        }
        if(b.owner==P){
            b.color="#ff0000";
        }
        }
    P++;
    if(P>=players.length){
        P=0;
        let dy=1;
            if(realisticCalendar){
                dy=Math.ceil(52.5/Math.cosh((turn-45.5)/18.5));
            }
        globalCalender+=dy;
        for(const p of players){
        p.calendar.years+=dy;
        }
        turn++;
    }
    if(techs.findIndex((e)=>e.assign==P && e.tag=="event")!=-1){
        let bi=buttons.findIndex((e)=>e.label=="技術ツリー");
        if(!players[P].ai){
        popTexts.push({value:`${techs[techs.findIndex((e)=>e.assign==P && e.tag=="event")].name}の研究が完了！`,x:buttons[bi].x+buttons[bi].w/2+100,y:buttons[bi].y-10,interval:0,color:"#000000"});
            }
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
    if(players[P].ai){
        for(const u of units){
            if(u.owner==P){
            autoMove(units.findIndex((e)=>e.seed==u.seed));
            }
        }
        for(const b of buildings){
            if(b.owner==P){
            autoWork(buildings.findIndex((e)=>e.seed==b.seed));
            }
        }
        nextTurn();
    }
}
function construction(name,type,str,status,cultureCost){
    if(type=="food"){
        type="🌾";
    }
    if(type=="basicResources"){
        type="⚙";
    }
    if(type=="parts"){
        type="🏭";
    }
    if(type=="culture"){
        type="📖";
    }
    if(type=="defence"){
        type="🛡";
    }
    if(type=="heal"){
        type="❤";
    }
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
        infoScreen=false;
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
            units.push({name:name,type:type,str:str,hp:0,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,fly:false,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2),death:false});
            }else{
    units.push({name:name,type:type,str:str,hp:100,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,fly:false,y:tiles[assign].centroid.y,color:"#000000",status:"待機",assign:assign,owner:P,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2),death:false});
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
            units.push({name:name,type:type,str:str,hp:0,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,fly:false,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2),death:false});
            }else if(assign!=-1){
    units.push({name:name,type:type,str:str,hp:instantHp,armor:armor,armorLevel:armorLevel,armorMax:armor,effect:effect,range:range,move:mp,mp:mp,x:tiles[assign].centroid.x,y:tiles[assign].centroid.y,fly:false,color:"#000000",status:"待機",assign:assign,owner:instantOwner,planet:planet,seed:Math.round(Math.random()*999999),movePath:[],embarked:false,embstr:Math.round(str/2),death:false});
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
    level=[];
    for(const b of buildings){
        b.level=lv;
    }
    for(let k=0; k<players.length;++k){
    level.push(lv);
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
        if(hasEffect(units[i].seed,"短機関銃")){
                        submachinegun();
                        haveSound=true;
                    }
        if(hasEffect(units[i].seed,"火炎放射器")){
                        flamethrower();
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
    let calender=`${Math.abs(globalCalender)}年`;
    if(globalCalender<0){
        calender="紀元前"+calender;
    }
    history.innerHTML=`ターン${turn}.${calender}.${string}<br>${history.innerHTML}`;
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
    writeHistory(`${players[them].name}が平和条約を求めている`);
    //signature(${you});
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
let pastKey="";
let keyInt=0;
window.addEventListener("keydown",(e)=>{
    if(pastKey=="Enter"){
    pastKey=e.code;
    }
    if(keyInt==0){
    keyInt=10;
    if(pastKey=="Enter"){
    nextTurn();
    pastKey="";
    }else{
        pastKey=e.code;
    }
    }
});
function consoleGenerateName(n){
    if(!n){
        n=Math.ceil((Math.random()*10)**2)
    }
    let resa=[];
for(let k=0; k<n; ++k){
    resa.push(`${generateName()}\n`)
}
console.log(resa.join().replaceAll(",",""));
return `${n}個`;
}
function loadcampaign(id){
    regenerateMap(stages[id].hexSize);
    tiles=stages[id].data[0];
    buildings=stages[id].data[1];
    units=stages[id].data[2];
    regions=stages[id].data[3];
    players=stages[id].data[4];
    techs=stages[id].data[5];
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
    level=stages[id].level;
    displayMode="ワールドマップ";
}
function moveEarth(x,y){
    let fix=canvas.width/canvas.height
    let r=50;
    earthposition[0]=x-(r*fix);
    earthposition[1]=y-r;
    earthposition[2]=2*r*fix;
    earthposition[3]=2*r;
}
function attackToUnit(u,enemy){
    let range=u.range;
    if(u.embarked){
        range=1;
    }
                    let indexOfYourUnit=units.findIndex((e)=>e.assign==u.assign && e.owner==u.owner);
    playAttackAnimation(indexOfYourUnit);
                    if(!players[P].ai){
                    attackSound(indexOfYourUnit);
                    }
                    /*ダメージ計算*/
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
                    let damage=Math.ceil(gain*(power/powerEnemy));
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
                        if(hasEffect(u.seed,"短機関銃") && hasEffect(units[enemy].seed,"歩兵")){
                            damage=Math.round(damage*1.50);
                        }
                        if(u.range>=2 && buildings.findIndex((e)=>e.assign==selectedTile && e.name=="塹壕")!=-1 && !hasEffect(units[enemy].seed,"戦車") && !hasEffect(u.seed,"迫撃砲")){
                            damage=Math.round(damage*0.5);
                        }
                        if(hasEffect(u.seed,"火炎放射器") && units[enemy].hp<100){
                            damage=100;
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
                        playAttackAnimation(enemy);
                    let damageEnemy=Math.ceil(gain*(powerEnemy/power));
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
                        if(hasEffect(units[enemy].seed,"短機関銃") && hasEffect(u.seed,"歩兵")){
                            damageEnemy=Math.round(damageEnemy*1.50);
                        }
                        if(units[enemy].range>=2 && buildings.findIndex((e)=>e.assign==u.assign && e.name=="塹壕")!=-1 && !hasEffect(u.seed,"戦車") && !hasEffect(units[enemy].seed,"迫撃砲")){
                            damageEnemy=Math.round(damageEnemy*0.5);
                        }
                        if(hasEffect(units[enemy].seed,"火炎放射器") && u.hp<100){
                            damageEnemy=100;
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
                        //deleteObject("units",units[enemy].assign);
                        //deathアニメーションの実行
                            units[enemy].death=true;
                            if(range>erange){
                            playDeathAnimation(enemy);
                            }
                        }
                    if(u.hp<=0){
                        //deleteObject("units",u.assign);
                        //deathアニメーションの実行
                            u.death=true;
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
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
                    u.color="#bbbbbb";
}
function attackToBuilding(u,enemyBuilding){
    let range=u.range;
    if(u.embarked){
        range=1;
    }
                    let indexOfYourUnit=units.findIndex((e)=>e.assign==u.assign && e.owner==u.owner);
                    if(!players[P].ai){
                    attackSound(indexOfYourUnit);
                    }
                    let power=0;
                    if(u.embarked){
                    power=(u.embstr*(u.hp/100)*(Math.random()*0.5+1));
                    }else{
                    power=(u.str*(u.hp/100)*(Math.random()*0.5+1));
                    }
                    let damage=0;
                    if(buildings[enemyBuilding].type=="🏘"){
                        damage=Math.ceil((gain/2)*(power/(buildings[enemyBuilding].hp/10)));
                        }else{
                        damage=Math.ceil(gain*(power/(buildings[enemyBuilding].hp/10)));
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
                        if(buildings[enemyBuilding].name=="首都" || buildings[enemyBuilding].name=="都市"){
                            buildings[enemyBuilding].hp=50;
                            buildings[enemyBuilding].owner=u.owner;
                            buildings[enemyBuilding].name=="都市";
                            }else{
                        deleteObject("buildings",buildings[enemyBuilding].assign);
                            }
                        }
                    u.move=0;
                    u.status="行動終了";
                        for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
                    u.color="#bbbbbb";
}
function tilesEnemyUnit(id){
    return units.findIndex((e)=>e.assign==id && isEnemy(P,e.owner))!=-1;
}
function tilesEnemyBuilding(id){
    return buildings.findIndex((e)=>e.assign==id && isEnemy(P,e.owner) && e.owner!=100)!=-1;
}
function worldwar(){
    for(const p of players){
        for(const P of players){
            if(p.name!=P.name && p.war.indexOf(P.name)==-1){
                p.war.push(P.name);
            }
        }
    }
}
function saveData(){
    let name="";
    if(saveName.value==""){
        name=Date();
    }else{
        name=saveName.value;
    }
    let savetext="{";
    savetext+=`"players":${JSON.stringify(players)},`;
    savetext+=`"buildings":${JSON.stringify(buildings)},`;
    savetext+=`"tiles":${JSON.stringify(tiles)},`;
    savetext+=`"planets":${JSON.stringify(planets)},`;
    savetext+=`"opinions":${JSON.stringify(opinions)},`;
    savetext+=`"units":${JSON.stringify(units)},`;
    savetext+=`"techs":${JSON.stringify(techs)},`;
    savetext+=`"regions":${JSON.stringify(regions)},`;
    savetext+=`"religions":${JSON.stringify(religions)},`;
    savetext+=`"utils":{
    "turn":${turn},
    "P":${P}
    },`;
    savetext+=`"stats":{
    "level":${JSON.stringify(level)},
    "food":${JSON.stringify(food)},
    "foodPt":${JSON.stringify(foodPt)},
    "basicResources":${JSON.stringify(basicResources)},
    "bRPt":${JSON.stringify(bRPt)},
    "culture":${JSON.stringify(culture)},
    "culturePt":${JSON.stringify(culturePt)},
    "parts":${JSON.stringify(parts)},
    "partsPt":${JSON.stringify(partsPt)}
    },`;
    savetext+=`"world":{
    "hexSize":${hexSize},
    "worldName":"${name}",
    "mapPlanet":${JSON.stringify(mapPlanet)}
    },`;
    savetext+=`"history":"${history.innerHTML}"`;
    savetext+="}";
    const a=document.createElement('a');
    a.download=`${name}.json`;
    var blob = new Blob([savetext], { type: 'text/plain' });
	a.href=URL.createObjectURL(blob);
    a.click();
}
dataSet.addEventListener('change',(e)=>{
    var data;
    if(e.target.files[0]){
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.onload=(e)=> {
            data=JSON.parse(e.target.result);
            newGame=false;
            tiles=data.tiles;
            units=data.units;
            opinions=data.opinions;
            buildings=data.buildings;
            regions=data.regions;
            religions=data.religions;
            players=data.players;
            for(const p of players){
                if(!p.calendar){
                    p.calendar={years:0,name:generateName()};
                }
            }
            techs=data.techs;
            writeHistory(data.history);
            planets=data.planets;
            turn=data.utils.turn;
            P=data.utils.P;
            hexSize=data.world.hexSize;
            worldName=data.world.worldName;
            mapPlanet=data.world.mapPlanet;
            level=data.stats.level;
            food=data.stats.food;
            foodPt=data.stats.foodPt;
            basicResources=data.stats.basicResources;
            bRPt=data.stats.bRPt;
            culture=data.stats.culture;
            culturePt=data.stats.culturePt;
            parts=data.stats.parts;
            partsPt=data.stats.partsPt;
            console.log("セーブデータを読み込みました。")
        };
        reader.readAsText(file);
    }
});
function infoDraw(){
    ctx.fillStyle="#000000a0";
    ctx.fillRect(0,0,canvas.width,canvas.height-100);
    ctx.fillStyle="#ffffff";
    ctx.textAlign="left";
    let workable=true;
    let features="草原";
    if(tiles[selectedTile].type=="Water"){
        features="海洋";
    }
    if(tiles[selectedTile].feature=="Forest"){
        features="森林";
    }
    let tileTerritory=territory(tilesRegion(selectedTile));
    if(tileTerritory==100){
        tileTerritory="未開の地";
    }else{
        tileTerritory=`${players[tileTerritory].name}領`;
    }
    let tileRegion=tilesRegion(selectedTile);
    //部隊がいる場合
    if(units.findIndex((e)=>e.assign==selectedTile)!=-1){
        let u=units[units.findIndex((e)=>e.assign==selectedTile)];
        //動的な場合
        if(u.owner==P && workable){
        let x=canvas.width-350;
        let y=50;
        if(u.name=="首長"){
            //未所有の領土か確かめる
            if(territory(tilesRegion(u.assign))==100){
            ctx.fillStyle="#ffffff";
            ctx.fillRect(x,y,250,125);
            ctx.fillStyle="#000000";
            ctx.fillText("都市を建設",x+125,y+62.5);
            ctx.fillStyle="#ffffff";
            }
        }
            if(hasEffect(u.seed,"労働者")){
                if(territory(tilesRegion(u.assign))==u.owner && buildings.findIndex((e)=>e.assign==u.assign)==-1){
                    //建設可能な建物を表示
                    let x=canvas.width-350;
                    let y=50;
                    ctx.textAlign="center";
                    ctx.fillText(`建設`,x,y-25);
                    for(const b of buildingLists){
                        if(hasTech(b.require.tech) && b.require.civilizationStage<=level[P]){
                            ctx.fillStyle="#ffffff";
                    ctx.fillRect(x,y,200,100);
                    ctx.fillStyle="#000000";
                    ctx.font = "22px serif";
                    ctx.strokeStyle="#000000";
                    ctx.beginPath();
                    ctx.lineTo(x,y+37);
                    ctx.lineTo(x+200,y+30);
                    ctx.stroke();
                    ctx.closePath();
                            if(b.type=="food"){
                            ctx.fillText(`食料+${b.str}`,x+100,y+50);
                            }
                            if(b.type=="basicResources"){
                            ctx.fillText(`物資+${b.str}`,x+100,y+50);
                            }
                            if(b.type=="parts"){
                            ctx.fillText(`部品+${b.str}`,x+100,y+50);
                            }
                            if(b.type=="culture"){
                            ctx.fillText(`文化+${b.str}`,x+100,y+50);
                            }
                            if(b.type=="defence"){
                            ctx.fillText(`この上で戦闘力+${b.str}`,x+100,y+50);
                            }
                            ctx.fillText(`${b.name}`,x+100,y+20);
                            y+=120;
                    if(y+100>canvas.height-100){
                        x-=225;
                        y=50;
                    }
                        }
                    }
                }else{
                    //破壊
                }
            }
        }
    }
    //建物がある場合
    if(buildings.findIndex((e)=>e.assign==selectedTile)!=-1){
        let b=buildings[buildings.findIndex((e)=>e.assign==selectedTile)];
        let additional="";
        features=b.name;
        if(b.name=="首都" || b.name=="都市"){
            additional=`${b.str}`;
            features="市街地";
        }
            let x=canvas.width-350;
            let y=50;
            ctx.textAlign="center";
            //自分の都市のとき
            if(b.owner==P && workable){
            ctx.fillText(`生産`,x,y-25);
            for(const u of unitLists){
                if((u.require.building==b.name || (u.require.building=="都市" && b.name=="首都")) && u.require.buildingLevel<=b.level && hasTech(u.require.tech) && (u.require.civilizationStage==level[P] || u.require.civilizationStage==-1)){
                    ctx.fillStyle="#ffffff";
                    ctx.fillRect(x,y,250,125);
                    ctx.fillStyle="#000000";
                    ctx.font = "22px serif";
                    ctx.strokeStyle="#000000";
                    ctx.beginPath();
                    ctx.lineTo(x,y+37)
                    ctx.lineTo(x+250,y+37)
                    ctx.stroke();
                    ctx.closePath();
                    ctx.fillText(`パワー${u.strength}  移動力${u.movement}`,x+125,y+75);
                    let unitRange=`射程${u.range}  `;
                    if(u.range==1){
                        unitRange="";
                    }
                    let armor;
                    let armorValue=u.armor.value;
                    if(u.armor.value==0){
                        armor="";
                        armorValue="";
                    }
                    if(u.armor.level==1){
                        armor="軽装甲"
                    }
                    if(u.armor.level==2){
                        armor="中装甲"
                    }
                    if(u.armor.level==3){
                        armor="重装甲"
                    }
                    let cost="";
                    let waitTime=0;
                    let wt=0;
                    if(u.cost[0]>food[P]){
                        wt=Math.ceil((u.cost[0]-food[P])/foodPt[P]);
                        if(waitTime<wt){
                            waitTime=wt;
                        }
                    }
                    if(u.cost[1]>basicResources[P]){
                        wt=Math.ceil((u.cost[1]-basicResources[P])/bRPt[P]);
                        if(waitTime<wt){
                            waitTime=wt;
                        }
                    }
                    if(u.cost[2]>parts[P]){
                        wt=Math.ceil((u.cost[2]-parts[P])/partsPt[P]);
                        if(waitTime<wt){
                            waitTime=wt;
                        }
                    }
                    if(waitTime==0){
                        waitTime="";
                    }else{
                        waitTime=`⌛️${waitTime}`;
                    }
                    if(u.cost[0]>0){
                        cost+=`🌾${u.cost[0]}`;
                    }
                    if(u.cost[1]>0){
                        cost+=`⚙${u.cost[1]}`;
                    }
                    if(u.cost[2]>0){
                        cost+=`🏭️${u.cost[2]}`;
                    }
                    ctx.fillText(`${unitRange}${armor}${armorValue}`,x+125,y+100);
                    ctx.fillText(`費用:${cost}`,x+125,y+50);
                    ctx.fillText(`${waitTime}${u.name}`,x+125,y+20);
                    y+=145;
                    if(y+125>canvas.height-100){
                        x-=275;
                        y=50;
                    }
            }
        }
            }
        ctx.textAlign="left";
        ctx.fillStyle="#ffffff";
        ctx.font = "30px serif";
        ctx.fillText(`${b.name}${additional}  レベル${b.level}`,100,300);
    }
    ctx.font = "50px serif";
    ctx.fillText(`タイル${selectedTile}  ${features}`,100,100);
    ctx.font = "30px serif";
    ctx.fillText(`${regions[tileRegion][3]}${tileTerritory}`,100,150);
    ctx.textAlign="center";
    ctx.font = "22px serif";
}
function unitId(seed){
    return units.findIndex((e)=>e.seed==seed);
}
function spawn(name,owner){
    let id=unitLists.findIndex((e)=>e.name==name);
    const u=unitLists[id];
    train(u.name,u.type,u.strength,u.range,u.movement,u.armor.value,u.armor.level,u.effect,selectedTile,[0,0,0],owner);
}
function playAttackAnimation(id){
    let u=units[id];
    if(u.name=="短機関銃兵"){
        units[id].animation.mode="射撃";
        units[id].animation.changeIntMax=4;
        units[id].animation.stop=40;
    }
}
function playDeathAnimation(id){
    let u=units[id];
    u.animation.interval=0;
    u.animation.keyIndex=0;
    u.animation.changeInterval=0;
    u.animation.mode="死亡";
    if(u.name=="短機関銃兵"){
        u.animation.changeIntMax=8;
        u.animation.keyList=[4,2,3,3,3,3,3];
        u.animation.stop=40;
    }
    u.animation.key=u.animation.keyList[0];
}
function playSelectAnimation(id){
    let u=units[id];
    u.animation.interval=0;
    u.animation.keyIndex=0;
    u.animation.changeInterval=0;
    u.animation.mode="選択";
    u.animation.stop=0;
    if(u.name=="短機関銃兵"){
        u.animation.changeIntMax=8;
        u.animation.keyList=[0,1,1];
        u.animation.stop=16;
    }
    if(u.name=="火炎放射兵"){
        u.animation.changeIntMax=8;
        u.animation.keyList=[0,1,1];
        u.animation.stop=16;
    }
    u.animation.key=u.animation.keyList[0];
}
function playWalkAnimation(id){
    let u=units[id];
    u.animation.interval=0;
    u.animation.keyIndex=0;
    u.animation.changeInterval=0;
    u.animation.mode="移動";
        u.animation.changeIntMax=8;
        u.animation.keyList=[0,1];
        u.animation.stop=-1;
    u.animation.key=u.animation.keyList[0];
}
function createCivilization(tileId,id){
    let t=tiles[tileId];
    buildings.push({name:"首都",type:"🏘",str:generateName(),hp:100,delay:0,x:t.centroid.x,y:t.centroid.y,color:"#000000",status:"待機",assign:tileId,level:1,owner:units[id].owner,planet:t.planet});
    writeHistory(`${regions[tilesRegion(t.id)][3]}タイル${t.id}で${players[units[id].owner].name}文明が創始された！`);
    h.deleteObject("units",id);
}