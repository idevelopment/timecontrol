 <div class='block block-size-medium'>
<div class='block-heading'>
<div class='main-text'>{{Lang::get('tasks.WidgetTitle')}}</div>
<div class="pull-right">
<a href="#" role="button" data-toggle="modal" data-target="#taskSettings" data-tt="tooltip" title="Configure" class="btn btn-default btn-circle"><i class="fa fa-cog"></i></a>
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
     <th class="col-md-3">{{Lang::get('tasks.WidgetCreated')}}</th>
     <th class="col-md-2">{{Lang::get('tasks.WidgetType')}}</th>
     <th class="">{{Lang::get('tasks.WidgetAssigned')}}</th>
     <th>{{Lang::get('tasks.WidgetStart')}}</th>
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
  <tr>
   <td>30/11/2015 09:00 AM</td>
   <td>Coaching</td>
   <td>Hermans Glenn</td>
   <td>10:00 AM</td>
   <td><a href="#" id="status">Approved</a></td>
  </tr>
  </tbody>
  </table>

   </div>
   </div>
  </div>
  </div>


  {{-- Configure widget --}}
<div class="modal" id="taskSettings" tabindex="-1" role="dialog" aria-labelledby="#taskSettingsLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="taskSettingsLabel">Configure</h4>
      </div>
<div class="modal-body">
  
      <form action=""  method="POST">
       <div class="form-group">
         <label class="">Refresh time </label>
         <select name="refresh" class="form-control">
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>
          <option value="600">10 minutes</option>
          <option value="900">15 minutes</option>
          <option value="1800">30 minutes</option>
          <option value="300">1 hour</option>          
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