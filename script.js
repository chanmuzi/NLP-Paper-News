document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const searchInput = document.getElementById('search');
    const searchResultCount = document.createElement('div');
    searchResultCount.id = 'search-result-count';
    document.getElementById('app').insertBefore(searchResultCount, contentDiv);

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
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const elements = contentDiv.getElementsByTagName('*');
            let matchCount = 0;

            for (let element of elements) {
                if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                    const text = element.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        highlightText(element, searchTerm);
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

            searchResultCount.textContent = `검색 결과: ${matchCount}개`;
        });
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
});