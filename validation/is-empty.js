// ES7 style (value is a parameter.)
//  If you have more than one line we need {}.
const isEmpty = value => 
  value === undefined || 
  value === null || 
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

  module.exports = isEmpty;