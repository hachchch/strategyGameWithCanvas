class hachchchctx{
    toAngle(x,y,x2,y2){
        return Math.atan2(x2-x,y2-y);
    }
    toMoveX(x,y,x2,y2){
        return Math.cos(Math.atan2(x2-x,y2-y));
    }
    toMoveY(x,y,x2,y2){
        return Math.sin(Math.atan2(x2-x,y2-y));
    }
    collisionRect(x,y,width,height,otherX,otherY,otherWidth,otherHeight){
        if(!otherWidth || !otherHeight){
            otherWidth=0;
            otherHeight=0;
            }
    if(Math.abs((x+width/2)-otherX)<=(width+otherWidth)/2 && Math.abs((y+height/2)-otherY)<=(height+otherHeight)/2){
    return true;
    }else{
    return false;
    }
    }
    collisionArc(x,y,radius,otherX,otherY,otherRadius){
        let radA=Math.atan2(otherY-y,otherX-x);
        let radB=Math.atan2(y-otherY,x-otherX);
        let Ax=Math.cos(radA)*radius;
        let Ay=(-1)*Math.sin(radA)*radius;
        let Bx=(Math.cos(radB)*otherRadius)+otherX;
        let By=((-1)*Math.sin(radB)*otherRadius)+otherY;
        if(Math.abs(Bx-x)<=Math.abs(Ax) && Math.abs(By-y)>=Math.abs(Ay)){
            return true;
        }else{
            return false;
        }
    }
    rect(x,y,width,height,outlineSize,outlineColor,innerColor){
    if(!outlineSize){
        outlineSize=1;
        }
    ctx.beginPath();
    if(outlineColor){
    ctx.fillStyle=outlineColor;
        }
    ctx.fillRect(x-(width/2),y-(height/2),width,height);
    ctx.clearRect(x-(width/2)+outlineSize,y-(height/2)+outlineSize,width-outlineSize*2,height-outlineSize*2);
        if(innerColor){
    ctx.fillStyle=innerColor;
    ctx.fillRect(x-(width/2)+outlineSize,y-(height/2)+outlineSize,width-outlineSize*2,height-outlineSize*2);
            }
    ctx.closePath();
    }
    deleteObject(objects,index){
    let syntax=objects+`.push("dammy");
`+objects+`.length=`+objects+`.copyWithin(index,`+objects+`.length-1).length-1;
`+objects+`.length=`+objects+`.copyWithin(index,index+1).length-1;`;
    eval(syntax);
    }
}