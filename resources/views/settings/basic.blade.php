@extends('header')
@section('content')
<div class="page-header">
 <h2>Basic settings</h2>
</div>

<div class="col-lg-12">
 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
   <div class="row">
    <div class="col-md-6">
      <div class="text-black">General</div>
       <hr class="line-dashed m-t-10 m-b-20">
        <div class="form-group">
          <label>Application title <span class="text-danger">*</span></label>
          <input type="text" name="app_title" value="Time control" class="form-control"></input>
          </div>

        <div class="form-group">
          <label>Application email <span class="text-danger">*</span></label>
          <input type="text" name="app_title" value="noreply@timecontrol.be" class="form-control"></input>
        </div>
  </div>

      <div class="col-md-6">
      <div class="text-black">Date & time settings</div>
       <hr class="line-dashed m-t-10 m-b-20">
        <div class="form-group">
          <label>Date format <span class="text-danger">*</span></label>
          <select name="team" class="form-control">
          @foreach($date_formats as $date_item => $date_value)
            <option value="{{ $date_item }}">{{ $date_value }}</option>
            @endforeach
            </select>
          </div>

         <div class="form-group">
          <label>Time format <span class="text-danger">*</span></label>
          <select name="team" class="form-control">
          @foreach($time_formats as $time_item => $time_value)
            <option value="{{ $time_item }}">{{ $time_value }}</option>
            @endforeach
            </select>
          </div>
  </div>
 </div>
</div>
@endsection