<?php

include_once __DIR__ . "\Server.php";
include_once __DIR__ . "\Assist.php";


session_start();

class UserServer extends Server
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
        if ($this->_request->type == "USER_LOGIN") {//判断具体请求类型
            $this->login();
            
        }
        else if($this->_request->type=="USER_REGIST")
        {
            $this->regist();
        }
        else
        {
            
        }


        pg_close($this->_connection); //关闭连接
    }
    




    protected function login() {
        $this->beginTransaction();
        $sql = "select * from blog_user where username=$1 and password=md5($2)";
      // echo $this->_request->user->userName;
        //echo $this->_request->user->password;
                
        $result = pg_query_params($this->_connection, $sql, array(
            $this->_request->user->userName,
            $this->_request->user->password
        ));
        if (!$result) {
            $this->makeResponse(false, pg_last_notice($this->_connection));
            return;
        }
        if (pg_num_rows($result) > 0) {
            $this->makeResponse(true, "OK");
            $row=  pg_fetch_row($result);
            $_SESSION["userid"]=$row[1];
           
        } else {
            $this->makeResponse(false, "invalid username or password");
        }
        pg_free_result($result);



        $this->endTransaction();
    }
    
    protected function regist()
    {
         $this->beginTransaction();
         $sql = "insert into blog_user(username,password) values($1,md5($2))";
//         echo $this->_request->user->userName;
//         echo $this->_request->user->password;
                
        @$result = pg_query_params($this->_connection, $sql, array(
            $this->_request->user->userName,
            $this->_request->user->password
        ));
        if (!$result) {
            $this->makeResponse(false, pg_last_notice($this->_connection));
            return;
            
        } 
        else {
            
            
             $this->makeResponse(true, "regist OK");
        }
        pg_free_result($result);

        $this->endTransaction();
    }
    
}


?>