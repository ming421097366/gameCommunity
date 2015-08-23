function createLoginDialog()
{
    var dlg=new LoginDialog({
        loginSuccess:function(obj){
            dlg.destroy();
            createRegistDialog();
    }
    });
    dlg.onShow();
}




function createRegistDialog()
{
    var dlg=new RegistDialog({
        loginSuccess:function(obj){
            dlg.destroy();
            createLoginDialog();
    }
    });
    dlg.onShow();
}

function onReady()//当文件载入完成后，立刻创建一个登陆窗口，并显示它
{
    var dlg=new LoginDialog({
        loginSuccess:function(obj){
            dlg.destroy();
            createRegistDialog();
    }
    });
    dlg.onShow();
    
}

$(document).ready(onReady);