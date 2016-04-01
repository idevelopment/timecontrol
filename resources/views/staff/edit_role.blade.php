@extends('header')

@section('content')
 <div class="page-header">
  <h2>Change role</h2>
 </div>

<div class="well well-sm">
<button class="btn btn-sm btn-primary" onclick="location.href='policies/create';">Save changes</button>
<button class="btn btn-sm btn-danger">Cancel</button>
</div>

<form action="{{ url('staff/policies/create') }}" method="POST" class="form-horizontal">

<div class="panel panel-default">
<div class="panel-heading">General information</div>
<div class="panel-body">
{!! csrf_field() !!}

<div class="form-group">
 <label for="role_name" class="col-md-2 control-label">Role name <span class="text-danger">*</span></label>
 <div class="col-md-6">
 <input type="text" id="role_name" name="role_name" class="form-control">
</div>
</div>

<div class="form-group">

<label for="permissions" class="col-md-2 control-label">Permissions <span class="text-danger">*</span></label>
 <div class="col-md-6">
 <div id="pickList"></div>
 <script type="text/javascript">
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
    text: 'Create users'
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
}
};

var pick = $("#pickList").pickList({
  data: val
});

$("#getSelected").click(function() {
  console.log(pick.getValues());
});


 </script>
 <p class="text-danger">The list below needs to be loaded into the multiselect</p>
  @foreach($permissions as $permission_item)
   <div class="checkbox">
    <label for="{{ $permission_item->id }}">
      <input type="checkbox" name="permissions[]" id="{{ $permission_item->id }}" value="{{ $permission_item->name }}"> {{ $permission_item->name }}
    </label>
   </div>
  @endforeach
</div>
</div>
</div>

</div>
</form>
@endsection
