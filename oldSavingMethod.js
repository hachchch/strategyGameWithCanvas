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
        let cpu="false";
        if(players[k].ai){
            cpu="true";
        }
        res+=`{name:"${players[k].name}",discoveredPlanets:[${discoveredPlanets}],war:[${war}],color:"${players[k].color}",ai:${cpu}}`;
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