'use strict';

const copy = (
  text: string,
) => `<clipboard-copy aria-label="Copy" data-copy-feedback="Copied!" value="${text}" data-view-component="true" class="Link--onHover js-copy-branch color-fg-muted d-inline-block ml-1" tabindex="0" role="button">
    <svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-copy" style="display: inline-block; vertical-align: middle;">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>
    <svg style="display: none; vertical-align: middle;" aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-check color-fg-success">
    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>
</clipboard-copy>`;

const addButtonOnIssuePage = () => {
  const titleElm = document.getElementsByClassName(
    'gh-header-title',
  )[0] as HTMLHeadingElement;
  titleElm.innerHTML += copy(
    `[${titleElm.innerText}](${location.origin}${location.pathname})`,
  );
};

if (location.href.includes('pull') || location.href.includes('issues')) {
  addButtonOnIssuePage();
} else {
  document.addEventListener('dblclick', () => {
    const originalTitle = document.title;
    const title = originalTitle.replace(/·.*/, '').trim();
    navigator.clipboard.writeText(`[${title}](${location.href})`);

    document.title = 'Copied!';
    window.setTimeout(() => {
      document.title = originalTitle;
    }, 2000);
  });
}
