// Data storage and management for NLP Paper News Manager

class PaperStorage {
  constructor() {
    this.storageKey = "nlp_papers_data";
    this.tagsKey = "nlp_tags_data";
    this.settingsKey = "nlp_settings";
    this.init();
  }

  init() {
    // Initialize data structure if it doesn't exist
    if (!this.getPapers()) {
      this.savePapers([]);
    }
    if (!this.getTags()) {
      this.saveTags([]);
    }
    if (!this.getSettings()) {
      this.saveSettings(this.getDefaultSettings());
    }
  }

  // Paper management methods
  getPapers() {
    return Utils.storage.get(this.storageKey, []);
  }

  savePapers(papers) {
    return Utils.storage.set(this.storageKey, papers);
  }

  addPaper(paperData) {
    const papers = this.getPapers();
    const newPaper = {
      id: Utils.generateId(),
      title: paperData.title.trim(),
      link: paperData.link.trim(),
      category: paperData.category,
      categoryName: paperData.categoryName?.trim() || "",
      summary: paperData.summary.trim(),
      tags: this.processTags(paperData.tags),
      createdAt: Utils.getTimestamp(),
      updatedAt: Utils.getTimestamp(),
      featured: false,
      readingTime: Utils.calculateReadingTime(paperData.summary),
    };

    // Validate paper data
    if (!this.validatePaper(newPaper)) {
      throw new Error("Invalid paper data");
    }

    papers.unshift(newPaper); // Add to beginning
    this.savePapers(papers);

    // Update tags
    this.updateTagsFromPaper(newPaper);

    return newPaper;
  }

  updatePaper(id, updates) {
    const papers = this.getPapers();
    const index = papers.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Paper not found");
    }

    const oldPaper = papers[index];
    const updatedPaper = {
      ...oldPaper,
      ...updates,
      updatedAt: Utils.getTimestamp(),
    };

    // Validate updated paper
    if (!this.validatePaper(updatedPaper)) {
      throw new Error("Invalid paper data");
    }

    papers[index] = updatedPaper;
    this.savePapers(papers);

    // Update tags if tags changed
    if (JSON.stringify(oldPaper.tags) !== JSON.stringify(updatedPaper.tags)) {
      this.updateTagsFromPaper(updatedPaper, oldPaper);
    }

    return updatedPaper;
  }

  deletePaper(id) {
    const papers = this.getPapers();
    const index = papers.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Paper not found");
    }

    const deletedPaper = papers[index];
    papers.splice(index, 1);
    this.savePapers(papers);

    // Remove tags if they're no longer used
    this.removeUnusedTags();

    return deletedPaper;
  }

  getPaperById(id) {
    const papers = this.getPapers();
    return papers.find((p) => p.id === id);
  }

  // Tag management methods
  getTags() {
    return Utils.storage.get(this.tagsKey, []);
  }

  saveTags(tags) {
    return Utils.storage.set(this.tagsKey, tags);
  }

  addTag(tagName) {
    const tags = this.getTags();
    const normalizedName = this.normalizeTagName(tagName);

    if (!normalizedName) return null;

    const existingTag = tags.find((t) => t.name === normalizedName);
    if (existingTag) {
      existingTag.count++;
      existingTag.lastUsed = Utils.getTimestamp();
    } else {
      tags.push({
        id: Utils.generateId(),
        name: normalizedName,
        count: 1,
        color: Utils.generateRandomColor(),
        createdAt: Utils.getTimestamp(),
        lastUsed: Utils.getTimestamp(),
      });
    }

    this.saveTags(tags);
    return tags.find((t) => t.name === normalizedName);
  }

  removeTag(tagId) {
    const tags = this.getTags();
    const index = tags.findIndex((t) => t.id === tagId);

    if (index === -1) return false;

    tags.splice(index, 1);
    this.saveTags(tags);
    return true;
  }

  getTagSuggestions(query, limit = 10) {
    const tags = this.getTags();
    if (!query) return tags.slice(0, limit);

    const normalizedQuery = this.normalizeTagName(query);
    return tags
      .filter((tag) => tag.name.includes(normalizedQuery))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // Settings management
  getSettings() {
    return Utils.storage.get(this.settingsKey, this.getDefaultSettings());
  }

  saveSettings(settings) {
    return Utils.storage.set(this.settingsKey, settings);
  }

  updateSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
  }

  // Search and filter methods
  searchPapers(query, filters = {}) {
    const papers = this.getPapers();
    let results = papers;

    // Apply filters
    if (filters.category) {
      results = results.filter((p) => p.category === filters.category);
    }

    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((p) =>
        filters.tags.some((tag) => p.tags.includes(tag))
      );
    }

    // Apply search query
    if (query && query.trim()) {
      const searchTerm = query.trim().toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.summary.toLowerCase().includes(searchTerm) ||
          p.categoryName.toLowerCase().includes(searchTerm) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      results = this.sortPapers(results, filters.sortBy);
    }

    return results;
  }

  sortPapers(papers, sortBy) {
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

  // Statistics methods
  getStatistics() {
    const papers = this.getPapers();
    const tags = this.getTags();

    const categoryStats = {};
    const tagStats = {};

    papers.forEach((paper) => {
      // Category statistics
      categoryStats[paper.category] = (categoryStats[paper.category] || 0) + 1;

      // Tag statistics
      paper.tags.forEach((tag) => {
        tagStats[tag] = (tagStats[tag] || 0) + 1;
      });
    });

    return {
      totalPapers: papers.length,
      totalTags: tags.length,
      categoryStats,
      tagStats,
      averageReadingTime:
        papers.length > 0
          ? Math.round(
              papers.reduce((sum, p) => sum + p.readingTime, 0) / papers.length
            )
          : 0,
    };
  }

  // Export and import methods
  exportData() {
    const data = {
      papers: this.getPapers(),
      tags: this.getTags(),
      settings: this.getSettings(),
      exportDate: Utils.getTimestamp(),
      version: "1.0.0",
    };

    return data;
  }

  importData(data) {
    try {
      // Validate imported data
      if (!data.papers || !Array.isArray(data.papers)) {
        throw new Error("Invalid papers data");
      }

      if (!data.tags || !Array.isArray(data.tags)) {
        throw new Error("Invalid tags data");
      }

      // Clear existing data
      this.savePapers([]);
      this.saveTags([]);

      // Import new data
      this.savePapers(data.papers);
      this.saveTags(data.tags);

      if (data.settings) {
        this.saveSettings(data.settings);
      }

      return true;
    } catch (error) {
      console.error("Import failed:", error);
      return false;
    }
  }

  // Utility methods
  processTags(tagsInput) {
    if (!tagsInput) return [];

    const tags =
      typeof tagsInput === "string"
        ? tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t)
        : Array.isArray(tagsInput)
        ? tagsInput
        : [];

    return tags.map((tag) => this.normalizeTagName(tag)).filter((tag) => tag);
  }

  normalizeTagName(tagName) {
    if (!tagName || typeof tagName !== "string") return null;

    return tagName.trim().toLowerCase();
  }

  validatePaper(paper) {
    return (
      paper.title &&
      paper.title.trim().length > 0 &&
      paper.link &&
      Utils.isValidUrl(paper.link) &&
      paper.category &&
      paper.summary &&
      paper.summary.trim().length > 0
    );
  }

  updateTagsFromPaper(paper, oldPaper = null) {
    const tags = this.getTags();

    // Add new tags
    paper.tags.forEach((tagName) => {
      this.addTag(tagName);
    });

    // Remove old tags if updating
    if (oldPaper) {
      oldPaper.tags.forEach((tagName) => {
        const tag = tags.find((t) => t.name === tagName);
        if (tag) {
          tag.count = Math.max(0, tag.count - 1);
        }
      });
      this.saveTags(tags);
    }
  }

  removeUnusedTags() {
    const papers = this.getPapers();
    const tags = this.getTags();

    // Count tag usage
    const tagUsage = {};
    papers.forEach((paper) => {
      paper.tags.forEach((tag) => {
        tagUsage[tag] = (tagUsage[tag] || 0) + 1;
      });
    });

    // Remove unused tags
    const updatedTags = tags.filter((tag) => tagUsage[tag.name] > 0);

    if (updatedTags.length !== tags.length) {
      this.saveTags(updatedTags);
    }
  }

  getDefaultSettings() {
    return {
      itemsPerPage: 12,
      defaultSort: "date",
      showReadingTime: true,
      showTags: true,
      enableAnimations: true,
      theme: "auto",
      language: "ko",
    };
  }

  // Backup and restore
  createBackup() {
    const data = this.exportData();
    const filename = `nlp_papers_backup_${
      new Date().toISOString().split("T")[0]
    }.json`;
    Utils.downloadJson(data, filename);
    return filename;
  }

  // Clean up old data
  cleanup() {
    const papers = this.getPapers();
    const tags = this.getTags();

    // Remove papers older than 2 years (optional)
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    const filteredPapers = papers.filter(
      (paper) => new Date(paper.createdAt) > twoYearsAgo
    );

    if (filteredPapers.length !== papers.length) {
      this.savePapers(filteredPapers);
      this.removeUnusedTags();
    }
  }
}

// Initialize storage instance
const paperStorage = new PaperStorage();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = PaperStorage;
}
