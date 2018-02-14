/*
***************************************************************
***************************************************************
Author         : GlosoftGroup Limited
Author URI     : https://www.glosoftgroup.com
File           : add.js
***************************************************************
***************************************************************/

(function ($) {
    "use strict";
    var allFunctions = {
        $window: $(window),
        el:{
            /** form field ids */
            addForm          :  $('#addForm'),
            name             :  $("#name"),
            stream           :  $("#stream"),
            no_of_students   :  $("#no_of_students"),
            class_teacher    :  $("#class_teacher"),
            room             :  $("#room"),
            academic_year    :  $("#academic_year"),

            //elements
            streamSelect     :  $("#stream"),
            roomSelect       :  $("#room"),
            academicSelect   :  $("#academic_year"),

            //urls
            streamUrl        :  $("#streamUrl").val(),
            roomUrl          :  $("#roomUrl").val(),
            academicYearUrl  :  $("#academicYearUrl").val(),
            redirectUrl      :  $("#redirectUrl").val()
        },
        populateData:{
            init:function (){
                $.get(allFunctions.el.streamUrl, function (response){
                    var streamOptions = response.results;
                    $.each(streamOptions,function(key, value){
                        allFunctions.el.streamSelect.append('<option value=' + value['id'] + '>' + value['name'] + '</option>');
                    });
                    allFunctions.el.streamSelect.selectpicker('refresh');
                });

                $.get(allFunctions.el.roomUrl, function (response){
                    var roomOptions = response.results;
                    $.each(roomOptions,function(key, value){
                        allFunctions.el.roomSelect.append('<option value=' + value['id'] + '>' + value['name'] + '</option>');
                    });
                    allFunctions.el.roomSelect.selectpicker('refresh');
                });

                $.get(allFunctions.el.academicYearUrl, function (response){
                    var yearOptions = response.results;
                    $.each(yearOptions,function(key, value){
                        allFunctions.el.academicSelect.append('<option value=' + value['id'] + '>' + value['name'] + '</option>');
                    });
                    allFunctions.el.academicSelect.selectpicker('refresh');
                });
            }
        },
        notification:function(status, message , header){
            $.jGrowl(message, {
                header: header,
                theme: 'bg-'+status
            });
        },
        plugins:{
            init:function(){
                $('.bootstrap-select').selectpicker();
            }
        },
        ajaxForms: {
            validateForm: function () {
                allFunctions.el.addForm.validate({
                    onkeyup: function(element) {$(element).valid()},
                    rules:{
                        stream: {required:true},
                        name: {required:true},
                        no_of_students:{required: true},
                        class_teacher:{required:true},
                        room:{required:true},
                        academic_year:{required:true}

                    },
                    submitHandler: function() {
                      var f = document.getElementById('addForm'),
                          formData = new FormData(f);
                      allFunctions.ajaxForms.ajaxFormHandle(formData);
                    }
                  });
            },
            ajaxFormHandle: function (formData) {
                if (formData) {
                    var createUrl = $('#createUrl').val();
                    $.ajax({
                        url: createUrl,
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success:function(data){
                           if(data.status == 200){
                              allFunctions.notification("success", data.message, "Well Done!");
                              allFunctions.ajaxForms.resetAddForm();
                              window.location = allFunctions.el.redirectUrl;
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
                allFunctions.el.name.val('');
                allFunctions.el.stream.val('');
                allFunctions.el.no_of_students.val('');
                allFunctions.el.class_teacher.val('');
                allFunctions.el.room.val('');
                allFunctions.el.academic_year.val('');
            }
        }

    }


    $(document).ready(function () {
        allFunctions.plugins.init();
        allFunctions.populateData.init();
        allFunctions.ajaxForms.validateForm();
    });

})(jQuery);