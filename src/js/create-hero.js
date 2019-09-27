const CreateHero = function(option = {}){

  let opt = _.cloneDeep(option);

  opt.$package = opt.$package || new Array(90);

  opt.$resumes = opt.$resumes || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  opt.$attrGrow = {
    maxHp : 10,
  }

  _.assign(this, opt);

};

export default CreateHero;