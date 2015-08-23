<?php

include_once __DIR__ . "\Server.php";
include_once __DIR__ . "\Assist.php";

class UpServer extends Server {

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
        if ($this->_request->type == "UP_READ") {//判断具体请求类型
            
        } else if ($this->_request->type == "UP_WRITE") {
            $this->writeUp();
            
        }
        else
        {
            
        }


        pg_close($this->_connection); //关闭连接
    }
    
    protected function writeUp()
    {
         $this->beginTransaction();
         
         
         $sql="update blog_text set ups=ups+1 where id=$1;";
         $result=  pg_query_params($this->_connection,$sql,array($this->_request->text_id));
         if(!$result)
         {
            $this->makeResponse(FALSE, pg_last_notice($this->_connection));
         }
         else
         {
             $this->makeResponse(true, "set up successfully");
         }
         pg_free_result($result);
         
         
         $this->endTransaction();

             
                 
    }

    
}

?>