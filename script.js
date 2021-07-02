const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const incluirMaiusculaElement = document.getElementById('incluirMaiuscula')
const incluirNumerosElement = document.getElementById('incluirNumeros')
const incluirSimbolosElement = document.getElementById('incluirSimbolos')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)

characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const incluirMaiuscula = incluirMaiusculaElement.checked
  const incluirNumeros = incluirNumerosElement.checked
  const incluirSimbolos = incluirSimbolosElement.checked
  const password = generatePassword(characterAmount, incluirMaiuscula, incluirNumeros, incluirSimbolos)
  passwordDisplay.innerText = password
})

function generatePassword(characterAmount, incluirMaiuscula, incluirNumeros, incluirSimbolos) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (incluirMaiuscula) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (incluirSimbolos) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (incluirNumeros) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}