var mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
var usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

var doseSchema = new mongoose.Schema({
	// whatevber we record about a dose
	dose: {type: Number, required: true},
	givenAt: { type: Date, default: Date.now }
})

var profileSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User', 
		required: true
	},
	profileName: {type: String, required: true},
	drugName: {type: String, required: true},
	prophyDosage: {type: Number, required: true},
	treatmentDosage: {type: Number, required: true},
	weight: {type: Number, required: true},
	halfLife: {type: Number, required: true},
	dosageLog: [doseSchema]

})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Profile: mongoose.model('Profile', profileSchema)
}
