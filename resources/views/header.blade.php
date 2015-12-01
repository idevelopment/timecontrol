<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Time control</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Bootstrap 3.3.4 -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome Icons -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">

<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
 <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
 <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js" type="text/javascript"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

  </head>

<body>
    <div id="wrapper">
    <nav class="navbar navbar-fixed-top navbar-default" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
         <a class="navbar-brand" href="<?php echo url()?>"><i class="glyphicon glyphicon-time"></i> Time Control </a>
            </div>

          <div class="navbar-collapse collapse" style="margin-left:230px;">
          <ul class="nav navbar-nav">
          </ul>
<ul class="nav navbar-nav navbar-right">

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-user"></span>
                        <strong>User name</strong>
                        <span class="glyphicon glyphicon-chevron-down"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="navbar-login">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <p class="text-center">
                                            <span class="glyphicon glyphicon-user icon-size"></span>
                                        </p>
                                    </div>
                                    <div class="col-lg-8">
                                        <p class="text-left"><strong>User name</strong></p>
                                        <p class="text-left small">testplein@idevelopment.be</p>
                                        <p class="text-left">
                                            <a href="#" class="btn btn-primary btn-block btn-sm">Account setting</a>
                                        </p>
                                        <p class="text-left">
                                            <a href="<?php echo url("planning/my_planning");?>" class="btn btn-primary btn-block"><i class="fa fa-calendar"></i> Planning</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="divider"></li>
            <li>
                <div class="navbar-login navbar-login-session">
                 <div class="row">
                  <div class="col-lg-12">
                   <p>
                    <a href="<?php echo url("auth/logout");?>" class="btn btn-danger btn-block"><i class="fa fa-power-off"></i> Log out</a>
                    </p>
                   </div>
                </div>
                </div>
            </li>
                    </ul>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
        </div>
    </nav>

        <!-- Sidebar -->
        <div id="sidebar-wrapper">
<div class="user-panel" style="background:#fff; padding-bottom:30px;">
            <div class="pull-left image">
              <img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c25.25.315.315/s200x200/390000_4187232516123_1971982462_n.jpg?oh=b773904c68e31c0b9761e1822a944679&oe=56064FB0&__gda__=1442920320_411190abbe6f18319c0772c944dc1" class="img-circle" alt="Image">
            </div>
            <div class="pull-left info">
              <p>Blah testplein</p>

              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
<div id="main_menu">

<div class="panel-group" id="accordion" style="background:#fff;">
     <div class="panel">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span class="fa fa-folder"></span> General</a>
        </h4>
      </div>
        <div id="collapseOne" class="panel-collapse collapsed">
        <div class="panel-body">
        <ul class="nav nav-pills nav-stacked">
			<li class=""><a href="<?php echo url(""); ?>">Dashboard</a></li>
			<li class=""><a href="<?php echo url("dashboard/myboard"); ?>">Manage dashboard</a></li>
			<li class=""><a href="<?php echo url("dashboard/profile"); ?>">Change password</a></li>
			<li class="divider"></li>
			<li><a href="javascript:void(0)">Help</a></li>
	     </ul>
        </div>
       </div>
     </div>


                <div class="panel">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree"><span class="fa fa-users"></span> Staff</a>
                        </h4>
                    </div>
                      <div id="collapseThree" class="panel-collapse collapsed">
                      <div class="panel-body">
                        <ul class="nav nav-pills nav-stacked">
								<li class="nav-header">Departements</li>
								<li class=""><a href="{{ url('department')}}">Departments</a></li>
								<li class=""><a href="{{ url('department')}}">Teams</a></li>
								<li class="nav-header">Staff</li>
								<li class=""><a href="{{ url('staff')}}">Users</a></li>
								<li class=""><a href="{{ url('staff/policies')}}">User Access Roles</a></li>
								</ul>
                        </div>
                    </div>
                </div>
             </div>
           </div>
     </div>
        <!-- Page Content -->
<div id="page-content-wrapper">
  <div class="container-fluid">
          @yield('content')
    </div>
  </div>
  </div>

 </body>
</html>