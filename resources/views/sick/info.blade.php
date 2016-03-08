@extends('header')
@section('content')
<div class="page-header">
 <h2>{{Lang::get('tasks.sick_notification')}}</h2>
</div>

@foreach ($data as $data_item)
<div class="row">
<div class="col-md-8">
            <ul class="nav nav-tabs tabs-float tabs-dark font-12">
              <li role="presentation" class="active"><a href="#infoTab" data-toggle="tab">General</a></li>
              <li role="presentation"><a href="#portfolioTab" data-toggle="tab">History</a></li>
            </ul>

<div class="tab-content">
  <div class="tab-pane fade in active" id="infoTab">
  <form class="form-horizontal">
   <div class="col-md-6">
    <div class="form-group">
     <label for="type" class="col-md-2">{{Lang::get('tasks.sick_notification_type')}}</label>
     <div class="col-md-4">
     <p class="form-control-static">{{ $data_item->type }}</p>
    </div>
  </div>

 <div class="form-group">
     <label for="type" class="col-md-2">{{Lang::get('tasks.sick_notification_employee')}}</label>
     <div class="col-md-4">
     <p class="form-control-static">{{$data_item->user->fname}} {{$data_item->user->name}}</p>
     </div>
 </div>

</div>
  <div class="col-md-6">

 <div class="form-group">
     <label for="type" class="col-md-2">{{Lang::get('tasks.sick_notification_start')}}</label>
     <div class="col-md-4">
     <p class="form-control-static">{{ $data_item->start_date }}</p>
    </div>
 </div>


 <div class="form-group">
     <label for="type" class="col-md-2">{{Lang::get('tasks.sick_notification_stop')}}</label>
     <div class="col-md-4">
     <p class="form-control-static">{{ $data_item->end_date }}</p>
    </div>
 </div>
</div>
</form>
  </div>
  </div>
 </div>

 <div class="col-md-4">
 <div class="clearfix">&nbsp;</div>
 <div class="clearfix">&nbsp;</div>

 <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Comments</div>
</div>

 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
 

    </div>
    </div>
   </div>
  </div>
 </div>
 </div>
@endforeach
@endsection
