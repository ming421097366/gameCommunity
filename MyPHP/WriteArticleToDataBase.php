<?php

include_once __DIR__."\Server.php";
include_once __DIR__."\TextServer.php";
include_once __DIR__."\Assist.php";
include_once __DIR__."\ListServer.php";
include_once __DIR__."\ReviewServer.php";
include_once __DIR__."\UpServer.php";
include_once __DIR__."\UserServer.php";
include_once __DIR__."\FriendServer.php";
include_once __DIR__."\ChessServer.php";






if(!isset($_POST["parameters"]))
{
    $response=  makeResponse(FALSE, "cannot get parameters");
    echo json_encode($response);//将各种各样的类型，处理为一个json字符串！
    exit(1);
}

$parameters=$_POST["parameters"];
$parameters=  json_decode($parameters);
$type_request=  split("_",$parameters->type);

$handle;

if($type_request[0]=="TEXT")
{
    $handle=new TextServer();
}
else if($type_request[0]=="LIST")
{
    $handle=new ListServer();
}
else if($type_request[0]=="REVIEW")
{
    $handle=new ReviewServer();
}
else if($type_request[0]=="UP")
{
    $handle=new UpServer();
}
else if($type_request[0]=="USER")
{
    $handle=new UserServer();
}
else if($type_request[0]=="FRIEND")
{
    $handle=new FriendServer();
}
else if($type_request[0]=="CHESS")
{
    $handle=new ChessServer();
}
else
{  
    makeResponse(FALSE, "parameters cannot be parased");
    echo json_encode($response);
    exit(1);
}

$handle->setRequest($parameters);
$handle->run();
echo json_encode($handle->getResponse());





?>