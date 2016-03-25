@extends('header')
@section('content')
<div class="page-header">
 <h2>Request break</h2>
</div>

<div class="col-lg-12">
 <div class="block block-size-medium">
 <div class="block-content-outer">
 <div class="block-content-inner">
  <div class="container-fluid">
   
   <div class="row">
    <div class="col-md-4">
            <div id="test-circle" style="margin-top: -50px; margin-bottom: -20px;"></div>
    <p class="text-center"><strong>You have 30 minutes break left</strong> <br /> <br />
     <button class="btn btn-success">Take break</button>
     <br><br>
     <button class="btn btn-warning">Get in queue</button>
     <br><br>
     <button class="btn btn-danger">Quit break</button>
    </p>

      </div>
    <div class="col-md-8">
    <div class="clearfix">&nbsp;</div>
      <table class="table table-striped">
      <thead>
        <th>Employee</th>
        <th class="text-center">Time in break</th>
        <th>Action</th>        
      </thead>
      <tbody>
        <tr>
          <td>Glenn Hermans</td>
          <td class="text-center">10</td>
          <td class="col-md-2">
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Kick user"><i class="fa fa-times"></i></a>&nbsp;
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Lower priority"><i class="fa fa-arrow-down"></i></a>&nbsp;
          </td>
        </tr>
      </tbody>
      </table>      
    <div class="clearfix">&nbsp;</div>
      <table class="table table-striped">
      <thead>
       <tr>
        <th>Employee</th>
        <th class="text-center">Time in queue</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Glenn Hermans</td>
          <td class="text-center">10</td>
          <td class="col-md-2">
              <a href="" data-toggle="tooltip" data-placement="bottom" title="Kick user"><i class="fa fa-times"></i></a>&nbsp;
              <a href="" data-toggle="tooltip" data-placement="bottom" title="Lower priority"><i class="fa fa-arrow-down"></i></a>&nbsp;
              <a href="" data-toggle="tooltip" data-placement="bottom" title="Higher priority"><i class="fa fa-arrow-up"></i></a>&nbsp;
         </td>
        </tr>
      </tbody>
      </table>
     </div>
</div>
</div>
</div>
</div>
</div>
</div>

<script>
$(document).ready(function() {
        $("#test-circle").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,

            backgroundColor: '#1ca535',
            foregroundColor: '#bf2416',

            percent: 50,
            textSize: 28,
            textStyle: 'font-size: 12px;',
            textColor: '#666',
            text: 'Open slots'
        });

        $('[data-toggle="tooltip"]').tooltip()
    });
</script>

@endsection