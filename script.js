document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const searchInput = document.getElementById('search');
    const searchResultCount = document.getElementById('search-result-count');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    let debounceTimer;

    // README.md 파일 불러오기
    fetch('README.md')
        .then(response => response.text())
        .then(text => {
            // 마크다운을 HTML로 변환
            contentDiv.innerHTML = marked.parse(text);
            
            // 검색 기능 초기화
            initSearch();
        })
        .catch(error => {
            console.error('Error loading README.md:', error);
            contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
        });

    function initSearch() {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }

    function debounce(func, delay) {
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const elements = contentDiv.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th');
        let matchCount = 0;

        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                highlightText(element, searchTerm);
                matchCount++;
            } else {
                removeHighlight(element);
            }
        });

        // 토글 내부 검색
        const details = contentDiv.getElementsByTagName('details');
        Array.from(details).forEach(detail => {
            const detailText = detail.textContent.toLowerCase();
            detail.open = detailText.includes(searchTerm);
        });

        searchResultCount.textContent = searchTerm ? `검색 결과: ${matchCount}개` : '';

        // 첫 번째 결과로 스크롤
        const firstResult = document.querySelector('.highlight');
        if (firstResult) {
            firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function highlightText(element, searchTerm) {
        const innerHTML = element.innerHTML;
        const index = element.textContent.toLowerCase().indexOf(searchTerm);
        if (index >= 0) {
            const regex = new RegExp(searchTerm, 'gi');
            element.innerHTML = innerHTML.replace(regex, match => `<span class='highlight'>${match}</span>`);
        }
    }

    function removeHighlight(element) {
        element.innerHTML = element.innerHTML.replace(/<span class='highlight'>(.*?)<\/span>/g, '$1');
    }

    // Ctrl+F 단축키로 검색창 포커스
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', () => {
        scrollToTopButton.style.display = window.pageYOffset > 100 ? 'block' : 'none';
    });

    // 맨 위로 스크롤 버튼 클릭 이벤트
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
