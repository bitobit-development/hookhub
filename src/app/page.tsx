"use client";

import { useState, useMemo } from "react";
import { Hook, HookCategory } from "@/types/hooks";
import hooksData from "@/data/hooks.json";

const categoryColors = {
  [HookCategory.MONITORING]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  [HookCategory.SECURITY]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  [HookCategory.WORKFLOW]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  [HookCategory.TESTING]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  [HookCategory.INTEGRATION]: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  [HookCategory.UTILITY]: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  [HookCategory.LEARNING]: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  [HookCategory.TEAM]: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
};

const languageColors = {
  Python: "bg-yellow-500",
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  PHP: "bg-purple-500",
};

function HookCard({ hook }: { hook: Hook }) {
  const categoryColor = categoryColors[hook.category as HookCategory] || "bg-gray-100 text-gray-800";
  const languageColor = (languageColors as any)[hook.language] || "bg-gray-500";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
      {hook.featured && (
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⭐ Featured
          </span>
        </div>
      )}

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {hook.name}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}>
          {hook.category}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {hook.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>@{hook.author}</span>
          {hook.stars && (
            <span className="flex items-center">
              ⭐ {hook.stars}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${languageColor}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{hook.language}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {hook.hookTypes.slice(0, 3).map((type) => (
          <span
            key={type}
            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            {type}
          </span>
        ))}
        {hook.hookTypes.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            +{hook.hookTypes.length - 3}
          </span>
        )}
      </div>

      <a
        href={hook.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        View on GitHub →
      </a>
    </div>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"stars" | "name" | "recent">("stars");

  const hooks = hooksData.hooks as Hook[];

  const filteredAndSortedHooks = useMemo(() => {
    let filtered = hooks.filter((hook) => {
      const matchesSearch = hook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hook.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(hook.category);

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return (b.stars || 0) - (a.stars || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "recent":
          return a.name.localeCompare(b.name); // Placeholder for actual date sorting
        default:
          return 0;
      }
    });
  }, [hooks, searchTerm, selectedCategories, sortBy]);

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HookHub</h1>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Discover Claude Code Hooks</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Discover Claude Code Hooks
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              A community-driven platform for finding and sharing open-source Claude Code hooks.
              Enhance your workflows with pre-built hooks from the community.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search hooks by name, description, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "stars" | "name" | "recent")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="stars">Sort by Stars</option>
                <option value="name">Sort by Name</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {Object.values(HookCategory).map((category) => {
                const isSelected = selectedCategories.has(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedHooks.length} of {hooks.length} hooks
        </p>
      </section>

      {/* Hook Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedHooks.map((hook) => (
            <HookCard key={hook.id} hook={hook} />
          ))}
        </div>

        {filteredAndSortedHooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No hooks found matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
