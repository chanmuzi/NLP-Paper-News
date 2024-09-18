(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');
    if (results.length) {
      var appendString = '';
      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
      }
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>검색 결과가 없습니다.</li>';
    }
  }

  var idx;
  var store = {};

  // 검색 인덱스 초기화
  function initIndex() {
    idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    // 검색 데이터 로드
    var request = new XMLHttpRequest();
    request.open('GET', '/NLP-Paper-News/search.json', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          idx.add(item);
          store[item.id] = item;
        }
      }
    };
    request.send();
  }

  // 검색 수행
  function performSearch(searchTerm) {
    var results = idx.search(searchTerm);
    displaySearchResults(results, store);
  }

  // 이벤트 리스너 설정
  function setupEventListeners() {
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var searchTerm = this.value;
        if (searchTerm) {
          performSearch(searchTerm);
        } else {
          document.getElementById('search-results').innerHTML = '';
        }
      });
    }
  }

  // 초기화
  initIndex();
  setupEventListeners();
})();
