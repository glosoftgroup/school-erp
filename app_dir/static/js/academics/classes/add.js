/*
***************************************************************
***************************************************************
Author         : GlosoftGroup Limited
Author URI     : https://www.glosoftgroup.com
File           : add/update.js
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
            class_group      :  $("#class_group"),
            stream           :  $("#stream"),
            no_of_students   :  $("#no_of_students"),
            class_teacher    :  $("#class_teacher"),
            room             :  $("#room"),
            academic_year    :  $("#academic_year"),

            //elements
            streamSelect     :  $("#stream"),
            roomSelect       :  $("#room"),
            academicSelect   :  $("#academic_year"),
            class_teacher    :  $("#class_teacher"),

            //urls
            streamUrl        :  $("#streamUrl").val(),
            roomUrl          :  $("#roomUrl").val(),
            academicYearUrl  :  $("#academicYearUrl").val(),
            teachersrUrl     :  $("#teachersrUrl").val(),
            redirectUrl      :  $("#redirectUrl").val(),

            postUrl          :  $('#postUrl').val(),
            postMethod       :  $('#postMethod').val(),

            updatePk         :  $("#pk").val()
        },
        populateData:{
            init:function (){
                $.get(allFunctions.el.streamUrl, function (response){
                    var streamOptions = response.results;
                    if(streamOptions != ""){
                        $.each(streamOptions,function(key, value){
                            allFunctions.el.streamSelect.append('<option value=' + value['id'] + '>' + value['name'] + '</option>');
                        });
                        allFunctions.el.streamSelect.selectpicker('refresh');
                    }
                });

                $.get(allFunctions.el.roomUrl, function (response){
                    var roomOptions = response.results;
                    if(roomOptions != ""){
                        $.each(roomOptions,function(key, value){
                            allFunctions.el.roomSelect.append('<option value=' + value['id'] + '>' + value['name'] + '</option>');
                        });
                        allFunctions.el.roomSelect.selectpicker('refresh');
                    }
                });

                $.get(allFunctions.el.academicYearUrl, function (response){
                    var yearOptions = response.results;
                    if(yearOptions != ""){
                        $.each(yearOptions,function(key, value){
                            allFunctions.el.academicSelect.append('<option value=' + value['id'] + '>' + value['name'] + '</option>');
                        });
                        allFunctions.el.academicSelect.selectpicker('refresh');
                    }
                });

                $.get(allFunctions.el.teachersrUrl, function (response){
                    var yearOptions = response.results;
                    if(yearOptions != ""){
                        $.each(yearOptions,function(key, value){
                            allFunctions.el.class_teacher.append('<option value=' + value['id'] + '>' + value['fullname'] + '</option>');
                        });
                        allFunctions.el.class_teacher.selectpicker('refresh');
                    }
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
                        class_group: {required:true, digits:true},
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
                    var postUrl    = allFunctions.el.postUrl;
                    var postMethod = allFunctions.el.postMethod;

                    axios.defaults.xsrfHeaderName = "X-CSRFToken";
                    axios.defaults.xsrfCookieName = 'csrftoken';

                    if(allFunctions.el.updatePk == "none"){
                        axios.post(postUrl,formData)
                            .then(function (response) {
                               if(response.status == 200 || response.status == 201){
                                  allFunctions.notification("success", "Added successfully", "Well Done!");
                                  allFunctions.ajaxForms.resetAddForm();
                                  window.location = allFunctions.el.redirectUrl;
                               }else{
                                  allFunctions.notification("danger", data.message, "Oops!");
                               }
                            })
                            .catch(function (error) {
                                console.log(error);
                                allFunctions.notification("danger", error, "Oops!");;
                            });

                    }else{
                        axios.put(postUrl, formData)
                            .then(function (response) {
                               if(response.status == 200 || response.status == 201){
                                  allFunctions.notification("success", "Updated successfully", "Well Done!");
                                  window.location = allFunctions.el.redirectUrl;
                               }else{
                                  allFunctions.notification("danger", data.message, "Oops!");
                               }
                            })
                            .catch(function (error) {
                                console.log(error);
                                allFunctions.notification("danger", error, "Oops!");;
                            });
                    }


                }
            },
            resetAddForm: function () {
                document.getElementById('addForm').reset();
            }
        }

    }


    $(document).ready(function () {
        allFunctions.plugins.init();
        allFunctions.populateData.init();
        allFunctions.ajaxForms.validateForm();
    });

})(jQuery);