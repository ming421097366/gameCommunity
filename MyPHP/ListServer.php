<?php

include_once __DIR__."\Server.php";
include_once __DIR__."\Assist.php";

class ListServer extends Server
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
        
        if (!$this->_connection) 
        {
            $this->makeResponse(false, "cannot connect to database");
            return;
        }
        if ($this->_request->type == "LIST_GET")//判断具体请求类型
        {
            $this->getList();
        }

        pg_close($this->_connection); //关闭连接
    }
    
    protected function getList()
    {
        $this->beginTransaction();
        $sql="select id,title,abstract from blog_text";
        $result=  pg_query($this->_connection,$sql);
              if(!$result)
        {
            $this->makeResponse(FALSE, pg_last_notice($this->_connection));
        }
        else
        {
            $list=array();
            $i=0;
            while($row=pg_fetch_row($result))
            {
                $list[$i]["id"]=$row[0];
                $list[$i]["title"]=$row[1];
                $list[$i]["abstract"]=$row[2];
                $i++;
                if($i==$this->_request->articleCount)
                {
                    break;
                }
            }
            pg_free_result($result);
            $this->makeResponse(true, "get list successfully");
            $this->_response["list"]=$list;
        }
        $this->endTransaction();
    }

}


?>