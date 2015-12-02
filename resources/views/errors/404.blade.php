<!DOCTYPE html>
<html>
    <head>
        <title>404 - Page not found.</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link href="http://fonts.googleapis.com/css?family=Roboto:400,300,500,700">
        <style>

        html {
         overflow-x: hidden;
         position: relative;
         min-height: 100%;
          }

          body {
          color: #797979;
          background-color: #f5f5f5;
          font-family: 'Roboto', sans-serif;
          padding: 0px;
          margin: 0px;
          font-size: 14px;
          }
         
         a{
          color: #333b4d;
          cursor: pointer;
          outline: none;
           }

         a:hover,a:focus{
         color: #2A3542;
         text-decoration: none;
          }          

         /* Log-in */
         .wrapper-page {
         width: 380px;
         margin: 140px auto 140px;
          }

        /* Error-pages */
          .ex-page-content h1 {
          font-size: 150px;
          line-height: 150px;
          font-weight: 700;
          color: #252932;
          text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
          }
          
          .font-light {
           font-weight: 300;
          }

        </style>
    </head>

    <body>

        <div class="wrapper-page">

            <div class="ex-page-content text-center">
                <h1>404</h1>
                <h2 class="font-light">Sorry, page not found</h2><br>
<br>
                <a class="btn btn-purple" href="{{ url('')}}"><i class="fa fa-angle-left"></i> Back to the application</a>
            </div>
            
        </div>
  </body>
</html>
