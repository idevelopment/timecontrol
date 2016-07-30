@extends('header')
@section('content')
<div class="page-header">
<h2>Edit teamname</h2>
</div>

<div class="col-md-12">
  <form action="{{ url('staff/teams/edit') }}" method="post" class="form-horizontal">
   {!! csrf_field() !!}

<div class="well well-sm">
<div class="btn-group">
<button  type="submit" class="btn btn-sm btn-default">Save</button>
</div>
</div>

<ul class="nav nav-tabs tabs-float">
              <li role="presentation" class="active"><a href="#infoTab" data-toggle="tab">General</a></li>
              <li role="presentation"><a href="#teamsTab" data-toggle="tab">Staff</a></li>
              <li role="presentation"><a href="#notificationsTab" data-toggle="tab">Notifications</a></li>
            </ul>

<div class="tab-content">
  <div class="tab-pane fade in active" id="infoTab">
   <div class="form-group formSep">
    <label for="department_name" class="col-md-2 control-label">{{Lang::get('teams.department')}} <span class="text-danger">*</span></label>
    <div class="col-md-6">
     <select id="department_name" name="department" class="form-control">
      <option value=""></option>
     </select>
    </div>
  </div>

  <div class="form-group">
   <label for="team_name" class="col-md-2 control-label">{{Lang::get('teams.name')}} <span class="text-danger">*</span></label>
    <div class="col-md-6">
     <input type="text" id="team_name" name="team_name" class="form-control">
    </div>
  </div>

  </div> 

    <div class="tab-pane fade in" id="teamsTab">
     <div id="pickList"></div>
    </div>  

    <div class="tab-pane fade in" id="notificationsTab">
     <div class="form-group formSep">
      <label class="col-md-2 control-label">New task requests <span class="text-danger">*</span></label>
      <div class="col-md-7">
       
       <div class="radio">
        <label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"> Send to all managers</label>
       </div>

       <div class="radio">
        <label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Only to default manager</label>
       </div>

    </div>
  </div>

       <div class="form-group formSep">
      <label class="col-md-2 control-label">New vacation requests <span class="text-danger">*</span></label>
      <div class="col-md-7">
       
       <div class="radio">
        <label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"> Send to all managers</label>
       </div>

       <div class="radio">
        <label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Only to default manager</label>
       </div>

    </div>
  </div>

     <div class="form-group formSep">
      <label class="col-md-2 control-label">New sick leave notifications <span class="text-danger">*</span></label>
      <div class="col-md-7">
       
       <div class="radio">
        <label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"> Send to all managers</label>
       </div>

       <div class="radio">
        <label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Only to default manager</label>
       </div>

    </div>
  </div>

  </div>
 </div>
</form>

 </div>

<script type="text/javascript">
$(document).ready(function() {
(function($) {

  $.fn.pickList = function(options) {

    var opts = $.extend({}, $.fn.pickList.defaults, options);

    this.fill = function() {
      var option = '';

      $.each(opts.data, function(key, val) {
        option += '<option id=' + val.id + '>' + val.text + '</option>';
      });
      this.find('#pickData').append(option);
    };
    this.controll = function() {
      var pickThis = this;

      $("#pAdd").on('click', function() {
        var p = pickThis.find("#pickData option:selected");
        p.clone().appendTo("#pickListResult");
        p.remove();
      });

      $("#pAddAll").on('click', function() {
        var p = pickThis.find("#pickData option");
        p.clone().appendTo("#pickListResult");
        p.remove();
      });

      $("#pRemove").on('click', function() {
        var p = pickThis.find("#pickListResult option:selected");
        p.clone().appendTo("#pickData");
        p.remove();
      });

      $("#pRemoveAll").on('click', function() {
        var p = pickThis.find("#pickListResult option");
        p.clone().appendTo("#pickData");
        p.remove();
      });
    };
    this.getValues = function() {
      var objResult = [];
      this.find("#pickListResult option").each(function() {
        objResult.push({
          id: this.id,
          text: this.text
        });
      });
      return objResult;
    };
    this.init = function() {
      var pickListHtml =
        "<div class='row'>" +
        "  <div class='col-sm-5'>" +
        "	 <select class='form-control pickListSelect' id='pickData' multiple></select>" +
        " </div>" +
        " <div class='col-sm-2 pickListButtons'>" +
        "	<button id='pAdd' class='btn btn-primary btn-sm'>" + opts.add + "</button>" +
        "      <button id='pAddAll' class='btn btn-primary btn-sm'>" + opts.addAll + "</button>" +
        "	<button id='pRemove' class='btn btn-primary btn-sm'>" + opts.remove + "</button>" +
        "	<button id='pRemoveAll' class='btn btn-primary btn-sm'>" + opts.removeAll + "</button>" +
        " </div>" +
        " <div class='col-sm-5'>" +
        "    <select class='form-control pickListSelect' id='pickListResult' multiple></select>" +
        " </div>" +
        "</div>";

      this.append(pickListHtml);

      this.fill();
      this.controll();
    };

    this.init();
    return this;
  };

  $.fn.pickList.defaults = {
    add: 'Add',
    addAll: 'Add All',
    remove: 'Remove',
    removeAll: 'Remove All'
  };


}(jQuery));


var val = {
  01: {
    id: 01,
    text: 'Isis'
  },
  02: {
    id: 02,
    text: 'Sophia'
  },
  03: {
    id: 03,
    text: 'Alice'
  },
  04: {
    id: 04,
    text: 'Isabella'
  },
  05: {
    id: 05,
    text: 'Manuela'
  },
  06: {
    id: 06,
    text: 'Laura'
  },
  07: {
    id: 07,
    text: 'Luiza'
  },
  08: {
    id: 08,
    text: 'Valentina'
  },
  09: {
    id: 09,
    text: 'Giovanna'
  },
  10: {
    id: 10,
    text: 'Maria Eduarda'
  },
  11: {
    id: 11,
    text: 'Helena'
  },
  12: {
    id: 12,
    text: 'Beatriz'
  },
  13: {
    id: 13,
    text: 'Maria Luiza'
  },
  14: {
    id: 14,
    text: 'Lara'
  },
  15: {
    id: 15,
    text: 'Julia'
  }
};

var pick = $("#pickList").pickList({
  data: val
});

$("#getSelected").click(function() {
  console.log(pick.getValues());
});

});
</script>
 @endsection