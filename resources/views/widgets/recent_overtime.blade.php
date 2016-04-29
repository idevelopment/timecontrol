<div class='block block-size-medium'>
 <div class='block-heading'>
  <div class='main-text'>Recent overtime requests</div>
<div class="pull-right">
<a href="#" role="button" data-toggle="modal" data-target="#OvertimeSettings" data-tt="tooltip" title="Configure" class="btn btn-default btn-circle"><i class="fa fa-cog"></i></a>
 <span class="divider"></span>
 <a href="javascript:;" data-tt="tooltip" title="Remove&nbsp;widget" class="btn btn-default btn-circle"><i class="fa fa-times"></i></a>
</div>
</div>
<div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">
  <table id="ostatus" class="table table-striped table-condensed">
  <thead>
    <tr>
     <th class="col-md-3">Created</th>
     <th class="col-md-2">Type</th>
     <th class="">Assigned</th>
     <th>overtime</th>
     <th class="col-md-2">Status</th>
    </tr>
  </thead>
  <tbody>
  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Registration</td>
   <td>Hermans Glenn</td>
   <td>10 min</td>
   <td><a href="#" id="ostatus">Rejected</a></td>
  </tr>
  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Request</td>
   <td>Hermans Glenn</td>
   <td>10 min</td>
   <td><a href="#" id="ostatus">Rejected</a></td>
  </tr>
  </tbody>
  </table>
  </div>
   </div>
  </div>
  </div>

<!-- Configure widget -->
<div class="modal" id="OvertimeSettings" tabindex="-1" role="dialog" aria-labelledby="#OvertimeSettingsLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="OvertimekSettingsLabel">Configure</h4>
      </div>
<div class="modal-body">
  
      <form action=""  method="POST">
       <div class="form-group">
         <label class="">Refresh time </label>
         <select name="refresh" class="form-control">
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>          
         </select>
       </div>
      </form>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
$(document).ready(function() {
  $("[data-tt=tooltip]").tooltip({ placement: 'bottom' });
    $('#ostatus a').editable({
    type: 'select',
            title: 'Select status',
            source: [
                {value: 1, text: 'Approved'},
                {value: 2, text: 'In progress '},
                {value: 3, text: 'Rejected'}
            ]
  });
  </script>