<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="syntaxhighlighter_3.0.83/scripts/shCore.js"></script>
        <script type="text/javascript" src="syntaxhighlighter_3.0.83/scripts/shBrushJScript.js"></script>
        <link type="text/css" rel="stylesheet" href="syntaxhighlighter_3.0.83/styles/shCore.css"/>
        <link type="text/css" rel="stylesheet" href="syntaxhighlighter_3.0.83/styles/shThemeDefault.css"/>
        <script type="text/javascript">
            SyntaxHighlighter.config.bloggerMode = true;
            
            SyntaxHighlighter.config.strings=
                    {
//                        为什么没有效果？？？？
                        expandSource:"展开源代码",
                        help:"?",
                        alert:"语法高亮",
                        noBrush:"不能找到刷子",
                        brushNotHtmlScript:"刷子不匹配",
                        viewSource:"查看代码",
                        copyToClipboard:"复制",
                        copyToClipboardConfirmation:"代码复制成功",
                        print:"打印"
                        
            

                        
                    };
          
        </script>
        
        
        
    </head>
    <body>
        <div style="width: 400px;">
            <p>
        <pre class="brush : js">
            function foo()
            {
                alert("ok");
            }
        </pre>
            <button onclick="  SyntaxHighlighter.highlight(); ;alert('1');">aa</button>
            </p>
           </div>
        
    </body>
</html>
