canvas.addEventListener("click",(evt)=>{
    if(editar===true){
        for(const t of tiles){
            if(h.collisionHex(t.hexX-90,t.hexY,60,mouse.x,mouse.y) && mapPlanet[P]==t.planet && !infoScreen){
                selectedTile=t.id;
                if(buildMode==2){
                    if(buildings.findIndex((e)=>e.assign==selectedTile)!=-1){
                        let index=buildings.findIndex((e)=>e.assign==selectedTile);
                        buildings[index].level++;
                        if(buildings[index].str!="" && buildings[index].name!="都市" && buildings[index].name!="首都"){
                            const prestr=buildings[index].str;
                            const type=buildings[index].type;
                        buildings[index].str=Math.round(buildings[index].str*1.25)+1;
                            if(type=="🌾"){
                foodPt[P]+=(buildings[index].str-prestr);
                }else if(type=="⚙"){
                bRPt[P]+=(buildings[index].str-prestr);
                }else if(type=="📖"){
                culturePt[P]+=(buildings[index].str-prestr);
                }else if(type=="🏭"){
                partsPt[P]+=(buildings[index].str-prestr);
                }
                        }
                        buildings[index].hp=75+25*buildings[index].level;
                        if(buildings[index].name=="首都"){
                            level[buildings[index].owner]++;
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
                        let str=buildings[buildings.findIndex((e)=>e.assign==selectedTile && e.name!="首都")].str;
                        let type=buildings[buildings.findIndex((e)=>e.assign==selectedTile && e.name!="首都")].type;
                        if(type=="🌾"){
                foodPt[P]-=(str);
                }else if(type=="⚙"){
                bRPt[P]-=(str);
                }else if(type=="📖"){
                culturePt[P]-=(str);
                }else if(type=="🏭"){
                partsPt[P]-=str;
                }
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
        if(mouse.y>canvas.height-100 && !infoScreen){
            selectedTile=-1;
            }
    }else{
        for(const t of tiles){
            if(h.collisionHex(t.hexX-90,t.hexY,60,mouse.x,mouse.y) && mapPlanet[P]==t.planet && !infoScreen){
                selectedTile=t.id;
            }
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
                if(!hasTech(t.name)){
                discovered(t.name,t.assign);
                }
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
        if((h.collisionRect(b.x,b.y,b.w,b.h,mouse.x,mouse.y) && ((displayMode==b.display && !(b.display=="スタート前" && historical)) || (b.display=="地図" && historical))) || (h.collisionRect(b.x,b.y,b.w,b.h,mouse.x,mouse.y) && editar===true && b.display=="エディタ")){
            if((b.label!="宇宙空間" || buildings.findIndex((e)=>e.owner==P && e.name=="宇宙基地")!=-1 || buildings.findIndex((elem)=>elem.name=="ハッブル宇宙望遠鏡" && elem.owner==P)!=-1 || players[P].discoveredPlanets.length>1) || (b.label!="政府" || hasEffect("政府"))){
            document.querySelector("#description").innerHTML="";
            b.status="選択中";
            b.interval=3;
                }
        }
    }
    for(const b of buildings){
        if(b.planet==mapPlanet[P] && !infoScreen){
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
    if(u.planet==mapPlanet[P] && !infoScreen){
    if(u.owner==P){
        if(Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2){
            playSelectAnimation(unitId(u.seed));
        }
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
    /*if(!hasEffect(u.seed,"航空機")){
            let pathableTile=tryPath(u.assign,selectedTile,u.move,u,true);
            //console.log(pathableTile)
                for(const t of tiles){
                    if(pathableTile.findIndex((e)=>e.indexOf(t.id)!=-1)!=-1){
                        t.status="移動可能";
                    }
                }
        }*/
    }else{
                if(Math.abs(mouse.x-u.x)<hexSize*0.75 && Math.abs(mouse.y-u.y)<hexSize*Math.sqrt(3)/2 && u.status=="選択中"){
                u.status="待機";
                    for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
                u.color="#000000";
                    }
        }
    if(u.status=="選択中"){
        let range=u.range;
                if(u.embarked){
                    range=1;
                }
        if(!hasEffect(u.seed,"航空機")){
            let pathableTile=tryPath(u.assign,selectedTile,u.move,u,true);
            //console.log(pathableTile)
                for(const t of tiles){
                    if(pathableTile.findIndex((e)=>e.indexOf(t.id)!=-1)!=-1){
                        t.status="移動可能";
                    }
                }
        }
        /*攻撃が届くか判定*/
                u.attackPath=tilesPath(u.assign,range);
                let apres=[];
                for(var ap of u.attackPath){
                    ap=ap[ap.length-1];
                    if(units.findIndex((elem)=>ap==elem.assign && isEnemy(u.owner,elem.owner))!=-1 || buildings.findIndex((elem)=>ap==elem.assign && isEnemy(u.owner,elem.owner) && elem.owner!=100)!=-1){
                        let uid=units.findIndex((elem)=>ap==elem.assign && isEnemy(u.owner,elem.owner));
                        if(uid!=-1){
                        if(!((!hasEffect(u.seed,"海軍") && hasEffect(units[uid].seed,"潜水")) || (hasEffect(u.seed,"火炎放射器") && !hasEffect(units[uid].seed,"歩兵")) || (!hasEffect(units[uid].seed,"海軍") && hasEffect(u.seed,"潜水") && !units[uid].embarked))){
                        tiles[ap].status="攻撃可能";
                        apres.push(ap);
                        }
                            }else{
                            tiles[ap].status="攻撃可能";
                            apres.push(ap);
                            }
                    }
                }
                u.attackPath=apres;
            if(selectedTile!=-1){
            if(h.collisionHex(tiles[selectedTile].hexX-hexSize*1.5,tiles[selectedTile].hexY,hexSize,mouse.x,mouse.y) && units.findIndex((elem)=>selectedTile==elem.assign && elem.owner==P)==-1){
            if((Math.abs(u.x-tiles[selectedTile].centroid.x)<(hexSize*1.5*range+2) && Math.abs(u.y-tiles[selectedTile].centroid.y)<hexSize*Math.sqrt(3)*range+2) && u.fly===false){
                if(hasEffect(u.seed,"空母") && u.attackPath.indexOf(selectedTile)!=-1){
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
                    for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
                }else if(u.type!="🛩" && u.type!="✈" && u.type!="🚀" && ((hasEffect(u.seed,"ミサイルランチャー") && u.embarked) || (!hasEffect(u.seed,"ミサイルランチャー")))){
                    //console.log(u.attackPath.indexOf(selectedTile),u.attackPath);
                if(units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1 && u.attackPath.indexOf(selectedTile)!=-1){
                    attackToUnit(u,units.findIndex((elem)=>elem.assign==selectedTile && elem.owner!=P));
                    }else if(buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P  && elem.owner!=100)!=-1 && u.attackPath.indexOf(selectedTile)!=-1){
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
                            buildings[enemyBuilding].name="都市";
                            buildings[enemyBuilding].type="🏠";
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
                    }
                    }else if(hasEffect(u.seed,"ミサイルランチャー") && !u.embarked){
                    if(u.attackPath.indexOf(selectedTile)!=-1 && units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
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
                        }else if(u.attackPath.indexOf(selectedTile)!=-1 && buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
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
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
                    u.color="#bbbbbb";
                            }
                        
                    }
                    }else if(u.attackPath.indexOf(selectedTile)!=-1 && units.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,units[units.findIndex((e)=>e.assign==selectedTile)].owner)){
                    u.assignCamp=u.assign;
                    u.assign=selectedTile;
                    u.status="哨戒";
                        for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
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
                }else if(u.attackPath.indexOf(selectedTile)!=-1 && buildings.findIndex((elem)=>selectedTile==elem.assign && elem.owner!=P)!=-1){
                    if(isEnemy(P,buildings[buildings.findIndex((e)=>e.assign==selectedTile)].owner)){
                        u.assignCamp=u.assign;
                    u.assign=selectedTile;
                    u.status="哨戒";
                        for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
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
                        playWalkAnimation(unitId(u.seed));
            u.path=tryPath(u.assign,selectedTile,u.move,u);
            u.move-=u.path.length;
            u.assign=selectedTile;
            u.status="移動";
                        for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
                            t.status="待機";
                        }
                    }
                        }else if(u.name!="戦闘用ドローン" && hasTech("算術")){
                        u.embarked=true;
                        u.move=0;
                        u.path=[u.assign,selectedTile];
                        u.assign=selectedTile;
                        u.status="移動";
                        for(const t of tiles){
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
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
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
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
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
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
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
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
                        if(t.status=="移動可能" || t.status=="攻撃可能"){
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
    document.querySelector("#information").innerHTML="";
    if(!infoScreen){
    for(const u of units){
        //if(u.planet==mapPlanet[P]){
    for(const b of buildings){
        //if(b.planet==mapPlanet[P]){
    if(Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2 && b.assign==selectedTile && units.findIndex((elem)=>elem.assign==b.assign)==-1){
        document.querySelector("#information").innerHTML=b.name+"<br>体力"+b.hp+"<br>生産:"+b.type+b.str;
        }/*else if(u.type!="⚒" && Math.abs(u.x-mouse.x)<hexSize*0.75 && Math.abs(u.y-mouse.y)<hexSize*Math.sqrt(3)/2 && u.assign==selectedTile){
        }*/
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
        if(!u.embarked || editar){
        if(territory(tilesRegion(u.assign))==u.owner || (editar===true && buildMode==1)){
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
        if(territory(tilesRegion(u.assign))==u.owner || (editar===true && buildMode==1)){
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
        if(editar){
            document.querySelector("#information").innerHTML+=`<input type="button" value="塹壕" onclick="buildings.push({name:'塹壕',type:'🕳️',str:'',hp:100,delay:0,x:tiles[${selectedTile}].centroid.x,y:tiles[${selectedTile}].centroid.y,color:'#000000',status:'待機',assign:${selectedTile},level:1,owner:100,planet:'${mapPlanet[P]}'});" /><br>`;
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
            }
            if(selectedTile!=-1){
            if(u.embarked || (editar && tiles[selectedTile].type=="Water")){
            if(nearLand(u.seed) || editar){
                if(level[P]>=2){
            document.querySelector("#information").innerHTML=`<input type="button" value="湾港" onclick="construction(this.value,'⚓','','待機')" />`;
                    }
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
        }
        if(b.status=="選択中" && (b.name=="市場") && b.delay==0 && Math.abs(b.x-mouse.x)<hexSize*0.75 && Math.abs(b.y-mouse.y)<hexSize*Math.sqrt(3)/2){
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
        }
    }
    }
        }else{
        //infoScreenなら
        if(selectedTile!=-1){
        let unit=units.findIndex((e)=>e.assign==selectedTile);
        let building=buildings.findIndex((e)=>e.assign==selectedTile);
        let unitIsThere=false;
        let x=canvas.width-350;
        let y=50;
        function collision(x,y,dx,dy){
            return mouse.x>x && mouse.x<x+dx && mouse.y>y && mouse.y<y+dy
        }
            if(unit!=-1){
                let u=units[unit];
                unitIsThere=true;
                if(u.owner==P){
                    if(u.name=="首長"){
                        if(territory(tilesRegion(u.assign))==100){
                            if(collision(x,y,250,125)){
                                createCivilization(u.assign,unitId(u.seed));
                            }
                        }
                    }
                    if(hasEffect(u.seed,"労働者")){
                        if(territory(tilesRegion(u.assign))==u.owner && buildings.findIndex((e)=>e.assign==u.assign)==-1){
                            for(const b of buildingLists){
                                if(hasTech(b.require.tech) && b.require.civilizationStage<=level[P]){
                                    if(collision(x,y,200,100)){
                                        let type=b.type;
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
                                        construction(b.name,type,b.str,"待機",b.cultureCost);
                                        infoScreen=false;
                                    }
                                    y+=120;
                                    if(y+100>canvas.height-100){
                                        x-=225;
                                        y=50;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            x=canvas.width-350;
            y=50;
            if(building!=-1){
                let b=buildings[building];
            if(b.owner==P){
            if(b.name=="都市" || b.name=="首都"){
        for(const u of unitLists){
                if((u.require.building==b.name || (u.require.building=="都市" && b.name=="首都")) && u.require.buildingLevel<=b.level && hasTech(u.require.tech) && (u.require.civilizationStage==level[P] || u.require.civilizationStage==-1)){
                    if(collision(x,y,250,125)){
                        if(u.cost[0]<=food[P] && u.cost[1]<=basicResources[P] && u.cost[2]<=parts[P]){
                            train(u.name,u.type,u.strength,u.range,u.movement,u.armor.value,u.armor.level,u.effect,selectedTile,u.cost);
                        }else{
                            alert("資源が足りません");
                        }
                    }
                    y+=145;
                    if(y+125>canvas.height-100){
                        x-=275;
                        y=50;
                    }
                }
            }
                }
            }
                }
            }
        }
});