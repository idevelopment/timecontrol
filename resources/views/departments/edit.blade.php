@extends('header')
@section('content')
<div class="page-header">
<h2>Edit department</h2>
</div>

<div class="col-md-12">
<ul class="nav nav-tabs tabs-float tabs-dark font-12">
              <li role="presentation" class="active"><a href="#infoTab" data-toggle="tab">General</a></li>
              <li role="presentation"><a href="#teamsTab" data-toggle="tab">Teams</a></li>
              <li role="presentation"><a href="#notificationsTab" data-toggle="tab">Notifications</a></li>
              <li role="presentation"><a href="#dashboardsTab" data-toggle="tab">Custom dashboard</a></li>
              <li role="presentation"><a href="#timeTab" data-toggle="tab">Work hours</a></li>
            </ul>

<div class="tab-content">
  <div class="tab-pane fade in active" id="infoTab">
     edit department form here
  </div>

  <div class="tab-pane fade in" id="teamsTab">
   Manage assigned teams
   <table class="table table-striped">
   <thead>
     <tr>
      <th>Team</th>
      <th>Total Users</th>
      <th>Last modified</th>
      </tr>
   </thead>
   <tbody>
     <tr>
      <td></td>
      <td></td>
      <td></td>
      </tr>
   </tbody>
  </table>
  </div>

  <div class="tab-pane fade in" id="notificationsTab">
     form to configure notification settings here
  </div>

  <div class="tab-pane fade in" id="dashboardsTab">
     form to configure custom dashboards for all department members based on roles settings.
  </div>

    <div class="tab-pane fade in" id="timeTab">
     form to configure workhours.
  </div>

 </div>

@endsection
