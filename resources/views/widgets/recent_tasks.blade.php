 <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>Recent tasks requests</div>
<div class="pull-right">
<a href="javascript:;" role="button" data-toggle="modal" data-target="#taskSettings" data-tt="tooltip" title="Configure" class="btn btn-default btn-circle"><i class="fa fa-cog"></i></a>
 <span class="divider"></span>
 <a href="javascript:;" data-tt="tooltip" title="Remove&nbsp;widget" class="btn btn-default btn-circle"><i class="fa fa-times"></i></a>
</div>
</div>

 <div class='block-content-outer'>
 <div class='block-content-inner'>
  <div class="container-fluid">

  <table id="status" class="table table-striped table-condensed">
  <thead>
    <tr>
     <th class="col-md-3">Created</th>
     <th class="col-md-2">Type</th>
     <th class="">Assigned</th>
     <th>Task starts</th>
     <th class="col-md-2">Status</th>
    </tr>
  </thead>
  <tbody>
  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Call back</td>
   <td>Hermans Glenn</td>
   <td>10:00 AM</td>
   <td><a href="#" id="status">Approved</a></td>
  </tr>

  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Call back</td>
   <td>Hermans Glenn</td>
   <td>10:00 AM</td>
   <td><a href="#" id="status">Rejected</a></td>
  </tr>

  </tbody>
  </table>

   </div>
   </div>
  </div>
  </div>


  <!-- Configure widget -->
<div class="modal" id="taskSettings" tabindex="-1" role="dialog" aria-labelledby=="#taskSettingsLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="taskSettingsLabel">Configure</h4>
      </div>
      <div class="modal-body">
        <form class="">
         <label>Refresh time </label>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
$(document).ready(function() {
  $("[data-tt=tooltip]").tooltip({ placement: 'bottom' });
   $.fn.editable.defaults.mode = 'popup';
  $('#status a').editable({
    type: 'select',
            title: 'Select status',
            source: [
                {value: 1, text: 'Approved'},
                {value: 2, text: 'In progress '},
                {value: 3, text: 'Rejected'}
            ]
  });
});

</script>