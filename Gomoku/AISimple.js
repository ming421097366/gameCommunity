/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var  scores=[];

var SITUATION_BAD=1234+0;
var SITUATION_GOOD=1234+1;
var SITUATION_GOOD_TWO=1234+2;
var SITUATION_GOOD_THREE=1234+3;
var SITUATION_GOOD_FOUR=1234+4;
var SITUATION_BAD_TWO=1234+5;
var SITUATION_BAD_THREE=1234+6;
var SITUATION_BAD_FOUR=1234+7;
var SITUATION_ONE=1234+8;
var SITUATION_FIVE=1234+9;



        


function initialScores()
{
    for(var i=0;i<15;i++)
    {
        scores[i]=[];
        for(var j=0;j<15;j++)
        {
            scores[i][j]=0;
        }
    }
}

function getAIPos(AIRole)
{
    initialScores();
    var attackChoose=[];
    var defendChoose=[];
    var max=0;
    var AIRole=AIRole;//先写死啊,电脑拿白棋，人拿黑棋,1为黑，2为白
    var userRole;
    if(AIRole==1)
    {
        userRole=2;
    }
    else
    {
        userRole=1;
    }
    
    
    for(var i=0;i<15;i++)
    {
        for(var j=0;j<15;j++)
        {
            var AIScore=getScore(i,j,AIRole);
            var userScore=getScore(i,j,userRole);
            scores[i][j]=(AIScore)>(userScore)?(AIScore):(-userScore);
            if(Math.abs(scores[i][j])>max)
            {
                max=Math.abs(scores[i][j]);
            }
        }
    }//得到每个位置的分数
    
    for(var i=0;i<15;i++)
    {
        for(var j=0;j<15;j++)
        {
            if(scores[i][j]==max)
            {
                attackChoose.push({row:i,col:j});
            }
            else if(scores[i][j]==-max)
            {
                defendChoose.push({row:i,col:j});
            }
        }
    }//得到分数最高的位置
    if(max==0)
    {
        return {row:7,col:7};
    }
    
    if(attackChoose.length!=0)
    {
        var index=Math.floor((Math.random()*attackChoose.length));
        return attackChoose[index];
    }//先进攻后防守
    else
    {
        var index=Math.floor((Math.random()*attackChoose.length));
        return defendChoose[index];
    }
    
}



function getScore(row,col,chessColor)
{
    if(row<0||col<0||row>=15||col>=15||chessArray[row][col]!=0)
    {
        return 0;
    }
    var situations=[];
    situations[1]=getWestToEastSituation(row,col,chessColor);
    situations[2]=getNorthToSouthSituation(row,col,chessColor);
    situations[3]=getNorthWestToSouthEastSituation(row,col,chessColor);
    situations[4]=getNorthEastToSouthWestSituation(row,col,chessColor);//判断一个子的8向情况
    
    if(isFive(situations))//按照规则打分
    {
        return 1<<9;
    }
    else if(isGoodFour(situations)||isTwoBadFour(situations)||(isBadFour(situations)&&isGoodThree(situations)))
    {
        return 1<<8;
    }
    else if(isTwoGoodThree(situations))
    {
        return 1<<7;
    }
    else if(isGoodThree(situations)&&isBadThree(situations))
    {
        return 1<<6;
    }
    else if(isBadFour(situations))
    {
        return 1<<5;
    }
    else if(isGoodThree(situations))
    {
        return 1<<4;
    }
    else if(isTwoGoodTwo(situations))
    {
        return 1<<3;
    }
    else if(isBadThree(situations))
    {
        return 1<<2;
    }
    else if(isGoodTwo(situations))
    {
        return 1<<1;
    }
    else if(isBadTwo(situations))
    {
        return 1<<0;
    }
    else 
    {
        return 0;
    }
    
    
    
    
}

function isFive(situations)//有5的情况
{
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_FIVE)
        {
            return true;
        }
    }
    return false;
}
function isGoodFour(situations)//有活四的情况
{
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_GOOD_FOUR)
        {
            return true;
        }
    }
    return false;
}

function isBadFour(situations)//有死四的情况
{
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_BAD_FOUR)
        {
            return true;
        }
    }
    return false;
}

function isTwoBadFour(situations)//有两个方向都是死四的情况
{
    var num=0;
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_BAD_FOUR)
        {
            num++;
            if(num==2)
            {
                return true;
            }
        }
        
    }
    return false;
    
}
function isGoodThree(situations)//有活三的情况
{
    for (var i = 0; i < situations.length; i++)
    {
        if (situations[i] == SITUATION_GOOD_THREE)
        {
            return true;
        }
    }
    return false;
}

function isTwoGoodThree(situations)//有两个方向都是活三的情况
{
    var num=0;
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_GOOD_THREE)
        {
            num++;
            if(num==2)
            {
                return true;
            }
        }
        
    }
    return false;
}



function isBadThree(situations)//有死三的情况
{
    for (var i = 0; i < situations.length; i++)
    {
        if (situations[i] == SITUATION_BAD_THREE)
        {
            return true;
        }
    }
    return false;
}

function isTwoBadThree(situations)//有两个方向都是死三的情况
{
    var num=0;
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_BAD_THREE)
        {
            num++;
            if(num==2)
            {
                return true;
            }
        }
        
    }
    return false;
}


function isGoodTwo(situations)//有活二的情况
{
    for (var i = 0; i < situations.length; i++)
    {
        if (situations[i] == SITUATION_GOOD_TWO)
        {
            return true;
        }
    }
    return false;
}


function isTwoGoodTwo(situations)//有两个方向都是活儿的情况
{
    var num=0;
    for(var i=0;i<situations.length;i++)
    {
        if(situations[i]==SITUATION_GOOD_TWO)
        {
            num++;
            if(num==2)
            {
                return true;
            }
        }
        
    }
    return false;
}



function isBadTwo(situations)//有死二的情况
{
    for (var i = 0; i < situations.length; i++)
    {
        if (situations[i] == SITUATION_BAD_TWO)
        {
            return true;
        }
    }
    return false;
}



function getWestToEastSituation(row,col,chessColor)
{
    var west=searchWest(chessColor,row,col);
    var east=searchEast(chessColor,row,col);
    
    var isGood=true;
    if((col-west-1)<0||chessArray[row][col-west-1]!=0)
    {
        isGood=false;
    }
    if((col+east+1)>=15||chessArray[row][col+east+1]!=0)
    {
        if(isGood)
        {
            isGood=false;
        }
        else
        {
            return SITUATION_BAD;//两边都不可下
        }
    }
    if(isGood)
    {
        switch (east+west+1)
        {
            case 4:
                return SITUATION_GOOD_FOUR;
                break;
            case 3:
                return SITUATION_GOOD_THREE;
                break;
            case 2:
                return SITUATION_GOOD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    else
    {
        switch (east+west+1)
        {
            case 4:
                return SITUATION_BAD_FOUR;
                break;
            case 3:
                return SITUATION_BAD_THREE;
                break;
            case 2:
                return SITUATION_BAD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    return SITUATION_FIVE;
}

function getNorthToSouthSituation(row,col,chessColor)
{
    var north=searchNorth(chessColor,row,col);
    var south=searchSouth(chessColor,row,col);
    
    var isGood=true;
    if((row+south+1)>=15||chessArray[row+south+1][col]!=0)
    {
        isGood=false;
    }
    if((row-north-1)<0||chessArray[row-north-1][col]!=0)
    {
        if(isGood)
        {
            isGood=false;
        }
        else
        {
            return SITUATION_BAD;//两边都不可下
        }
    }
    if(isGood)
    {
        switch (south+north+1)
        {
            case 4:
                return SITUATION_GOOD_FOUR;
                break;
            case 3:
                return SITUATION_GOOD_THREE;
                break;
            case 2:
                return SITUATION_GOOD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    else
    {
        switch (south+north+1)
        {
            case 4:
                return SITUATION_BAD_FOUR;
                break;
            case 3:
                return SITUATION_BAD_THREE;
                break;
            case 2:
                return SITUATION_BAD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    return SITUATION_FIVE;
}

function getNorthWestToSouthEastSituation(row,col,chessColor)
{
    var northWest=searchNorthWest(chessColor,row,col);
    var southEast=searchSouthEast(chessColor,row,col);
    
    var isGood=true;
    if((row-northWest-1)<0||(col-northWest-1)<0||chessArray[row-northWest-1][col-northWest-1]!=0)
    {
        isGood=false;
    }
    if((row+southEast+1)>=15||(col+southEast+1)>=15||chessArray[row+southEast+1][col+southEast+1]!=0)
    {
        if(isGood)
        {
            isGood=false;
        }
        else
        {
            return SITUATION_BAD;//两边都不可下
        }
    }
    if(isGood)
    {
        switch (southEast+northWest+1)
        {
            case 4:
                return SITUATION_GOOD_FOUR;
                break;
            case 3:
                return SITUATION_GOOD_THREE;
                break;
            case 2:
                return SITUATION_GOOD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    else
    {
        switch (southEast+northWest+1)
        {
            case 4:
                return SITUATION_BAD_FOUR;
                break;
            case 3:
                return SITUATION_BAD_THREE;
                break;
            case 2:
                return SITUATION_BAD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    return SITUATION_FIVE;
    
}

function getNorthEastToSouthWestSituation(row,col,chessColor)
{
    var northEast=searchNorthEast(chessColor,row,col);
    var southWest=searchSouthWest(chessColor,row,col);
    
    var isGood=true;
    if((row-northEast-1)<0||(col+northEast+1)>=15||chessArray[row-northEast-1][col+northEast+1]!=0)
    {
        isGood=false;
    }
    if((row+southWest+1)>=15||(col-southWest-1)<0||chessArray[row+southWest+1][col-southWest-1]!=0)
    {
        if(isGood)
        {
            isGood=false;
        }
        else
        {
            return SITUATION_BAD;//两边都不可下
        }
    }
    if(isGood)
    {
        switch (northEast+southWest+1)
        {
            case 4:
                return SITUATION_GOOD_FOUR;
                break;
            case 3:
                return SITUATION_GOOD_THREE;
                break;
            case 2:
                return SITUATION_GOOD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    else
    {
        switch (northEast+southWest+1)
        {
            case 4:
                return SITUATION_BAD_FOUR;
                break;
            case 3:
                return SITUATION_BAD_THREE;
                break;
            case 2:
                return SITUATION_BAD_TWO;
                break;
            case 1:
                return SITUATION_ONE;
                break;
        }
    }
    return SITUATION_FIVE;
    
}




