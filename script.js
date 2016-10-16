var array1 = new Array();
var array2 = new Array();
var method = 0;
// 0 - common elements for arrays A and B
// 1 - unique elements in array A

window.onload = function()
{
  closeResult();
}

function methodChange()
{
  var index = document.getElementById('method-select').selectedIndex;
  method = index;
  // if selected method of unique elements, one array is needed
  // else if selected method of common elements, two arrays are needed
  index == 1 ? document.getElementById('array2').style.visibility = 'hidden': document.getElementById('array2').style.visibility = 'visible';
}

function elementBlur(elem, arrNumber)
{
  var parentBox;
  arrNumber === 1 ? parentBox = document.getElementById('array1'): parentBox = document.getElementById('array2');

  if (elem.value != '')
  {
    var lineBreak = document.createElement('br');
    var newInput = document.createElement('input');
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('placeholder', 'Новий елемент');
    newInput.setAttribute('onblur', 'elementBlur(this, '+arrNumber+')');

    parentBox.appendChild(newInput);
    parentBox.appendChild(lineBreak);

    arrNumber === 1 ? array1.push(elem.value): array2.push(elem.value);
  }
}

function analyze()
{
  var resultArray;

  if (method == 0)
  {
    if (array1.length < 2 || array2.length < 2)
      alert('Занадто малий розмір масиву, додайте більше елементів');
    else {
      resultArray = findCommon(array1, array2);
    }
  }
  else
  {
    if (array1.length < 2)
      alert('Занадто малий розмір масиву, додайте більше елементів');
    else {
      resultArray = findUnique(array1);
    }
  }

  showResult(resultArray);
}

// Returns string array
function findUnique(array)
{
  var obj = {};
  for (var i = 0; i < array.length; i++)
  {
    var str = array[i].toString();
    obj[str] = true;
  }

  return Object.keys(obj);
}


function findCommon(array1, array2)
{
  var result = new Array();
  array1 = findUnique(array1);

  for (var i = 0; i < array1.length; i++)
  {
    for (var j = 0; j < array2.length; j++)
    {
      if (parseInt(array1[i]) == array2[j])
      {
        result.push(array1[i]);
        break;
      }
    }
  }

  return result;
}

function showResult(result)
{
  var content = document.getElementById('result-content');
  content.innerHTML = '';

  if (result.length == 0)
    content.innerHTML = 'Спільних елементів не знайдено';
  else {
    for (var i = 0; i < result.length; i++)
    {
      var span = document.createElement('span');
      span.innerHTML = result[i];
      content.appendChild(span);
    }
  }

  document.getElementById('result-box').style.visibility = 'visible';
  document.getElementById('overlay').style.visibility = 'visible';
}


function closeResult()
{
  document.getElementById('result-box').style.visibility = 'hidden';
  document.getElementById('overlay').style.visibility = 'hidden';
}
