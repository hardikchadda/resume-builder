resumeApp.controller('experienceCtrl', function($scope, toastService, utilService, $location, $log) {
  var experienceList = this;
  experienceList.experiences = [];

  experienceList.btnSaveExperience = "Add";
  if(JSON.parse(localStorage.getItem('addExperienceObject'))){
    var resolveAddExperienceObject = JSON.parse(localStorage.getItem('addExperienceObject'));
    for(var i = 0; i < resolveAddExperienceObject.length; i++) {
        var obj = resolveAddExperienceObject[i];

        experienceList.experiences.push({id: obj.id, companyname: obj.companyname, Start_date: obj.Start_date, End_date: obj.End_date, role_company: obj.role_company, desc: obj.desc});
        //console.log(obj.id);
    }
  }

  experienceList.addExperience = function(){
    if(experienceList.companyname==undefined
      || experienceList.Start_date==undefined
      || experienceList.End_date==undefined
      ||experienceList.role_company==undefined
      ||experienceList.desc==undefined
      || experienceList.companyname==''
        || experienceList.Start_date==''
        || experienceList.End_date==''
        ||experienceList.role_company=='')
      return false;

    var expId = utilService.guid();
    if(experienceList.id!=undefined && experienceList.id!=''){
      var addExperienceObject = JSON.parse(localStorage.getItem('addExperienceObject'));
      for (i=0;i<addExperienceObject.length;i++){
        if (addExperienceObject[i].id == experienceList.id) {
          addExperienceObject[i].companyname = experienceList.companyname;
          addExperienceObject[i].Start_date = experienceList.Start_date;
          addExperienceObject[i].End_date = experienceList.End_date
          addExperienceObject[i].role_company = experienceList.role_company;
          addExperienceObject[i].desc = experienceList.desc;
        }
      }
      localStorage.setItem('addExperienceObject', JSON.stringify(addExperienceObject));

      // Update the selected Experience
      angular.forEach(experienceList.experiences, function (p) {
        if (p.id == experienceList.id) {
          p.companyname = experienceList.companyname;
          p.Start_date = experienceList.Start_date;
          p.End_date = experienceList.End_date;
          p.role_company = experienceList.role_company;
          p.desc = experienceList.desc;
        }
      });
    }else{
      experienceList.experiences.push({id:expId, companyname: experienceList.companyname, Start_date: experienceList.Start_date, End_date: experienceList.End_date, role_company: experienceList.role_company, desc: experienceList.desc});

      var addExperienceObject = JSON.parse(localStorage.getItem('addExperienceObject')) || [];
      var addExperienceNewItem = {'id': expId, 'companyname': experienceList.companyname, 'Start_date': experienceList.Start_date, 'End_date': experienceList.End_date, 'role_company': experienceList.role_company, 'desc': experienceList.desc};

      addExperienceObject.push(addExperienceNewItem);
      localStorage.setItem('addExperienceObject', JSON.stringify(addExperienceObject));
    }
    experienceList.companyname = '';
    experienceList.Start_date = '';
    experienceList.End_date = '';
    experienceList.role_company = '';
    experienceList.desc = '';
    experienceList.id = '';
    experienceList.btnSaveExperience = "Add";
    
    toastService.showSimpleToast();
  }

  experienceList.removeExperience = function(experience) {
    var _index = experienceList.experiences.indexOf(experience);
    var id = experience.id;
    console.log(experience);
    experienceList.experiences.splice(_index, 1);

    var addExperienceObject = JSON.parse(localStorage.getItem('addExperienceObject'));
    for (i=0;i<addExperienceObject.length;i++)
                if (addExperienceObject[i].id == id) addExperienceObject.splice(i,1);
    localStorage.setItem('addExperienceObject', JSON.stringify(addExperienceObject));
  }

  experienceList.bindSelectedData = function(experience) {
    experienceList.btnSaveExperience = "Save";
    experienceList.companyname = experience.companyname;
    experienceList.Start_date = experience.Start_date;
    experienceList.End_date = experience.End_date;
    experienceList.role_company = experience.role_company;
    experienceList.desc = experience.desc;
    experienceList.id = experience.id;
  }
})
