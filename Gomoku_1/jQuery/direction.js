/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function playChess(chessColor, row, col)//chessColor 黑棋为1 白棋为2
{
    if (isEnd)
    {
        //实现游戏结束  todo
        return;
    }
    if (row >= 0 && row < 15 && col >= 0 && col < 15)
    {
        if (chessColor === 1)
        {
            //画黑棋
            context.drawImage(imageBlack, col * 40, row * 40);
            chessArray[row][col] = 1;
        }
        else
        {
            //画白棋
            context.drawImage(imageWhite, col * 40, row * 40);
            chessArray[row][col] = 2;
        }
        //判断游戏是否结束
        judgeChess(chessColor, row, col);
    }
}