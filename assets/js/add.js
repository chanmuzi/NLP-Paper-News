// Add paper page functionality for NLP Paper News Manager

class AddPaperPage {
  constructor() {
    this.form = null;
    this.previewContainer = null;
    this.existingTagsElement = null;
    this.isEditMode = false;
    this.editingPaperId = null;

    this.init();
  }

  init() {
    try {
      this.setupElements();
      this.bindEvents();
      this.loadExistingTags();
      this.checkEditMode();
      this.setupAutoSave();

      console.log("Add paper page initialized successfully");
    } catch (error) {
      console.error("Failed to initialize add paper page:", error);
      Utils.showToast("페이지 초기화에 실패했습니다.", "error");
    }
  }

  // Setup DOM elements
  setupElements() {
    this.form = Utils.getElement("addPaperForm");
    this.previewContainer = Utils.getElement("previewContainer");
    this.existingTagsElement = Utils.getElement("existingTags");

    if (!this.form || !this.previewContainer) {
      throw new Error("Required elements not found");
    }
  }

  // Bind event listeners
  bindEvents() {
    // Form submission
    Utils.addEventListener(this.form, "submit", (e) => this.handleSubmit(e));

    // Real-time preview updates
    const inputs = this.form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      Utils.addEventListener(input, "input", () => this.updatePreview());
      Utils.addEventListener(input, "change", () => this.updatePreview());
    });

    // Tag suggestions
    const tagsInput = Utils.getElement("tags");
    if (tagsInput) {
      Utils.addEventListener(tagsInput, "input", () =>
        this.showTagSuggestions()
      );
      Utils.addEventListener(tagsInput, "keydown", (e) =>
        this.handleTagInputKeydown(e)
      );
    }

    // Auto-complete for category name
    const categorySelect = Utils.getElement("category");
    if (categorySelect) {
      Utils.addEventListener(categorySelect, "change", () =>
        this.suggestCategoryName()
      );
    }
  }

  // Load existing tags for display
  loadExistingTags() {
    try {
      const tags = paperStorage.getTags();
      const tagNames = tags.map((tag) => tag.name).sort();

      if (this.existingTagsElement) {
        if (tagNames.length > 0) {
          this.existingTagsElement.textContent = tagNames
            .slice(0, 10)
            .join(", ");
          if (tagNames.length > 10) {
            this.existingTagsElement.textContent += ` 외 ${
              tagNames.length - 10
            }개`;
          }
        } else {
          this.existingTagsElement.textContent = "없음";
        }
      }
    } catch (error) {
      console.error("Failed to load existing tags:", error);
    }
  }

  // Check if we're in edit mode
  checkEditMode() {
    try {
      const urlParams = Utils.getQueryParams();
      if (urlParams.edit) {
        this.isEditMode = true;
        this.editingPaperId = urlParams.edit;
        this.loadPaperForEditing();
      }
    } catch (error) {
      console.error("Failed to check edit mode:", error);
    }
  }

  // Load paper data for editing
  loadPaperForEditing() {
    try {
      const paper = paperStorage.getPaperById(this.editingPaperId);
      if (!paper) {
        throw new Error("Paper not found");
      }

      // Populate form fields
      this.populateForm(paper);

      // Update page title
      document.title = `논문 수정 - ${paper.title} - NLP Paper News Manager`;

      // Update form button text
      const submitBtn = this.form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = "수정";
      }

      // Update page heading
      const heading = document.querySelector(".form-section h2");
      if (heading) {
        heading.textContent = "논문 수정";
      }

      Utils.showToast("논문을 불러왔습니다.", "success");
    } catch (error) {
      console.error("Failed to load paper for editing:", error);
      Utils.showToast("논문을 불러올 수 없습니다.", "error");
      this.isEditMode = false;
      this.editingPaperId = null;
    }
  }

  // Populate form with paper data
  populateForm(paper) {
    try {
      const titleInput = Utils.getElement("title");
      const linkInput = Utils.getElement("link");
      const categorySelect = Utils.getElement("category");
      const categoryNameInput = Utils.getElement("categoryName");
      const summaryTextarea = Utils.getElement("summary");
      const tagsInput = Utils.getElement("tags");

      if (titleInput) titleInput.value = paper.title;
      if (linkInput) linkInput.value = paper.link;
      if (categorySelect) categorySelect.value = paper.category;
      if (categoryNameInput) categoryNameInput.value = paper.categoryName;
      if (summaryTextarea) summaryTextarea.value = paper.summary;
      if (tagsInput) tagsInput.value = paper.tags.join(", ");

      // Update preview
      this.updatePreview();
    } catch (error) {
      console.error("Failed to populate form:", error);
    }
  }

  // Handle form submission
  async handleSubmit(event) {
    event.preventDefault();

    try {
      // Show loading state
      const submitBtn = this.form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "저장 중...";
      submitBtn.disabled = true;

      // Get form data
      const formData = this.getFormData();

      // Validate form data
      const validation = this.validateFormData(formData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(", "));
      }

      // Save paper
      let savedPaper;
      if (this.isEditMode) {
        savedPaper = paperStorage.updatePaper(this.editingPaperId, formData);
        Utils.showToast("논문이 수정되었습니다.", "success");
      } else {
        savedPaper = paperStorage.addPaper(formData);
        Utils.showToast("논문이 추가되었습니다.", "success");
      }

      // Redirect to main page after short delay
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      console.error("Form submission failed:", error);
      Utils.showToast(error.message, "error");

      // Reset button state
      const submitBtn = this.form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = this.isEditMode ? "수정" : "저장";
        submitBtn.disabled = false;
      }
    }
  }

  // Get form data
  getFormData() {
    const formData = new FormData(this.form);

    return {
      title: formData.get("title"),
      link: formData.get("link"),
      category: formData.get("category"),
      categoryName: formData.get("categoryName"),
      summary: formData.get("summary"),
      tags: formData.get("tags"),
    };
  }

  // Validate form data
  validateFormData(data) {
    const errors = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push("제목을 입력해주세요.");
    }

    if (!data.link || data.link.trim().length === 0) {
      errors.push("링크를 입력해주세요.");
    } else if (!Utils.isValidUrl(data.link)) {
      errors.push("유효한 URL을 입력해주세요.");
    }

    if (!data.category) {
      errors.push("카테고리를 선택해주세요.");
    }

    if (!data.summary || data.summary.trim().length === 0) {
      errors.push("요약 내용을 입력해주세요.");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  // Update preview
  updatePreview() {
    try {
      const formData = this.getFormData();
      const previewHTML = this.generatePreviewHTML(formData);

      if (this.previewContainer) {
        this.previewContainer.innerHTML = previewHTML;
      }
    } catch (error) {
      console.error("Failed to update preview:", error);
    }
  }

  // Generate preview HTML
  generatePreviewHTML(data) {
    if (!data.title && !data.link && !data.summary) {
      return '<div class="preview-placeholder"><p>입력한 내용이 여기에 표시됩니다.</p></div>';
    }

    const tags = data.tags
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];
    const tagsHTML =
      tags.length > 0
        ? `<div class="paper-tags">${tags
            .map((tag) => `<span class="paper-tag">${tag}</span>`)
            .join("")}</div>`
        : "";

    return `
            <div class="paper-card">
                <div class="paper-header">
                    <div class="paper-category">${data.category || "📜"}</div>
                    <div class="paper-header-content">
                        <h3 class="paper-title">
                            ${
                              data.title
                                ? `<a href="${
                                    data.link || "#"
                                  }" target="_blank">${data.title}</a>`
                                : "제목을 입력해주세요"
                            }
                        </h3>
                        ${
                          data.categoryName
                            ? `<div class="paper-category-name">${data.categoryName}</div>`
                            : ""
                        }
                    </div>
                </div>
                
                <div class="paper-summary">
                    ${data.summary || "요약 내용을 입력해주세요"}
                </div>
                
                ${tagsHTML}
                
                <div class="paper-meta">
                    <div class="paper-info">
                        <span>📅 ${Utils.formatDate(new Date())}</span>
                        ${
                          data.summary
                            ? `<span>⏱️ ${Utils.calculateReadingTime(
                                data.summary
                              )}분</span>`
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;
  }

  // Show tag suggestions
  showTagSuggestions() {
    try {
      const tagsInput = Utils.getElement("tags");
      if (!tagsInput) return;

      const query = tagsInput.value.split(",").pop().trim();
      if (query.length < 2) return;

      const suggestions = paperStorage.getTagSuggestions(query, 5);

      // Remove existing suggestions
      const existingSuggestions = document.querySelector(".tag-suggestions");
      if (existingSuggestions) {
        existingSuggestions.remove();
      }

      if (suggestions.length === 0) return;

      // Create suggestions dropdown
      const suggestionsDiv = document.createElement("div");
      suggestionsDiv.className = "tag-suggestions";
      suggestionsDiv.style.cssText = `
                position: absolute;
                background: white;
                border: 1px solid #e1e5e9;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                max-height: 200px;
                overflow-y: auto;
                z-index: 1000;
                width: ${tagsInput.offsetWidth}px;
            `;

      suggestions.forEach((tag) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.className = "tag-suggestion-item";
        suggestionItem.style.cssText = `
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f0f0f0;
                `;
        suggestionItem.textContent = tag.name;

        suggestionItem.addEventListener("click", () => {
          this.selectTagSuggestion(tag.name);
        });

        suggestionItem.addEventListener("mouseenter", () => {
          suggestionItem.style.backgroundColor = "#f8f9fa";
        });

        suggestionItem.addEventListener("mouseleave", () => {
          suggestionItem.style.backgroundColor = "white";
        });

        suggestionsDiv.appendChild(suggestionItem);
      });

      // Position suggestions below input
      const rect = tagsInput.getBoundingClientRect();
      suggestionsDiv.style.top = `${rect.bottom + window.scrollY}px`;
      suggestionsDiv.style.left = `${rect.left + window.scrollX}px`;

      document.body.appendChild(suggestionsDiv);

      // Close suggestions when clicking outside
      document.addEventListener(
        "click",
        (e) => {
          if (
            !tagsInput.contains(e.target) &&
            !suggestionsDiv.contains(e.target)
          ) {
            suggestionsDiv.remove();
          }
        },
        { once: true }
      );
    } catch (error) {
      console.error("Failed to show tag suggestions:", error);
    }
  }

  // Handle tag input keydown
  handleTagInputKeydown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const tagsInput = event.target;
      const currentValue = tagsInput.value;
      const cursorPosition = tagsInput.selectionStart;

      // Add comma if not already present
      if (event.key === "Enter" && !currentValue.includes(",")) {
        tagsInput.value = currentValue + ", ";
      }

      // Move cursor after comma
      setTimeout(() => {
        tagsInput.setSelectionRange(cursorPosition + 2, cursorPosition + 2);
        tagsInput.focus();
      }, 0);
    }
  }

  // Select tag suggestion
  selectTagSuggestion(tagName) {
    try {
      const tagsInput = Utils.getElement("tags");
      if (!tagsInput) return;

      const currentTags = tagsInput.value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);
      const lastTag = currentTags.pop();

      if (lastTag && lastTag.length > 0) {
        currentTags.push(tagName);
      }

      tagsInput.value = currentTags.join(", ");

      // Remove suggestions
      const suggestions = document.querySelector(".tag-suggestions");
      if (suggestions) {
        suggestions.remove();
      }

      // Update preview
      this.updatePreview();

      // Focus back to input
      tagsInput.focus();
    } catch (error) {
      console.error("Failed to select tag suggestion:", error);
    }
  }

  // Suggest category name based on selected category
  suggestCategoryName() {
    try {
      const categorySelect = Utils.getElement("category");
      const categoryNameInput = Utils.getElement("categoryName");

      if (!categorySelect || !categoryNameInput) return;

      const category = categorySelect.value;
      let suggestion = "";

      switch (category) {
        case "📜":
          suggestion = "arXiv, Papers With Code, Research Gate 등";
          break;
        case "🧑🏻‍💻":
          suggestion = "OpenAI, Google, Microsoft, GitHub 등";
          break;
        case "🗞️":
          suggestion = "TechCrunch, VentureBeat, MIT Technology Review 등";
          break;
      }

      if (suggestion && !categoryNameInput.value) {
        categoryNameInput.placeholder = suggestion;
      }
    } catch (error) {
      console.error("Failed to suggest category name:", error);
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
      const formData = this.getFormData();
      const hasData = Object.values(formData).some(
        (value) => value && value.toString().trim().length > 0
      );

      return hasData;
    } catch (error) {
      console.error("Failed to check unsaved changes:", error);
      return false;
    }
  }

  // Auto-save form data
  autoSave() {
    try {
      const formData = this.getFormData();
      const autoSaveKey = `autosave_${
        this.isEditMode ? "edit" : "add"
      }_${Date.now()}`;

      Utils.storage.set(autoSaveKey, {
        formData: formData,
        timestamp: Utils.getTimestamp(),
      });

      console.log("Form auto-saved");
    } catch (error) {
      console.error("Failed to auto-save form:", error);
    }
  }

  // Load auto-saved data
  loadAutoSavedData() {
    try {
      const autoSaveKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("autosave_")
      );

      if (autoSaveKeys.length === 0) return;

      // Get most recent auto-save
      const mostRecentKey = autoSaveKeys.sort().pop();
      const autoSavedData = Utils.storage.get(mostRecentKey);

      if (autoSavedData && autoSavedData.formData) {
        // Ask user if they want to restore
        if (confirm("자동 저장된 데이터가 있습니다. 복원하시겠습니까?")) {
          this.populateForm(autoSavedData.formData);
          Utils.showToast("자동 저장된 데이터를 복원했습니다.", "success");
        }

        // Clean up old auto-saves
        autoSaveKeys.forEach((key) => Utils.storage.remove(key));
      }
    } catch (error) {
      console.error("Failed to load auto-saved data:", error);
    }
  }
}

// Initialize add paper page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.addPaperPage = new AddPaperPage();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = AddPaperPage;
}
