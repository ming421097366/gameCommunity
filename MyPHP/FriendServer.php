<?php

include_once __DIR__ . "\Server.php";
include_once __DIR__ . "\Assist.php";



session_start();

class FriendServer extends Server
{
    
    public function __construct() {
        parent::__construct();
    }
    public function __destruct() {
        parent::__destruct();
    }
    
     public function run() {
       parent::run();
        $this->_connection = getConnection(); //建立连接
        if (!$this->_connection) {
            $this->makeResponse(false, "cannot connect to database");
            return;
        }
        if ($this->_request->type == "FRIEND_GET") {//判断具体请求类型
            $this->get();
            
        }
        else
        {
            
        }


        pg_close($this->_connection); //关闭连接
    }
    
    protected function get()
    {
        if(!$_SESSION["userid"])
        {
             $this->makeResponse(false, "you must login");
        }
        else
        {
            
        
          
      //  echo $_SESSION["userid"];
        $this->beginTransaction();
        $sql="select friendname from blog_friend where username=$1;";
        
        $result=  pg_query_params($this->_connection,$sql,array($_SESSION["userid"]));
        if(!$result)
        {
            $this->makeResponse(false, pg_last_error($this->_connection));
            pg_close($this->_connection);
            return;
        }
        
        $data=array();
        $i=0;
        while($row=  pg_fetch_row($result))
        {
            $data[$i]["friendid"]=$row[0];
            
            $i++;
            
        }
        //echo $_SESSION["userid"];
        pg_free_result($result);
        $this->makeResponse(true, "ok");
        $this->_response["data"]=$data;
        $this->endTransaction();
        
        
        }
    }
    
    
    
}






?>