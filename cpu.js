function autoMove(id){
    units[id].movePath=tryPath(units[id].assign,-1,units[id].move,units[id],true);
    if(units[id].movePath.length>0){
        const now=units[id].assign;
        let randWark=true;
        if(units[id].name=="労働者" && units[id].status!="建設中"){
            let goTo=[];
            for(const p of units[id].movePath){
                let tid=p[p.length-1];
                if(tid && tid!=-1 && territory(tilesRegion(tid))==P && buildings.findIndex((e)=>e.assign==tid)==-1 && units.findIndex((e)=>e.assign==tid)==-1){
                    goTo.push(tid);
                }
            }
            if(goTo.length>0){
                goTo=goTo[Math.round(Math.random()*(goTo.length-1))];
                units[id].assign=goTo;
    units[id].x=tiles[units[id].assign].centroid.x;
    units[id].y=tiles[units[id].assign].centroid.y;
                randWark=false;
            }
        }else if(units[id].status!="建設中"){
            if(players[P].war.length>0){
            randWark=false;
            }
        }
        if(units[id].name=="労働者"){
                if(units[id].status!="建設中"){
                    autoConstruction(id);
                }else{
                    randWark=false;
                }
            }
        if(randWark){
            if(Math.random()<0.5){
        let loop=0;
        while((territory(tilesRegion(units[id].assign))!=P && territory(tilesRegion(units[id].assign))!=100) || units.findIndex((e)=>e.assign==units[id].assign && e.seed!=units[id].seed)!=-1 || loop==0){
    let moveTo=Math.round(Math.random()*(units[id].movePath.length-1));
        moveTo=units[id].movePath[moveTo][units[id].movePath[moveTo].length-1];
    if(moveTo && moveTo!=-1){
    units[id].assign=moveTo;
    units[id].x=tiles[units[id].assign].centroid.x;
    units[id].y=tiles[units[id].assign].centroid.y;
            }
            loop++;
            if(loop>100){
                units[id].assign=now;
    units[id].x=tiles[units[id].assign].centroid.x;
    units[id].y=tiles[units[id].assign].centroid.y;
                break;
            }
        }
        }
            }else if(units[id].name!="労働者"){
        let attract=players[P].war[0];
            let nearestE=99999;
            let eid=0;
            let atype=0;
            for(const u of units){
                if(u.owner==players.findIndex((p)=>p.name==attract)){
                    let range=Math.hypot(u.x-units[id].x,u.y-units[id].y);
                    if(nearestE>range){
                        nearestE=range;
                        atype=0;
                        eid=units.findIndex((e)=>e.seed==u.seed);
                    }
                }
            }
            for(const u of buildings){
                if(u.owner==players.findIndex((p)=>p.name==attract)){
                    let range=Math.hypot(u.x-units[id].x,u.y-units[id].y);
                    if(nearestE>range){
                        nearestE=range;
                        atype=1;
                        eid=buildings.findIndex((e)=>e.seed==u.seed);
                    }
                }
            }
            let res=[];
            let nearest=99999;
            let path=-1;
            for(const mvres of units[id].movePath){
                if(mvres.length>0){
                    let arrive=mvres[mvres.length-1];
                    if(units.findIndex((e)=>e.assign==arrive)==-1 && buildings.findIndex((e)=>e.assign==arrive && e.owner!=P)==-1){
                    res.push(arrive);
                    //到着点を検証
                    let dist=-1;
                    if(atype==0){
                        dist=Math.hypot(tiles[arrive].centroid.x-units[eid].x,tiles[arrive].centroid.y-units[eid].y);
                    }else{
                        dist=Math.hypot(tiles[arrive].centroid.x-buildings[eid].x,tiles[arrive].centroid.y-buildings[eid].y);
                    }
                    if(nearest>dist){
                        nearest=dist;
                        path=arrive;
                    }
                }
                }
            }
            if(path!=-1){
            units[id].assign=path;
    units[id].x=tiles[units[id].assign].centroid.x;
    units[id].y=tiles[units[id].assign].centroid.y;
                }
        }
    }
    let range=units[id].range;
    if(units[id].embarked){
        range=1;
    }
    units[id].attackPath=tilesPath(units[id].assign,range);
    if(units[id].attackPath.length>0 && units[id].name!="労働者"){
        let res=[];
        let resb=[];
        for(const apres of units[id].attackPath){
            let ap=apres[apres.length-1];
            if(tilesEnemyUnit(ap)){
                res.push(ap);
            }else if(tilesEnemyBuilding(ap)){
                resb.push(ap);
            }
        }
        let total=res.length+resb.length;
        if(total>0){
            let target=-1;
        if(Math.random()*total<res.length){
            target=res[Math.round(Math.random()*(res.length-1))];
        attackToUnit(units[id],units.findIndex((e)=>target==e.assign));
        }else{
            target=resb[Math.round(Math.random()*(resb.length-1))];
        attackToBuilding(units[id],buildings.findIndex((e)=>target==e.assign));
        }
        }
    }
}
function autoWork(id){
    let cities=[];
    for(const b of buildings){
        if(b.owner==P){
            if(b.name=="都市" || b.name=="首都"){
                if(units.findIndex((e)=>e.assign==b.assign)==-1){
                cities.push(b);
                }
            }
        }
    }
    let workerAmount=0;
    for(const u of units){
        if(u.owner==P && u.name=="労働者"){
            workerAmount++;
        }
    }
    //ユニット生産
    for(const b of buildings){
        if(b.owner==P){
        let spawnableUnits=[];
    for(const u of unitLists){
        if((u.require.building==b.name || (u.require.building=="都市" && b.name=="首都")) && u.require.buildingLevel<=b.level && hasTech(u.require.tech) && (u.require.civilizationStage==level[P] || u.require.civilizationStage==-1)){
                if(u.cost[0]<=food[P] && u.cost[1]<=basicResources[P] && u.cost[2]<=parts[P]){
                    spawnableUnits.push([u.name,u.type,u.strength,u.range,u.movement,u.armor.value,u.armor.level,u.effect,b.assign,u.cost]);
                    }
        }
        }
        if(spawnableUnits.length>0){
            let seed=Math.round(Math.random()*(spawnableUnits.length-1));
            if(workerAmount<cities.length && (b.name=="首都" || b.name=="都市")){
                if(food[P]>=8){
                seed=spawnableUnits.findIndex((e)=>e[0]=="労働者");
                train(spawnableUnits[seed][0],spawnableUnits[seed][1],spawnableUnits[seed][2],spawnableUnits[seed][3],spawnableUnits[seed][4],spawnableUnits[seed][5],spawnableUnits[seed][6],spawnableUnits[seed][7],spawnableUnits[seed][8],spawnableUnits[seed][9]);
                    }
            }else{
                if(!(spawnableUnits[seed][0]=="労働者" && workerAmount>cities.length+2)){
            if(Math.random()<(((food[P]+basicResources[P]+parts[P])*3)/(spawnableUnits[seed][9][0]+spawnableUnits[seed][9][1]+spawnableUnits[seed][9][2]))){
            train(spawnableUnits[seed][0],spawnableUnits[seed][1],spawnableUnits[seed][2],spawnableUnits[seed][3],spawnableUnits[seed][4],spawnableUnits[seed][5],spawnableUnits[seed][6],spawnableUnits[seed][7],spawnableUnits[seed][8],spawnableUnits[seed][9]);
            }
            }
                }
        }
        }
        }
    autoResearch(id);
}
function autoResearch(id){
    if(techs.findIndex((e)=>e.assign==P && e.status=="未発見")!=-1 && techs.findIndex((e)=>e.assign==P && e.status2=="選択中")==-1){
    const researchable=[];
        for(const t of techs){
            if(t.assign==P && t.status=="未発見"){
                researchable.push(techs.findIndex((e)=>e.name==t.name && e.assign==P));
            }
        }
        if(researchable.length>0){
            let seed=Math.round(Math.random()*(researchable.length-1));
            techs[researchable[seed]].status2="選択中";
        }
    }
}
function autoConstruction(id){
    if(buildings.findIndex((e)=>units[id].assign==e.assign)==-1 && territory(tilesRegion(units[id].assign))==P){
    let constructable=[];
    for(const b of buildingLists){
        if(b.require.civilizationStage==P && hasTech(b.require.tech)){
            constructable.push([b.name,b.type,b.str,"待機",b.cultureCost]);
        }
    }
        let seed=Math.round(Math.random()*(constructable.length-1));
        if(constructable.findIndex((e)=>e.str>constructable[seed].str && e.type==constructable[seed].type)!=-1){
            seed=constructable.findIndex((e)=>e.str>constructable[seed].str && e.type==constructable[seed].type);
        }
        units[id].status="建設中";
        units[id].str=constructable[seed][0];
        units[id].b=[constructable[seed][0],constructable[seed][1],constructable[seed][2],constructable[seed][3],units[id].owner];
        if(units[id].b[1]=="defence"){
        units[id].b[1]="🛡";
        }
        if(units[id].b[1]=="food"){
        units[id].b[1]="🌾";
    }
    if(units[id].b[1]=="basicResources"){
        units[id].b[1]="⚙";
    }
    if(units[id].b[1]=="parts"){
        units[id].b[1]="🏭";
    }
    if(units[id].b[1]=="culture"){
        units[id].b[1]="📖";
    }
    if(units[id].b[1]=="heal"){
        units[id].b[1]="❤";
    }
    }
}