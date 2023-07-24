module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy('_site/static')
  eleventyConfig.addWatchTarget('_site/static/docs.css')
  eleventyConfig.addWatchTarget('_site/static/docs.js')

  eleventyConfig.setBrowserSyncConfig({
    ui: false,
    ghostMode: false,
    open: true,
    browser: 'firefox',
  })

  return {
    dir: {
      input: '_site',
      output: 'docs'
    },
    markdownTemplateEngine: 'njk'
  }
}
