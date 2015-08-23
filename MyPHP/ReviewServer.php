<?php


include_once __DIR__."\Server.php";
include_once __DIR__."\Assist.php";

session_start();

class ReviewServer extends Server
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
        if($this->_request->type=="REVIEW_READ")//判断具体请求类型
        {
            $this->readReview();
        }
        else if($this->_request->type=="REVIEW_WRITE")
        {
            $this->writeReview();
        }
        

        pg_close($this->_connection);//关闭连接
    }
    
    protected function readReview()
    {
        $this->beginTransaction();
        $sql="select id,review,review_time,username from blog_review where text_id=$1;";
        $result= pg_query_params($this->_connection,$sql,array($this->_request->articleID));
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
                $list[$i]["review"]=$row[1];
                $list[$i]["review_time"]=$row[2];
                $list[$i]["username"]=$row[3];
                $i++;
                if($i==$this->_request->reviewCount)
                {
                    break;
                }
            }
            pg_free_result($result);
            $this->makeResponse(true, "get reviews successfully");
            $this->_response["list"]=$list;
        }
    }
    
    protected function writeReview()
    {
        $this->beginTransaction();//开始事务
        
        $sql="insert into blog_review(text_id,review,review_time,is_anonymous,username) values($1,$2,$3,$4,$5)";
        
        $username="匿名用户";
        $is_anonymous=1;
        if($_SESSION["userid"])
        {
            $username=$_SESSION["userid"];
            $is_anonymous=0;
        }
        
        $result = pg_query_params($this->_connection, $sql, array(
            $this->_request->text_id,
            $this->_request->review,
            date("Y-m-d H:i:s"),
            $is_anonymous,
            $username
        ));
        
        if(!$result)
        {
             $this->makeResponse(false, pg_last_notice($this->_connection));
             return;
        }
        else
        {
            $sql1="update blog_text set reviews=reviews+1 where id=$1";//更新评论数目
            $result1=pg_query_params($this->_connection,$sql1,array($this->_request->text_id));
            if($result1)
            {
                pg_free_result($result1);
            }
            
            $this->makeResponse(true, "insert review successfully");
        }
        
        pg_free_result($result);



        $this->endTransaction();//结束事务
        
        
    }
    

}



?>