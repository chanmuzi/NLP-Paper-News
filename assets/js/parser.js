// README.md parser for NLP Paper News Manager

class READMEParser {
  constructor() {
    this.categoryMap = {
      "📜": "📜 논문",
      "🧑🏻‍💻": "🧑🏻‍💻 개발자 블로그",
      "🗞️": "🗞️ 뉴스",
    };
  }

  // Parse README.md content and extract papers
  parseContent(markdownContent) {
    try {
      const lines = markdownContent.split("\n");
      const papers = [];
      let currentSection = "";
      let currentDate = "";

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (this.isDateHeader(line)) {
          currentDate = this.extractDate(line);
          continue;
        }

        if (this.isSectionHeader(line)) {
          currentSection = this.extractSection(line);
          continue;
        }

        if (this.isPaperLine(line)) {
          const paper = this.parsePaperLine(line, currentDate, currentSection);
          if (paper) {
            papers.push(paper);
          }
        }
      }

      return papers;
    } catch (error) {
      console.error("Parsing error:", error);
      throw new Error("README 파싱에 실패했습니다: " + error.message);
    }
  }

  // Check if line is a date header (e.g., "# 2025", "## 🏝️ August")
  isDateHeader(line) {
    return line.startsWith("# ") || line.startsWith("## ");
  }

  // Check if line is a section header (e.g., "<details>", "1st week")
  isSectionHeader(line) {
    return (
      line.includes("<details>") ||
      line.includes("<summary>") ||
      line.includes("</summary>") ||
      line.includes("</details>") ||
      (line.includes("week") && !line.includes("-"))
    );
  }

  // Check if line contains paper information
  isPaperLine(line) {
    return (
      line.startsWith("- ") &&
      (line.includes("📜") || line.includes("🧑🏻‍💻") || line.includes("🗞️"))
    );
  }

  // Extract date from header line
  extractDate(line) {
    // Remove markdown syntax
    let date = line.replace(/^#+\s*/, "").trim();

    // Extract year if present
    const yearMatch = date.match(/(\d{4})/);
    if (yearMatch) {
      return yearMatch[1];
    }

    return date;
  }

  // Extract section name
  extractSection(line) {
    if (line.includes("<summary>")) {
      const match = line.match(/<summary>(.*?)<\/summary>/);
      return match ? match[1].trim() : "";
    }
    return line.trim();
  }

  // Parse individual paper line
  parsePaperLine(line, date, section) {
    try {
      // Remove leading "- " and trim
      const content = line.substring(2).trim();

      // Extract category emoji and name
      const categoryMatch = content.match(/^([📜🧑🏻‍💻🗞️])\s*\[([^\]]+)\]/);
      if (!categoryMatch) {
        return null;
      }

      const category = categoryMatch[1];
      const categoryName = categoryMatch[2].trim();

      // Extract title and link
      const titleLinkMatch = content.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (!titleLinkMatch) {
        return null;
      }

      const title = titleLinkMatch[1].trim();
      const link = titleLinkMatch[2].trim();

      // Extract summary (everything after the link)
      const summaryStart = content.indexOf(")") + 1;
      let summary = content.substring(summaryStart).trim();

      // Remove leading "- " if present
      if (summary.startsWith("- ")) {
        summary = summary.substring(2).trim();
      }

      // Extract tags from summary (if any)
      const tags = this.extractTagsFromSummary(summary);

      // Clean up summary by removing tag references
      summary = this.cleanSummary(summary);

      // Validate required fields
      if (!title || !link || !summary) {
        return null;
      }

      return {
        title: title,
        link: link,
        category: category,
        categoryName: categoryName,
        summary: summary,
        tags: tags,
        date: date,
        section: section,
        parsedAt: Utils.getTimestamp(),
      };
    } catch (error) {
      console.error("Error parsing paper line:", line, error);
      return null;
    }
  }

  // Extract tags from summary text
  extractTagsFromSummary(summary) {
    const tags = [];

    // Look for common AI/ML related terms
    const commonTags = [
      "AI",
      "ML",
      "NLP",
      "Computer Vision",
      "Deep Learning",
      "Machine Learning",
      "Neural Networks",
      "Transformers",
      "LLM",
      "GPT",
      "BERT",
      "CNN",
      "RNN",
      "Reinforcement Learning",
      "Data Science",
      "Big Data",
      "Python",
      "TensorFlow",
      "PyTorch",
      "JAX",
      "Hugging Face",
      "arXiv",
      "Research",
      "Paper",
      "Blog",
      "News",
      "Development",
      "Coding",
      "Tools",
      "Framework",
      "Library",
    ];

    commonTags.forEach((tag) => {
      if (summary.toLowerCase().includes(tag.toLowerCase())) {
        tags.push(tag);
      }
    });

    // Look for specific patterns in the text
    const patterns = [
      /(\w+)\s+model/gi,
      /(\w+)\s+framework/gi,
      /(\w+)\s+algorithm/gi,
      /(\w+)\s+technique/gi,
      /(\w+)\s+approach/gi,
    ];

    patterns.forEach((pattern) => {
      const matches = summary.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          const tag = match.split(" ")[0];
          if (tag.length > 2 && !tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
    });

    return tags.slice(0, 5); // Limit to 5 tags
  }

  // Clean summary text by removing tag references and formatting
  cleanSummary(summary) {
    return summary
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();
  }

  // Validate parsed paper data
  validatePaper(paper) {
    if (!paper.title || paper.title.trim().length === 0) {
      return { valid: false, error: "제목이 없습니다." };
    }

    if (!paper.link || !Utils.isValidUrl(paper.link)) {
      return { valid: false, error: "유효하지 않은 링크입니다." };
    }

    if (!paper.summary || paper.summary.trim().length === 0) {
      return { valid: false, error: "요약 내용이 없습니다." };
    }

    if (!paper.category) {
      return { valid: false, error: "카테고리가 없습니다." };
    }

    return { valid: true };
  }

  // Parse and validate all papers
  parseAndValidate(markdownContent) {
    const papers = this.parseContent(markdownContent);
    const results = {
      valid: [],
      invalid: [],
      total: papers.length,
    };

    papers.forEach((paper, index) => {
      const validation = this.validatePaper(paper);
      if (validation.valid) {
        results.valid.push({
          ...paper,
          id: Utils.generateId(),
          index: index,
        });
      } else {
        results.invalid.push({
          ...paper,
          index: index,
          error: validation.error,
        });
      }
    });

    return results;
  }

  // Generate preview HTML for parsed papers
  generatePreviewHTML(papers) {
    if (!papers || papers.length === 0) {
      return '<div class="parse-placeholder"><p>파싱된 논문이 없습니다.</p></div>';
    }

    let html = "";
    papers.forEach((paper, index) => {
      const validation = this.validatePaper(paper);
      const isValid = validation.valid;

      html += `
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
                                ? `<button class="parse-item-btn edit" onclick="editParsedPaper(${index})">수정</button>`
                                : `<span class="parse-item-error">${validation.error}</span>`
                            }
                            <button class="parse-item-btn delete" onclick="deleteParsedPaper(${index})">삭제</button>
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
                        ${
                          paper.tags.length > 0
                            ? `<p><strong>태그:</strong> ${paper.tags.join(
                                ", "
                              )}</p>`
                            : ""
                        }
                    </div>
                </div>
            `;
    });

    return html;
  }

  // Export parsed papers to JSON
  exportParsedPapers(papers) {
    const exportData = {
      papers: papers.filter((p) => this.validatePaper(p).valid),
      exportDate: Utils.getTimestamp(),
      source: "README.md",
      version: "1.0.0",
    };

    return exportData;
  }

  // Get parsing statistics
  getParsingStats(markdownContent) {
    const lines = markdownContent.split("\n");
    const stats = {
      totalLines: lines.length,
      dateHeaders: 0,
      sectionHeaders: 0,
      paperLines: 0,
      emptyLines: 0,
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed === "") {
        stats.emptyLines++;
      } else if (this.isDateHeader(trimmed)) {
        stats.dateHeaders++;
      } else if (this.isSectionHeader(trimmed)) {
        stats.sectionHeaders++;
      } else if (this.isPaperLine(trimmed)) {
        stats.paperLines++;
      }
    });

    return stats;
  }
}

// Initialize parser instance
const readmeParser = new READMEParser();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = READMEParser;
}
