const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400};
  const {name, budget} = req.body;
  if (name === undefined || budget === undefined) {
    error.message = 'name and budget are required'
    next(error)
  } 
   if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)
  } if
   (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
    next(error)
  }  if
     (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
    next(error)
  }  if
   (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name).first()
    if (existing === req.body.name) {
      next({status: 400, message: 'that name is taken'})
    }
     else {
      next()
    }
  }
   catch (error) {
    next(error)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
     if (!account) {
       next({status: 404, message: 'account not found'})
     } 
     else {
       req.account = account
       next()
     }
  } 
  catch (err) {
    next(err)
  }
}