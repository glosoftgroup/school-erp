/*
***************************************************************
***************************************************************
Author         : GlosoftGroup Limited
Author URI     : https://www.glosoftgroup.com
File           : addUsers.js
***************************************************************
***************************************************************/

(function ($) {
    "use strict";
    var allFunctions = {
        $window: $(window),
        el:{
            /** tab ids */
            profile          :  $("#profile"),
            profileTab       :  $("#profile-tab"),
            permissions      :  $("#permissions"),
            permissionsTab   :  $("#permissions-tab"),
            /** form field ids */
            addUserForm      :  $('#user-details'),
            fullname         :  $("#fullname"),
            name             :  $("#name"),
            email            :  $("#email"),
            password         :  $("#password"),
            confirm_password :  $("#confirm_password"),
            nid              :  $("#nid"),
            mobile           :  $("#mobile"),
            /** permissions tab fields */
            checkAll         :  $('#checkAll')
        },
        notification:function(status, message , header){
            $.jGrowl(message, {
                header: header,
                theme: 'bg-'+status
            });
        },
        ajaxForms: {
            validateForm: function () {
                /* mask phone number */
                $('#mobisdle').inputmask({
                  mask: '(254)-000-000-000'
                });
                allFunctions.el.addUserForm.validate({
                    onkeyup: function(element) {$(element).valid()},
                    rules:{
                        name: {required:true,minlength:4},
                        fullname: {required:true},
                        email:{required: true,email:true},
                        password:{required:true,minlength: 6},
                        confirm_password:{required:true,minlength:6,equalTo: "#password"},
                        nid:{required:true,digits: true,minlength: 6},
                        mobile:{required:true,minlength: 6}

                    },
                    messages:{
                      name:{required: "please provide a username"},
                      password:{required: "please provide a password"},
                      confirm_password:{
                        required: "please provide a password",
                        equalTo: "please enter the same password"}
                    },
                    submitHandler: function() {
                      var file = $('#image')[0].files[0],
                          raw_groups = $("#multiple :selected").map(function(){
                               return $(this).val();
                            }).get();


                      var f = document.getElementById('user-details'),
                          formData = new FormData(f);
                      if (file != ''){
                        formData.append("image", file);
                      }
                      for (var i = 0; i < raw_groups.length; i++) {
                          formData.append('groups[]', raw_groups[i]);
                      }
                      allFunctions.ajaxForms.ajaxFormHandle(formData);

                    }
                  });
            },
            ajaxFormHandle: function (formData) {
                if (formData) {
                    var createUrl = $('#process-create').val();
                    $.ajax({
                        url: createUrl,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success:function(data){
                           if(data.status == 200){
                              allFunctions.notification("success", data.message, "Well Done!");
                              localStorage.setItem('user_id', data.value);
                              $('.user_id').val(localStorage.getItem("user_id"));
                              allFunctions.ajaxForms.resetAddForm();
                              allFunctions.ajaxForms.moveToNextTab();
                           }else{
                              allFunctions.notification("danger", data.message, "Oops!");
                           }
                        },
                        error:function(error){
                          allFunctions.notification("danger", error, "Oops!");
                        }
                    });
                }
            },
            resetAddForm: function () {
                allFunctions.el.fullname.val('');
                allFunctions.el.name.val('');
                allFunctions.el.email.val('');
                allFunctions.el.password.val('');
                allFunctions.el.confirm_password.val('');
                allFunctions.el.nid.val('');
                allFunctions.el.mobile.val('');
            },
            moveToNextTab: function () {
                allFunctions.el.profile.removeClass('active');
                allFunctions.el.profileTab.removeClass('active');
                allFunctions.el.permissions.addClass('active');
                allFunctions.el.permissionsTab.addClass('active');
            }
        },
        permissionsCheck: {
            init: function () {
                allFunctions.permissionsCheck.loginCheckBox();
                allFunctions.permissionsCheck.allCheckBox();
                allFunctions.permissionsCheck.singleCheckBox();
                allFunctions.permissionsCheck.sendPermissions();
            },
            loginCheckBox: function () {
                /** login-check box selected */
                $("#can-login").click(function () {
                    var checked = $(this).is(':checked');
                    if(checked){
                        $(this).prop("checked", true);
                        $(this).parent().parent().parent().siblings('span').show();
                        $(this).parent().parent().parent().siblings('span').text('(granted)');
                        $('.check').each(function(){
                            $(this).parent().parent().removeClass('disabled');
                            $(this).parent().parent().parent().parent().removeClass('disabled');
                            $(this).removeAttr('disabled');
                        });
                    }else{
                        $(this).prop("checked", false);
                        $(this).parent('span').removeClass('checked');
                        $(this).parent().parent().parent().siblings('span').hide();
                        $('.check').each(function(){
                            $(this).parent().parent().addClass('disabled');
                            $(this).parent().parent().parent().parent().addClass('disabled');
                            $(this).attr('disabled', 'disabled');
                        });
                    }
                });
            },
            allCheckBox: function () {
                /** select-all check box selected */
                $("#checkAll").click(function () {
                var checked = $(this).is(':checked');
                if(checked){
                    $('.check').each(function(){
                        $(this).prop("checked", true);
                        $(this).parent().parent().parent().siblings('span').show();
                        $(this).parent().parent().parent().siblings('span').text('(granted)');
                        $(this).parent().addClass('checked');
                    });
                }else{
                    $('.check').each(function(){
                        $(this).prop("checked", false);
                        $(this).parent().parent().parent().siblings('span').hide();
                        $(this).parent().removeClass('checked');
                    });
                }
                });
            },
            singleCheckBox: function () {
                /** single checkbox selected */
                $( ".check" ).on( "click", function(){
                    var checked = $(this).is(':checked');
                    if(checked){
                        $(this).prop("checked", true);
                        $(this).parent().parent().parent().siblings('span').show();
                        $(this).parent().parent().parent().siblings('span').text('(granted)');
                        if($('.check:checked').length == $('.check').length){
                            $('#checkAll').prop("checked", true);
                            $('#checkAll').parent('span').addClass('checked');
                        }
                    }else{
                        if($('#checkAll').is(':checked')){
                            $('#checkAll').prop("checked", false);
                            $('#checkAll').parent('span').removeClass('checked');
                            $('#checkAll').parent().parent().parent().siblings('span').hide();

                            $('.check:not(this)').each(function(){
                                $(this).prop("checked", true);
                                $(this).parent().parent().parent().siblings('span').show();
                                $(this).parent().parent().parent().siblings('span').text('(granted)');
                            });

                            $(this).prop("checked", false);
                            $(this).parent('span').removeClass('checked');
                            $(this).parent().parent().parent().siblings('span').hide();
                        }else{
                            $(this).prop("checked", false);
                            $(this).parent('span').removeClass('checked');
                            $(this).parent().parent().parent().siblings('span').hide();

                        }
                    }
                });

            },
            sendPermissions: function () {
                $("#permission-btn").click(function(e){
                    e.preventDefault();
                    var checkBoxesStringArray = $(".check:checked").map(function(){
                      return $(this).val();
                    }).get();
                    var checkBoxesStringNumber = checkBoxesStringArray.map(Number);
                    /* check can login status */
                    if($("#can-login").is(':checked')){
                        $("#can-login").val('active')
                    }else{
                        $("#can-login").val('inactive');
                    }
                    var can_login_value = $("#can-login").val();
                    var permUrl = $('#user-assign-permissions').val();
                    $.ajax({
                        url: permUrl,
                        type: 'POST',
                        data: {
                            'checklist[]': checkBoxesStringNumber,
                            'user_id': localStorage.getItem('user_id'),
                            'check_login':can_login_value,
                            'csrfmiddlewaretoken':$('#csrftoken').val()
                        },
                        success: function(data){
                            if(data.status == 200){
                                allFunctions.notification("success", data.message, "Well Done!");
                                window.location = $('#user-list').val();
                                localStorage.removeItem('user_id');
                            }else{
                                allFunctions.notification("danger", data.message, "Oops!");
                            }
                        },
                        error:function(error){
                          allFunctions.notification("danger", error, "Oops!");
                        }
                     });

                    });

            }
        }

    }


    $(document).ready(function () {
        allFunctions.permissionsCheck.init();
        allFunctions.ajaxForms.validateForm();

    });

})(jQuery);