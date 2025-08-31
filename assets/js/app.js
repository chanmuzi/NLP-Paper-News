// Main application logic for NLP Paper News Manager

class App {
  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    try {
      this.setupEventListeners();
      this.loadInitialData();
      this.setupKeyboardShortcuts();
      this.isInitialized = true;

      console.log("NLP Paper News Manager initialized successfully");
    } catch (error) {
      console.error("Failed to initialize app:", error);
      Utils.showToast("애플리케이션 초기화에 실패했습니다.", "error");
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Pagination events
    const prevPageBtn = Utils.getElement("prevPage");
    const nextPageBtn = Utils.getElement("nextPage");

    if (prevPageBtn) {
      Utils.addEventListener(prevPageBtn, "click", () => this.previousPage());
    }

    if (nextPageBtn) {
      Utils.addEventListener(nextPageBtn, "click", () => this.nextPage());
    }

    // Filter change events
    const categoryFilter = Utils.getElement("categoryFilter");
    const tagFilter = Utils.getElement("tagFilter");
    const sortBy = Utils.getElement("sortBy");

    if (categoryFilter) {
      Utils.addEventListener(categoryFilter, "change", () =>
        this.handleFilterChange()
      );
    }

    if (tagFilter) {
      Utils.addEventListener(tagFilter, "change", () =>
        this.handleFilterChange()
      );
    }

    if (sortBy) {
      Utils.addEventListener(sortBy, "change", () => this.handleFilterChange());
    }

    // Window events
    Utils.addEventListener(
      window,
      "resize",
      Utils.debounce(() => this.handleResize(), 250)
    );
    Utils.addEventListener(window, "beforeunload", () =>
      this.handleBeforeUnload()
    );

    // Keyboard shortcuts
    Utils.addEventListener(document, "keydown", (e) => this.handleKeydown(e));
  }

  // Load initial data
  loadInitialData() {
    try {
      // Check if there are papers in storage
      const papers = paperStorage.getPapers();

      if (papers.length === 0) {
        this.showEmptyState();
      } else {
        // Load papers from README.md if available
        this.loadPapersFromREADME();
      }

      // Update statistics
      this.updateStatistics();

      // Update tag filter options
      this.updateTagFilterOptions();
    } catch (error) {
      console.error("Failed to load initial data:", error);
      Utils.showToast("데이터 로딩에 실패했습니다.", "error");
    }
  }

  // Load papers from README.md
  async loadPapersFromREADME() {
    try {
      // Check if README.md exists and has content
      const response = await fetch("README.md");
      if (!response.ok) {
        console.log("README.md not found, starting with empty state");
        return;
      }

      const content = await response.text();
      if (!content || content.trim().length === 0) {
        console.log("README.md is empty");
        return;
      }

      // Parse README content
      const parsedPapers = readmeParser.parseAndValidate(content);

      if (parsedPapers.valid.length > 0) {
        // Check if papers already exist in storage
        const existingPapers = paperStorage.getPapers();
        if (existingPapers.length === 0) {
          // Import parsed papers
          this.importParsedPapers(parsedPapers.valid);
          Utils.showToast(
            `${parsedPapers.valid.length}개의 논문을 README.md에서 가져왔습니다.`,
            "success"
          );
        } else {
          console.log("Papers already exist in storage, skipping import");
        }
      }
    } catch (error) {
      console.error("Failed to load papers from README:", error);
    }
  }

  // Import parsed papers
  importParsedPapers(papers) {
    try {
      papers.forEach((paper) => {
        // Remove parsedAt field and add to storage
        const { parsedAt, ...paperData } = paper;
        paperStorage.addPaper(paperData);
      });

      // Refresh search engine
      searchEngine.refreshIndex();

      // Perform initial search
      searchEngine.performSearch();
    } catch (error) {
      console.error("Failed to import parsed papers:", error);
      Utils.showToast("논문 가져오기에 실패했습니다.", "error");
    }
  }

  // Show empty state
  showEmptyState() {
    const container = Utils.getElement("papersContainer");
    if (!container) return;

    container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <div class="empty-state-title">논문이 없습니다</div>
                <div class="empty-state-description">
                    첫 번째 논문을 추가해보세요!
                </div>
                <div class="quick-actions">
                    <a href="add.html" class="quick-action-btn">➕ 개별 추가</a>
                    <a href="batch-add.html" class="quick-action-btn">📝 일괄 추가</a>
                </div>
            </div>
        `;
  }

  // Update statistics
  updateStatistics() {
    try {
      const stats = paperStorage.getStatistics();

      // You can add statistics display here if needed
      console.log("App statistics:", stats);
    } catch (error) {
      console.error("Failed to update statistics:", error);
    }
  }

  // Update tag filter options
  updateTagFilterOptions() {
    try {
      const tags = paperStorage.getTags();
      const tagFilter = Utils.getElement("tagFilter");

      if (!tagFilter) return;

      // Clear existing options except "전체"
      const currentValue = tagFilter.value;
      tagFilter.innerHTML = '<option value="">전체</option>';

      // Add tag options
      tags.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag.name;
        option.textContent = `${tag.name} (${tag.count})`;
        tagFilter.appendChild(option);
      });

      // Restore current selection if possible
      if (currentValue) {
        const option = Array.from(tagFilter.options).find(
          (opt) => opt.value === currentValue
        );
        if (option) {
          tagFilter.value = currentValue;
        }
      }
    } catch (error) {
      console.error("Failed to update tag filter options:", error);
    }
  }

  // Handle filter changes
  handleFilterChange() {
    try {
      // Get current filter values
      const categoryFilter = Utils.getElement("categoryFilter");
      const tagFilter = Utils.getElement("tagFilter");
      const sortBy = Utils.getElement("sortBy");

      const filters = {
        category: categoryFilter ? categoryFilter.value : "",
        tags: tagFilter && tagFilter.value ? [tagFilter.value] : [],
        sortBy: sortBy ? sortBy.value : "date",
      };

      // Update search engine filters
      searchEngine.currentFilters = filters;

      // Perform search with current query
      searchEngine.performSearch(searchEngine.currentQuery);
    } catch (error) {
      console.error("Failed to handle filter change:", error);
    }
  }

  // Pagination methods
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(
      searchEngine.searchResults.length / this.itemsPerPage
    );
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  updatePagination() {
    try {
      const totalPages = Math.ceil(
        searchEngine.searchResults.length / this.itemsPerPage
      );
      const pageInfo = Utils.getElement("pageInfo");
      const prevPageBtn = Utils.getElement("prevPage");
      const nextPageBtn = Utils.getElement("nextPage");

      if (pageInfo) {
        pageInfo.textContent = `${this.currentPage} / ${totalPages}`;
      }

      if (prevPageBtn) {
        prevPageBtn.disabled = this.currentPage <= 1;
      }

      if (nextPageBtn) {
        nextPageBtn.disabled = this.currentPage >= totalPages;
      }

      // Update displayed papers
      this.updateDisplayedPapers();
    } catch (error) {
      console.error("Failed to update pagination:", error);
    }
  }

  // Update displayed papers based on current page
  updateDisplayedPapers() {
    try {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const papersToShow = searchEngine.searchResults.slice(
        startIndex,
        endIndex
      );

      const container = Utils.getElement("papersContainer");
      if (!container) return;

      // Render papers for current page
      container.innerHTML = papersToShow
        .map((paper) => searchEngine.renderPaperCard(paper))
        .join("");
    } catch (error) {
      console.error("Failed to update displayed papers:", error);
    }
  }

  // Handle window resize
  handleResize() {
    try {
      // Adjust layout based on screen size
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

      // You can add responsive behavior here
      console.log("Window resized:", {
        isMobile,
        isTablet,
        width: window.innerWidth,
      });
    } catch (error) {
      console.error("Failed to handle resize:", error);
    }
  }

  // Handle before unload
  handleBeforeUnload() {
    try {
      // Save any unsaved changes
      // You can add auto-save functionality here
    } catch (error) {
      console.error("Failed to handle before unload:", error);
    }
  }

  // Setup keyboard shortcuts
  setupKeyboardShortcuts() {
    // Keyboard shortcuts will be handled in handleKeydown
  }

  // Handle keyboard events
  handleKeydown(event) {
    try {
      // Only handle shortcuts when not typing in input fields
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Ctrl/Cmd + K: Focus search
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        const searchInput = Utils.getElement("searchInput");
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Ctrl/Cmd + F: Focus search (alternative)
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        const searchInput = Utils.getElement("searchInput");
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Escape: Clear search
      if (event.key === "Escape") {
        const searchInput = Utils.getElement("searchInput");
        if (searchInput && searchInput.value) {
          searchInput.value = "";
          searchEngine.clearSearch();
        }
      }

      // Arrow keys for navigation (when not in input)
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        if (event.key === "ArrowLeft") {
          this.previousPage();
        } else {
          this.nextPage();
        }
      }
    } catch (error) {
      console.error("Failed to handle keydown:", error);
    }
  }

  // Refresh app data
  refresh() {
    try {
      // Refresh storage
      paperStorage.cleanup();

      // Refresh search engine
      searchEngine.refreshIndex();

      // Update UI
      this.updateStatistics();
      this.updateTagFilterOptions();

      // Perform current search again
      searchEngine.performSearch(searchEngine.currentQuery);

      Utils.showToast("데이터가 새로고침되었습니다.", "success");
    } catch (error) {
      console.error("Failed to refresh app:", error);
      Utils.showToast("새로고침에 실패했습니다.", "error");
    }
  }

  // Export app data
  exportData() {
    try {
      const data = paperStorage.exportData();
      const filename = `nlp_papers_export_${
        new Date().toISOString().split("T")[0]
      }.json`;

      Utils.downloadJson(data, filename);
      Utils.showToast("데이터가 내보내기되었습니다.", "success");

      return filename;
    } catch (error) {
      console.error("Failed to export data:", error);
      Utils.showToast("내보내기에 실패했습니다.", "error");
      return null;
    }
  }

  // Import app data
  async importData(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (paperStorage.importData(data)) {
        // Refresh app
        this.refresh();
        Utils.showToast("데이터 가져오기가 완료되었습니다.", "success");
        return true;
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Failed to import data:", error);
      Utils.showToast("데이터 가져오기에 실패했습니다.", "error");
      return false;
    }
  }

  // Get app status
  getStatus() {
    try {
      return {
        isInitialized: this.isInitialized,
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        totalPapers: paperStorage.getPapers().length,
        searchResults: searchEngine.searchResults.length,
        currentQuery: searchEngine.currentQuery,
        currentFilters: searchEngine.currentFilters,
      };
    } catch (error) {
      console.error("Failed to get app status:", error);
      return null;
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = App;
}
