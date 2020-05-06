const listRepos = async username => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?type=owner&sort=updated`
  );
  // .then(res => res.json())
  // .then(data => console.log(data))
  // .catch(err => console.log(err));
  const repos = await res.json();

  const markup = repos.map(repo => `
    <li>
      <a href="${repo.html_url}">${repo.name}</a>
      (⭐️ ${repo.stargazers_count})
    </li>
  `).join('');

  const content = document.querySelector('#content');
  content.innerHTML = `<ul>${markup}</ul>`;
}

listRepos('diegaco');

