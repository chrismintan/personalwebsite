fakeReady = false;
realReady = false;

function titleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function getOnion() {
  let ajaxCall = `https://www.reddit.com/r/TheOnion/top/.json?t=month&limit=50`;

  let responseHandler = function() {
    let responseObj = JSON.parse(this.responseText);
    fakeBank = responseObj;
    fakeReady = true;
    if ( fakeReady == true && realReady == true ) {
      appendArticles();
      fakeReady = false;
    }
  }

  let request = new XMLHttpRequest();

  request.addEventListener('load', responseHandler);

  request.open('GET', ajaxCall);

  request.send();
}

function getNotOnion() {
  let ajaxCall = `https://www.reddit.com/r/nottheonion/top/.json?t=month&limit=50`;

  let responseHandler = function() {
    let responseObj = JSON.parse(this.responseText);
    realBank = responseObj;
    realReady = true;
    if ( fakeReady == true && realReady == true ) {
      appendArticles();
      realReady = false;
    }
  }

  let request = new XMLHttpRequest();

  request.addEventListener('load', responseHandler);

  request.open('GET', ajaxCall);

  request.send();
}

$("#project2-tryme").click(function(){
  getOnion();
  getNotOnion();
})

function appendOnion() {
  let rNum = Math.ceil(Math.random() * Math.ceil(50));

  let headline = fakeBank.data.children[rNum].data.title;
  let image_url = fakeBank.data.children[rNum].data.thumbnail;
  let article_url = fakeBank.data.children[rNum].data.url;
  let type = 'Fake!';

  onion_url = article_url;

  if ( document.getElementById('headline1').textContent == "" ) {
    article1(image_url, titleCase(headline));
    onion = 1;
    document.getElementById('article1').addEventListener('click', minus);
    document.getElementById('article1').addEventListener('click', colorizeRed1);
    document.getElementById('article1').style.cursor = 'pointer';

  } else {
    article2(image_url, titleCase(headline));
    onion = 2;
    document.getElementById('article2').addEventListener('click', minus);
    document.getElementById('article2').addEventListener('click', colorizeRed2);
    document.getElementById('article2').style.cursor = 'pointer';
  }
}

function appendNotOnion() {
  let rNum = Math.ceil(Math.random() * Math.ceil(50));

  let headline = realBank.data.children[rNum].data.title;
  let image_url = realBank.data.children[rNum].data.thumbnail;
  let article_url = realBank.data.children[rNum].data.url;
  let type = 'Real!';

  notOnion_url = article_url;

  if ( document.getElementById('headline1').textContent == "" ) {
    article1(image_url, titleCase(headline));
    onion = 1;
    document.getElementById('article1').addEventListener('click', plus);
    document.getElementById('article1').addEventListener('click', colorizeGreen1);
    document.getElementById('article1').style.cursor = 'pointer';

  } else {
    article2(image_url, titleCase(headline));
    onion = 2;
    document.getElementById('article2').addEventListener('click', plus);
    document.getElementById('article2').addEventListener('click', colorizeGreen2);
    document.getElementById('article2').style.cursor = 'pointer';
  }
}

function article1(img, headline) {
  document.getElementById('img1').src = img;
  document.getElementById('headline1').textContent = headline;
  document.getElementById('article1').style.display = 'table';
}

function article2(img, headline) {
  document.getElementById('img2').src = img;
  document.getElementById('headline2').textContent = headline;
  document.getElementById('article2').style.display = 'table';
}

function hideWhileLoad() {
  document.getElementById('article1').style.display = 'none';
  document.getElementById('article2').style.display = 'none';
}

function clearAll() {
  document.getElementById('img1').src = "";
  document.getElementById('headline1').textContent = "";
  document.getElementById('img2').src = "";
  document.getElementById('headline2').textContent = "";
}

function colorizeGreen1() {
  document.getElementById('article1').style.background = 'rgb(125, 244, 66)';
  document.getElementById('header1').style.display = 'block';
  document.getElementById('header1').textContent = 'Fake!';
  document.getElementById('header1').style.background = '#FF4136';
}

function colorizeGreen2() {
  document.getElementById('article2').style.background = 'rgb(125, 244, 66)';
  document.getElementById('header2').style.display = 'block';
  document.getElementById('header2').textContent = 'Fake!';
  document.getElementById('header2').style.background = '#FF4136';
}

function colorizeRed1() {
  document.getElementById('article1').style.background = 'rgb(188, 62, 62)';
  document.getElementById('header1').style.display = 'block';
  document.getElementById('header1').textContent = 'Real!';
  document.getElementById('header1').style.background = '#3D9970';
}

function colorizeRed2() {
  document.getElementById('article2').style.background = 'rgb(188, 62, 62)';
  document.getElementById('header2').style.display = 'block';
  document.getElementById('header2').textContent = 'Real!';
  document.getElementById('header2').style.background = '#3D9970';
}

function deColorize() {
  document.getElementById('article2').style.background = "white";
  document.getElementById('article1').style.background = "white";
  document.getElementById('header1').style.display = 'none';
  document.getElementById('header2').style.display = 'none';
}

function plus() {
  // Remove event listener from articles
  let old_element1 = document.getElementById('article1');
  let new_element1 = old_element1.cloneNode(true);
  old_element1.parentNode.replaceChild(new_element1, old_element1);

  let old_element2 = document.getElementById('article2');
  let new_element2 = old_element2.cloneNode(true);
  old_element2.parentNode.replaceChild(new_element2, old_element2);

  setLinks();
  stopHover();
}

function minus() {
  // Remove all event listener from articles. This is done by cloning the old element and replacing the old element with the new element
  let old_element1 = document.getElementById('article1');
  let new_element1 = old_element1.cloneNode(true);
  old_element1.parentNode.replaceChild(new_element1, old_element1);

  let old_element2 = document.getElementById('article2');
  let new_element2 = old_element2.cloneNode(true);
  old_element2.parentNode.replaceChild(new_element2, old_element2);

  setLinks();
  stopHover();
}

function setLinks() {
  document.getElementById('article1').style.cursor = 'default';
  document.getElementById('article2').style.cursor = 'default';

  document.getElementById('notify').style.display = 'table';

  if ( onion == 1 ) {
    document.getElementById('link1').href = onion_url;
    document.getElementById('link2').href = notOnion_url;
  }

  if ( onion == 2 ) {
    document.getElementById('link1').href = notOnion_url;
    document.getElementById('link2').href = onion_url;
  }
}

function hideLinks() {
  document.getElementById('notify').style.display = 'none';
  document.getElementById('article1').style.cursor = 'pointer';
  document.getElementById('article2').style.cursor = 'pointer';
}

function stopHover() {
  document.getElementById('hover1').classList.remove('hovering');
  document.getElementById('hover2').classList.remove('hovering');
}

function startHover() {
  document.getElementById('hover1').classList.add('hovering');
  document.getElementById('hover2').classList.add('hovering');
}

function removeShrink() {
  document.getElementById('hover1').classList.remove('shrink');
  document.getElementById('hover2').classList.remove('shrink');
}

function appendArticles() {
  if ( document.getElementById('startButton').textContent == 'Start!' ) {
      document.getElementById('startButton').textContent = 'Next!';
  };

  hideLinks();

  deColorize();
  clearAll();

  let num = Math.random();

  if ( num > 0.5 ) {
    appendOnion();
    appendNotOnion();
  } else {
    appendNotOnion();
    appendOnion();
  }
  removeShrink();
  startHover();
}

document.querySelector('#start').addEventListener('click', appendArticles);


