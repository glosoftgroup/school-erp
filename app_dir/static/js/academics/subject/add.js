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

            //urls
            redirectUrl      :  $("#redirectUrl").val(),

            postUrl          :  $('#postUrl').val(),
            postMethod       :  $('#postMethod').val(),

            updatePk         :  $("#pk").val()
        },
        populateData:{
            init:function (){
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
                        name: {required:true},
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