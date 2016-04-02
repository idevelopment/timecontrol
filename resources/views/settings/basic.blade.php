@extends('header')
@section('content')
<div class="page-header">
 <h2>Basic settings</h2>
</div>


<div class="col-lg-12">
  @if (Session::has('message'))
<div class="alert alert-success">
 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
 </button>
   {{ Session::get('message') }}
</div>
@endif

 <div class='block block-size-medium'>
 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">

   <form action="{{ url('settings/general') }}" method="post">
   {!! csrf_field() !!}
   <div class="row">
    <div class="col-md-6">
      <div class="text-black">General</div>
       <hr class="line-dashed m-t-10 m-b-20">
        <div class="form-group">
          <label for="title">Application title <span class="text-danger">*</span></label>
          <input type="text" name="title" id="title" value="{{ $title }}" class="form-control">
          </div>

        <div class="form-group">
          <label for="email">Application email <span class="text-danger">*</span></label>
          <input type="text" name="email" id="email" value="{{ $email }}" class="form-control">
        </div>
  </div>

      <div class="col-md-6">
      <div class="text-black">Date & time settings</div>
       <hr class="line-dashed m-t-10 m-b-20">
        <div class="form-group">
          <label>Date format <span class="text-danger">*</span></label>
          <select name="date" class="form-control">
          @foreach($date_formats as $date_item => $date_value)
           @if($date_item == $date) 
            <option value="{{ $date }}" selected="">{{ $date_value }}</option>
            @else
            <option value="{{ $date_item }}">{{ $date_value }}</option>
            @endif
            @endforeach
            </select>
          </div>

        <div class="form-group">
          <label for="time">Time format <span class="text-danger">*</span></label>
          <select name="time" id="time" class="form-control">
          @foreach($time_formats as $time_item => $time_value)
          @if($time_item == $time)
          <option value="{{ $time }}" selected="">{{ $time_value }}</option>
          @else
          <option value="{{ $time_item }}">{{ $time_value }}</option>
          @endif
          @endforeach
          </select>
        </div>
      </div>
    </div>

  <div class="clearfix">&nbsp;</div>

  <div class="row">
   <div class="col-md-12">
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Save changes</button>
      <button type="reset" class="btn btn-danger">Cancel</button>
    </div> 
   </div>
  </form>
</div>
@endsection
