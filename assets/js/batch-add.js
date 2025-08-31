// Batch add papers page functionality for NLP Paper News Manager

class BatchAddPage {
  constructor() {
    this.form = null;
    this.batchTextArea = null;
    this.parseResultsContainer = null;
    this.parseBtn = null;
    this.saveAllBtn = null;
    this.parsedPapers = [];
    this.isParsing = false;

    this.init();
  }

  init() {
    try {
      this.setupElements();
      this.bindEvents();
      this.setupAutoSave();

      console.log("Batch add page initialized successfully");
    } catch (error) {
      console.error("Failed to initialize batch add page:", error);
      Utils.showToast("페이지 초기화에 실패했습니다.", "error");
    }
  }

  // Setup DOM elements
  setupElements() {
    this.form = Utils.getElement("batchAddForm");
    this.batchTextArea = Utils.getElement("batchText");
    this.parseResultsContainer = Utils.getElement("parseResults");
    this.parseBtn = Utils.getElement("parseBtn");
    this.saveAllBtn = Utils.getElement("saveAllBtn");

    if (!this.form || !this.batchTextArea || !this.parseResultsContainer) {
      throw new Error("Required elements not found");
    }
  }

  // Bind event listeners
  bindEvents() {
    // Parse button click
    if (this.parseBtn) {
      Utils.addEventListener(this.parseBtn, "click", () =>
        this.parseBatchText()
      );
    }

    // Save all button click
    if (this.saveAllBtn) {
      Utils.addEventListener(this.saveAllBtn, "click", () =>
        this.saveAllPapers()
      );
    }

    // Form submission
    Utils.addEventListener(this.form, "submit", (e) =>
      this.handleFormSubmit(e)
    );

    // Text area changes
    Utils.addEventListener(this.batchTextArea, "input", () =>
      this.handleTextChange()
    );

    // Keyboard shortcuts
    Utils.addEventListener(document, "keydown", (e) => this.handleKeydown(e));

    // Load auto-saved data
    this.loadAutoSavedData();
  }

  // Handle text area changes
  handleTextChange() {
    try {
      // Enable parse button if there's text
      if (this.parseBtn) {
        this.parseBtn.disabled = !this.batchTextArea.value.trim();
      }

      // Auto-save text content
      this.autoSave();
    } catch (error) {
      console.error("Failed to handle text change:", error);
    }
  }

  // Parse batch text
  async parseBatchText() {
    if (this.isParsing) return;

    try {
      this.isParsing = true;

      // Show loading state
      if (this.parseBtn) {
        this.parseBtn.textContent = "파싱 중...";
        this.parseBtn.disabled = true;
      }

      const text = this.batchTextArea.value.trim();
      if (!text) {
        throw new Error("파싱할 텍스트가 없습니다.");
      }

      // Parse the text
      const results = readmeParser.parseAndValidate(text);
      this.parsedPapers = results.valid;

      // Display results
      this.displayParseResults(results);

      // Enable save button if there are valid papers
      if (this.saveAllBtn) {
        this.saveAllBtn.disabled = results.valid.length === 0;
      }

      // Show success message
      Utils.showToast(
        `${results.valid.length}개의 논문을 파싱했습니다. ${
          results.invalid.length > 0 ? `(${results.invalid.length}개 오류)` : ""
        }`,
        results.invalid.length > 0 ? "warning" : "success"
      );
    } catch (error) {
      console.error("Parsing failed:", error);
      Utils.showToast(`파싱에 실패했습니다: ${error.message}`, "error");

      // Show error in results container
      this.displayParseError(error.message);
    } finally {
      this.isParsing = false;

      // Reset parse button
      if (this.parseBtn) {
        this.parseBtn.textContent = "파싱";
        this.parseBtn.disabled = false;
      }
    }
  }

  // Display parse results
  displayParseResults(results) {
    try {
      if (!this.parseResultsContainer) return;

      if (results.valid.length === 0 && results.invalid.length === 0) {
        this.parseResultsContainer.innerHTML = `
                    <div class="parse-placeholder">
                        <p>파싱할 수 있는 논문이 없습니다.</p>
                    </div>
                `;
        return;
      }

      let html = "";

      // Show statistics
      html += `
                <div class="parse-stats">
                    <h4>파싱 결과</h4>
                    <p>총 ${results.total}개 중 ${results.valid.length}개 성공, ${results.invalid.length}개 실패</p>
                </div>
            `;

      // Show valid papers
      if (results.valid.length > 0) {
        html += `
                    <div class="parse-section">
                        <h4>✅ 파싱 성공 (${results.valid.length}개)</h4>
                        ${results.valid
                          .map((paper, index) =>
                            this.renderParseItem(paper, index, true)
                          )
                          .join("")}
                    </div>
                `;
      }

      // Show invalid papers
      if (results.invalid.length > 0) {
        html += `
                    <div class="parse-section">
                        <h4>❌ 파싱 실패 (${results.invalid.length}개)</h4>
                        ${results.invalid
                          .map((paper, index) =>
                            this.renderParseItem(paper, index, false)
                          )
                          .join("")}
                    </div>
                `;
      }

      this.parseResultsContainer.innerHTML = html;
    } catch (error) {
      console.error("Failed to display parse results:", error);
    }
  }

  // Display parse error
  displayParseError(errorMessage) {
    try {
      if (!this.parseResultsContainer) return;

      this.parseResultsContainer.innerHTML = `
                <div class="parse-error">
                    <h4>❌ 파싱 오류</h4>
                    <p>${Utils.sanitizeHtml(errorMessage)}</p>
                    <div class="parse-error-help">
                        <p><strong>도움말:</strong></p>
                        <ul>
                            <li>README.md 형식에 맞춰 입력했는지 확인해주세요</li>
                            <li>각 논문은 "- "로 시작해야 합니다</li>
                            <li>링크는 [제목](URL) 형식이어야 합니다</li>
                            <li>카테고리 이모지(📜, 🧑🏻‍💻, 🗞️)가 포함되어야 합니다</li>
                        </ul>
                    </div>
                </div>
            `;
    } catch (error) {
      console.error("Failed to display parse error:", error);
    }
  }

  // Render individual parse item
  renderParseItem(paper, index, isValid) {
    try {
      const tags = paper.tags ? paper.tags.join(", ") : "";
      const errorMessage = !isValid ? paper.error : "";

      return `
                <div class="parse-item ${
                  isValid ? "valid" : "invalid"
                }" data-index="${index}">
                    <div class="parse-item-header">
                        <div class="parse-item-title">
                            ${paper.category} ${paper.title}
                        </div>
                        <div class="parse-item-actions">
                            ${
                              isValid
                                ? `<button class="parse-item-btn edit" onclick="batchAddPage.editParsedPaper(${index})">수정</button>`
                                : `<span class="parse-item-error">${errorMessage}</span>`
                            }
                            <button class="parse-item-btn delete" onclick="batchAddPage.deleteParsedPaper(${index})">삭제</button>
                        </div>
                    </div>
                    <div class="parse-item-content">
                        <p><strong>링크:</strong> <a href="${
                          paper.link
                        }" target="_blank">${paper.link}</a></p>
                        <p><strong>카테고리:</strong> ${paper.categoryName}</p>
                        <p><strong>요약:</strong> ${Utils.truncateText(
                          paper.summary,
                          150
                        )}</p>
                        ${tags ? `<p><strong>태그:</strong> ${tags}</p>` : ""}
                        ${
                          !isValid
                            ? `<p><strong>오류:</strong> <span class="error-text">${errorMessage}</span></p>`
                            : ""
                        }
                    </div>
                </div>
            `;
    } catch (error) {
      console.error("Failed to render parse item:", error);
      return '<div class="parse-item error">렌더링 오류</div>';
    }
  }

  // Edit parsed paper
  editParsedPaper(index) {
    try {
      const paper = this.parsedPapers[index];
      if (!paper) return;

      // Create edit modal
      this.showEditModal(paper, index);
    } catch (error) {
      console.error("Failed to edit parsed paper:", error);
      Utils.showToast("편집 모드를 열 수 없습니다.", "error");
    }
  }

  // Show edit modal
  showEditModal(paper, index) {
    try {
      // Create modal overlay
      const modalOverlay = document.createElement("div");
      modalOverlay.className = "modal-overlay";

      const modal = document.createElement("div");
      modal.className = "modal";

      modal.innerHTML = `
                <div class="modal-header">
                    <div class="modal-title">논문 편집</div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-content">
                    <form id="editPaperForm">
                        <div class="form-group">
                            <label for="editTitle">제목</label>
                            <input type="text" id="editTitle" value="${Utils.sanitizeHtml(
                              paper.title
                            )}" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="editLink">링크</label>
                            <input type="url" id="editLink" value="${Utils.sanitizeHtml(
                              paper.link
                            )}" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label for="editCategory">카테고리</label>
                            <select id="editCategory" class="form-select" required>
                                <option value="📜" ${
                                  paper.category === "📜" ? "selected" : ""
                                }>📜 논문</option>
                                <option value="🧑🏻‍💻" ${
                                  paper.category === "🧑🏻‍💻" ? "selected" : ""
                                }>🧑🏻‍💻 개발자 블로그</option>
                                <option value="🗞️" ${
                                  paper.category === "🗞️" ? "selected" : ""
                                }>🗞️ 뉴스</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editCategoryName">카테고리명</label>
                            <input type="text" id="editCategoryName" value="${Utils.sanitizeHtml(
                              paper.categoryName
                            )}" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="editSummary">요약</label>
                            <textarea id="editSummary" class="form-textarea" rows="4" required>${Utils.sanitizeHtml(
                              paper.summary
                            )}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="editTags">태그</label>
                            <input type="text" id="editTags" value="${
                              paper.tags ? paper.tags.join(", ") : ""
                            }" class="form-input">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">저장</button>
                            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">취소</button>
                        </div>
                    </form>
                </div>
            `;

      modalOverlay.appendChild(modal);
      document.body.appendChild(modalOverlay);

      // Show modal
      setTimeout(() => modalOverlay.classList.add("active"), 10);

      // Handle form submission
      const editForm = modal.querySelector("#editPaperForm");
      Utils.addEventListener(editForm, "submit", (e) => {
        e.preventDefault();
        this.saveEditedPaper(index, modalOverlay);
      });
    } catch (error) {
      console.error("Failed to show edit modal:", error);
    }
  }

  // Save edited paper
  saveEditedPaper(index, modalOverlay) {
    try {
      const title = Utils.getElement("editTitle").value.trim();
      const link = Utils.getElement("editLink").value.trim();
      const category = Utils.getElement("editCategory").value;
      const categoryName = Utils.getElement("editCategoryName").value.trim();
      const summary = Utils.getElement("editSummary").value.trim();
      const tags = Utils.getElement("editTags")
        .value.split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      // Validate
      if (!title || !link || !summary) {
        Utils.showToast("필수 필드를 모두 입력해주세요.", "error");
        return;
      }

      if (!Utils.isValidUrl(link)) {
        Utils.showToast("유효한 URL을 입력해주세요.", "error");
        return;
      }

      // Update paper
      this.parsedPapers[index] = {
        ...this.parsedPapers[index],
        title,
        link,
        category,
        categoryName,
        summary,
        tags,
      };

      // Close modal
      modalOverlay.remove();

      // Refresh display
      this.refreshParseResults();

      Utils.showToast("논문이 수정되었습니다.", "success");
    } catch (error) {
      console.error("Failed to save edited paper:", error);
      Utils.showToast("저장에 실패했습니다.", "error");
    }
  }

  // Delete parsed paper
  deleteParsedPaper(index) {
    try {
      if (confirm("정말로 이 논문을 삭제하시겠습니까?")) {
        this.parsedPapers.splice(index, 1);
        this.refreshParseResults();

        // Update save button state
        if (this.saveAllBtn) {
          this.saveAllBtn.disabled = this.parsedPapers.length === 0;
        }

        Utils.showToast("논문이 삭제되었습니다.", "success");
      }
    } catch (error) {
      console.error("Failed to delete parsed paper:", error);
      Utils.showToast("삭제에 실패했습니다.", "error");
    }
  }

  // Refresh parse results display
  refreshParseResults() {
    try {
      const results = {
        valid: this.parsedPapers,
        invalid: [],
        total: this.parsedPapers.length,
      };

      this.displayParseResults(results);
    } catch (error) {
      console.error("Failed to refresh parse results:", error);
    }
  }

  // Save all papers
  async saveAllPapers() {
    try {
      if (this.parsedPapers.length === 0) {
        Utils.showToast("저장할 논문이 없습니다.", "warning");
        return;
      }

      // Show loading state
      if (this.saveAllBtn) {
        this.saveAllBtn.textContent = "저장 중...";
        this.saveAllBtn.disabled = true;
      }

      // Save papers one by one
      let successCount = 0;
      let errorCount = 0;

      for (const paper of this.parsedPapers) {
        try {
          // Remove parsedAt field
          const { parsedAt, ...paperData } = paper;
          paperStorage.addPaper(paperData);
          successCount++;
        } catch (error) {
          console.error("Failed to save paper:", paper.title, error);
          errorCount++;
        }
      }

      // Show results
      if (errorCount === 0) {
        Utils.showToast(
          `${successCount}개의 논문이 모두 저장되었습니다.`,
          "success"
        );

        // Clear form and results
        this.clearForm();

        // Redirect to main page after delay
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        Utils.showToast(
          `${successCount}개 저장 성공, ${errorCount}개 저장 실패`,
          "warning"
        );
      }
    } catch (error) {
      console.error("Failed to save all papers:", error);
      Utils.showToast("저장에 실패했습니다.", "error");
    } finally {
      // Reset button state
      if (this.saveAllBtn) {
        this.saveAllBtn.textContent = "모두 저장";
        this.saveAllBtn.disabled = false;
      }
    }
  }

  // Clear form and results
  clearForm() {
    try {
      if (this.batchTextArea) {
        this.batchTextArea.value = "";
      }

      if (this.parseResultsContainer) {
        this.parseResultsContainer.innerHTML = `
                    <div class="parse-placeholder">
                        <p>파싱 버튼을 클릭하면 결과가 여기에 표시됩니다.</p>
                    </div>
                `;
      }

      this.parsedPapers = [];

      if (this.saveAllBtn) {
        this.saveAllBtn.disabled = true;
      }

      if (this.parseBtn) {
        this.parseBtn.disabled = true;
      }
    } catch (error) {
      console.error("Failed to clear form:", error);
    }
  }

  // Handle form submission
  handleFormSubmit(event) {
    event.preventDefault();
    this.saveAllPapers();
  }

  // Handle keyboard shortcuts
  handleKeydown(event) {
    try {
      // Only handle shortcuts when not typing in textarea
      if (event.target === this.batchTextArea) {
        return;
      }

      // Ctrl/Cmd + Enter: Parse text
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        this.parseBatchText();
      }

      // Ctrl/Cmd + S: Save all papers
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        this.saveAllPapers();
      }
    } catch (error) {
      console.error("Failed to handle keydown:", error);
    }
  }

  // Setup auto-save functionality
  setupAutoSave() {
    try {
      const autoSaveInterval = setInterval(() => {
        if (this.hasUnsavedChanges()) {
          this.autoSave();
        }
      }, 30000); // Auto-save every 30 seconds

      // Clear interval when page unloads
      window.addEventListener("beforeunload", () => {
        clearInterval(autoSaveInterval);
      });
    } catch (error) {
      console.error("Failed to setup auto-save:", error);
    }
  }

  // Check if there are unsaved changes
  hasUnsavedChanges() {
    try {
      return (
        this.batchTextArea.value.trim().length > 0 ||
        this.parsedPapers.length > 0
      );
    } catch (error) {
      console.error("Failed to check unsaved changes:", error);
      return false;
    }
  }

  // Auto-save form data
  autoSave() {
    try {
      const autoSaveKey = "autosave_batch_add";
      const data = {
        text: this.batchTextArea.value,
        parsedPapers: this.parsedPapers,
        timestamp: Utils.getTimestamp(),
      };

      Utils.storage.set(autoSaveKey, data);
      console.log("Batch add form auto-saved");
    } catch (error) {
      console.error("Failed to auto-save form:", error);
    }
  }

  // Load auto-saved data
  loadAutoSavedData() {
    try {
      const autoSavedData = Utils.storage.get("autosave_batch_add");

      if (autoSavedData && autoSavedData.text) {
        // Ask user if they want to restore
        if (confirm("자동 저장된 데이터가 있습니다. 복원하시겠습니까?")) {
          if (this.batchTextArea) {
            this.batchTextArea.value = autoSavedData.text;
          }

          if (
            autoSavedData.parsedPapers &&
            autoSavedData.parsedPapers.length > 0
          ) {
            this.parsedPapers = autoSavedData.parsedPapers;
            this.refreshParseResults();

            if (this.saveAllBtn) {
              this.saveAllBtn.disabled = false;
            }
          }

          Utils.showToast("자동 저장된 데이터를 복원했습니다.", "success");
        }

        // Clean up auto-save
        Utils.storage.remove("autosave_batch_add");
      }
    } catch (error) {
      console.error("Failed to load auto-saved data:", error);
    }
  }
}

// Initialize batch add page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.batchAddPage = new BatchAddPage();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = BatchAddPage;
}
