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
    tiles.push({id:tiles.length,hexX:hexX,hexY:hexY,centroid:{x:hexX-hexSize*0.5,y:hexY+hexSize*Math.sin(2*Math.PI/3)},type:t,status:"待機",planet:planet,feature:""});
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
function makeRegion(){
    for(const p of planets){
        let assigned=0;
        while(assigned<p.tiles){
            let ocean=false;
            if(p.name==planets[0].name){
                if(regions.length==2 || regions.length==4){
                ocean=true;
                }
                if(hexSize<60){
                    if(Math.random()<0.3){
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
                    if(r[1].indexOf(g)!=-1 || !g || g==-1){
                        detect=true;
                    }
                }
                if(!detect){
                    if(ocean){
                        //島にならない確率5%
                        if(Math.random()<0.95){
                        if(g!=-1){
                        tiles[g].type="Water";
                            }
                        }
                    }
                    regions[regions.length-1][1].push(g);
                    assigned++;
                    //console.log(assigned);
                }
            }
    }
}
    editingRegion=regions[0][3];
    return regions
}
function planetWeight(id){
    let res=[0,0];
    for(let k=id-1; k>=0; --k){
        res[0]+=planets[k].tiles;
    }
    res[1]=res[0]+planets[id].tiles;
    return res;
}
function generateFeature(){
    let ecoregion=tilesPath(Math.round(Math.random()*(planets[0].tiles-1)),Math.round(Math.random()*2+1));
    for(const e of ecoregion){
        let id=e[e.length-1];
        console.log(id);
        if(id!=-1 && id && tiles[id].type=="Land"){
            if(Math.random()<0.5){
                tiles[id].feature="Forest";
            }
        }
    }
}
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
function setup(){
mapPlanet=[];
    let era=document.querySelector("#eras").value;
if(era!="石器時代"){
    if(era=="古代"){
    globalCalender=-400;
    }
    if(era=="中世"){
    globalCalender=500;
    }
    if(era=="産業時代"){
    globalCalender=1760;
    }
    if(era=="情報化時代"){
    globalCalender=1980;
    }
    if(era=="未来"){
    globalCalender=2045;
    }
    realisticCalendar=false;
}else{
    globalCalender=-1000;
}
for(const p of players){
    mapPlanet.push(p.discoveredPlanets[0]);
    science.push(4);
    food.push(5);
    foodPt.push(1);
    basicResources.push(2);
    bRPt.push(1);
    culture.push(10);
    culturePt.push(2);
    parts.push(0);
    partsPt.push(0);
    level.push(1);
    p.calendar.years=globalCalender;
}
for(let k=0; k<players.length; ++k){
    discovery("石器",k);
    discovered("石器",k);
    opinions.push({
        policy:{democracy:5,fascism:5},
        diplomacy:{warmonger:5,pacifisist:5},
        economy:{capitalism:5,socialism:5},
        morale:30
    });
}
let loop=0;
let seed1=Math.round(Math.random()*planets[0].tiles);
let seed2=Math.round(Math.random()*planets[0].tiles);
while(tiles[seed1].type=="Water"){
    seed1=Math.round(Math.random()*planets[0].tiles);
}
let randomCity=[seed1,seed2];

train("首長","⚔",8,1,2,0,0,["剣","歩兵"],randomCity[0],[0,0,0],0);

for(let k=1; k<players.length; ++k){
let assign=-1;
while(assign==-1/*|| (buildings.findIndex((e)=>Math.abs(e.x-tiles[assign].centroid.x)>=500 && Math.abs(e.y-tiles[assign].centroid.y)>=500)!=-1)*/){
    if(loop>0){
        deleteObject("buildings",assign,true);
    }
    assign=-1;
    while(assign==-1 || tiles[assign].type=="Water" || territory(tilesRegion(assign))!=100){
        assign=Math.round(Math.random()*(planets[0].tiles-1));
    }
    loop++;
    if(loop>100){
        break;
    }
    }
    train("首長","⚔",8,1,2,0,0,["剣","歩兵"],assign,[0,0,0],k);
    loop=0;
    }
}
function regionDebug(){
    let res=[];
    let tileAmount=[];
    for(const t of tiles){
        tileAmount[t.id]=0;
        for(const r of regions){
            if(r[1].indexOf(t.id)!=-1){
                tileAmount[t.id]++;
            }
        }
    }
    for(let k=0; k<tileAmount.length; ++k){
        if(tileAmount[k]!=1){
            res.push([tileAmount[k],k]);
        }
    }
    return res;
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
    for(let k=0; k<2; ++k){
    generateFeature()
    }
}