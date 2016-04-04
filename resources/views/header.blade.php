<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Time control</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link href="{!! asset('css/font-awesome.css') !!}" rel="stylesheet" type="text/css" />
   
    <link href="{!! asset('css/bootstrap-editable.css') !!}" rel="stylesheet"/>
    <link href="{!! asset('css/jquery-circliful.css') !!}" rel="stylesheet" type="text/css" />
    <link href="{!! asset('css/jquery.stepy.css') !!}" rel="stylesheet" type="text/css" />

    <link href="{!! asset('css/app.css') !!}" rel="stylesheet" type="text/css">

    <script src="{!! asset('js/jquery.js') !!}" type="text/javascript"></script>
    <script src="{!! asset('js/jquery-migrate.js') !!}" type="text/javascript"></script>
    <script src="{!! asset('js/bootstrap.js') !!}" type="text/javascript"></script>

    <script src="{!! asset('js/jquery.validate.min.js') !!}" type="text/javascript"></script>

    <script src="{!! asset('js/jquery.stepy.min.js') !!}" type="text/javascript"></script>
    <script src="https://www.gstatic.com/charts/loader.js" type="text/javascript"></script>
    <script src="{!! asset('js/plugins.js') !!}" type="text/javascript"></script>

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
  <a class="navbar-brand" href="{{ url() }}">
   <i class="glyphicon glyphicon-time"></i> {{ Config('timecontrol.title') }}</a>
            </div>

          <div class="navbar-collapse collapse" style="margin-left:230px;">
          <ul class="nav navbar-nav">
          </ul>
<ul class="nav navbar-nav navbar-right">
 <!-- mesages -->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="fa fa-envelope-o "></i>
                            <span class="badge badge-sm up bg-red count">4</span>
                        </a>
                        <ul class="dropdown-menu fadeInUp animated">
                            <li>
                                <p>Messages</p>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="pull-left"><img src="" class="img-circle thumb-sm m-r-15" alt="img"></span>
                                    <span class="block"><strong>John smith</strong></span>
                                    <span class="media-body block">New tasks needs to be done<br><small class="text-muted">10 seconds ago</small></span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="pull-left"><img src="img/avatar-3.jpg" class="img-circle thumb-sm m-r-15" alt="img"></span>
                                    <span class="block"><strong>John smith</strong></span>
                                    <span class="media-body block">New tasks needs to be done<br><small class="text-muted">3 minutes ago</small></span>
                                </a>
                            </li>

                            <li>
                                <p><a href="inbox.html" class="text-right">See all Messages</a></p>
                            </li>
                        </ul>
                    </li>
                    <!-- /messages -->

 <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="glyphicon glyphicon-user"></i> {{ Auth::user()->fname }} {{ Auth::user()->name }} <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="{{ url('profile/changepass') }}">Profile settings</a></li>
                  <li><a href="#">Planning</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li class="navbar-menu-item"><div class="label">{{ Lang::get('aop.languages') }}</div></li>
                  <li><a href="?lang=nl">{{ Lang::get('app.langnl') }}</a></li>
                  <li><a href="?lang=en">{{ Lang::get('app.langen') }}</a></li>
                  <li><a href="?lang=fr">{{ Lang::get('app.langfr') }}</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="{{ url('auth/logout') }}"><i class="fa fa-power-off"></i> Sign out</a></li>
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
                @if(empty(Auth::user()->image))
                    <img src="{{ url('img/user_icon.png') }}" class="img-circle" alt="Image">
                @else
                    <img src="{{ url('profilepics/'. Auth::user()->image) }}" class="img-circle" alt="Image">
                @endif
            </div>
            <div class="pull-left info">
              <p>{{ Auth::user()->fname }} {{ Auth::user()->name }}</p>
              <a href="#"><i class="fa fa-circle text-red"></i> Busy</a>
            </div>
          </div>
<div id="main_menu" style="background:#fff;">
 <div class="panel-group" id="accordion">
   <div class="panel">
    <div class="panel-heading">
     <h4 class="panel-title">
      <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span class="fa fa-folder"></span> General</a>
    </h4>
      </div>
        <div id="collapseOne" class="panel-collapse @if (Request::is('/*'))  collapsed @else collapse @endif">
        <div class="panel-body">
        <ul class="nav nav-pills nav-stacked">
			<li class="@if (Request::is('/*')) active @endif"><a href="{{ url() }}">Dashboard</a></li>
			<li class="@if (Request::is('/profile*')) active @endif"><a href="{{ url('profile/changepass') }}">Change password</a></li>
			<li class="divider"></li>
			<li><a href="javascript:void(0)">Help</a></li>
	     </ul>
        </div>
       </div>
     </div>

      <div class="panel">
        <div class="panel-heading">
       <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#break"><span class="fa fa-coffee"></span> Break</a>
      </h4>
        </div>
       <div id="break" class="panel-collapse @if (Request::is('break*')) collapsed @else collapse @endif">
         <div class="panel-body">
         <ul class="nav nav-pills nav-stacked">
            <li class="nav-header">General</li>
            <li class="@if (Request::is('break/history*')) active @endif"><a href="{{ url('break/history')}}">History</a></li>
            <li class="@if (Request::is('break/request*')) active @endif"><a href="{{ url('break/request')}}">Request</a></li>
          </ul>
         </div>
        </div>
        </div>

     <div class="panel">
      <div class="panel-heading">
       <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#planning"><span class="fa fa-folder"></span> Schedule & Tasks</a>
      </h4>
        </div>
          <div id="planning" class="panel-collapse @if (Request::is('sick*'))  collapsed @else collapse @endif">
          <div class="panel-body">
          <ul class="nav nav-pills nav-stacked">
        @if(Auth::user()->is('Administrator'))          
        <li class="nav-header">Configuration</li>
        <li class="@if (Request::is('types')) active @endif"><a href="{{ route('type.index') }}">Setup task types</a></li>
        @endif  
        <li class="nav-header">General</li>        
        <li class="@if (Request::is('tasks*')) active @endif"><a href="{{ url('tasks') }}">Tasks list</a></li>
  			<li class="@if (Request::is('sick*')) active @endif"><a href="{{ url('sick') }}">{{ Lang::get('tasks.sick_notification')}}</a></li>
  			<li class="divider"></li>
  			<li><a href="javascript:void(0)">Help</a></li>
  	     </ul>
          </div>
         </div>
       </div>
       @if(Auth::user()->is('Administrator'))
     <div class="panel">
      <div class="panel-heading">
       <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#staff"><span class="fa fa-users"></span> Staff</a>
        </h4>
      </div>
       <div id="staff" class="panel-collapse @if (Request::is('staff*')) collapsed @else collapse @endif">
         <div class="panel-body">
         <ul class="nav nav-pills nav-stacked">
								<li class="nav-header">Departements</li>
								<li class="@if (Request::is('staff/departments*')) active @endif"><a href="{{ url('staff/departments')}}">Departments</a></li>
								<li class="@if (Request::is('staff/teams*')) active @endif"><a href="{{ url('staff/teams')}}">Teams</a></li>
								<li class="nav-header">Staff</li>
								<li class="@if (Request::is('staff')) active @endif @if (Request::is('staff/edit/*')) active @endif "><a href="{{ url('staff')}}">Users</a></li>
								<li class="@if (Request::is('staff/policies')) active @endif"><a href="{{ url('staff/policies')}}">User Access Roles</a></li>
                <li class="@if (Request::is('staff/permissions')) active @endif"><a href="{{ url('staff/permissions')}}">Permissions</a></li>
					</ul>
         </div>
        </div>
        </div>

      <div class="panel">
        <div class="panel-heading">
       <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#settings"><span class="fa fa-cog"></span> Settings</a>
      </h4>
        </div>
       <div id="settings" class="panel-collapse @if (Request::is('settings*')) collapsed @else collapse @endif">
         <div class="panel-body">
         <ul class="nav nav-pills nav-stacked">
            <li class="nav-header">General</li>
            <li class="@if (Request::is('settings/general*')) active @endif"><a href="{{ url('settings/general')}}">Basic settings</a></li>
            <li class="@if (Request::is('settings/backup*')) active @endif"><a href="{{ url('settings/backup')}}">Backup settings</a></li>            
            <div class="clearfix">&nbsp;</div>
            <li class="nav-header">E-mail</li>
            <li class="@if (Request::is('settings/email/inbound')) active @endif @if (Request::is('settings/email/inbound*')) active @endif "><a href="{{ url('email')}}">Incoming</a></li>
            <li class="@if (Request::is('settings/email/outbound')) active @endif"><a href="{{ url('settings/email/outbound')}}">SMTP settings</a></li>
          </ul>
         </div>
        </div>
        </div>
        @endif
       </div>
      </div>
     </div>

<div id="page-content-wrapper">
  <div class="container-fluid">
          @yield('content')
    </div>
  </div>
  </div>
 </body>
</html>
