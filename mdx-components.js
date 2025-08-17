// Default MDX components for static rendering
export function useMDXComponents(components) {
  return {
    // Custom components
    ProTip: ({ children }) => (
      <div className="bg-[#1B5BFF]/10 border border-[#1B5BFF]/20 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold mb-2 text-[#1B5BFF] !mt-0">
          💡 Pro Tip
        </h3>
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    ),
    FeatureCard: ({ title, children, icon }) => (
      <div className="bg-gray-50 border border-gray-200 dark:bg-white/5 dark:backdrop-blur dark:border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-6 h-6 bg-gradient-to-br from-[#1B5BFF] to-[#2483FF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-xs font-bold">{icon || "✓"}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white !mt-0">
              {title}
            </h3>
            <div className="text-gray-700 dark:text-gray-300">{children}</div>
          </div>
        </div>
      </div>
    ),
    ...components,
  };
}
