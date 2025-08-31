// Utility functions for NLP Paper News Manager

const Utils = {
  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Format date
  formatDate: (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  // Debounce function for search
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Highlight search terms in text
  highlightText: (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  },

  // Extract domain from URL
  extractDomain: (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "");
    } catch (e) {
      return url;
    }
  },

  // Validate URL
  isValidUrl: (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  },

  // Sanitize HTML
  sanitizeHtml: (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },

  // Show toast notification
  showToast: (message, type = "info", duration = 3000) => {
    // Remove existing toast container if it exists
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
            <div class="toast-content">
                <span>${Utils.sanitizeHtml(message)}</span>
            </div>
        `;

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, duration);

    // Click to dismiss
    toast.addEventListener("click", () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });

    return toast;
  },

  // Show loading state
  showLoading: (element) => {
    if (element) {
      element.classList.add("loading");
    }
  },

  // Hide loading state
  hideLoading: (element) => {
    if (element) {
      element.classList.remove("loading");
    }
  },

  // Toggle element visibility
  toggleElement: (element, show) => {
    if (element) {
      if (show) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    }
  },

  // Get element by ID safely
  getElement: (id) => {
    return document.getElementById(id);
  },

  // Add event listener safely
  addEventListener: (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler);
    }
  },

  // Remove event listener safely
  removeEventListener: (element, event, handler) => {
    if (element) {
      element.removeEventListener(event, handler);
    }
  },

  // Create element with attributes
  createElement: (tag, attributes = {}, textContent = "") => {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  },

  // Copy text to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Utils.showToast("클립보드에 복사되었습니다.", "success");
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        Utils.showToast("클립보드에 복사되었습니다.", "success");
        return true;
      } catch (err) {
        Utils.showToast("복사에 실패했습니다.", "error");
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  },

  // Download data as JSON
  downloadJson: (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Parse CSV text
  parseCSV: (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(",").map((v) => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || "";
        });
        result.push(obj);
      }
    }

    return result;
  },

  // Convert CSV to JSON
  csvToJson: (csvText) => {
    return Utils.parseCSV(csvText);
  },

  // Get current timestamp
  getTimestamp: () => {
    return new Date().toISOString();
  },

  // Calculate reading time
  calculateReadingTime: (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  },

  // Truncate text
  truncateText: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  },

  // Generate random color
  generateRandomColor: () => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#f5576c",
      "#4facfe",
      "#00f2fe",
      "#43e97b",
      "#38f9d7",
      "#fa709a",
      "#fee140",
      "#a8edea",
      "#fed6e3",
      "#ffecd2",
      "#fcb69f",
      "#ff9a9e",
      "#fecfef",
      "#fecfef",
      "#fad0c4",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  scrollToElement: (element, offset = 0) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  },

  // Get query parameters from URL
  getQueryParams: () => {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  // Set query parameters in URL
  setQueryParams: (params) => {
    const url = new URL(window.location);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, "", url);
  },

  // Local storage wrapper
  storage: {
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },

    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },

    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },

    clear: () => {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = Utils;
}
