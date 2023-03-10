resumeApp.controller('educationCtrl', function($scope, toastService, utilService, $location, $log) {
  var educationList = this;
  educationList.educations = [];

  educationList.btnSaveEducation = "Add";
  if(JSON.parse(localStorage.getItem('addEducationObject'))){
    var resolveAddEducationObject = JSON.parse(localStorage.getItem('addEducationObject'));
    for(var i = 0; i < resolveAddEducationObject.length; i++) {
        var obj = resolveAddEducationObject[i];

        educationList.educations.push({id: obj.id, school_name: obj.school_name, degree: obj.degree, Start_date: obj.Start_date, End_date: obj.End_date});
        //console.log(obj.id);
    }
  }

  educationList.addEducation = function(){
    if(educationList.school_name==undefined
      || educationList.degree==undefined
      ||educationList.Start_date==undefined
      ||educationList.End_date==undefined
      || educationList.school_name==''
        || educationList.degree==''
        ||educationList.Start_date==''
        ||educationList.End_date=='')
      return false;

    var eduId = utilService.guid();
    if(educationList.id!=undefined && educationList.id!=''){
      var addEducationObject = JSON.parse(localStorage.getItem('addEducationObject'));
      for (i=0;i<addEducationObject.length;i++){
        if (addEducationObject[i].id == educationList.id) {
          addEducationObject[i].school_name = educationList.school_name;
          addEducationObject[i].degree = educationList.degree;
          addEducationObject[i].Start_date = educationList.Start_date;
          addEducationObject[i].End_date = educationList.End_date;
        }
      }
      localStorage.setItem('addEducationObject', JSON.stringify(addEducationObject));

      // Update the selected Project
      angular.forEach(educationList.educations, function (p) {
        if (p.id == educationList.id) {
          p.school_name = educationList.school_name;
          p.degree = educationList.degree;
          p.duration = educationList.Start_date;
          p.duration = educationList.End_date;
        }
      });
    }else{
      educationList.educations.push({id:eduId, school_name: educationList.school_name,degree:educationList.degree, Start_date: educationList.Start_date, End_date: educationList.End_date});

      var addEducationObject = JSON.parse(localStorage.getItem('addEducationObject')) || [];
      var addEducationNewItem = {'id': eduId, 'school_name': educationList.school_name, 'degree': educationList.degree, 'Start_date': educationList.Start_date , 'End_date': educationList.End_date};

      addEducationObject.push(addEducationNewItem);
      localStorage.setItem('addEducationObject', JSON.stringify(addEducationObject));
    }
    educationList.school_name = '';
    educationList.degree = '';
    educationList.Start_date = '';
    educationList.End_date = '';
    educationList.id = '';
    educationList.btnSaveEducation = "Add";

    toastService.showSimpleToast();
  }

  educationList.removeEducation = function(education) {
    var _index = educationList.educations.indexOf(education);
    var id = education.id;
    //console.log(education);
    educationList.educations.splice(_index, 1);

    var addEducationObject = JSON.parse(localStorage.getItem('addEducationObject'));
    for (i=0;i<addEducationObject.length;i++)
                if (addEducationObject[i].id == id) addEducationObject.splice(i,1);
    localStorage.setItem('addEducationObject', JSON.stringify(addEducationObject));
  }

  educationList.bindSelectedEducation = function(education) {
    educationList.btnSaveEducation = "Save";
    educationList.school_name = education.school_name;
    educationList.degree = education.degree;
    educationList.Start_date = education.Start_date;
    educationList.End_date = education.End_date;
    educationList.id = education.id;
  }


})
