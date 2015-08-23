<?php



class Server
{
    protected $_connection=false;
    protected $_request=false;
    protected $_response=false;
    
    public function __construct() {
        $this->_response=array();
        $this->_response["success"]=false;
        $this->_response["message"]="the server doesn't response any useful message ";
        
        
    }
    public function __destruct() {
        
    }
    
    public function setRequest($parameters)
    {
        $this->_request=$parameters;
    }
    
    public function getResponse()
    {
        return $this->_response;
    }
    
    public function run()
    {
        
    }
    
    protected function makeResponse($success,$message)
    {
        $this->_response["success"]=$success;
        $this->_response["message"]=$message;
    }
    
    
    protected function beginTransaction()
    {
        pg_query($this->_connection,"begin");
        
    }
    protected function endTransaction()
    {
        pg_query($this->_connection,"end");
    }

        
}


?>