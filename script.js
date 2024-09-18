document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const searchInput = document.getElementById('search');
    const searchResultCount = document.getElementById('search-result-count');
    const scrollToTopButton = document.getElementById('scroll-to-top');

    // README.md 파일 불러오기
    fetch('README.md')
        .then(response => response.text())
        .then(text => {
            // 마크다운을 HTML로 변환
            contentDiv.innerHTML = marked.parse(text);
            
            // 검색 기능 초기화
            initSearch();
        });

    function initSearch() {
        searchInput.addEventListener('input', performSearch);
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const elements = contentDiv.getElementsByTagName('*');
        let matchCount = 0;

        for (let element of elements) {
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    highlightText(element, searchTerm);
                    matchCount++;
                } else {
                    element.innerHTML = element.textContent; // 하이라이트 제거
                }
            }
        }

        // 토글 내부 검색
        const details = contentDiv.getElementsByTagName('details');
        for (let detail of details) {
            const detailText = detail.textContent.toLowerCase();
            if (detailText.includes(searchTerm)) {
                detail.open = true;
                matchCount++;
            } else {
                detail.open = false;
            }
        }

        searchResultCount.textContent = searchTerm ? `검색 결과: ${matchCount}개` : '';

        // 첫 번째 결과로 스크롤
        const firstResult = document.querySelector('.highlight');
        if (firstResult) {
            firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function highlightText(element, searchTerm) {
        const innerHTML = element.textContent;
        const index = innerHTML.toLowerCase().indexOf(searchTerm);
        if (index >= 0) {
            element.innerHTML = innerHTML.substring(0, index) + 
                                "<span class='highlight'>" + 
                                innerHTML.substring(index, index + searchTerm.length) + 
                                "</span>" + 
                                innerHTML.substring(index + searchTerm.length);
        }
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
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // 맨 위로 스크롤 버튼 클릭 이벤트
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});