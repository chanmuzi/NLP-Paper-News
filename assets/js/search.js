// Search functionality for NLP Paper News Manager

class SearchEngine {
  constructor() {
    this.papers = [];
    this.searchIndex = new Map();
    this.currentQuery = "";
    this.currentFilters = {};
    this.searchResults = [];
    this.isSearching = false;

    this.init();
  }

  init() {
    this.papers = paperStorage.getPapers();
    this.buildSearchIndex();
    this.bindEvents();
  }

  // Build search index for fast searching
  buildSearchIndex() {
    this.searchIndex.clear();

    this.papers.forEach((paper, index) => {
      // Index title
      this.indexText(paper.title, index, "title");

      // Index summary
      this.indexText(paper.summary, index, "summary");

      // Index category name
      if (paper.categoryName) {
        this.indexText(paper.categoryName, index, "categoryName");
      }

      // Index tags
      paper.tags.forEach((tag) => {
        this.indexText(tag, index, "tags");
      });
    });
  }

  // Index text for searching
  indexText(text, paperIndex, field) {
    if (!text) return;

    const words = text
      .toLowerCase()
      .replace(/[^\w\s가-힣]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1);

    words.forEach((word) => {
      if (!this.searchIndex.has(word)) {
        this.searchIndex.set(word, new Map());
      }

      const fieldMap = this.searchIndex.get(word);
      if (!fieldMap.has(field)) {
        fieldMap.set(field, new Set());
      }

      fieldMap.get(field).add(paperIndex);
    });
  }

  // Bind search events
  bindEvents() {
    const searchInput = Utils.getElement("searchInput");
    const searchBtn = Utils.getElement("searchBtn");

    if (searchInput) {
      // Debounced search on input
      const debouncedSearch = Utils.debounce((query) => {
        this.performSearch(query);
      }, 300);

      Utils.addEventListener(searchInput, "input", (e) => {
        const query = e.target.value.trim();
        this.currentQuery = query;
        debouncedSearch(query);
      });

      // Search on Enter key
      Utils.addEventListener(searchInput, "keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch(this.currentQuery);
        }
      });
    }

    if (searchBtn) {
      Utils.addEventListener(searchBtn, "click", () => {
        this.performSearch(this.currentQuery);
      });
    }

    // Bind filter events
    this.bindFilterEvents();
  }

  // Bind filter events
  bindFilterEvents() {
    const categoryFilter = Utils.getElement("categoryFilter");
    const tagFilter = Utils.getElement("tagFilter");
    const sortBy = Utils.getElement("sortBy");

    if (categoryFilter) {
      Utils.addEventListener(categoryFilter, "change", () => {
        this.currentFilters.category = categoryFilter.value;
        this.applyFilters();
      });
    }

    if (tagFilter) {
      Utils.addEventListener(tagFilter, "change", () => {
        this.currentFilters.tags = tagFilter.value ? [tagFilter.value] : [];
        this.applyFilters();
      });
    }

    if (sortBy) {
      Utils.addEventListener(sortBy, "change", () => {
        this.currentFilters.sortBy = sortBy.value;
        this.applyFilters();
      });
    }
  }

  // Perform search with current query and filters
  performSearch(query = "") {
    if (this.isSearching) return;

    this.isSearching = true;
    this.currentQuery = query;

    try {
      // Update search input if provided
      if (query && Utils.getElement("searchInput")) {
        Utils.getElement("searchInput").value = query;
      }

      // Perform search
      this.searchResults = this.search(query, this.currentFilters);

      // Update UI
      this.updateSearchResults();
      this.updateFilterOptions();

      // Update URL with search parameters
      this.updateURL();
    } catch (error) {
      console.error("Search error:", error);
      Utils.showToast("검색 중 오류가 발생했습니다.", "error");
    } finally {
      this.isSearching = false;
    }
  }

  // Core search function
  search(query, filters = {}) {
    let results = [...this.papers];

    // Apply text search
    if (query && query.trim()) {
      results = this.textSearch(results, query.trim());
    }

    // Apply filters
    results = this.applyFilters(results, filters);

    // Apply sorting
    if (filters.sortBy) {
      results = this.sortResults(results, filters.sortBy);
    }

    return results;
  }

  // Text-based search using index
  textSearch(papers, query) {
    const queryWords = query
      .toLowerCase()
      .replace(/[^\w\s가-힣]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1);

    if (queryWords.length === 0) return papers;

    const paperScores = new Map();

    queryWords.forEach((word) => {
      if (this.searchIndex.has(word)) {
        const fieldMap = this.searchIndex.get(word);

        fieldMap.forEach((paperIndices, field) => {
          paperIndices.forEach((paperIndex) => {
            const paper = papers[paperIndex];
            if (paper) {
              const currentScore = paperScores.get(paper.id) || 0;
              let fieldScore = 0;

              // Different weights for different fields
              switch (field) {
                case "title":
                  fieldScore = 10;
                  break;
                case "tags":
                  fieldScore = 8;
                  break;
                case "categoryName":
                  fieldScore = 5;
                  break;
                case "summary":
                  fieldScore = 3;
                  break;
                default:
                  fieldScore = 1;
              }

              paperScores.set(paper.id, currentScore + fieldScore);
            }
          });
        });
      }
    });

    // Filter papers with scores and sort by score
    const scoredResults = papers
      .filter((paper) => paperScores.has(paper.id))
      .sort((a, b) => {
        const scoreA = paperScores.get(a.id) || 0;
        const scoreB = paperScores.get(b.id) || 0;
        return scoreB - scoreA;
      });

    // Add papers without scores at the end
    const unscoredResults = papers.filter(
      (paper) => !paperScores.has(paper.id)
    );

    return [...scoredResults, ...unscoredResults];
  }

  // Apply filters to results
  applyFilters(papers, filters) {
    let results = papers;

    // Category filter
    if (filters.category && filters.category !== "") {
      results = results.filter((paper) => paper.category === filters.category);
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((paper) =>
        filters.tags.some((tag) => paper.tags.includes(tag))
      );
    }

    return results;
  }

  // Sort results
  sortResults(papers, sortBy) {
    const sorted = [...papers];

    switch (sortBy) {
      case "date":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "title":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "category":
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case "readingTime":
        return sorted.sort((a, b) => a.readingTime - b.readingTime);
      default:
        return sorted;
    }
  }

  // Update search results in UI
  updateSearchResults() {
    const container = Utils.getElement("papersContainer");
    const loadingIndicator = Utils.getElement("loadingIndicator");
    const noResults = Utils.getElement("noResults");

    if (!container) return;

    // Show/hide loading
    Utils.toggleElement(loadingIndicator, false);

    if (this.searchResults.length === 0) {
      Utils.toggleElement(noResults, true);
      container.innerHTML = "";
      return;
    }

    Utils.toggleElement(noResults, false);

    // Render results
    container.innerHTML = this.renderSearchResults();

    // Update pagination
    this.updatePagination();
  }

  // Render search results as HTML
  renderSearchResults() {
    if (!this.searchResults || this.searchResults.length === 0) {
      return '<div class="no-results"><p>검색 결과가 없습니다.</p></div>';
    }

    return this.searchResults
      .map((paper) => this.renderPaperCard(paper))
      .join("");
  }

  // Render individual paper card
  renderPaperCard(paper) {
    const highlightedTitle = this.currentQuery
      ? Utils.highlightText(paper.title, this.currentQuery)
      : paper.title;

    const highlightedSummary = this.currentQuery
      ? Utils.highlightText(paper.summary, this.currentQuery)
      : paper.summary;

    const tags = paper.tags
      .map((tag) => `<span class="paper-tag">${tag}</span>`)
      .join("");

    return `
            <div class="paper-card" data-id="${paper.id}">
                <div class="paper-header">
                    <div class="paper-category">${paper.category}</div>
                    <div class="paper-header-content">
                        <h3 class="paper-title">
                            <a href="${
                              paper.link
                            }" target="_blank" rel="noopener noreferrer">
                                ${highlightedTitle}
                            </a>
                        </h3>
                        ${
                          paper.categoryName
                            ? `<div class="paper-category-name">${paper.categoryName}</div>`
                            : ""
                        }
                    </div>
                </div>
                
                <div class="paper-summary">
                    ${highlightedSummary}
                </div>
                
                ${tags ? `<div class="paper-tags">${tags}</div>` : ""}
                
                <div class="paper-meta">
                    <div class="paper-info">
                        <span>📅 ${Utils.formatDate(paper.createdAt)}</span>
                        ${
                          paper.readingTime
                            ? `<span>⏱️ ${paper.readingTime}분</span>`
                            : ""
                        }
                    </div>
                    <div class="paper-actions">
                        <button class="paper-action-btn" onclick="copyPaperLink('${
                          paper.link
                        }')" title="링크 복사">
                            📋
                        </button>
                        <button class="paper-action-btn" onclick="editPaper('${
                          paper.id
                        }')" title="수정">
                            ✏️
                        </button>
                        <button class="paper-action-btn" onclick="deletePaper('${
                          paper.id
                        }')" title="삭제">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  // Update filter options based on current results
  updateFilterOptions() {
    this.updateTagFilter();
  }

  // Update tag filter options
  updateTagFilter() {
    const tagFilter = Utils.getElement("tagFilter");
    if (!tagFilter) return;

    // Get unique tags from current results
    const tags = new Set();
    this.searchResults.forEach((paper) => {
      paper.tags.forEach((tag) => tags.add(tag));
    });

    // Update tag filter options
    const currentValue = tagFilter.value;
    tagFilter.innerHTML = '<option value="">전체</option>';

    Array.from(tags)
      .sort()
      .forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
      });

    // Restore current selection if possible
    if (currentValue && tags.has(currentValue)) {
      tagFilter.value = currentValue;
    }
  }

  // Update pagination
  updatePagination() {
    const pagination = Utils.getElement("pagination");
    if (!pagination) return;

    const settings = paperStorage.getSettings();
    const itemsPerPage = settings.itemsPerPage || 12;

    if (this.searchResults.length <= itemsPerPage) {
      Utils.toggleElement(pagination, false);
      return;
    }

    Utils.toggleElement(pagination, true);
    // Pagination logic would go here
  }

  // Update URL with search parameters
  updateURL() {
    const params = {};

    if (this.currentQuery) {
      params.q = this.currentQuery;
    }

    if (this.currentFilters.category) {
      params.category = this.currentFilters.category;
    }

    if (this.currentFilters.tags && this.currentFilters.tags.length > 0) {
      params.tags = this.currentFilters.tags.join(",");
    }

    if (this.currentFilters.sortBy) {
      params.sort = this.currentFilters.sortBy;
    }

    Utils.setQueryParams(params);
  }

  // Get search suggestions
  getSearchSuggestions(query, limit = 5) {
    if (!query || query.length < 2) return [];

    const suggestions = new Set();
    const queryLower = query.toLowerCase();

    // Search in index
    this.searchIndex.forEach((fieldMap, word) => {
      if (word.includes(queryLower)) {
        suggestions.add(word);
      }
    });

    // Search in paper titles and summaries
    this.papers.forEach((paper) => {
      const titleWords = paper.title.toLowerCase().split(/\s+/);
      const summaryWords = paper.summary.toLowerCase().split(/\s+/);

      [...titleWords, ...summaryWords].forEach((word) => {
        if (word.includes(queryLower) && word.length > 2) {
          suggestions.add(word);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  // Clear search
  clearSearch() {
    this.currentQuery = "";
    this.currentFilters = {};
    this.searchResults = [...this.papers];

    // Clear search input
    const searchInput = Utils.getElement("searchInput");
    if (searchInput) {
      searchInput.value = "";
    }

    // Reset filters
    const categoryFilter = Utils.getElement("categoryFilter");
    const tagFilter = Utils.getElement("tagFilter");
    const sortBy = Utils.getElement("sortBy");

    if (categoryFilter) categoryFilter.value = "";
    if (tagFilter) tagFilter.value = "";
    if (sortBy) sortBy.value = "date";

    // Update results
    this.updateSearchResults();
    this.updateFilterOptions();

    // Clear URL parameters
    Utils.setQueryParams({});
  }

  // Refresh search index
  refreshIndex() {
    this.papers = paperStorage.getPapers();
    this.buildSearchIndex();
  }

  // Get search statistics
  getSearchStats() {
    return {
      totalPapers: this.papers.length,
      searchResults: this.searchResults.length,
      currentQuery: this.currentQuery,
      currentFilters: this.currentFilters,
      indexSize: this.searchIndex.size,
    };
  }
}

// Initialize search engine
const searchEngine = new SearchEngine();

// Global functions for paper actions
window.copyPaperLink = async (link) => {
  await Utils.copyToClipboard(link);
};

window.editPaper = (id) => {
  // Navigate to edit page or open edit modal
  window.location.href = `add.html?edit=${id}`;
};

window.deletePaper = (id) => {
  if (confirm("정말로 이 논문을 삭제하시겠습니까?")) {
    try {
      paperStorage.deletePaper(id);
      searchEngine.refreshIndex();
      searchEngine.performSearch(searchEngine.currentQuery);
      Utils.showToast("논문이 삭제되었습니다.", "success");
    } catch (error) {
      Utils.showToast("삭제에 실패했습니다.", "error");
    }
  }
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = SearchEngine;
}
