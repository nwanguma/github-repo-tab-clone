const apiUrl = "https://api.github.com/graphql";
const header = document.getElementsByTagName("header")[0];
const main = document.getElementsByTagName("main")[0];
const footer = document.getElementsByTagName("footer")[0];

//created a read only token, this service allows a 100 daily calls
const initiate = () => {
  fetch("https://gitreadonly.free.beeceptor.com", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
    .then((res) => {
      fetchProfileData(res.auth)
    });
  };

  const fetchProfileData = (auth) => {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((res) => {
      const pageData = res.data.user;

      populate(pageData);
    });
};

let navToggle;

const query = `{
     user(login: "nwanguma") {
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      login
      status {
        message
      }
      bio
      avatarUrl(size: 500)
      company
      email
      location
      name
      twitterUsername

      websiteUrl
      repositories(first: 20, affiliations: OWNER ,orderBy: {field: PUSHED_AT, direction: DESC}) {
        nodes {
          name
          description
          forkCount
          url
          stargazerCount
          licenseInfo {
            name
          }
          
          languages(first: 20, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              color
              name
            }
          }
          pushedAt
        }
      }
    }
}`;

header.classList.add("header");

header.innerHTML = `
        <div class="header__banner">
        <svg
          height="24"
          class="header__item nav-toggle"
          viewBox="0 0 16 16"
          version="1.1"
          width="24"
          aria-hidden="true"
          fill="#fff"
        >
          <path
            fill-rule="evenodd"
            d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
          ></path>
        </svg>
        <div class="header__item logo-box">
          <svg
            class="header-logo"
            viewBox="0 0 16 16"
            version="1.1"
            aria-hidden="true"
            fill="#fff"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </div>
        <div class="header__item search-explore">
          <div class="search-explore__search">
            <input
              class="search-explore__search__input search-input"
              type="text"
              placeholder="Search or jump to..."
            />
            <svg
              class="search-explore__search__icon"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="19px"
              height="20px"
              viewBox="0 0 19 20"
              style="enable-background: new 0 0 19 20"
              xml:space="preserve"
            >
              <path
                fill="none"
                stroke="#979A9C"
                opacity="0.4"
                d="M3.5,0.5h12c1.7,0,3,1.3,3,3v13c0,1.7-1.3,3-3,3h-12c-1.7,0-3-1.3-3-3v-13C0.5,1.8,1.8,0.5,3.5,0.5z"
              />
              <path fill="#979A9C" d="M11.8,6L8,15.1H7.1L10.8,6L11.8,6z" />
            </svg>
          </div>
          <div class="search-explore__explore">
            <a class="search-explore__explore__link" href="/explore"
              >Pull requests</a
            >
            <a class="search-explore__explore__link" href="/explore">Issues</a>
            <a class="search-explore__explore__link" href="/explore"
              >Marketplace</a
            >
            <a class="search-explore__explore__link" href="/explore">Explore</a>
          </div>
        </div>
        <div class="header__item notifications">
          <span class="notifications__indicator"></span>
          <svg
            class="notifications__icon"
            viewBox="0 0 16 16"
            version="1.1"
            aria-hidden="true"
            fill="#fff"
          >
            <path
              d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z"
            ></path>
          </svg>
        </div>
        <div class="header__item create">
          <svg
            class="create__icon"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
            fill="#fff"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"
            ></path>
          </svg>
          <span class="caret-down"></span>
        </div>
        <div class="header__item avatar-container">
          <img
            class="avatar"
            alt="user avatar"
          />
          <span class="caret-down"></span>
        </div>
      </div>
      <div class="header__details">
        <div class="header__details__search-box">
          <input
            class="header__details__search-box__input search-input"
            type="text"
            placeholder="search"
          />
        </div>
        <div class="header__details__list">
          <a class="header__details__list__item" href="#">Dashboard</a>
          <a class="header__details__list__item" href="#">Pull requests</a>
          <a class="header__details__list__item" href="#">Issues</a>
          <a class="header__details__list__item" href="#">Marketplace</a>
          <a class="header__details__list__item" href="#">Explore</a>
          <a class="header__details__list__item" href="#">Settings</a>
          <a class="header__details__list__item" href="#">
            <img
              class="header__details__list__item__avatar"
              alt="user avatar"
              src= ""
            />
            <span class="header__details__list__item__name"> nwanguma </span>
          </a>
          <a class="header__details__list__item" href="#"
            ><svg
              class="header__details__list__item__icon"
              viewBox="0 0 16 16"
              version="1.1"
              fill="#fff"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25V2.75zm10.44 4.5H6.75a.75.75 0 000 1.5h5.69l-1.97 1.97a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 000-1.06l-3.25-3.25a.75.75 0 10-1.06 1.06l1.97 1.97z"
              ></path>
            </svg>
            <span class="header__details__list__item__text">Sign out</span>
          </a>
        </div>
      </div>
      `;

const populate = (pageData) => {
  const repositoriesData = pageData.repositories.nodes;

  document.querySelector(".avatar").setAttribute("src", pageData.avatarUrl);

  document
    .querySelector(".header__details__list__item__avatar")
    .setAttribute("src", pageData.avatarUrl);

  main.classList.add("main");

  main.innerHTML = `
      <nav class="nav nav--main">
        <div class="nav__bio">
            <img
              class="nav__bio__avatar"
              alt="user avatar"
              src= ""
            />
            <span class="nav__bio__name">nwanguma</span>
          </div>
        <ul class="nav__list">
          <li class="nav__list__item">
            <a href="overview" class="nav__list__item__link">
              <svg
                class="nav__list__item__link__icon"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
                fill="#AFB5BB"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
                ></path>
              </svg>
              <span class="nav__list__item__text">Overview</span>
            </a>
          </li>
          <li class="nav__list__item nav__list__item--repo">
            <a
              href="overview"
              class="nav__list__item__link nav__list__item__link--repo"
            >
              <svg
                class="nav__list__item__link__icon nav__list__item__link--repo__icon"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
                fill="#AFB5BB"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                ></path>
              </svg>
              <span
                class="nav__list__item__link__text nav__list__item__link--repo__text"
                >Repositories</span
              >
              <span class="nav__list__item__link__count">${repositoriesData.length}</span>
            </a>
          </li>
          <li class="nav__list__item">
            <a href="overview" class="nav__list__item__link">
              <svg
                class="nav__list__item__link__icon"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
                fill="#AFB5BB"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"
                ></path>
              </svg>
              <span class="nav__list__item__link__text">Projects</span>
            </a>
          </li>
          <li class="nav__list__item">
            <a href="overview" class="nav__list__item__link">
              <svg
                class="nav__list__item__link__icon"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
                fill="#AFB5BB"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"
                ></path>
              </svg>
              <span class="nav__list__item__text">Packages</span>
            </a>
          </li>
        </ul>
      </nav>
      <aside class="profile">
        <div class="profile-wrapper">
          <div class="profile-avatar">
            <div class="profile-avatar-container">
              <img
                class="profile-avatar__image"
                src=${pageData.avatarUrl}
                alt="user's avatar large"
              />
            </div>
            <div class="profile-avatar__heading">
              <h2 class="profile-avatar__heading__name">${pageData.name}</h2>
              <p class="profile-avatar__heading__username">${pageData.login}</p>
            </div>
          </div>
          <div class="profile-avatar__status">
            <svg
              class="profile-avatar__status__icon"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z"
              ></path>
            </svg>
            <span class="profile-avatar__status__text">Set status</span>
          </div>
          <div class="profile-bio-container">
            <div class="profile-bio__heading">
              <p class="profile-bio__heading__title">${pageData.bio}.</p>
            </div>
          </div>
          <div class="profile-update-container">
            <div class="profile-update__actions">
              <div class="profile-update__edit">Edit Profile</div>
            </div>
            <div class="profile-update__bio">
              <div class="profile-update__bio__repo">
                <span
                  class="profile-update__bio__repo__item profile-update__bio__repo__followers"
                >
                  <svg
                    class="profile-update__bio__repo__item__icon profile-update__bio__repo__followers__icon"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
                    ></path>
                  </svg>
                  <span
                    class="profile-update__bio__repo__item__count profile-update__bio__repo__followers__count"
                    >${pageData.followers.totalCount}</span
                  >
                  <span
                    class="profile-update__bio__repo__item__text profile-update__bio__repo__followers__text"
                    >followers</span
                  >
                </span>
                <span
                  class="profile-update__bio__repo__item profile-update__bio__repo__following"
                >
                  .
                  <span
                    class="profile-update__bio__repo__item__count profile-update__bio__repo__following__count"
                    >${pageData.following.totalCount}</span
                  >
                  <span
                    class="profile-update__bio__repo__item__text profile-update__bio__repo__following__text"
                    >following</span
                  >
                  .
                </span>
                <span
                  class="profile-update__bio__repo__item profile-update__bio__repo__stars"
                >
                  <svg
                    class="profile-update__bio__repo__item__icon profile-update__bio__repo__stars__icon"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                    ></path>
                  </svg>
                  <span
                    class="profile-update__bio__repo__item__count profile-update__bio__repo__stars__count"
                  >
                    ${pageData.starredRepositories.totalCount}
                  </span>
                </span>
              </div>
              <div class="profile-update__bio__socials">
                <span
                  class="profile-update__bio__socials__item profile-update__bio__socials__location"
                >
                  <svg
                    class="profile-update__bio__socials__item__icon"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"
                    ></path>
                  </svg>
                  <span class="profile-update__bio__socials__location__text"
                    >${pageData.location}</span
                  >
                </span>
                <span
                  class="profile-update__bio__socials__item profile-update__bio__socials__email"
                >
                  <svg
                    class="profile-update__bio__socials__item__icon"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
                    ></path>
                  </svg>
                  <span class="profile-update__bio__socials__email__text"
                    >${pageData.email}</span
                  >
                </span>
                <span
                  class="profile-update__bio__socials__item profile-update__bio__socials__website"
                >
                  <svg
                    class="profile-update__bio__socials__item__icon"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                    ></path>
                  </svg>
                  <span class="profile-update__bio__socials__website__text">
                    ${pageData.websiteUrl}
                  </span>
                </span>
                <span
                  class="profile-update__bio__socials__item profile-update__bio__socials__twitter"
                >
                  <svg
                    class="profile-update__bio__socials__item__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 273.5 222.3"
                  >
                    <path
                      d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                    ></path>
                  </svg>
                  <span class="profile-update__bio__socials__twitter__text">
                    ${pageData.twitterUsername}
                  </span>
                </span>
              </div>
            </div>
            <form class="profile-update__form">
              <label class="profile-update__form__form-group">
                <textarea
                  class="profile-update__form__textarea"
                  type="text"
                  placeholder="Frontend developer."
                ></textarea>
              </label>
              <label class="profile-update__form__form-group">
                <svg
                  style="width: 16px"
                  class="profile-update__form__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
                  ></path>
                </svg>
                <input
                  class="profile-update__form__input"
                  type="text"
                  placeholder="Location"
                />
              </label>
              <label class="profile-update__form__form-group">
                <svg
                  style="width: 16px"
                  class="profile-update__form__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
                <input
                  class="profile-update__form__input"
                  type="text"
                  placeholder="Location"
                />
              </label>
              <label class="profile-update__form__form-group">
                <svg
                  style="width: 16px"
                  class="profile-update__form__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
                  ></path>
                </svg>
                <select class="profile-update__form__select">
                  <option value="">nwangumat@hotmail.com</option>
                </select>
              </label>
              <label class="profile-update__form__form-group">
                <svg
                  style="width: 16px"
                  class="profile-update__form__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                  ></path>
                </svg>
                <input
                  class="profile-update__form__input"
                  type="text"
                  placeholder="Website"
                />
              </label>
              <label class="profile-update__form__form-group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 273.5 222.3"
                  height="16"
                  width="16"
                  class="profile-update__form__icon"
                >
                  <path
                    d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                  ></path>
                </svg>
                <input
                  class="profile-update__form__input"
                  type="text"
                  placeholder="Twitter username"
                />
              </label>
              <div
                class="profile-update__form__form-group profile-update__form__form-group--button-container"
              >
                <button class="btn btn--save">Save</button>
                <button class="btn btn--cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </aside>
      <section class="section-repo">
        <!-- <nav class="nav nav--repo">
          <ul class="nav__list">
            <li class="nav__list__item">
              <a href="overview" class="nav__list__item__link">
                <svg
                  class="nav__list__item__link__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  aria-hidden="true"
                  fill="#AFB5BB"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
                  ></path>
                </svg>
                <span class="nav__list__item__text">Overview</span>
              </a>
            </li>
            <li class="nav__list__item nav__list__item--repo">
              <a
                href="overview"
                class="nav__list__item__link nav__list__item__link--repo"
              >
                <svg
                  class="nav__list__item__link__icon nav__list__item__link--repo__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  aria-hidden="true"
                  fill="#AFB5BB"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                  ></path>
                </svg>
                <span
                  class="nav__list__item__link__text nav__list__item__link--repo__text"
                  >Repositories</span
                >
                <span class="nav__list__item__link__count">20</span>
              </a>
            </li>
            <li class="nav__list__item">
              <a href="overview" class="nav__list__item__link">
                <svg
                  class="nav__list__item__link__icon"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  aria-hidden="true"
                  fill="#AFB5BB"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"
                  ></path>
                </svg>
                <span class="nav__list__item__link__text">Projects</span>
              </a>
            </li>
            <li class="nav__list__item">
              <a href="overview" class="nav__list__item__link">
                <svg
                  class="nav__list__item__link__icon"
                  viewBox="0 0 16 16"
                  version="1.1"
                  aria-hidden="true"
                  fill="#AFB5BB"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"
                  ></path>
                </svg>
                <span class="nav__list__item__text">Packages</span>
              </a>
            </li>
          </ul>
        </nav> -->
        <div class="filter-container">
          <input
            class="filter__item filter__item--find-repo"
            type="text"
            placeholder="Find a repository..."
          />
          <details
            class="filter__item filter__item--details filter__item filter__item--sortby-type"
          >
            <summary class="filter__item--details__summary">
              <span class="filter__item--details__summary__title">Type:</span>
              <span class="filter__item--details__summary__type">All</span>
              <img src="./assets/down.svg" alt="" />
            </summary>
          </details>
          <details
            class="filter__item filter__item--details filter__item filter__item--sortby-language"
          >
            <summary class="filter__item--details__summary">
              <span class="filter__item--details__summary__title"
                >Language:</span
              >
              <span class="filter__item--details__summary__type">All</span>
              <img src="./assets/down.svg" alt="" />
            </summary>
          </details>
          <a class="filter__item filter__item--btn" href="/new">
            <svg
              class="filter__item--btn__icon"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
              ></path>
            </svg>
            <span class="filter__item--btn__text">new</span>
          </a>
        </div>
        <div class="repo-container"></div>
      </section>`;

  document
    .querySelector(".nav__bio__avatar")
    .setAttribute("src", pageData.avatarUrl);

  footer.classList.add("footer");

  footer.innerHTML = `
     <div class="footer-logo-box">
        <svg
          class="footer-logo"
          viewBox="0 0 16 16"
          version="1.1"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
      </div>
      <ul class="footer-nav__list">
        <li class="footer-nav__list__item footer-nav__list__item--copyright">
          <span>© 2020 GitHub, Inc.</span>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Terms</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Privacy</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Security</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Status</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Help</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Contact Github</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Pricing</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Api</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Training</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">Blog</a>
        </li>
        <li class="footer-nav__list__item">
          <a class="footer-nav__list__item__link" href="#">About</a>
        </li>
      </ul>
    `;

  navToggle = document.querySelector(".nav-toggle");

  const repoContainer = document.querySelector(".repo-container");

  const createRepoContent = (
    name,
    description,
    languages,
    forkCount,
    licenseInfo,
    pushedAt,
    url
  ) => {
    const repo = document.createElement("div");
    const repoDetails = document.createElement("div");
    const repoDetailsHeading = document.createElement("a");
    const repoDetailsDescription = document.createElement("p");
    const repoDetailsTag = document.createElement("div");
    const repoDetailsTagLanguage = document.createElement("span");
    const repoDetailsTagLanguageColor = document.createElement("span");
    const repoDetailsTagLanguageText = document.createElement("span");
    const repoDetailsTagFork = document.createElement("span");
    const repoDetailsTagForkCount = document.createElement("span");
    const repoDetailsTagLicenseInfo = document.createElement("div");
    const repoDetailsTagLicenseInfoText = document.createElement("span");
    const repoDetailsTagUpdated = document.createElement("div");
    const repoStats = document.createElement("div");

    repoDetailsHeading.setAttribute("href", `${url}`);

    if (name) repoDetailsHeading.textContent = name;
    if (description) repoDetailsDescription.textContent = description;

    if (languages.nodes.length > 0) {
      repoDetailsTagLanguageColor.style.background = languages.nodes[0].color;
      repoDetailsTagLanguageText.textContent = languages.nodes[0].name;

      repoDetailsTagLanguage.appendChild(repoDetailsTagLanguageColor);
      repoDetailsTagLanguage.appendChild(repoDetailsTagLanguageText);

      repoDetailsTag.appendChild(repoDetailsTagLanguage);
    }

    if (forkCount) {
      repoDetailsTagFork.innerHTML = `
          <svg
            aria-label="fork"
            class="repo__details__tag__fork__icon"
            viewBox="0 0 16 16"
            version="1.1"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            ></path>
          </svg>
        
        `;

      repoDetailsTagForkCount.textContent = forkCount;

      repoDetailsTagFork.appendChild(repoDetailsTagForkCount);

      repoDetailsTag.appendChild(repoDetailsTagFork);
    }

    if (licenseInfo) {
      repoDetailsTagLicenseInfo.innerHTML = `
            <svg
              class="repo__details__tag__licenseInfo__icon"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
              ></path>
            </svg>
          `;

      repoDetailsTagLicenseInfoText.textContent = licenseInfo.name;

      repoDetailsTagLicenseInfo.appendChild(repoDetailsTagLicenseInfoText);

      repoDetailsTag.appendChild(repoDetailsTagLicenseInfo);
    }

    if (pushedAt) {
      const updatedAtDate = new Date(pushedAt);
      const updatedAtDateString = updatedAtDate.toDateString().slice(4);

      repoDetailsTagUpdated.textContent = `Updated on ${updatedAtDateString.substring(
        0,
        6
      )}, ${updatedAtDateString.slice(6)}`;

      repoDetailsTag.appendChild(repoDetailsTagUpdated);
    }

    repoStats.innerHTML = `
          <div class="repo__stats__toggle btn">
            <svg
              class="repo__stats__toggle__icon"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              ></path>
            </svg>
            <span class="repo__stats__toggle__text"> Star </span>
          </div>
        `;

    repoDetails.appendChild(repoDetailsHeading);
    repoDetails.appendChild(repoDetailsDescription);
    repoDetails.appendChild(repoDetailsTag);

    repo.classList.add("repo");
    repoDetails.classList.add("repo__details");
    repoDetailsHeading.classList.add("repo__details__heading");
    repoDetailsDescription.classList.add("repo__details__description");
    repoDetailsTag.classList.add("repo__details__tag");
    repoDetailsTagLanguage.classList.add("repo__details__tag__language");
    repoDetailsTagLanguageColor.classList.add(
      "repo__details__tag__language__color"
    );
    repoDetailsTagLanguageText.classList.add(
      "repo__details__tag__language__text"
    );
    repoDetailsTagFork.classList.add("repo__details__tag__fork");
    repoDetailsTagForkCount.classList.add("repo__details__tag__fork__count");
    repoDetailsTagLicenseInfoText.classList.add(
      "repo__details__tag__licenseInfo__text"
    );
    repoDetailsTagLicenseInfo.classList.add("repo__details__tag__licenseInfo");
    repoDetailsTagUpdated.classList.add("repo__details__tag__updated");

    repo.appendChild(repoDetails);
    repo.appendChild(repoStats);

    return repo;
  };

  repositoriesData.forEach((data) => {
    const {
      name,
      description,
      languages,
      forkCount,
      licenseInfo,
      pushedAt,
      url,
    } = data;

    repoContainer.appendChild(
      createRepoContent(
        name,
        description,
        languages,
        forkCount,
        licenseInfo,
        pushedAt,
        url
      )
    );
  });
};



window.addEventListener("DOMContentLoaded", () => {
  initiate();
});

navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", () => {
  if (header.classList.contains("open")) {
    header.classList.remove("open");
    header.classList.remove("details");
  } else {
    header.classList.add("open");
    header.classList.add("details");
  }
});

window.addEventListener("resize", (e) => {
  if (window.innerWidth > 765) {
    header.classList.remove("open");
    header.classList.remove("details");
  }
});

window.addEventListener("scroll", () => {
  const navBio = document.querySelector(".nav__bio");
  const profileSection = document.querySelector(".profile");
  const deviceWidth = window.innerWidth > 1400 ? 420 : 320;

  if (window.scrollY >= deviceWidth && window.innerWidth >= 767) {
    navBio.classList.add("show");
    profileSection.classList.add("stack-top");
  } else {
    navBio.classList.remove("show");
    profileSection.classList.remove("stack-top");
  }
});
