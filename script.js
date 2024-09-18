document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const searchInput = document.getElementById('search');
    const searchResultCount = document.getElementById('search-result-count');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    let debounceTimer;
    let contentElements = [];

    // README.md 파일 불러오기
    fetch('README.md')
        .then(response => response.text())
        .then(text => {
            // 마크다운을 HTML로 변환
            contentDiv.innerHTML = marked.parse(text);
            
            // 검색 가능한 요소들을 미리 저장
            contentElements = Array.from(contentDiv.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th'));
            
            // 검색 기능 초기화
            initSearch();
        })
        .catch(error => {
            console.error('Error loading README.md:', error);
            contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
        });

    function initSearch() {
        searchInput.addEventListener('input', debounce(performSearch, 500));
    }

    function debounce(func, delay) {
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // 비동기적으로 검색 수행
        setTimeout(() => {
            let matchCount = 0;
            const fragment = document.createDocumentFragment();

            contentElements.forEach(element => {
                const clonedElement = element.cloneNode(true);
                const text = clonedElement.textContent.toLowerCase();
                
                if (searchTerm && text.includes(searchTerm)) {
                    highlightText(clonedElement, searchTerm);
                    matchCount++;
                    fragment.appendChild(clonedElement);
                } else if (!searchTerm) {
                    fragment.appendChild(clonedElement);
                }
            });

            // DOM 업데이트는 한 번만 수행
            contentDiv.innerHTML = '';
            contentDiv.appendChild(fragment);

            searchResultCount.textContent = searchTerm ? `검색 결과: ${matchCount}개` : '';

            // 첫 번째 결과로 스크롤
            const firstResult = contentDiv.querySelector('.highlight');
            if (firstResult) {
                firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 0);
    }

    function highlightText(element, searchTerm) {
        const innerHTML = element.innerHTML;
        const regex = new RegExp(searchTerm, 'gi');
        element.innerHTML = innerHTML.replace(regex, match => `<span class='highlight'>${match}</span>`);
    }

    // Ctrl+F 또는 Cmd+F (Mac) 단축키로 검색창 포커스
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // 스크롤 이벤트 리스너 추가 (디바운스 적용)
    window.addEventListener('scroll', debounce(() => {
        scrollToTopButton.style.display = window.pageYOffset > 100 ? 'block' : 'none';
    }, 100));

    // 맨 위로 스크롤 버튼 클릭 이벤트
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
