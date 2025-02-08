// Esperamos a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let currentExpression = '';

  // Función para actualizar la pantalla de la calculadora
  function updateDisplay() {
    display.textContent = currentExpression || '0';
  }

  // Función para agregar valores (dígitos u operadores) a la expresión
  function appendValue(value) {
    const operators = ['+', '-', '*', '/', '.'];

    // Evitamos iniciar con un operador (excepto el punto, si lo deseas)
    if (currentExpression === '' && operators.includes(value) && value !== '.') {
      return;
    }

    // Si el último carácter es un operador y se ingresa otro operador, lo reemplazamos
    const lastChar = currentExpression.slice(-1);
    if (operators.includes(lastChar) && operators.includes(value) && value !== '.') {
      currentExpression = currentExpression.slice(0, -1);
    }
    currentExpression += value;
  }

  // Función para evaluar la expresión y mostrar el resultado
  function calculateResult() {
    try {
      // Usamos eval para evaluar la cadena; en proyectos reales se debe sanear la entrada.
      let result = eval(currentExpression);
      currentExpression = result.toString();
    } catch (error) {
      currentExpression = 'Error';
    }
  }

  // Función para manejar la operación de porcentaje
  function handlePercentage() {
    // Esta implementación aplica el porcentaje solo si la expresión actual es un número simple
    if (currentExpression && !/[+\-*/]/.test(currentExpression)) {
      let value = parseFloat(currentExpression);
      if (!isNaN(value)) {
        value = value / 100;
        currentExpression = value.toString();
      }
    }
  }

  // Obtenemos todos los botones de la calculadora
  const buttons = document.querySelectorAll('.buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');

      switch (value) {
        case 'C':
          // Limpiar toda la expresión
          currentExpression = '';
          break;
        case 'DEL':
          // Eliminar el último carácter
          currentExpression = currentExpression.slice(0, -1);
          break;
        case '=':
          // Evaluar la expresión y mostrar el resultado
          calculateResult();
          break;
        case '%':
          // Aplicar porcentaje al número actual (si es un número simple)
          handlePercentage();
          break;
        default:
          // Agregar el dígito u operador a la expresión
          appendValue(value);
      }
      updateDisplay();
    });
  });
});
