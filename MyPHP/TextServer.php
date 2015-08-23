<?php


include_once __DIR__."\Server.php";
include_once __DIR__."\Assist.php";

session_start();

class TextServer extends Server
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
        if($this->_request->type=="TEXT_WRITE")//判断具体请求类型
        {
            $this->writeText();
        }
        else if($this->_request->type=="TEXT_READ")
        {
            $this->readText();
        }

        pg_close($this->_connection);//关闭连接
    }
    
    protected function readText()
    {
        $this->beginTransaction();
        $sql="select title,text_html,reviews,ups,save_time,subtitle,user_id from blog_text where id=$1";
        $result=  pg_query_params($this->_connection,$sql,array($this->_request->articleID));
        if(!$result)
        {
             $this->makeResponse(false, pg_last_notice($this->_connection));
             return;
        }
        else
        {
            $row=pg_fetch_row($result);
            $this->makeResponse(TRUE, "get the text_html successfully");
            $data=array();
            
            $data["title"]=$row[0];
            $data["textHtml"]=$row[1];
            $data["reviews"]=$row[2];
            $data["ups"]=$row[3];
            $data["saveTime"]=$row[4];
            $data["subtitle"]=$row[5];
            $data["userid"]=$row[6];
            $this->_response["data"]=$data;
        }
         pg_free_result($result);
    }

        protected function writeText()
    {
        $this->beginTransaction();//开始事务
        
        $sql="insert into blog_text(user_id,title,subtitle,text_html,abstract,save_time) values($1,$2,$3,$4,$5,$6)";
        
        $result = pg_query_params($this->_connection, $sql, array(
            $_SESSION["userid"],
            $this->_request->title,
            $this->_request->subtitle,
            $this->_request->articleText,
            $this->_request->abstract,
            date("Y-m-d H:i:s")
        ));
        
        if(!$result)
        {
             $this->makeResponse(false, pg_last_notice($this->_connection));
             return;
        }
        else
        {
            $this->makeResponse(true, "insert successfully");
        }
        
        pg_free_result($result);



        $this->endTransaction();//结束事务
        
        
        
    }
    
    
}




?>