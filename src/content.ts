'use strict';

/**
 * Get PR title
 */
const getTitle = () =>
  (
    document
      .getElementsByClassName('js-issue-title')
      .item(0) as HTMLElementTagNameMap['bdi']
  )?.innerText;

/**
 * Get issue title and link associated with PR
 */
const getLinkedIssues = () =>
  Array.from(
    document.querySelectorAll<HTMLAnchorElement>('development-menu a'),
  ).map((a) => ({
    title: a.innerText.trim(),
    link: a.href,
  }));

/**
 * Get schedule string
 */
const getSchedule = () => {
  const content =
    document.querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.content ?? '';

  return content
    .substring(
      content.indexOf('Approved by reviewers'),
      content.indexOf('How to test and what expected'),
    )
    .trim();
};

const addButton = () => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'Button--secondary Button--small Button m-0 mr-md-0';
  button.innerHTML = `<span class="Button-content">
    <span class="Button-label">Copy template</span>
  </span>`;
  button.accessKey = 'c';

  document.querySelector<HTMLDivElement>('.gh-header-actions')?.append(button);

  button.addEventListener('click', () => {
    const text = `${getTitle()}
${getLinkedIssues()
  .map(({ link }) => link)
  .join('\n')}
${location.origin}${location.pathname}
Implement: 
Reviewers: 
Schedule:
${getSchedule()
  .split('\n')
  .map((t) => `> ${t}`)
  .join('\n')}`;

    navigator.clipboard.writeText(text).then(() => {
      const buttonLabel =
        button.querySelector<HTMLSpanElement>('.Button-label');
      if (!buttonLabel) return;
      buttonLabel.innerText = 'Copied!';

      setTimeout(() => {
        buttonLabel.innerText = 'Copy template';
      }, 3000);
    });
  });
};

addButton();
