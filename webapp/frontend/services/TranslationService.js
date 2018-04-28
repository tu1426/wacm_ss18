let translations = {
  emailInput: {
    en: 'Email',
    de: 'Email'
  },
  emailInputPH: {
    en: 'Enter your email address',
    de: 'Bitte Email Adresse eingeben'
  },
  passwordInput: {
    en: 'Password',
    de: 'Passwort'
  },
  passwordInputPH: {
    en: 'Enter your password',
    de: 'Bitte Passwort eingeben'
  },
  passwordRepeatInput: {
    en: 'Password repeat',
    de: 'Passwort wiederholen'
  },
  passwordRepeatInputPH: {
    en: 'Enter your password again',
    de: 'Bitte Passwort nochmals eingeben'
  },
  nameInput: {
    en: 'Name',
    de: 'Name'
  },
  nameInputPH: {
    en: 'Enter your full name',
    de: 'Bitte vollständigen Namen eingeben'
  },
  birthdayInput: {
    en: 'Birthday',
    de: 'Geburtstag'
  },
  genderInput: {
    en: 'Gender',
    de: 'Geschlecht'
  },
  male:{
    en: 'male',
    de: 'männlich'
  },
  female:{
    en: 'female',
    de: 'weiblich'
  },
  registerLabel:{
    en: 'Register',
    de: 'Registrieren'
  },
  registerRFLabel:{
    en: 'Register as Research Facility',
    de: 'Registrieren als Forschungseinrichtung'
  },
  resetLabel:{
    en: 'Reset',
    de: 'Zurücksetzen'
  },
  register_required_data_missing_error:{
    en: 'Some data is missing for registration.',
    de: 'Es fehlen Daten für die Registrierung.'
  },
  email_no_email_error:{
    en: 'Email not set.',
    de: 'Email fehlt.'
  },
  gender_select_error:{
    en: 'Wrong gender, please contact admin..',
    de: 'Geschlecht falsch angegeben, bitte Administrator kontaktieren.'
  },
  user_creation_problem_error:{
    en: 'There was a problem while saving the user, please contact admin.',
    de: 'Es gab einen Fehler beim Speichern des Users, bitte Administrator kontaktieren.'
  },
  user_already_registered_error:{
    en: 'User with this mail is already registered.',
    de: 'Nutzer mit dieser Email ist bereits registriert.'
  },
  passwords_not_matching_error:{
    en: 'Passwords do not match.',
    de: 'Passwörter stimmen nicht überein.'
  },
  password_too_short_error:{
    en: 'Password must be at least 8 digits long.',
    de: 'Passwort muss mindestens 8 Zeichen lang sein.'
  },
  gender_not_set_error:{
    en: 'Gender not set.',
    de: 'Geschlecht fehlt.'
  },
  name_not_set_error:{
    en: 'Name not set.',
    de: 'Name fehlt'
  },
  email_not_set_error:{
    en: 'Email not set.',
    de: 'Email fehlt.'
  },
  birthday_after_today_error:{
    en: 'Birthday is not allowed to be after today.',
    de: 'Geburtstag darf nicht nach heute sein.'
  },
  birthday_not_set_error:{
    en: 'Birthday not set.',
    de: 'Geburtstag fehlt.'
  },
  register_state_missing_error:{
    en: 'No user state given when registering.',
    de: 'Es wurde kein Benutzer Status angegeben.'
  },
  rf_registered_successfully:{
    en: 'Your research facility was registered successfully, please await activation.',
    de: 'Ihre Forschungseinrichtung wurde erfolgreich angelegt, bitte Aktivierung abwarten.'
  }
};

export default {

  translate(lang, key) {
    let toTranslate = translations[key];
    if(lang === 'de'){
      return toTranslate.de;
    } else{
      return toTranslate.en;
    }
  },
}