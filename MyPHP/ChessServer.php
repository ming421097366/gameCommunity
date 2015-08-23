<?php



include_once __DIR__."\Server.php";
include_once __DIR__."\Assist.php";

session_start();

class ChessServer extends Server
{
    public function __construct() {
        parent::__construct();
    }
    
    public function __destruct() {
        parent::__destruct();
    }
    
    public function run() {
        parent::run();
        $this->_connection=getConnection();//建立连接
        if(!$this->_connection)
        {
           $this->makeResponse(false, "cannot connect to database");
            return;
        }
        if($this->_request->type=="CHESS_GET")//判断具体请求类型
        {
            $this->getChess();
        }
        else if($this->_request->type=="CHESS_WRITE")
        {
            $this->writeChess();
        }
        else if($this->_request->type=="CHESS_DELETE")
        {
            $this->deleteChess();
        }

        pg_close($this->_connection);//关闭连接
    }
    
    protected function getChess()
    {
        $this->beginTransaction();
        $sql="select * from chess_board  where username=$1 order by presstime desc;";
        $result= pg_query_params($this->_connection,$sql,array($this->_request->enemyID));
        if(!$result)
        {
            $this->makeResponse(FALSE, pg_last_notice($this->_connection));
            return;
        }
        else
        {
            $row=pg_fetch_row($result);
            $list = array();
            $list[0]["row"] = $row[2];
            $list[0]["col"] = $row[3];
            $list[0]["color"] = $row[4];
         pg_free_result($result);
            $this->makeResponse(true, "get chess successfully");
            $this->_response["list"] = $list;
        }
        $this->endTransaction();
    }
    
    protected function writeChess()
    {
        $this->beginTransaction();//开始事务
        
        $sql="insert into chess_board(username,rownum,colnum,color) values($1,$2,$3,$4);";

        if(!$_SESSION["userid"])
        {
             $this->makeResponse(false, "you have not logined");
             return;
        }
        
        $result = pg_query_params($this->_connection, $sql, array(
            $_SESSION["userid"],
            $this->_request->rownum,
            $this->_request->colnum,
            $this->_request->color
           
        ));
        
        if(!$result)
        {
             $this->makeResponse(false, pg_last_notice($this->_connection));
             return;
        }
        else
        {
            $this->makeResponse(true, "insert chess successfully");
        }
        
        pg_free_result($result);



        $this->endTransaction();//结束事务
    }
    
    protected function deleteChess()
    {
      $this->beginTransaction();//开始事务
        
        $sql="delete from chess_board ";

        if(!$_SESSION["userid"])
        {
             $this->makeResponse(false, "you have not logined");
             return;
        }
        
//        $result = pg_query_params($this->_connection, $sql, array(
//            $_SESSION["userid"]
//        ));
        $result=  pg_query($this->_connection,$sql);//----------------简化问题。直接删除了
        
        
        if(!$result)
        {
             $this->makeResponse(false, pg_last_notice($this->_connection));
             return;
        }
        else
        {
            $this->makeResponse(true, "delete chess successfully");
        }
        
        pg_free_result($result);



        $this->endTransaction();//结束事务
        
    }
    
 
}



?>
